import { useState, useMemo, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom'
import './App.css'
import platforms from './data/platforms.json'
import glossaryData from './data/glossary.json'

const LAST_UPDATED = '2026-03-29'

/* ========== PLATFORM LOGOS ========== */
const PLATFORM_LOGOS = {
  facebook: '/logos/facebook.svg',
  tiktok: '/logos/tiktok.svg',
  google: '/logos/google.svg',
  youtube: '/logos/youtube.svg',
  zalo: '/logos/zalo.svg',
  linkedin: '/logos/linkedin.svg',
  admicro: '/logos/admicro.svg',
  banner: '/logos/banner.svg',
}

function PlatformIcon({ id, size = 20, style = {} }) {
  return <img src={PLATFORM_LOGOS[id]} alt="" style={{ width: size, height: size, ...style }} />
}

/* ========== MARKETING FUNNEL STAGES ========== */
const FUNNEL_STAGES = [
  {
    id: 'awareness',
    name: 'TOFU — Awareness (Nhận biết)',
    description: 'Giai đoạn đầu phễu: tiếp cận khách hàng mới, tăng nhận diện thương hiệu',
    color: '#3B82F6',
    categories: ['awareness'],
  },
  {
    id: 'consideration',
    name: 'MOFU — Consideration (Cân nhắc)',
    description: 'Giai đoạn giữa phễu: tạo sự quan tâm, tương tác, và cân nhắc',
    color: '#8B5CF6',
    categories: ['traffic', 'engagement'],
  },
  {
    id: 'conversion',
    name: 'BOFU — Conversion (Chuyển đổi)',
    description: 'Giai đoạn cuối phễu: thu thập lead, mua hàng, cài app',
    color: '#10B981',
    categories: ['leads', 'conversions', 'app'],
  },
]

/* ========== CATEGORY CONFIG ========== */
const CATEGORY_CONFIG = {
  awareness: { label: 'Awareness', color: '#3B82F6', icon: '/icons/eye.svg' },
  traffic: { label: 'Traffic', color: '#06B6D4', icon: '/icons/cursor-click.svg' },
  engagement: { label: 'Engagement', color: '#8B5CF6', icon: '/icons/megaphone.svg' },
  leads: { label: 'Leads', color: '#10B981', icon: '/icons/user-list.svg' },
  conversions: { label: 'Conversions', color: '#EF4444', icon: '/icons/shopping-cart.svg' },
  app: { label: 'App Install', color: '#F97316', icon: '/icons/device-mobile.svg' },
}

/* ========== FUNNEL ORDER FOR SORTING ========== */
const FUNNEL_ORDER = ['awareness', 'traffic', 'engagement', 'leads', 'conversions', 'app']

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  // Derive view & platform from URL
  const pathParts = location.pathname.split('/').filter(Boolean)
  const activeView = pathParts[0] === 'platform' ? 'platform'
    : pathParts[0] === 'objectives' ? 'objective'
      : pathParts[0] === 'glossary' ? 'glossary'
        : pathParts[0] === 'resources' ? 'resources'
          : 'platform' // default = welcome/platform
  const selectedPlatform = pathParts[0] === 'platform' && pathParts[1]
    ? platforms.find(p => p.id === pathParts[1]) || null
    : null

  const [showInfo, setShowInfo] = useState(true)
  const [layoutMode, setLayoutMode] = useState('funnel')
  const [activeFilter, setActiveFilter] = useState(null)
  const [expandedObjectives, setExpandedObjectives] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mediaguide-theme') || 'light'
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('mediaguide-theme', theme)
  }, [theme])

  const categoryCounts = useMemo(() => {
    const counts = {}
    platforms.forEach(p => {
      p.objectives.forEach(obj => {
        counts[obj.category] = (counts[obj.category] || 0) + 1
      })
    })
    return counts
  }, [])

  const totalObjectives = platforms.reduce((sum, p) => sum + p.objectives.length, 0)

  // Sort objectives by funnel order
  const sortByFunnel = (objectives) => {
    return [...objectives].sort((a, b) =>
      FUNNEL_ORDER.indexOf(a.category) - FUNNEL_ORDER.indexOf(b.category)
    )
  }

  // Group objectives by funnel stage
  const groupByFunnel = (objectives) => {
    return FUNNEL_STAGES.map(stage => ({
      ...stage,
      objectives: objectives.filter(obj => stage.categories.includes(obj.category)),
    })).filter(stage => stage.objectives.length > 0)
  }

  // Filter results for objective view
  const filteredResults = useMemo(() => {
    const results = []
    platforms.forEach(platform => {
      platform.objectives.forEach(obj => {
        const matchesFilter = !activeFilter || obj.category === activeFilter
        const matchesSearch = !searchQuery ||
          obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          obj.description.toLowerCase().includes(searchQuery.toLowerCase())

        if (matchesFilter && matchesSearch) {
          results.push({ ...obj, platform })
        }
      })
    })
    // Sort by funnel
    results.sort((a, b) => FUNNEL_ORDER.indexOf(a.category) - FUNNEL_ORDER.indexOf(b.category))
    return results
  }, [activeFilter, searchQuery])

  const toggleObjective = (id) => {
    setExpandedObjectives(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handlePlatformClick = (platform) => {
    navigate(`/platform/${platform.id}`)
    setMobileMenuOpen(false)
    setExpandedObjectives({})
  }

  const handleFilterClick = (category) => {
    setActiveFilter(activeFilter === category ? null : category)
  }

  const handleResultClick = (result) => {
    navigate(`/platform/${result.platform.id}`)
    setExpandedObjectives({ [result.id]: true })
  }

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="app">
      {/* Mobile toggle */}
      <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? '✕' : '☰'}
      </button>
      <div className={`sidebar-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)} />

      {/* Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="brand" onClick={() => { navigate('/'); setMobileMenuOpen(false) }}>
          <div className="brand-logo">
            <div className="brand-icon">M</div>
            <div className="brand-text">
              <h1>MediaGuide</h1>
              <span>by P2P Digital</span>
            </div>
          </div>
        </div>

        <nav className="nav-section">
          <div className="nav-section-title">Nền tảng quảng cáo</div>
          {platforms.map(platform => (
            <div
              key={platform.id}
              className={`nav-item ${selectedPlatform?.id === platform.id && activeView === 'platform' ? 'active' : ''}`}
              onClick={() => handlePlatformClick(platform)}
            >
              <div className="nav-item-icon" style={{ background: `${platform.color}15` }}>
                <PlatformIcon id={platform.id} size={20} />
              </div>
              <div className="nav-item-info">
                <div className="nav-item-name">{platform.name}</div>
                <div className="nav-item-count">{platform.objectives.length} objectives</div>
              </div>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-text">
            © 2026 <a href="https://p2pdigital.vn" target="_blank" rel="noreferrer">P2P Digital</a>
          </div>
          <button className="theme-toggle" onClick={toggleTheme} title={theme === 'light' ? 'Dark mode' : 'Light mode'}>
            <img src={theme === 'light' ? '/icons/moon.svg' : '/icons/sun.svg'} alt="theme" />
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        <div className="topbar">
          <div className="topbar-left">
            <div className="view-toggle">
              <button
                className={`view-toggle-btn ${activeView === 'platform' ? 'active' : ''}`}
                onClick={() => selectedPlatform ? navigate(`/platform/${selectedPlatform.id}`) : navigate('/')}
              >
                <img src="/icons/list.svg" alt="" /> Nền tảng
              </button>
              <button
                className={`view-toggle-btn ${activeView === 'objective' ? 'active' : ''}`}
                onClick={() => navigate('/objectives')}
              >
                <img src="/icons/target.svg" alt="" /> Mục tiêu
              </button>

              <button
                className={`view-toggle-btn ${activeView === 'glossary' ? 'active' : ''}`}
                onClick={() => navigate('/glossary')}
              >
                <img src="/icons/book-open.svg" alt="" /> Thuật ngữ
              </button>
              <button
                className={`view-toggle-btn ${activeView === 'resources' ? 'active' : ''}`}
                onClick={() => navigate('/resources')}
              >
                <img src="/icons/presentation-chart.svg" alt="" /> Bài chia sẻ
              </button>
            </div>
          </div>
          <div className="search-box">
            <img src="/icons/magnifying-glass.svg" alt="" className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm nền tảng, mục tiêu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Objective Filter Bar */}
        {activeView === 'objective' && (
          <div className="filter-bar">
            <button className={`filter-chip ${!activeFilter ? 'active' : ''}`} onClick={() => setActiveFilter(null)}>
              Tất cả <span className="chip-count">({totalObjectives})</span>
            </button>
            {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
              <button
                key={key}
                className={`filter-chip ${activeFilter === key ? 'active' : ''}`}
                onClick={() => handleFilterClick(key)}
              >
                <img src={config.icon} alt="" /> {config.label}
                <span className="chip-count">({categoryCounts[key] || 0})</span>
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        {activeView === 'platform' && !selectedPlatform && (
          <WelcomeView
            platformCount={platforms.length}
            objectiveCount={totalObjectives}
            onNavigate={(view) => navigate(`/${view === 'compare' ? '' : view}`)}
            onPlatformClick={() => handlePlatformClick(platforms[0])}
          />
        )}

        {activeView === 'platform' && selectedPlatform && (
          <PlatformDetailView
            platform={selectedPlatform}
            expandedObjectives={expandedObjectives}
            onToggle={toggleObjective}
            searchQuery={searchQuery}
          />
        )}

        {activeView === 'objective' && (
          <ObjectiveFilterView results={filteredResults} activeFilter={activeFilter} onResultClick={handleResultClick} />
        )}



        {activeView === 'glossary' && (
          <GlossaryView searchQuery={searchQuery} />
        )}

        {activeView === 'resources' && (
          <ResourcesView />
        )}

        {/* Last Updated Footer */}
        <div className="content-footer">
          Cập nhật lần cuối: <strong>{LAST_UPDATED}</strong> · Dữ liệu tham khảo, cần xác minh trước khi sử dụng
        </div>
      </main>
    </div>
  )
}

/* ========== WELCOME ========== */
function WelcomeView({ platformCount, objectiveCount, onNavigate, onPlatformClick }) {
  const QUICK_START = [
    {
      icon: '/icons/list.svg',
      color: '#1877F2',
      title: 'Khám phá nền tảng',
      desc: 'Xem chi tiết pros/cons, audience, benchmark và creative specs cho từng kênh QC.',
      label: 'Mở Facebook Ads →',
      action: onPlatformClick,
    },

    {
      icon: '/icons/book-open.svg',
      color: '#8B5CF6',
      title: 'Tra cứu thuật ngữ',
      desc: '35 thuật ngữ Digital Ads cơ bản: CPM, ROAS, Lookalike, DPA, Spark Ads…',
      label: 'Mở Thuật ngữ →',
      action: () => onNavigate('glossary'),
    },
  ]

  return (
    <div className="welcome">
      <div className="welcome-hero">
        <div className="welcome-icon">
          <img src="/icons/presentation-chart.svg" alt="" />
        </div>
        <h2>Chào mừng đến MediaGuide</h2>
        <p>Cẩm nang tra cứu nhanh các kênh quảng cáo số cho team Account — mục tiêu, specs, tips &amp; benchmark VN.</p>
      </div>

      <div className="welcome-cards">
        {QUICK_START.map((card, i) => (
          <button key={i} className="welcome-card" onClick={card.action}>
            <div className="welcome-card-icon" style={{ background: `${card.color}15`, borderColor: `${card.color}30` }}>
              <img src={card.icon} alt="" style={{ filter: 'none', width: 24, height: 24 }} />
            </div>
            <div className="welcome-card-body">
              <div className="welcome-card-title">{card.title}</div>
              <div className="welcome-card-desc">{card.desc}</div>
            </div>
            <div className="welcome-card-cta" style={{ color: card.color }}>{card.label}</div>
          </button>
        ))}
      </div>

      <div className="welcome-how">
        <div className="welcome-how-title">Cách dùng nhanh</div>
        <div className="welcome-how-steps">
          <div className="how-step"><span className="how-step-num">1</span><span>Chọn <strong>nền tảng</strong> từ sidebar trái</span></div>
          <div className="how-step"><span className="how-step-num">2</span><span>Xem <strong>Mục tiêu</strong> theo phễu TOFU → MOFU → BOFU</span></div>
          <div className="how-step"><span className="how-step-num">3</span><span>Dùng <strong>Công cụ Account</strong> khi pitch với client</span></div>
          <div className="how-step"><span className="how-step-num">4</span><span>Dùng tab <strong>So sánh</strong> khi client hỏi "Sao không dùng kênh X?"</span></div>
        </div>
      </div>

      <div className="welcome-stats">
        <div className="welcome-stat">
          <div className="welcome-stat-value">{platformCount}</div>
          <div className="welcome-stat-label">Nền tảng</div>
        </div>
        <div className="welcome-stat">
          <div className="welcome-stat-value">{objectiveCount}</div>
          <div className="welcome-stat-label">Mục tiêu QC</div>
        </div>
        <div className="welcome-stat">
          <div className="welcome-stat-value">3</div>
          <div className="welcome-stat-label">Giai đoạn phễu</div>
        </div>
      </div>
    </div>
  )
}

/* ========== PLATFORM DETAIL ========== */
function PlatformDetailView({ platform, expandedObjectives, onToggle, searchQuery }) {
  const [layoutMode, setLayoutMode] = useState('funnel')
  const [showInfo, setShowInfo] = useState(true)
  const [allExpanded, setAllExpanded] = useState(false)

  const filtered = platform.objectives.filter(obj =>
    !searchQuery ||
    obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    obj.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleAll = () => {
    const newState = !allExpanded
    setAllExpanded(newState)
    filtered.forEach(obj => {
      if (newState !== !!expandedObjectives[obj.id]) onToggle(obj.id)
    })
  }

  // Group by funnel stage
  const funnelGroups = FUNNEL_STAGES.map(stage => ({
    ...stage,
    objectives: filtered
      .filter(obj => stage.categories.includes(obj.category))
      .sort((a, b) => FUNNEL_ORDER.indexOf(a.category) - FUNNEL_ORDER.indexOf(b.category)),
  })).filter(stage => stage.objectives.length > 0)

  return (
    <div className="platform-page">
      <div className="platform-header">
        <div className="platform-icon-large" style={{ background: `${platform.color}15` }}>
          <PlatformIcon id={platform.id} size={28} />
        </div>
        <div className="platform-header-info">
          <h2>{platform.name}</h2>
          <p>{platform.description}</p>
          <div className="platform-meta">
            <div className="meta-item">
              <img src="/icons/users.svg" alt="" />
              <strong>Audience:</strong> {platform.audienceOverview}
            </div>
            <div className="meta-item">
              <img src="/icons/hand-coins.svg" alt="" />
              <strong>Budget tối thiểu:</strong> {platform.minBudget}
            </div>
            {platform.pricingModel && (
              <div className="meta-item">
                <img src="/icons/chart-line-up.svg" alt="" />
                <strong>Pricing:</strong> {platform.pricingModel.join(', ')}
              </div>
            )}
          </div>
          {platform.idealFor && (
            <div className="platform-ideal-for">
              <span className="ideal-label">Phù hợp cho:</span>
              {platform.idealFor.map((item, i) => <span key={i} className="ideal-tag">{item}</span>)}
            </div>
          )}
        </div>
      </div>

      {/* Pros / Cons / Audience / Benchmarks */}
      {showInfo && (platform.pros || platform.audience) && (
        <div className="platform-info-grid">
          {platform.pros && (
            <div className="info-card pros">
              <div className="info-card-title">✅ Ưu điểm</div>
              <ul>{platform.pros.map((p, i) => <li key={i}>{p}</li>)}</ul>
            </div>
          )}
          {platform.cons && (
            <div className="info-card cons">
              <div className="info-card-title">⚠️ Nhược điểm</div>
              <ul>{platform.cons.map((c, i) => <li key={i}>{c}</li>)}</ul>
            </div>
          )}
          {platform.audience && (
            <div className="info-card audience">
              <div className="info-card-title">👥 Đối tượng</div>
              <table className="audience-table">
                <tbody>
                  <tr><td>Tổng users</td><td>{platform.audience.totalUsers}</td></tr>
                  <tr><td>Độ tuổi chính</td><td>{platform.audience.primaryAge}</td></tr>
                  <tr><td>Giới tính</td><td>{platform.audience.gender}</td></tr>
                  <tr><td>Thiết bị</td><td>{platform.audience.devices}</td></tr>
                  <tr><td>Giờ cao điểm</td><td>{platform.audience.peakHours}</td></tr>
                </tbody>
              </table>
            </div>
          )}
          {platform.benchmarks && (
            <div className="info-card benchmarks">
              <div className="info-card-title">📊 Benchmark VN</div>
              <table className="audience-table">
                <tbody>
                  {Object.entries(platform.benchmarks).filter(([k]) => k !== 'note').map(([k, v]) => (
                    <tr key={k}><td>{k.replace(/_/g, ' ')}</td><td>{v}</td></tr>
                  ))}
                </tbody>
              </table>
              <div className="benchmark-note">{platform.benchmarks.note}</div>
            </div>
          )}
        </div>
      )}

      <button className="toggle-info-btn" onClick={() => setShowInfo(!showInfo)}>
        {showInfo ? '▲ Ẩn thông tin' : '▼ Hiển thông tin chi tiết'}
      </button>

      {/* ───── ACCOUNT TOOLS PANEL (Collapsible) ───── */}
      <details className="collapsible-panel">
        <summary className="collapsible-panel-header">
          <img src="/icons/presentation-chart.svg" alt="" className="account-tools-icon" />
          <span>Công cụ Account</span>
          <span className="account-tools-tag">Dùng khi tư vấn client</span>
          <img src="/icons/caret-down.svg" alt="" className="collapsible-caret" />
        </summary>
        <div className="account-tools-grid">

          {/* Creative Specs */}
          {platform.adSpecs && (
            <div className="account-tool-card specs-card">
              <div className="tool-card-title">
                <img src="/icons/presentation-chart.svg" alt="" /> Creative Specs
              </div>
              <div className="specs-list">
                {platform.adSpecs.image && (
                  <div className="spec-row">
                    <span className="spec-label">Hình ảnh</span>
                    <span className="spec-value">{platform.adSpecs.image.join(' · ')}</span>
                  </div>
                )}
                {platform.adSpecs.video && (
                  <div className="spec-row">
                    <span className="spec-label">Video</span>
                    <span className="spec-value">{platform.adSpecs.video}</span>
                  </div>
                )}
                {platform.adSpecs.text && (
                  <div className="spec-row">
                    <span className="spec-label">Copy</span>
                    <span className="spec-value">{platform.adSpecs.text}</span>
                  </div>
                )}
                {platform.adSpecs.note && (
                  <div className="spec-note">⚡ {platform.adSpecs.note}</div>
                )}
              </div>
            </div>
          )}

          {/* Tips */}
          {platform.tips && (
            <div className="account-tool-card tips-card">
              <div className="tool-card-title">
                <img src="/icons/lightbulb.svg" alt="" /> Mẹo tối ưu
              </div>
              <ul className="tool-list tips-list">
                {platform.tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </div>
          )}

          {/* Common Mistakes */}
          {platform.commonMistakes && (
            <div className="account-tool-card mistakes-card">
              <div className="tool-card-title">
                <img src="/icons/lightning.svg" alt="" /> Lỗi thường gặp
              </div>
              <ul className="tool-list mistakes-list">
                {platform.commonMistakes.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
          )}

        </div>
      </details>


      {/* Client FAQ (Collapsible) */}
      {platform.faqs && platform.faqs.length > 0 && (
        <details className="collapsible-panel faq-panel">
          <summary className="collapsible-panel-header faq-header">
            <img src="/icons/megaphone.svg" alt="" />
            <div>
              <div className="faq-title">Câu hỏi thường gặp từ Client</div>
              <div className="faq-subtitle">Dùng khi xử lý objection trong cuộc họp</div>
            </div>
            <img src="/icons/caret-down.svg" alt="" className="collapsible-caret" />
          </summary>
          <div className="faq-list">
            {platform.faqs.map((faq, i) => (
              <details key={i} className="faq-item">
                <summary className="faq-question">
                  <span className="faq-q-icon">Q</span>
                  {faq.q}
                </summary>
                <div className="faq-answer">
                  <span className="faq-a-icon">A</span>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </details>
      )}

      <div className="layout-toggle-bar">

        <div className="layout-toggle">
          <button
            className={`layout-toggle-btn ${layoutMode === 'funnel' ? 'active' : ''}`}
            onClick={() => setLayoutMode('funnel')}
          >
            <img src="/icons/funnel.svg" alt="" /> Theo phễu
          </button>
          <button
            className={`layout-toggle-btn ${layoutMode === 'flat' ? 'active' : ''}`}
            onClick={() => setLayoutMode('flat')}
          >
            <img src="/icons/list.svg" alt="" /> Danh sách
          </button>
        </div>
        <span className="layout-count">{filtered.length} mục tiêu</span>
        <button className="expand-all-btn" onClick={toggleAll}>
          {allExpanded ? '▲ Thu gọn tất cả' : '▼ Mở rộng tất cả'}
        </button>
      </div>

      {layoutMode === 'funnel' && (
        <>
          {/* Funnel Legend */}
          <div className="funnel-legend">
            {FUNNEL_STAGES.map(stage => {
              const has = filtered.some(o => stage.categories.includes(o.category))
              if (!has) return null
              return (
                <div key={stage.id} className="legend-item">
                  <div className="legend-dot" style={{ background: stage.color }}></div>
                  {stage.name.split(' — ')[0]}
                </div>
              )
            })}
          </div>

          {/* Objectives grouped by funnel */}
          {funnelGroups.map(stage => (
            <div key={stage.id} className="funnel-stage">
              <div className="funnel-stage-header">
                <div className="funnel-stage-dot" style={{ background: stage.color }}></div>
                <span className="funnel-stage-title">{stage.name}</span>
                <span className="funnel-stage-count">{stage.objectives.length} mục tiêu</span>
              </div>
              <div className="objectives-grid">
                {stage.objectives.map(obj => (
                  <ObjectiveCard
                    key={obj.id}
                    objective={obj}
                    expanded={expandedObjectives[obj.id]}
                    onToggle={() => onToggle(obj.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {layoutMode === 'flat' && (
        <div className="objectives-grid">
          {filtered.map(obj => (
            <ObjectiveCard
              key={obj.id}
              objective={obj}
              expanded={expandedObjectives[obj.id]}
              onToggle={() => onToggle(obj.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ========== OBJECTIVE CARD ========== */
function ObjectiveCard({ objective, expanded, onToggle }) {
  return (
    <div className="objective-card">
      <div className="objective-card-header" onClick={onToggle}>
        <div className="objective-card-header-left">
          <div className={`objective-category-dot cat-${objective.category}`}></div>
          <span className="objective-card-title">{objective.name}</span>
        </div>
        <span className="objective-card-desc-short">
          {objective.adFormats.length} formats · {objective.metrics.length} metrics
        </span>
        <img
          src="/icons/caret-down.svg"
          alt=""
          className={`objective-expand-icon ${expanded ? 'expanded' : ''}`}
        />
      </div>

      {expanded && (
        <div className="objective-card-body">
          <div className="objective-description">{objective.description}</div>

          <div className="objective-sections">
            <div className="objective-section">
              <div className="objective-section-title">
                <img src="/icons/video-camera.svg" alt="" /> Ad Formats
              </div>
              <div className="tag-list">
                {objective.adFormats.map((format, i) => <span key={i} className="tag">{format}</span>)}
              </div>
            </div>

            <div className="objective-section">
              <div className="objective-section-title">
                <img src="/icons/chart-bar.svg" alt="" /> Metrics chính
              </div>
              <div className="tag-list">
                {objective.metrics.map((m, i) => <span key={i} className="tag">{m}</span>)}
              </div>
            </div>

            <div className="objective-section">
              <div className="objective-section-title">
                <img src="/icons/users.svg" alt="" /> Đối tượng phù hợp
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                {objective.targetAudience}
              </p>
            </div>

            <div className="objective-section">
              <div className="objective-section-title">
                <img src="/icons/lightbulb.svg" alt="" /> Best Practices
              </div>
              <ul className="tip-list">
                {objective.bestPractices.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ========== OBJECTIVE FILTER VIEW ========== */
function ObjectiveFilterView({ results, activeFilter, onResultClick }) {
  const filterLabel = activeFilter ? CATEGORY_CONFIG[activeFilter]?.label : 'Tất cả mục tiêu'

  // Group filtered results by funnel stage
  const funnelGroups = FUNNEL_STAGES.map(stage => ({
    ...stage,
    results: results.filter(r => stage.categories.includes(r.category)),
  })).filter(g => g.results.length > 0)

  return (
    <div className="filter-view">
      <h2>
        <img src="/icons/target.svg" alt="" /> {filterLabel}
      </h2>
      <p className="filter-subtitle">
        Tìm thấy <strong>{results.length}</strong> mục tiêu quảng cáo
        {activeFilter ? ` trong danh mục ${CATEGORY_CONFIG[activeFilter]?.label}` : ' trên tất cả nền tảng'}
      </p>

      {funnelGroups.map(stage => (
        <div key={stage.id} className="funnel-stage">
          <div className="funnel-stage-header">
            <div className="funnel-stage-dot" style={{ background: stage.color }}></div>
            <span className="funnel-stage-title">{stage.name}</span>
            <span className="funnel-stage-count">{stage.results.length} mục tiêu</span>
          </div>
          <div className="filter-results">
            {stage.results.map((result, i) => (
              <div
                key={`${result.platform.id}-${result.id}-${i}`}
                className="filter-result-card"
                onClick={() => onResultClick(result)}
              >
                <div className="filter-result-icon" style={{ background: `${result.platform.color}15` }}>
                  <PlatformIcon id={result.platform.id} size={22} />
                </div>
                <div className="filter-result-info">
                  <div className="filter-result-platform">{result.platform.name}</div>
                  <div className="filter-result-name">{result.name}</div>
                  <div className="filter-result-desc">{result.description}</div>
                </div>
                <div className="filter-result-formats">
                  {result.adFormats.slice(0, 3).map((f, j) => <span key={j} className="tag">{f}</span>)}
                  {result.adFormats.length > 3 && <span className="tag">+{result.adFormats.length - 3}</span>}
                </div>
                <img src="/icons/arrow-right.svg" alt="" className="filter-result-arrow" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ========== RESOURCES VIEW ========== */
const RESOURCES = [
  {
    id: 'media-performance-training',
    title: 'Media Performance Training',
    desc: 'Bộ slide 32 trang về Media Performance cho team Account. Bao gồm KPI Fundamentals, 8 nền tảng chi tiết, Optimization & Creative Guide.',
    tags: ['Training', '32 slides', 'Internal'],
    icon: '/icons/presentation-chart.svg',
    color: '#FF5722',
    url: 'https://github.com/vanhao1997/slide-media-team',
    status: 'live',
  },
]

function ResourcesView() {
  return (
    <div className="tool-view">
      <div className="tool-header">
        <img src="/icons/presentation-chart.svg" alt="" />
        <div>
          <h2>Bài chia sẻ</h2>
          <p>Tài liệu đào tạo và chia sẻ kiến thức cho team</p>
        </div>
      </div>

      <div className="resources-grid">
        {RESOURCES.map(res => (
          <a
            key={res.id}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card"
            style={{ '--resource-color': res.color }}
          >
            <div className="resource-card-top">
              <div className="resource-icon-wrap" style={{ background: `${res.color}15` }}>
                <img src={res.icon} alt="" style={{ filter: 'none' }} />
              </div>
              <span className={`resource-status ${res.status}`}>
                {res.status === 'live' ? '● Live' : '◌ Coming soon'}
              </span>
            </div>
            <h3 className="resource-title">{res.title}</h3>
            <p className="resource-desc">{res.desc}</p>
            <div className="resource-tags">
              {res.tags.map((t, i) => <span key={i} className="resource-tag">{t}</span>)}
            </div>
            <div className="resource-cta">
              Mở tài liệu <img src="/icons/arrow-right.svg" alt="" />
            </div>
          </a>
        ))}

        {/* Placeholder for future resources */}
        <div className="resource-card placeholder">
          <div className="resource-card-top">
            <div className="resource-icon-wrap" style={{ background: '#f0f0f0' }}>
              <img src="/icons/lightbulb.svg" alt="" style={{ opacity: 0.3 }} />
            </div>
          </div>
          <h3 className="resource-title" style={{ opacity: 0.4 }}>Sắp tới...</h3>
          <p className="resource-desc" style={{ opacity: 0.3 }}>Nhiều bài chia sẻ khác sẽ được bổ sung tại đây</p>
        </div>
      </div>
    </div>
  )
}

/* ========== GLOSSARY VIEW ========== */
function GlossaryView({ searchQuery }) {
  const [localSearch, setLocalSearch] = useState(searchQuery || '')
  const [activeFirst, setActiveFirst] = useState(null)

  const filtered = glossaryData.filter(g =>
    !localSearch ||
    g.term.toLowerCase().includes(localSearch.toLowerCase()) ||
    g.full.toLowerCase().includes(localSearch.toLowerCase()) ||
    g.definition.toLowerCase().includes(localSearch.toLowerCase())
  )

  const firstLetters = [...new Set(filtered.map(g => g.term[0].toUpperCase()))].sort()

  return (
    <div className="tool-view">
      <div className="tool-header">
        <img src="/icons/book-open.svg" alt="" />
        <div>
          <h2>Thuật ngữ quảng cáo số</h2>
          <p>{glossaryData.length} thuật ngữ phổ biến trong digital advertising</p>
        </div>
      </div>

      <div className="glossary-search">
        <img src="/icons/magnifying-glass.svg" alt="" />
        <input
          type="text"
          placeholder="Tìm thuật ngữ... VD: CPM, ROAS, Lookalike"
          value={localSearch}
          onChange={e => setLocalSearch(e.target.value)}
        />
      </div>

      <div className="glossary-filter">
        <button className={`alpha-btn ${activeFirst === null ? 'active' : ''}`} onClick={() => setActiveFirst(null)}>Tất cả</button>
        {firstLetters.map(l => (
          <button key={l} className={`alpha-btn ${activeFirst === l ? 'active' : ''}`} onClick={() => setActiveFirst(l)}>{l}</button>
        ))}
      </div>

      <div className="glossary-grid">
        {filtered
          .filter(g => !activeFirst || g.term[0].toUpperCase() === activeFirst)
          .map(g => (
            <div key={g.term} className="glossary-card">
              <div className="glossary-term">{g.term}</div>
              <div className="glossary-full">{g.full}</div>
              <div className="glossary-def">{g.definition}</div>
            </div>
          ))
        }
        {filtered.length === 0 && (
          <div className="glossary-empty">Không tìm thấy thuật ngữ "{localSearch}"</div>
        )}
      </div>
    </div>
  )
}

export default App
