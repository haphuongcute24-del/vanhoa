# Vân Hoa Landing Page — Project Plan

## Goal

Xây dựng landing page cao cấp cho thương hiệu Leather Charm **Vân Hoa** — Static HTML + CSS + Vanilla JS + GSAP.

**Project Type:** WEB (Landing Page)
**Primary Agent:** `frontend-specialist`

---

## 🔍 Phân tích lỗ hổng ý tưởng (Gap Analysis)

### ⚠️ Lỗ hổng đã phát hiện & Giải pháp

| # | Lỗ hổng | Mức độ | Giải pháp |
|---|---------|--------|-----------|
| G1 | **Không có favicon** — Thiếu biểu tượng tab trình duyệt → trông không chuyên nghiệp | 🔴 Cao | Tạo favicon từ logo placeholder, hỗ trợ nhiều kích cỡ |
| G2 | **Thiếu Open Graph / Social Preview** — Chia sẻ link trên FB/IG sẽ không có hình ảnh preview đẹp | 🔴 Cao | Thêm OG meta tags + tạo OG image 1200×630px |
| G3 | **Messenger CTA thiếu deeplink mobile** — Trên mobile, `m.me/` link có thể không mở app trực tiếp | 🟡 Trung bình | Dùng `https://m.me/PAGE_ID` + fallback URL |
| G4 | **Copyright ghi 2025** — Năm hiện tại là 2026 | 🟢 Nhỏ | Sửa thành 2026, hoặc dùng JS tự động lấy năm |
| G5 | **Thiếu Loading/Preloader** — Trang nặng animation có thể chớp trắng khi load | 🟡 Trung bình | Thêm preloader animation trước khi GSAP khởi tạo |
| G6 | **Chưa có Mobile Menu (Hamburger)** — Navbar sẽ vỡ trên mobile | 🔴 Cao | Thiết kế hamburger menu + slide-in drawer animation |
| G7 | **Collection CTA "Xem bộ sưu tập" dẫn đi đâu?** — Landing page chỉ 1 trang, không có trang con | 🟡 Trung bình | CTA scroll xuống section sản phẩm thuộc BST đó, hoặc mở modal |
| G8 | **Thiếu nội dung cụ thể cho BST** — Chưa có text mô tả chi tiết 2 bộ sưu tập | 🟡 Trung bình | Viết nội dung placeholder có ý nghĩa, dễ thay thế |
| G9 | **Chưa tính đến lazy loading ảnh** — Nhiều ảnh sản phẩm sẽ chậm trên 3G/4G | 🟡 Trung bình | Dùng `loading="lazy"` + LQIP (Low Quality Image Placeholder) |
| G10 | **Thiếu Schema.org structured data** — Google không hiểu đây là business/sản phẩm | 🟢 Nhỏ | Thêm JSON-LD: Organization + Product schema |
| G11 | **Chưa có Back-to-Top button** — Trang dài, khó quay lên đầu | 🟢 Nhẹ | Thêm floating button appear sau khi scroll |
| G12 | **Chưa xử lý GSAP trên mobile yếu** — Animation nặng gây lag trên điện thoại cũ | 🟡 Trung bình | Giảm animation trên mobile + `prefers-reduced-motion` |

---

## ✅ Success Criteria

- [ ] Trang load trong < 3 giây trên 4G
- [ ] Responsive hoàn hảo: Desktop / Tablet / Mobile
- [ ] Tất cả CTA hoạt động (Messenger link, Shopee link, scroll)
- [ ] GSAP animations mượt 60fps trên desktop
- [ ] Mobile menu hoạt động
- [ ] SEO meta tags đầy đủ (title, description, OG)
- [ ] Logo + ảnh dễ thay thế (có comment hướng dẫn)
- [ ] Social links placeholder sẵn sàng

---

## 🛠️ Tech Stack

| Tool | Lý do |
|------|-------|
| HTML5 Semantic | SEO + Accessibility, nhẹ nhất |
| CSS3 Custom Properties | Design tokens, dễ thay đổi palette |
| Vanilla JS (ES6+) | Không cần build tool, dễ quản lý |
| GSAP 3 + ScrollTrigger (CDN) | Premium animation, nhẹ ~30KB gzipped |
| Google Fonts (Playfair Display + Be Vietnam Pro) | Typography cao cấp, hỗ trợ VN |

---

## 📁 File Structure

```
e:\project\
├── index.html              Main landing page
├── css/
│   ├── variables.css       Design tokens
│   ├── base.css            Reset, typography, global
│   ├── components.css      Buttons, cards, badges, nav
│   ├── sections.css        Hero, story, collections, products, contact
│   └── animations.css      Keyframes, hover, scroll effects
├── js/
│   ├── main.js             Navbar, smooth scroll, mobile menu, preloader
│   └── animations.js       GSAP timelines, ScrollTrigger, parallax
└── assets/
    └── images/             AI-generated placeholder images
```

---

## 📋 Tasks

### Phase 1: Foundation (Design System)

- [ ] **T1**: Tạo `css/variables.css` — Design tokens (colors, fonts, spacing, border-radius, shadows)
  → Verify: Mở file, tất cả CSS custom properties có giá trị hợp lệ
  → Agent: `frontend-specialist` | Skill: `frontend-design`

- [ ] **T2**: Tạo `css/base.css` — CSS reset, typography scale, global styles, scroll-behavior
  → Verify: Import vào HTML, text hiển thị đúng font Be Vietnam Pro / Playfair Display
  → Agent: `frontend-specialist` | Skill: `frontend-design`

- [ ] **T3**: Tạo `css/components.css` — Buttons (primary/secondary/ghost), cards, badges "Khắc tên", social icons, hamburger menu
  → Verify: Tạo file HTML test, tất cả components render đúng
  → Agent: `frontend-specialist` | Skill: `frontend-design`

- [ ] **T4**: Tạo `css/animations.css` — CSS keyframes (gradient-shift, float, shimmer, fade), hover transitions, `prefers-reduced-motion`
  → Verify: Test hover effects trên các components
  → Agent: `frontend-specialist` | Skill: `frontend-design`

### Phase 2: HTML Structure

- [ ] **T5**: Tạo `index.html` — Full semantic HTML structure với 7 sections + SEO meta + OG tags + Schema.org JSON-LD + favicon + Google Fonts + GSAP CDN
  → Verify: Mở trên browser, tất cả sections hiển thị nội dung (chưa cần styled hoàn hảo)
  → Agent: `frontend-specialist` | Skill: `frontend-design`, `seo-fundamentals`
  → Depends: T1, T2, T3, T4

### Phase 3: Section Styling

- [ ] **T6**: Tạo `css/sections.css` — Style cho tất cả 7 sections:
  1. Navbar (fixed, transparent→solid, backdrop-blur, hamburger)
  2. Hero (fullscreen, gradient bg, centered text, CTAs)
  3. Brand Story (2-column layout)
  4. Collections (2 large cards, overlay, 3D perspective)
  5. Products (grid, product cards, badges)
  6. Why Vân Hoa (3 icon cards)
  7. Contact + Footer (CTA, social grid, copyright)
  → Verify: Trang trông đẹp trên desktop (1440px, 1024px) và mobile (375px)
  → Agent: `frontend-specialist` | Skill: `frontend-design`
  → Depends: T5

### Phase 4: Assets & Content

- [ ] **T7**: Generate placeholder images (AI) cho:
  - Hero background/pattern
  - 2 collection covers (Cội Nguồn, Giải Phóng)
  - 6 sản phẩm mẫu (3 mỗi BST: mix móc khóa + charm túi)
  - Brand story illustration
  - OG image (1200×630px)
  → Verify: Tất cả images load đúng trong HTML, `alt` text có ý nghĩa
  → Agent: `frontend-specialist`
  → Depends: T5

### Phase 5: JavaScript & Animations

- [ ] **T8**: Tạo `js/main.js` — Navbar scroll effect, smooth scroll, mobile menu toggle, preloader, back-to-top button, copyright year auto-update
  → Verify: Navbar đổi style khi scroll, menu mobile mở/đóng mượt, preloader ẩn sau load
  → Agent: `frontend-specialist`
  → Depends: T5, T6

- [ ] **T9**: Tạo `js/animations.js` — GSAP timelines:
  1. Hero text reveal (split text + stagger fade-up)
  2. Brand story slide-in (ScrollTrigger)
  3. Collections stagger + 3D tilt hover
  4. Products stagger fade-up (ScrollTrigger)
  5. Why Vân Hoa icon reveal + bounce
  6. Contact fade-up
  7. Floating decorative elements
  8. Mobile: giảm animation, disable parallax
  → Verify: Scroll qua trang, tất cả animations trigger đúng timing, mượt 60fps
  → Agent: `frontend-specialist` | Skill: `frontend-design`
  → Depends: T5, T6, T8

### Phase 6: Polish & Responsive

- [ ] **T10**: Responsive QA — Test & fix trên Desktop (1440/1024), Tablet (768), Mobile (375/320)
  - Fix layout breaks
  - Touch target sizes ≥ 44px
  - Mobile menu UX
  - Lazy loading images
  - Reduced animations on mobile
  → Verify: Browser resize test, không có layout break ở bất kỳ breakpoint nào
  → Agent: `frontend-specialist`
  → Depends: T6, T8, T9

---

## Phase X: Verification

- [ ] **V1**: Mở `index.html` trên browser → Tất cả sections hiển thị đúng
- [ ] **V2**: Resize browser → Responsive hoạt động (desktop/tablet/mobile)
- [ ] **V3**: Click tất cả CTA → Messenger link + Shopee link + scroll links hoạt động
- [ ] **V4**: Scroll toàn trang → Animations trigger đúng, mượt mà
- [ ] **V5**: Mobile menu → Mở/đóng hoạt động, animation mượt
- [ ] **V6**: View source → SEO meta tags, OG tags, JSON-LD có mặt
- [ ] **V7**: Kiểm tra comments hướng dẫn → Logo, social links, ảnh sản phẩm dễ thay thế
- [ ] **V8**: Test `prefers-reduced-motion` → Animations giảm/tắt

---

## Notes

- **Nội dung BST placeholder**: Mình sẽ viết nội dung có ý nghĩa cho 2 BST (Cội Nguồn + Giải Phóng) dựa trên ý nghĩa lễ hội. Bạn có thể chỉnh sửa sau.
- **Ảnh sản phẩm**: Dùng ảnh AI-generated tạm. Mỗi `<img>` tag sẽ có comment `<!-- THAY ẢNH: Đổi src thành đường dẫn ảnh thật -->`.
- **Logo**: Tag `<img>` có comment `<!-- LOGO: Đổi src thành logo của bạn -->`.
- **Social links**: Tất cả `href="#"` kèm comment `<!-- LINK: Thay # bằng URL thật -->`.
