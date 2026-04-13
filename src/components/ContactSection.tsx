import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight, Sparkles } from 'lucide-react';
import footerLogo from '../assets/logo_transperant.svg';

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Electronic Mail',
    value: 'support@miraiqlabs.com',
    href: 'mailto:support@miraiqlabs.com',
    color: '#00e5ff',
    accent: 'rgba(0,229,255,0.08)',
    border: 'rgba(0,229,255,0.2)',
  },
  {
    icon: Phone,
    label: 'Direct Line',
    value: '+91 80172 47984',
    href: 'tel:+918017247984',
    color: '#00ffc6',
    accent: 'rgba(0,255,198,0.08)',
    border: 'rgba(0,255,198,0.2)',
  },
  {
    icon: MapPin,
    label: 'Physical Location',
    value: 'Find us on Google Maps',
    href: 'https://maps.app.goo.gl/Vpm546arJKhkgXrU6',
    color: '#ffb300',
    accent: 'rgba(255,179,0,0.08)',
    border: 'rgba(255,179,0,0.2)',
  },
];

const STATUS_ITEMS = [
  { label: 'Platform Status', value: 'Building', color: '#ffb300' },
  { label: 'Team Size', value: 'Growing', color: '#00ffc6' },
  { label: 'Launch ETA', value: 'Soon™', color: '#00e5ff' },
  { label: 'Quantum Coherence', value: '99.7%', color: '#ff4757' },
];

const MAP_QUERY = 'MiraiQ+Labs';
const MAP_EMBED_URL = `https://maps.google.com/maps?q=${MAP_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const currentYear = new Date().getFullYear();
  const [currentTime, setCurrentTime] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ background: '#020810' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,229,255,0.05) 0%, transparent 60%)' }}
      />
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-30" />

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3), rgba(0,255,198,0.2), transparent)' }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-10">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="section-label">Contact Interface</span>
                <div className="h-px flex-1 max-w-[60px]" style={{ background: 'linear-gradient(to right, rgba(0,229,255,0.4), transparent)' }} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl font-bold leading-tight mb-5"
                style={{ letterSpacing: '-0.02em', color: '#e0f7fa' }}
              >
                Get in{' '}
                <span className="gradient-text-cyan">Touch</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base leading-relaxed font-light"
                style={{ color: '#78909c', lineHeight: '1.8' }}
              >
                We are actively building the future of intelligent systems.
                Whether you are an enterprise looking for AI transformation, a developer seeking
                world-class training, or a researcher eager to collaborate — we want to hear from you.
              </motion.p>
            </div>

            <div className="space-y-3">
              {CONTACT_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ x: 6, scale: 1.01 }}
                    className="group flex items-center gap-4 p-4 rounded-sm no-underline relative overflow-hidden"
                    style={{
                      background: item.accent,
                      border: `1px solid ${item.border}`,
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{ background: `linear-gradient(90deg, ${item.accent.replace('0.08', '0.14')}, transparent)` }}
                    />
                    <div
                      className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                      style={{ background: item.accent, border: `1px solid ${item.border}` }}
                    >
                      <Icon size={16} strokeWidth={1.5} style={{ color: item.color }} />
                    </div>
                    <div className="relative z-10 flex-1">
                      <div className="font-mono text-xs opacity-50 mb-0.5" style={{ color: item.color }}>
                        {item.label}
                      </div>
                      <div className="font-medium text-sm" style={{ color: '#e0f7fa' }}>
                        {item.value}
                      </div>
                    </div>
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                      style={{ color: item.color, opacity: 0.4 }}
                      className="relative z-10 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-8 rounded-sm overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0,229,255,0.04), rgba(0,255,198,0.02))',
                border: '1px solid rgba(0,229,255,0.12)',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.5), rgba(0,255,198,0.3), transparent)' }} />
              <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.2), transparent)' }} />

              <div className="flex items-start gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}
                >
                  <Sparkles size={16} strokeWidth={1.5} style={{ color: '#00e5ff' }} />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1" style={{ color: '#e0f7fa' }}>System Status</h3>
                  <p className="text-xs" style={{ color: '#78909c' }}>Real-time platform telemetry</p>
                </div>
              </div>

              <div className="space-y-3">
                {STATUS_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease: 'easeOut' }}
                    className="flex items-center justify-between py-2"
                    style={{ borderBottom: '1px solid rgba(0,229,255,0.06)' }}
                  >
                    <span className="font-mono text-xs" style={{ color: '#546e7a' }}>{item.label}</span>
                    <span className="font-mono text-xs font-semibold" style={{ color: item.color }}>
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-6 rounded-sm overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0,229,255,0.04), rgba(255,179,0,0.04))',
                border: '1px solid rgba(0,229,255,0.1)',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)' }} />
              <div className="mb-4 flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}
                >
                  <MapPin size={16} strokeWidth={1.5} style={{ color: '#00e5ff' }} />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1" style={{ color: '#e0f7fa' }}>
                    Location Map
                  </h3>
                  <p className="text-xs" style={{ color: '#78909c' }}>
                    Explore our headquarters location in an interactive map preview.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-sm border border-white/10" style={{ minHeight: '220px' }}>
                <iframe
                  title="MiraiQ Labs location"
                  src={MAP_EMBED_URL}
                  className="w-full h-full"
                  style={{ minHeight: '220px', border: '0' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <a
                href={`https://maps.google.com/maps?q=${MAP_QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium"
                style={{ color: '#00e5ff' }}
              >
                View on Google Maps
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative p-8 rounded-sm overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,179,0,0.05), rgba(255,71,87,0.02))',
                border: '1px solid rgba(255,179,0,0.15)',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,179,0,0.5), rgba(255,71,87,0.3), transparent)' }} />

              <h3 className="font-semibold text-base mb-2" style={{ color: '#e0f7fa' }}>
                MiraiQ Labs Pvt. Ltd.
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#78909c' }}>
                A next-generation AI research and technology company dedicated to building the infrastructure of tomorrow's intelligent systems.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Agentic AI', 'Quantum', 'Training', 'Certified'].map(tag => (
                  <span
                    key={tag}
                    className="tag-chip"
                    style={{
                      background: 'rgba(255,179,0,0.07)',
                      border: '1px solid rgba(255,179,0,0.2)',
                      color: '#ffb300',
                      fontSize: '9px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(0,229,255,0.08)' }}
        >
          <div className="flex items-center gap-4">
            <div className="relative w-36 overflow-hidden rounded-full bg-slate-900">
              <img src={footerLogo} alt="MiraiQ Labs logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-mono text-xs" style={{ color: '#4a6572' }}>
              © {currentYear} MiraiQ Labs Private Limited
            </span>
          </div>
          <div className="flex flex-col items-end gap-1 text-right">
            <span className="font-mono text-xs" style={{ color: '#4a6572' }}>
              Engineered for the future — launching soon
            </span>
            <span className="font-mono text-xs" style={{ color: '#4a6572' }}>
              Local time: {currentTime}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
