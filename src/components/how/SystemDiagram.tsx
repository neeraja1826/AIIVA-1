import React from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { diagramControls, diagramSystems } from '../../data/howItWorks';
import { ease } from '../../utils/motion';

type SystemDiagramProps = {
  progress: MotionValue<number>;
  stage: number;
};

const AIIVA = { x: 300, y: 230 };
const HOME = { x: 70, y: 230 };
const SYS_X = 500;
const SYS_Y = [55, 125, 195, 265, 335, 405];
const HOME_PATH = `M ${HOME.x + 36} ${HOME.y} L ${AIIVA.x - 64} ${AIIVA.y}`;

const systemPath = (y: number) => `M ${AIIVA.x + 64} ${AIIVA.y} C 430 ${AIIVA.y}, 430 ${y}, ${SYS_X - 8} ${y}`;

const controlPath = (x: number, y: number) => {
  const dx = AIIVA.x - x;
  const dy = AIIVA.y - y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const sx = x + ux * 12;
  const sy = y + uy * 12;
  const ex = AIIVA.x - ux * 66;
  const ey = AIIVA.y - uy * 66;
  return `M ${sx.toFixed(1)} ${sy.toFixed(1)} L ${ex.toFixed(1)} ${ey.toFixed(1)}`;
};

export function SystemDiagram({ progress, stage }: SystemDiagramProps) {
  const homeOpacity = useTransform(progress, [0, 0.04], [0.35, 1]);
  const aiivaOpacity = useTransform(progress, [0.06, 0.12], [0.35, 1]);

  return (
    <svg
      viewBox="0 0 640 460"
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label="Diagram: your home connects to AIIVA Intelligence, which runs lighting, climate, security, curtains, entertainment and energy, controlled by mobile, voice, sensors and wall panels.">
      
      {/* Faint structural guides */}
      <g stroke="rgba(242,238,231,0.1)" strokeWidth={1} fill="none" strokeDasharray="2 6">
        <path d={HOME_PATH} />
        {SYS_Y.map((y) =>
        <path key={y} d={systemPath(y)} />
        )}
        {diagramControls.map((c) =>
        <path key={c.label} d={controlPath(c.x, c.y)} />
        )}
      </g>

      {/* Active connections */}
      <DiagramPath d={HOME_PATH} progress={progress} range={[0.02, 0.12]} />
      {SYS_Y.map((y, i) =>
      <DiagramPath key={y} d={systemPath(y)} progress={progress} range={[0.12 + i * 0.03, 0.2 + i * 0.03]} />
      )}
      {diagramControls.map((c, i) =>
      <DiagramPath key={c.label} d={controlPath(c.x, c.y)} progress={progress} range={[0.68 + i * 0.03, 0.78 + i * 0.03]} />
      )}

      {/* Particles */}
      {stage >= 1 && <Particle d={HOME_PATH} dur={2.2} />}
      {stage >= 2 && SYS_Y.map((y, i) => <Particle key={y} d={systemPath(y)} dur={2.6} begin={i * 0.25} />)}
      {stage >= 3 &&
      diagramControls.map((c, i) => <Particle key={c.label} d={controlPath(c.x, c.y)} dur={1.8} begin={i * 0.3} />)}

      {/* Home */}
      <motion.g style={{ opacity: homeOpacity }}>
        <circle cx={HOME.x} cy={HOME.y} r={36} fill="#111113" stroke="rgba(242,238,231,0.35)" />
        <path
          d={`M ${HOME.x - 14} ${HOME.y + 13} V ${HOME.y - 3} L ${HOME.x} ${HOME.y - 15} L ${HOME.x + 14} ${HOME.y - 3} V ${HOME.y + 13} Z`}
          fill="none"
          stroke="#F2EEE7"
          strokeWidth={1.2}
          strokeLinejoin="round" />
        
        <text x={HOME.x} y={HOME.y + 62} textAnchor="middle" className="fill-bone font-display text-[15px] max-md:text-[20px]">
          Home
        </text>
      </motion.g>

      {/* AIIVA Intelligence */}
      <motion.g style={{ opacity: aiivaOpacity }}>
        <circle cx={AIIVA.x} cy={AIIVA.y} r={64} fill="none" stroke="rgba(242,238,231,0.14)" />
        <circle
          cx={AIIVA.x}
          cy={AIIVA.y}
          r={50}
          fill="#1B1B1E"
          stroke="#6FD8F2"
          strokeOpacity={stage >= 1 ? 0.8 : 0.3}
          style={{ transition: 'stroke-opacity 300ms cubic-bezier(0.23,1,0.32,1)' }} />
        
        <text x={AIIVA.x} y={AIIVA.y + 2} textAnchor="middle" className="fill-bone font-display text-[22px] font-semibold">
          AIIVA
        </text>
        <text x={AIIVA.x} y={AIIVA.y + 22} textAnchor="middle" className="fill-bone/60 text-[9px] uppercase tracking-[0.2em]">
          Intelligence
        </text>
      </motion.g>

      {/* Automation routine label */}
      <motion.g
        initial={false}
        animate={{ opacity: stage === 2 ? 1 : 0, y: stage === 2 ? 0 : 6 }}
        transition={{ duration: 0.3, ease }}>
        
        <text x={AIIVA.x} y={AIIVA.y + 96} textAnchor="middle" className="fill-volt text-[12px] uppercase tracking-[0.2em] max-md:text-[16px]">
          Scene · Evening 18:30
        </text>
        <text x={AIIVA.x} y={AIIVA.y + 116} textAnchor="middle" className="fill-bone/55 text-[12px] max-md:text-[16px]">
          6 systems in sync
        </text>
      </motion.g>

      {/* Systems */}
      {diagramSystems.map((label, i) =>
      <SystemNode key={label} label={label} y={SYS_Y[i]} index={i} progress={progress} lit={stage >= 2} />
      )}

      {/* Control inputs */}
      {diagramControls.map((c, i) =>
      <ControlNode key={c.label} label={c.label} x={c.x} y={c.y} progress={progress} index={i} />
      )}
    </svg>);

}

type DiagramPathProps = {
  d: string;
  progress: MotionValue<number>;
  range: [number, number];
};

function DiagramPath({ d, progress, range }: DiagramPathProps) {
  const pathLength = useTransform(progress, range, [0, 1]);
  const opacity = useTransform(progress, [range[0], range[0] + 0.005], [0, 1]);
  return (
    <motion.path d={d} fill="none" stroke="#6FD8F2" strokeOpacity={0.75} strokeWidth={1.2} strokeLinecap="round" style={{ pathLength, opacity }} />);

}

function Particle({ d, dur, begin = 0 }: {d: string;dur: number;begin?: number;}) {
  return (
    <circle r={3} fill="#6FD8F2">
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={d} />
    </circle>);

}

type SystemNodeProps = {
  label: string;
  y: number;
  index: number;
  progress: MotionValue<number>;
  lit: boolean;
};

function SystemNode({ label, y, index, progress, lit }: SystemNodeProps) {
  const end = 0.2 + index * 0.03;
  const opacity = useTransform(progress, [end - 0.03, end], [0.3, 1]);
  return (
    <motion.g style={{ opacity }}>
      <circle
        cx={SYS_X}
        cy={y}
        r={6}
        fill={lit ? '#6FD8F2' : '#0A0A0B'}
        stroke="#6FD8F2"
        style={{ transition: 'fill 300ms cubic-bezier(0.23,1,0.32,1)', transitionDelay: `${index * 60}ms` }} />
      
      <text x={SYS_X + 16} y={y + 5} className="fill-bone font-display text-[15px] max-md:text-[19px]">
        {label}
      </text>
    </motion.g>);

}

type ControlNodeProps = {
  label: string;
  x: number;
  y: number;
  index: number;
  progress: MotionValue<number>;
};

function ControlNode({ label, x, y, index, progress }: ControlNodeProps) {
  const opacity = useTransform(progress, [0.66 + index * 0.03, 0.72 + index * 0.03], [0.2, 1]);
  const above = y < AIIVA.y;
  return (
    <motion.g style={{ opacity }}>
      <rect x={x - 6} y={y - 6} width={12} height={12} rx={2} fill="#0A0A0B" stroke="#C9B58C" />
      <text
        x={x}
        y={above ? y - 18 : y + 30}
        textAnchor="middle"
        className="fill-champagne text-[11px] uppercase tracking-[0.18em] max-md:text-[15px]">
        
        {label}
      </text>
    </motion.g>);

}