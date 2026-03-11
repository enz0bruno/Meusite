import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("clinic.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_id INTEGER,
    service_name TEXT,
    date TEXT,
    time TEXT,
    client_name TEXT,
    client_phone TEXT,
    UNIQUE(date, time)
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API: Get available slots for a date
  app.get("/api/availability", (req, res) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "Date is required" });

    const bookedSlots = db.prepare("SELECT time FROM bookings WHERE date = ?").all(date) as { time: string }[];
    const bookedTimes = bookedSlots.map(s => s.time);

    // Define standard clinic hours (09:00 to 18:00, 1h slots)
    const allSlots = [
      "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"
    ];

    const availableSlots = allSlots.filter(time => !bookedTimes.includes(time));
    res.json({ availableSlots });
  });

  // API: Create a booking
  app.post("/api/bookings", (req, res) => {
    const { serviceId, serviceName, date, time, name, phone } = req.body;
    
    if (!date || !time || !name || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const stmt = db.prepare(`
        INSERT INTO bookings (service_id, service_name, date, time, client_name, client_phone)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      stmt.run(serviceId, serviceName, date, time, name, phone);
      res.json({ success: true, message: "Agendamento realizado com sucesso!" });
    } catch (err: any) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        res.status(409).json({ error: "Este horário já foi preenchido. Por favor, escolha outro." });
      } else {
        res.status(500).json({ error: "Erro ao processar agendamento." });
      }
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
