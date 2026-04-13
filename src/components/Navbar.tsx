import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);

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
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9">
            <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
              <defs>
                <linearGradient id="logo-g" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00e5ff" />
                  <stop offset="100%" stopColor="#00ffc6" />
                </linearGradient>
              </defs>
              <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" stroke="url(#logo-g)" strokeWidth="1.5" fill="none" opacity="0.8" />
              <polygon points="18,7 29,13 29,23 18,29 7,23 7,13" stroke="url(#logo-g)" strokeWidth="1" fill="none" opacity="0.5" />
              <circle cx="18" cy="18" r="4" fill="url(#logo-g)" />
              <circle cx="18" cy="18" r="7" stroke="url(#logo-g)" strokeWidth="0.5" fill="none" opacity="0.4" className="animate-pulse-glow" />
            </svg>
            <div className="absolute inset-0 rounded-full" style={{ boxShadow: '0 0 12px rgba(0,229,255,0.4)' }} />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight" style={{ color: '#e0f7fa' }}>
              MiraiQ
            </span>
            <span className="font-light text-sm tracking-tight" style={{ color: '#00e5ff' }}>
              {' '}Labs
            </span>
          </div>
        </div>

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
