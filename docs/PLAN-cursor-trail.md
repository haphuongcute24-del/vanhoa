# Kế hoạch Thiết kế Mouse Trail (Sương Lấp Lánh & Hoa Rơi)

## Mục tiêu (Goal)
Nâng cấp hệ thống Custom Cursor (Đã có Magnetic Bloom) bằng cách:
1. Đổi con trỏ mặc định (chấm tròn) thành hình dáng **1 cánh hoa đào**.
2. Thêm hiệu ứng particle emitting (Bụi sương lấp lánh + Cánh hoa rơi) khi di chuột.

---

## Các thay đổi chi tiết (Task Breakdown)

### 1. Thay đổi Trỏ chuột mặc định thành Cánh hoa
- **File**: `index.html`, `css/base.css`
- **[MODIFY]**: Chỉnh sửa HTML của `.cursor-dot`. Thay vì là `<div>` rỗng, ta chèn thẻ `<svg>` vẽ 1 cánh hoa đào nhỏ.
- **[MODIFY]**: CSS `.cursor-dot` đổi thông số background thành `transparent` vì bây giờ màu sắc sẽ do SVG fill quyết định.

### 2. Style cho Hạt lấp lánh (Sparkle Dust) và Hoa rơi (Falling Petals)
- **File**: `css/animations.css` hoặc `css/components.css`
- **[NEW]**: Thêm CSS Classes:
  - `.sparkle-particle`: Chấm tròn nhỏ xíu (2px-3px), có `box-shadow` phát sáng màu hồng nhạt/vàng ánh kim `--color-primary`.
  - `.petal-particle`: Chứa background là SVG cánh hoa nhỏ, `opacity: 0.8`.

### 3. Logic sinh Hạt (Particle Emitter Engine) bằng GSAP
- **File**: `js/main.js` (Bên trong hàm `initCustomCursor`)
- **[NEW]**: Viết một hàm `createTrailParticle(x, y)`:
  - Hàm này được gọi liên tục bên trong sự kiện `mousemove`. Để chống lag phần cứng (Performance Optimization), sử dụng kỹ thuật "Throttle" hoặc đếm khung hình (Chỉ sinh ra hạt nếu chuột di chuyển qua 1 đoạn pixel nhất định, ví dụ: 20px).
  - Tỉ lệ random: **90%** là hạt lấp lánh, **10%** là hạt cánh hoa rơi.
- **[NEW]**: Hoạt ảnh (GSAP Animation) cho hạt:
  - **Sparkle Particle**: Tỏa ra ngẫu nhiên (Offset X/Y +-10px), mờ dần (opacity -> 0) và biến mất sau 0.5s.
  - **Petal Particle**: Trôi lơ lửng xuống dưới (translateY 30-50px), bay lắc lư (rotate random -90 đến 90 độ), và biến mất sau 1.5s - 2s.
- **[CRITICAL]**: DOM Cleanup - Luôn gắn đoạn rác `element.remove()` vào hook `onComplete` của GSAP để làm sạch rác trên trình duyệt, chống tràn RAM.

---

## Agent đảm nhiệm
- `frontend-specialist`: Sửa CSS/HTML của chấm Cursor thành cánh hoa và styling các class hạt.
- `ux-engineer`: Lập trình Engine sinh cấu trúc Hạt lấp lánh & Hoa bay (JS Particle Emitter) tích hợp DOM Cleanup. 

---

## Verification (Checklist)
- [ ] Trỏ chuột mặc định hiện là hình 1 cánh hoa màu hồng lợt/gold.
- [ ] Khi rê chuột, có bụi nhũ vàng lấp lánh chạy theo sau.
- [ ] Thỉnh thoảng có cánh hoa mảnh dẻ rơi lả tả xuống màn hình khi di chuột.
- [ ] Bật Inspector (DevTools) > Elements để đảm bảo rác sau khi rơi xong sẽ biến mất khỏi mã HTML.
