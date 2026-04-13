import { forwardRef } from 'react';

const MachineSVG = forwardRef<SVGSVGElement>((_, ref) => {
  const cx = 350, cy = 350;

  const hexPoints = (r: number, cx: number, cy: number, offset = 0) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i + offset;
      return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
    }).join(' ');

  const circlePoint = (r: number, angleDeg: number) => ({
    x: cx + r * Math.cos((angleDeg * Math.PI) / 180),
    y: cy + r * Math.sin((angleDeg * Math.PI) / 180),
  });

  return (
    <svg
      ref={ref}
      viewBox="0 0 700 700"
      width="100%"
      height="100%"
      style={{ maxWidth: '640px', maxHeight: '640px', overflow: 'visible' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,229,255,0.12)" />
          <stop offset="70%" stopColor="rgba(0,229,255,0.03)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00ffc6" />
          <stop offset="40%" stopColor="#00e5ff" />
          <stop offset="100%" stopColor="rgba(0,180,204,0.3)" />
        </radialGradient>
        <radialGradient id="crystal-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#00ffc6" />
          <stop offset="80%" stopColor="#00e5ff" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="pod-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00ffc6" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="amber-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffb300" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ff4757" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="trace-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
          <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00ffc6" stopOpacity="0" />
        </linearGradient>

        <filter id="glow-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="b1" />
          <feGaussianBlur stdDeviation="16" result="b2" />
          <feMerge>
            <feMergeNode in="b2" />
            <feMergeNode in="b1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-core" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="12" result="b1" />
          <feGaussianBlur stdDeviation="28" result="b2" />
          <feMerge>
            <feMergeNode in="b2" />
            <feMergeNode in="b1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="outer-glow" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <clipPath id="hex-clip-300">
          <polygon points={hexPoints(295, cx, cy, Math.PI / 6)} />
        </clipPath>
      </defs>

      {/* Ambient background glow */}
      <circle cx={cx} cy={cy} r={320} fill="url(#bg-glow)" />

      {/* === LAYER 1: Outer Hexagonal Frame === */}
      <g id="layer-hex-frame" style={{ opacity: 0 }}>
        <polygon
          points={hexPoints(305, cx, cy, Math.PI / 6)}
          fill="none"
          stroke="#00e5ff"
          strokeWidth="0.5"
          strokeOpacity="0.15"
        />
        <polygon
          points={hexPoints(300, cx, cy, Math.PI / 6)}
          fill="none"
          stroke="#00e5ff"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          filter="url(#outer-glow)"
        />
        <polygon
          points={hexPoints(290, cx, cy, Math.PI / 6)}
          fill="none"
          stroke="#00ffc6"
          strokeWidth="0.5"
          strokeOpacity="0.2"
          strokeDasharray="4 8"
          className="animate-dash-flow"
        />

        {Array.from({ length: 6 }, (_, i) => {
          const a = (Math.PI / 3) * i + Math.PI / 6;
          const px = cx + 300 * Math.cos(a), py = cy + 300 * Math.sin(a);
          const ia = a + Math.PI / 6;
          const nx = cx + 295 * Math.cos(ia), ny = cy + 295 * Math.sin(ia);
          return (
            <g key={i}>
              <circle cx={px} cy={py} r="5" fill="#00e5ff" opacity="0.8" filter="url(#glow-soft)" />
              <circle cx={px} cy={py} r="9" fill="none" stroke="#00e5ff" strokeWidth="0.5" opacity="0.4" />
              <circle cx={nx} cy={ny} r="2.5" fill="#00ffc6" opacity="0.6" />
              <line x1={px} y1={py} x2={nx} y2={ny} stroke="#00e5ff" strokeWidth="0.5" opacity="0.3" />
            </g>
          );
        })}

        {Array.from({ length: 6 }, (_, i) => {
          const a1 = (Math.PI / 3) * i + Math.PI / 6;
          const a2 = (Math.PI / 3) * (i + 1) + Math.PI / 6;
          const mid = (a1 + a2) / 2;
          const px = cx + 300 * Math.cos(mid), py = cy + 300 * Math.sin(mid);
          const ex = cx + 310 * Math.cos(mid), ey = cy + 310 * Math.sin(mid);
          return (
            <line key={`tick-${i}`} x1={px} y1={py} x2={ex} y2={ey} stroke="#00e5ff" strokeWidth="1" opacity="0.4" />
          );
        })}

        <text
          x={cx} y={cy - 308} textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#00e5ff" opacity="0.5" letterSpacing="3"
        >
          NEXUS CORE — MIRAIQ LABS
        </text>
        <text
          x={cx} y={cy + 316} textAnchor="middle"
          fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="#00ffc6" opacity="0.4" letterSpacing="2"
        >
          QAI-7X REV 3.14
        </text>
      </g>

      {/* === LAYER 2: Outer Orbital Ring === */}
      <g id="layer-orbit-1" style={{ opacity: 0 }} className="animate-rotate-cw-slow">
        <circle cx={cx} cy={cy} r={255} fill="none" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.35"
          strokeDasharray="6 4" filter="url(#outer-glow)" />
        <circle cx={cx} cy={cy} r={265} fill="none" stroke="#00e5ff" strokeWidth="0.5" strokeOpacity="0.12"
          strokeDasharray="2 12" />

        {Array.from({ length: 12 }, (_, i) => {
          const a = (Math.PI / 6) * i;
          const pr = i % 3 === 0 ? 255 : 255;
          const { x: px, y: py } = circlePoint(pr, (360 / 12) * i);
          const size = i % 3 === 0 ? 6 : 3;
          return (
            <g key={i}>
              <circle cx={px} cy={py} r={size} fill={i % 3 === 0 ? '#00e5ff' : '#00ffc6'}
                opacity={i % 3 === 0 ? 0.9 : 0.5} filter={i % 3 === 0 ? 'url(#glow-soft)' : undefined} />
              {i % 3 === 0 && (
                <circle cx={px} cy={py} r={size + 4} fill="none" stroke="#00e5ff" strokeWidth="0.5" opacity="0.3" />
              )}
              {i % 3 === 0 && (
                <line x1={px} y1={py} x2={cx + 210 * Math.cos(a)} y2={cy + 210 * Math.sin(a)}
                  stroke="#00e5ff" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="3 3" />
              )}
            </g>
          );
        })}
      </g>

      {/* === LAYER 3: Secondary Counter Ring === */}
      <g id="layer-orbit-2" style={{ opacity: 0 }} className="animate-rotate-ccw-slow">
        <circle cx={cx} cy={cy} r={210} fill="none" stroke="#ffb300" strokeWidth="1.5" strokeOpacity="0.4"
          strokeDasharray="8 6" filter="url(#outer-glow)" />
        <circle cx={cx} cy={cy} r={200} fill="none" stroke="#ffb300" strokeWidth="0.5" strokeOpacity="0.15" />

        {Array.from({ length: 8 }, (_, i) => {
          const angle = (360 / 8) * i;
          const { x, y } = circlePoint(210, angle);
          const { x: ix, y: iy } = circlePoint(200, angle);
          return (
            <g key={i}>
              <rect x={x - 4} y={y - 4} width="8" height="8" fill="#ffb300" opacity="0.7"
                stroke="#ff6f00" strokeWidth="0.5" transform={`rotate(45, ${x}, ${y})`}
                filter="url(#glow-soft)" />
              <line x1={x} y1={y} x2={ix} y2={iy} stroke="#ffb300" strokeWidth="1" opacity="0.4" />
            </g>
          );
        })}
      </g>

      {/* === LAYER 4: Connection Lines to Pods === */}
      <g id="layer-connectors" style={{ opacity: 0 }}>
        {Array.from({ length: 6 }, (_, i) => {
          const angle = 60 * i;
          const { x: ox, y: oy } = circlePoint(255, angle);
          const { x: px, y: py } = circlePoint(170, angle);
          const { x: mx, y: my } = circlePoint(212, angle + 5);
          return (
            <g key={i}>
              <line x1={ox} y1={oy} x2={px} y2={py} stroke="#00e5ff" strokeWidth="1"
                strokeOpacity="0.4" strokeDasharray="4 3" className="animate-dash-flow" />
              <circle cx={mx} cy={my} r="2" fill="#00ffc6" opacity="0.5" />
            </g>
          );
        })}
        {Array.from({ length: 6 }, (_, i) => {
          const angle = 60 * i + 30;
          const { x: ox, y: oy } = circlePoint(210, angle);
          const { x: px, y: py } = circlePoint(170, angle + 3);
          return (
            <line key={`c2-${i}`} x1={ox} y1={oy} x2={px} y2={py} stroke="#ffb300"
              strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="3 5" className="animate-dash-rev" />
          );
        })}
      </g>

      {/* === LAYER 5: Hexagonal Module Pods === */}
      <g id="layer-pods" style={{ opacity: 0 }}>
        {Array.from({ length: 6 }, (_, i) => {
          const angle = 60 * i;
          const { x, y } = circlePoint(170, angle);
          const podSize = 28;
          const innerSize = 18;
          const colors = ['#00e5ff', '#00ffc6', '#ffb300', '#ff4757', '#00ffc6', '#00e5ff'];
          const c = colors[i];
          return (
            <g key={i} transform={`translate(${x},${y})`}>
              <polygon points={hexPoints(podSize, 0, 0, 0)} fill="none"
                stroke={c} strokeWidth="1.2" strokeOpacity="0.8" filter="url(#glow-soft)" />
              <polygon points={hexPoints(podSize + 6, 0, 0, 0)} fill="none"
                stroke={c} strokeWidth="0.4" strokeOpacity="0.2" />
              <polygon points={hexPoints(innerSize, 0, 0, Math.PI / 6)}
                fill={c} fillOpacity="0.08" stroke={c} strokeWidth="0.5" strokeOpacity="0.4" />
              <circle cx="0" cy="0" r="6" fill={c} fillOpacity="0.7" filter="url(#glow-soft)" />
              <circle cx="0" cy="0" r="10" fill="none" stroke={c} strokeWidth="0.5" strokeOpacity="0.3"
                strokeDasharray="3 3" className="animate-dash-flow" />
              <text x="0" y={podSize + 14} textAnchor="middle"
                fontFamily="'JetBrains Mono', monospace" fontSize="6" fill={c} opacity="0.6" letterSpacing="1">
                {['AI-01', 'QS-02', 'TR-03', 'KT-04', 'CT-05', 'SW-06'][i]}
              </text>
            </g>
          );
        })}
      </g>

      {/* === LAYER 6: Circuit Board Platform === */}
      <g id="layer-circuit" style={{ opacity: 0 }}>
        {[...Array(8)].map((_, i) => (
          <circle key={`cr-${i}`} cx={cx} cy={cy} r={155 - i * 8}
            fill="none" stroke={i % 2 === 0 ? '#00e5ff' : '#00ffc6'}
            strokeWidth="0.3" strokeOpacity={0.06 - i * 0.005} />
        ))}

        {Array.from({ length: 24 }, (_, i) => {
          const a1 = (Math.PI / 12) * i;
          const a2 = a1 + Math.PI / 24;
          return (
            <g key={`spoke-${i}`}>
              <line x1={cx + 90 * Math.cos(a1)} y1={cy + 90 * Math.sin(a1)}
                x2={cx + 150 * Math.cos(a1)} y2={cy + 150 * Math.sin(a1)}
                stroke="#00e5ff" strokeWidth="0.4" strokeOpacity={i % 3 === 0 ? 0.3 : 0.1} />
              {i % 3 === 0 && (
                <circle cx={cx + 150 * Math.cos(a1)} cy={cy + 150 * Math.sin(a1)}
                  r="2" fill="#00e5ff" opacity="0.4" />
              )}
            </g>
          );
        })}

        {[[-50, -50, 50, -50, 50, 50, -50, 50]].map((pts, idx) => (
          <polygon key={`sq-${idx}`}
            points={pts.reduce((acc, v, i) => acc + (i % 2 === 0 ? (acc ? ' ' : '') + v : ',' + v), '')}
            fill="none" stroke="#00e5ff" strokeWidth="0.5" strokeOpacity="0.12"
            transform={`translate(${cx},${cy})`} />
        ))}

        {Array.from({ length: 8 }, (_, i) => {
          const a = (Math.PI / 4) * i;
          const { x, y } = circlePoint(140, (360 / 8) * i);
          return (
            <rect key={`pad-${i}`} x={x - 4} y={y - 4} width="8" height="8"
              fill="#00e5ff" fillOpacity="0.15" stroke="#00e5ff" strokeWidth="0.8" strokeOpacity="0.5"
              transform={`rotate(${(360 / 8) * i}, ${x}, ${y})`} />
          );
        })}

        {Array.from({ length: 16 }, (_, i) => {
          const angle1 = (360 / 16) * i;
          const angle2 = angle1 + 15;
          const { x: x1, y: y1 } = circlePoint(120, angle1);
          const { x: x2, y: y2 } = circlePoint(120, angle2);
          const { x: x3, y: y3 } = circlePoint(100, (angle1 + angle2) / 2);
          return (
            <path key={`trace-${i}`}
              d={`M${x1.toFixed(1)},${y1.toFixed(1)} L${x3.toFixed(1)},${y3.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}`}
              fill="none" stroke="#00ffc6" strokeWidth="0.6" strokeOpacity="0.25" />
          );
        })}
      </g>

      {/* === LAYER 7: Inner Rotating Ring === */}
      <g id="layer-orbit-3" style={{ opacity: 0 }} className="animate-rotate-cw-med">
        <circle cx={cx} cy={cy} r={128} fill="none" stroke="#00ffc6" strokeWidth="1.5" strokeOpacity="0.5"
          strokeDasharray="10 6" filter="url(#outer-glow)" />
        <circle cx={cx} cy={cy} r={118} fill="none" stroke="#00ffc6" strokeWidth="0.5" strokeOpacity="0.15" />

        {Array.from({ length: 6 }, (_, i) => {
          const { x, y } = circlePoint(128, 60 * i + 30);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill="#00ffc6" opacity="0.9" filter="url(#glow-soft)" />
              <circle cx={x} cy={y} r="9" fill="none" stroke="#00ffc6" strokeWidth="0.5" opacity="0.4" />
            </g>
          );
        })}
      </g>

      {/* === LAYER 8: Data Web === */}
      <g id="layer-data-web" style={{ opacity: 0 }}>
        {Array.from({ length: 6 }, (_, i) => {
          const a1 = 60 * i;
          const a2 = 60 * ((i + 2) % 6);
          const p1 = circlePoint(115, a1);
          const p2 = circlePoint(115, a2);
          return (
            <line key={`web-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke="#00e5ff" strokeWidth="0.5" strokeOpacity="0.25"
              strokeDasharray="5 5" className="animate-dash-flow" />
          );
        })}

        {Array.from({ length: 6 }, (_, i) => {
          const a = 60 * i;
          const p = circlePoint(90, a);
          return (
            <g key={`wb2-${i}`}>
              <line x1={cx} y1={cy} x2={p.x} y2={p.y}
                stroke="#ffb300" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="3 5" />
              <circle cx={p.x} cy={p.y} r="3" fill="#ffb300" opacity="0.5" />
            </g>
          );
        })}
      </g>

      {/* === LAYER 9: Inner Core Ring === */}
      <g id="layer-inner-core" style={{ opacity: 0 }}>
        <circle cx={cx} cy={cy} r={75} fill="rgba(0,229,255,0.04)" stroke="#00e5ff"
          strokeWidth="2" strokeOpacity="0.7" filter="url(#glow-soft)" />
        <circle cx={cx} cy={cy} r={65} fill="none" stroke="#00ffc6"
          strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 4" className="animate-dash-rev" />
        <circle cx={cx} cy={cy} r={82} fill="none" stroke="#00e5ff"
          strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="1 6" />

        {Array.from({ length: 8 }, (_, i) => {
          const { x, y } = circlePoint(75, (360 / 8) * i);
          return (
            <circle key={i} cx={x} cy={y} r="3.5" fill="#00e5ff" opacity="0.8" filter="url(#glow-soft)" />
          );
        })}

        <g className="animate-rotate-ccw-med">
          <circle cx={cx} cy={cy} r={52} fill="none" stroke="#ffb300"
            strokeWidth="1" strokeOpacity="0.5" strokeDasharray="6 4" />
          {Array.from({ length: 4 }, (_, i) => {
            const { x, y } = circlePoint(52, 90 * i + 45);
            return (
              <rect key={i} x={x - 3} y={y - 3} width="6" height="6"
                fill="#ffb300" opacity="0.7" transform={`rotate(45, ${x}, ${y})`} />
            );
          })}
        </g>
      </g>

      {/* === LAYER 10: Central Crystal Core === */}
      <g id="layer-crystal" style={{ opacity: 0 }} filter="url(#glow-core)">
        <circle cx={cx} cy={cy} r={38} fill="url(#core-grad)" opacity="0.15" />
        <circle cx={cx} cy={cy} r={30} fill="rgba(0,229,255,0.08)" stroke="#00e5ff"
          strokeWidth="1.5" strokeOpacity="0.9" />

        <polygon
          points={`${cx},${cy - 22} ${cx + 19},${cy + 11} ${cx - 19},${cy + 11}`}
          fill="url(#crystal-grad)" fillOpacity="0.6"
          stroke="#00ffc6" strokeWidth="0.8" strokeOpacity="0.8"
        />
        <polygon
          points={`${cx},${cy + 22} ${cx + 19},${cy - 11} ${cx - 19},${cy - 11}`}
          fill="url(#crystal-grad)" fillOpacity="0.4"
          stroke="#00e5ff" strokeWidth="0.8" strokeOpacity="0.6"
        />
        <polygon
          points={`${cx},${cy - 14} ${cx + 12},${cy + 7} ${cx - 12},${cy + 7}`}
          fill="#00ffc6" fillOpacity="0.8"
        />
        <polygon
          points={`${cx},${cy + 14} ${cx + 12},${cy - 7} ${cx - 12},${cy - 7}`}
          fill="#00e5ff" fillOpacity="0.5"
        />
        <circle cx={cx} cy={cy} r="6" fill="white" opacity="0.9" />

        <circle cx={cx} cy={cy} r={38} fill="none" stroke="#00e5ff"
          strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="3 3"
          className="animate-rotate-cw-fast" />
      </g>

      {/* === Ambient Ping Rings (always visible, subtle) === */}
      <g id="layer-pings" style={{ opacity: 0 }}>
        <circle cx={cx} cy={cy} r={30} fill="none" stroke="#00e5ff"
          strokeWidth="1" strokeOpacity="0.5" className="animate-ping-ring" />
        <circle cx={cx} cy={cy} r={30} fill="none" stroke="#00ffc6"
          strokeWidth="0.8" strokeOpacity="0.3"
          style={{ animation: 'ping-ring 2s cubic-bezier(0,0,0.2,1) infinite 1s' }} />
      </g>
    </svg>
  );
});

MachineSVG.displayName = 'MachineSVG';
export default MachineSVG;
