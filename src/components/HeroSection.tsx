import { useEffect, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import gsap from 'gsap';

const SERVICES = [
  'Agentic AI Swarms',
  'Quantum Simulations',
  'Software Dev Training',
  'Knowledge Transfer',
  'Certifications',
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } },
};

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!particleRef.current) return;
    const ctx = gsap.context(() => {
      const particles = particleRef.current!.querySelectorAll('.hero-particle');
      particles.forEach((p, i) => {
        gsap.set(p, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          opacity: Math.random() * 0.6 + 0.1,
        });
        gsap.to(p, {
          y: `-=${Math.random() * 200 + 80}`,
          x: `+=${(Math.random() - 0.5) * 100}`,
          opacity: 0,
          duration: Math.random() * 6 + 4,
          delay: Math.random() * 4,
          repeat: -1,
          ease: 'none',
          onRepeat: function () {
            gsap.set(p, {
              y: window.innerHeight + 20,
              x: Math.random() * window.innerWidth,
              opacity: Math.random() * 0.6 + 0.1,
            });
          },
        });
      });
    }, particleRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden scanline-overlay"
      style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(0,229,255,0.04) 0%, transparent 70%), #020810' }}
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div ref={particleRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="hero-particle absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 3 === 0 ? '#00e5ff' : i % 3 === 1 ? '#00ffc6' : '#ffb300',
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #020810, transparent)' }}
      />

      <div ref={ref} className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-6"
        >
          <motion.div variants={lineVariants} className="flex items-center justify-center gap-3">
            <div className="h-px w-12 opacity-50" style={{ background: 'linear-gradient(to right, transparent, #00e5ff)' }} />
            <span className="section-label animate-flicker">
              System Initialization — Sequence 01
            </span>
            <div className="h-px w-12 opacity-50" style={{ background: 'linear-gradient(to left, transparent, #00e5ff)' }} />
          </motion.div>

          <motion.div variants={lineVariants}>
            <h1 className="font-bold leading-none tracking-tight">
              <span
                className="block text-5xl md:text-7xl lg:text-8xl gradient-text-cyan text-glow-cyan"
                style={{ letterSpacing: '-0.02em' }}
              >
                MiraiQ Labs
              </span>
              <span
                className="block text-3xl md:text-5xl lg:text-6xl mt-2 font-light"
                style={{ color: '#90a4ae', letterSpacing: '0.02em' }}
              >
                Coming Soon
              </span>
            </h1>
          </motion.div>

          <motion.div variants={lineVariants} className="flex items-center justify-center gap-2 flex-wrap">
            {SERVICES.map((s, i) => (
              <motion.span
                key={s}
                className="tag-chip"
                style={{
                  background: [
                    'rgba(0,229,255,0.07)',
                    'rgba(0,255,198,0.07)',
                    'rgba(255,179,0,0.07)',
                    'rgba(255,71,87,0.07)',
                    'rgba(0,229,255,0.07)',
                  ][i],
                  border: `1px solid ${['rgba(0,229,255,0.25)', 'rgba(0,255,198,0.25)', 'rgba(255,179,0,0.25)', 'rgba(255,71,87,0.25)', 'rgba(0,229,255,0.25)'][i]}`,
                  color: ['#00e5ff', '#00ffc6', '#ffb300', '#ff4757', '#00e5ff'][i],
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {s}
              </motion.span>
            ))}
          </motion.div>

          <motion.div variants={lineVariants} className="space-y-3">
            <p
              className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
              style={{ color: '#90a4ae' }}
            >
              Engineering the frontier of{' '}
              <span className="gradient-text-cyan font-medium">artificial intelligence</span>
              {' '}and{' '}
              <span className="gradient-text-amber font-medium">quantum computation</span>
              {' '}— preparing the world for tomorrow.
            </p>
          </motion.div>

          <motion.div variants={lineVariants} className="pt-4">
            <div
              className="inline-flex items-center gap-4 px-8 py-4 rounded-sm relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0,229,255,0.08), rgba(0,255,198,0.04))',
                border: '1px solid rgba(0,229,255,0.2)',
              }}
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent)' }} />
                <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)' }} />
              </div>
              <div className="flex flex-col items-start">
                <span className="section-label opacity-60 text-xs">Status</span>
                <span className="font-semibold text-lg gradient-text-cyan">Launching Soon</span>
              </div>
              <div className="w-px h-10 opacity-20" style={{ background: '#00e5ff' }} />
              <div className="flex flex-col items-start">
                <span className="section-label opacity-60 text-xs">Platform</span>
                <span className="font-medium text-sm" style={{ color: '#e0f7fa' }}>
                  Next-Gen AI Infrastructure
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="section-label opacity-40 text-xs">Scroll to explore</span>
          <div className="flex flex-col gap-1 items-center">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-0.5 h-1.5 rounded-full"
                style={{ background: '#00e5ff' }}
                animate={{ opacity: [0.2, 1, 0.2], y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
