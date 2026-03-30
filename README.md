# MediaGuide

**Công cụ tra cứu kênh quảng cáo số — P2P Digital**

Sales enablement tool cho account team, tra cứu nhanh thông tin 8 nền tảng quảng cáo phổ biến tại Việt Nam.

## ✨ Tính năng

- 📊 **8 nền tảng**: Facebook, TikTok, Google, YouTube, Zalo, LinkedIn, Admicro, Banner & Programmatic
- 🎯 **Mục tiêu quảng cáo**: Phân loại theo funnel TOFU/MOFU/BOFU với formats, metrics, tips
- 📖 **Thuật ngữ**: Tra cứu thuật ngữ digital marketing
- 💡 **Công cụ Account**: Creative specs, mẹo tối ưu, lỗi thường gặp
- ❓ **FAQ Client**: 32 câu hỏi thường gặp, xử lý objection trong cuộc họp
- 📚 **Bài chia sẻ**: Thư viện tài liệu training nội bộ
- 🌙 **Dark mode**: Chuyển đổi giao diện sáng/tối

## 🚀 Bắt đầu

```bash
# Clone
git clone https://github.com/vanhao1997/media-guide.git
cd media-guide

# Install
npm install

# Dev server
npm run dev
```

Mở `http://localhost:5174`

## 📁 Cấu trúc URL

| URL | Trang |
|-----|-------|
| `/` | Trang chủ |
| `/platform/:id` | Chi tiết nền tảng |
| `/objectives` | Mục tiêu quảng cáo |
| `/glossary` | Thuật ngữ |
| `/resources` | Bài chia sẻ |

## 🛠 Tech Stack

- React 19 + Vite 8
- react-router-dom (URL routing)
- Vanilla CSS (custom design system)
- Static JSON data (no backend)

## 📌 Versions

| Tag | Mô tả |
|-----|-------|
| `v1.0` | Initial launch |
| `v2.0` | UX redesign + Account Tools |
| `v2.1` | React Router integration |
| `v2.2` | Remove info toggle + layout fix |
| `v2.3` | Full-width layout (remove max-width) |

Rollback: `git checkout v2.0`

## 📄 License

Internal tool — P2P Digital © 2026
