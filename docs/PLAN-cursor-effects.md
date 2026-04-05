# Kế hoạch Nâng cấp Hiệu ứng Chuột (Gắn Vật lý & Pháo hoa)

## 1. Mục tiêu (Goal)
Tích hợp trải nghiệm chạm vật lý cao cấp vào Custom Cursor của Vân Hoa:
- **Tương tác Gió (Wind Velocity):** Cánh hoa và bụi lấp lánh nương theo lực vuốt chuột (dựa trên tốc độ di chuyển) để văng ra các hướng tương ứng.
- **Bùng nổ khi Click (Burst Effect):** Tạo ra vụ nổ gồm mười mấy hạt lấp lánh (Confetti) bung tỏa thành vòng tròn mỗi khi nhấp chuột.

---

## 2. Bước thực hiện (Task Breakdown)

### Phase 1: Thêm hệ thống Click Burst (Pháo Hoa)
- **File:** `js/main.js` (Bên trong module Custom Cursor)
- **Hành động:** 
  - Lắng nghe event `window.addEventListener('click', ...)` hoặc `mousedown`.
  - Khi click: Sử dụng vòng lặp `for` sinh ra `15` hạt `.sparkle-particle` và `2-3` hạt `.petal-particle`.
  - **Thuật toán GSAP:** Tính toán góc ngẫu nhiên (từ 0 đến 360 độ) bằng `Math.cos()`, `Math.sin()` để bắn các hạt văng tỏa ra theo hình cầu (bán kính tản mác ~ 60px - 100px) với `ease: "expo.out"` nhanh ở lúc nổ, và chậm tự do lúc rơi rụng. Sau đó `onComplete` xóa DOM.

### Phase 2: Áp dụng Vật lý & Gia tốc Tốc độ (Wind Momentum)
- **File:** `js/main.js`
- **Hành động:**
  - Trong sự kiện `mousemove`, đo lường gia tốc: 
    ```javascript
    let deltaX = mouseX - lastParticleX;
    let deltaY = mouseY - lastParticleY;
    ```
  - Thay vì cho hạt rơi cố định phương thẳng đứng (`endX`, `endY` cố định), truyền thẳng lực `deltaX` và `deltaY` (có nhân hệ số hãm ~0.5) vào GSAP để "thúc" hạt bay văng chéo theo hướng tay khách hàng đang vuốt. Vuốt tay sang phải -> hạt và hoa bay thốc sang phải!

---

## 3. Quản lý Hiệu Năng (Performance Protection)
- Pháo hoa lúc Click sinh ra nhiều hạt cùng lúc, vì vậy GSAP phải sử dụng Timeline hoặc Batching để không làm nghẽn Main Thread.
- Các hạt sinh ra phải TUYỆT ĐỐI bị xóa bỏ trên biểu đồ DOM khi chạm mức `opacity: 0`.

---

## 4. Agent đảm nhiệm
- `ux-engineer`: Phụ trách toàn bộ toán học (Sin, Cos) của hình học không gian và GSAP timelines.
- `test-engineer`: Đánh giá 60 FPS sau khi đưa hiệu ứng vào thực tế.

---

## 5. Verification (Checklist)
- [ ] Khi click chuột vào bất cứ đâu (khoảng trống hay button), sương lấp lánh sẽ bắn tóe ra như pháo bông.
- [ ] Khi vuốt chuột cực mạnh sang phải/trái, cánh hoa và bụi sẽ bay thốc (hất văng) theo hướng vuốt rồi mới rơi lả lướt xuống.
- [ ] Chạy Smooth 60 FPS không khựng giật.
