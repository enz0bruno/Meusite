import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  ChevronRight, 
  Star, 
  MapPin, 
  Phone, 
  Clock,
  Sparkles,
  Heart,
  User,
  Calendar,
  CheckCircle
} from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Limpeza de Pele Premium",
    description: "Tratamento profundo para remover impurezas e revitalizar a derme com produtos exclusivos.",
    price: "R$ 180,00",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&h=600&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Harmonização Facial",
    description: "Realce seus traços naturais com técnicas avançadas de preenchimento e bioestimuladores.",
    price: "Sob Consulta",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800&h=600&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Peeling Químico",
    description: "Renovação celular para tratar manchas, acne e linhas de expressão.",
    price: "R$ 250,00",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&h=600&auto=format&fit=crop"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Ana Paula Silva",
    text: "A Maria Clara é uma profissional incrível. O ambiente é acolhedor e os resultados foram além das minhas expectativas.",
    rating: 5
  },
  {
    id: 2,
    name: "Juliana Mendes",
    text: "Melhor clínica de estética que já frequentei. O atendimento é personalizado e os produtos são de altíssima qualidade.",
    rating: 5
  },
  {
    id: 3,
    name: "Carla Oliveira",
    text: "Fiz a harmonização facial e amei o resultado super natural. Recomendo de olhos fechados!",
    rating: 5
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookingStep, setBookingStep] = useState<'service' | 'date' | 'time' | 'info' | 'confirm'>('service');
  const [bookingData, setBookingData] = useState({
    service: null as any,
    date: null as number | null,
    time: null as string | null,
    name: '',
    phone: ''
  });

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  const handleBookingReset = () => {
    setBookingStep('service');
    setBookingData({ service: null, date: null, time: null, name: '', phone: '' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-rose selection:text-white overflow-x-hidden">
      {/* Floating Petals Animation */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              y: -100, 
              x: Math.random() * 100 + '%',
              rotate: 0 
            }}
            animate={{ 
              opacity: [0, 0.4, 0], 
              y: '110vh',
              x: (Math.random() * 100 - 10) + '%',
              rotate: 360 
            }}
            transition={{ 
              duration: Math.random() * 10 + 15, 
              repeat: Infinity, 
              delay: Math.random() * 20,
              ease: "linear"
            }}
            className="absolute text-brand-rose/20"
          >
            <Sparkles size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-brand-offwhite/95 backdrop-blur-xl py-3 shadow-sm border-b border-brand-rose/20' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="cursor-pointer group"
            onClick={() => scrollToSection('inicio')}
          >
            <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tighter text-brand-brown-dark group-hover:text-brand-rose transition-colors">
              MARIA CLARA <span className="font-light italic text-brand-brown-light">Mendonça</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.4em] font-sans opacity-60 font-semibold">Estética de Luxo</p>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-10">
            {['Início', 'Serviços', 'Agenda', 'Sobre', 'Depoimentos'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace('í', 'i'))}
                className="text-xs uppercase tracking-widest font-bold hover:text-brand-rose transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-rose transition-all group-hover:w-full"></span>
              </button>
            ))}
            <a 
              href="https://wa.me/5511976639359" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-brand-brown-dark text-brand-offwhite px-7 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-brand-rose transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-brand-rose/10"
            >
              Agendar Agora
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-brand-brown-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-brand-offwhite pt-24 px-6 md:hidden flex flex-col items-center justify-center text-center"
          >
            <nav className="flex flex-col space-y-10">
              {['Início', 'Serviços', 'Agenda', 'Sobre', 'Depoimentos'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace('í', 'i'))}
                  className="text-3xl font-serif text-brand-brown-dark hover:text-brand-rose transition-colors"
                >
                  {item}
                </button>
              ))}
              <a 
                href="https://wa.me/5511976639359" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-brown-dark text-brand-offwhite px-10 py-5 rounded-full text-sm uppercase tracking-widest font-bold shadow-2xl"
              >
                Agendar via WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="inicio" className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1920&h=1080&auto=format&fit=crop" 
              alt="Estética de Luxo" 
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-offwhite via-brand-offwhite/90 to-transparent"></div>
            {/* Soft Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-rose/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-brown-light/10 rounded-full blur-[120px]"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-brand-rose"></div>
                <h2 className="text-xs uppercase tracking-[0.6em] font-sans text-brand-brown-light font-bold">
                  Sua beleza, nossa arte
                </h2>
              </div>
              <h1 className="text-6xl md:text-9xl font-serif leading-[0.9] mb-8 text-brand-brown-dark tracking-tighter">
                A Estética em sua <br />
                <span className="italic font-light text-brand-rose">Melhor Versão</span>
              </h1>
              <p className="text-lg md:text-2xl text-brand-brown-dark/70 mb-12 leading-relaxed font-light max-w-xl">
                Descubra o equilíbrio perfeito entre ciência e sofisticação. 
                Tratamentos exclusivos para mulheres que não abrem mão do extraordinário.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => scrollToSection('servicos')}
                  className="bg-brand-brown-dark text-brand-offwhite px-12 py-5 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-brand-rose transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-brand-brown-dark/20"
                >
                  Explorar Tratamentos
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a 
                  href="https://wa.me/5511976639359"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/50 backdrop-blur-sm border border-brand-rose text-brand-brown-dark px-12 py-5 rounded-full text-sm uppercase tracking-widest font-bold hover:bg-brand-rose hover:text-white transition-all flex items-center justify-center gap-3"
                >
                  <MessageCircle size={20} />
                  Falar com Especialista
                </a>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <div className="w-[1px] h-16 bg-brand-brown-dark"></div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicos" className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xs uppercase tracking-[0.5em] font-sans mb-4 text-brand-rose font-bold">Protocolos Exclusivos</h2>
                <h3 className="text-5xl md:text-7xl font-serif text-brand-brown-dark mb-6">Menu de Experiências</h3>
                <p className="text-brand-brown-dark/50 font-light max-w-lg mx-auto italic">
                  Cada procedimento é uma jornada de autocuidado desenhada para realçar o que há de mais belo em você.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="group bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-3xl transition-all duration-700 border border-brand-rose/10 flex flex-col"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-rose/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold text-brand-brown-dark shadow-sm">
                      Premium
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-grow">
                    <h4 className="text-2xl font-serif mb-4 text-brand-brown-dark group-hover:text-brand-rose transition-colors">{service.title}</h4>
                    <p className="text-sm text-brand-brown-dark/60 mb-8 leading-relaxed font-light">
                      {service.description}
                    </p>
                    <div className="mt-auto pt-6 border-t border-brand-rose/10 flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Investimento</span>
                        <span className="text-xl font-serif font-bold text-brand-brown-light">{service.price}</span>
                      </div>
                      <a 
                        href={`https://wa.me/5511976639359?text=Olá Maria Clara! Gostaria de agendar minha ${service.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-brand-brown-dark text-brand-offwhite rounded-full flex items-center justify-center hover:bg-brand-rose transition-all shadow-lg transform group-hover:rotate-12"
                      >
                        <MessageCircle size={20} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Agenda Section */}
        <section id="agenda" className="py-32 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-xs uppercase tracking-[0.6em] font-sans mb-6 text-brand-rose font-bold">Reserva Online</h2>
                <h3 className="text-5xl md:text-7xl font-serif text-brand-brown-dark mb-10 leading-tight">Agende seu <br /><span className="italic font-light text-brand-brown-light">Momento VIP</span></h3>
              </motion.div>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="bg-brand-offwhite rounded-[60px] shadow-3xl border border-brand-rose/10 overflow-hidden relative z-10">
                {/* Booking Progress Bar */}
                <div className="flex border-b border-brand-rose/10">
                  {['Serviço', 'Data', 'Horário', 'Dados'].map((step, i) => {
                    const stepKeys: ('service' | 'date' | 'time' | 'info' | 'confirm')[] = ['service', 'date', 'time', 'info'];
                    const isActive = bookingStep === stepKeys[i] || (bookingStep === 'confirm' && i === 3);
                    const isCompleted = stepKeys.indexOf(bookingStep) > i;
                    
                    return (
                      <div key={step} className={`flex-1 py-6 text-center text-[10px] uppercase tracking-widest font-bold transition-colors relative ${isActive ? 'text-brand-rose' : 'text-brand-brown-dark/30'}`}>
                        {step}
                        {isActive && <motion.div layoutId="activeStep" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-rose" />}
                        {isCompleted && <CheckCircle size={12} className="absolute top-1/2 -translate-y-1/2 right-4 text-brand-rose" />}
                      </div>
                    );
                  })}
                </div>

                <div className="p-10 md:p-20">
                  <AnimatePresence mode="wait">
                    {bookingStep === 'service' && (
                      <motion.div
                        key="step-service"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                      >
                        {services.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => {
                              setBookingData({ ...bookingData, service });
                              setBookingStep('date');
                            }}
                            className="p-8 bg-white rounded-3xl border border-brand-rose/10 hover:border-brand-rose hover:shadow-xl transition-all text-left group"
                          >
                            <div className="w-12 h-12 bg-brand-rose/10 rounded-full flex items-center justify-center text-brand-rose mb-6 group-hover:bg-brand-rose group-hover:text-white transition-colors">
                              <Sparkles size={20} />
                            </div>
                            <h4 className="text-xl font-serif text-brand-brown-dark mb-2">{service.title}</h4>
                            <p className="text-xs text-brand-brown-dark/50 mb-4">{service.price}</p>
                            <div className="flex items-center text-[10px] uppercase tracking-widest font-bold text-brand-rose opacity-0 group-hover:opacity-100 transition-opacity">
                              Selecionar <ChevronRight size={12} className="ml-1" />
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {bookingStep === 'date' && (
                      <motion.div
                        key="step-date"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <div className="flex items-center justify-between mb-10">
                          <button onClick={() => setBookingStep('service')} className="text-[10px] uppercase tracking-widest font-bold text-brand-brown-dark/40 hover:text-brand-rose">← Voltar</button>
                          <h4 className="text-2xl font-serif text-brand-brown-dark">Março 2026</h4>
                          <div className="w-10"></div>
                        </div>
                        <div className="grid grid-cols-7 gap-4">
                          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                            <div key={i} className="text-center text-[10px] font-bold opacity-30 py-2">{day}</div>
                          ))}
                          {[...Array(31)].map((_, i) => {
                            const isPast = i + 1 < 11; // Mock current date is 11
                            return (
                              <button 
                                key={i} 
                                disabled={isPast}
                                onClick={() => {
                                  setBookingData({ ...bookingData, date: i + 1 });
                                  setBookingStep('time');
                                }}
                                className={`aspect-square flex items-center justify-center rounded-2xl text-sm font-serif transition-all ${
                                  isPast ? 'opacity-10 cursor-not-allowed' : 'hover:bg-brand-rose hover:text-white text-brand-brown-dark/60'
                                }`}
                              >
                                {i + 1}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {bookingStep === 'time' && (
                      <motion.div
                        key="step-time"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <div className="flex items-center justify-between mb-10">
                          <button onClick={() => setBookingStep('date')} className="text-[10px] uppercase tracking-widest font-bold text-brand-brown-dark/40 hover:text-brand-rose">← Voltar</button>
                          <h4 className="text-2xl font-serif text-brand-brown-dark">Horários para dia {bookingData.date}</h4>
                          <div className="w-10"></div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => {
                                setBookingData({ ...bookingData, time });
                                setBookingStep('info');
                              }}
                              className="py-6 bg-white rounded-2xl border border-brand-rose/10 hover:border-brand-rose hover:text-brand-rose transition-all font-serif text-lg text-brand-brown-dark"
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {bookingStep === 'info' && (
                      <motion.div
                        key="step-info"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="max-w-md mx-auto"
                      >
                        <div className="text-center mb-10">
                          <h4 className="text-2xl font-serif text-brand-brown-dark mb-2">Quase lá!</h4>
                          <p className="text-sm text-brand-brown-dark/50">Preencha seus dados para confirmar a reserva.</p>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2 block">Nome Completo</label>
                            <input 
                              type="text" 
                              value={bookingData.name}
                              onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                              className="w-full bg-white border border-brand-rose/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-rose transition-colors"
                              placeholder="Como podemos te chamar?"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2 block">WhatsApp</label>
                            <input 
                              type="tel" 
                              value={bookingData.phone}
                              onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                              className="w-full bg-white border border-brand-rose/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-rose transition-colors"
                              placeholder="(11) 99999-9999"
                            />
                          </div>
                          <button 
                            disabled={!bookingData.name || !bookingData.phone}
                            onClick={() => setBookingStep('confirm')}
                            className="w-full bg-brand-brown-dark text-brand-offwhite py-5 rounded-2xl text-xs uppercase tracking-widest font-bold hover:bg-brand-rose transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                          >
                            Confirmar Agendamento
                          </button>
                          <button onClick={() => setBookingStep('time')} className="w-full text-[10px] uppercase tracking-widest font-bold text-brand-brown-dark/40 hover:text-brand-rose">Voltar</button>
                        </div>
                      </motion.div>
                    )}

                    {bookingStep === 'confirm' && (
                      <motion.div
                        key="step-confirm"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-10"
                      >
                        <div className="w-24 h-24 bg-brand-rose text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-brand-rose/30">
                          <CheckCircle size={48} />
                        </div>
                        <h4 className="text-4xl font-serif text-brand-brown-dark mb-4">Agendamento Realizado!</h4>
                        <p className="text-brand-brown-dark/60 mb-10 max-w-sm mx-auto leading-relaxed">
                          Sua reserva para <strong>{bookingData.service?.title}</strong> no dia <strong>{bookingData.date} de Março</strong> às <strong>{bookingData.time}</strong> foi confirmada com sucesso.
                        </p>
                        <div className="bg-white p-8 rounded-3xl border border-brand-rose/10 mb-10 max-w-xs mx-auto text-left">
                          <p className="text-[10px] uppercase tracking-widest font-bold opacity-30 mb-4">Resumo da Reserva</p>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="opacity-50">Paciente:</span>
                              <span className="font-bold">{bookingData.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="opacity-50">Serviço:</span>
                              <span className="font-bold">{bookingData.service?.title}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="opacity-50">Valor:</span>
                              <span className="font-bold text-brand-rose">{bookingData.service?.price}</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={handleBookingReset}
                          className="text-[10px] uppercase tracking-widest font-bold text-brand-rose hover:underline"
                        >
                          Fazer outro agendamento
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Decorative background for calendar */}
              <div className="absolute -top-10 -right-10 w-96 h-96 bg-brand-rose/10 rounded-full blur-[120px]"></div>
              <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-brand-brown-light/10 rounded-full blur-[120px]"></div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="py-32 bg-brand-rose-light/30 relative overflow-hidden">
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-rose/10 rounded-full blur-[100px]"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-xs uppercase tracking-[0.6em] font-sans mb-6 text-brand-rose font-bold">A Especialista</h2>
                <h3 className="text-6xl md:text-7xl font-serif text-brand-brown-dark mb-10 leading-tight">Maria Clara <br /><span className="italic font-light text-brand-brown-light">Mendonça</span></h3>
                <div className="space-y-8 text-xl md:text-2xl text-brand-brown-dark/70 font-light leading-relaxed">
                  <p>
                    Referência em estética de luxo, Maria Clara Mendonça transformou o conceito de beleza em uma experiência sensorial completa. 
                    Sua clínica é o refúgio das mulheres que buscam resultados impecáveis com a máxima discrição e sofisticação.
                  </p>
                  <p className="italic border-l-2 border-brand-rose pl-8 py-2 max-w-2xl mx-auto">
                    "Minha filosofia é simples: realçar o que você já tem de mais bonito, sem exageros, apenas com a precisão que a sua pele merece."
                  </p>
                  <p>
                    Com formação internacional e as tecnologias mais avançadas do mercado, Maria Clara é a escolha das mulheres que entendem que investir em si mesma é o maior luxo de todos.
                  </p>
                </div>
                
                <div className="mt-16 flex flex-wrap justify-center gap-12">
                  <div className="flex flex-col">
                    <span className="text-4xl font-serif text-brand-brown-dark font-bold">10+</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Anos de Excelência</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-4xl font-serif text-brand-brown-dark font-bold">5k+</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Vidas Transformadas</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-4xl font-serif text-brand-brown-dark font-bold">100%</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Satisfação Premium</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-4xl font-serif text-brand-brown-dark font-bold">15+</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Prêmios de Estética</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="depoimentos" className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-xs uppercase tracking-[0.5em] font-sans mb-4 text-brand-rose font-bold">Relatos de Satisfação</h2>
              <h3 className="text-5xl font-serif text-brand-brown-dark">Mulheres que Inspiram</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-12 bg-brand-offwhite rounded-[50px] relative shadow-sm hover:shadow-2xl transition-all duration-500 border border-brand-rose/5 group"
                >
                  <div className="flex gap-1.5 mb-8">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <p className="text-brand-brown-dark/70 italic mb-10 leading-relaxed text-lg font-light">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-brand-rose/20 flex items-center justify-center text-brand-rose group-hover:bg-brand-rose group-hover:text-white transition-colors">
                      <User size={28} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-serif font-bold text-brand-brown-dark text-xl">{testimonial.name}</span>
                      <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Paciente VIP</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 bg-brand-brown-dark text-brand-offwhite relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1920&h=1080&auto=format&fit=crop" 
              alt="Texture" 
              className="w-full h-full object-cover mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-brown-dark via-transparent to-brand-brown-dark"></div>
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Heart className="mx-auto mb-10 text-brand-rose animate-pulse" size={56} />
              <h2 className="text-5xl md:text-8xl font-serif mb-10 max-w-4xl mx-auto leading-[1.1] tracking-tighter">
                O Luxo de ser você mesma começa aqui.
              </h2>
              <p className="text-xl md:text-2xl mb-16 opacity-70 font-light max-w-2xl mx-auto leading-relaxed">
                Permita-se viver a experiência Maria Clara Mendonça e descubra o poder de uma pele radiante.
              </p>
              <a 
                href="https://wa.me/5511976639359"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 bg-brand-rose text-white px-16 py-6 rounded-full text-lg uppercase tracking-widest font-bold hover:bg-white hover:text-brand-brown-dark transition-all transform hover:scale-105 shadow-3xl shadow-brand-rose/20"
              >
                <MessageCircle size={28} />
                Agendar Minha Avaliação
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-offwhite pt-32 pb-12 border-t border-brand-rose/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-1">
              <h1 className="text-3xl font-serif font-bold tracking-tighter text-brand-brown-dark mb-6">
                MARIA CLARA <span className="font-light italic text-brand-brown-light">Mendonça</span>
              </h1>
              <p className="text-sm text-brand-brown-dark/50 leading-relaxed mb-10 font-light">
                Onde a ciência encontra a sofisticação para criar resultados que celebram a sua essência feminina.
              </p>
              <div className="flex gap-5">
                <a href="#" className="w-12 h-12 rounded-full bg-white border border-brand-rose/20 flex items-center justify-center text-brand-brown-dark hover:bg-brand-rose hover:text-white transition-all shadow-sm">
                  <Instagram size={22} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white border border-brand-rose/20 flex items-center justify-center text-brand-brown-dark hover:bg-brand-rose hover:text-white transition-all shadow-sm">
                  <Facebook size={22} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-brand-brown-dark mb-8">Navegação</h4>
              <ul className="space-y-5 text-sm text-brand-brown-dark/60 font-medium">
                <li><button onClick={() => scrollToSection('inicio')} className="hover:text-brand-rose transition-colors">Início</button></li>
                <li><button onClick={() => scrollToSection('servicos')} className="hover:text-brand-rose transition-colors">Tratamentos</button></li>
                <li><button onClick={() => scrollToSection('sobre')} className="hover:text-brand-rose transition-colors">A Especialista</button></li>
                <li><button onClick={() => scrollToSection('depoimentos')} className="hover:text-brand-rose transition-colors">Depoimentos</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-brand-brown-dark mb-8">Informações</h4>
              <ul className="space-y-6 text-sm text-brand-brown-dark/60 font-light">
                <li className="flex items-start gap-4">
                  <MapPin size={20} className="text-brand-rose shrink-0" />
                  <span>Av. Paulista, 1000 - Sala 120<br />Jardins, São Paulo - SP</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone size={20} className="text-brand-rose shrink-0" />
                  <span>(11) 97663-9359</span>
                </li>
                <li className="flex items-center gap-4">
                  <Heart size={20} className="text-brand-rose shrink-0" />
                  <span>contato@mariaclara.com.br</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-brand-brown-dark mb-8">Atendimento</h4>
              <ul className="space-y-6 text-sm text-brand-brown-dark/60 font-light">
                <li className="flex items-center gap-4">
                  <Clock size={20} className="text-brand-rose shrink-0" />
                  <span>Segunda a Sexta: 09h — 19h</span>
                </li>
                <li className="flex items-center gap-4">
                  <Clock size={20} className="text-brand-rose shrink-0" />
                  <span>Sábado: 09h — 13h</span>
                </li>
                <li className="flex items-center gap-4">
                  <Sparkles size={20} className="text-brand-rose shrink-0" />
                  <span>Atendimento VIP sob reserva</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-brand-rose/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.4em] text-brand-brown-dark/30 font-bold">
            <p>© 2026 Maria Clara Mendonça. Todos os direitos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-brand-rose transition-colors">Privacidade</a>
              <a href="#" className="hover:text-brand-rose transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/5511976639359"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-10 right-10 z-50 bg-[#25D366] text-white p-5 rounded-full shadow-3xl hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageCircle size={36} />
        <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-white text-brand-brown-dark px-6 py-3 rounded-2xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all shadow-2xl pointer-events-none translate-x-4 group-hover:translate-x-0 border border-brand-rose/10">
          Fale com Maria Clara
        </span>
      </a>
    </div>
  );
}
