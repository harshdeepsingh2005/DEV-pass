import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Tab definitions exactly matching the Vercel version
const TABS = [
  { id: 'index',    label: 'INDEX',    color: '#1D3461' },
  { id: 'systems',  label: 'SYSTEMS',  color: '#8B2020' },
  { id: 'research', label: 'RESEARCH', color: '#1D3461' },
]

const INDEX_CONTENT = {
  left: [
    { section: 'Systems I', items: ['AutoPilot-for-Anything', 'CX-Twin AI', 'HealthSphere AI'] },
  ],
  right: [
    { section: 'Research II', items: ['Reinforcement Learning Env', 'Geospatial Prediction', 'LLM Architecture Study'] },
  ],
  fieldLogs: ['Deployment patterns observed in CX-Twin', 'RL reward shaping experiments', 'Geospatial feature pipeline notes'],
}

export default function DiaryModal({ onClose }) {
  const [latchOpen, setLatchOpen] = useState(false)
  const [bookOpen, setBookOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('index')
  const overlayRef = useRef(null)
  const bookRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo(
      bookRef.current,
      { scale: 0.82, y: 50, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.55, ease: 'back.out(1.5)' }
    )
  }, [])

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, onComplete: onClose })
  }

  const handleLatch = () => {
    if (bookOpen) return
    setLatchOpen(true)
    setTimeout(() => setBookOpen(true), 350)
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
      {/* Close button — circle X, outside book, top-right */}
      <div ref={bookRef} style={{ position: 'relative', display: 'inline-block' }}>
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

        {/* Book wrapper — landscape orientation */}
        <div
          style={{
            display: 'flex',
            width: bookOpen ? 900 : 740,
            height: 480,
            transition: 'width 0.45s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
          }}
        >
          {/* ── Left spine panel ── */}
          <div
            style={{
              width: 72,
              flexShrink: 0,
              background: 'linear-gradient(180deg, #2a1a0a 0%, #1e1006 50%, #2a1a0a 100%)',
              borderRadius: '6px 0 0 6px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: 16,
              paddingBottom: 16,
              gap: 0,
              boxShadow: 'inset -6px 0 12px rgba(0,0,0,0.5)',
              position: 'relative',
            }}
          >
            {/* Rivets evenly spaced */}
            {[0,1,2,3,4,5,6].map(i => (
              <div
                key={i}
                style={{
                  width: 12, height: 12, borderRadius: '50%',
                  marginTop: i === 0 ? 0 : 'auto',
                  marginBottom: i === 6 ? 0 : undefined,
                  flex: i === 0 || i === 6 ? '0 0 auto' : '1 0 auto',
                  maxHeight: 12,
                  background: 'radial-gradient(circle at 35% 35%, #d4af37 0%, #8B6914 60%, #5a4010 100%)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>

          {/* ── Main book cover/body ── */}
          <div
            style={{
              flex: 1,
              background: 'linear-gradient(160deg, #2d1a08 0%, #1c0f04 55%, #281508 100%)',
              borderRadius: '0 6px 6px 0',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Gold corner plates — top-right */}
            <div style={{
              position: 'absolute', top: 0, right: 0, width: 44, height: 44,
              background: 'linear-gradient(135deg, #d4af37 0%, #8B6914 60%, #5a4010 100%)',
              zIndex: 10, borderRadius: '0 6px 0 0',
            }}>
              <div style={{ position: 'absolute', inset: 5, background: 'linear-gradient(160deg, #2d1a08, #1c0f04)' }} />
            </div>

            {/* Gold corner plates — bottom-right */}
            <div style={{
              position: 'absolute', bottom: 0, right: 0, width: 44, height: 44,
              background: 'linear-gradient(225deg, #d4af37 0%, #8B6914 60%, #5a4010 100%)',
              zIndex: 10, borderRadius: '0 0 6px 0',
            }}>
              <div style={{ position: 'absolute', inset: 5, background: 'linear-gradient(200deg, #2d1a08, #1c0f04)' }} />
            </div>

            {/* Embossed inner frame */}
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
              }}>
                {/* Monogram circle */}
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
                  letterSpacing: '0.22em',
                  color: '#d4af37',
                  textShadow: '0 2px 20px rgba(212,175,55,0.35)',
                  margin: 0, lineHeight: 1.1,
                  textAlign: 'center',
                }}>
                  RESEARCH
                </h1>
                <h1 style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: 42, fontWeight: 700,
                  letterSpacing: '0.22em',
                  color: '#d4af37',
                  textShadow: '0 2px 20px rgba(212,175,55,0.35)',
                  margin: '4px 0 0', lineHeight: 1.1,
                  textAlign: 'center',
                }}>
                  LOGS
                </h1>
                <p style={{
                  fontFamily: 'Special Elite, monospace',
                  fontSize: 10, letterSpacing: '0.35em',
                  color: 'rgba(212,175,55,0.45)',
                  marginTop: 14,
                }}>VOL I • ARCHITECTURE</p>
              </div>
            )}

            {/* ── OPEN STATE — Index page ── */}
            {bookOpen && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'stretch',
              }}>
                {/* Cream paper page */}
                <div style={{
                  flex: 1,
                  background: '#f5f0e8',
                  margin: 16,
                  borderRadius: 2,
                  padding: '24px 28px',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Red ruled lines */}
                  <div style={{
                    position: 'absolute', left: 44, top: 0, bottom: 0, width: 1,
                    background: 'rgba(178,34,34,0.3)',
                  }} />
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div key={i} style={{
                      position: 'absolute', left: 0, right: 0,
                      top: 24 + i * 26, height: 1,
                      background: 'rgba(30,58,138,0.12)',
                    }} />
                  ))}

                  {/* Header */}
                  <h2 style={{
                    fontFamily: 'Special Elite, monospace',
                    fontSize: 13, letterSpacing: '0.2em',
                    color: '#1c0f04', textAlign: 'center',
                    marginBottom: 12, position: 'relative', zIndex: 1,
                  }}>Logbook Index</h2>
                  <div style={{ height: 1, background: 'rgba(178,34,34,0.5)', marginBottom: 16, position: 'relative', zIndex: 1 }} />

                  {/* Two-column index */}
                  <div style={{ display: 'flex', gap: 24, position: 'relative', zIndex: 1 }}>
                    <div style={{ flex: 1 }}>
                      {INDEX_CONTENT.left.map(sec => (
                        <div key={sec.section} style={{ marginBottom: 16 }}>
                          <p style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: 13, fontWeight: 700, color: '#1c0f04',
                            marginBottom: 6,
                          }}>{sec.section}</p>
                          {sec.items.map((item, i) => (
                            <div key={i} style={{
                              display: 'flex', justifyContent: 'space-between',
                              fontFamily: 'Special Elite, monospace',
                              fontSize: 10, color: '#4a3520',
                              marginBottom: 4, paddingLeft: 8,
                            }}>
                              <span style={{ fontStyle: 'italic' }}>{item}</span>
                              <span style={{ color: 'rgba(74,53,32,0.5)' }}>pg. {i + 2}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div style={{ flex: 1 }}>
                      {INDEX_CONTENT.right.map(sec => (
                        <div key={sec.section} style={{ marginBottom: 16 }}>
                          <p style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: 13, fontWeight: 700, color: '#1c0f04',
                            marginBottom: 6,
                          }}>{sec.section}</p>
                          {sec.items.map((item, i) => (
                            <div key={i} style={{
                              display: 'flex', justifyContent: 'space-between',
                              fontFamily: 'Special Elite, monospace',
                              fontSize: 10, color: '#4a3520',
                              marginBottom: 4, paddingLeft: 8,
                            }}>
                              <span style={{ fontStyle: 'italic' }}>{item}</span>
                              <span style={{ color: 'rgba(74,53,32,0.5)' }}>pg. {i + 7}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ height: 1, background: 'rgba(178,34,34,0.3)', margin: '14px 0 10px', position: 'relative', zIndex: 1 }} />
                  <p style={{
                    fontFamily: 'Special Elite, monospace',
                    fontSize: 10, color: '#1c0f04', letterSpacing: '0.15em',
                    marginBottom: 8, position: 'relative', zIndex: 1,
                  }}>Observations / Field Logs</p>
                  {INDEX_CONTENT.fieldLogs.map((log, i) => (
                    <p key={i} style={{
                      fontFamily: 'Special Elite, monospace',
                      fontSize: 9, color: '#4a3520',
                      paddingLeft: 12, marginBottom: 4,
                      position: 'relative', zIndex: 1,
                    }}>• {log}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right-edge Tabs ── */}
        <div style={{
          position: 'absolute',
          right: bookOpen ? -42 : -42,
          top: 40,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => { if (bookOpen) setActiveTab(tab.id) }}
              style={{
                width: 36,
                padding: '14px 6px',
                background: activeTab === tab.id ? tab.color : `${tab.color}bb`,
                border: 'none',
                cursor: 'pointer',
                writingMode: 'vertical-lr',
                fontFamily: 'Special Elite, monospace',
                fontSize: 8.5,
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.88)',
                borderRadius: '0 4px 4px 0',
                boxShadow: activeTab === tab.id ? '2px 2px 8px rgba(0,0,0,0.6)' : '1px 1px 4px rgba(0,0,0,0.4)',
                transition: 'all 0.2s',
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
                {/* Latch body */}
                <div style={{
                  width: 16, height: 6, borderRadius: '3px 3px 0 0',
                  background: latchOpen ? 'transparent' : '#5a3a10',
                  border: '1.5px solid #5a3a10',
                  transition: 'all 0.3s',
                }} />
                <div style={{
                  width: 8, height: 12,
                  background: '#5a3a10', borderRadius: 1,
                }} />
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
