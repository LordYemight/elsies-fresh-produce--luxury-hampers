'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Leaf, 
  PackageCheck, 
  MapPin, 
  ShoppingBag, 
  ChefHat, 
  Mail, 
  Instagram, 
  Phone, 
  Menu, 
  X, 
  ImageOff, 
  CheckCheck,
  Star,
  Clock,
  Box,
  ChevronRight
} from 'lucide-react';

// --- Types ---
interface Product {
  name: string;
  description: string;
  price: string;
  image_url: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface Testimonial {
  name: string;
  text: string;
  role: string;
}

// --- Brand & Content Configuration ---
const brand = {
  name: "Elsie's Fresh Produce",
  tagline: "Where Freshness Meets Finesse.",
  description: "Curating the finest seasonal produce and exquisitely crafted luxury hampers for every occasion in Lagos.",
  industry: "gifting",
  region: "nigeria",
  colors: {
    primary: "#B22222",
    secondary: "#38761d",
    accent: "#f7f3e3"
  }
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1704752603732-b160e12fd5a3?q=80&w=2000",
  products: [
    "https://images.unsplash.com/photo-1704752603732-b160e12fd5a3?q=80&w=1000",
    "https://images.unsplash.com/photo-1704752603732-b160e12fd5a3?q=80&w=1000",
    "https://images.unsplash.com/photo-1704752603732-b160e12fd5a3?q=80&w=1000"
  ]
};

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/60 to-secondary/20 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-accent/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-primary shadow-2xl py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-accent text-primary font-heading font-black flex items-center justify-center text-xl rounded-lg">E</div>
          <span className="text-accent font-heading font-bold text-xl tracking-tight hidden sm:block">ELSIE&apos;S</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Shop', 'Occasions', 'Delivery'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-accent/70 hover:text-accent font-medium tracking-wide transition-colors uppercase text-xs">
              {link}
            </a>
          ))}
          <a href="#contact" className="bg-secondary text-accent px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all">
            Order Now
          </a>
        </div>

        <button onClick={() => setMobileMenu(true)} className="md:hidden text-accent">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-all duration-500 ${mobileMenu ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenu(false)} />
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-8 transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent text-primary font-heading font-black flex items-center justify-center text-xl rounded-lg">E</div>
            </div>
            <button onClick={() => setMobileMenu(false)} className="text-accent"><X size={28} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {['Shop', 'Occasions', 'Delivery', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="text-accent font-heading text-3xl font-bold">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-scaleIn">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6 border border-accent/30">
          <CheckCheck size={28} className="text-accent" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-accent">Order Received</h3>
        <p className="text-accent/50 mt-2 max-w-xs">Sharp delivery, Lagos nationwide. We&apos;ll reach out shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input 
          type="text" placeholder="Name" 
          value={form.name} onChange={e => setForm({...form, name: e.target.value})} required
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-accent placeholder-accent/30 outline-none focus:border-accent/40" 
        />
        <input 
          type="email" placeholder="Email" 
          value={form.email} onChange={e => setForm({...form, email: e.target.value})} required
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-accent placeholder-accent/30 outline-none focus:border-accent/40" 
        />
      </div>
      <input 
        type="tel" placeholder="Phone Number" 
        value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required
        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-accent placeholder-accent/30 outline-none focus:border-accent/40" 
      />
      <textarea 
        rows={4} placeholder="Your Hamper Customization or Message" 
        value={form.message} onChange={e => setForm({...form, message: e.target.value})} required
        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-accent placeholder-accent/30 outline-none resize-none focus:border-accent/40" 
      />
      <button type="submit" disabled={loading} className="w-full bg-accent text-primary py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all disabled:opacity-50">
        {loading ? 'Processing...' : 'Send Inquiry'}
      </button>
    </form>
  );
};

export default function Home() {
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testimonialReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  const features = [
    { title: "Seasonal Perfection", description: "We source only the freshest, peak-season produce, ensuring unparalleled taste and quality.", icon: <Leaf size={24}/> },
    { title: "Impeccable Presentation", description: "Hampers are carefully arranged by our design team to create a memorable visual experience.", icon: <PackageCheck size={24}/> },
    { title: "Reliable Lagos Delivery", description: "Trust us to deliver your fresh gifts safely and on time across Ketu and the wider metropolis.", icon: <MapPin size={24}/> }
  ];

  const products = [
    { name: "Ramadan Luxe Hamper", description: "A generous collection of dates, exotic fruits, artisan cheeses, and premium nuts.", price: "₦35,000" },
    { name: "Signature Fruit Basket", description: "Beautiful arrangement of crisp apples, sweet oranges, and ripe pears in woven straw.", price: "₦18,500" },
    { name: "The Corporate Thank You", description: "Elegant and professional. Includes fine tea, premium biscuits, and seasonal citrus.", price: "₦28,900" }
  ];

  const testimonials = [
    { name: "Ayo M.", role: "Corporate Client", text: "The Ramadan box was stunning. The dates were the sweetest I've had this year. Truly luxury." },
    { name: "Funmilayo D.", role: "Satisfied Customer", text: "Ordered a birthday basket last minute. Delivery to Ikoyi was flawless and the presentation was five-star." }
  ];

  return (
    <main className="bg-primary">
      <Navbar />

      {/* HERO-C Section */}
      <section id="home" className="min-h-screen grid md:grid-cols-[1fr_1fr] items-stretch bg-primary overflow-hidden">
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-32">
          <h1 className="font-heading text-5xl md:text-[5.5rem] font-black text-accent leading-[0.9] tracking-tighter">
            Luxury Hampers for the Season of Giving
          </h1>
          <p className="text-accent/60 mt-8 text-xl max-w-md leading-relaxed">
            Discover Elsie&apos;s Ramadan Luxe Packages, handcrafted with the freshest global and local delights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <a href="#products" className="bg-secondary text-accent px-10 py-4 font-bold rounded-full text-center hover:scale-105 transition-all">
              Explore Ramadan Collection
            </a>
          </div>
          <div className="mt-16 flex gap-10 border-t border-accent/10 pt-8">
            <div>
              <p className="font-heading text-4xl font-black text-accent">5+</p>
              <p className="text-accent/40 text-xs uppercase tracking-widest mt-1 font-bold">Years of Excellence</p>
            </div>
            <div>
              <p className="font-heading text-4xl font-black text-accent">100%</p>
              <p className="text-accent/40 text-xs uppercase tracking-widest mt-1 font-bold">Fresh Guarantee</p>
            </div>
          </div>
        </div>
        <div className="relative min-h-[50vh] md:min-h-full overflow-hidden">
          <SafeImage src={IMAGES.hero} alt="Luxury produce" fill className="object-cover animate-fadeIn" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/20 to-transparent" />
        </div>
      </section>

      {/* DIVIDER RULE */}
      <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <span className="text-accent/50 font-mono text-[10px] tracking-[0.5em] uppercase whitespace-nowrap">
          The Elsie&apos;s Difference
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      {/* FEATURES SECTION - F-STICKY */}
      <section ref={featuresReveal.ref} className="py-28 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-5xl font-bold text-accent mb-16">The core of our promise.</h2>
          <div className="space-y-6">
            {features.map((f, idx) => (
              <div 
                key={idx} 
                className={`sticky group transition-all duration-700 ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} 
                style={{ top: `${100 + idx * 30}px`, transitionDelay: `${idx * 150}ms` }}
              >
                <div className="bg-secondary/20 backdrop-blur-md rounded-2xl p-8 border border-accent/10 flex items-start gap-8 shadow-2xl">
                  <div className="w-14 h-14 rounded-2xl bg-accent text-primary flex items-center justify-center shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-heading text-3xl font-bold text-accent">{f.title}</h3>
                      <span className="text-accent/20 font-mono text-sm">0{idx + 1}</span>
                    </div>
                    <p className="text-accent/60 leading-relaxed text-lg">{f.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION - P-ASYMMETRIC */}
      <section id="shop" ref={productsReveal.ref} className="py-28 px-6 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-heading text-6xl font-black text-accent">What&apos;s Inside</h2>
              <p className="text-accent/40 mt-4 text-xl">A gallery of what awaits you.</p>
            </div>
            <a href="#contact" className="text-accent border-b border-accent/30 pb-1 hover:border-accent transition-all font-bold">
              View Full Price List →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Featured Product */}
            <div className={`md:col-span-7 group relative rounded-3xl overflow-hidden min-h-[500px] transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <SafeImage src={IMAGES.products[0]} alt={products[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 p-10">
                <span className="bg-accent text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">Featured</span>
                <h3 className="font-heading text-4xl font-bold text-accent">{products[0].name}</h3>
                <p className="text-accent/60 mt-4 max-w-sm">{products[0].description}</p>
                <div className="mt-8 flex items-center gap-6">
                  <span className="text-3xl font-black text-accent">{products[0].price}</span>
                  <a href="#contact" className="bg-accent text-primary px-8 py-3 rounded-full font-bold hover:bg-white transition-colors">Inquire</a>
                </div>
              </div>
            </div>

            {/* Other Products Grid */}
            <div className="md:col-span-5 flex flex-col gap-6">
              {products.slice(1).map((p, i) => (
                <div 
                  key={i} 
                  className={`group relative flex-1 rounded-3xl overflow-hidden min-h-[240px] transition-all duration-1000 delay-300 ${productsReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
                >
                  <SafeImage src={IMAGES.products[i + 1]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-8">
                    <h3 className="font-heading text-2xl font-bold text-accent">{p.name}</h3>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xl font-black text-accent/80">{p.price}</span>
                      <a href="#contact" className="text-accent/60 hover:text-accent font-bold text-sm">Order Now →</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - Split Layout */}
      <section id="occasions" ref={aboutReveal.ref} className="py-28 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className={`w-full md:w-1/2 transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative aspect-square md:aspect-[4/5] rounded-[40px] overflow-hidden border-8 border-accent/5">
              <SafeImage src={IMAGES.hero} alt="Our craftsmanship" fill className="object-cover" />
              <div className="absolute top-10 left-10 p-6 bg-primary/80 backdrop-blur-xl rounded-2xl border border-accent/10">
                <ChefHat size={32} className="text-accent" />
                <p className="mt-4 font-heading text-xl font-bold text-accent leading-tight">Masterfully<br/>Curated</p>
              </div>
            </div>
          </div>
          <div className={`w-full md:w-1/2 transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <span className="text-secondary font-bold tracking-widest text-sm uppercase">Our Standard</span>
            <h2 className="font-heading text-6xl font-bold text-accent mt-4 leading-tight">Handpicked Excellence</h2>
            <p className="text-accent/60 mt-8 text-xl leading-relaxed">
              From the freshest orchard-picked produce to the final silk ribbon, Elsie&apos;s maintains a standard of excellence that elevates everyday gifting into an art form. We believe a gift should tell a story of care.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mt-12 border-t border-accent/10 pt-10">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-accent">
                  <Star size={18} fill="currentColor"/>
                  <span className="font-black text-2xl">98%</span>
                </div>
                <p className="text-accent/40 text-xs font-bold uppercase tracking-widest">On-Time Lagos Delivery</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-accent">
                  <Clock size={18}/>
                  <span className="font-black text-2xl">Same-Day</span>
                </div>
                <p className="text-accent/40 text-xs font-bold uppercase tracking-widest">Available Options</p>
              </div>
            </div>

            <a href="#contact" className="inline-flex items-center gap-3 bg-secondary text-accent px-10 py-4 rounded-full font-bold mt-12 hover:scale-105 transition-all">
              Start Your Gifting Journey <ChevronRight size={18}/>
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - T-SPOTLIGHT */}
      <section ref={testimonialReveal.ref} className="py-28 px-6 bg-secondary/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[140px] opacity-20 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-heading text-5xl font-bold text-accent mb-16">Words from Our Clients</h2>
          <div className="space-y-12">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className={`relative py-12 px-10 rounded-3xl border border-accent/5 bg-primary/40 backdrop-blur-md transition-all duration-700 ${testimonialReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-accent text-primary rounded-full flex items-center justify-center font-black text-2xl">&ldquo;</div>
                <p className="text-accent/70 text-2xl font-medium leading-relaxed italic">
                  {t.text}
                </p>
                <div className="mt-10 flex flex-col items-center">
                  <div className="w-12 h-1 h-px bg-accent/20 mb-4" />
                  <p className="font-heading text-xl font-bold text-accent">{t.name}</p>
                  <p className="text-accent/40 text-sm mt-1 uppercase tracking-widest font-bold">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - C2 DIAGONAL SPLIT */}
      <section id="contact" ref={contactReveal.ref} className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-secondary" />
        <div className="absolute inset-0 bg-primary [clip-path:polygon(0_0,60%_0,40%_100%,0_100%)] hidden md:block" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-7xl font-black text-accent leading-[0.85] tracking-tighter">
              Your Gifting Journey Starts Here
            </h2>
            <p className="text-accent/60 mt-8 text-xl max-w-sm">
              Ready to send something special? Reach out for custom hampers and large-scale corporate gifts.
            </p>
            <div className="mt-12 space-y-6">
              <a href="https://instagram.com/elsies_freshproduce" target="_blank" className="flex items-center gap-4 text-accent hover:translate-x-2 transition-transform">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Instagram size={18} />
                </div>
                <span className="font-medium">@elsies_freshproduce</span>
              </a>
              <div className="flex items-center gap-4 text-accent">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <span className="font-medium">Tipper garage, Ketu, Lagos, Nigeria</span>
              </div>
            </div>
          </div>
          
          <div className={`bg-primary/60 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 shadow-2xl transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h3 className="font-heading text-3xl font-bold text-accent mb-8">Send an Inquiry</h3>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-primary border-t border-accent/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent text-primary font-heading font-black flex items-center justify-center text-xl rounded-lg">E</div>
                <span className="text-accent font-heading font-bold text-2xl">ELSIE&apos;S</span>
              </div>
              <p className="text-accent/40 max-w-sm leading-relaxed">
                Curating the finest seasonal produce and luxury hampers since 2018. Where freshness meets finesse in every single box.
              </p>
            </div>
            <div>
              <h4 className="text-accent font-bold uppercase tracking-widest text-xs mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#home" className="text-accent/40 hover:text-accent transition-colors">Home</a></li>
                <li><a href="#shop" className="text-accent/40 hover:text-accent transition-colors">Shop All</a></li>
                <li><a href="#contact" className="text-accent/40 hover:text-accent transition-colors">Custom Orders</a></li>
                <li><a href="#contact" className="text-accent/40 hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-accent font-bold uppercase tracking-widest text-xs mb-6">Contact</h4>
              <ul className="space-y-4 text-accent/40">
                <li>Tipper garage, Ketu, Lagos</li>
                <li>Lagos, Nigeria</li>
                <li className="flex items-center gap-2 mt-4">
                  <Instagram size={16} /> @elsies_freshproduce
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-accent/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-accent/20 text-xs">
              &copy; {new Date().getFullYear()} Elsie&apos;s Fresh Produce & Luxury Hampers. All rights reserved.
            </p>
            <p className="text-accent/20 text-[10px] tracking-[0.2em] uppercase font-bold">
              Crafted for Lagos Elite
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}