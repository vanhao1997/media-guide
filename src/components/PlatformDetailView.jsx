import { useState } from 'react'
import { FUNNEL_STAGES, FUNNEL_ORDER } from '../constants'
import PlatformIcon from './PlatformIcon'
import ObjectiveCard from './ObjectiveCard'

export default function PlatformDetailView({ platform, expandedObjectives, onToggle, searchQuery }) {
    const [layoutMode, setLayoutMode] = useState('funnel')
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

            {/* Pros / Cons / Audience / Benchmarks — always visible */}
            {(platform.pros || platform.audience) && (
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
