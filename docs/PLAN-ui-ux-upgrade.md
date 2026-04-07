# Kế hoạch Nâng cấp UI/UX, Logo và Custom Cursor

## Mục tiêu (Goal)
Đưa trải nghiệm UI/UX của Vân Hoa lên chuẩn Awwwards Premium bằng cách:
1. Tạo một SVG Inline Logo độc bản (Họa tiết hoa đào 5 cánh + đường vân thủ công) thay thế cho text text/placeholder.
2. Nâng cấp toàn diện hoạt ảnh Hover cho Nút bấm và Thẻ sản phẩm.
3. Thay thế trỏ chuột mặc định bằng hệ thống Custom Cursor (Dot + Vòng sáng) tích hợp GSAP để hít từ tính và "nở rộ" thành hoa đào khi tương tác.

---

## Các thay đổi chi tiết (Task Breakdown)

### 1. Brand Logo (Hoa Đào Vân Hoa)
- **File**: `index.html`, `css/components.css`
- **[NEW]**: Viết một file thiết kế ảnh Vector (SVG) thuần bằng code gồm:
  - 5 cánh hoa đào được sắp xếp đối xứng.
  - Các đường pattern mỏng rẽ nhánh bên trong cánh hoa tạo cảm giác "vân da".
  - Chữ "Vân Hoa" Serif sang trọng nằm bên cạnh.
- **[MODIFY]**: Thay thế vào 2 vị trí Navbar và Footer.

### 2. Nâng cấp Hover Effects
- **File**: `css/components.css`, `css/animations.css`
- **[MODIFY]**: Buttons (`.btn--primary`, `.btn--secondary`)
  - Thêm phần tử giả `::after` tạo dải sáng bóng (Shine/Glass reflection).
  - Viết keyframe `@keyframes shine` để dải sáng lướt qua khi hover.
- **[MODIFY]**: Cards (`.product-card`, `.collection-card`)
  - Bổ sung hiệu ứng Tilt (Nâng trục Z) để tạo chiều sâu thay vì translateY đơn thuần.

### 3. Custom Cursor & Magnetic Bloom
- **File**: `index.html`, `css/base.css`, `css/components.css`, `js/animations.js` hoặc `js/main.js`
- **[MODIFY]**: `css/base.css` -> Ẩn trỏ chuột mặc định trên Desktop (`cursor: none;`).
- **[NEW]**: Thêm cấu trúc HTML cho Cursor vào cuối trang:
  ```html
  <div class="cursor-dot"></div>
  <div class="cursor-follower">
     <!-- Nơi chứa SVG đóa hoa đào nở rộ ẩn -->
  </div>
  ```
- **[NEW]**: Viết logic GSAP trong JS (Mousemove Event):
  - `.cursor-dot` dính chặt theo tọa độ X, Y của chuột (không delay).
  - `.cursor-follower` chạy theo tọa độ X, Y nhưng có delay (Gsap QuickToter/Lerp) tạo vệt mượt mà.
- **[NEW]**: Viết logic Magnetic (Hít từ tính):
  - Bắt sự kiện `mouseenter` trên thẻ `a, button, .card`.
  - Phóng to `.cursor-follower`, làm mờ viền, show hình dạng bông hoa đào rực rỡ lên và hít vào vị trí trung tâm của nút bấm.

---

## Agent đảm nhiệm
- `frontend-specialist`: Thiết kế CSS Hover Shiny và CSS Custom cursor. Đặc biệt chịu trách nhiệm vẽ SVG Logo bằng code (Path/Bezier).
- `ux-engineer`: Lập trình GSAP để tính toán logic tọa độ 마우스 (Mouse X/Y) cho hiệu ứng Magnetic và Follower.

---

## Verification (Checklist)
- [ ] SVG Logo có vẻ đẹp tinh xảo, nét chữ rõ ràng.
- [ ] Hover nút bấm hiện dải sáng (Shine quét ngang).
- [ ] Chuột mặc định bị ẩn.
- [ ] Con trỏ chuột mới bằng chấm tròn lướt mượt mà không bị khựng (Lag).
- [ ] Khi rê chuột vào Nút, vòng trỏ chuột biến hình thành hoa đào và hít vào nút đó.
- [ ] Tính năng Custom cursor CHỈ chạy trên Desktop (max-width: 1024px trở lên), di động tự động bỏ qua để cho phép vuốt tay.
