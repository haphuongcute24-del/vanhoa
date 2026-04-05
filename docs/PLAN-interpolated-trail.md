# Kế hoạch Nội suy Bám đuôi Liên tục (Interpolated Comet Trail)

## 1. Mục tiêu (Goal)
- Chuyển đổi "Máy rải hạt" (Particle Emitter) từ dạng Rời rạc (1 hạt mỗi lần nhận diện) sang dạng Liền mạch (Rải đầy điểm giữa).
- Tạo ra một vệt sương lấp lánh nối liền không đứt đoạn ngọn hệt như đũa phép.

---

## 2. Vấn đề hiện tại (The Problem)
Trình duyệt chỉ quét tốc độ chuột (mousemove) khoảng 60 lần/giây. Nếu trong một khung hình (1/60s) người dùng vung tay quá nhanh đi được khoảng cách `80px`. Thuật toán cũ chỉ rớt MỘT hạt ở điểm cuối cùng `80px`. Điều này tạo ra một vệt đứt gãy gớm ghiếc (Mỗi hạt cách nhau 80px).

---

## 3. Thuật toán LERP (Linear Interpolation)
**Giải pháp:** Áp dụng Nội suy Toán học Tuyến tính.
Nếu khoảng cách giữa chu kỳ chuột trước và chu kỳ này là `80px` (ngưỡng sinh hạt là `8px`). GSAP sẽ tự động tính toán bù trừ: `80 / 8 = 10`. Nó sẽ rải đều tăm tắp `10` hạt chèn kín trên đường thẳng đi qua đoạn hõm 80px đó.

### File thực thi: `js/main.js`
**Quy trình Refactor trong `mousemove`:**
1. Tính `dist` (khoảng cách giữa chu kỳ cũ và mới).
2. Tính số lượng hạt cần chèn bù: `const amount = Math.floor(dist / 8);`
3. Cài chốt chặn an toàn `Math.min(amount, 15);` để hạn chế treo máy nếu user dùng màn hình siêu lớn và vuốt một dải 4000px.
4. Chạy vòng lặp `for (let i = 1; i <= amount; i++)`:
   - Tính hệ số `t = i / amount`.
   - Tìm tọa độ nội suy: `lerpX = lastX + (mouseX - lastX) * t;`
   - Gọi hàm `createParticle(lerpX, lerpY)` ở dọc quãng đường.

---

## 4. Agent đảm nhiệm
- `ux-engineer`: Lập trình thuật toán LERP bên trong vòng lặp hạt. Thiết lập chốt an toàn (Performance Cap) để FPS không bị tụt.
- `test-engineer`: Vuốt trỏ chuột ở tốc độ phản xạ để quay lại khoảnh khắc "Đuôi sao chổi" không bị đứt đoạn.

---

## 5. Verification Checklist
- [ ] Di chuột thật nhanh từ góc màn hình này sang góc màn hình kia tạo ra một dải sương liên kết. Không còn các hạt đơn lẻ rời rạc.
- [ ] Máy tính không bị giật lag khi xả hàng chục hạt bụi trong 1 khung hình.
