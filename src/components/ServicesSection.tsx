import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Atom, GraduationCap, BookOpen, Award, Network } from 'lucide-react';

const SERVICES = [
  {
    icon: Network,
    title: 'Agentic AI Swarms',
    desc: 'Self-organizing multi-agent systems that operate autonomously, coordinate intelligently, and solve complex problems at unprecedented scale.',
    tags: ['LLM Agents', 'Auto-orchestration', 'Emergent Systems'],
    color: '#00e5ff',
    accent: 'rgba(0,229,255,0.08)',
    border: 'rgba(0,229,255,0.2)',
    delay: 0,
  },
  {
    icon: Atom,
    title: 'Quantum Simulations',
    desc: 'High-fidelity quantum circuit emulation and molecular dynamics modeling, accelerating research in materials science and drug discovery.',
    tags: ['Qubit Circuits', 'Molecular Dynamics', 'Quantum ML'],
    color: '#00ffc6',
    accent: 'rgba(0,255,198,0.08)',
    border: 'rgba(0,255,198,0.2)',
    delay: 0.1,
  },
  {
    icon: GraduationCap,
    title: 'Software Dev Training',
    desc: 'Immersive, project-based engineering programs that take developers from foundational skills to production-grade AI system builders.',
    tags: ['Full-Stack AI', 'MLOps', 'System Design'],
    color: '#ffb300',
    accent: 'rgba(255,179,0,0.08)',
    border: 'rgba(255,179,0,0.2)',
    delay: 0.2,
  },
  {
    icon: BookOpen,
    title: 'Knowledge Transfer',
    desc: 'Deep-dive enterprise engagements that embed cutting-edge AI capabilities directly into your organization\'s technical DNA.',
    tags: ['Enterprise AI', 'Team Upskilling', 'Architecture Reviews'],
    color: '#ff4757',
    accent: 'rgba(255,71,87,0.08)',
    border: 'rgba(255,71,87,0.2)',
    delay: 0.3,
  },
  {
    icon: Award,
    title: 'Certifications',
    desc: 'Industry-recognized certification programs validating expertise in agentic AI, quantum-classical hybrid computing, and advanced ML systems.',
    tags: ['AI Engineering', 'Quantum Computing', 'Verified Credentials'],
    color: '#00ffc6',
    accent: 'rgba(0,255,198,0.08)',
    border: 'rgba(0,255,198,0.2)',
    delay: 0.4,
  },
  {
    icon: Brain,
    title: 'R&D Consulting',
    desc: 'Strategic partnership in applied AI research — from ideation to prototype to production, guided by deep technical expertise.',
    tags: ['Applied AI', 'Prototyping', 'Research Ops'],
    color: '#00e5ff',
    accent: 'rgba(0,229,255,0.08)',
    border: 'rgba(0,229,255,0.2)',
    delay: 0.5,
  },
];

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020810 0%, #050f1c 50%, #020810 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(255,179,0,0.03) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(0,229,255,0.03) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to right, transparent, rgba(0,229,255,0.4))' }} />
            <span className="section-label">Capabilities</span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to left, transparent, rgba(0,229,255,0.4))' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-bold leading-tight mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            <span className="gradient-text-cyan">What We</span>{' '}
            <span style={{ color: '#e0f7fa' }}>Build</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg max-w-xl mx-auto font-light"
            style={{ color: '#90a4ae' }}
          >
            At the intersection of artificial intelligence, quantum mechanics, and human expertise.
          </motion.p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={gridInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: svc.delay, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative p-6 rounded-sm overflow-hidden cursor-default"
                style={{
                  background: `linear-gradient(135deg, ${svc.accent}, rgba(5,15,28,0.9))`,
                  border: `1px solid ${svc.border}`,
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${svc.accent.replace('0.08', '0.15')}, transparent 70%)` }}
                />
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-60"
                  style={{ background: `linear-gradient(90deg, transparent, ${svc.color}, transparent)` }}
                />

                <div className="relative z-10 space-y-4">
                  <div
                    className="w-11 h-11 rounded-sm flex items-center justify-center"
                    style={{ background: svc.accent, border: `1px solid ${svc.border}` }}
                  >
                    <Icon size={20} strokeWidth={1.5} style={{ color: svc.color }} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2" style={{ color: '#e0f7fa' }}>
                      {svc.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#78909c', lineHeight: '1.7' }}>
                      {svc.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {svc.tags.map(tag => (
                      <span
                        key={tag}
                        className="tag-chip"
                        style={{
                          background: svc.accent,
                          border: `1px solid ${svc.border}`,
                          color: svc.color,
                          fontSize: '9px',
                          padding: '2px 7px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
