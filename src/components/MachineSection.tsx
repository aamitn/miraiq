import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import MachineSVG from './MachineSVG';

gsap.registerPlugin(ScrollTrigger);

const LAYERS = [
  { id: 'layer-hex-frame', label: 'Containment Shell', sub: 'Hexagonal lattice framework', color: '#00e5ff', pct: '0%' },
  { id: 'layer-orbit-1', label: 'Orbital Ring Alpha', sub: '12-node positional matrix', color: '#00ffc6', pct: '14%' },
  { id: 'layer-orbit-2', label: 'Counter Ring Beta', sub: 'Amber-class oscillation band', color: '#ffb300', pct: '28%' },
  { id: 'layer-connectors', label: 'Bridge Network', sub: 'Inter-module data pathways', color: '#00e5ff', pct: '40%' },
  { id: 'layer-pods', label: 'Module Pods [x6]', sub: 'Processing node cluster array', color: '#00ffc6', pct: '52%' },
  { id: 'layer-circuit', label: 'Circuit Matrix', sub: 'Quantum trace substrate', color: '#ffb300', pct: '62%' },
  { id: 'layer-orbit-3', label: 'Ring Gamma', sub: 'High-frequency inner orbit', color: '#00ffc6', pct: '72%' },
  { id: 'layer-data-web', label: 'Data Web', sub: 'Entanglement routing grid', color: '#ff4757', pct: '80%' },
  { id: 'layer-inner-core', label: 'Core Housing', sub: 'Shielded core assembly', color: '#00e5ff', pct: '88%' },
  { id: 'layer-crystal', label: 'Quantum Core', sub: 'Central AI consciousness node', color: '#ffffff', pct: '95%' },
  { id: 'layer-pings', label: 'System Active', sub: 'NEXUS CORE online', color: '#00ffc6', pct: '100%' },
];

export default function MachineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState(-1);
  const [assemblyProgress, setAssemblyProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const TOTAL_LAYERS = LAYERS.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: stickyRef.current,
          pinSpacing: false,
          onUpdate: (self) => {
            const progress = self.progress;
            setAssemblyProgress(Math.round(progress * 100));
            setActiveLayer(Math.min(Math.floor(progress * TOTAL_LAYERS), TOTAL_LAYERS - 1));
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${progress * 100}%`;
            }
          },
        },
      });

      LAYERS.forEach(({ id }, idx) => {
        const el = document.getElementById(id);
        if (!el) return;
        const startPct = idx / TOTAL_LAYERS;
        const endPct = (idx + 0.85) / TOTAL_LAYERS;

        tl.fromTo(
          el,
          {
            opacity: 0,
            scale: idx < 5 ? 1.2 : 0.8,
            filter: 'blur(8px)',
            transformOrigin: '350px 350px',
            transformBox: 'view-box',
          },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: endPct - startPct,
            ease: 'power3.out',
          },
          startPct
        );
      });

      const svgEl = svgRef.current;
      if (svgEl) {
        gsap.to(svgEl, {
          rotation: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ height: '600vh', position: 'relative' }}>
      <div
        ref={stickyRef}
        className="w-full h-screen flex items-center justify-center relative overflow-hidden scanline-overlay"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,229,255,0.03) 0%, transparent 65%), #020810' }}
      >
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(2,8,16,0.6) 100%)' }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="flex-1 flex items-center justify-center lg:justify-end">
            <div className="relative" style={{ width: 'min(480px, 85vw)', height: 'min(480px, 85vw)' }}>
              <div
                className="absolute inset-[-20px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%)' }}
              />
              <MachineSVG ref={svgRef} />
            </div>
          </div>

          <div className="flex-1 max-w-xs space-y-6">
            <div>
              <span className="section-label block mb-2">Assembly Sequence</span>
              <div className="relative h-1 rounded-full overflow-hidden" style={{ background: 'rgba(0,229,255,0.1)' }}>
                <div
                  ref={progressBarRef}
                  className="h-full rounded-full transition-none"
                  style={{
                    width: '0%',
                    background: 'linear-gradient(90deg, #00e5ff, #00ffc6)',
                    boxShadow: '0 0 10px rgba(0,229,255,0.5)',
                  }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-mono text-xs opacity-40" style={{ color: '#00e5ff' }}>
                  0x0000
                </span>
                <span className="font-mono text-xs" style={{ color: '#00e5ff' }}>
                  {String(assemblyProgress).padStart(3, '0')}%
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {LAYERS.slice(0, 8).map((layer, i) => (
                <motion.div
                  key={layer.id}
                  animate={{
                    opacity: i <= activeLayer ? 1 : 0.2,
                    x: i <= activeLayer ? 0 : -8,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="flex items-center gap-3 py-1"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-500"
                    style={{
                      background: i <= activeLayer ? layer.color : 'rgba(255,255,255,0.1)',
                      boxShadow: i <= activeLayer ? `0 0 6px ${layer.color}` : 'none',
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-mono text-xs font-medium truncate"
                      style={{ color: i <= activeLayer ? layer.color : '#4a6572' }}
                    >
                      {layer.label}
                    </div>
                    <div className="text-xs opacity-50 truncate" style={{ color: '#90a4ae', fontSize: '10px' }}>
                      {layer.sub}
                    </div>
                  </div>
                  <span
                    className="font-mono text-xs flex-shrink-0 opacity-50"
                    style={{ color: i <= activeLayer ? layer.color : '#4a6572', fontSize: '10px' }}
                  >
                    {layer.pct}
                  </span>
                </motion.div>
              ))}
            </div>

            {assemblyProgress >= 95 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-sm"
                style={{
                  background: 'rgba(0,255,198,0.06)',
                  border: '1px solid rgba(0,255,198,0.3)',
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
                  <span className="font-mono text-xs" style={{ color: '#00ffc6' }}>NEXUS CORE: ONLINE</span>
                </div>
                <p className="text-xs opacity-60" style={{ color: '#90a4ae' }}>
                  All systems nominal. Quantum coherence: 99.7%
                </p>
              </motion.div>
            )}
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="font-mono text-xs opacity-30" style={{ color: '#00e5ff' }}>
            {assemblyProgress < 100 ? 'SCROLL TO ASSEMBLE' : 'SCROLL TO CONTINUE'}
          </span>
        </div>
      </div>
    </div>
  );
}
