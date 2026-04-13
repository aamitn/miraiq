import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import logo from '../assets/logo.svg';

function Logo() {
  return (
    <a href="#home" className="group flex items-center gap-3 no-underline">
      <div className="relative w-9 h-9 overflow-hidden rounded-full bg-slate-900">
        <img src={logo} alt="MiraiQ Labs logo" className="w-full h-full object-contain" />
      </div>
      <div className="leading-tight">
        <span className="font-bold text-sm tracking-tight block" style={{ color: '#e0f7fa' }}>
          MiraiQ
        </span>
        <span className="font-light text-xs tracking-tight block" style={{ color: '#00e5ff' }}>
          Labs
        </span>
      </div>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', v => setScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0 border-b"
        style={{
          backgroundColor: `rgba(2, 8, 16, ${scrolled ? 0.92 : 0})`,
          borderColor: scrolled ? 'rgba(0,229,255,0.1)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'all 0.4s ease',
        }}
      />
      <div className="relative max-w-7xl mx-auto flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-4">
          <span className="tag-chip" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', color: '#00e5ff' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse-glow" />
            Coming Soon
          </span>
        </div>
      </div>
    </motion.nav>
  );
}
