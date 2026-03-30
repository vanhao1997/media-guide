import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import platforms from './data/platforms.json'
import { LAST_UPDATED, FUNNEL_ORDER, CATEGORY_CONFIG } from './constants'
import PlatformIcon from './components/PlatformIcon'
import WelcomeView from './components/WelcomeView'
import PlatformDetailView from './components/PlatformDetailView'
import ObjectiveFilterView from './components/ObjectiveFilterView'
import ResourcesView from './components/ResourcesView'
import GlossaryView from './components/GlossaryView'

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

export default App
