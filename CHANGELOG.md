# Changelog

## [2026-03-29] — v2.2
### Added
- **Collapsible panels**: Account Tools + Client FAQ sections collapse/expand with caret animation
- **"Bài chia sẻ" tab**: New Resources view with training material cards
- **Client FAQ**: 32 curated FAQ entries (4 per platform) for objection handling
- **React Router**: URL-based routing with deep linking (`/platform/:id`, `/objectives`, `/glossary`, `/resources`)

### Changed
- Platform detail info grid (Ưu/Nhược điểm, Đối tượng, Benchmark) now always visible at top
- Removed toggle button for showing/hiding platform info
- Navigation uses `navigate()` instead of state — enables browser history

### Removed
- Channel comparison view (So sánh kênh)
- Platform suggestion form (Gửi ý nền tảng)
- `showInfo` toggle state and CSS

## [2026-03-29] — v2.0
### Added
- UX redesign with Phosphor icons
- Professional design system (InterVariable, JetBrains Mono)
- Account Tools panel: Creative Specs, Mẹo tối ưu, Lỗi thường gặp
- Glossary view (Thuật ngữ) with category filters
- Dark mode support with CSS custom properties
- Platform logos (SVG) for all 8 platforms

### Changed
- Redesigned all views for enterprise-grade aesthetics
- Improved mobile responsiveness

## [2026-03-29] — v1.0
### Added
- Initial MediaGuide launch
- 8 advertising platforms with objectives, formats, metrics
- Funnel-based view (TOFU/MOFU/BOFU)
- Platform detail view with pros/cons/audience/benchmarks
- Search functionality across platforms and objectives
