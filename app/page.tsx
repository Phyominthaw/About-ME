'use client';

import { useState, useEffect, useRef } from 'react';

type CardItem = {
  id: number;
  src: string;
  alt: string;
  style: { transform: string; zIndex: number; filter: string; opacity: number; transition?: string };
};

const initialCards: CardItem[] = [
  { id: 1, src: '/assets/images/3764.jpg', alt: 'Photo 5', style: { transform: 'rotate(10deg) translateY(21px) scale(0.85)', zIndex: 10, filter: 'brightness(0.5)', opacity: 0.5 } },
  { id: 2, src: '/assets/images/3866.jpg', alt: 'Photo 4', style: { transform: 'rotate(6deg) translateY(14px) scale(0.90)', zIndex: 20, filter: 'brightness(0.65)', opacity: 0.65 } },
  { id: 3, src: '/assets/images/3863.jpg', alt: 'Photo 3', style: { transform: 'rotate(2deg) translateY(10px) scale(0.92)', zIndex: 30, filter: 'brightness(0.75)', opacity: 0.75 } },
  { id: 4, src: '/assets/images/3767.jpg', alt: 'Photo 2', style: { transform: 'rotate(-4deg) translateY(7px) scale(0.95)', zIndex: 40, filter: 'brightness(0.85)', opacity: 0.9 } },
  { id: 5, src: '/assets/images/3766.jpg', alt: 'Photo 1', style: { transform: 'rotate(0deg) translateY(0px) scale(1)', zIndex: 50, filter: 'brightness(1)', opacity: 1 } },
];

const navLinks = [
  { href: '#about', label: 'About' }, { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' }, { href: '#contact', label: 'Contact' },
];
const interests = ['Web Development', 'UI/UX Design', 'Artificial Intelligence', 'Mobile Applications', 'Learning New Technologies'];
const frontend = [['React / Next.js', 'Advanced UI Framework'], ['Tailwind CSS', 'Modern Styling'], ['JavaScript / TS', 'Core Scripting'], ['React Native', 'Mobile Cross-Platform']];
const tools = [['Git & GitHub', 'Version Control'], ['Docker', 'Containerization'], ['Linux / Terminals', 'OS Environment'], ['Vercel / Netlify', 'Cloud Deployment']];
const badges = [
  ['React', '20232A', 'react', '61DAFB'], ['Next.js', '000000', 'next.js', 'white'],
  ['TypeScript', '007ACC', 'typescript', 'white'], ['Tailwind_CSS', '38B2AC', 'tailwind-css', 'white'],
  ['JavaScript', 'F7DF1E', 'javascript', 'black'], ['Node.js', '339933', 'node.js', 'white'],
  ['Docker', '2496ED', 'docker', 'white'], ['Git', 'F05032', 'git', 'white'],
  ['GitHub', '181717', 'github', 'white'], ['Linux', 'FCC624', 'linux', 'black'],
  ['Vercel', '000000', 'vercel', 'white'],
];

export default function Home() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState('');
  const [showVisitorCounter, setShowVisitorCounter] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);
  const [cards, setCards] = useState<CardItem[]>(initialCards);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationLock = useRef(false);
  const animationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startYRef = useRef(0);
  const swipeHandled = useRef(false);
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [elapsed, setElapsed] = useState('Loading...');

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('admin')) setIsAdminModalOpen(true);
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target); }
    }), { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    const startDate = new Date('2026-10-22T17:15:00+06:30').getTime();
    const update = () => {
      const diff = Date.now() - startDate;
      if (diff < 0) { setElapsed('Coming Soon ♡'); return; }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor(diff / 3600000) % 24;
      const mins = Math.floor(diff / 60000) % 60;
      const secs = Math.floor(diff / 1000) % 60;
      setElapsed(`${days} Days : ${hours} Hours : ${mins} Mins : ${secs} Secs`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => {
      observer.disconnect(); clearInterval(interval);
      if (animationTimer.current) clearTimeout(animationTimer.current);
      if (clickTimer.current) clearTimeout(clickTimer.current);
    };
  }, []);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMobileMenuOpen(false); setIsAdminModalOpen(false); } };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  const handleSecretClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    if (clickCount.current === 3) {
      clickCount.current = 0;
      setSecretOpen(prev => {
        if (!prev) requestAnimationFrame(() => setTimeout(() => document.getElementById('secret-section')?.scrollIntoView({ behavior: 'smooth' }), 30));
        return !prev;
      });
    } else clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 500);
  };

  const handleCardSwap = () => {
    if (animationLock.current) return;
    animationLock.current = true;
    setIsAnimating(true);
    setCards(prev => prev.map((card, i) => i === prev.length - 1 ? {
      ...card, style: { ...card.style, transition: 'transform 0.4s ease, opacity 0.4s ease', transform: 'translateY(-140%) rotate(15deg) scale(1.05)', opacity: 0 }
    } : card));
    animationTimer.current = setTimeout(() => {
      setCards(prev => {
        const rotated = [prev[prev.length - 1], ...prev.slice(0, -1)];
        const positions = [
          ['rotate(10deg) translateY(21px) scale(0.85)', 10, 'brightness(0.5)', 0.5],
          ['rotate(6deg) translateY(14px) scale(0.90)', 20, 'brightness(0.65)', 0.65],
          ['rotate(2deg) translateY(10px) scale(0.92)', 30, 'brightness(0.75)', 0.75],
          ['rotate(-4deg) translateY(7px) scale(0.95)', 40, 'brightness(0.85)', 0.9],
          ['rotate(0deg) translateY(0px) scale(1)', 50, 'brightness(1)', 1],
        ] as const;
        return rotated.map((card, index) => ({
          ...card, style: {
            transform: positions[index][0], zIndex: positions[index][1], filter: positions[index][2], opacity: positions[index][3],
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }
        }));
      });
      animationLock.current = false; setIsAnimating(false);
    }, 400);
  };

  const handleTouchStart = (e: React.TouchEvent) => { startYRef.current = e.touches[0].clientY; swipeHandled.current = false; };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swipeHandled.current && Math.abs(startYRef.current - e.touches[0].clientY) > 40) {
      swipeHandled.current = true; handleCardSwap();
    }
  };
  const handleAdminSubmit = () => {
    // Demo only: client-side passwords are NOT authentication. Implement server-side auth before production.
    if (adminPassInput === 'REPLACE_WITH_SERVER_AUTH') { setShowVisitorCounter(true); setIsAdminModalOpen(false); }
    else { alert('Access denied'); setAdminPassInput(''); }
  };

  return (
    <main className="min-h-screen bg-[#101114] text-zinc-100 font-sans antialiased selection:bg-indigo-500 selection:text-zinc-950 relative overflow-x-hidden scroll-smooth">
      <style jsx global>{`
        html { scroll-behavior: smooth; scroll-padding-top: 6rem; }
        .stack-card { transition: all .5s cubic-bezier(.4,0,.2,1); cursor:pointer; touch-action:pan-x; transform-origin:bottom center; }
        @keyframes float { 0%,100% {transform:translateY(0)} 50% {transform:translateY(-8px)} }
        .animate-float {animation:float 5s ease-in-out infinite}
        .reveal {opacity:0;transform:translateY(30px);transition:opacity .8s ease-out,transform .8s ease-out}
        .reveal.active {opacity:1;transform:translateY(0)}
        @keyframes cinematicIn {0% {opacity:0;transform:scale(.94) translateY(20px);filter:blur(12px)} 100% {opacity:1;transform:scale(1) translateY(0);filter:blur(0)}}
        .cinematic-reveal {animation:cinematicIn .8s cubic-bezier(.16,1,.3,1) forwards}
        .glow-card {position:relative;background:rgba(28,30,36,.75);border-radius:1.5rem;transition:all .4s ease}
        .glow-card::before {content:'';position:absolute;inset:-1px;border-radius:1.55rem;background:linear-gradient(135deg,rgba(129,140,248,0),rgba(39,39,42,0),rgba(129,140,248,0));z-index:-1;transition:background .5s ease}
        .glow-card:hover::before {background:linear-gradient(135deg,rgba(129,140,248,.35),rgba(39,39,42,.8),rgba(129,140,248,.15))}
        .glow-card:hover {transform:translateY(-2px);box-shadow:0 10px 25px -10px rgba(129,140,248,.15)}
        .secret-media-card {transition:transform .4s cubic-bezier(.4,0,.2,1),box-shadow .4s ease,border-color .4s ease;will-change:transform}
        .secret-media-card:hover {transform:scale(1.04) translateY(-4px);border-color:rgba(244,114,182,.8);box-shadow:0 12px 35px -5px rgba(244,114,182,.4),0 0 20px rgba(167,139,250,.3);z-index:10}
        @media(prefers-reduced-motion:reduce) {html{scroll-behavior:auto}.animate-float{animation:none}.reveal{opacity:1;transform:none}.cinematic-reveal{animation:none}}
      `}</style>

      {isAdminModalOpen && <div role="dialog" aria-modal="true" aria-labelledby="admin-title" className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center z-[70] p-4">
        <form onSubmit={e => { e.preventDefault(); handleAdminSubmit(); }} className="bg-zinc-900 border border-indigo-500/50 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center space-y-5">
          <h3 id="admin-title" className="text-xl font-bold text-indigo-400">🔐 Admin Authentication</h3>
          <p className="text-zinc-400 text-sm">Type the password to access this website</p>
          <input type="password" value={adminPassInput} onChange={e => setAdminPassInput(e.target.value)} placeholder="Password ထည့်ပါ..." className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-indigo-400 text-center" autoFocus />
          <div className="flex gap-3"><button type="submit" className="flex-1 bg-indigo-500 hover:bg-indigo-400 text-zinc-950 font-bold py-3 rounded-xl transition">ဝင်မည်</button><button type="button" onClick={() => setIsAdminModalOpen(false)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-3 rounded-xl transition">ပယ်ဖျက်မည်</button></div>
        </form>
      </div>}

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <nav className="fixed top-0 left-0 w-full bg-[#101114]/80 backdrop-blur-xl border-b border-zinc-800/80 z-50" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" id="secret-trigger" onClick={handleSecretClick} className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 cursor-pointer select-none">KURA.</a>
          <div className="space-x-8 text-sm font-medium hidden md:flex items-center text-zinc-300">{navLinks.map(link => <a key={link.href} href={link.href} className="hover:text-indigo-400 transition duration-300">{link.label}</a>)}</div>
          <button type="button" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen} aria-controls="mobile-nav" onClick={() => setMobileMenuOpen(v => !v)} className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-zinc-700 bg-zinc-900/80 text-indigo-300 hover:border-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-400 transition">
            {mobileMenuOpen ? <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg> : <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>}
          </button>
        </div>
        <div id="mobile-nav" className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-80 opacity-100 border-t border-zinc-800' : 'max-h-0 opacity-0 pointer-events-none'}`} inert={!mobileMenuOpen}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1 bg-[#101114]/95">{navLinks.map(link => <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-zinc-200 hover:text-indigo-300 hover:bg-indigo-500/10 focus-visible:outline-2 focus-visible:outline-indigo-400 transition">{link.label}</a>)}</div>
        </div>
      </nav>
      {mobileMenuOpen && <button type="button" aria-label="Close navigation overlay" onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 top-20 z-40 bg-black/40 md:hidden" />}

      <section className="min-h-screen flex items-center justify-center pt-28 pb-20 px-6 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <div className="text-center md:text-left space-y-6 reveal active">
            <div className="inline-flex items-center gap-2 bg-indigo-950/80 border border-indigo-700/50 px-4 py-2 rounded-full shadow-inner"><span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" /><span className="text-indigo-300 font-medium tracking-wide uppercase text-xs">Junior Developer · Creative Thinker</span></div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">Hey, I&apos;m <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Kura.</span></h1>
            <div className="inline-flex items-center gap-2.5 bg-zinc-900/90 border border-indigo-500/40 px-4 py-2 rounded-2xl shadow-lg backdrop-blur-md"><span className="text-pink-400 text-base animate-bounce">💡</span><a href="#contact" className="text-xs sm:text-sm font-medium text-zinc-300 hover:text-indigo-400 transition">Secret လေးတစ်ခုရှိတယ် သိချင်ရင်အောက်ဆုံးကိုသွားကြည့် <span className="text-indigo-400">↓</span></a></div>
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">A junior developer who loves turning ideas into meaningful digital experiences. Exploring the world of code, design, and technology — one project at a time.</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2"><a href="#projects" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-zinc-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5">Explore My Work</a><a href="#contact" className="border border-zinc-700 bg-zinc-800/40 hover:bg-zinc-800 hover:border-indigo-400/60 hover:text-indigo-400 px-7 py-3.5 rounded-xl transition-all duration-300">Say Hello</a></div>
          </div>
          <div className="flex flex-col items-center justify-center py-6 reveal active">
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 select-none animate-float cursor-pointer" id="card-stack" onClick={() => { if (swipeHandled.current) { swipeHandled.current = false; return; } handleCardSwap(); }} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} title="Click or Swipe to flip folder" role="button" tabIndex={0} aria-label="Flip photo stack" aria-disabled={isAnimating} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardSwap(); } }}>
              {cards.map(card => <div key={card.id} className={`stack-card absolute inset-0 rounded-3xl overflow-hidden shadow-2xl bg-zinc-800 ${card.style.zIndex === 50 ? 'border-2 border-indigo-500/50' : 'border border-zinc-700/80'}`} style={{ ...card.style, transition: card.style.transition || 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}><img src={card.src} alt={card.alt} draggable={false} className="w-full h-full object-cover pointer-events-none" />{card.style.zIndex === 50 && <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-50" />}</div>)}
            </div>
          </div>
        </div>
      </section>

      {secretOpen && <section id="secret-section" className="py-20 px-6 max-w-5xl mx-auto border-t border-pink-500/40 bg-purple-950/20 backdrop-blur-xl rounded-3xl my-10 shadow-2xl transition-all duration-700 cinematic-reveal">
        <div className="text-center mb-12"><h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300 tracking-tight">To the Girl Who Has My Heart ♡</h2><p className="text-zinc-400 text-sm mt-2">Every second with you is worth remembering.</p><div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto mt-3 rounded-full" /></div>
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="grid grid-cols-2 gap-4"><div className="secret-media-card rounded-2xl overflow-hidden border border-pink-400/40 shadow-lg relative bg-black"><video src="/assets/videos/video1.mp4" autoPlay loop muted playsInline className="w-full h-48 object-cover" /></div><div className="secret-media-card rounded-2xl overflow-hidden border border-pink-400/40 shadow-lg"><img src="/assets/images/photo2.jpg" alt="Special Photo 2" className="w-full h-48 object-cover" /></div><div className="secret-media-card rounded-2xl overflow-hidden border border-pink-400/40 shadow-lg relative bg-black"><video src="/assets/videos/video2.mp4" autoPlay loop muted playsInline className="w-full h-48 object-cover" /></div><div className="secret-media-card rounded-2xl overflow-hidden border border-pink-400/40 shadow-lg"><img src="/assets/images/photo8.png" alt="Special Photo 4" className="w-full h-48 object-cover" /></div></div>
          <div className="grid grid-cols-3 gap-3">{['photo3.jpg', 'photo5.jpg', 'photo6.jpg', 'photo7.jpg', 'photo9.jpg'].map((file, index) => <div key={file} className={`secret-media-card rounded-xl overflow-hidden border border-purple-400/30 shadow-md ${index === 4 ? 'col-span-2' : ''}`}><img src={`/assets/images/${file}`} alt={`Extra ${index + 1}`} className="w-full h-32 object-cover" /></div>)}</div>
        </div>
        <div className="mb-12 p-6 bg-zinc-900/80 border border-pink-400/40 rounded-2xl text-center shadow-lg backdrop-blur-md max-w-xl mx-auto space-y-2"><p className="text-xs sm:text-sm text-pink-300 uppercase tracking-widest font-medium">Our Little Forever ♡</p><p className="text-xs text-purple-300 italic">သော့်ဆီကချစ်တယ်စပြောတဲ့ရက်စွဲလေး (22 Oct 2026, 5:15 PM)</p><div id="anniversary-counter" className="text-base sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 pt-1" aria-live="off">{elapsed}</div></div>
        <div className="glow-card p-8 sm:p-12 border border-pink-400/30 backdrop-blur-xl space-y-6 shadow-2xl text-zinc-200 text-sm sm:text-base leading-relaxed">
          <p className="font-medium text-pink-300">Ngwe Thaw Tar Ye Khaung — a name that somehow feels a little more special than any other name in the world to me.</p>
          <p>I don&apos;t really know when or how it happened, but somewhere along the way, you became someone I genuinely adore. Maybe it&apos;s your beautiful smile, your adorable expressions, or the way you can look effortlessly pretty even in the simplest moments. There&apos;s just something about you that makes my heart feel a little different.</p>
          <p>I love how you can be both cute and beautiful without even trying. Whether you&apos;re making a funny face or simply looking at yourself in the mirror, every little version of you has its own charm. And honestly, I could look at your pictures a hundred times and still find myself smiling at them.</p>
          <p>But beyond your beauty, there&apos;s something else I truly admire about you — your ambition. Knowing that you&apos;re studying at the <span className="text-purple-300 font-medium border-b border-purple-400/30">University of Medicine (2), Yangon</span>, working towards a future where you&apos;ll dedicate yourself to helping others, makes me admire you even more. I know the journey to becoming a doctor isn&apos;t easy. There will be exhausting days, sleepless nights, difficult examinations, and moments when everything feels overwhelming. But I sincerely hope you never lose faith in yourself.</p>
          <p>I hope you become the doctor you&apos;ve always dreamed of being. I hope life treats you gently, your hard work eventually pays off, and every little dream you carry in your heart finds its way into reality.</p>
          <p>And perhaps, somewhere along that journey, I could be someone who quietly cheers for you, celebrates your achievements, listens to your worries, and reminds you how amazing you are whenever you forget.</p>
          <p>I don&apos;t know what the future holds for us, and I don&apos;t want to rush something as beautiful as these feelings. All I know is that having you in my thoughts makes even an ordinary day feel a little more meaningful.</p>
          <p>You don&apos;t have to be perfect, because it&apos;s never been about perfection. It&apos;s about you — your smile, your personality, your silly little expressions, your dreams, and all those tiny things that make you who you are.</p>
          <p className="font-semibold text-purple-300">Dear Ngwe Thaw Tar Ye Khaung,</p>
          <p>One day, when you finally wear that white coat with your name proudly written on it, I hope you&apos;ll look back and realize how far you&apos;ve come.</p>
          <p>And if life is kind enough to let me, I&apos;d love to be there, looking at you with the same admiration I have for you today.</p>
          <p>Until then, keep smiling, keep shining, and keep becoming the wonderful person you&apos;re meant to be.</p>
          <p className="text-pink-400 font-semibold pt-4">You may be studying to heal people&apos;s hearts someday, but somehow, without even knowing it, you&apos;ve already found a place in mine. ♡</p>
        </div>
      </section>}

      <section id="about" className="py-28 px-6 max-w-6xl mx-auto border-t border-zinc-800/80">
        <div className="text-center mb-16 reveal"><h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">A Little About Me</h2><div className="w-16 h-1 bg-indigo-500 mx-auto mt-3 rounded-full" /></div>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="glow-card p-3.5 border border-zinc-700/60 backdrop-blur-xl shadow-2xl group reveal"><div className="overflow-hidden rounded-2xl relative"><img src="/assets/images/3759.jpg" alt="Family Photo" className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-85 flex items-end p-5"><p className="text-sm text-zinc-200 font-semibold flex items-center gap-2">❤️ Family Memories &amp; Moments</p></div></div></div>
          <div className="glow-card p-8 sm:p-10 border border-zinc-700/60 backdrop-blur-xl space-y-5 shadow-xl reveal"><h3 className="text-2xl font-bold text-indigo-400">Who Am I?</h3><p className="text-zinc-300 leading-relaxed text-sm sm:text-base">I am someone who enjoys learning and who is aiming to become a developer, with a particular interest in web development, software engineering, and modern technology; since I am a junior developer I keep looking into new tools and carry out practical projects in order to improve my abilities.</p><p className="text-zinc-300 leading-relaxed text-sm sm:text-base">I am at the same time studying Geology at EYU, Business at UoPeople, and English at Queen&apos;s University, and these various academic activities enable me to develop strong skills in analytical thinking, communication, and problem-solving.</p><p className="text-zinc-300 leading-relaxed text-sm sm:text-base">I want to develop my skills as a developer, produce valuable digital experiences, and turn innovative ideas into practical solutions, making a real effort every day to be better than I was yesterday.</p></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8"><div className="glow-card p-8 border border-zinc-700/60 backdrop-blur-xl shadow-lg reveal"><h3 className="text-lg font-bold text-indigo-400 mb-5 flex items-center gap-3"><span className="text-xl">🎓</span> Academic Background</h3><ul className="space-y-3 text-sm text-zinc-300">{[['Geology', 'EYU'], ['Business', 'UoPeople'], ['English', "Queen's University"]].map(([subject, school], i) => <li key={subject} className={`flex items-center justify-between ${i < 2 ? 'border-b border-zinc-700/50 pb-3' : 'pt-1'}`}><span className="font-medium">{subject}</span><span className="text-indigo-400 font-semibold bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800/40">{school}</span></li>)}</ul></div><div className="glow-card p-8 border border-zinc-700/60 backdrop-blur-xl shadow-lg reveal"><h3 className="text-lg font-bold text-indigo-400 mb-5 flex items-center gap-3"><span className="text-xl">🎯</span> My Interests</h3><div className="flex flex-wrap gap-2.5">{interests.map(item => <span key={item} className="bg-zinc-900/80 border border-zinc-700 text-zinc-200 text-xs font-medium px-3.5 py-2 rounded-xl">{item}</span>)}</div></div></div>
      </section>

      <section id="skills" className="py-28 px-6 max-w-6xl mx-auto border-t border-zinc-800/80"><div className="text-center mb-16 reveal"><h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">My Tech Playground</h2><div className="w-16 h-1 bg-indigo-500 mx-auto mt-3 rounded-full" /><p className="text-zinc-400 text-sm mt-3">Hover over the cards to explore my technical capabilities</p></div>
        <div className="grid md:grid-cols-2 gap-8 mb-12">{[{ title: 'Frontend Development', emoji: '💻', items: frontend }, { title: 'Tools & Platforms', emoji: '🛠️', items: tools }].map(group => <div key={group.title} className="glow-card p-8 border border-zinc-700/60 backdrop-blur-xl shadow-lg reveal"><h3 className="text-xl font-bold text-indigo-400 mb-6 flex items-center gap-3"><span className="text-2xl">{group.emoji}</span> {group.title}</h3><div className="grid grid-cols-2 gap-4">{group.items.map(([name, detail]) => <div key={name} className="group bg-zinc-900/70 p-5 rounded-2xl border border-zinc-700/60 text-center hover:border-indigo-400 hover:bg-indigo-950/30 transition-all duration-300 transform hover:-translate-y-1 shadow-md"><p className="text-sm font-bold text-zinc-200 group-hover:text-indigo-400 transition">{name}</p><span className="text-[11px] text-zinc-400 mt-1 block">{detail}</span></div>)}</div></div>)}</div>
        <div className="glow-card p-8 border border-zinc-700/60 backdrop-blur-xl shadow-lg reveal text-center"><h3 className="text-lg font-bold text-indigo-400 mb-6 flex items-center justify-center gap-2"><span>⚡</span> Technologies &amp; Ecosystem Badges</h3><div className="flex flex-wrap justify-center items-center gap-3">{badges.map(([name, bg, logo, color]) => <img key={name} src={`https://img.shields.io/badge/${name}-${bg}?style=for-the-badge&logo=${logo}&logoColor=${color}`} alt={name.replace('_', ' ')} loading="lazy" />)}</div></div>
      </section>

      <section id="projects" className="py-28 px-6 max-w-6xl mx-auto border-t border-zinc-800/80"><div className="text-center mb-16 reveal"><h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Things I&apos;ve Built</h2><div className="w-16 h-1 bg-indigo-500 mx-auto mt-3 rounded-full" /></div><div className="grid md:grid-cols-1 max-w-xl mx-auto reveal"><div className="glow-card border border-zinc-700/60 overflow-hidden shadow-2xl group"><div className="p-8"><div className="h-60 bg-zinc-950 rounded-2xl mb-6 overflow-hidden border border-zinc-800 relative group-hover:scale-[1.02] transition duration-500"><img src="/assets/images/image_366cfe.png" alt="MLBB Skins Detector Preview" loading="lazy" className="w-full h-full object-cover" /></div><h3 className="text-2xl font-bold mb-3 text-white group-hover:text-indigo-400 transition">MLBB Skins Detector</h3><p className="text-zinc-400 text-sm sm:text-base mb-6 leading-relaxed">A web application tool built for Mobile Legends players to check and detect skin related information conveniently.</p><div className="flex flex-wrap gap-2 text-xs mb-6">{['Web App', 'Vercel'].map(tag => <span key={tag} className="bg-indigo-950/80 text-indigo-300 px-3.5 py-1.5 rounded-lg border border-indigo-800/40 font-medium">{tag}</span>)}</div></div><div className="px-8 py-5 bg-zinc-950/60 border-t border-zinc-800/80 flex justify-between items-center text-sm"><span className="text-zinc-400">Live Preview</span><a href="https://mlbbskinsdetector.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5 hover:underline">Visit Website <span>↗</span></a></div></div></div></section>

      <section id="contact" className="py-28 px-6 max-w-4xl mx-auto border-t border-zinc-800/80 text-center reveal"><h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">Let&apos;s Connect</h2><div className="w-16 h-1 bg-indigo-500 mx-auto mb-6 rounded-full" /><p className="text-zinc-400 mb-12 text-base max-w-lg mx-auto">Feel free to reach out to me through any of the platforms below for collaborations or just to say hello!</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto text-left mb-12">{[
        { href: 'mailto:phyominthaw323@gmail.com', emoji: '📧', label: 'Email', detail: 'phyominthaw323@gmail.com' },
        { href: 'https://t.me/matheus_kura', emoji: '📱', label: 'Telegram', detail: '@matheus_kura' },
        { href: 'https://www.facebook.com/share/1JVQSbf8Lj/', emoji: '🌐', label: 'Facebook', detail: 'Profile Link' },
        { href: 'https://www.snapchat.com/add/kura.thaw', emoji: '📸', label: 'Snapchat', detail: 'kura.thaw' },
      ].map(item => <a key={item.label} href={item.href} {...(item.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="glow-card p-5 border border-zinc-700/60 flex items-center space-x-4 shadow-lg"><span className="text-2xl p-2 bg-zinc-900 rounded-xl border border-zinc-800">{item.emoji}</span><div className="overflow-hidden"><p className="text-xs text-zinc-400 font-medium">{item.label}</p><p className="text-sm font-semibold text-zinc-200 truncate">{item.detail}</p></div></a>)}</div><div className="text-indigo-300/90 text-base sm:text-lg italic font-light tracking-wide bg-zinc-800/40 py-5 px-8 rounded-2xl border border-zinc-700/60 inline-block shadow-lg">&quot;Thank you for taking the time to visit my website.&quot;</div></section>
      <footer className="py-10 text-center text-xs text-zinc-500 border-t border-zinc-800/80 bg-zinc-950/60 space-y-2"><p>© 2026 Phyo Min Thaw (Kura).</p><p className="text-zinc-400 italic">Some secrets are hidden in plain sight (Try clicking Kura. multiple times).</p><p id="visitor-count" className="text-zinc-400 font-medium items-center justify-center gap-1.5" style={{ display: showVisitorCounter ? 'flex' : 'none' }}><span>👁️ Total Visits:</span><img src="https://komarev.com/ghpvc/?username=Phyominthaw&color=818cf8&style=flat-square" alt="Visitor Count" className="inline-block ml-1 align-middle" /></p></footer>
    </main>
  );
}
