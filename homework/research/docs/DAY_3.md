# [Research](../README.md)

Research about Cocos.

[Back to main Readme](../../../README.md)

## Day 07 - Jun 02, 2025

### I. Singleton Pattern

#### **1. Singleton là gì?** 
Singleton là một design pattern thuộc nhóm Creational Patterns, đảm bảo rằng một class chỉ có duy nhất một instance trong suốt thời gian chạy của ứng dụng, đồng thời cung cấp một điểm truy cập toàn cục đến instance đó.

#### **2. Tại sao dùng Singleton?** 
Singleton giải quyết hai vấn đề chính:

- Đảm bảo chỉ có một instance duy nhất: Điều này hữu ích khi cần kiểm soát truy cập đến tài nguyên dùng chung, như kết nối database hoặc file.
- Cung cấp điểm truy cập toàn cục: Tương tự như biến toàn cục, nhưng an toàn hơn vì không cho phép ghi đè instance từ bên ngoài.
> Tuy nhiên, việc giải quyết hai vấn đề này trong cùng một class có thể sẽ vi phạm Single Responsibility Principle.

#### **3. Khi nào dùng Singleton?** 
Sử dụng Singleton khi:
- Cần một object duy nhất để điều khiển hoạt động trong toàn hệ thống.
- Muốn kiểm soát truy cập đến tài nguyên dùng chung.
- Cần một điểm truy cập toàn cục đến một instance cụ thể.

#### **4. Các trường hợp áp dụng Singleton?** 
Singleton thường được áp dụng trong các tình huống như:
- Quản lý kết nối database.
- Quản lý cấu hình của ứng dụng.
- Ghi log hoặc xử lý các sự kiện.
- Quản lý tài nguyên hoặc bộ nhớ cache.

#### **5. Ưu điểm và nhược điểm của Singleton?** 
**Ưu điểm:**
- Đảm bảo chỉ có một instance duy nhất.
- Cung cấp điểm truy cập toàn cục đến instance.
- Hỗ trợ lazy initialization.

**Nhược điểm:**
- Vi phạm Single Responsibility Principle.
- Khó khăn trong việc unit test do khó mock hoặc thay thế instance.
- Cần xử lý cẩn thận trong môi trường đa luồng để tránh tạo nhiều instance.

### II. State Pattern

#### **1. State là gì?** 
State Pattern là một design pattern thuộc nhóm Behavioral Patterns, dùng để cho phép object thay đổi hành vi của mình khi trạng thái nội bộ thay đổi. Thay vì sử dụng nhiều if-else hoặc switch, hành vi được chia nhỏ thành các trạng thái cụ thể.

#### **2. Tại sao dùng State?** 
- Tránh các if-else/switch dài dòng trong code.
- Tăng khả năng mở rộng và bảo trì dễ dàng.
- Dễ thêm trạng thái mới mà không làm thay đổi class gốc.

#### **3. Khi nào dùng State?** 
- Khi đối tượng có hành vi thay đổi tùy thuộc vào trạng thái của nó.
- Khi có nhiều if-else hoặc switch xử lý các hành vi theo trạng thái.
- Khi muốn tách biệt các logic trạng thái để dễ quản lý.

#### **4. Các trường hợp áp dụng State?** 
- Quái: "Idle", "Attack", "Flee", "Dead".
- Giao diện (Button): "Enabled", "Hovered", "Disabled".
- Nhân vật: "Walking", "Jumping", "Attacking"

#### **5. Ưu điểm và nhược điểm của State?** 
**Ưu điểm:**
- Trách các logic if-else dài dòng.
- Dễ thêm xóa trạng thái.

**Nhược điểm:**
- Có thể tạo nhiều lớp trạng thái dẫn đến việc tốn bộ nhớ.
- Code ban đầu phức tạp hơn cách dùng if-else và switch-case.


### III. Observer Pattern

#### **1. Observer là gì?** 
Là một design pattern cho phép một object phát một sự kiện, và nhiều đối tượng khác có thể nhận và xử lý khi sự kiện đó xảy ra.

#### **2. Tại sao dùng Observer?** 
- Giảm sự phụ thuộc với nhau
- Cho phép mở rộng linh hoạt mà không chỉnh sửa code gốc.

#### **3. Khi nào dùng Observer?** 
- Khi nhiều phần của hệ thống cần phản ứng với thay đổi từ một sự kiện nào đó.
- Khi cần truyền thông tin thời gian thực (Cập nhật UI, game events).

#### **4. Các trường hợp áp dụng Observer?** 
- Phát sự kiện như "player-died", "button-clicked".
- Thông báo hoặc logging.

#### **5. Ưu điểm và nhược điểm của Observer?** 
**Ưu điểm:**
- Rất linh hoạt và mở rộng.
- Dễ tách biệt logic giữa các component.
- Dễ quản lý sự kiện toàn cục trong game.

**Nhược điểm:**
- Khó debug nếu nhiều nơi lắng nghe cùng một sự kiện.
- Nếu quên tắt sự kiện khi destroy có thể gây memory leak.



### IV. Flyweight Pattern

#### **1. Flyweight là gì?** 
Flyweight Pattern là design pattern thuộc nhóm Structural Patterns, dùng để tối ưu bộ nhớ bằng cách chia sẻ các object giống nhau, thay vì tạo bản sao mới mỗi lần. Mục tiêu là tái sử dụng các object chung, đặc biệt khi bạn có quá trời quá đất object giống hệt nhau (ví dụ: particle, đạn, quái).

#### **2. Tại sao dùng Flyweight?** 
- Giảm lượng bộ nhớ tiêu hao khi có nhiều object giống nhau.
- Tăng hiệu năng bằng cách tránh tạo và hủy object liên tục.
- Hữu ích khi tái sử dụng prefab và pooling.
#### **3. Khi nào dùng Flyweight?** 
- Khi có rất nhiều object lặp đi lặp lại (ví dụ: đạn, hiệu ứng, quái, vật phẩm).
- Khi tạo đối tượng mới tốn nhiều tài nguyên (hiệu suất hoặc bộ nhớ).
- Khi FPS giảm vì Garbage Collection.

#### **4. Các trường hợp áp dụng Flyweight?** 
Các node như đạn, particle, hiệu ứng... thường được tạo lặp đi lặp lại → sử dụng cc.NodePool (hoặc quản lý thủ công bằng instantiate, setActive) để tái sử dụng node thay vì tạo mới.

#### **5. Ưu điểm và nhược điểm của Flyweight?** 
**Ưu điểm:**
- Tối ưu hiệu năng, giảm lag khi nhiều node xuất hiện.
- Giảm memory leak vì tránh tạo và hủy liên tục.
- Dễ bảo trì khi dùng kèm với Prefab.


**Nhược điểm:**
- Nếu không reset state của node trước khi tái sử dụng có thể dẫn đến bug.
- Cần dọn sạch reference nếu node còn bị ảnh hưởng bởi logic cũ.



### V. Command Pattern

#### **1. Command là gì?** 
Command Pattern là design pattern thuộc nhóm Behavioral Patterns, cho phép biến các hành động thành object. Mỗi hành động như "di chuyển", "bắn", sẽ được đóng gói thành một command riêng biệt.

#### **2. Tại sao dùng Command?** 
- Giúp phân tách logic gọi hành động và logic thực thi hành động.
- Dễ tổ chức hành vi phức tạp như undo, redo, macro, replay.
- Tăng khả năng lưu lại lịch sử của hành động (hữu ích trong game logic hoặc editor tool).

#### **3. Khi nào dùng Command?** 
- Khi cần xử lý undo/redo trong game, ví dụ: map editor,...
- Khi cần ghi lại hành động của người chơi để replay.
- Khi muốn lập trình combo skill hoặc thực hiện hành động theo thứ tự.

#### **4. Các trường hợp áp dụng Command?** 
- Game như turn-based strategy (bước đi → command).
- Action queue (nhiều enemy cùng nhận lệnh và hành động).
- Tạo macro recording – ghi và phát lại hành động.
- Map editor: lưu thao tác kéo thả object, rồi cho phép undo.

#### **5. Ưu điểm và nhược điểm của Command?** 
**Ưu điểm:**
- Dễ mở rộng command mới mà không sửa code cũ.
- Dễ quản lý thao tác người dùng: ghi lại, phát lại, hoàn tác.
- Rất hữu ích cho các công cụ tích hợp trong game (editor, map builder).

**Nhược điểm:**
- Cần quản lý logic state rõ ràng để tránh lỗi.