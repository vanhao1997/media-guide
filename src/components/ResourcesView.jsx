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

export default function ResourcesView() {
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
