# Lập kế hoạch triển khai Hero Section - Floating Polaroids

## Mục tiêu (Goal)
Cải tiến Hero Section hiện tại: xóa bỏ các bóng mờ CSS tròn đơn điệu và thay thế bằng các khung ảnh Polaroid (chứa ảnh thật của sản phẩm charm). Các khung ảnh này sẽ được làm hiệu ứng trôi nổi (floating) xung quanh nội dung chữ chính, mang đến cảm giác "cute", thủ công và mộng mơ.

---

## Các thay đổi chi tiết (Task Breakdown)

### 1. HTML (`index.html`)
- **[DELETE]**: Xóa bỏ các div có class `hero__decoration` (các khối tròn gradient mờ).
- **[NEW]**: Thêm vào Hero section một cấu trúc div `.hero__polaroids` chứa 4 thẻ ảnh Polaroid.
  - Mỗi thẻ Polaroid sẽ sử dụng các ảnh placeholder có sẵn (ví dụ: `product-keychain-1.png`, `product-bagcharm-1.png`, `collection-coinguon.png`, `collection-giaiphong.png`).
  - Gán vị trí cho 4 ảnh: Trên-trái, Dưới-trái, Trên-phải, Dưới-phải so với cụm chữ trung tâm.

### 2. CSS - Kiểu dáng (`css/components.css`)
- **[NEW]**: Định nghĩa class `.polaroid-img`:
  - Viền màu trắng dày (khoảng 8px-12px) để tạo hình khung ảnh vật lý.
  - Đổ bóng nhẹ nhàng để tách biệt khỏi nền gradient (`box-shadow`).
  - Góc bo tròn cực nhẹ (2px-4px) để tránh bén nhọn nhưng vẫn giữ được nét ảnh gốc.
  - Xoay nghiêng gốc (Transform rotate ngẫu nhiên: -5deg, 8deg, -3deg...).

### 3. CSS - Bố cục (`css/sections.css`)
- **[MODIFY]**: Chỉnh sửa `.hero` lại để các tấm Polaroid rớt vào định vị absolute.
  - Setup z-index sao cho có tấm ảnh bị chữ đè lên và có tấm ảnh nằm chờ bên ngoài biên.
  - Trên màn hình Mobile: Thu nhỏ kích thước Polaroid và ẩn bớt 2 tấm để không chèn lên che khuất chữ.

### 4. Animation (`css/animations.css` & `js/animations.js`)
- **[NEW]**: Thêm `@keyframes floating-polaroid` đe hiệu ứng bay lơ lửng, nhấp nhô liên tục (Infinite Loop).
- **[MODIFY]**: Cập nhật hàm `initHeroAnimation()` trong `animations.js` để làm hiệu ứng xuất hiện (Entrance animation): các Polaroid rớt từ trên xuống, xoay nhẹ trước khi bắt đầu lơ lửng.

---

## Agent đảm nhiệm
- `frontend-specialist`: Thiết kế CSS (bóng đổ, khung Polaroid) và cấu trúc HTML. Đảm bảo tính responsive trên mobile theo tiêu chuẩn cao cấp.
- Tái sử dụng `animations.js` setup từ trước để chỉnh sửa GSAP.

---

## Checklist Kiểm tra (Verification)
- [ ] 4 tấm hình polaroid hiển thị rõ nét viền trắng.
- [ ] Không có tấm hình nào che mất nội dung chữ ký tự ở giữa màn hình (nhất là trên Mobile).
- [ ] Hiệu ứng lơ lửng mượt mà (không bị giật khung hình).
- [ ] Mobile view: Các hình ảnh scale hợp lý.
