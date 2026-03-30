export default function WelcomeView({ platformCount, objectiveCount, onNavigate, onPlatformClick }) {
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
