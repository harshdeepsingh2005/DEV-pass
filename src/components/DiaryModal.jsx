import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/* ═══════════════════════════════════════════════════════
   DATA — Systems, Research entries, Field Logs
   ═══════════════════════════════════════════════════════ */

const SYSTEMS = [
  {
    id: 'autopilot',
    title: 'AutoPilot-for-Anything',
    category: 'GENERAL AUTONOMY',
    categoryColor: '#1D3461',
    badge: 'ARCHITECTURE CONCEPT',
    page: 2,
    intro: 'AutoPilot-for-Anything (APA) investigates minimal general autonomy. Rather than tightly coupling logic to specific environments, the project isolates decision-making within a',
    boldTerm: 'Minimal General Autonomy Core (MGAC)',
    body: 'The core interacts strictly with the Universal Autonomy Abstraction Layer (UAAL), which normalizes states, actions, and constraints across environments. Domain Adapter Interfaces (DAI) are purely stateless bridges translating specific world states to this abstraction layer.',
    highlight: 'Current deployments include running the identical MGAC across GridWorld exploration and Logistics Routing without modifying central logic.',
    diagram: {
      type: 'architecture',
      nodes: [
        { label: 'MGAC Core', x: 50, y: 30, w: 120, h: 36 },
        { label: 'Universal Autonomy Abstraction', x: 35, y: 75, w: 160, h: 28 },
      ],
      edges: [{ from: 0, to: 1 }],
      caption: 'MGAC DIAGRAM v1.2',
    },
  },
  {
    id: 'cxtwin',
    title: 'CX-Twin',
    category: 'RL CUSTOMER SIMULATION',
    categoryColor: '#8B2020',
    badge: 'RL SIMULATION',
    page: 6,
    intro: 'CX-Twin focuses on simulating multi-step customer journeys using Reinforcement Learning. By modeling the digital e-commerce landscape as a Markov Decision Process (MDP), standard Deep Q-Networks (DQN) begin to map transition probabilities between user interactions.',
    boldTerm: null,
    body: 'Traditional predictive models view customer states in isolation. Treating the journey as a continuous process allows testing of "intervention strategies" in the simulated environment.',
    highlight: 'The system observed a 10-15% increase in churn prediction accuracy through sequential tracking versus standalone classification models.',
    highlightStat: '10-15% increase in churn prediction accuracy',
    diagram: {
      type: 'chart',
      caption: 'DQN vs Static ML Accuracy',
    },
  },
  {
    id: 'lst',
    title: 'LST Prediction Engine',
    category: 'ENVIRONMENTAL ML MODELING',
    categoryColor: '#2D6A4F',
    badge: 'ENVIRONMENTAL ML',
    page: 8,
    intro: 'The LST Prediction Engine leverages MODIS satellite imagery and ensemble machine learning methods to predict Land Surface Temperature anomalies in urban environments.',
    boldTerm: null,
    body: 'By combining XGBoost gradient boosting with spatial feature engineering, the system identifies urban heat island patterns with high granularity. The pipeline ingests multi-spectral satellite data and outputs geo-referenced prediction maps.',
    highlight: 'Achieved 92% accuracy in temperature anomaly classification across 15 metropolitan test regions with sub-kilometer resolution.',
    highlightStat: '92% accuracy in temperature anomaly classification',
    diagram: null,
  },
]

/* Resolve base path for public assets */
const BASE = import.meta.env.BASE_URL || '/'

const RESEARCH = [
  {
    id: 'dqn',
    title: 'Simulating Customer Behavior (DQN)',
    category: 'REINFORCEMENT LEARNING',
    categoryColor: '#8B2020',
    page: 12,
    intro: 'This research investigates using Deep Q-Networks to model sequential customer decision-making in digital environments.',
    body: 'By treating user sessions as episodic MDPs, the agent learns optimal intervention policies that maximize long-term engagement metrics over myopic conversion optimization.',
    highlight: 'Sequential RL-based modeling improved next-action prediction accuracy by 18% compared to traditional Markov chain approaches.',
    paper: `${BASE}papers/BehaviorGraph_RL_IEEE.pdf`,
    paperLabel: 'BehaviorGraph RL — IEEE',
  },
  {
    id: 'modis',
    title: 'Predictive LST Modeling (MODIS)',
    category: 'GEOSPATIAL ML',
    categoryColor: '#2D6A4F',
    page: 16,
    intro: 'Leveraging MODIS satellite data for predictive modeling of Land Surface Temperature anomalies in urban microclimates.',
    body: 'The pipeline combines spatial autocorrelation features with temporal decomposition to capture both seasonal patterns and acute heat events in metropolitan areas.',
    highlight: 'XGBoost ensemble achieved R² = 0.94 on holdout test sets across 15 major cities with diverse climate profiles.',
    paper: `${BASE}papers/CausalPathNet_IEEE.pdf`,
    paperLabel: 'CausalPathNet — IEEE',
  },
  {
    id: 'abstraction',
    title: 'Abstraction-Driven Frameworks',
    category: 'SOFTWARE ARCHITECTURE',
    categoryColor: '#1D3461',
    page: 19,
    intro: 'An exploration of abstraction patterns that enable domain-agnostic AI system design and deployment.',
    body: 'The framework proposes a layered abstraction model where domain-specific adapters translate environmental signals into universal state representations, enabling a single core agent to operate across vastly different problem domains.',
    highlight: 'Demonstrated portability across 4 distinct domains with zero modifications to the central decision-making module.',
    paper: `${BASE}papers/UniCore_RL_IEEE.pdf`,
    paperLabel: 'UniCore RL — IEEE',
  },
]

const FIELD_LOGS = [
  { date: '2026-03-19', entry: 'Ran MGAC v2.1 benchmark on GridWorld — decision latency improved 22% post-pruning.' },
  { date: '2026-03-17', entry: 'CX-Twin epsilon schedule adjusted: slower decay shows better exploration in sparse-reward sessions.' },
  { date: '2026-03-14', entry: 'MODIS pipeline: added cloud-mask preprocessing step — reduced false positives by ~8%.' },
  { date: '2026-03-11', entry: 'Abstraction layer v3 draft — introduced "capability probes" for runtime adapter selection.' },
  { date: '2026-03-08', entry: 'CX-Twin reward shaping: weighting session depth over conversion rate yields more realistic agent behavior.' },
  { date: '2026-03-05', entry: 'LST model: spatial lag features significantly improve predictions near water bodies and parks.' },
]

/* ─── Tab definitions ─── */
const TABS = [
  { id: 'index',    label: 'INDEX',    color: '#1D3461' },
  { id: 'systems',  label: 'SYSTEMS',  color: '#8B2020' },
  { id: 'research', label: 'RESEARCH', color: '#4A6FA5' },
  { id: 'logs',     label: 'LOGS',     color: '#8B6914' },
]

/* ═══════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════ */

/* Compass rose watermark for index page */
const CompassWatermark = () => (
  <svg
    viewBox="0 0 200 200"
    style={{
      position: 'absolute', right: 30, top: 20,
      width: 140, height: 140, opacity: 0.06,
      pointerEvents: 'none',
    }}
  >
    <circle cx="100" cy="100" r="90" fill="none" stroke="#1D3461" strokeWidth="1" />
    <circle cx="100" cy="100" r="70" fill="none" stroke="#1D3461" strokeWidth="0.5" />
    <line x1="100" y1="10" x2="100" y2="190" stroke="#1D3461" strokeWidth="0.8" />
    <line x1="10" y1="100" x2="190" y2="100" stroke="#1D3461" strokeWidth="0.8" />
    <line x1="36" y1="36" x2="164" y2="164" stroke="#1D3461" strokeWidth="0.5" />
    <line x1="164" y1="36" x2="36" y2="164" stroke="#1D3461" strokeWidth="0.5" />
    <polygon points="100,8 104,30 96,30" fill="#1D3461" />
    <polygon points="100,192 104,170 96,170" fill="#1D3461" />
    <polygon points="8,100 30,96 30,104" fill="#1D3461" />
    <polygon points="192,100 170,96 170,104" fill="#1D3461" />
    <text x="100" y="6" textAnchor="middle" fontSize="7" fill="#1D3461" fontFamily="Special Elite">N</text>
    <text x="100" y="199" textAnchor="middle" fontSize="7" fill="#1D3461" fontFamily="Special Elite">S</text>
    <text x="3" y="103" textAnchor="middle" fontSize="7" fill="#1D3461" fontFamily="Special Elite">W</text>
    <text x="197" y="103" textAnchor="middle" fontSize="7" fill="#1D3461" fontFamily="Special Elite">E</text>
  </svg>
)

/* Dotted leader between text and page number */
const DottedLeader = () => (
  <span style={{
    flex: 1, borderBottom: '1px dotted rgba(74,53,32,0.3)',
    margin: '0 8px', minWidth: 20, alignSelf: 'flex-end',
    marginBottom: 3,
  }} />
)

/* Architecture Diagram SVG */
const ArchDiagram = ({ diagram }) => (
  <div style={{
    background: 'linear-gradient(135deg, #0a192f 0%, #0d2137 50%, #0a192f 100%)',
    borderRadius: 4, padding: '20px 16px', margin: '14px 0',
    position: 'relative', overflow: 'hidden',
  }}>
    {/* Blueprint grid */}
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}>
      <defs>
        <pattern id="bpGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#4A9FD9" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bpGrid)" />
    </svg>
    {/* Corner dots */}
    {[[8,8],[8,'calc(100% - 8px)'],['calc(100% - 8px)',8],['calc(100% - 8px)','calc(100% - 8px)']].map(([l,t], i) => (
      <div key={i} style={{
        position: 'absolute', left: l, top: t,
        width: 4, height: 4, borderRadius: '50%',
        background: '#4A9FD9', opacity: 0.5,
      }} />
    ))}

    <svg viewBox="0 0 230 110" style={{ width: '100%', height: 90, position: 'relative', zIndex: 1 }}>
      {diagram.edges.map((e, i) => {
        const from = diagram.nodes[e.from]
        const to = diagram.nodes[e.to]
        return (
          <line key={i}
            x1={from.x + from.w/2} y1={from.y + from.h}
            x2={to.x + to.w/2} y2={to.y}
            stroke="#4A9FD9" strokeWidth="1.5" strokeDasharray="4,3"
          />
        )
      })}
      {diagram.nodes.map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h}
            rx="3" fill="none" stroke="#4A9FD9" strokeWidth="1.5"
            style={{ filter: 'drop-shadow(0 0 4px rgba(74,159,217,0.3))' }}
          />
          <text x={n.x + n.w/2} y={n.y + n.h/2 + 4}
            textAnchor="middle" fill="#c8ddf0"
            fontSize="10" fontFamily="Special Elite, monospace"
          >{n.label}</text>
        </g>
      ))}
    </svg>
    <p style={{
      textAlign: 'right', fontFamily: 'Special Elite, monospace',
      fontSize: 8, color: 'rgba(74,159,217,0.5)', letterSpacing: '0.15em',
      marginTop: 6, position: 'relative', zIndex: 1,
    }}>{diagram.caption}</p>
  </div>
)

/* CX-Twin chart SVG */
const AccuracyChart = () => (
  <div style={{
    background: 'linear-gradient(135deg, #0a192f 0%, #0d2137 50%, #0a192f 100%)',
    borderRadius: 4, padding: '18px 20px', margin: '14px 0',
    position: 'relative', overflow: 'hidden',
  }}>
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }}>
      <defs>
        <pattern id="bpGrid2" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#4A9FD9" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bpGrid2)" />
    </svg>
    <svg viewBox="0 0 320 120" style={{ width: '100%', height: 100, position: 'relative', zIndex: 1 }}>
      {/* Axes */}
      <line x1="40" y1="10" x2="40" y2="100" stroke="#4A9FD9" strokeWidth="0.8" opacity="0.6" />
      <line x1="40" y1="100" x2="300" y2="100" stroke="#4A9FD9" strokeWidth="0.8" opacity="0.6" />
      {/* Y-axis label */}
      <text x="10" y="60" fill="#4A9FD9" fontSize="7" fontFamily="Special Elite" transform="rotate(-90,10,60)" textAnchor="middle" opacity="0.7">Accuracy %</text>
      {/* X-axis label */}
      <text x="170" y="116" fill="#4A9FD9" fontSize="7" fontFamily="Special Elite" textAnchor="middle" opacity="0.7">Epoch / Interaction Depth</text>
      {/* Static ML baseline */}
      <line x1="40" y1="75" x2="280" y2="72" stroke="#4A9FD9" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
      <text x="284" y="75" fill="#4A9FD9" fontSize="7" fontFamily="Special Elite" opacity="0.6">Static ML</text>
      {/* DQN curve */}
      <path d="M 40,88 C 80,85 120,70 160,45 C 200,28 240,22 280,20"
        fill="none" stroke="#B22222" strokeWidth="2" strokeLinecap="round" />
      {/* Data points */}
      <circle cx="160" cy="45" r="3" fill="#B22222" opacity="0.7" />
      <circle cx="280" cy="20" r="4" fill="#B22222" />
      <text x="266" y="15" fill="#B22222" fontSize="8" fontFamily="Special Elite" fontWeight="bold">DQN (CX-Twin)</text>
    </svg>
  </div>
)

/* Highlighted callout block */
const HighlightBlock = ({ text, stat }) => (
  <div style={{
    background: 'rgba(139,32,32,0.06)',
    borderLeft: '3px solid #8B2020',
    padding: '10px 14px',
    marginTop: 12,
    borderRadius: '0 3px 3px 0',
  }}>
    <p style={{
      fontFamily: 'Special Elite, monospace',
      fontSize: 12.5, lineHeight: 1.6,
      color: '#3a2010',
    }}>
      {stat ? (
        <>
          {text.split(stat)[0]}
          <span style={{ color: '#8B2020', fontWeight: 700 }}>{stat}</span>
          {text.split(stat)[1]}
        </>
      ) : text}
    </p>
  </div>
)

/* ═══════════════════════════════════════════════════════
   PAGE VIEWS
   ═══════════════════════════════════════════════════════ */

/* INDEX PAGE */
const IndexPage = ({ onNavigate }) => (
  <div style={{ position: 'relative', height: '100%' }}>
    <CompassWatermark />

    {/* Title */}
    <h2 style={{
      fontFamily: 'Playfair Display, Georgia, serif',
      fontSize: 28, fontWeight: 800,
      color: '#1c0f04', textAlign: 'center',
      marginBottom: 2, letterSpacing: '0.02em',
    }}>Logbook Index</h2>
    <p style={{
      fontFamily: 'Special Elite, monospace',
      fontSize: 8.5, letterSpacing: '0.25em',
      color: '#8B2020', textAlign: 'center',
      marginBottom: 16, textTransform: 'uppercase',
      textDecoration: 'line-through',
      textDecorationColor: 'rgba(212,175,55,0.4)',
    }}>DETAILED SYSTEM ARCHITECTURES & LITERATURE</p>

    {/* Two-column sections */}
    <div style={{ display: 'flex', gap: 32 }}>
      {/* Systems column */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 16, fontWeight: 700, color: '#1D3461',
          }}>Systems</h3>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 14, fontStyle: 'italic', color: '#8B2020',
            opacity: 0.7,
          }}>I.</span>
        </div>
        {SYSTEMS.map((s) => (
          <div key={s.id}
            onClick={() => onNavigate('system-detail', s.id)}
            style={{
              display: 'flex', alignItems: 'baseline',
              marginBottom: 6, cursor: 'pointer',
              padding: '2px 0',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.paddingLeft = '4px'}
            onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
          >
            <span style={{
              fontFamily: 'Special Elite, monospace',
              fontSize: 12, color: '#1c0f04',
            }}>{s.title}</span>
            <DottedLeader />
            <span style={{
              fontFamily: 'Special Elite, monospace',
              fontSize: 10, color: 'rgba(74,53,32,0.5)',
              whiteSpace: 'nowrap',
            }}>pg. {s.page}</span>
          </div>
        ))}
      </div>

      {/* Research column */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 16, fontWeight: 700, color: '#1D3461',
          }}>Research</h3>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 14, fontStyle: 'italic', color: '#8B2020',
            opacity: 0.7,
          }}>II.</span>
        </div>
        {RESEARCH.map((r) => (
          <div key={r.id}
            onClick={() => onNavigate('research-detail', r.id)}
            style={{
              display: 'flex', alignItems: 'baseline',
              marginBottom: 6, cursor: 'pointer',
              padding: '2px 0',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.paddingLeft = '4px'}
            onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
          >
            <span style={{
              fontFamily: 'Special Elite, monospace',
              fontSize: 12, color: '#1c0f04',
            }}>{r.title}</span>
            <DottedLeader />
            <span style={{
              fontFamily: 'Special Elite, monospace',
              fontSize: 10, color: 'rgba(74,53,32,0.5)',
              whiteSpace: 'nowrap',
            }}>pg. {r.page}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Observations section */}
    <div style={{ marginTop: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 16, fontWeight: 700, color: '#1D3461',
        }}>Observations / Field Logs</h3>
        <span style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 14, fontStyle: 'italic', color: '#8B2020',
          opacity: 0.7,
        }}>III.</span>
      </div>
      <div
        onClick={() => onNavigate('logs')}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          cursor: 'pointer', padding: '4px 0',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.paddingLeft = '4px'}
        onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}
      >
        <span style={{ fontSize: 16, opacity: 0.5 }}>📒</span>
        <span style={{
          fontFamily: 'Special Elite, monospace',
          fontSize: 12, color: '#1c0f04',
        }}>View Chronological Daily Logs (Mar 2026 - Present)</span>
      </div>
    </div>
  </div>
)

/* SYSTEMS OVERVIEW PAGE */
const SystemsOverview = ({ onNavigate }) => (
  <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
    <h2 style={{
      fontFamily: 'Playfair Display, Georgia, serif',
      fontSize: 24, fontWeight: 800, color: '#1c0f04',
      marginBottom: 16,
      borderBottom: '2px solid rgba(212,175,55,0.3)',
      paddingBottom: 8,
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      Systems Overview
      <span style={{
        width: 200, height: 2,
        background: 'linear-gradient(90deg, rgba(212,175,55,0.4), transparent)',
        display: 'inline-block',
      }} />
    </h2>

    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      gap: 16, flex: 1,
    }}>
      {SYSTEMS.map(s => (
        <div key={s.id} style={{
          background: 'rgba(255,255,255,0.6)',
          border: '1px solid rgba(212,175,55,0.15)',
          borderRadius: 3, padding: '16px 18px',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
          onClick={() => onNavigate('system-detail', s.id)}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          {/* Subtle top accent line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${s.categoryColor}33, transparent)`,
          }} />
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 15, fontWeight: 700, color: '#1c0f04',
            marginBottom: 4,
          }}>{s.title}</h3>
          <p style={{
            fontFamily: 'Special Elite, monospace',
            fontSize: 8, letterSpacing: '0.2em',
            color: s.categoryColor, textTransform: 'uppercase',
            marginBottom: 8, fontWeight: 600,
          }}>{s.category}</p>
          <span style={{
            fontFamily: 'Special Elite, monospace',
            fontSize: 9, letterSpacing: '0.15em',
            color: '#8B2020', textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>VIEW ARCHITECTURE <span style={{ fontSize: 12 }}>→</span></span>
        </div>
      ))}
    </div>

    {/* Gold bottom bar */}
    <div style={{
      height: 4, borderRadius: 2, marginTop: 16,
      background: 'linear-gradient(90deg, #d4af37, #8B6914, #d4af37)',
      opacity: 0.5,
    }} />
  </div>
)

/* SYSTEM DETAIL PAGE */
const SystemDetail = ({ systemId, onBack }) => {
  const system = SYSTEMS.find(s => s.id === systemId)
  if (!system) return null

  return (
    <div style={{ position: 'relative', height: '100%', overflowY: 'auto' }}>
      {/* Back button */}
      <div
        onClick={onBack}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          cursor: 'pointer', marginBottom: 10,
          fontFamily: 'Special Elite, monospace',
          fontSize: 13, color: '#1c0f04',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#8B2020'}
        onMouseLeave={e => e.currentTarget.style.color = '#1c0f04'}
      >
        <span style={{ fontSize: 18, lineHeight: 1 }}>‹</span>
        <span style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>{system.title}</span>
      </div>

      {/* Badge */}
      <div style={{
        fontFamily: 'Special Elite, monospace',
        fontSize: 8, letterSpacing: '0.2em',
        color: '#8B2020', textTransform: 'uppercase',
        marginBottom: 8, fontWeight: 600,
      }}>{system.badge}</div>

      {/* Intro paragraph */}
      <p style={{
        fontFamily: 'Georgia, serif',
        fontSize: 13, lineHeight: 1.7, color: '#2d1a08',
        marginBottom: 0,
      }}>
        {system.intro}
        {system.boldTerm && (
          <> <span style={{ fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 2 }}>{system.boldTerm}</span>.</>
        )}
      </p>

      {/* Architecture diagram or chart */}
      {system.diagram && system.diagram.type === 'architecture' && (
        <ArchDiagram diagram={system.diagram} />
      )}
      {system.diagram && system.diagram.type === 'chart' && (
        <AccuracyChart />
      )}

      {/* Body text */}
      <p style={{
        fontFamily: 'Georgia, serif',
        fontSize: 12.5, lineHeight: 1.7, color: '#2d1a08',
        marginTop: system.diagram ? 0 : 14,
      }}>
        {system.body}
      </p>

      {/* Highlighted callout */}
      {system.highlight && (
        <HighlightBlock text={system.highlight} stat={system.highlightStat} />
      )}
    </div>
  )
}

/* RESEARCH OVERVIEW PAGE */
const ResearchOverview = ({ onNavigate }) => (
  <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
    <h2 style={{
      fontFamily: 'Playfair Display, Georgia, serif',
      fontSize: 24, fontWeight: 800, color: '#1c0f04',
      marginBottom: 16,
      borderBottom: '2px solid rgba(212,175,55,0.3)',
      paddingBottom: 8,
    }}>Research & Literature</h2>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
      {RESEARCH.map(r => (
        <div key={r.id} style={{
          background: 'rgba(255,255,255,0.55)',
          border: '1px solid rgba(212,175,55,0.15)',
          borderRadius: 3, padding: '14px 18px',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          position: 'relative',
        }}
          onClick={() => onNavigate('research-detail', r.id)}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'
            e.currentTarget.style.boxShadow = '0 3px 12px rgba(0,0,0,0.06)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 14, fontWeight: 700, color: '#1c0f04',
                marginBottom: 3,
              }}>{r.title}</h3>
              <p style={{
                fontFamily: 'Special Elite, monospace',
                fontSize: 8, letterSpacing: '0.2em',
                color: r.categoryColor, textTransform: 'uppercase',
                fontWeight: 600,
              }}>{r.category}</p>
            </div>
            <span style={{
              fontFamily: 'Special Elite, monospace',
              fontSize: 10, color: 'rgba(74,53,32,0.4)',
            }}>pg. {r.page}</span>
          </div>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: 11, lineHeight: 1.5, color: '#4a3520',
            marginTop: 8,
          }}>{r.intro}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
            <span style={{
              fontFamily: 'Special Elite, monospace',
              fontSize: 9, letterSpacing: '0.15em',
              color: '#8B2020', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>READ MORE <span style={{ fontSize: 12 }}>→</span></span>

            {r.paper && (
              <a
                href={r.paper}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  fontFamily: 'Special Elite, monospace',
                  fontSize: 8.5, letterSpacing: '0.12em',
                  color: '#1D3461', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: 4,
                  padding: '3px 8px',
                  border: '1px solid rgba(29,52,97,0.3)',
                  borderRadius: 3,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  background: 'rgba(29,52,97,0.05)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(29,52,97,0.12)'
                  e.currentTarget.style.borderColor = 'rgba(29,52,97,0.5)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(29,52,97,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(29,52,97,0.3)'
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                VIEW PAPER
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)

/* RESEARCH DETAIL PAGE */
const ResearchDetail = ({ researchId, onBack }) => {
  const research = RESEARCH.find(r => r.id === researchId)
  if (!research) return null

  return (
    <div style={{ position: 'relative', height: '100%', overflowY: 'auto' }}>
      <div
        onClick={onBack}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          cursor: 'pointer', marginBottom: 10,
          fontFamily: 'Special Elite, monospace',
          fontSize: 13, color: '#1c0f04',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#8B2020'}
        onMouseLeave={e => e.currentTarget.style.color = '#1c0f04'}
      >
        <span style={{ fontSize: 18, lineHeight: 1 }}>‹</span>
        <span style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>{research.title}</span>
      </div>

      <div style={{
        fontFamily: 'Special Elite, monospace',
        fontSize: 8, letterSpacing: '0.2em',
        color: research.categoryColor, textTransform: 'uppercase',
        marginBottom: 12, fontWeight: 600,
      }}>{research.category}</div>

      <p style={{
        fontFamily: 'Georgia, serif',
        fontSize: 13, lineHeight: 1.7, color: '#2d1a08',
        marginBottom: 14,
      }}>{research.intro}</p>

      <p style={{
        fontFamily: 'Georgia, serif',
        fontSize: 12.5, lineHeight: 1.7, color: '#2d1a08',
      }}>{research.body}</p>

      {research.highlight && (
        <HighlightBlock text={research.highlight} />
      )}

      {/* PDF Paper Section */}
      {research.paper && (
        <div style={{ marginTop: 20 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B2020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span style={{
                fontFamily: 'Special Elite, monospace',
                fontSize: 10, letterSpacing: '0.15em',
                color: '#1c0f04', textTransform: 'uppercase',
                fontWeight: 600,
              }}>Filed Paper</span>
            </div>
            <span style={{
              fontFamily: 'Special Elite, monospace',
              fontSize: 8, color: 'rgba(74,53,32,0.5)',
              letterSpacing: '0.1em',
            }}>{research.paperLabel}</span>
          </div>

          {/* Embedded PDF viewer */}
          <div style={{
            background: '#1a1a2e',
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid rgba(212,175,55,0.2)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          }}>
            <iframe
              src={research.paper}
              style={{
                width: '100%',
                height: 220,
                border: 'none',
                display: 'block',
              }}
              title={research.paperLabel}
            />
          </div>

          {/* Action buttons */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            marginTop: 10,
          }}>
            <a
              href={research.paper}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'Special Elite, monospace',
                fontSize: 9, letterSpacing: '0.12em',
                color: '#fff', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '6px 14px',
                border: 'none',
                borderRadius: 3,
                textDecoration: 'none',
                background: '#1D3461',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#2a4a7a'}
              onMouseLeave={e => e.currentTarget.style.background = '#1D3461'}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Open Full Paper
            </a>
            <a
              href={research.paper}
              download
              style={{
                fontFamily: 'Special Elite, monospace',
                fontSize: 9, letterSpacing: '0.12em',
                color: '#1D3461', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 14px',
                border: '1px solid rgba(29,52,97,0.35)',
                borderRadius: 3,
                textDecoration: 'none',
                background: 'rgba(29,52,97,0.06)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(29,52,97,0.14)'
                e.currentTarget.style.borderColor = 'rgba(29,52,97,0.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(29,52,97,0.06)'
                e.currentTarget.style.borderColor = 'rgba(29,52,97,0.35)'
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

/* FIELD LOGS PAGE */
const FieldLogsPage = () => (
  <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
    <h2 style={{
      fontFamily: 'Playfair Display, Georgia, serif',
      fontSize: 22, fontWeight: 800, color: '#1c0f04',
      marginBottom: 4,
    }}>Daily Field Logs</h2>
    <p style={{
      fontFamily: 'Special Elite, monospace',
      fontSize: 8.5, letterSpacing: '0.2em',
      color: '#8B2020', textTransform: 'uppercase',
      marginBottom: 16,
    }}>CHRONOLOGICAL OBSERVATIONS • MAR 2026</p>

    <div style={{
      flex: 1, overflowY: 'auto',
      display: 'flex', flexDirection: 'column', gap: 2,
    }}>
      {FIELD_LOGS.map((log, i) => (
        <div key={i} style={{
          display: 'flex', gap: 14,
          padding: '10px 0',
          borderBottom: '1px solid rgba(212,175,55,0.12)',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.04)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{
            fontFamily: "'B612 Mono', monospace",
            fontSize: 9, color: 'rgba(74,53,32,0.5)',
            whiteSpace: 'nowrap', paddingTop: 2,
            letterSpacing: '0.05em',
          }}>{log.date}</div>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: 12, lineHeight: 1.6, color: '#2d1a08',
            flex: 1,
          }}>{log.entry}</p>
        </div>
      ))}
    </div>

    {/* Decorative bottom */}
    <div style={{
      marginTop: 'auto', paddingTop: 12,
      display: 'flex', alignItems: 'center', gap: 8,
      opacity: 0.4,
    }}>
      <div style={{ flex: 1, height: 1, background: 'rgba(212,175,55,0.3)' }} />
      <span style={{
        fontFamily: 'Special Elite, monospace',
        fontSize: 8, color: '#8B6914', letterSpacing: '0.2em',
      }}>END OF CURRENT ENTRIES</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(212,175,55,0.3)' }} />
    </div>
  </div>
)


/* ═══════════════════════════════════════════════════════
   MAIN DIARY MODAL COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function DiaryModal({ onClose }) {
  const [latchOpen, setLatchOpen] = useState(false)
  const [bookOpen, setBookOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('index')
  const [view, setView] = useState({ page: 'index', id: null })
  const [pageKey, setPageKey] = useState(0)

  const overlayRef = useRef(null)
  const bookRef = useRef(null)
  const pageRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo(
      bookRef.current,
      { scale: 0.82, y: 50, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.55, ease: 'back.out(1.5)' }
    )
  }, [])

  /* Animate in new page after view/key changes */
  useEffect(() => {
    if (pageRef.current && bookOpen) {
      gsap.fromTo(pageRef.current,
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.22, ease: 'power2.out' }
      )
    }
  }, [pageKey, bookOpen])

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, onComplete: onClose })
  }

  const handleLatch = () => {
    if (bookOpen) return
    setLatchOpen(true)
    setTimeout(() => setBookOpen(true), 350)
  }

  /* Navigation between pages */
  const navigateTo = (page, id = null) => {
    setView({ page, id })
    setPageKey(k => k + 1)
    // Map pages to tabs
    if (page === 'index') setActiveTab('index')
    else if (page === 'systems' || page === 'system-detail') setActiveTab('systems')
    else if (page === 'research' || page === 'research-detail') setActiveTab('research')
    else if (page === 'logs') setActiveTab('logs')
  }

  const handleTabClick = (tabId) => {
    if (!bookOpen) return
    navigateTo(tabId)
  }

  /* Render current page content */
  const renderPage = () => {
    switch (view.page) {
      case 'index':
        return <IndexPage onNavigate={navigateTo} />
      case 'systems':
        return <SystemsOverview onNavigate={navigateTo} />
      case 'system-detail':
        return <SystemDetail systemId={view.id} onBack={() => navigateTo('systems')} />
      case 'research':
        return <ResearchOverview onNavigate={navigateTo} />
      case 'research-detail':
        return <ResearchDetail researchId={view.id} onBack={() => navigateTo('research')} />
      case 'logs':
        return <FieldLogsPage />
      default:
        return <IndexPage onNavigate={navigateTo} />
    }
  }

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={e => e.target === overlayRef.current && handleClose()}
    >
      <div ref={bookRef} style={{ position: 'relative', display: 'inline-block' }}>
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute', top: -16, right: -16, zIndex: 50,
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(30,30,30,0.9)',
            border: '1.5px solid rgba(255,255,255,0.25)',
            color: 'rgba(255,255,255,0.8)', fontSize: 18,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 300, lineHeight: 1,
          }}
        >×</button>

        {/* Book wrapper */}
        <div style={{
          display: 'flex',
          width: bookOpen ? 900 : 740,
          height: 520,
          transition: 'width 0.45s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
        }}>
          {/* ── Left spine panel ── */}
          <div style={{
            width: 72, flexShrink: 0,
            background: 'linear-gradient(180deg, #2a1a0a 0%, #1e1006 50%, #2a1a0a 100%)',
            borderRadius: '6px 0 0 6px',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', paddingTop: 16, paddingBottom: 16,
            boxShadow: 'inset -6px 0 12px rgba(0,0,0,0.5)',
            position: 'relative',
          }}>
            {[0,1,2,3,4,5,6].map(i => (
              <div key={i} style={{
                width: 12, height: 12, borderRadius: '50%',
                marginTop: i === 0 ? 0 : 'auto',
                flex: i === 0 || i === 6 ? '0 0 auto' : '1 0 auto',
                maxHeight: 12,
                background: 'radial-gradient(circle at 35% 35%, #d4af37 0%, #8B6914 60%, #5a4010 100%)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.2)',
              }} />
            ))}
          </div>

          {/* ── Main book body ── */}
          <div style={{
            flex: 1,
            background: 'linear-gradient(160deg, #2d1a08 0%, #1c0f04 55%, #281508 100%)',
            borderRadius: '0 6px 6px 0',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Gold corner plates */}
            <div style={{
              position: 'absolute', top: 0, right: 0, width: 44, height: 44,
              background: 'linear-gradient(135deg, #d4af37 0%, #8B6914 60%, #5a4010 100%)',
              zIndex: 10, borderRadius: '0 6px 0 0',
            }}>
              <div style={{ position: 'absolute', inset: 5, background: 'linear-gradient(160deg, #2d1a08, #1c0f04)' }} />
            </div>
            <div style={{
              position: 'absolute', bottom: 0, right: 0, width: 44, height: 44,
              background: 'linear-gradient(225deg, #d4af37 0%, #8B6914 60%, #5a4010 100%)',
              zIndex: 10, borderRadius: '0 0 6px 0',
            }}>
              <div style={{ position: 'absolute', inset: 5, background: 'linear-gradient(200deg, #2d1a08, #1c0f04)' }} />
            </div>

            {/* Embossed frames */}
            <div style={{
              position: 'absolute', inset: 22,
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: 3, pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', inset: 30,
              border: '0.5px solid rgba(212,175,55,0.1)',
              borderRadius: 2, pointerEvents: 'none',
            }} />

            {/* Ambient stars */}
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: Math.random() * 2 + 1, height: Math.random() * 2 + 1,
                borderRadius: '50%',
                background: 'rgba(212,175,55,0.55)',
                top: `${5 + Math.random() * 90}%`,
                left: `${5 + Math.random() * 90}%`,
                animation: `diaryTwinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                pointerEvents: 'none',
              }} />
            ))}

            {/* ── COVER STATE ── */}
            {!bookOpen && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
                onClick={handleLatch}
              >
                <div style={{
                  width: 72, height: 72,
                  border: '1.5px solid rgba(212,175,55,0.45)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 22,
                }}>
                  <span style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontSize: 30, color: '#d4af37',
                    textShadow: '0 0 20px rgba(212,175,55,0.5)',
                  }}>H</span>
                </div>

                <h1 style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: 42, fontWeight: 700,
                  letterSpacing: '0.22em', color: '#d4af37',
                  textShadow: '0 2px 20px rgba(212,175,55,0.35)',
                  margin: 0, lineHeight: 1.1, textAlign: 'center',
                }}>RESEARCH</h1>
                <h1 style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: 42, fontWeight: 700,
                  letterSpacing: '0.22em', color: '#d4af37',
                  textShadow: '0 2px 20px rgba(212,175,55,0.35)',
                  margin: '4px 0 0', lineHeight: 1.1, textAlign: 'center',
                }}>LOGS</h1>
                <p style={{
                  fontFamily: 'Special Elite, monospace',
                  fontSize: 10, letterSpacing: '0.35em',
                  color: 'rgba(212,175,55,0.45)', marginTop: 14,
                }}>VOL I • ARCHITECTURE</p>
              </div>
            )}

            {/* ── OPEN STATE ── */}
            {bookOpen && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'stretch',
              }}>
                <div style={{
                  flex: 1,
                  background: '#f5f0e8',
                  margin: 14,
                  borderRadius: 3,
                  padding: '24px 30px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.04)',
                }}>
                  {/* Paper texture */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `
                      radial-gradient(ellipse at 20% 30%, rgba(219,207,181,0.15) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 70%, rgba(219,207,181,0.1) 0%, transparent 60%)
                    `,
                    pointerEvents: 'none',
                  }} />

                  {/* Faint ruled lines */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} style={{
                      position: 'absolute', left: 0, right: 0,
                      top: 24 + i * 24, height: 1,
                      background: 'rgba(30,58,138,0.06)',
                      pointerEvents: 'none',
                    }} />
                  ))}

                  {/* Red margin line */}
                  <div style={{
                    position: 'absolute', left: 44, top: 0, bottom: 0, width: 1,
                    background: 'rgba(178,34,34,0.18)',
                    pointerEvents: 'none',
                  }} />

                  {/* Page content */}
                  <div ref={pageRef} style={{ position: 'relative', zIndex: 2, height: '100%' }}>
                    {renderPage()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right-edge Tabs ── */}
        <div style={{
          position: 'absolute',
          right: -42,
          top: 40,
          display: 'flex', flexDirection: 'column',
          gap: 4,
        }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              style={{
                width: 36,
                padding: '14px 6px',
                background: activeTab === tab.id ? tab.color : `${tab.color}99`,
                border: 'none',
                cursor: bookOpen ? 'pointer' : 'default',
                writingMode: 'vertical-lr',
                fontFamily: 'Special Elite, monospace',
                fontSize: 8.5,
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.88)',
                borderRadius: '0 4px 4px 0',
                boxShadow: activeTab === tab.id
                  ? '2px 2px 8px rgba(0,0,0,0.6)'
                  : '1px 1px 4px rgba(0,0,0,0.4)',
                transition: 'all 0.25s ease',
                transform: activeTab === tab.id ? 'translateX(2px)' : 'translateX(0)',
                opacity: bookOpen ? 1 : 0.7,
              }}
            >{tab.label}</button>
          ))}

          {/* Latch */}
          {!bookOpen && (
            <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                onClick={handleLatch}
                style={{
                  width: 36, height: 60,
                  background: 'linear-gradient(180deg, #d4af37 0%, #8B6914 50%, #c8a030 100%)',
                  border: 'none', cursor: 'pointer',
                  borderRadius: '0 4px 4px 0',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 4,
                  boxShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scaleX(1.08)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scaleX(1)'}
              >
                <div style={{
                  width: 16, height: 6, borderRadius: '3px 3px 0 0',
                  background: latchOpen ? 'transparent' : '#5a3a10',
                  border: '1.5px solid #5a3a10',
                  transition: 'all 0.3s',
                }} />
                <div style={{ width: 8, height: 12, background: '#5a3a10', borderRadius: 1 }} />
                <div style={{ width: 16, height: 4, background: '#5a3a10', borderRadius: 1 }} />
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes diaryTwinkle {
          0%,100%{opacity:0.25;transform:scale(1)}
          50%{opacity:0.9;transform:scale(1.6)}
        }
      `}</style>
    </div>
  )
}
