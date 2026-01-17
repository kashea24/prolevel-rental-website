import React, { useState, useEffect, createContext, useContext } from 'react';

// ============================================
// CONTEXT & STATE MANAGEMENT
// ============================================

const AuthContext = createContext(null);
const CMSContext = createContext(null);

// Real equipment images from Unsplash (replace with your own)
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=80",
  heroAlt: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&q=80",
  concert: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
  conference: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  lighting: "https://images.unsplash.com/photo-1504509546545-e000b4a62425?w=800&q=80",
  stage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
  projector: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80",
  speaker: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80",
  led: "https://images.unsplash.com/photo-1559882743-a044c4e60fea?w=600&q=80",
  mixer: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80",
  camera: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
  console: "https://images.unsplash.com/photo-1571327073757-71d13c24de30?w=600&q=80",
  microphone: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80",
  event1: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  event2: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
};

// Initial CMS Data
const initialCMSData = {
  heroTitle: "Partnership. Responsibility. Operational Excellence.",
  heroSubtitle: "Premium AV Equipment Rental & Production Services for Unforgettable Events",
  heroCTA: "Request a Quote",
  aboutText: "Pro Level Rental delivers world-class audiovisual solutions for events of any scale. From corporate conferences to concert productions, our team brings technical expertise and premium equipment to every project.",
  equipment: [
    { id: 1, name: "Panasonic PT-RQ35K", category: "Projectors", specs: "35,000 lumens, 4K+, Laser", price: 1200, image: IMAGES.projector, featured: true },
    { id: 2, name: "d&b audiotechnik SL-Series", category: "Audio", specs: "Line Array System, Touring Grade", price: 2500, image: IMAGES.speaker, featured: true },
    { id: 3, name: "ROE Visual Black Pearl BP2", category: "LED Walls", specs: "2.8mm Pixel Pitch, Indoor/Outdoor", price: 150, image: IMAGES.led, featured: true },
    { id: 4, name: "Blackmagic ATEM Constellation 8K", category: "Video", specs: "8K Switcher, 40 Inputs", price: 800, image: IMAGES.mixer, featured: false },
    { id: 5, name: "Shure Axient Digital", category: "Audio", specs: "Wireless Microphone System", price: 350, image: IMAGES.microphone, featured: true },
    { id: 6, name: "GrandMA3 Full-Size", category: "Lighting", specs: "Lighting Console, 250K Parameters", price: 600, image: IMAGES.console, featured: false },
    { id: 7, name: "Sony FR7 PTZ Camera", category: "Cameras", specs: "Full-Frame, Cinema Line PTZ", price: 450, image: IMAGES.camera, featured: true },
    { id: 8, name: "Disguise GX3", category: "Media Servers", specs: "Real-Time 3D, 4K Output", price: 900, image: IMAGES.mixer, featured: false },
  ],
  categories: ["All", "Projectors", "Audio", "LED Walls", "Video", "Lighting", "Cameras", "Media Servers"],
  services: [
    { title: "Equipment Rental", desc: "Premium AV gear for any event size", icon: "📦", image: IMAGES.speaker },
    { title: "Full Production", desc: "End-to-end event production services", icon: "🎬", image: IMAGES.stage },
    { title: "Technical Support", desc: "24/7 expert technician support", icon: "🔧", image: IMAGES.mixer },
    { title: "Design Services", desc: "Custom show design & visualization", icon: "✨", image: IMAGES.lighting },
  ],
  testimonials: [
    { name: "Sarah Chen", company: "EventPro Agency", text: "Pro Level delivered flawlessly on our 10,000-person corporate event. Their team's attention to detail is unmatched.", avatar: "SC" },
    { name: "Marcus Johnson", company: "Live Nation", text: "We've worked with dozens of AV companies. Pro Level is our go-to for mission-critical productions.", avatar: "MJ" },
    { name: "Emily Rodriguez", company: "TechConf Global", text: "From the initial quote to strike, Pro Level exceeded every expectation. Their equipment is top-tier.", avatar: "ER" },
  ]
};

const initialUsers = [
  { id: 1, email: "admin@prolevelrental.com", password: "admin123", role: "admin", name: "Admin User" },
  { id: 2, email: "tech@prolevelrental.com", password: "tech123", role: "technician", name: "John Technician" },
  { id: 3, email: "client@example.com", password: "client123", role: "client", name: "Demo Client", company: "Event Co" },
];

const initialTechnicians = [
  { id: 1, name: "John Martinez", specialty: "Audio Engineering", phone: "555-0101", email: "john@prolevelrental.com", status: "available", certifications: ["Dante Level 3", "d&b Certified"], avatar: "JM" },
  { id: 2, name: "Emily Chen", specialty: "Video Engineering", phone: "555-0102", email: "emily@prolevelrental.com", status: "on-job", certifications: ["Blackmagic Certified", "disguise Certified"], avatar: "EC" },
  { id: 3, name: "Marcus Williams", specialty: "Lighting Design", phone: "555-0103", email: "marcus@prolevelrental.com", status: "available", certifications: ["GrandMA Programmer", "ETCP Certified"], avatar: "MW" },
];

const initialProjects = [
  { id: 1, name: "Tech Summit 2026", client: "client@example.com", status: "active", designs: [
    { name: "Main Stage Render", type: "image", url: "#" },
    { name: "Audio Plot", type: "pdf", url: "#" },
  ]},
];

// ============================================
// ICON COMPONENTS (Lucide-style)
// ============================================

const Icons = {
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Star: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Play: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  Dashboard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>
    </svg>
  ),
  Edit: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Trash: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  Package: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Folder: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  MapPin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Clock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Zap: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Shield: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Award: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
    </svg>
  ),
  Headphones: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
    </svg>
  ),
};

// ============================================
// MAIN APP COMPONENT
// ============================================

export default function ProLevelRental() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  const [cmsData, setCmsData] = useState(initialCMSData);
  const [technicians, setTechnicians] = useState(initialTechnicians);
  const [projects, setProjects] = useState(initialProjects);
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [quoteModal, setQuoteModal] = useState(false);

  const navigate = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      setLoginModal(false);
      if (foundUser.role === 'admin') navigate('admin');
      else if (foundUser.role === 'technician') navigate('technician-portal');
      else navigate('client-portal');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    navigate('home');
  };

  const register = (userData) => {
    const newUser = { ...userData, id: users.length + 1, role: 'client' };
    setUsers([...users, newUser]);
    setUser(newUser);
    setLoginModal(false);
    navigate('client-portal');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, users, setUsers }}>
      <CMSContext.Provider value={{ cmsData, setCmsData, technicians, setTechnicians, projects, setProjects }}>
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
          <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
          
          <Navigation 
            currentPage={currentPage} 
            navigate={navigate} 
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            setLoginModal={setLoginModal}
            user={user}
            logout={logout}
          />

          <main>
            {currentPage === 'home' && <HomePage navigate={navigate} setQuoteModal={setQuoteModal} />}
            {currentPage === 'equipment' && <EquipmentPage />}
            {currentPage === 'services' && <ServicesPage />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'contact' && <ContactPage />}
            {currentPage === 'admin' && user?.role === 'admin' && <AdminDashboard />}
            {currentPage === 'client-portal' && user?.role === 'client' && <ClientPortal />}
            {currentPage === 'technician-portal' && user?.role === 'technician' && <TechnicianPortal />}
          </main>

          <Footer navigate={navigate} />

          {loginModal && <LoginModal onClose={() => setLoginModal(false)} />}
          {quoteModal && <QuoteModal onClose={() => setQuoteModal(false)} />}
        </div>
      </CMSContext.Provider>
    </AuthContext.Provider>
  );
}

// ============================================
// NAVIGATION
// ============================================

function Navigation({ currentPage, navigate, mobileMenuOpen, setMobileMenuOpen, setLoginModal, user, logout }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Equipment', page: 'equipment' },
    { name: 'Services', page: 'services' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('home')} className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="Pro Level Rental" 
                className="h-12 w-auto transform group-hover:scale-105 transition-all"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">PRO LEVEL</div>
              <div className="text-xs text-gold-400 tracking-[0.2em]">RENTAL</div>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide rounded-lg transition-all ${
                  currentPage === item.page 
                    ? 'text-white bg-white/10' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
                {currentPage === item.page && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-500" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="tel:+15551234567" className="hidden md:flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Icons.Phone />
              <span>24/7 Support</span>
            </a>
            
            {user ? (
              <div className="hidden lg:flex items-center gap-3">
                <button
                  onClick={() => navigate(user.role === 'admin' ? 'admin' : user.role === 'technician' ? 'technician-portal' : 'client-portal')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm"
                >
                  <Icons.Dashboard />
                  <span>Dashboard</span>
                </button>
                <button onClick={logout} className="text-sm text-gray-500 hover:text-white transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setLoginModal(true)}
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 hover:shadow-lg hover:shadow-gold-500/25 hover:-translate-y-0.5 transition-all font-medium text-sm text-black font-semibold"
              >
                <Icons.User />
                <span>Login</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-white/10 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => navigate(item.page)}
                  className={`py-3 px-4 rounded-xl text-left transition-all ${
                    currentPage === item.page 
                      ? 'bg-gold-500/20 text-gold-400' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 mt-4 border-t border-white/10">
                {user ? (
                  <>
                    <button
                      onClick={() => navigate(user.role === 'admin' ? 'admin' : user.role === 'technician' ? 'technician-portal' : 'client-portal')}
                      className="w-full py-3 px-4 rounded-xl text-left hover:bg-white/5 flex items-center gap-3"
                    >
                      <Icons.Dashboard /> Dashboard
                    </button>
                    <button onClick={logout} className="w-full py-3 px-4 rounded-xl text-left text-gold-400">
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setLoginModal(true)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 font-medium text-black font-semibold"
                  >
                    Login / Register
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ============================================
// HOME PAGE
// ============================================

function HomePage({ navigate, setQuoteModal }) {
  const { cmsData } = useContext(CMSContext);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % cmsData.testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [cmsData.testimonials.length]);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src={IMAGES.hero} 
            alt="Concert production" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gold-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
              </span>
              <span className="text-sm text-gray-300">24/7 Production Support Available</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <span className="text-white">Partnership.</span><br />
              <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent">Responsibility.</span><br />
              <span className="text-white">Operational Excellence.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
              {cmsData.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-16">
              <button
                onClick={() => setQuoteModal(true)}
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-600 to-gold-400 font-semibold text-lg hover:shadow-2xl hover:shadow-gold-500/30 transition-all transform hover:-translate-y-1 text-black"
              >
                {cmsData.heroCTA}
                <Icons.ArrowRight />
              </button>
              <button
                onClick={() => navigate('equipment')}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 font-semibold text-lg hover:bg-white/20 transition-all"
              >
                Browse Equipment
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-12">
              {[
                { value: '500+', label: 'Events Yearly' },
                { value: '24/7', label: 'Support' },
                { value: '15+', label: 'Years Experience' },
                { value: '99.9%', label: 'Uptime' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* TRUSTED BY / LOGOS */}
      <section className="py-16 border-y border-white/5 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-500 mb-8 tracking-widest uppercase">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {['Netflix', 'Live Nation', 'ESPN', 'TEDx', 'Salesforce', 'Google'].map((brand) => (
              <div key={brand} className="text-2xl font-bold text-gray-600 hover:text-gray-400 transition-colors">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-500/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <div>
              <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">What We Do</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Full-Service Production
              </h2>
            </div>
            <p className="text-gray-400 max-w-md text-lg">
              From concept to execution, we deliver comprehensive AV solutions tailored to your unique vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cmsData.services.map((service, i) => (
              <div
                key={i}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.desc}</p>
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gold-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED EQUIPMENT */}
      <section className="py-24 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Top Gear</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Featured Equipment
              </h2>
            </div>
            <button
              onClick={() => navigate('equipment')}
              className="flex items-center gap-2 text-gold-400 hover:text-gold-300 font-medium group"
            >
              View Full Catalog 
              <span className="group-hover:translate-x-1 transition-transform"><Icons.ArrowRight /></span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cmsData.equipment.filter(e => e.featured).slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-gold-500/30 transition-all duration-300"
              >
                {/* Featured Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
                  <Icons.Star />
                  <span className="text-xs text-amber-400 font-medium">Featured</span>
                </div>

                {/* Image */}
                <div className="aspect-square overflow-hidden bg-slate-900">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="text-xs text-gold-400 font-medium tracking-wide">{item.category}</span>
                  <h3 className="font-bold text-lg mt-1 mb-1 line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-1">{item.specs}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-2xl font-bold text-white">${item.price}</span>
                      <span className="text-sm text-gray-500">/day</span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500/20 hover:bg-gold-500 text-gold-400 hover:text-black transition-all text-sm font-medium">
                      <Icons.Plus /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                    <img src={IMAGES.concert} alt="Concert" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-square bg-gradient-to-br from-gold-600 to-gold-400 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold">15+</div>
                      <div className="text-sm opacity-80">Years</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden aspect-square">
                    <img src={IMAGES.conference} alt="Conference" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                    <img src={IMAGES.lighting} alt="Lighting" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
                    <Icons.Shield />
                  </div>
                  <div>
                    <div className="font-bold text-lg">99.9% Uptime</div>
                    <div className="text-sm text-gray-500">Equipment Reliability</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Why Pro Level</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                The Pro Level Difference
              </h2>
              <p className="text-gray-400 text-lg mb-10">
                We don't just rent equipment—we partner with you to deliver flawless productions. Our commitment to excellence sets us apart.
              </p>

              <div className="space-y-6">
                {[
                  { icon: <Icons.Zap />, title: "24/7 Emergency Support", desc: "Round-the-clock technical assistance for peace of mind" },
                  { icon: <Icons.Award />, title: "Premium Equipment Only", desc: "Top-tier gear from industry-leading manufacturers" },
                  { icon: <Icons.Users />, title: "Expert Technicians", desc: "Certified professionals with decades of experience" },
                  { icon: <Icons.Headphones />, title: "Dedicated Project Manager", desc: "Single point of contact from quote to strike" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-400 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              What Our Clients Say
            </h2>
          </div>

          <div className="relative">
            <div className="absolute -top-8 left-0 text-8xl text-gold-500/20 font-serif">"</div>
            
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
              <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed mb-8 italic">
                {cmsData.testimonials[activeTestimonial].text}
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-600 to-gold-400 flex items-center justify-center font-bold text-lg">
                  {cmsData.testimonials[activeTestimonial].avatar}
                </div>
                <div>
                  <div className="font-semibold text-lg">{cmsData.testimonials[activeTestimonial].name}</div>
                  <div className="text-gray-500">{cmsData.testimonials[activeTestimonial].company}</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 right-0 text-8xl text-gold-500/20 font-serif rotate-180">"</div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {cmsData.testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeTestimonial 
                    ? 'w-8 bg-gold-500' 
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
              <img src={IMAGES.stage} alt="Stage" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-gold-600/90 to-gold-500/90" />
            </div>
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }} />

            {/* Content */}
            <div className="relative z-10 py-20 px-8 md:px-16 text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Ready to Elevate Your Event?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Let's discuss your production needs. Our team is ready to bring your vision to life with premium equipment and expert support.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setQuoteModal(true)}
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-black text-gold-400 border-2 border-gold-500 font-bold text-lg hover:shadow-2xl hover:shadow-gold-500/20 transition-all transform hover:-translate-y-1"
                >
                  Get a Free Quote
                  <Icons.ArrowRight />
                </button>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-white font-bold text-lg hover:bg-white/10 transition-all"
                >
                  <Icons.Phone /> (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================
// EQUIPMENT PAGE
// ============================================

function EquipmentPage() {
  const { cmsData } = useContext(CMSContext);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEquipment = cmsData.equipment.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.specs.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Our Inventory</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Equipment Catalog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Premium AV equipment ready for your next production. All gear is meticulously maintained and tested.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none transition-all text-lg"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {cmsData.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-3 rounded-xl font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-gold-600 to-gold-400 text-black font-semibold shadow-lg shadow-gold-500/25'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEquipment.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              {item.featured && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 border border-amber-500/30">
                  <Icons.Star />
                  <span className="text-xs text-amber-400">Featured</span>
                </div>
              )}
              
              <div className="aspect-square overflow-hidden bg-slate-900">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-5">
                <span className="text-xs text-gold-400 font-medium">{item.category}</span>
                <h3 className="font-bold text-lg mt-1 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{item.specs}</p>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <div>
                    <span className="text-2xl font-bold">${item.price}</span>
                    <span className="text-gray-500 text-sm">/day</span>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500/20 hover:bg-gold-500 text-gold-400 hover:text-black transition-all text-sm font-medium">
                    Add to Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">No equipment found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// SERVICES PAGE
// ============================================

function ServicesPage() {
  const services = [
    {
      title: "Equipment Rental",
      description: "Access our extensive inventory of premium AV equipment. From projectors to LED walls, audio systems to media servers—we have everything you need for any production scale.",
      features: ["Projectors & Displays", "Audio Systems", "LED Video Walls", "Lighting Fixtures", "Media Servers", "Cameras & Video"],
      image: IMAGES.speaker
    },
    {
      title: "Full Production Services",
      description: "End-to-end event production with dedicated project managers, technical directors, and crew. We handle everything from concept to strike.",
      features: ["Project Management", "Technical Direction", "Crew Staffing", "Load-in/Load-out", "On-site Support", "Post-Event Services"],
      image: IMAGES.stage
    },
    {
      title: "Show Design",
      description: "Our creative team brings your vision to life with custom stage designs, 3D visualization, and technical planning for unforgettable experiences.",
      features: ["3D Visualization", "Stage Design", "Lighting Design", "Content Creation", "Technical Drawings", "Budget Planning"],
      image: IMAGES.lighting
    },
    {
      title: "Technical Support",
      description: "24/7 expert support for all your technical needs. Our experienced engineers ensure flawless execution every time.",
      features: ["24/7 Availability", "Remote Support", "On-site Engineers", "Equipment Training", "Troubleshooting", "System Integration"],
      image: IMAGES.mixer
    },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">What We Offer</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Our Services
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive AV solutions tailored to your unique production needs
          </p>
        </div>

        <div className="space-y-24">
          {services.map((service, i) => (
            <div
              key={i}
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}
            >
              {/* Image */}
              <div className="flex-1 w-full">
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {service.title}
                </h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {service.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400">
                        <Icons.Check />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// ABOUT PAGE
// ============================================

function AboutPage() {
  const { cmsData } = useContext(CMSContext);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Our Story</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            About Pro Level Rental
          </h1>
        </div>

        {/* Hero Image */}
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] mb-20">
          <img src={IMAGES.team} alt="Our Team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-bold mb-2">Our Mission</h2>
              <p className="text-gray-300 max-w-xl">Delivering world-class AV solutions that bring visions to life</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              {cmsData.aboutText}
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Founded by industry veterans, Pro Level Rental emerged from a simple belief: every event deserves professional-grade equipment and expertise, regardless of size or budget. Over 15 years later, we've become a trusted partner for Fortune 500 companies, world-class venues, and independent producers alike.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "500+", label: "Events Per Year" },
              { value: "50+", label: "Expert Technicians" },
              { value: "99.9%", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Partnership", desc: "We work alongside you, not just for you. Your success is our success.", icon: "🤝", color: "from-blue-500/20" },
              { title: "Responsibility", desc: "We own every detail, from the first call to the final strike.", icon: "🎯", color: "from-green-500/20" },
              { title: "Excellence", desc: "Flawless execution isn't a goal—it's our standard.", icon: "⭐", color: "from-amber-500/20" },
            ].map((value, i) => (
              <div key={i} className={`p-8 rounded-3xl bg-gradient-to-br ${value.color} to-transparent border border-white/10 text-center`}>
                <div className="text-6xl mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CONTACT PAGE
// ============================================

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Contact Us
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to discuss your next project? We're here to help 24/7.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <div className="space-y-6 mb-12">
              {[
                { icon: <Icons.Phone />, title: "Phone", value: "(555) 123-4567", subtitle: "24/7 Emergency Support", color: "rose" },
                { icon: <Icons.Mail />, title: "Email", value: "info@prolevelrental.com", subtitle: "Response within 1 hour", color: "blue" },
                { icon: <Icons.MapPin />, title: "Location", value: "Los Angeles, CA", subtitle: "Serving nationwide", color: "green" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gold-500/30 transition-all">
                  <div className={`w-14 h-14 rounded-xl bg-${item.color}-500/20 flex items-center justify-center text-${item.color}-400`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">{item.title}</div>
                    <div className="text-xl font-semibold mb-1">{item.value}</div>
                    <div className="text-sm text-gold-400">{item.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Office Hours */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Icons.Clock /> Office Hours
              </h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex justify-between"><span>Monday - Friday</span><span className="text-white">8:00 AM - 8:00 PM</span></div>
                <div className="flex justify-between"><span>Saturday</span><span className="text-white">9:00 AM - 5:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span><span className="text-white">Emergency Only</span></div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-gold-400">
                <span className="flex h-2 w-2"><span className="animate-ping absolute h-2 w-2 rounded-full bg-gold-400 opacity-75"></span><span className="rounded-full h-2 w-2 bg-gold-500"></span></span>
                24/7 Emergency Support Available
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 text-green-400">
                  <Icons.Check />
                </div>
                <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                <p className="text-gray-400">We'll get back to you within 1 hour.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none transition-all" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Company</label>
                    <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message *</label>
                  <textarea required rows="5" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none transition-all resize-none" />
                </div>
                <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 font-semibold text-lg hover:shadow-lg hover:shadow-gold-500/25 transition-all text-black">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// ADMIN DASHBOARD (Simplified for space)
// ============================================

function AdminDashboard() {
  const { cmsData, setCmsData, technicians, projects } = useContext(CMSContext);
  const { users } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <Icons.Dashboard /> },
    { id: 'content', name: 'Content', icon: <Icons.Edit /> },
    { id: 'equipment', name: 'Equipment', icon: <Icons.Package /> },
    { id: 'technicians', name: 'Technicians', icon: <Icons.Users /> },
  ];

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Admin Dashboard</h1>
          <p className="text-gray-500">Manage your website content and settings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 shrink-0">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-gold-600 to-gold-400 text-black font-semibold' : 'hover:bg-white/5 text-gray-400'}`}>
                  {tab.icon} {tab.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Dashboard Overview</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Equipment Items', value: cmsData.equipment.length, color: 'rose' },
                      { label: 'Technicians', value: technicians.length, color: 'emerald' },
                      { label: 'Active Projects', value: projects.filter(p => p.status === 'active').length, color: 'amber' },
                      { label: 'Users', value: users.length, color: 'violet' },
                    ].map((stat, i) => (
                      <div key={i} className={`p-6 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20`}>
                        <div className={`text-3xl font-bold text-${stat.color}-400`}>{stat.value}</div>
                        <div className="text-sm text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400">Use the sidebar to manage different aspects of your website. All changes are saved in real-time.</p>
                </div>
              )}

              {activeTab === 'content' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Edit Website Content</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Hero Title</label>
                      <input type="text" value={cmsData.heroTitle} onChange={(e) => setCmsData({ ...cmsData, heroTitle: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Hero Subtitle</label>
                      <input type="text" value={cmsData.heroSubtitle} onChange={(e) => setCmsData({ ...cmsData, heroSubtitle: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">About Text</label>
                      <textarea rows="4" value={cmsData.aboutText} onChange={(e) => setCmsData({ ...cmsData, aboutText: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none resize-none" />
                    </div>
                    <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 font-medium text-black font-semibold">Save Changes</button>
                  </div>
                </div>
              )}

              {activeTab === 'equipment' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Manage Equipment</h2>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 font-medium text-black font-semibold"><Icons.Plus /> Add Equipment</button>
                  </div>
                  <div className="space-y-3">
                    {cmsData.equipment.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-500">{item.category} • ${item.price}/day</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"><Icons.Edit /></button>
                          <button className="p-2 rounded-lg hover:bg-gold-500/20 text-gray-400 hover:text-gold-400"><Icons.Trash /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'technicians' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Manage Technicians</h2>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 font-medium text-black font-semibold"><Icons.Plus /> Add Technician</button>
                  </div>
                  <div className="space-y-3">
                    {technicians.map((tech) => (
                      <div key={tech.id} className="p-4 rounded-xl bg-white/5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-600 to-gold-400 flex items-center justify-center font-bold">{tech.avatar}</div>
                            <div>
                              <div className="font-medium">{tech.name}</div>
                              <div className="text-sm text-gray-500">{tech.specialty}</div>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs ${tech.status === 'available' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>{tech.status}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tech.certifications.map((cert, i) => (
                            <span key={i} className="px-2 py-1 rounded bg-white/5 text-xs text-gray-400">{cert}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CLIENT PORTAL
// ============================================

function ClientPortal() {
  const { user } = useContext(AuthContext);
  const { projects } = useContext(CMSContext);
  const clientProjects = projects.filter(p => p.client === user?.email);

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Welcome, {user?.name}</h1>
          <p className="text-gray-500">View your projects and shared designs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gold-500/20 to-transparent border border-gold-500/20">
            <h3 className="font-semibold mb-2">Request New Quote</h3>
            <p className="text-sm text-gray-400 mb-4">Need equipment for an upcoming event?</p>
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 font-medium text-sm text-black font-semibold">Request Quote</button>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-2">Contact Support</h3>
            <p className="text-sm text-gray-400 mb-4">Have questions about your project?</p>
            <button className="px-4 py-2 rounded-xl bg-white/10 font-medium text-sm">Get Help</button>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
        {clientProjects.length > 0 ? (
          <div className="space-y-4">
            {clientProjects.map((project) => (
              <div key={project.id} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs ${project.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{project.status}</span>
                  </div>
                </div>
                <h4 className="text-sm text-gray-400 mb-3">Shared Designs</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {project.designs.map((design, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <Icons.Folder />
                      <div>
                        <div className="font-medium text-sm">{design.name}</div>
                        <div className="text-xs text-gray-500">{design.type.toUpperCase()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-2xl bg-white/5 border border-white/10 text-center">
            <Icons.Folder />
            <p className="text-gray-500 mt-4">No projects yet. Contact us to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// TECHNICIAN PORTAL
// ============================================

function TechnicianPortal() {
  const { user } = useContext(AuthContext);
  const { technicians, projects } = useContext(CMSContext);
  const techInfo = technicians.find(t => t.email === user?.email) || technicians[0];

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Technician Portal</h1>
          <p className="text-gray-500">Manage your assignments and availability</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-600 to-gold-400 flex items-center justify-center text-2xl font-bold">{techInfo?.avatar}</div>
              <div>
                <h2 className="text-xl font-semibold">{techInfo?.name}</h2>
                <p className="text-gray-500">{techInfo?.specialty}</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-xl ${techInfo?.status === 'available' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>{techInfo?.status}</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
          <h3 className="font-semibold mb-4">Your Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {(techInfo?.certifications || []).map((cert, i) => (
              <span key={i} className="px-4 py-2 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm">{cert}</span>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="font-semibold mb-4">Active Projects</h3>
          <div className="space-y-3">
            {projects.filter(p => p.status === 'active').map((project) => (
              <div key={project.id} className="p-4 rounded-xl bg-white/5 flex justify-between items-center">
                <div>
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-gray-500">{project.designs.length} design files</div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-white/10 text-sm font-medium">View Details</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// LOGIN MODAL
// ============================================

function LoginModal({ onClose }) {
  const { login, register } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '', name: '', company: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      const success = login(formData.email, formData.password);
      if (!success) setError('Invalid email or password');
    } else {
      register(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-slate-900 border border-white/10">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"><Icons.Close /></button>
        
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="text-gray-500 mb-6">{isLogin ? 'Sign in to access your dashboard' : 'Register for a client account'}</p>

        {error && <div className="mb-4 p-3 rounded-xl bg-gold-500/20 text-gold-400 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Company</label>
                <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none" />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input type="password" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none" />
          </div>
          <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 font-semibold text-black">{isLogin ? 'Sign In' : 'Create Account'}</button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-gold-400 hover:underline">{isLogin ? "Don't have an account? Register" : 'Already have an account? Sign In'}</button>
        </div>

        {isLogin && (
          <div className="mt-6 p-4 rounded-xl bg-white/5 text-sm">
            <p className="text-gray-400 mb-2">Demo Accounts:</p>
            <p className="text-gray-500">Admin: admin@prolevelrental.com / admin123</p>
            <p className="text-gray-500">Tech: tech@prolevelrental.com / tech123</p>
            <p className="text-gray-500">Client: client@example.com / client123</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// QUOTE MODAL
// ============================================

function QuoteModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', eventDate: '', eventType: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 rounded-3xl bg-slate-900 border border-white/10">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg"><Icons.Close /></button>

        {submitted ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 text-green-400"><Icons.Check /></div>
            <h2 className="text-2xl font-bold mb-3">Quote Request Submitted!</h2>
            <p className="text-gray-400 mb-6">We'll get back to you within 1 hour.</p>
            <button onClick={onClose} className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 font-medium text-black font-semibold">Close</button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Request a Quote</h2>
            <p className="text-gray-500 mb-6">Tell us about your event and we'll prepare a custom quote.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="block text-sm text-gray-400 mb-2">Name *</label><input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none" /></div>
                <div><label className="block text-sm text-gray-400 mb-2">Email *</label><input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none" /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="block text-sm text-gray-400 mb-2">Phone</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none" /></div>
                <div><label className="block text-sm text-gray-400 mb-2">Company</label><input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none" /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="block text-sm text-gray-400 mb-2">Event Date</label><input type="date" value={formData.eventDate} onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none" /></div>
                <div><label className="block text-sm text-gray-400 mb-2">Event Type</label><select value={formData.eventType} onChange={(e) => setFormData({ ...formData, eventType: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none"><option value="">Select...</option><option value="corporate">Corporate Event</option><option value="concert">Concert/Festival</option><option value="conference">Conference</option><option value="wedding">Wedding</option><option value="other">Other</option></select></div>
              </div>
              <div><label className="block text-sm text-gray-400 mb-2">Event Description *</label><textarea required rows="4" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Tell us about your event..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-gold-500/50 outline-none resize-none" /></div>
              <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 font-semibold text-lg text-black">Submit Quote Request</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================
// FOOTER
// ============================================

function Footer({ navigate }) {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Pro Level Rental" className="h-10 w-auto" />
              <div><div className="font-bold">PRO LEVEL</div><div className="text-xs text-gold-400">RENTAL</div></div>
            </div>
            <p className="text-gray-500 text-sm">Premium AV equipment rental and production services for events of all sizes.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">{['Equipment', 'Services', 'About', 'Contact'].map((item) => (<button key={item} onClick={() => navigate(item.toLowerCase())} className="block text-gray-500 hover:text-white transition-colors">{item}</button>))}</div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <div className="space-y-2 text-gray-500"><p>Equipment Rental</p><p>Full Production</p><p>Technical Support</p><p>Show Design</p></div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3"><div className="flex items-center gap-3 text-gray-500"><Icons.Phone /><span>(555) 123-4567</span></div><div className="flex items-center gap-3 text-gray-500"><Icons.Mail /><span>info@prolevelrental.com</span></div></div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2026 Pro Level Rental. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500"><a href="#" className="hover:text-white transition-colors">Privacy Policy</a><a href="#" className="hover:text-white transition-colors">Terms of Service</a></div>
        </div>
      </div>
    </footer>
  );
}
