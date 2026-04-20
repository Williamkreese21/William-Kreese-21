/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring, useMotionValue, useTransform as useTransformMotion, useInView, useMotionValueEvent, animate } from 'motion/react';
import { 
  Github, 
  Twitter, 
  Instagram, 
  Mail, 
  ArrowUpRight,
  Youtube,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"></path>
  </svg>
);

const SOCIAL_LINKS = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/williamkreese21', handle: '@williamkreese21' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/williamkreese21', handle: '@williamkreese21' },
  { name: 'TikTok', icon: TikTokIcon, href: 'https://tiktok.com/@williamkreese21', handle: '@williamkreese21' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@williamkreese21', handle: '@williamkreese21' },
];

const COLLABS = ['Samsung', 'Traveloka', 'Lazada', 'Bvlgari', 'Prada', 'Gucci'];

const PROJECTS = [
  { 
    title: 'Instagram studios', 
    category: 'built 30+ interactive instagram filters',
    href: 'https://tuanang.net/stories',
    status: 'Live'
  },
  { 
    title: 'beautiful portfolio', 
    category: 'a simple one page portfolio',
    href: 'https://tuanang.net/portfolio',
    status: 'Live'
  },
  { 
    title: 'elegantUI', 
    category: 'a design system for your next project',
    href: 'https://elegantui.com',
    status: 'Working'
  },
  { 
    title: 'Ai', 
    category: 'AI-generated recipe generator',
    href: 'https://bandoan.ai',
    status: 'Live'
  }
];

const RollingCounter = ({ value, label }: { value: string | number, label: string }) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const targetString = value.toString();
  const targetNumber = parseInt(targetString.replace(/[^0-9]/g, ''));
  const suffix = targetString.replace(/[0-9.]/g, '');

  const count = useMotionValue(0);
  const rounded = useTransformMotion(count, Math.round);

  useMotionValueEvent(rounded, "change", (latest) => {
    const formatted = new Intl.NumberFormat('en-US').format(latest).replace(/,/g, '.');
    setDisplayValue(formatted);
  });

  useEffect(() => {
    if (isInView) {
      // Animate from 0 to targetNumber, wait, then repeat infinitely
      const controls = animate(count, [0, targetNumber], {
        duration: 2.5,
        ease: "easeOut",
        repeat: Infinity,
        repeatDelay: 3,
      });
      return () => controls.stop();
    }
  }, [isInView, targetNumber, count]);

  return (
    <motion.div 
      ref={ref} 
      className="flex flex-col items-center justify-center p-8"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.2 } }
      }}
    >
      <motion.div 
        variants={{
          hidden: { opacity: 0, scale: 0.9, filter: "blur(8px)" },
          visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
        }}
        className="font-display text-5xl md:text-7xl lg:text-9xl tracking-tighter"
      >
        {displayValue}{suffix}
      </motion.div>
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
        }}
        className="mt-4 text-[10px] md:text-sm font-semibold tracking-[0.3em] uppercase text-white/40"
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

const ImageMarqueeRow = ({ reverse, seedOffset }: { reverse?: boolean, seedOffset: number }) => {
  const items = [
    { src: `https://picsum.photos/seed/${seedOffset + 1}/800/600`, aspect: '4/3' },
    { src: `https://picsum.photos/seed/${seedOffset + 2}/1600/900`, aspect: '16/9' },
    { src: `https://picsum.photos/seed/${seedOffset + 3}/800/600`, aspect: '4/3' },
    { src: `https://picsum.photos/seed/${seedOffset + 4}/1600/900`, aspect: '16/9' },
    { src: `https://picsum.photos/seed/${seedOffset + 5}/800/600`, aspect: '4/3' },
    { src: `https://picsum.photos/seed/${seedOffset + 6}/1600/900`, aspect: '16/9' },
  ];
  const animationClass = reverse ? 'animate-marquee-reverse' : 'animate-marquee';
  
  return (
    <div className={`flex gap-4 ${animationClass} whitespace-nowrap py-4`}>
      {[...items, ...items, ...items].map((item, i) => (
        <div key={i} className="h-32 md:h-56 shrink-0 overflow-hidden rounded-xl bg-zinc-900 group cursor-pointer hover:z-10 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)] transition-all duration-500 ease-out relative" style={{ aspectRatio: item.aspect }}>
          <img src={item.src} alt="" className="h-full w-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 pointer-events-none" />
        </div>
      ))}
    </div>
  );
};

const ImageGallery = () => {
  return (
    <div className="relative space-y-4 overflow-hidden py-32 w-[100vw] left-1/2 -translate-x-1/2">
      <ImageMarqueeRow seedOffset={10} />
      <ImageMarqueeRow seedOffset={20} reverse />
      <ImageMarqueeRow seedOffset={30} />
    </div>
  );
};

const TypewriterText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <motion.span
      className={`inline-block ${className || ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.05 } }
      }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundVideoOpacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 0.1]);
  const bgPosition = useTransform(scrollYProgress, [0, 1], ["0% 0%", "0% 100%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden bg-[#020202] text-white selection:bg-white selection:text-black">
      {/* Dynamic Cinematic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Scrolling Color Gradient */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #020617 0%, #1e3a8a 25%, #701a75 50%, #be185d 65%, #9f1239 85%, #2a0404 100%)',
            backgroundSize: '100% 300%',
            backgroundPosition: bgPosition
          }}
        />
        
        {/* Cinematic Video Texture */}
        <motion.video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{ opacity: backgroundVideoOpacity }}
          className="absolute inset-0 h-full w-full object-cover scale-110 mix-blend-overlay"
          referrerPolicy="no-referrer"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-ethereal-misty-mountains-under-the-stars-at-night-41315-large.mp4" type="video/mp4" />
        </motion.video>
        
        {/* Base dark layer for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] opacity-90" />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 z-50 w-full px-6 py-6 transition-all duration-500 md:px-12">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="font-display text-3xl tracking-widest font-bold">EDKR</div>
          <div className="hidden items-center gap-12 md:flex">
            {['Home', 'Socials', 'Me', 'Let\'s Talk'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s/g, '')}`} className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 hover:opacity-100 transition-opacity">
                {item}
              </a>
            ))}
          </div>
          <button className="relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-6 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 hover:border-white/30 backdrop-blur-md transition-all group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
            <div className="absolute -inset-full top-0 z-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-[glass-shine_1.5s_ease-in-out_infinite] group-hover:opacity-100" />
            <span className="relative z-10 group-hover:text-white transition-colors">Work With Me</span>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 md:px-12">
        
        {/* Section 1: Hero */}
        <section id="home" className="flex min-h-[80vh] flex-col items-center justify-center text-center">
          <motion.div 
            style={{ scale: heroScale }}
            className="flex flex-col items-center"
          >
            <h1 className="font-display text-[15vw] leading-[0.8] tracking-[-0.04em] lg:text-[12vw] uppercase">
              William Kreese
            </h1>
            <p className="mt-8 max-w-lg text-sm font-light leading-relaxed text-white/50 md:text-base lg:text-lg">
              A storyteller, influencer, and aspiring AI Pioneer. 
              I blend human creativity with advanced intelligence to build digital spaces that inspire, connect, and elevate everyday life.
            </p>
            <a href="#me" className="mt-12 group relative overflow-hidden flex items-center gap-4 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/10 hover:border-white/30 backdrop-blur-md transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
              <div className="absolute -inset-full top-0 z-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-[glass-shine_1.5s_ease-in-out_infinite] group-hover:opacity-100" />
              <span className="relative z-10 flex items-center gap-4">
                See What I'm Building
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </motion.div>
        </section>

        {/* Section 2: Stats */}
        <section id="socials" className="py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <RollingCounter value="299.754+" label="followers across all platforms" />
            <RollingCounter value="10.939.678+" label="total likes ❤️" />
          </div>
          <div className="mt-12 flex flex-col items-center gap-4">
            {/* Highlighted GitHub Link */}
            {SOCIAL_LINKS.filter(s => s.name === 'GitHub').map((social) => (
              <a key={social.name} href={social.href} className="group relative overflow-hidden flex items-center gap-4 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm md:text-base font-bold tracking-widest uppercase hover:bg-white/10 hover:border-white/30 backdrop-blur-md hover:scale-105 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
                <div className="absolute -inset-full top-0 z-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-[glass-shine_1.5s_ease-in-out_infinite] group-hover:opacity-100" />
                <span className="relative z-10 flex items-center gap-4">
                  <social.icon className="h-5 w-5 md:h-6 md:w-6" />
                  {social.handle}
                </span>
              </a>
            ))}

            {/* Other Social Links on next row */}
            <div className="flex flex-wrap justify-center gap-4">
              {SOCIAL_LINKS.filter(s => s.name !== 'GitHub').map((social) => (
                <a key={social.name} href={social.href} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-6 py-3 text-xs font-medium hover:border-white/20 transition-all">
                  <social.icon className="h-4 w-4" />
                  {social.handle}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Gallery */}
        <ImageGallery />

        {/* Section 4: Story */}
        <section id="me" className="py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
              <h2 className="font-display text-6xl leading-none lg:text-8xl italic mb-12 flex flex-col gap-2">
                <TypewriterText text="honestly?" />
                <TypewriterText text="I never planned" />
                <TypewriterText text="to be a builder." />
              </h2>
              <motion.div 
                className="space-y-6 text-white/60 font-light leading-loose text-lg"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } }
                }}
              >
                <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>I studied economics, no design degree, no design school, no bootcamps. Just curiosity and a refusal to wait for someone else to build what was already in my head.</motion.p>
                <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>Then AI showed up, and suddenly, one person could do it all.</motion.p>
                <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>still learning. still shipping. still figuring it out in public.</motion.p>
              </motion.div>
            </div>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-50px" }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {PROJECTS.map((p) => (
                <motion.a 
                  key={p.title} 
                  href={p.href} 
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
                  }}
                  className="relative overflow-hidden block group p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white/10 hover:border-white/30 hover:backdrop-blur-xl hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.15)]"
                >
                  {/* Liquid Glass Shine Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
                  
                  {/* Diagonal moving light reflection */}
                  <div className="absolute -inset-full top-0 z-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-[glass-shine_1.5s_ease-in-out_infinite] group-hover:opacity-100" />

                  <div className="relative z-10 flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 bg-green-500/20 text-green-400 rounded-md">
                      {p.status}
                    </span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="relative z-10 font-display text-2xl mb-2">{p.title}</h3>
                  <p className="relative z-10 text-xs opacity-40">{p.category}</p>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Section 5: Work Together */}
        <motion.section 
          id="letstalk" 
          className="py-32 border-t border-white/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.div 
            className="text-center mb-16"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
          >
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase opacity-40 mb-4">Let's Talk</h2>
            <h3 className="font-display text-5xl md:text-7xl uppercase italic">Let's work together.</h3>
            <p className="mt-4 text-white/40">two ways i can help you.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="p-12 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
            >
              <h4 className="font-display text-3xl mb-6 italic">as an influencer</h4>
              <p className="text-white/50 font-light mb-8 leading-relaxed">I create content that actually connects. Lifestyle, AI, culture — across TikTok, Instagram, and YouTube. If you have a brand or product that fits my world, I'll make sure my audience fell in love with it too.</p>
              <button className="w-full relative group overflow-hidden py-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 hover:border-white/30 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
                <div className="absolute -inset-full top-0 z-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-[glass-shine_1.5s_ease-in-out_infinite] group-hover:opacity-100" />
                <span className="relative z-10">See My Channels</span>
              </button>
            </motion.div>
            <motion.div 
              className="p-12 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
            >
              <h4 className="font-display text-3xl mb-6 italic">as an AI consultant</h4>
              <p className="text-white/50 font-light mb-8 leading-relaxed">You don't need a full team to have a great digital presence. I help brands move faster — landing pages, AI-powered tools, content strategy — all built fast, built smart.</p>
              <button className="w-full relative group overflow-hidden py-4 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 hover:border-white/30 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
                <div className="absolute -inset-full top-0 z-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-[glass-shine_1.5s_ease-in-out_infinite] group-hover:opacity-100" />
                <span className="relative z-10">Let's Talk Strategy</span>
              </button>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 6: CTA */}
        <motion.section 
          className="py-32 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          <div className="mb-8">
            <h2 className="font-display text-6xl md:text-8xl italic">
              <TypewriterText text="ready to start?" />
            </h2>
          </div>
          <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="mb-12 text-white/40">
            slide into my DMs or drop an email.
          </motion.p>
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="https://instagram.com/williamkreese21" className="w-full sm:w-auto relative group overflow-hidden px-12 py-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white font-bold text-xs tracking-widest uppercase hover:bg-white/20 hover:border-white/30 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
              <div className="absolute -inset-full top-0 z-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-[glass-shine_1.5s_ease-in-out_infinite] group-hover:opacity-100" />
              <span className="relative z-10">DM on Instagram</span>
            </a>
            <a href="mailto:nt146673@gmail.com" className="w-full sm:w-auto relative group overflow-hidden px-12 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/30 font-bold text-xs tracking-widest uppercase transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
              <div className="absolute -inset-full top-0 z-0 block h-full w-1/2 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-[glass-shine_1.5s_ease-in-out_infinite] group-hover:opacity-100" />
              <span className="relative z-10">Mail to</span>
            </a>
          </motion.div>
          <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="mt-24 text-[10px] font-bold tracking-[0.5em] uppercase opacity-20">
            If you drill all the my thoughts I will wish you a good day!
          </motion.p>
          <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="mt-4 text-xs text-white/50 tracking-[0.2em] font-medium uppercase">
            WILLIAMKREESE™ 2026
          </motion.p>
        </motion.section>

      </div>

      {/* Global Borders */}
      <div className="pointer-events-none fixed inset-y-0 left-6 md:left-12 w-[1px] bg-white/5" />
      <div className="pointer-events-none fixed inset-y-0 right-6 md:right-12 w-[1px] bg-white/5" />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes glass-shine {
          0% { transform: translateX(-150%) skewX(-12deg); }
          100% { transform: translateX(250%) skewX(-12deg); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
        .animate-marquee:hover, .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
