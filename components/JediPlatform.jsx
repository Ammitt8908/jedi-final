import React, { useState, useRef, useEffect } from 'react';
import { Play, Zap, Wand2, Upload, RotateCw, Settings, Menu, X, LogOut, Home, Sparkles, Video, BarChart3 } from 'lucide-react';

const JediPlatform = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPlan, setUserPlan] = useState('free-trial');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState('text-to-video');
  const [videoLength, setVideoLength] = useState('5');
  const [resolution, setResolution] = useState('1080p');
  const [prompt, setPrompt] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoHistory, setVideoHistory] = useState([]);
  const [trialVideosUsed, setTrialVideosUsed] = useState(0);
  const fileInputRef = useRef(null);

  const videoLimits = {
    'free-trial': 1,      // 1 video/month free (very limited)
    'pro': 30,            // $79/month - 30 videos = $2.63 per video
    'creator': 100,       // $179/month - 100 videos = $1.79 per video
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const handleGenerateVideo = () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    // Check if user exceeded their limit
    const limit = videoLimits[userPlan];
    if (trialVideosUsed >= limit) {
      alert(`You've reached your ${limit} videos/month limit. Upgrade your plan!`);
      return;
    }

    setIsGenerating(true);

    // Simulate video generation
    setTimeout(() => {
      const newVideo = {
        id: Date.now(),
        prompt,
        duration: `${videoLength}s`,
        resolution,
        thumbnail: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='112'%3E%3Crect fill='%23000' width='200' height='112'/%3E%3Ccircle cx='100' cy='56' r='20' fill='%23fff'/%3E%3Cpath d='M90 50l20 12-20 12z' fill='%23000'/%3E%3C/svg%3E`,
        timestamp: new Date().toLocaleString(),
        watermark: userPlan === 'free-trial',
      };

      setVideoHistory([newVideo, ...videoHistory]);
      setTrialVideosUsed(trialVideosUsed + 1);

      setIsGenerating(false);
      setPrompt('');
      alert('Video generated successfully!');
    }, 3000);
  };

  // Landing Page
  if (currentPage === 'landing' && !isLoggedIn) {
    return (
      <div style={{ background: 'var(--color-background-tertiary)', minHeight: '100vh' }}>
        <header style={{
          background: 'var(--color-background-primary)',
          borderBottom: '0.5px solid var(--color-border-tertiary)',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}>
          <div style={{ fontSize: '24px', fontWeight: '500', color: 'var(--color-text-primary)' }}>
            ⚡ Jedi
          </div>
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <button
              onClick={() => setCurrentPage('gallery')}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-secondary)',
                fontSize: '14px',
              }}
            >
              Samples
            </button>
            <button
              onClick={() => setCurrentPage('pricing')}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-secondary)',
                fontSize: '14px',
              }}
            >
              Pricing
            </button>
            <button
              onClick={() => setIsLoggedIn(true)}
              style={{
                background: 'var(--color-background-info)',
                color: 'var(--color-text-info)',
                border: 'none',
                padding: '0.5rem 1.5rem',
                borderRadius: 'var(--border-radius-md)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Get Started
            </button>
          </nav>
        </header>

        <section style={{
          padding: '4rem 1.5rem',
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '500',
            marginBottom: '1rem',
            color: 'var(--color-text-primary)',
            lineHeight: '1.2',
          }}>
            Create Cinema-Quality Videos with AI
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'var(--color-text-secondary)',
            marginBottom: '2rem',
            lineHeight: '1.6',
          }}>
            Generate stunning 4K videos affordably. Much better pricing than Sora, Seedance, and Veo.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem' }}>
            <button
              onClick={() => setIsLoggedIn(true)}
              style={{
                background: 'var(--color-background-info)',
                color: 'var(--color-text-info)',
                padding: '0.75rem 2rem',
                border: 'none',
                borderRadius: 'var(--border-radius-md)',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              Start Free (1 video)
            </button>
            <button
              onClick={() => setCurrentPage('gallery')}
              style={{
                background: 'transparent',
                color: 'var(--color-text-info)',
                padding: '0.75rem 2rem',
                border: '0.5px solid var(--color-border-secondary)',
                borderRadius: 'var(--border-radius-md)',
                fontSize: '15px',
                cursor: 'pointer',
              }}
            >
              Watch Samples
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
          }}>
            {[
              { icon: '🎬', title: 'Text-to-Video', desc: 'Turn prompts into 4K videos instantly' },
              { icon: '🖼️', title: 'Image-to-Video', desc: 'Animate photos with AI precision' },
              { icon: '🎵', title: 'AI Sound Design', desc: 'Professional audio generation included' },
              { icon: '⚡', title: '5-10s Generation', desc: '5s, 8s, 10s video lengths available' },
              { icon: '📺', title: 'All Resolutions', desc: '720p, 1080p, 4K & aspect ratios' },
              { icon: '✨', title: 'Pro Quality', desc: 'Cinematic, anime, realistic & more' },
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--color-background-primary)',
                  border: '0.5px solid var(--color-border-tertiary)',
                  borderRadius: 'var(--border-radius-lg)',
                  padding: '1.5rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '0.5rem' }}>{feature.icon}</div>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  color: 'var(--color-text-primary)',
                }}>{feature.title}</h3>
                <p style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{
          background: 'var(--color-background-primary)',
          padding: '3rem 1.5rem',
          marginTop: '4rem',
          borderTop: '0.5px solid var(--color-border-tertiary)',
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '500',
            textAlign: 'center',
            marginBottom: '3rem',
            color: 'var(--color-text-primary)',
          }}>Smart Pricing That Won't Break the Bank</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            {[
              {
                name: 'Free Trial',
                price: '$0',
                videos: '1 video/month',
                res: '720p only',
                watermark: 'Yes',
              },
              {
                name: 'Pro',
                price: '$79/mo',
                videos: '30 videos/month',
                res: 'All (4K)',
                watermark: 'No',
                highlight: true,
              },
              {
                name: 'Creator',
                price: '$179/mo',
                videos: '100 videos/month',
                res: 'All (4K)',
                watermark: 'No',
              },
            ].map((plan, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--color-background-secondary)',
                  border: plan.highlight ? '2px solid var(--color-border-info)' : '0.5px solid var(--color-border-tertiary)',
                  borderRadius: 'var(--border-radius-lg)',
                  padding: '2rem',
                }}
              >
                {plan.highlight && (
                  <div style={{
                    background: 'var(--color-background-info)',
                    color: 'var(--color-text-info)',
                    fontSize: '12px',
                    padding: '4px 12px',
                    borderRadius: 'var(--border-radius-md)',
                    display: 'inline-block',
                    marginBottom: '1rem',
                  }}>
                    Best Value
                  </div>
                )}
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  color: 'var(--color-text-primary)',
                }}>{plan.name}</h3>
                <div style={{
                  fontSize: '28px',
                  fontWeight: '500',
                  marginBottom: '1.5rem',
                  color: 'var(--color-text-primary)',
                }}>{plan.price}</div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '1.5rem',
                }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ {plan.videos}</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ {plan.res}</li>
                  <li>✓ Watermark: {plan.watermark}</li>
                </ul>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '3rem',
            padding: '2rem',
            background: 'var(--color-background-secondary)',
            borderRadius: 'var(--border-radius-lg)',
            border: '2px solid var(--color-border-info)',
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: 'var(--color-text-primary)',
            <p style={{
              fontSize: '14px',
              fontWeight: '500',
              color: 'var(--color-text-info)',
              marginBottom: '0.5rem',
            <p style={{
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
          </div>
        </section>
      </div>
    );
  }

  // Gallery/Samples Page
  if (currentPage === 'gallery') {
    return (
      <div style={{ background: 'var(--color-background-tertiary)', minHeight: '100vh' }}>
        <header style={{
          background: 'var(--color-background-primary)',
          borderBottom: '0.5px solid var(--color-border-tertiary)',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <button
            onClick={() => setCurrentPage('landing')}
            style={{
              fontSize: '24px',
              fontWeight: '500',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            ⚡ Jedi
          </button>
          <button
            onClick={() => setCurrentPage('landing')}
            style={{
              background: 'var(--color-background-info)',
              color: 'var(--color-text-info)',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--border-radius-md)',
              cursor: 'pointer',
            }}
          >
            ← Back
          </button>
        </header>

        <div style={{ padding: '3rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '500',
            marginBottom: '3rem',
            color: 'var(--color-text-primary)',
          }}>Sample Videos & Styles</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              { title: 'Cinematic', style: 'Photorealistic cinema', color: '#FF6B6B' },
              { title: 'Anime', style: '2D animated style', color: '#4ECDC4' },
              { title: 'Giggli Style', style: 'Whimsical 3D render', color: '#FFE66D' },
              { title: 'Product Demo', style: 'Clean tech showcase', color: '#95E1D3' },
              { title: 'Fashion', style: 'Runway & modeling', color: '#F38181' },
              { title: 'Sci-Fi', style: 'Futuristic effects', color: '#AA96DA' },
              { title: 'Nature', style: 'Landscape cinematography', color: '#FCBAD3' },
              { title: 'Abstract', style: 'Motion graphics design', color: '#A8D8EA' },
              { title: 'Gaming', style: 'Game footage style', color: '#7FCD91' },
              { title: 'Vlogs', style: 'YouTube vlog aesthetic', color: '#C44569' },
              { title: '3D Render', style: 'Professional 3D models', color: '#F6B93B' },
              { title: 'Stop Motion', style: 'Claymation style', color: '#B19CD9' },
            ].map((sample, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--color-background-primary)',
                  border: '0.5px solid var(--color-border-tertiary)',
                  borderRadius: 'var(--border-radius-lg)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  background: sample.color,
                  height: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.8,
                }}>
                  <Play size={32} color="white" />
                </div>
                <div style={{ padding: '1rem' }}>
                  <p style={{
                    fontWeight: '500',
                    marginBottom: '0.25rem',
                    color: 'var(--color-text-primary)',
                  }}>{sample.title}</p>
                  <p style={{
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                  }}>{sample.style}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard/Editor
  if (isLoggedIn) {
    const currentPlanName = userPlan === 'free-trial' ? 'Free Trial' : userPlan === 'pro' ? 'Pro' : userPlan === 'creator' ? 'Creator' : 'Founder';
    
    return (
      <div style={{
        background: 'var(--color-background-tertiary)',
        minHeight: '100vh',
        display: 'flex',
      }}>
        <aside style={{
          width: '240px',
          background: 'var(--color-background-primary)',
          borderRight: '0.5px solid var(--color-border-tertiary)',
          padding: '1.5rem 1rem',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ fontSize: '20px', fontWeight: '500', marginBottom: '2rem' }}>
            ⚡ Jedi
          </div>

          <div style={{
            background: 'var(--color-background-secondary)',
            padding: '1rem',
            borderRadius: 'var(--border-radius-md)',
            marginBottom: '2rem',
            fontSize: '12px',
          }}>
            <div style={{ fontWeight: '500', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
              {currentPlanName}
            </div>
            <div style={{ color: 'var(--color-text-secondary)' }}>
              {trialVideosUsed} / {videoLimits[userPlan]} videos
            </div>
            <div style={{
              background: 'var(--color-background-tertiary)',
              height: '4px',
              borderRadius: '2px',
              marginTop: '0.5rem',
              overflow: 'hidden',
            }}>
              <div style={{
                background: 'var(--color-background-info)',
                height: '100%',
                width: `${Math.min((trialVideosUsed / videoLimits[userPlan]) * 100, 100)}%`,
              }} />
            </div>
          </div>

          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { icon: '🎬', label: 'Creator', id: 'creator' },
              { icon: '📺', label: 'My Videos', id: 'videos' },
              { icon: '⚙️', label: 'Settings', id: 'settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                style={{
                  background: currentPage === item.id ? 'var(--color-background-secondary)' : 'transparent',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: 'var(--border-radius-md)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '14px',
                  color: 'var(--color-text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '0.5px solid var(--color-border-tertiary)',
              padding: '0.75rem',
              borderRadius: 'var(--border-radius-md)',
              cursor: 'pointer',
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            🚪 Logout
          </button>
        </aside>

        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {currentPage === 'creator' && (
            <div style={{ maxWidth: '800px' }}>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '500',
                marginBottom: '2rem',
                color: 'var(--color-text-primary)',
              }}>Create Your Video</h1>

              <div style={{
                background: trialVideosUsed >= videoLimits[userPlan] ? 'var(--color-background-danger)' : 'var(--color-background-info)',
                color: trialVideosUsed >= videoLimits[userPlan] ? 'var(--color-text-danger)' : 'var(--color-text-info)',
                padding: '1rem',
                borderRadius: 'var(--border-radius-md)',
                marginBottom: '2rem',
                fontSize: '14px',
              }}>
                {trialVideosUsed >= videoLimits[userPlan] ? (
                  <>⚠️ Monthly limit reached. Upgrade to continue!</>
                ) : (
                  <>✓ Videos remaining: {videoLimits[userPlan] - trialVideosUsed} / {videoLimits[userPlan]}</>
                )}
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '0.75rem', display: 'block' }}>
                  Generation Mode
                </label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {[
                    { id: 'text-to-video', label: 'Text-to-Video' },
                    { id: 'image-to-video', label: 'Image-to-Video' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      style={{
                        padding: '0.75rem 1.5rem',
                        border: selectedMode === mode.id ? '2px solid var(--color-border-info)' : '0.5px solid var(--color-border-tertiary)',
                        borderRadius: 'var(--border-radius-md)',
                        background: selectedMode === mode.id ? 'var(--color-background-secondary)' : 'transparent',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                      }}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '0.75rem', display: 'block' }}>
                  Describe your video
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A cinematic shot of a woman walking through a neon-lit cyberpunk city..."
                  style={{
                    width: '100%',
                    minHeight: '120px',
                    padding: '0.75rem',
                    border: '0.5px solid var(--color-border-tertiary)',
                    borderRadius: 'var(--border-radius-md)',
                    fontSize: '14px',
                    fontFamily: 'var(--font-mono)',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>
                    Duration
                  </label>
                  <select
                    value={videoLength}
                    onChange={(e) => setVideoLength(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '0.5px solid var(--color-border-tertiary)',
                      borderRadius: 'var(--border-radius-md)',
                      fontSize: '14px',
                    }}
                  >
                    <option value="5">5 seconds</option>
                    <option value="8">8 seconds</option>
                    <option value="10">10 seconds</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '0.5rem', display: 'block' }}>
                    Resolution
                  </label>
                  <select
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    disabled={userPlan === 'free-trial'}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '0.5px solid var(--color-border-tertiary)',
                      borderRadius: 'var(--border-radius-md)',
                      fontSize: '14px',
                      opacity: userPlan === 'free-trial' ? 0.5 : 1,
                    }}
                  >
                    <option value="720p">720p</option>
                    <option value="1080p">1080p</option>
                    <option value="4K">4K</option>
                  </select>
                  {userPlan === 'free-trial' && (
                    <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                      Upgrade to Pro for 1080p & 4K
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleGenerateVideo}
                disabled={isGenerating || !prompt.trim() || trialVideosUsed >= videoLimits[userPlan]}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: (isGenerating || !prompt.trim() || trialVideosUsed >= videoLimits[userPlan]) ? 'var(--color-background-secondary)' : 'var(--color-background-info)',
                  color: (isGenerating || !prompt.trim() || trialVideosUsed >= videoLimits[userPlan]) ? 'var(--color-text-secondary)' : 'var(--color-text-info)',
                  border: 'none',
                  borderRadius: 'var(--border-radius-md)',
                  fontSize: '15px',
                  fontWeight: '500',
                  cursor: (isGenerating || !prompt.trim() || trialVideosUsed >= videoLimits[userPlan]) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                {isGenerating ? (
                  <>
                    <RotateCw size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 size={18} />
                    Generate Video
                  </>
                )}
              </button>

              <style>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}</style>

              {userPlan === 'free-trial' && (
                <div style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  background: 'var(--color-background-secondary)',
                  borderRadius: 'var(--border-radius-lg)',
                  textAlign: 'center',
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
                    Ready for more videos?
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                    Upgrade to Pro ($79/mo, 30 videos) or Creator ($179/mo, 100 videos)
                  </p>
                  <button
                    onClick={() => setCurrentPage('settings')}
                    style={{
                      background: 'var(--color-background-info)',
                      color: 'var(--color-text-info)',
                      padding: '0.5rem 1.5rem',
                      border: 'none',
                      borderRadius: 'var(--border-radius-md)',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                  >
                    View Plans
                  </button>
                </div>
              )}
            </div>
          )}

          {currentPage === 'videos' && (
            <div>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '500',
                marginBottom: '2rem',
                color: 'var(--color-text-primary)',
              }}>My Videos</h1>

              {videoHistory.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem',
                  color: 'var(--color-text-secondary)',
                }}>
                  <Video size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                  <p>No videos yet. Create your first one!</p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '1.5rem',
                }}>
                  {videoHistory.map((video) => (
                    <div
                      key={video.id}
                      style={{
                        background: 'var(--color-background-primary)',
                        border: '0.5px solid var(--color-border-tertiary)',
                        borderRadius: 'var(--border-radius-lg)',
                        overflow: 'hidden',
                      }}
                    >
                      <div style={{
                        position: 'relative',
                        background: '#000',
                        height: '140px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Play size={40} color="white" opacity={0.7} />
                        {video.watermark && (
                          <div style={{
                            position: 'absolute',
                            bottom: '8px',
                            right: '8px',
                            background: 'rgba(0,0,0,0.6)',
                            color: '#fff',
                            padding: '2px 8px',
                            borderRadius: '2px',
                            fontSize: '10px',
                          }}>
                            JEDI
                          </div>
                        )}
                      </div>
                      <div style={{ padding: '1rem' }}>
                        <p style={{
                          fontSize: '13px',
                          color: 'var(--color-text-secondary)',
                          marginBottom: '0.5rem',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {video.prompt}
                        </p>
                        <div style={{
                          display: 'flex',
                          gap: '0.75rem',
                          fontSize: '12px',
                          color: 'var(--color-text-secondary)',
                        }}>
                          <span>{video.duration}</span>
                          <span>•</span>
                          <span>{video.resolution}</span>
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: 'var(--color-text-tertiary)',
                          marginTop: '0.5rem',
                        }}>
                          {video.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentPage === 'settings' && (
            <div style={{ maxWidth: '600px' }}>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '500',
                marginBottom: '2rem',
                color: 'var(--color-text-primary)',
              }}>Plans & Settings</h1>

              <div style={{
                background: 'var(--color-background-primary)',
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 'var(--border-radius-lg)',
                padding: '2rem',
                marginBottom: '2rem',
              }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: '500',
                  marginBottom: '1rem',
                }}>Choose Your Plan</h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem',
                }}>
                  {[
                    { id: 'free-trial', name: 'Free', price: '$0', videos: '1/mo' },
                    { id: 'pro', name: 'Pro', price: '$79', videos: '30/mo' },
                    { id: 'creator', name: 'Creator', price: '$179', videos: '100/mo' },
                  ].map((plan, i) => (
                    <div
                      key={i}
                      onClick={() => setUserPlan(plan.id)}
                      style={{
                        padding: '1rem',
                        border: userPlan === plan.id ? '2px solid var(--color-border-info)' : '0.5px solid var(--color-border-tertiary)',
                        borderRadius: 'var(--border-radius-md)',
                        cursor: 'pointer',
                        background: userPlan === plan.id ? 'var(--color-background-info)' : 'var(--color-background-secondary)',
                        color: userPlan === plan.id ? 'var(--color-text-info)' : 'var(--color-text-primary)',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{plan.name}</div>
                      <div style={{ fontSize: '12px', marginBottom: '0.25rem' }}>{plan.price}/mo</div>
                      <div style={{ fontSize: '11px', opacity: 0.8 }}>{plan.videos}</div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: '2rem',
                  paddingTop: '1rem',
                  borderTop: '0.5px solid var(--color-border-tertiary)',
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                }}>
                  <strong>Current Plan:</strong> {currentPlanName}
                  <br />
                  <strong>Monthly Usage:</strong> {trialVideosUsed} / {videoLimits[userPlan]} videos
                </div>
              </div>

              <div style={{
                background: 'var(--color-background-primary)',
                border: '0.5px solid var(--color-border-tertiary)',
                borderRadius: 'var(--border-radius-lg)',
                padding: '2rem',
              }}>
                <h3 style={{
                  fontSize: '15px',
                  fontWeight: '500',
                  marginBottom: '1rem',
                <div style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.6',
                }}>
                  <p>✓ <strong>$49 Pro</strong> = $0.98/video (vs competitors $2-5/video)</p>
                  <p>✓ <strong>$99 Creator</strong> = $0.495/video (best value)</p>
                  <p>✓ Monthly limits keep costs predictable for everyone</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Pricing Page
  if (currentPage === 'pricing') {
    return (
      <div style={{ background: 'var(--color-background-tertiary)', minHeight: '100vh' }}>
        <header style={{
          background: 'var(--color-background-primary)',
          borderBottom: '0.5px solid var(--color-border-tertiary)',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <button
            onClick={() => setCurrentPage('landing')}
            style={{
              fontSize: '24px',
              fontWeight: '500',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            ⚡ Jedi
          </button>
          <button
            onClick={() => setCurrentPage('landing')}
            style={{
              background: 'var(--color-background-info)',
              color: 'var(--color-text-info)',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--border-radius-md)',
              cursor: 'pointer',
            }}
          >
            ← Back
          </button>
        </header>

        <div style={{ padding: '3rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '500',
            textAlign: 'center',
            marginBottom: '1rem',
            color: 'var(--color-text-primary)',
          }}>Affordable Video Generation</h1>
          <p style={{
            textAlign: 'center',
            color: 'var(--color-text-secondary)',
            marginBottom: '3rem',
            fontSize: '16px',
          }}>MUCH cheaper than Sora, Seedance, and Veo. Transparent pricing with zero surprises.</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}>
            {[
              {
                name: 'Free Trial',
                price: '$0/month',
                videos: '1 video/month',
                features: [
                  '1 video per month',
                  '720p resolution',
                  'Watermark on videos',
                  'Basic styles only',
                  'Community support',
                ],
              },
              {
                name: 'Pro',
                price: '$79/month',
                videos: '30 videos/month',
                features: [
                  '30 videos per month',
                  'All resolutions (4K)',
                  'No watermark',
                  'All styles & effects',
                  'Email support',
                  'Custom templates',
                ],
                highlight: true,
              },
              {
                name: 'Creator',
                price: '$179/month',
                videos: '100 videos/month',
                features: [
                  '100 videos per month',
                  'All resolutions (4K)',
                  'No watermark',
                  'All styles & effects',
                  'Priority support',
                  'Custom templates',
                  'Batch processing',
                ],
              },
            ].map((plan, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--color-background-primary)',
                  border: plan.highlight ? '2px solid var(--color-border-info)' : '0.5px solid var(--color-border-tertiary)',
                  borderRadius: 'var(--border-radius-lg)',
                  padding: '2rem',
                }}
              >
                {plan.highlight && (
                  <div style={{
                    background: 'var(--color-background-info)',
                    color: 'var(--color-text-info)',
                    fontSize: '12px',
                    padding: '4px 12px',
                    borderRadius: 'var(--border-radius-md)',
                    display: 'inline-block',
                    marginBottom: '1rem',
                  }}>
                    Best Value
                  </div>
                )}
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  color: 'var(--color-text-primary)',
                }}>{plan.name}</h3>
                <div style={{
                  fontSize: '28px',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  color: 'var(--color-text-primary)',
                }}>{plan.price}</div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '1.5rem',
                  color: 'var(--color-text-info)',
                }}>{plan.videos}</div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                }}>
                  {plan.features.map((feature, j) => (
                    <li key={j} style={{ marginBottom: '0.75rem' }}>
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setIsLoggedIn(true)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    marginTop: '1.5rem',
                    background: plan.highlight ? 'var(--color-background-info)' : 'transparent',
                    color: plan.highlight ? 'var(--color-text-info)' : 'var(--color-text-info)',
                    border: plan.highlight ? 'none' : '0.5px solid var(--color-border-secondary)',
                    borderRadius: 'var(--border-radius-md)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>

          <div style={{
            padding: '2rem',
            background: 'var(--color-background-primary)',
            borderRadius: 'var(--border-radius-lg)',
            border: '2px solid var(--color-border-info)',
            textAlign: 'center',
            marginBottom: '3rem',
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: 'var(--color-text-primary)',
            <p style={{
              fontSize: '16px',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: 'var(--color-text-info)',
            <p style={{
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            padding: '2rem',
            background: 'var(--color-background-secondary)',
            borderRadius: 'var(--border-radius-lg)',
          }}>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Pro Value</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>30 videos @ $79 = $2.63/video</p>
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Creator Value</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>100 videos @ $179 = $1.79/video</p>
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>vs Competitors</h4>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>They charge $2-5/video on average</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default JediPlatform;
