# [Research](../README.md)

Research about Cocos.

[Back to main Readme](../../../README.md)

## Day 04 - May 27, 2025

### 1. TRIMMED và RAW trong Size Mode của Sprite

**TRIMMED và RAW là gì?** 
- **TRIMMED**: Là chế độ mà kích thước của node Sprite được tự động điều chỉnh để phù hợp với phần hình ảnh đã được cắt bỏ các pixel trong suốt xung quanh.
- **RAW**: Là chế độ mà kích thước của node Sprite giữ nguyên kích thước gốc của texture, bao gồm cả các pixel trong suốt xung quanh.

**Tại sao dùng TRIMMED và RAW?** 
- **TRIMMED**:
  - Giúp loại bỏ các pixel trong suốt không cần thiết, **giảm kích thước node và tối ưu hóa hiệu suất**.
  - Phù hợp cho các hình ảnh tĩnh hoặc khi **không cần giữ nguyên kích thước gốc** của texture.
- **RAW**:
  - Giữ nguyên kích thước gốc của texture, bao gồm cả các pixel trong suốt, giúp **đảm bảo sự nhất quán về vị trí và kích thước** trong các animation.
  - Phù hợp cho các animation **sử dụng Atlas**, nơi mỗi frame có thể có vị trí hoặc kích thước khác nhau trong texture gốc, và cần giữ nguyên vùng ảnh gốc để **đảm bảo hiển thị chính xác**.

**Khi nào dùng TRIMMED và RAW?** 
- **TRIMMED**:
  - Khi muốn **tối ưu hóa hiệu suất** bằng cách loại bỏ các pixel trong suốt không cần thiết.
  - Khi hình ảnh **không yêu cầu giữ nguyên kích thước gốc** của texture.
- **RAW**:
  - Khi **cần giữ nguyên kích thước gốc** của texture để đảm bảo sự nhất quán trong các animation.

**Cách dùng TRIMMED và RAW?** 
1. Chọn node có **component Sprite** trong Cocos Creator.
2. Trong bảng **Properties**, tìm thuộc tính **Size Mode.**
3. Chọn một trong các option sau:
   - **TRIMMED**: Để tự động điều chỉnh kích thước node theo phần hình ảnh đã được cắt bỏ các pixel trong suốt.
   - **RAW**: Để giữ nguyên kích thước gốc của texture, bao gồm cả các pixel trong suốt.
   - **CUSTOM**: Để tự đặt kích thước node theo ý muốn.


### **KIẾN THỨC NGOÀI LỀ**
#### 1. TRIMMED có thể gây “mất căn chỉnh” trong animation
Khi tạo animation bằng nhiều sprite frames khác nhau (vd bằng Atlas), nếu dùng TRIMMED, các frame sẽ:
- Có kích thước node thay đổi
- Không giữ được vị trí cố định trên màn hình
  > ➡️ Kết quả là hiệu ứng animation bị giật, nhảy hoặc méo lệch khung hình, trông không được đẹp.

#### 2. RAW giữ đúng vị trí nhưng tốn nhiều không gian “vô hình”
Khi dùng RAW, node sprite giữ nguyên kích thước gốc của texture (gồm luôn pixel trong suốt). Điều này giúp:
- Animation mượt mà
- Canh vị trí chính xác
  > ➡️ Kết quả là kích thước node lớn hơn thực tế → ảnh hưởng đến hệ thống va chạm (collider), layout, hoặc chạm màn hình nếu không căn chỉnh kỹ.

#### 3. RAW + Auto Trim
Theo mình research thì có một số trường hợp **bật tính năng Auto Trim** trong Atlas, nhưng lại để **Size Mode là RAW**.
> ➡️ Kết quả là việc TRIM trong Atlas không có tác dụng, vì RAW vẫn giữ kích thước ảnh gốc → tốn bộ nhớ mà không được lợi ích gì từ việc TRIM.

#### 4. Thay đổi Size Mode bằng script
```
this.getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.RAW;
```

##

### 2. Tạo Progress Bar hình tròn và fill theo hình tròn (fill xoay như kiểu kim đồng hồ)
1. Tạo Progress Bar:
   - Create → Create UI Nodes → Node With ProgressBar

    <!-- TREEVIEW START -->
    ```bash
    └── CircleProgressBar
        └── Bar
    ```
    <!-- TREEVIEW END -->

2. Điều chỉnh kích thước của cả 2 node cho đồng bộ (vd 500x500).
3. Điều chỉnh anchor của node CircleProgressBar và node Bar sang (0.5, 0.5) và position sang (0, 0).
4. Trong component ProgressBar của node CircleProgressBar, chọn:
   - **Mode** = FILLED
   - **Total Length** = 1
5. Trong component Sprite của node Bar, chọn:
   - **Type** = FILLED
   - **Fill Type** = RADIAL
   - **Fill CENTER** = (0.5, 0.5) - tâm của 2 node
6. Mặc định progress bar sẽ bắt đầu từ hướng 3H, và xoay ngược chiều kim đồng hồ.
   - Nếu muốn progress bar bắt đầu từ hướng 12H và xoay theo chiều kim đồng hồ thì, :
     - Trong node Bar, Set **Rotation = 90**
     - Trong node CircleProgressBar, vào ProgressBar component **Chọn Reverse**
7. (Tùy chọn) Thay đổi Sprite Frame
   - Kéo sprite từ asset vào Sprite Frame của node CircleProgressBar và node Bar
   - Thay đổi màu của node Bar sang đen
   - Set **Opacity = 150**

### **Kết quả**
<img src="../../../image/Research_2.gif" width="100%"/>
