(function () {
  "use strict";

  const categories = {
    housing: `관리비 고지서를 어디에서 확인할 수 있나요?|Tôi có thể xem hóa đơn phí quản lý ở đâu?
계약 갱신 조건을 미리 알려 주세요.|Vui lòng báo trước cho tôi điều kiện gia hạn hợp đồng.
보증금 반환 일정이 어떻게 되나요?|Lịch hoàn trả tiền đặt cọc thế nào?
수도 요금이 평소보다 많이 나왔어요.|Tiền nước tháng này cao hơn bình thường.
난방이 작동하지 않아 점검을 부탁드려요.|Hệ thống sưởi không hoạt động, mong anh chị kiểm tra giúp.
세탁기에서 이상한 소리가 나요.|Máy giặt phát ra tiếng lạ.
벽에 작은 누수 자국이 보여요.|Tôi thấy một vết thấm nước nhỏ trên tường.
오늘은 집에 사람이 없으니 내일 와 주세요.|Hôm nay không có ai ở nhà, vui lòng đến vào ngày mai.
수리 전에 예상 비용을 알려 주세요.|Vui lòng báo chi phí dự kiến trước khi sửa.
현관 열쇠를 하나 더 만들고 싶어요.|Tôi muốn làm thêm một chìa khóa cửa ra vào.
관리비에 수도 요금도 포함돼 있나요?|Phí quản lý đã bao gồm tiền nước chưa?
이사 날짜를 다음 주로 조정할 수 있을까요?|Có thể đổi ngày chuyển nhà sang tuần sau không?
엘리베이터 사용 시간을 확인하고 싶어요.|Tôi muốn kiểm tra giờ sử dụng thang máy.
재활용품을 버리는 장소를 알려 주세요.|Vui lòng cho biết nơi bỏ đồ tái chế.
택배를 경비실에 맡겨 주실 수 있나요?|Có thể gửi bưu kiện ở phòng bảo vệ giúp tôi không?
주차 등록을 갱신해야 해요.|Tôi cần gia hạn đăng ký đỗ xe.
이웃에게 소음이 들리는지 확인해 볼게요.|Tôi sẽ hỏi hàng xóm xem họ có nghe thấy tiếng ồn không.
계약서 사본을 이메일로 보내 주세요.|Vui lòng gửi bản sao hợp đồng qua email.
보일러 온도를 조금 낮춰도 될까요?|Tôi hạ nhiệt độ lò sưởi xuống một chút được không?
방문 수리 시간을 오후로 바꿀 수 있나요?|Có thể đổi lịch thợ đến sửa sang buổi chiều không?
창문 잠금장치가 느슨해졌어요.|Chốt khóa cửa sổ bị lỏng rồi.
가스 점검 날짜를 예약하고 싶어요.|Tôi muốn đặt lịch kiểm tra gas.
공동 공간에 개인 물건을 두면 안 돼요.|Không được để đồ cá nhân ở khu vực chung.
현관문이 닫혔는지 확인해 주세요.|Vui lòng xác nhận cửa chính đã đóng chưa.
수도를 잠갔는데도 물이 계속 나와요.|Tôi đã khóa vòi mà nước vẫn chảy.
이 방은 햇빛이 잘 들어오나요?|Phòng này có đón nhiều ánh nắng không?
장기 주차 요금이 따로 있나요?|Phí đỗ xe dài hạn có tính riêng không?
보증 기간이 언제까지인지 확인해 주세요.|Vui lòng kiểm tra thời hạn bảo hành đến ngày nào.
수리 기사님이 도착하면 전화해 주세요.|Hãy gọi cho tôi khi thợ sửa đến.
입주 점검표를 함께 확인하고 싶어요.|Tôi muốn cùng kiểm tra danh sách kiểm tra khi nhận nhà.`,
    finance: `카드 결제 한도를 올리고 싶어요.|Tôi muốn tăng hạn mức thanh toán thẻ.
이번 달 자동 이체가 정상 처리됐나요?|Khoản chuyển tiền tự động tháng này đã được xử lý bình thường chưa?
해외 송금 수수료가 얼마인지 알려 주세요.|Vui lòng cho tôi biết phí chuyển tiền quốc tế là bao nhiêu.
계좌 거래 내역을 최근 석 달분으로 출력해 주세요.|Vui lòng in sao kê tài khoản của ba tháng gần đây.
체크카드가 승인되지 않았어요.|Thẻ ghi nợ của tôi không được chấp nhận.
잔액 증명서를 발급받고 싶어요.|Tôi muốn xin cấp giấy xác nhận số dư.
대출 금리를 고정형으로 바꿀 수 있나요?|Tôi có thể đổi lãi suất khoản vay sang loại cố định không?
이자 납부일을 다음 주로 미룰 수 있을까요?|Tôi có thể lùi ngày trả lãi sang tuần sau không?
예금 만기일에 자동으로 재예치되나요?|Đến ngày đáo hạn, tiền gửi có tự động được tái tục không?
이 거래를 취소하고 싶어요.|Tôi muốn hủy giao dịch này.
비밀번호를 세 번 잘못 입력했어요.|Tôi đã nhập sai mật khẩu ba lần.
새 계좌에 급여를 입금해 주세요.|Vui lòng chuyển lương vào tài khoản mới.
카드 분실 신고를 접수해 주세요.|Vui lòng tiếp nhận báo cáo mất thẻ.
해외에서 카드 사용이 가능한지 확인해 주세요.|Vui lòng kiểm tra xem tôi có thể dùng thẻ ở nước ngoài không.
현금 인출 수수료가 붙나요?|Có tính phí rút tiền mặt không?
세금 납부 기한을 연장할 수 있나요?|Tôi có thể gia hạn thời hạn nộp thuế không?
영수증을 전자 문서로 보내 주세요.|Vui lòng gửi hóa đơn dưới dạng tài liệu điện tử.
환율이 바뀌면 알려 주세요.|Vui lòng báo cho tôi khi tỷ giá thay đổi.
자동 납부 계좌를 새 계좌로 옮겨야 해요.|Tôi cần chuyển tài khoản thanh toán tự động sang tài khoản mới.
이체가 완료되면 문자로 알려 주세요.|Khi giao dịch chuyển khoản hoàn tất, vui lòng báo cho tôi qua tin nhắn.
월별 지출 내역을 확인하고 싶어요.|Tôi muốn xem các khoản chi tiêu theo tháng.
동전으로 바꿀 수 있는 기계가 있나요?|Có máy nào đổi tiền thành tiền xu không?
공과금 납부가 두 번 처리된 것 같아요.|Có vẻ hóa đơn tiện ích đã bị thanh toán hai lần.
저축 목표액을 매달 자동으로 이체하고 싶어요.|Tôi muốn tự động chuyển tiền tiết kiệm mục tiêu mỗi tháng.
신분증을 꼭 가져와야 하나요?|Tôi nhất thiết phải mang theo giấy tờ tùy thân không?
송금받을 사람의 이름을 다시 확인해 주세요.|Vui lòng kiểm tra lại tên người nhận tiền.
청구 금액에 이의가 있어요.|Tôi muốn khiếu nại số tiền bị tính.
수수료가 없는 계좌가 있나요?|Có tài khoản nào không mất phí không?
이 상품은 중도 해지해도 되나요?|Tôi có thể hủy sản phẩm này trước hạn không?
금융 상담을 예약하고 싶어요.|Tôi muốn đặt lịch tư vấn tài chính.`,
    travel: `조용한 쪽 객실로 배정해 주실 수 있나요?|Có thể xếp cho tôi phòng ở phía yên tĩnh không?
체크인 전에 짐을 맡길 수 있나요?|Tôi có thể gửi hành lý trước khi nhận phòng không?
늦은 체크아웃이 가능한지 확인해 주세요.|Vui lòng kiểm tra xem tôi có thể trả phòng muộn không.
조식은 몇 시부터 제공되나요?|Bữa sáng được phục vụ từ mấy giờ?
오늘은 객실 청소를 건너뛰어 주세요.|Hôm nay vui lòng không dọn phòng.
방에 여분의 베개를 가져다주실래요?|Bạn có thể mang thêm gối đến phòng giúp tôi không?
방 열쇠가 작동하지 않아요.|Chìa khóa phòng không hoạt động.
예약자 이름을 바꾸고 싶어요.|Tôi muốn đổi tên người đặt phòng.
예약 확인서를 다시 보내 주세요.|Vui lòng gửi lại xác nhận đặt chỗ.
전망이 좋은 방으로 바꿀 수 있나요?|Tôi có thể đổi sang phòng có tầm nhìn đẹp không?
호텔까지 셔틀버스가 운행하나요?|Có xe buýt đưa đón đến khách sạn không?
공항에서 호텔까지 무료 픽업이 있나요?|Có dịch vụ đón miễn phí từ sân bay đến khách sạn không?
항공편이 지연되어 도착이 늦을 것 같아요.|Chuyến bay bị hoãn nên có lẽ tôi sẽ đến muộn.
기내 반입 가방 크기를 확인해 주세요.|Vui lòng kiểm tra kích thước túi được mang lên máy bay.
좌석을 통로 쪽으로 바꿀 수 있나요?|Tôi có thể đổi sang ghế cạnh lối đi không?
특별식 요청이 예약에 반영됐나요?|Yêu cầu suất ăn đặc biệt đã được ghi nhận trong đặt chỗ chưa?
탑승 시작 시간이 언제예요?|Mấy giờ bắt đầu lên máy bay?
환승할 때 보안 검색을 다시 받아야 하나요?|Khi nối chuyến, tôi có phải kiểm tra an ninh lại không?
면세품을 찾는 곳이 어디인가요?|Tôi nhận hàng miễn thuế ở đâu?
여행 일정표를 인쇄해 주실 수 있나요?|Bạn có thể in lịch trình chuyến đi giúp tôi không?
예약 취소 수수료가 얼마예요?|Phí hủy đặt chỗ là bao nhiêu?
날씨 때문에 투어가 취소됐나요?|Chuyến tham quan bị hủy vì thời tiết phải không?
체크인하려면 여권이 필요해요?|Tôi có cần hộ chiếu để nhận phòng không?
이 짐은 깨지기 쉬우니 조심해 주세요.|Hành lý này dễ vỡ, vui lòng cẩn thận.
수하물이 나오지 않았어요.|Hành lý của tôi không xuất hiện.
여행용 어댑터를 빌릴 수 있나요?|Tôi có thể mượn bộ chuyển đổi du lịch không?
이 근처에 환전소가 있나요?|Gần đây có quầy đổi tiền không?
관광지 입장료가 포함돼 있나요?|Phí vào cửa điểm tham quan đã bao gồm chưa?
객실에 금고가 있나요?|Trong phòng có két sắt không?
체크아웃 후에도 짐을 보관해 주시나요?|Sau khi trả phòng, khách sạn vẫn giữ hành lý cho tôi chứ?`,
    childcare: `아이 하원 시간이 바뀌었어요.|Giờ đón con tan học đã thay đổi.
오늘은 할머니가 아이를 데리러 갈 거예요.|Hôm nay bà sẽ đi đón bé.
알림장을 확인하고 서명했어요.|Tôi đã xem và ký vào sổ thông báo.
준비물을 내일까지 보내 주세요.|Vui lòng gửi đồ dùng cần chuẩn bị trước ngày mai.
아이가 우유 알레르기가 있어요.|Con tôi bị dị ứng sữa.
낮잠 이불은 매주 금요일에 가져가요.|Tôi mang chăn ngủ trưa về vào thứ Sáu hằng tuần.
열이 있어서 오늘은 어린이집에 못 가요.|Bé bị sốt nên hôm nay không thể đến nhà trẻ.
아이에게 약을 먹인 시간을 적어 두었어요.|Tôi đã ghi lại giờ cho bé uống thuốc.
부모 상담 시간을 예약하고 싶어요.|Tôi muốn đặt lịch tư vấn phụ huynh.
수업이 끝난 뒤 돌봄 교실에 있나요?|Sau giờ học, bé có ở phòng trông trẻ không?
아이 신발이 바뀐 것 같아요.|Có vẻ giày của bé bị đổi nhầm.
새 학기 준비물 목록을 받을 수 있나요?|Tôi có thể nhận danh sách đồ dùng cho học kỳ mới không?
이 음식은 너무 매워서 아이가 못 먹어요.|Món này cay quá nên bé không ăn được.
아이가 혼자 옷을 입도록 기다려 주세요.|Vui lòng chờ để bé tự mặc quần áo.
오늘은 조금 일찍 데리러 갈게요.|Hôm nay tôi sẽ đến đón bé sớm hơn một chút.
아이가 친구와 다퉜다고 들었어요.|Tôi nghe nói bé đã cãi nhau với bạn.
숙제를 다 했는지 같이 확인해 주세요.|Vui lòng cùng kiểm tra xem bé đã làm xong bài tập chưa.
방과 후에 피아노 학원에 가요.|Sau giờ học, bé đi học piano.
아이가 열이 나면 바로 전화해 주세요.|Nếu bé bị sốt, vui lòng gọi cho tôi ngay.
사진 촬영 동의서를 제출할게요.|Tôi sẽ nộp giấy đồng ý chụp ảnh.
이번 주 소풍 장소가 어디예요?|Địa điểm dã ngoại tuần này ở đâu?
도시락을 냉장고에 넣어 주세요.|Vui lòng để hộp cơm vào tủ lạnh.
아이에게 여벌 옷을 한 벌 더 챙겨 주세요.|Vui lòng chuẩn bị thêm một bộ quần áo dự phòng cho bé.
아이가 잠들 때까지 책을 읽어 줬어요.|Tôi đọc sách cho bé nghe đến khi bé ngủ.
아이 돌봄 서비스를 알아보고 있어요.|Tôi đang tìm hiểu dịch vụ trông trẻ.
예방접종 확인서를 가져왔어요.|Tôi đã mang giấy xác nhận tiêm chủng.
새 담임 선생님과 인사했어요.|Tôi đã chào hỏi giáo viên chủ nhiệm mới.
아이가 스스로 정리하도록 격려했어요.|Tôi khuyến khích bé tự dọn dẹp.
가족 행사 때문에 하루 결석할게요.|Bé sẽ nghỉ một ngày vì gia đình có việc.
아이의 알레르기 정보를 다시 전달할게요.|Tôi sẽ thông báo lại thông tin dị ứng của bé.`,
    hobbies: `초보자 강습이 따로 있나요?|Có lớp hướng dẫn riêng cho người mới bắt đầu không?
운동화를 꼭 신어야 해요?|Có nhất thiết phải mang giày thể thao không?
수업 시작 전에 준비 운동을 할게요.|Tôi sẽ khởi động trước khi lớp bắt đầu.
라켓을 하루 동안 빌릴 수 있나요?|Tôi có thể mượn vợt trong một ngày không?
오늘은 무릎이 아파서 쉬고 싶어요.|Hôm nay đầu gối tôi đau nên muốn nghỉ.
다음 경기 일정을 단체방에 올려 주세요.|Vui lòng đăng lịch trận đấu tiếp theo lên nhóm chat.
회원권을 한 달 더 연장할게요.|Tôi sẽ gia hạn thẻ thành viên thêm một tháng.
악기 조율을 부탁드려도 될까요?|Tôi có thể nhờ bạn lên dây nhạc cụ được không?
연습실을 한 시간 예약했어요.|Tôi đã đặt phòng tập trong một giờ.
이 곡의 박자를 천천히 알려 주세요.|Vui lòng hướng dẫn nhịp của bản nhạc này thật chậm.
사진 동아리에서 야외 촬영을 가요.|Câu lạc bộ nhiếp ảnh sẽ đi chụp hình ngoài trời.
뜨개질 도안을 한 장 더 받을 수 있나요?|Tôi có thể nhận thêm một mẫu đan nữa không?
식물에 물을 며칠마다 줘야 하나요?|Mấy ngày thì nên tưới cây một lần?
책 모임에서 다음 달 책을 정했어요.|Câu lạc bộ sách đã chọn sách cho tháng tới.
보드게임 규칙을 먼저 설명해 주세요.|Vui lòng giải thích luật trò chơi trước.
낚시 허가증이 필요한 장소인가요?|Địa điểm này có cần giấy phép câu cá không?
자전거 타이어에 바람이 빠졌어요.|Lốp xe đạp bị xì hơi.
수영장 레인별 이용 시간을 확인하고 싶어요.|Tôi muốn kiểm tra giờ sử dụng từng làn hồ bơi.
경기 결과를 기록해 둘게요.|Tôi sẽ ghi lại kết quả trận đấu.
공연 리허설은 몇 시에 시작해요?|Buổi tổng duyệt bắt đầu lúc mấy giờ?
좌석에서 무대가 잘 보이나요?|Từ chỗ ngồi có nhìn rõ sân khấu không?
단체 사진을 찍기 전에 줄을 맞춰 주세요.|Vui lòng xếp hàng trước khi chụp ảnh tập thể.
장비를 사용한 뒤 제자리에 놓아 주세요.|Vui lòng đặt thiết bị về chỗ cũ sau khi sử dụng.
체험 수업을 한 번 받아 보고 싶어요.|Tôi muốn thử tham gia một buổi học trải nghiệm.
참가 신청 마감이 언제예요?|Hạn đăng ký tham gia là khi nào?
자원봉사자로 행사에 참여할게요.|Tôi sẽ tham gia sự kiện với tư cách tình nguyện viên.
산책로에서는 반려견 목줄을 착용해 주세요.|Vui lòng đeo dây dắt cho chó cưng trên lối đi dạo.
이 운동은 하루에 몇 세트 하면 돼요?|Bài tập này nên thực hiện mấy hiệp mỗi ngày?
물을 마시며 잠깐 쉬었다 갈게요.|Tôi sẽ uống nước và nghỉ một lát rồi đi tiếp.
취미 모임에 처음 참여해도 괜찮나요?|Tôi tham gia nhóm sở thích lần đầu có được không?`,
    emergency: `기상 특보가 발효됐는지 확인해 주세요.|Vui lòng kiểm tra xem cảnh báo thời tiết đã được ban hành chưa.
폭우가 그칠 때까지 건물 안에서 기다리세요.|Hãy đợi trong tòa nhà cho đến khi mưa lớn tạnh.
침수된 도로로 들어가지 마세요.|Đừng đi vào con đường bị ngập.
정전이 되면 손전등을 사용하세요.|Khi mất điện, hãy dùng đèn pin.
가스 냄새가 나면 밸브를 잠그고 밖으로 나가세요.|Nếu ngửi thấy mùi gas, hãy khóa van và ra ngoài.
연기가 보여서 소방서에 신고했어요.|Tôi thấy khói nên đã báo cho sở cứu hỏa.
다친 사람이 있으니 구급차를 불러 주세요.|Có người bị thương, vui lòng gọi xe cứu thương.
안전한 대피 장소가 어디인가요?|Nơi sơ tán an toàn ở đâu?
비상구를 막지 말아 주세요.|Vui lòng đừng chắn lối thoát hiểm.
여진에 대비해 넓은 곳으로 이동하세요.|Hãy di chuyển đến nơi rộng rãi để đề phòng dư chấn.
바람이 강하니 간판 아래에 서 있지 마세요.|Gió mạnh, đừng đứng dưới biển hiệu.
번개가 치면 나무 밑에 있지 마세요.|Nếu có sấm chớp, đừng đứng dưới gốc cây.
도로가 얼어서 차량이 미끄러져요.|Mặt đường đóng băng nên xe cộ bị trượt.
폭설 때문에 버스 운행이 중단됐어요.|Xe buýt đã ngừng chạy vì tuyết rơi dày.
실종된 사람의 인상착의를 알려 드릴게요.|Tôi sẽ cung cấp mô tả nhận dạng người mất tích.
경찰에 분실 신고를 하고 싶어요.|Tôi muốn trình báo cảnh sát về đồ bị mất.
사고 현장에 접근하지 말아 주세요.|Vui lòng đừng đến gần hiện trường tai nạn.
구조대가 도착할 때까지 환자를 움직이지 마세요.|Đừng di chuyển bệnh nhân cho đến khi đội cứu hộ đến.
비상 연락망에 제 번호를 추가해 주세요.|Vui lòng thêm số của tôi vào danh sách liên lạc khẩn cấp.
안전 점검이 끝날 때까지 출입을 제한합니다.|Hạn chế ra vào cho đến khi việc kiểm tra an toàn kết thúc.
지진 알림을 받으면 책상 밑으로 들어가세요.|Khi nhận cảnh báo động đất, hãy chui xuống dưới bàn.
산불 연기가 보이면 반대 방향으로 대피하세요.|Nếu thấy khói cháy rừng, hãy sơ tán theo hướng ngược lại.
도로 통제 구간을 피해 우회하세요.|Hãy đi đường vòng để tránh đoạn đường bị phong tỏa.
응급 처치 방법을 알려 주세요.|Vui lòng hướng dẫn cách sơ cứu.
구급함이 어디 있는지 아세요?|Bạn có biết hộp sơ cứu ở đâu không?
물이 차오르기 전에 높은 곳으로 이동하세요.|Hãy di chuyển lên nơi cao trước khi nước dâng.
아이와 함께 대피소로 가고 있어요.|Tôi đang cùng con đến nơi trú ẩn.
안전 문자를 받으면 내용을 끝까지 확인하세요.|Khi nhận tin nhắn an toàn, hãy đọc hết nội dung.
신고자의 위치를 정확히 말씀해 주세요.|Vui lòng cho biết chính xác vị trí của người báo tin.
피난 경로에 위험물이 있는지 확인해 주세요.|Vui lòng kiểm tra xem có vật nguy hiểm trên lối sơ tán không.`,
    health: `아침 약을 먹었는지 기억이 안 나요.|Tôi không nhớ đã uống thuốc buổi sáng chưa.
식사 전에 혈당을 측정해 주세요.|Vui lòng đo đường huyết trước bữa ăn.
검사 결과를 이메일로 받을 수 있나요?|Tôi có thể nhận kết quả xét nghiệm qua email không?
진료 기록 사본을 발급받고 싶어요.|Tôi muốn xin cấp bản sao hồ sơ khám bệnh.
이 약은 공복에 먹어도 괜찮나요?|Tôi uống thuốc này khi bụng đói có được không?
복용 중인 약 목록을 가져왔어요.|Tôi đã mang theo danh sách thuốc đang dùng.
예약 시간을 삼십 분 늦춰도 될까요?|Tôi có thể lùi giờ hẹn ba mươi phút không?
증상이 시작된 날짜를 알려 주세요.|Vui lòng cho biết ngày các triệu chứng bắt đầu.
통증이 어느 부위에서 가장 심한가요?|Cơn đau nặng nhất ở bộ phận nào?
알레르기 반응이 있으면 즉시 중단하세요.|Nếu có phản ứng dị ứng, hãy dừng ngay lập tức.
오늘은 무리하지 말고 가볍게 걸어요.|Hôm nay đừng cố sức, hãy đi bộ nhẹ nhàng thôi.
운동 후에는 종아리를 천천히 늘려 주세요.|Sau khi tập, hãy từ từ giãn cơ bắp chân.
물리 치료 예약을 변경하고 싶어요.|Tôi muốn đổi lịch vật lý trị liệu.
다음 검사 전에 금식해야 하나요?|Tôi có cần nhịn ăn trước lần kiểm tra tiếp theo không?
혈압을 다시 한번 재 주세요.|Vui lòng đo lại huyết áp một lần nữa.
최근에 잠을 잘 못 자고 있어요.|Gần đây tôi ngủ không ngon.
오른쪽 어깨가 움직일 때 아파요.|Vai phải của tôi đau khi cử động.
처방된 연고를 하루 두 번 바르세요.|Hãy bôi thuốc mỡ được kê hai lần mỗi ngày.
기침이 심해져서 다시 진료받으러 왔어요.|Cơn ho nặng hơn nên tôi quay lại khám.
운동 전후에 물을 충분히 마셔요.|Hãy uống đủ nước trước và sau khi tập.
오늘 몸 상태를 점수로 기록해 볼게요.|Hôm nay tôi sẽ thử chấm điểm tình trạng cơ thể.
식단에서 나트륨을 줄이고 싶어요.|Tôi muốn giảm natri trong chế độ ăn.
검사 전에 액세서리를 빼 주세요.|Vui lòng tháo phụ kiện trước khi kiểm tra.
예방접종 후에는 잠시 대기해 주세요.|Vui lòng chờ một lát sau khi tiêm chủng.
이 증상이 약 부작용일 수 있나요?|Triệu chứng này có thể là tác dụng phụ của thuốc không?
환자 이름과 생년월일을 확인해 주세요.|Vui lòng xác nhận tên và ngày sinh của bệnh nhân.
휴식 시간을 조금 더 늘려도 될까요?|Tôi có thể kéo dài thời gian nghỉ thêm một chút không?
통증이 가라앉을 때까지 찜질해 주세요.|Vui lòng chườm cho đến khi cơn đau dịu xuống.
운동 강도를 한 단계 낮춰 주세요.|Vui lòng giảm cường độ tập xuống một mức.
응급 연락처가 바뀌었어요.|Thông tin liên lạc khẩn cấp đã thay đổi.`,
    digital: `화면 밝기를 조금 낮춰 주세요.|Vui lòng giảm độ sáng màn hình một chút.
앱을 최신 버전으로 업데이트했어요.|Tôi đã cập nhật ứng dụng lên phiên bản mới nhất.
로그인 코드를 다시 보내 주세요.|Vui lòng gửi lại mã đăng nhập.
첨부 파일이 열리지 않아요.|Tệp đính kèm không mở được.
문서를 PDF로 저장해 주실래요?|Bạn có thể lưu tài liệu thành PDF giúp tôi không?
자동 저장 기능을 켜 두세요.|Hãy bật chức năng tự động lưu.
파일 이름에 날짜를 넣어 주세요.|Vui lòng thêm ngày tháng vào tên tệp.
공유 링크에 만료일을 설정했어요.|Tôi đã đặt ngày hết hạn cho liên kết chia sẻ.
비밀번호 재설정 링크가 만료됐어요.|Liên kết đặt lại mật khẩu đã hết hạn.
계정에 다른 기기가 접속했어요.|Một thiết bị khác đã đăng nhập vào tài khoản.
알림을 잠시 무음으로 바꿀게요.|Tôi sẽ tạm chuyển thông báo sang chế độ im lặng.
영상 자막을 켜 주실 수 있나요?|Bạn có thể bật phụ đề video giúp tôi không?
회의 링크가 작동하지 않아요.|Liên kết cuộc họp không hoạt động.
화면을 확대해서 글자를 크게 보여 주세요.|Vui lòng phóng to màn hình để chữ hiển thị lớn hơn.
데이터가 동기화될 때까지 기다려 주세요.|Vui lòng đợi cho đến khi dữ liệu được đồng bộ.
와이파이가 연결됐는데 인터넷이 안 돼요.|Wi-Fi đã kết nối nhưng không có mạng.
저장 공간이 부족하다는 알림이 떠요.|Có thông báo dung lượng lưu trữ không đủ.
이 페이지를 즐겨찾기에 추가해 주세요.|Vui lòng thêm trang này vào mục yêu thích.
사진의 위치 정보는 삭제해 주세요.|Vui lòng xóa thông tin vị trí của ảnh.
마이크 접근을 허용해야 하나요?|Tôi có cần cho phép truy cập micrô không?
음성 메시지를 천천히 다시 들어 볼게요.|Tôi sẽ nghe lại tin nhắn thoại một cách chậm rãi.
삭제한 파일을 복구할 수 있나요?|Tôi có thể khôi phục tệp đã xóa không?
검색 결과를 날짜순으로 정렬해 주세요.|Vui lòng sắp xếp kết quả tìm kiếm theo ngày.
이 게시물에 답글을 남겨도 될까요?|Tôi có thể để lại bình luận trả lời bài đăng này không?
앱 사용 권한을 확인하고 싶어요.|Tôi muốn kiểm tra quyền truy cập của ứng dụng.
QR 코드를 다시 스캔해 주세요.|Vui lòng quét lại mã QR.
백업이 완료되면 알려 주세요.|Vui lòng báo cho tôi khi sao lưu hoàn tất.
화면 공유를 종료해 주세요.|Vui lòng kết thúc chia sẻ màn hình.
통화 중에 소리가 끊겨요.|Âm thanh bị ngắt quãng trong cuộc gọi.
새 기기에서 계정을 로그아웃해야 하나요?|Tôi có cần đăng xuất tài khoản trên thiết bị mới không?`,
    community: `주민등록 주소를 변경하고 싶어요.|Tôi muốn thay đổi địa chỉ đăng ký cư trú.
필요한 서류 목록을 먼저 확인할게요.|Tôi sẽ kiểm tra danh sách giấy tờ cần thiết trước.
번호표를 뽑고 기다리면 되나요?|Tôi lấy số thứ tự rồi chờ là được phải không?
이 신청서는 어느 창구에 제출하나요?|Tôi nộp đơn này ở quầy nào?
운영 시간이 공휴일에도 같나요?|Giờ hoạt động vào ngày lễ có giống ngày thường không?
복지 상담을 예약하고 싶어요.|Tôi muốn đặt lịch tư vấn phúc lợi xã hội.
세금 납부 확인서를 발급해 주세요.|Vui lòng cấp giấy xác nhận đã nộp thuế.
도서관 회원증을 재발급받고 싶어요.|Tôi muốn xin cấp lại thẻ thư viện.
반납 기한을 일주일 연장해 주실래요?|Bạn có thể gia hạn ngày trả thêm một tuần không?
체육관 강좌에 대기 신청을 할 수 있나요?|Tôi có thể đăng ký danh sách chờ lớp ở nhà thi đấu không?
공원에서 자전거를 타도 되나요?|Tôi có được đi xe đạp trong công viên không?
쓰레기 배출 날짜를 다시 알려 주세요.|Vui lòng cho tôi biết lại ngày đổ rác.
대형 폐기물 신고를 온라인으로 할 수 있어요?|Tôi có thể khai báo đồ cồng kềnh cần bỏ qua mạng không?
이 구역에 주차하면 과태료가 부과되나요?|Đỗ xe ở khu vực này có bị phạt không?
도로 공사는 언제 끝나나요?|Khi nào công trình làm đường kết thúc?
분실한 지갑이 접수됐는지 확인해 주세요.|Vui lòng kiểm tra xem chiếc ví bị mất đã được nộp chưa.
민원 처리 결과를 문자로 받고 싶어요.|Tôi muốn nhận kết quả xử lý kiến nghị qua tin nhắn.
통역 지원을 요청할 수 있을까요?|Tôi có thể yêu cầu hỗ trợ phiên dịch không?
장애인 주차 구역은 어디에 있나요?|Khu vực đỗ xe dành cho người khuyết tật ở đâu?
공공시설 예약을 취소하고 싶어요.|Tôi muốn hủy đặt chỗ cơ sở công cộng.
접수 번호를 잊어버렸어요.|Tôi quên mất số tiếp nhận hồ sơ.
담당 부서로 연결해 주세요.|Vui lòng kết nối tôi với bộ phận phụ trách.
안내문을 베트남어로 받을 수 있나요?|Tôi có thể nhận thông báo bằng tiếng Việt không?
이 서류에 서명하는 곳을 알려 주세요.|Vui lòng chỉ cho tôi chỗ ký trên giấy tờ này.
야간에도 이용할 수 있는 창구가 있나요?|Có quầy nào hoạt động vào ban đêm không?
주민 설명회에 참석 신청을 했어요.|Tôi đã đăng ký tham dự buổi họp phổ biến cho cư dân.
공사 소음 신고는 어디에 하면 되나요?|Tôi báo cáo tiếng ồn thi công ở đâu?
어린이 놀이터 이용 규칙을 확인해 주세요.|Vui lòng kiểm tra quy định sử dụng sân chơi trẻ em.
반려동물 등록 정보를 수정하고 싶어요.|Tôi muốn sửa thông tin đăng ký thú cưng.
공공 와이파이 비밀번호를 어디서 받나요?|Tôi lấy mật khẩu Wi-Fi công cộng ở đâu?`,
    communication: `지금 이야기해도 괜찮은 시간인가요?|Bây giờ có phải lúc thích hợp để nói chuyện không?
제 말을 끝까지 들어 주셨으면 해요.|Tôi mong bạn lắng nghe hết lời tôi nói.
제가 이해한 내용이 맞는지 확인하고 싶어요.|Tôi muốn kiểm tra xem mình hiểu đúng chưa.
그 부분은 다시 한번 설명해 주실래요?|Bạn có thể giải thích lại phần đó một lần nữa không?
제 의견도 잠시 말씀드려도 될까요?|Tôi có thể trình bày ý kiến của mình một chút không?
오늘은 혼자 생각할 시간이 필요해요.|Hôm nay tôi cần thời gian suy nghĩ một mình.
걱정해 줘서 정말 고마워요.|Cảm ơn bạn đã lo lắng cho tôi.
그 말은 조금 서운하게 들렸어요.|Lời đó khiến tôi hơi chạnh lòng.
제 의도를 오해하지 않았으면 좋겠어요.|Tôi mong bạn đừng hiểu lầm ý định của tôi.
서로 편한 방법을 찾아봐요.|Chúng ta cùng tìm cách thoải mái cho cả hai nhé.
지금 바로 답하기 어려우니 조금만 기다려 주세요.|Tôi khó trả lời ngay lúc này, vui lòng chờ một chút.
약속을 지키지 못해 정말 미안해요.|Tôi thật sự xin lỗi vì đã không giữ lời hứa.
다음에는 같은 일이 없도록 할게요.|Lần sau tôi sẽ không để chuyện tương tự xảy ra.
먼저 연락하지 못해서 미안해요.|Xin lỗi vì tôi đã không liên lạc trước.
그 제안에 동의하는 이유를 말씀드릴게요.|Tôi sẽ nói lý do mình đồng ý với đề xuất đó.
이번에는 정중히 거절하고 싶어요.|Lần này tôi muốn từ chối một cách lịch sự.
부담 갖지 말고 편하게 말해 주세요.|Đừng ngại, cứ thoải mái nói với tôi.
상대방의 입장에서 한번 생각해 봐요.|Hãy thử suy nghĩ một lần từ góc nhìn của người kia.
좋은 소식이 있어서 가장 먼저 알려 주고 싶었어요.|Tôi có tin vui nên muốn báo cho bạn đầu tiên.
답장이 늦어도 괜찮으니 편할 때 연락해요.|Bạn trả lời muộn cũng không sao, hãy liên lạc khi tiện nhé.
잠깐 쉬었다가 다시 이야기할까요?|Chúng ta nghỉ một lát rồi nói tiếp nhé?
제 실수를 인정하고 사과드릴게요.|Tôi sẽ nhận lỗi và xin lỗi bạn.
서로 다른 의견을 존중했으면 합니다.|Tôi mong chúng ta tôn trọng ý kiến khác nhau.
오늘은 기분이 조금 가라앉아 있어요.|Hôm nay tâm trạng tôi hơi chùng xuống.
도움이 필요하면 언제든지 말해 주세요.|Nếu cần giúp đỡ, hãy nói với tôi bất cứ lúc nào.
그 이야기는 여기까지만 나누고 싶어요.|Tôi chỉ muốn chia sẻ câu chuyện đó đến đây thôi.
당신의 선택을 응원할게요.|Tôi sẽ ủng hộ lựa chọn của bạn.
제가 도울 수 있는 부분을 알려 주세요.|Vui lòng cho tôi biết phần nào tôi có thể giúp.
오랜만에 만나서 정말 반가워요.|Lâu rồi mới gặp lại, tôi rất vui.
다음에 천천히 다시 이야기해요.|Lần sau chúng ta thong thả nói chuyện tiếp nhé.`
  };

  const exampleTemplates = {
    housing: [
      ['계약 갱신 시기가 다가와 관리인에게 "{word}"라고 문의했어요.', 'Khi sắp đến thời điểm gia hạn hợp đồng, tôi hỏi người quản lý: "{meaning}".'],
      ['누수 사진을 보여 드리며 관리인에게 "{word}"라고 상황을 설명했어요.', 'Tôi cho người quản lý xem ảnh rò rỉ nước và giải thích tình hình: "{meaning}".'],
      ['수리 기사 방문 시간을 조율하면서 "{word}"라고 가능한 일정을 말씀드렸어요.', 'Khi sắp xếp giờ thợ sửa đến, tôi báo lịch có thể: "{meaning}".']
    ],
    finance: [
      ['자동 이체 내역을 확인하다가 은행 창구에서 "{word}"라고 문의했어요.', 'Khi kiểm tra lịch sử chuyển khoản tự động, tôi hỏi ở quầy ngân hàng: "{meaning}".'],
      ['상담 직원에게 필요한 서류를 보여 주며 "{word}"라고 말씀드렸어요.', 'Tôi đưa giấy tờ cần thiết cho nhân viên tư vấn và nói: "{meaning}".'],
      ['거래 금액이 예상과 달라 확인을 요청하며 "{word}"라고 설명했어요.', 'Số tiền giao dịch khác dự kiến nên tôi yêu cầu kiểm tra và giải thích: "{meaning}".']
    ],
    travel: [
      ['예약 확인서를 보여 주며 숙소 직원에게 "{word}"라고 부탁했어요.', 'Tôi đưa xác nhận đặt phòng cho nhân viên chỗ ở xem rồi nhờ: "{meaning}".'],
      ['환승 시간이 촉박해 공항 안내 직원에게 "{word}"라고 물어봤어요.', 'Thời gian chuyển chuyến gấp nên tôi hỏi nhân viên hướng dẫn ở sân bay: "{meaning}".'],
      ['일정이 갑자기 바뀌어 여행 중 만난 직원에게 "{word}"라고 상황을 알렸어요.', 'Lịch trình đột ngột thay đổi nên tôi báo tình hình với nhân viên gặp trong chuyến đi: "{meaning}".']
    ],
    childcare: [
      ['아이의 알레르기 기록을 전달하며 담임 선생님께 "{word}"라고 말씀드렸어요.', 'Khi gửi thông tin dị ứng của bé, tôi nói với giáo viên chủ nhiệm: "{meaning}".'],
      ['등원 시간이 달라져 가족에게 "{word}"라고 미리 알려 줬어요.', 'Giờ đưa bé đến trường thay đổi nên tôi báo trước với gia đình: "{meaning}".'],
      ['아이의 낮잠 시간이 가까워져 돌봄 선생님께 "{word}"라고 부탁했어요.', 'Sắp đến giờ ngủ trưa của bé nên tôi nhờ giáo viên trông trẻ: "{meaning}".']
    ],
    hobbies: [
      ['처음 배우는 동작이 어려워 강사님께 "{word}"라고 여쭤봤어요.', 'Động tác mới học khá khó nên tôi hỏi người hướng dẫn: "{meaning}".'],
      ['다음 모임 일정을 정하면서 동호회 친구에게 "{word}"라고 제안했어요.', 'Khi chọn lịch buổi gặp tiếp theo, tôi đề nghị với bạn trong câu lạc bộ: "{meaning}".'],
      ['장비를 빌리기 전에 이용 방법을 확인하려고 "{word}"라고 물어봤어요.', 'Trước khi mượn thiết bị, tôi hỏi cách sử dụng: "{meaning}".']
    ],
    emergency: [
      ['연기가 보여 주변 사람들에게 대피를 알리며 "{word}"라고 외쳤어요.', 'Khi thấy khói, tôi báo mọi người xung quanh sơ tán và hô: "{meaning}".'],
      ['다친 사람이 있어 구조대에 연락한 뒤 안내 직원에게 "{word}"라고 도움을 요청했어요.', 'Có người bị thương nên sau khi gọi cứu hộ, tôi nhờ nhân viên hướng dẫn: "{meaning}".'],
      ['현장 인원을 확인한 뒤 무전으로 "{word}"라고 상황을 전달했어요.', 'Sau khi kiểm tra số người tại hiện trường, tôi báo tình hình qua bộ đàm: "{meaning}".']
    ],
    health: [
      ['증상이 시작된 시점을 설명하며 의사에게 "{word}"라고 말씀드렸어요.', 'Khi giải thích thời điểm triệu chứng bắt đầu, tôi nói với bác sĩ: "{meaning}".'],
      ['처방전을 보여 드리고 복용 시간을 확인하려고 약사에게 "{word}"라고 문의했어요.', 'Tôi đưa đơn thuốc và hỏi dược sĩ để xác nhận giờ uống: "{meaning}".'],
      ['진료 기록을 함께 살펴보며 최근 달라진 점을 "{word}"라고 설명했어요.', 'Khi cùng xem hồ sơ khám bệnh, tôi giải thích điều gần đây thay đổi: "{meaning}".']
    ],
    digital: [
      ['오류 화면을 캡처해 고객센터에 보내며 "{word}"라고 문의했어요.', 'Tôi chụp màn hình lỗi gửi trung tâm hỗ trợ và hỏi: "{meaning}".'],
      ['결제가 두 번 처리된 것을 확인하고 앱 문의 창에 "{word}"라고 알렸어요.', 'Tôi thấy khoản thanh toán bị xử lý hai lần nên báo trong cửa sổ hỗ trợ của ứng dụng: "{meaning}".'],
      ['기기를 재시작해도 문제가 계속되어 기술 담당자에게 "{word}"라고 점검을 요청했어요.', 'Sự cố vẫn tiếp diễn dù đã khởi động lại thiết bị nên tôi nhờ nhân viên kỹ thuật kiểm tra: "{meaning}".']
    ],
    community: [
      ['필요한 신청서를 준비한 뒤 담당 직원에게 "{word}"라고 문의했어요.', 'Sau khi chuẩn bị đơn cần thiết, tôi hỏi nhân viên phụ trách: "{meaning}".'],
      ['접수 번호와 관련 서류를 함께 제시하며 민원 창구에서 "{word}"라고 말씀드렸어요.', 'Tôi đưa số tiếp nhận cùng giấy tờ liên quan và trình bày ở quầy: "{meaning}".'],
      ['시설을 이용하기 전에 운영 시간과 위치를 안내 데스크에서 "{word}"라고 확인했어요.', 'Trước khi sử dụng cơ sở, tôi xác nhận giờ hoạt động và vị trí tại quầy hướng dẫn: "{meaning}".']
    ],
    communication: [
      ['친구가 제 의견을 물어봐서 생각을 정리한 뒤 "{word}"라고 말했어요.', 'Bạn hỏi ý kiến nên sau khi sắp xếp suy nghĩ, tôi nói: "{meaning}".'],
      ['오해가 생기지 않도록 상대방의 입장을 들은 다음 "{word}"라고 솔직하게 전했어요.', 'Để tránh hiểu lầm, sau khi lắng nghe đối phương, tôi chân thành nói: "{meaning}".'],
      ['서로 다음 약속을 확인한 뒤 대화를 마치며 "{word}"라고 덧붙였어요.', 'Sau khi xác nhận cuộc hẹn tiếp theo, tôi kết thúc cuộc trò chuyện bằng câu: "{meaning}".']
    ]
  };

  const initials = ["g", "kk", "n", "d", "tt", "r", "m", "b", "pp", "s", "ss", "", "j", "jj", "ch", "k", "t", "p", "h"];
  const vowels = ["a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i"];
  const finals = ["", "k", "k", "k", "n", "n", "n", "t", "l", "k", "m", "l", "l", "p", "l", "l", "m", "p", "p", "t", "t", "ng", "t", "t", "k", "t", "p", "t"];
  const liaisonInitial = { 1: 0, 2: 1, 4: 2, 7: 3, 8: 5, 16: 6, 17: 7, 19: 9, 20: 10, 22: 12, 23: 14, 24: 15, 25: 16, 26: 17, 27: 18 };
  function romanizeKorean(text) {
    const syllables = Array.from(text).map(function (character) {
      const code = character.charCodeAt(0) - 0xac00;
      if (code < 0 || code > 11171) return { character: character };
      return {
        initial: Math.floor(code / 588),
        vowel: Math.floor((code % 588) / 28),
        final: code % 28
      };
    });
    for (let index = 0; index < syllables.length - 1; index += 1) {
      const current = syllables[index];
      const next = syllables[index + 1];
      if (current.initial !== undefined && current.final && next.initial === 11 && liaisonInitial[current.final] !== undefined) {
        next.initial = liaisonInitial[current.final];
        current.final = 0;
      }
    }
    return syllables.map(function (syllable) {
      if (syllable.character) return syllable.character;
      return initials[syllable.initial] + vowels[syllable.vowel] + finals[syllable.final];
    }).join("");
  }

  const existing = Array.isArray(window.KOREAN_EXPRESSIONS) ? window.KOREAN_EXPRESSIONS : [];
  const requiredFields = ["word", "ipa", "meaning", "example", "exampleKo"];
  const normalize = function (value) { return value.normalize("NFC").toLowerCase().replace(/[^a-z0-9가-힣]/g, ""); };
  const existingWords = new Set(existing.map(function (item) { return normalize(item.word); }));
  const additions = [];
  const curatedExamples = {
    "지금 이야기해도 괜찮은 시간인가요?": ["상담을 시작하기 전에 상대의 일정을 확인하며 \"지금 이야기해도 괜찮은 시간인가요?\"라고 물었어요.", "Trước khi bắt đầu trao đổi, tôi hỏi lịch của đối phương: \"Bây giờ có phải lúc thích hợp để nói chuyện không?\""],
    "제 말을 끝까지 들어 주셨으면 해요.": ["서로 오해한 부분이 있어 차분히 설명을 시작하며 \"제 말을 끝까지 들어 주셨으면 해요.\"라고 부탁했어요.", "Vì có điều hiểu lầm, tôi bình tĩnh giải thích và nhờ: \"Tôi mong bạn lắng nghe hết lời tôi nói.\""],
    "제가 이해한 내용이 맞는지 확인하고 싶어요.": ["회의가 끝나기 전에 역할 분담을 다시 짚으며 \"제가 이해한 내용이 맞는지 확인하고 싶어요.\"라고 말했어요.", "Trước khi cuộc họp kết thúc, tôi nhắc lại việc phân công và nói: \"Tôi muốn kiểm tra xem mình hiểu đúng chưa.\""],
    "그 부분은 다시 한번 설명해 주실래요?": ["상대방이 일정 변경을 빠르게 설명해 놓친 내용이 있어 \"그 부분은 다시 한번 설명해 주실래요?\"라고 여쭤봤어요.", "Đối phương giải thích nhanh về thay đổi lịch nên tôi chưa nắm rõ và hỏi: \"Bạn có thể giải thích lại phần đó một lần nữa không?\""],
    "제 의견도 잠시 말씀드려도 될까요?": ["모두가 차례로 발언하는 회의에서 손을 들고 \"제 의견도 잠시 말씀드려도 될까요?\"라고 물었어요.", "Trong cuộc họp mọi người lần lượt phát biểu, tôi giơ tay hỏi: \"Tôi có thể trình bày ý kiến của mình một chút không?\""],
    "오늘은 혼자 생각할 시간이 필요해요.": ["친구가 계속 답을 재촉하자 바로 결정하기 어렵다고 말하며 \"오늘은 혼자 생각할 시간이 필요해요.\"라고 했어요.", "Khi bạn liên tục giục trả lời, tôi nói mình chưa thể quyết định ngay: \"Hôm nay tôi cần thời gian suy nghĩ một mình.\""],
    "걱정해 줘서 정말 고마워요.": ["시험 결과를 기다리며 긴장한 저를 친구가 위로해 줘서 \"걱정해 줘서 정말 고마워요.\"라고 전했어요.", "Bạn an ủi tôi khi tôi lo lắng chờ kết quả thi, nên tôi nói: \"Cảm ơn bạn đã lo lắng cho tôi.\""],
    "그 말은 조금 서운하게 들렸어요.": ["농담이라도 제 노력을 가볍게 여기는 것 같아 대화가 끝난 뒤 \"그 말은 조금 서운하게 들렸어요.\"라고 솔직히 말했어요.", "Dù chỉ là lời đùa, tôi cảm thấy nỗ lực của mình bị xem nhẹ nên sau đó chân thành nói: \"Lời đó khiến tôi hơi chạnh lòng.\""],
    "제 의도를 오해하지 않았으면 좋겠어요.": ["제안에 반대하는 것이 아니라 다른 방법을 찾자는 뜻이라며 \"제 의도를 오해하지 않았으면 좋겠어요.\"라고 덧붙였어요.", "Tôi nói thêm rằng mình không phản đối đề xuất mà chỉ muốn tìm cách khác: \"Tôi mong bạn đừng hiểu lầm ý định của tôi.\""],
    "서로 편한 방법을 찾아봐요.": ["두 사람 모두 바쁜 일정 때문에 약속을 잡기 어려워 \"서로 편한 방법을 찾아봐요.\"라고 제안했어요.", "Cả hai đều bận nên khó hẹn gặp, tôi đề nghị: \"Chúng ta cùng tìm cách thoải mái cho cả hai nhé.\""],
    "지금 바로 답하기 어려우니 조금만 기다려 주세요.": ["자료를 확인해야 정확히 답할 수 있어서 동료에게 \"지금 바로 답하기 어려우니 조금만 기다려 주세요.\"라고 메시지를 보냈어요.", "Tôi cần kiểm tra tài liệu để trả lời chính xác nên nhắn đồng nghiệp: \"Tôi khó trả lời ngay lúc này, vui lòng chờ một chút.\""],
    "약속을 지키지 못해 정말 미안해요.": ["갑작스러운 야근 때문에 친구와의 약속에 늦게 되어 도착하자마자 \"약속을 지키지 못해 정말 미안해요.\"라고 사과했어요.", "Vì phải làm thêm đột xuất nên tôi đến muộn cuộc hẹn với bạn và vừa đến đã xin lỗi: \"Tôi thật sự xin lỗi vì đã không giữ lời hứa.\""],
    "다음에는 같은 일이 없도록 할게요.": ["마감일을 놓쳐 팀에 피해를 준 뒤 일정 알림을 설정하며 \"다음에는 같은 일이 없도록 할게요.\"라고 약속했어요.", "Sau khi lỡ hạn chót và làm ảnh hưởng đến nhóm, tôi cài nhắc lịch và hứa: \"Lần sau tôi sẽ không để chuyện tương tự xảy ra.\""],
    "먼저 연락하지 못해서 미안해요.": ["이사 준비로 정신이 없어 오랫동안 연락하지 못한 친구에게 전화를 걸어 \"먼저 연락하지 못해서 미안해요.\"라고 했어요.", "Vì bận chuẩn bị chuyển nhà nên lâu rồi tôi chưa liên lạc; gọi cho bạn, tôi nói: \"Xin lỗi vì tôi đã không liên lạc trước.\""],
    "그 제안에 동의하는 이유를 말씀드릴게요.": ["회의에서 새 일정을 승인하기 전에 우려를 해소하려고 \"그 제안에 동의하는 이유를 말씀드릴게요.\"라고 했어요.", "Trước khi thông qua lịch mới trong cuộc họp, tôi nói: \"Tôi sẽ nói lý do mình đồng ý với đề xuất đó.\""],
    "이번에는 정중히 거절하고 싶어요.": ["일정이 이미 가득 차 있어 추가 업무를 맡기 어렵다고 설명하며 \"이번에는 정중히 거절하고 싶어요.\"라고 말했어요.", "Lịch đã kín nên tôi giải thích rằng khó nhận thêm việc và nói: \"Lần này tôi muốn từ chối một cách lịch sự.\""],
    "부담 갖지 말고 편하게 말해 주세요.": ["후배가 실수를 숨기려는 듯 망설이자 해결책을 같이 찾자며 \"부담 갖지 말고 편하게 말해 주세요.\"라고 했어요.", "Khi thấy đàn em ngập ngừng như muốn giấu lỗi, tôi nói sẽ cùng tìm cách giải quyết: \"Đừng ngại, cứ thoải mái nói với tôi.\""],
    "상대방의 입장에서 한번 생각해 봐요.": ["서로 책임을 따지기 전에 각자 겪은 일을 떠올려 보자며 \"상대방의 입장에서 한번 생각해 봐요.\"라고 제안했어요.", "Trước khi đổ lỗi cho nhau, tôi đề nghị cùng nghĩ về trải nghiệm của mỗi người: \"Hãy thử suy nghĩ một lần từ góc nhìn của người kia.\""],
    "좋은 소식이 있어서 가장 먼저 알려 주고 싶었어요.": ["오랫동안 준비한 장학금에 합격해 가장 가까운 친구에게 \"좋은 소식이 있어서 가장 먼저 알려 주고 싶었어요.\"라고 말했어요.", "Tôi giành được học bổng đã chuẩn bị từ lâu nên nói với người bạn thân nhất: \"Tôi có tin vui nên muốn báo cho bạn đầu tiên.\""],
    "답장이 늦어도 괜찮으니 편할 때 연락해요.": ["친구가 바쁜 시험 기간이라 바로 답하기 어렵다며 \"답장이 늦어도 괜찮으니 편할 때 연락해요.\"라고 보냈어요.", "Vì bạn đang bận mùa thi, tôi nhắn: \"Bạn trả lời muộn cũng không sao, hãy liên lạc khi tiện nhé.\""],
    "잠깐 쉬었다가 다시 이야기할까요?": ["대화가 감정적으로 흐르기 시작해 물을 마시며 진정한 뒤 \"잠깐 쉬었다가 다시 이야기할까요?\"라고 제안했어요.", "Cuộc trò chuyện bắt đầu căng thẳng, nên sau khi uống nước bình tĩnh lại tôi đề nghị: \"Chúng ta nghỉ một lát rồi nói tiếp nhé?\""],
    "제 실수를 인정하고 사과드릴게요.": ["제가 보낸 파일이 잘못된 버전임을 확인하고 바로 연락해 \"제 실수를 인정하고 사과드릴게요.\"라고 했어요.", "Tôi phát hiện tệp mình gửi là phiên bản sai nên liên lạc ngay và nói: \"Tôi sẽ nhận lỗi và xin lỗi bạn.\""],
    "서로 다른 의견을 존중했으면 합니다.": ["회의가 찬반으로 나뉘어 목소리가 커지자 진행자가 \"서로 다른 의견을 존중했으면 합니다.\"라고 당부했어요.", "Khi cuộc họp chia thành hai phía và mọi người bắt đầu lớn tiếng, người chủ trì nhắc: \"Tôi mong chúng ta tôn trọng ý kiến khác nhau.\""],
    "오늘은 기분이 조금 가라앉아 있어요.": ["친구가 평소보다 말이 없어 이유를 묻자 억지로 괜찮은 척하지 않고 \"오늘은 기분이 조금 가라앉아 있어요.\"라고 답했어요.", "Khi bạn hỏi vì sao hôm nay tôi ít nói, tôi không giả vờ ổn mà trả lời: \"Hôm nay tâm trạng tôi hơi chùng xuống.\""],
    "도움이 필요하면 언제든지 말해 주세요.": ["새로 이사 온 이웃이 낯선 동네에서 어려움을 겪을까 봐 \"도움이 필요하면 언제든지 말해 주세요.\"라고 인사했어요.", "Lo người hàng xóm mới chuyển đến có thể gặp khó khăn ở khu phố lạ, tôi chào và nói: \"Nếu cần giúp đỡ, hãy nói với tôi bất cứ lúc nào.\""],
    "그 이야기는 여기까지만 나누고 싶어요.": ["개인적인 질문이 계속 이어져 더는 답하기 어렵다고 느껴 \"그 이야기는 여기까지만 나누고 싶어요.\"라고 선을 그었어요.", "Khi các câu hỏi riêng tư cứ tiếp tục và tôi thấy khó trả lời thêm, tôi đặt giới hạn: \"Tôi chỉ muốn chia sẻ câu chuyện đó đến đây thôi.\""],
    "당신의 선택을 응원할게요.": ["안정적인 직장을 그만두고 새로운 공부를 시작하겠다는 친구에게 \"당신의 선택을 응원할게요.\"라고 말했어요.", "Với người bạn định nghỉ công việc ổn định để bắt đầu học ngành mới, tôi nói: \"Tôi sẽ ủng hộ lựa chọn của bạn.\""],
    "제가 도울 수 있는 부분을 알려 주세요.": ["행사 준비가 벅차 보이는 동료에게 필요한 일을 나눠 맡자며 \"제가 도울 수 있는 부분을 알려 주세요.\"라고 했어요.", "Thấy đồng nghiệp có vẻ quá tải khi chuẩn bị sự kiện, tôi đề nghị chia bớt việc: \"Vui lòng cho tôi biết phần nào tôi có thể giúp.\""],
    "오랜만에 만나서 정말 반가워요.": ["몇 년 만에 동창 모임에서 다시 만난 친구를 보자 웃으며 \"오랜만에 만나서 정말 반가워요.\"라고 인사했어요.", "Gặp lại người bạn ở buổi họp lớp sau vài năm, tôi mỉm cười chào: \"Lâu rồi mới gặp lại, tôi rất vui.\""],
    "다음에 천천히 다시 이야기해요.": ["막차 시간이 가까워 대화를 마무리하며 못다 한 이야기는 다음에 하자고 \"다음에 천천히 다시 이야기해요.\"라고 했어요.", "Vì sắp đến giờ chuyến xe cuối, tôi kết thúc cuộc trò chuyện và nói sẽ kể tiếp lần sau: \"Lần sau chúng ta thong thả nói chuyện tiếp nhé.\""]
  };

  Object.keys(categories).forEach(function (category) {
    const rows = categories[category].split("\n");
    if (rows.length !== 30) throw new Error("Expected 30 expressions in category: " + category);
    rows.forEach(function (row, index) {
      const parts = row.split("|");
      if (parts.length !== 2 || parts.some(function (part) { return !part.trim(); })) {
        throw new Error("Invalid expression row: " + row);
      }
      const word = parts[0].trim();
      const meaning = parts[1].trim();
      const normalizedWord = normalize(word);
      if (existingWords.has(normalizedWord)) throw new Error("Duplicate Korean expression: " + word);
      existingWords.add(normalizedWord);
      const template = exampleTemplates[category][index % 3];
      const curatedExample = curatedExamples[word];
      additions.push({
        word: word,
        ipa: romanizeKorean(word),
        meaning: meaning,
        example: curatedExample ? curatedExample[0] : template[0].replace(/\{word\}/g, word),
        exampleKo: curatedExample ? curatedExample[1] : template[1].replace(/\{meaning\}/g, meaning),
        exampleReviewed: Boolean(curatedExample)
      });
    });
  });

  const curatedExampleCount = additions.filter(function (item) {
    return Object.prototype.hasOwnProperty.call(curatedExamples, item.word);
  }).length;
  if (Object.keys(curatedExamples).length !== 30 || curatedExampleCount !== 30) {
    throw new Error("Expected curated examples for all 30 communication expressions.");
  }
  if (additions.length !== 300 || new Set(additions.map(function (item) { return item.example; })).size !== 300) {
    throw new Error("Expected 300 unique Korean expression examples.");
  }
  for (const expression of additions) {
    if (requiredFields.some(function (field) { return typeof expression[field] !== "string" || !expression[field].trim(); }) ||
        /[가-힣]/.test(expression.meaning) || /[가-힣]/.test(expression.exampleKo) || /[^A-Za-z\s?!.,'-]/.test(expression.ipa)) {
      throw new Error("Invalid Korean-Vietnamese expression fields: " + expression.word);
    }
  }

  window.KOREAN_EXPRESSIONS = existing.concat(additions);
}());
