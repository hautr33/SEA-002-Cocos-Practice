# [Research](../README.md)

Research about Cocos.

[Back to main Readme](../../../README.md)

## Day 02 - May 21, 2025

### 1. Research about Wrap mode, Filter Mode and Premultiply Alpha
**Warp Mode**: Chế độ lặp ảnh mà Cocos xử lý khi hình ảnh bị vẽ rộng hơn ảnh gốc (tọa độ UV vượt ra khỏi phạm vi [0,1]). 

Ví dụ: Ta có một tấm ảnh 100x100 px, và vẽ ra một vùng với kích thước 500x500 px. Vì là ảnh 100x100 px không thể nào vẽ được hết trên 500x500 px, nên Warp Mode sẽ quyết định engine vẽ như thế nào.

Warp Mode có 2 chế độ chính
- **Clamp** - Không cho vẽ thêm: Tức là nếu ảnh không đủ lớn thì engine sẽ kéo dài phần pixel rìa của ảnh để lấp hết phần còn trống.
- **Repeat** - Lặp lại ảnh: Tức là khi ảnh nhỏ hơn vùng cần vẽ thì engine sẽ vẽ lại ảnh để bổ sung phần còn trống.

Ứng dụng của Warp Mode:
- Clamp: Khi dùng ảnh UI hoặc sprite được cắt ra từ atlas.
- Repeat: Khi dùng background cần chuyển động vô hạn khi nhân vật di chuyển, khi dùng 1 sprit nhỏ để vẽ 1 vùng lớn ví dụ như nền gạch và các cột trong game Mario.


**Filter Mode**: Khi kích thước ảnh hiển thị khác với ảnh gốc, engine cần tính toán màu của từng pixel từ ảnh gốc.Filter Mode được dùng để quyết định cách mà engin lấy màu tại mỗi pixel.

Filter Mode có 3 chế độ chính:
- **Point**: Engine sẽ chọn màu từ pixel gần nhất mà không cần tính toán màu, cho nên chế độ này rất nhanh, nhưng vì không cần tính toàn màu nên khi thu phóng ảnh sẽ bị răng cưa.
- **Bilinear**: Engine sẽ chọn màu từ 4 pixel gần nhất và tính trung bình để ra được màu cần vẽ, dẫn đến các pixel được vẽ ra sẽ tạo cảm giác mềm mại, mượt mà hơn là **Point**. Tuy nhiên do phải tính giá trị trung bình từ 4 pixel gần nhất nên sẽ tốn nhiều tài nguyên hơn so với **Point**
- **Trilinear**: Engine sẽ chọn 2 mipmap (các phiên phản nhỏ hơn của ảnh gốc), trong đó có 1 mipmap nhỏ hơn và 1 mipmap lớn hơn. Sau đó sẽ dùng **Bilinear** trên 2 mipmap đó và sẽ ra được 2 màu, từ 2 màu này sẽ tính ra được màu của pixel cần vẽ. Nhờ đó mà Trilinear sẽ cho ra được hình ảnh có mượt mà nhất trong 3 chế độ, đặc biệt là các task liên quan đến zoom in, zoom out. Tuy nhiên, vì tính toán khá nhiều nên chế độ này cũng tốn nhiều tài nguyên nhất trong 3 chế độ.

**Premultiply Alpha**: là cách lưu trữ màu pixel trong đó giá trị màu của pixel là màu RGB nhân với giá trị Alpha (độ trong suốt).

Ví dụ: Bình thường giá trị của pixel là (R, G, B, A), pixel sẽ giữ nguyên màu RGB gốc và Alpha chỉ ảnh hưởng khi render. Sau khi áp dụng premultiply alpha pixel được lưu sẽ là (R×A, G×A, B×A, A), pixel sẽ lưu giá trị RGB được pha trộn với Alpha.

Bởi vì khi render ảnh trong suốt, nếu không dùng Premultiply Alpha thì vùng trong suốt đó có thể xuất hiện viền trắng, đen hoặc là nhiễu màu của màu RGB gốc.
### 2. Research about Auto Atlas
**Auto Atlas** là một tính năng mà Cocos giúp ta tự động gộp nhiều hình ảnh thành một ảnh lớn duy nhất (gọi là sprite sheet) khi build project. Và khi dùng thì engine chỉ cần tải mỗi sprite sheet này lên, điều này sẽ giúp cho tối ưu hiệu suất khi render vì sẽ giảm được số lần vẽ (draw call).

Các property:
- **Max Width / Max Height**: Kích thước tối đa của atlas.
- **Padding**: Khoảng cách giữa các ảnh trong atlas.
- **Allow Rotation**: Cho phép xoay ảnh để tối ưu không gian.
- **Force Squared**: Ép atlas thành hình vuông.
- **Power Of Two**: Ép kích thước atlas là lũy thừa của 2 (sẽ tốt cho một vài GPU).
- **Heuristics**: Thuật toán sắp xếp ảnh, bao gồm:
  - BestShortSideFit
  - BestLongSideFit
  - BestAreaFit
  - BottomLeftRule
  - ContactPointRule
- **Padding Bleed**: Thêm viền 1 pixel để tránh viền trắng khi scale (còn gọi là "Extrude").
- **Filter Unused Resources**: Loại bỏ ảnh không được sử dụng khỏi atlas khi build. Tuy nhiên property này chỉ thực hiện khi build, còn preview thì sẽ không.


**Bổ sung: Max Width / Max Height có giới hạn 2048**: Trong Auto Atlas của Cocos  hai thuộc tính này bị giới hạn 2048 là do giới hạn phần cứng của GPU, đặc biết là các thiết bị smart phone hoặc GPU đời cũ. Nhiều thiết bị chỉ hỗ trợ maximum texture size là 2048x2048 px. Nếu vượt quá giới hạn này sẽ dẫn đến không thể load hoặc render, làm cho game bị crash. Ngoài ra, khi dùng Auto Atlas gộp ra ảnh vượt quá 2048x2048 px thì Cocos sẽ tự chia thành Atlas có kích thước nhỏ hơn.