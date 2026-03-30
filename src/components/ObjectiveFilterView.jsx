import { FUNNEL_STAGES, CATEGORY_CONFIG } from '../constants'
import PlatformIcon from './PlatformIcon'

export default function ObjectiveFilterView({ results, activeFilter, onResultClick }) {
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
