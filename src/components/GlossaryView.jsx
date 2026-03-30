import { useState } from 'react'
import glossaryData from '../data/glossary.json'

export default function GlossaryView({ searchQuery }) {
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
