export default function ObjectiveCard({ objective, expanded, onToggle }) {
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
