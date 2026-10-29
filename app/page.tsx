'use client';

import { useState, useEffect, useRef } from 'react';

// Define Card Type for TypeScript
interface CardItem {
  id: number;
  src: string;
  alt: string;
  style: {
    transform: string;
    zIndex: number;
    filter: string;
    opacity: number;
    transition?: string;
  };
}

export default function Home() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState('');
  const [showVisitorCounter, setShowVisitorCounter] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Card Stack State with typed interface
  const [cards, setCards] = useState<CardItem[]>([
    {
      id: 1,
      src: 'assets/images/3764.jpg',
      alt: 'Photo 5',
      style: { transform: 'rotate(10deg) translateY(21px) scale(0.85)', zIndex: 10, filter: 'brightness(0.5)', opacity: 0.5 }
    },
    {
      id: 2,
      src: 'assets/images/3866.jpg',
      alt: 'Photo 4',
      style: { transform: 'rotate(6deg) translateY(14px) scale(0.90)', zIndex: 20, filter: 'brightness(0.65)', opacity: 0.65 }
    },
    {
      id: 3,
      src: 'assets/images/3863.jpg',
      alt: 'Photo 3',
      style: { transform: 'rotate(2deg) translateY(10px) scale(0.92)', zIndex: 30, filter: 'brightness(0.75)', opacity: 0.75 }
    },
    {
      id: 4,
      src: 'assets/images/3767.jpg',
      alt: 'Photo 2',
      style: { transform: 'rotate(-4deg) translateY(7px) scale(0.95)', zIndex: 40, filter: 'brightness(0.85)', opacity: 0.9 }
    },
    {
      id: 5,
      src: 'assets/images/3766.jpg',
      alt: 'Photo 1',
      style: { transform: 'rotate(0deg) translateY(0px) scale(1)', zIndex: 50, filter: 'brightness(1)', opacity: 1 }
    },
  ]);

  const [isAnimating, setIsAnimating] = useState(false);
  const startYRef = useRef(0);

  useEffect(() => {
    // Check URL for ?admin=true
    const params = new URLSearchParams(window.location.search);
    if (params.has('admin')) {
      setIsAdminModalOpen(true);
    }

    // Scroll reveal observer
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(reveal => revealOnScroll.observe(reveal));

    // Anniversary Live Counter Logic
    const startDate = new Date('2026-10-22T17:15:00+06:30').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = now - startDate;
      const counterElement = document.getElementById('anniversary-counter');

      if (!counterElement) return;

      if (diff < 0) {
        counterElement.textContent = "Coming Soon ♡";
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      counterElement.textContent = `${days} Days : ${hours} Hours : ${minutes} Mins : ${seconds} Secs`;
    }, 1000);

    // Secret Triple-Click Feature for Navbar trigger
    const secretTrigger = document.getElementById('secret-trigger');
    const secretSection = document.getElementById('secret-section');
    let clickCount = 0;
    let clickTimer: NodeJS.Timeout | null = null;

    const handleSecretClick = (e: MouseEvent) => {
      e.preventDefault();
      clickCount++;

      if (clickTimer) clearTimeout(clickTimer);

      if (clickCount === 3) {
        if (secretSection) {
          if (secretSection.style.display === 'none' || secretSection.style.display === '') {
            secretSection.style.display = 'block';
            secretSection.classList.add('cinematic-reveal');
            secretSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            secretSection.style.display = 'none';
            secretSection.classList.remove('cinematic-reveal');
          }
        }
        clickCount = 0;
      } else {
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 500);
      }
    };

    if (secretTrigger) {
      secretTrigger.addEventListener('click', handleSecretClick as EventListener);
    }

    return () => {
      clearInterval(interval);
      revealOnScroll.disconnect();
      if (clickTimer) clearTimeout(clickTimer);
      if (secretTrigger) {
        secretTrigger.removeEventListener('click', handleSecretClick as EventListener);
      }
    };
  }, []);

  // Exact Card Swap Animation Handler
  const handleCardSwap = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setCards((prevCards) => {
      const newCards = [...prevCards];
      const topCard = newCards[newCards.length - 1];

      if (topCard) {
        topCard.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
        topCard.style.transform = 'translateY(-140%) rotate(15deg) scale(1.05)';
        topCard.style.opacity = 0;
      }

      setTimeout(() => {
        const popped = newCards.pop();
        if (popped) {
          newCards.unshift(popped);
        }

        const updatedCards: CardItem[] = newCards.map((card, index) => {
          const reverseIndex = newCards.length - 1 - index;
          let transform = '';
          let zIndex = 10;
          let filter = 'brightness(0.5)';
          let opacity = 0.5;

          if (reverseIndex === 0) {
            transform = 'rotate(0deg) translateY(0px) scale(1)';
            opacity = 1;
            zIndex = 50;
            filter = 'brightness(1)';
          } else if (reverseIndex === 1) {
            transform = 'rotate(-4deg) translateY(7px) scale(0.95)';
            opacity = 0.9;
            zIndex = 40;
            filter = 'brightness(0.85)';
          } else if (reverseIndex === 2) {
            transform = 'rotate(2deg) translateY(10px) scale(0.92)';
            opacity = 0.75;
            zIndex = 30;
            filter = 'brightness(0.75)';
          } else if (reverseIndex === 3) {
            transform = 'rotate(6deg) translateY(14px) scale(0.90)';
            opacity = 0.65;
            zIndex = 20;
            filter = 'brightness(0.65)';
          } else {
            transform = 'rotate(10deg) translateY(21px) scale(0.85)';
            opacity = 0.5;
            zIndex = 10;
            filter = 'brightness(0.5)';
          }

          return {
            ...card,
            style: { transform, zIndex, filter, opacity, transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }
          };
        });

        setCards(updatedCards);
        setIsAnimating(false);
      }, 400);

      return [...newCards];
    });
  };

  // Touch handlers for mobile swipe using useRef
  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const diffY = startYRef.current - currentY;
    if (Math.abs(diffY) > 40 && !isAnimating) {
      handleCardSwap();
      startYRef.current = currentY;
    }
  };

  // Admin Form Submit Logic (Connected to .env.local)
  const handleAdminSubmit = () => {
    if (adminPassInput === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setShowVisitorCounter(true);
      setIsAdminModalOpen(false);
    } else {
      alert("Hey, What are you doing with my admin website");
      setAdminPassInput('');
    }
  };

  return (
    <main className="min-h-screen bg-[#101114] bg-[radial-gradient(ellipse_at_top,_#1e1b35_0%,_#101114_55%)] text-[#F4F4F5] font-sans antialiased selection:bg-[#818CF8] selection:text-zinc-950 relative overflow-x-hidden scroll-smooth">

      {/* Custom Styles with Minimal Graphite Glow & Cinematic Fade-In Effects */}
      <style jsx global>{`
        .stack-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          touch-action: none;
          transform-origin: bottom center;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes cinematicIn {
          0% {
            opacity: 0;
            transform: scale(0.94) translateY(20px);
            filter: blur(12px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0px);
          }
        }

        .cinematic-reveal {
          animation: cinematicIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .glow-card {
          position: relative;
          background: rgba(28, 30, 36, 0.75);
          border-radius: 1.5rem;
          transition: all 0.4s ease;
        }

        .glow-card::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 1.55rem;
          background: linear-gradient(135deg, rgba(129, 140, 248, 0), rgba(39, 39, 42, 0), rgba(129, 140, 248, 0));
          z-index: -1;
          transition: background 0.5s ease;
        }

        .glow-card:hover::before {
          background: linear-gradient(135deg, rgba(129, 140, 248, 0.35), rgba(39, 39, 42, 0.8), rgba(129, 140, 248, 0.15));
        }

        .glow-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -10px rgba(129, 140, 248, 0.15);
        }

        .secret-media-card {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease;
          will-change: transform;
        }

        .secret-media-card:hover {
          transform: scale(1.04) translateY(-4px);
          border-color: rgba(249, 168, 212, 0.8);
          box-shadow: 0 12px 35px -5px rgba(249, 168, 212, 0.4), 0 0 20px rgba(167, 139, 250, 0.3);
          z-index: 10;
        }
      `}</style>

      {/* Custom Password Modal for Admin */}
      {isAdminModalOpen && (
        <div id="admin-modal" className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-[#818CF8]/50 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center space-y-5">
            <h3 className="text-xl font-bold text-[#818CF8]">🔐 Admin Authentication</h3>
            <p className="text-[#A1A1AA] text-sm">Type the password to access this website</p>
            <input
              type="password"
              id="admin-pass-input"
              value={adminPassInput}
              onChange={(e) => setAdminPassInput(e.target.value)}
              placeholder="Password ထည့်ပါ..."
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-[#818CF8] text-center"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                id="admin-submit-btn"
                onClick={handleAdminSubmit}
                className="flex-1 bg-[#818CF8] hover:bg-[#A78BFA] text-zinc-950 font-bold py-3 rounded-xl transition cursor-pointer"
              >
                ဝင်မည်
              </button>
              <button
                id="admin-cancel-btn"
                onClick={() => setIsAdminModalOpen(false)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-3 rounded-xl transition cursor-pointer"
              >
                ပယ်ဖျက်မည်
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#818CF8]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#A78BFA]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Navbar with Hamburger Menu */}
      <nav className="fixed top-0 left-0 w-full bg-[#101114]/80 backdrop-blur-xl border-b border-zinc-800/80 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" id="secret-trigger"
            className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] to-[#A78BFA] cursor-pointer select-none"
            title="Try clicking 3 times">
            About Me
          </a>
          {/* Desktop Menu */}
          <div className="space-x-8 text-sm font-medium hidden md:flex items-center text-[#A1A1AA]">
            <a href="#about" className="hover:text-[#818CF8] transition duration-300">About</a>
            <a href="#skills" className="hover:text-[#818CF8] transition duration-300">Skills</a>
            <a href="#projects" className="hover:text-[#818CF8] transition duration-300">Projects</a>
            <a href="#contact" className="hover:text-[#818CF8] transition duration-300">Contact</a>
          </div>
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(v => !v)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-zinc-700 bg-zinc-900/80 text-[#818CF8] hover:border-[#818CF8] transition"
          >
            {mobileMenuOpen ? (
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            ) : (
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64 opacity-100 border-t border-zinc-800' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1 bg-[#101114]/95">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-zinc-200 hover:text-[#818CF8] hover:bg-[#818CF8]/10 transition">About</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-zinc-200 hover:text-[#818CF8] hover:bg-[#818CF8]/10 transition">Skills</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-zinc-200 hover:text-[#818CF8] hover:bg-[#818CF8]/10 transition">Projects</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-zinc-200 hover:text-[#818CF8] hover:bg-[#818CF8]/10 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-28 pb-20 px-6 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <div className="text-center md:text-left space-y-6 reveal active">
            <div className="inline-flex items-center gap-2 bg-indigo-950/80 border border-indigo-700/50 px-4 py-2 rounded-full shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#818CF8] animate-pulse"></span>
              <span className="text-[#818CF8] font-medium tracking-wide uppercase text-xs">Junior Developer · Creative Thinker</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              Hey, I&apos;m <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] via-[#A78BFA] to-[#F9A8D4]">Phyo Min Thaw.</span>
            </h1>
            <p className="text-sm font-medium text-[#A1A1AA] -mt-2">You can call me Kura.</p>

            <div className="inline-flex items-center gap-2.5 bg-zinc-900/90 border border-[#818CF8]/40 px-4 py-2 rounded-2xl shadow-lg backdrop-blur-md">
              <span className="text-[#F9A8D4] text-base animate-bounce">💡</span>
              <a href="#contact" className="text-xs sm:text-sm font-medium text-zinc-300 hover:text-[#818CF8] transition">
                Top Navbar ကို 3 ချက်ဆက်တိုက် နှိပ်ကြည့်ပါ <span className="text-[#818CF8]">↓</span>
              </a>
            </div>

            <p className="text-base sm:text-lg text-[#A1A1AA] max-w-xl leading-relaxed">
              Turning ideas into meaningful digital experiences, one project at a time.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <a href="#projects" className="bg-gradient-to-r from-[#818CF8] to-[#A78BFA] hover:opacity-90 text-zinc-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-[#818CF8]/25 transition-all transform hover:-translate-y-0.5">
                Explore My Work
              </a>
              <a href="#contact" className="border border-zinc-700 bg-zinc-800/40 hover:bg-zinc-800 hover:border-[#818CF8]/60 hover:text-[#818CF8] px-7 py-3.5 rounded-xl transition-all duration-300">
                Let&apos;s Talk
              </a>
            </div>
          </div>

          {/* Tilted Stack Card Swipe Effect Container */}
          <div className="flex flex-col items-center justify-center py-6 reveal active">
            <div
              className="relative w-72 h-80 sm:w-80 sm:h-96 select-none animate-float cursor-pointer"
              id="card-stack"
              onClick={handleCardSwap}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              title="Click or Swipe to flip folder"
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`stack-card absolute inset-0 rounded-3xl overflow-hidden shadow-2xl bg-zinc-800 ${card.style.zIndex === 50 ? 'border-2 border-[#818CF8]/50' : 'border border-zinc-700/80'
                    }`}
                  style={{
                    transform: card.style.transform,
                    zIndex: card.style.zIndex,
                    filter: card.style.filter,
                    opacity: card.style.opacity,
                    transition: card.style.transition || 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <img src={card.src} alt={card.alt} className="w-full h-full object-cover pointer-events-none" />
                  {card.style.zIndex === 50 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-50"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECRET SECTION (Soft Pink & Lavender Aesthetic) */}
      <section
        id="secret-section"
        className="py-20 px-6 max-w-5xl mx-auto border-t border-[#F9A8D4]/40 bg-purple-950/20 backdrop-blur-xl rounded-3xl my-10 shadow-2xl transition-all duration-700"
        style={{ display: 'none' }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F9A8D4] to-[#A78BFA] tracking-tight">
            To the Girl Who Has My Heart ♡
          </h2>
          <p className="text-[#A1A1AA] text-sm mt-2">Every second with you is worth remembering.</p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#F9A8D4] to-[#A78BFA] mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="grid grid-cols-2 gap-4">
            <div className="secret-media-card rounded-2xl overflow-hidden border border-[#F9A8D4]/40 shadow-lg relative bg-black cursor-pointer">
              <video src="assets/videos/video1.mp4" autoPlay loop muted playsInline className="w-full h-48 object-cover"></video>
            </div>
            <div className="secret-media-card rounded-2xl overflow-hidden border border-[#F9A8D4]/40 shadow-lg cursor-pointer">
              <img src="assets/images/photo2.jpg" alt="Special Photo 2" className="w-full h-48 object-cover" />
            </div>
            <div className="secret-media-card rounded-2xl overflow-hidden border border-[#F9A8D4]/40 shadow-lg relative bg-black cursor-pointer">
              <video src="assets/videos/video2.mp4" autoPlay loop muted playsInline className="w-full h-48 object-cover"></video>
            </div>
            <div className="secret-media-card rounded-2xl overflow-hidden border border-[#F9A8D4]/40 shadow-lg cursor-pointer">
              <img src="assets/images/photo8.png" alt="Special Photo 4" className="w-full h-48 object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="secret-media-card rounded-xl overflow-hidden border border-[#A78BFA]/30 shadow-md cursor-pointer">
              <img src="assets/images/photo3.jpg" alt="Extra 1" className="w-full h-32 object-cover" />
            </div>
            <div className="secret-media-card rounded-xl overflow-hidden border border-[#A78BFA]/30 shadow-md cursor-pointer">
              <img src="assets/images/photo5.jpg" alt="Extra 2" className="w-full h-32 object-cover" />
            </div>
            <div className="secret-media-card rounded-xl overflow-hidden border border-[#A78BFA]/30 shadow-md cursor-pointer">
              <img src="assets/images/photo6.jpg" alt="Extra 3" className="w-full h-32 object-cover" />
            </div>
            <div className="secret-media-card rounded-xl overflow-hidden border border-[#A78BFA]/30 shadow-md cursor-pointer">
              <img src="assets/images/photo7.jpg" alt="Extra 4" className="w-full h-32 object-cover" />
            </div>
            <div className="secret-media-card rounded-xl overflow-hidden border border-[#A78BFA]/30 shadow-md col-span-2 cursor-pointer">
              <img src="assets/images/photo9.jpg" alt="Extra 5" className="w-full h-32 object-cover" />
            </div>
          </div>
        </div>

        {/* Anniversary Live Counter & Special Date Box */}
        <div className="mb-12 p-6 bg-zinc-900/80 border border-[#F9A8D4]/40 rounded-2xl text-center shadow-lg backdrop-blur-md max-w-xl mx-auto space-y-2">
          <p className="text-xs sm:text-sm text-[#F9A8D4] uppercase tracking-widest font-medium">Our Little Forever ♡</p>
          <p className="text-xs text-[#A78BFA] italic">သော့်ဆီကချစ်တယ်စပြောတဲ့ရက်စွဲလေး (22 Oct 2026, 5:15 PM)</p>
          <div id="anniversary-counter" className="text-base sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F9A8D4] to-[#A78BFA] pt-1">
            Loading...
          </div>
        </div>

        <div className="glow-card p-8 sm:p-12 border border-[#F9A8D4]/30 backdrop-blur-xl space-y-6 shadow-2xl text-zinc-200 text-sm sm:text-base leading-8">
          <p className="font-medium text-[#F9A8D4]">Ngwe Thaw Tar Ye Khaung — a name that somehow feels a little more special than any other name in the world to me.</p>
          <p>I don&apos;t really know when or how it happened, but somewhere along the way, you became someone I genuinely adore. Maybe it&apos;s your beautiful smile, your adorable expressions, or the way you can look effortlessly pretty even in the simplest moments. There&apos;s just something about you that makes my heart feel a little different.</p>
          <p>I love how you can be both cute and beautiful without even trying. Whether you&apos;re making a funny face or simply looking at yourself in the mirror, every little version of you has its own charm. And honestly, I could look at your pictures a hundred times and still find myself smiling at them.</p>
          <p>But beyond your beauty, there&apos;s something else I truly admire about you — your ambition. Knowing that you&apos;re studying at the <span className="text-[#A78BFA] font-medium border-b border-[#A78BFA]/30">University of Medicine (2), Yangon</span>, working towards a future where you&apos;ll dedicate yourself to helping others, makes me admire you even more. I know the journey to becoming a doctor isn&apos;t easy. There will be exhausting days, sleepless nights, difficult examinations, and moments when everything feels overwhelming. But I sincerely hope you never lose faith in yourself.</p>
          <p>I hope you become the doctor you&apos;ve always dreamed of being. I hope life treats you gently, your hard work eventually pays off, and every little dream you carry in your heart finds its way into reality.</p>
          <p>And perhaps, somewhere along that journey, I could be someone who quietly cheers for you, celebrates your achievements, listens to your worries, and reminds you how amazing you are whenever you forget.</p>
          <p>I don&apos;t know what the future holds for us, and I don&apos;t want to rush something as beautiful as these feelings. All I know is that having you in my thoughts makes even an ordinary day feel a little more meaningful.</p>
          <p>You don&apos;t have to be perfect, because it&apos;s never been about perfection. It&apos;s about you — your smile, your personality, your silly little expressions, your dreams, and all those tiny things that make you who you are.</p>
          <p className="font-semibold text-[#A78BFA]">Dear Ngwe Thaw Tar Ye Khaung,</p>
          <p>One day, when you finally wear that white coat with your name proudly written on it, I hope you&apos;ll look back and realize how far you&apos;ve come.</p>
          <p>And if life is kind enough to let me, I&apos;d love to be there, looking at you with the same admiration I have for you today.</p>
          <p>Until then, keep smiling, keep shining, and keep becoming the wonderful person you&apos;re meant to be.</p>
          <p className="text-[#F9A8D4] font-semibold pt-4">You may be studying to heal people&apos;s hearts someday, but somehow, without even knowing it, you&apos;ve already found a place in mine. ♡</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-28 px-6 max-w-6xl mx-auto border-t border-zinc-800/80">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F4F5] tracking-tight">The Person Behind the Code</h2>
          <div className="w-16 h-1 bg-[#818CF8] mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="glow-card p-3.5 border border-zinc-700/60 backdrop-blur-xl shadow-2xl group reveal">
            <div className="overflow-hidden rounded-2xl relative">
              <img src="assets/images/3759.jpg" alt="Family Photo" className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-85 flex items-end p-5">
                <p className="text-sm text-zinc-200 font-semibold flex items-center gap-2">❤️ Family Memories & Moments</p>
              </div>
            </div>
          </div>

          <div className="glow-card p-8 sm:p-10 border border-zinc-700/60 backdrop-blur-xl space-y-5 shadow-xl reveal">
            <h3 className="text-2xl font-bold text-[#818CF8]">Who Am I?</h3>
            <p className="text-[#A1A1AA] leading-relaxed text-sm sm:text-base">
              I&apos;m a junior developer passionate about web development, software engineering, and exploring modern technologies. I enjoy learning new tools, solving problems, and turning creative ideas into practical projects.
            </p>
            <p className="text-[#A1A1AA] leading-relaxed text-sm sm:text-base">
              Beyond coding, I&apos;m currently studying Geology at EYU, Business at UoPeople, and English at Queen&apos;s University. These different fields help me approach challenges with curiosity, creativity, and a broader perspective.
            </p>
            <p className="text-[#A1A1AA] leading-relaxed text-sm sm:text-base">
              My goal is simple: keep learning, keep building, and become a better developer with every project I create.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glow-card p-8 border border-zinc-700/60 backdrop-blur-xl shadow-lg reveal">
            <h3 className="text-lg font-bold text-[#818CF8] mb-5 flex items-center gap-3">
              <span className="text-xl">🎓</span> Academic Background
            </h3>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-center justify-between border-b border-zinc-700/50 pb-3">
                <span className="font-medium">Geology</span>
                <span className="text-[#818CF8] font-semibold bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800/40">EYU</span>
              </li>
              <li className="flex items-center justify-between border-b border-zinc-700/50 pb-3">
                <span className="font-medium">Business</span>
                <span className="text-[#818CF8] font-semibold bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800/40">UoPeople</span>
              </li>
              <li className="flex items-center justify-between pt-1">
                <span className="font-medium">English</span>
                <span className="text-[#818CF8] font-semibold bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800/40">Queen&apos;s University</span>
              </li>
            </ul>
          </div>

          <div className="glow-card p-8 border border-zinc-700/60 backdrop-blur-xl shadow-lg reveal">
            <h3 className="text-lg font-bold text-[#818CF8] mb-5 flex items-center gap-3">
              <span className="text-xl">🎯</span> My Interests
            </h3>
            <div className="flex flex-wrap gap-2.5">
              <span className="bg-zinc-900/80 border border-zinc-700 text-zinc-200 text-xs font-medium px-3.5 py-2 rounded-xl">Web Development</span>
              <span className="bg-zinc-900/80 border border-zinc-700 text-zinc-200 text-xs font-medium px-3.5 py-2 rounded-xl">UI/UX Design</span>
              <span className="bg-zinc-900/80 border border-zinc-700 text-zinc-200 text-xs font-medium px-3.5 py-2 rounded-xl">Artificial Intelligence</span>
              <span className="bg-zinc-900/80 border border-zinc-700 text-zinc-200 text-xs font-medium px-3.5 py-2 rounded-xl">Mobile Applications</span>
              <span className="bg-zinc-900/80 border border-zinc-700 text-zinc-200 text-xs font-medium px-3.5 py-2 rounded-xl">Learning New Technologies</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-28 px-6 max-w-6xl mx-auto border-t border-zinc-800/80">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F4F5] tracking-tight">My Toolkit</h2>
          <div className="w-16 h-1 bg-[#818CF8] mx-auto mt-3 rounded-full"></div>
          <p className="text-[#A1A1AA] text-sm mt-3">Hover over the cards to explore my technical capabilities</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="glow-card p-8 border border-zinc-700/60 backdrop-blur-xl shadow-lg reveal">
            <h3 className="text-xl font-bold text-[#818CF8] mb-6 flex items-center gap-3">
              <span className="text-2xl">💻</span> Frontend Development
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="group bg-zinc-900/70 p-5 rounded-2xl border border-zinc-700/60 text-center hover:border-[#818CF8] hover:bg-indigo-950/30 transition-all duration-300 transform hover:-translate-y-1 shadow-md">
                <p className="text-sm font-bold text-zinc-200 group-hover:text-[#818CF8] transition">React / Next.js</p>
                <span className="text-[11px] text-[#A1A1AA] mt-1 block">Advanced UI Framework</span>
              </div>
              <div className="group bg-zinc-900/70 p-5 rounded-2xl border border-zinc-700/60 text-center hover:border-[#818CF8] hover:bg-indigo-950/30 transition-all duration-300 transform hover:-translate-y-1 shadow-md">
                <p className="text-sm font-bold text-zinc-200 group-hover:text-[#818CF8] transition">Tailwind CSS</p>
                <span className="text-[11px] text-[#A1A1AA] mt-1 block">Modern Styling</span>
              </div>
              <div className="group bg-zinc-900/70 p-5 rounded-2xl border border-zinc-700/60 text-center hover:border-[#818CF8] hover:bg-indigo-950/30 transition-all duration-300 transform hover:-translate-y-1 shadow-md">
                <p className="text-sm font-bold text-zinc-200 group-hover:text-[#818CF8] transition">JavaScript / TS</p>
                <span className="text-[11px] text-[#A1A1AA] mt-1 block">Core Scripting</span>
              </div>
              <div className="group bg-zinc-900/70 p-5 rounded-2xl border border-zinc-700/60 text-center hover:border-[#818CF8] hover:bg-indigo-950/30 transition-all duration-300 transform hover:-translate-y-1 shadow-md">
                <p className="text-sm font-bold text-zinc-200 group-hover:text-[#818CF8] transition">React Native</p>
                <span className="text-[11px] text-[#A1A1AA] mt-1 block">Mobile Cross-Platform</span>
              </div>
            </div>
          </div>

          <div className="glow-card p-8 border border-zinc-700/60 backdrop-blur-xl shadow-lg reveal">
            <h3 className="text-xl font-bold text-[#818CF8] mb-6 flex items-center gap-3">
              <span className="text-2xl">🛠️</span> Tools & Platforms
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="group bg-zinc-900/70 p-5 rounded-2xl border border-zinc-700/60 text-center hover:border-[#818CF8] hover:bg-indigo-950/30 transition-all duration-300 transform hover:-translate-y-1 shadow-md">
                <p className="text-sm font-bold text-zinc-200 group-hover:text-[#818CF8] transition">Git & GitHub</p>
                <span className="text-[11px] text-[#A1A1AA] mt-1 block">Version Control</span>
              </div>
              <div className="group bg-zinc-900/70 p-5 rounded-2xl border border-zinc-700/60 text-center hover:border-[#818CF8] hover:bg-indigo-950/30 transition-all duration-300 transform hover:-translate-y-1 shadow-md">
                <p className="text-sm font-bold text-zinc-200 group-hover:text-[#818CF8] transition">Docker</p>
                <span className="text-[11px] text-[#A1A1AA] mt-1 block">Containerization</span>
              </div>
              <div className="group bg-zinc-900/70 p-5 rounded-2xl border border-zinc-700/60 text-center hover:border-[#818CF8] hover:bg-indigo-950/30 transition-all duration-300 transform hover:-translate-y-1 shadow-md">
                <p className="text-sm font-bold text-zinc-200 group-hover:text-[#818CF8] transition">Linux / Terminals</p>
                <span className="text-[11px] text-[#A1A1AA] mt-1 block">OS Environment</span>
              </div>
              <div className="group bg-zinc-900/70 p-5 rounded-2xl border border-zinc-700/60 text-center hover:border-[#818CF8] hover:bg-indigo-950/30 transition-all duration-300 transform hover:-translate-y-1 shadow-md">
                <p className="text-sm font-bold text-zinc-200 group-hover:text-[#818CF8] transition">Vercel / Netlify</p>
                <span className="text-[11px] text-[#A1A1AA] mt-1 block">Cloud Deployment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glow-card p-8 border border-zinc-700/60 backdrop-blur-xl shadow-lg reveal text-center">
          <h3 className="text-lg font-bold text-[#818CF8] mb-6 flex items-center justify-center gap-2">
            <span>⚡</span> Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-3">
            <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
            <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
            <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
            <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
            <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
            <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
            <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
            <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
            <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
            <img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="Linux" />
            <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-28 px-6 max-w-6xl mx-auto border-t border-zinc-800/80">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F4F5] tracking-tight">Selected Projects</h2>
          <div className="w-16 h-1 bg-[#818CF8] mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-1 max-w-xl mx-auto reveal">
          <div className="glow-card border border-zinc-700/60 overflow-hidden shadow-2xl group">
            <div className="p-8">
              <div className="h-60 bg-zinc-950 rounded-2xl mb-6 overflow-hidden border border-zinc-800 relative group-hover:scale-[1.02] transition duration-500">
                <img src="assets/images/image_366cfe.png" alt="MLBB Skins Detector Preview" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#818CF8] transition">MLBB Skins Detector</h3>
              <p className="text-[#A1A1AA] text-sm sm:text-base mb-6 leading-relaxed">
                A web application tool built for Mobile Legends players to check and detect skin related information conveniently.
              </p>
              <div className="flex flex-wrap gap-2 text-xs mb-6">
                <span className="bg-indigo-950/80 text-[#818CF8] px-3.5 py-1.5 rounded-lg border border-indigo-800/40 font-medium">Web App</span>
                <span className="bg-indigo-950/80 text-[#818CF8] px-3.5 py-1.5 rounded-lg border border-indigo-800/40 font-medium">Vercel</span>
              </div>
            </div>
            <div className="px-8 py-5 bg-zinc-950/60 border-t border-zinc-800/80 flex justify-between items-center text-sm">
              <span className="text-[#A1A1AA]">Project Preview</span>
              <a href="https://mlbbskinsdetector.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#818CF8] hover:text-[#A78BFA] font-semibold flex items-center gap-1.5 hover:underline">
                Visit Website <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 px-6 max-w-4xl mx-auto border-t border-zinc-800/80 text-center reveal">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F4F5] tracking-tight mb-4">Let&apos;s Talk</h2>
        <div className="w-16 h-1 bg-[#818CF8] mx-auto mb-6 rounded-full"></div>
        <p className="text-[#A1A1AA] mb-12 text-base max-w-lg mx-auto">Feel free to reach out to me through any of the platforms below for collaborations or just to say hello!</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto text-left mb-12">
          <a href="mailto:phyominthaw323@gmail.com" className="glow-card p-5 border border-zinc-700/60 flex items-center space-x-4 shadow-lg">
            <span className="text-2xl p-2 bg-zinc-900 rounded-xl border border-zinc-800">📧</span>
            <div className="overflow-hidden">
              <p className="text-xs text-[#A1A1AA] font-medium">Email</p>
              <p className="text-sm font-semibold text-zinc-200 truncate">phyominthaw323@gmail.com</p>
            </div>
          </a>

          <a href="https://t.me/matheus_kura" target="_blank" rel="noopener noreferrer" className="glow-card p-5 border border-zinc-700/60 flex items-center space-x-4 shadow-lg">
            <span className="text-2xl p-2 bg-zinc-900 rounded-xl border border-zinc-800">📱</span>
            <div>
              <p className="text-xs text-[#A1A1AA] font-medium">Telegram</p>
              <p className="text-sm font-semibold text-zinc-200">@matheus_kura</p>
            </div>
          </a>

          <a href="https://www.facebook.com/share/1JVQSbf8Lj/" target="_blank" rel="noopener noreferrer" className="glow-card p-5 border border-zinc-700/60 flex items-center space-x-4 shadow-lg">
            <span className="text-2xl p-2 bg-zinc-900 rounded-xl border border-zinc-800">🌐</span>
            <div>
              <p className="text-xs text-[#A1A1AA] font-medium">Facebook</p>
              <p className="text-sm font-semibold text-zinc-200">Profile Link</p>
            </div>
          </a>

          <a href="https://www.snapchat.com/add/kura.thaw" target="_blank" rel="noopener noreferrer" className="glow-card p-5 border border-zinc-700/60 flex items-center space-x-4 shadow-lg">
            <span className="text-2xl p-2 bg-zinc-900 rounded-xl border border-zinc-800">📸</span>
            <div>
              <p className="text-xs text-[#A1A1AA] font-medium">Snapchat</p>
              <p className="text-sm font-semibold text-zinc-200">kura.thaw</p>
            </div>
          </a>
        </div>

        <div className="text-[#818CF8]/90 text-base sm:text-lg italic font-light tracking-wide bg-zinc-800/40 py-5 px-8 rounded-2xl border border-zinc-700/60 inline-block shadow-lg">
          &quot;Thank you for taking the time to visit my website.&quot;
        </div>
      </section>

      {/* Footer & Admin Secret Notes / Visitor Counter */}
      <footer className="py-10 text-center text-xs text-zinc-500 border-t border-zinc-800/80 bg-zinc-950/60 space-y-3">
        <p>© 2026 Phyo Min Thaw (Kura).</p>
        <p className="text-[#A1A1AA] italic">Some secrets are hidden in plain sight (Try clicking About Me multiple times).</p>

        {/* Admin Only Secret Panel (Visible only after successful Admin login) */}
        {showVisitorCounter && (
          <div className="max-w-md mx-auto p-4 bg-zinc-900/90 border border-[#818CF8]/40 rounded-2xl shadow-xl space-y-2 text-left my-4">
            <p className="text-xs font-bold text-[#818CF8] uppercase tracking-wider flex items-center gap-1.5">
              <span>🔒 Admin Secret Notes</span>
            </p>
            <div className="text-xs text-zinc-300 space-y-1">
              <p>📅 Menstruation date: <span className="text-[#F9A8D4] font-semibold">18-23</span></p>
            </div>
            <div id="visitor-count" className="text-[#A1A1AA] font-medium flex items-center gap-1.5 pt-2 border-t border-zinc-800">
              <span>👁️ Total Visits:</span>
              <img src="https://komarev.com/ghpvc/?username=Phyominthaw&color=818cf8&style=flat-square" alt="Visitor Count" className="inline-block ml-1 align-middle" />
            </div>
          </div>
        )}
      </footer>

    </main>
  );
}