(function () {
  "use strict";
  // 100 individually written everyday Korean words. Keep prior word IDs/order stable.
  const additions = [
  {
    "level": "기초",
    "category": "집안·생활",
    "word": "신발장",
    "ipa": "sinbaljang",
    "meaning": "Tủ giày",
    "example": "집에 들어오면 신발을 신발장에 넣어요.",
    "exampleKo": "Khi về nhà, tôi cất giày vào tủ giày.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "집안·생활",
    "word": "전등",
    "ipa": "jeondeung",
    "meaning": "Đèn điện",
    "example": "밤에는 거실 전등을 켜 놓아요.",
    "exampleKo": "Buổi tối, tôi bật đèn phòng khách.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "집안·생활",
    "word": "형광등",
    "ipa": "hyeonggwangdeung",
    "meaning": "Đèn huỳnh quang",
    "example": "부엌 형광등이 깜빡여서 새것으로 바꿨어요.",
    "exampleKo": "Đèn huỳnh quang trong bếp nhấp nháy nên tôi đã thay cái mới.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "집안·생활",
    "word": "충전기",
    "ipa": "chungjeongi",
    "meaning": "Bộ sạc",
    "example": "휴대폰 충전기를 회사에 두고 왔어요.",
    "exampleKo": "Tôi để quên bộ sạc điện thoại ở công ty.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "집안·생활",
    "word": "리모컨",
    "ipa": "rimokeon",
    "meaning": "Điều khiển từ xa",
    "example": "에어컨 리모컨이 소파 밑에 있었어요.",
    "exampleKo": "Điều khiển máy lạnh nằm dưới ghế sofa.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "집안·생활",
    "word": "빗자루",
    "ipa": "bitjaru",
    "meaning": "Chổi",
    "example": "빗자루로 현관 앞 먼지를 쓸었어요.",
    "exampleKo": "Tôi dùng chổi quét bụi trước cửa ra vào.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "집안·생활",
    "word": "걸레",
    "ipa": "geolle",
    "meaning": "Giẻ lau",
    "example": "젖은 걸레로 식탁을 닦았어요.",
    "exampleKo": "Tôi lau bàn ăn bằng giẻ ướt.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "집안·생활",
    "word": "섬유유연제",
    "ipa": "seomyu yuyeonje",
    "meaning": "Nước xả vải",
    "example": "빨래할 때 섬유유연제를 조금만 넣어요.",
    "exampleKo": "Khi giặt đồ, tôi chỉ cho một ít nước xả vải.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "집안·생활",
    "word": "이불",
    "ipa": "ibul",
    "meaning": "Chăn",
    "example": "날씨가 추워져서 두꺼운 이불을 꺼냈어요.",
    "exampleKo": "Trời trở lạnh nên tôi lấy chăn dày ra.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "집안·생활",
    "word": "베개",
    "ipa": "begae",
    "meaning": "Gối",
    "example": "새 베개로 바꾸니 잠이 더 잘 와요.",
    "exampleKo": "Từ khi đổi sang gối mới, tôi ngủ ngon hơn.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "집안·생활",
    "word": "식탁",
    "ipa": "siktak",
    "meaning": "Bàn ăn",
    "example": "온 가족이 식탁에 둘러앉아 저녁을 먹었어요.",
    "exampleKo": "Cả gia đình ngồi quanh bàn ăn và dùng bữa tối.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "음식·쇼핑",
    "word": "계산대",
    "ipa": "gyesandae",
    "meaning": "Quầy thanh toán",
    "example": "계산대 앞에서 차례를 기다렸어요.",
    "exampleKo": "Tôi đợi đến lượt ở quầy thanh toán.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "음식·쇼핑",
    "word": "장바구니",
    "ipa": "jangbaguni",
    "meaning": "Giỏ mua hàng",
    "example": "장바구니에 과일과 우유를 담았어요.",
    "exampleKo": "Tôi bỏ trái cây và sữa vào giỏ mua hàng.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "음식·쇼핑",
    "word": "할인",
    "ipa": "harin",
    "meaning": "Giảm giá",
    "example": "오늘은 채소를 할인해서 싸게 샀어요.",
    "exampleKo": "Hôm nay rau được giảm giá nên tôi mua rẻ hơn.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "음식·쇼핑",
    "word": "쿠폰",
    "ipa": "kupon",
    "meaning": "Phiếu giảm giá",
    "example": "휴대폰 쿠폰을 보여 주고 할인을 받았어요.",
    "exampleKo": "Tôi đưa phiếu giảm giá trên điện thoại và được giảm tiền.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "음식·쇼핑",
    "word": "포장",
    "ipa": "pojang",
    "meaning": "Đóng gói; mang về",
    "example": "먹고 남은 음식을 포장해 달라고 했어요.",
    "exampleKo": "Tôi nhờ đóng gói đồ ăn còn thừa để mang về.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "음식·쇼핑",
    "word": "반찬",
    "ipa": "banchan",
    "meaning": "Món ăn kèm",
    "example": "오늘 저녁에는 반찬을 세 가지 만들었어요.",
    "exampleKo": "Tối nay tôi làm ba món ăn kèm.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "음식·쇼핑",
    "word": "국물",
    "ipa": "gungmul",
    "meaning": "Nước dùng",
    "example": "국물이 뜨거우니 천천히 드세요.",
    "exampleKo": "Nước dùng còn nóng, bạn hãy ăn từ từ.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "음식·쇼핑",
    "word": "간식",
    "ipa": "gansik",
    "meaning": "Đồ ăn nhẹ",
    "example": "오후에 배가 고파서 간식을 먹었어요.",
    "exampleKo": "Buổi chiều tôi đói nên ăn một ít đồ ăn nhẹ.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "교통·외출",
    "word": "차선",
    "ipa": "chaseon",
    "meaning": "Làn đường",
    "example": "버스 전용 차선에 들어가지 마세요.",
    "exampleKo": "Đừng đi vào làn đường dành riêng cho xe buýt.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "교통·외출",
    "word": "교통카드",
    "ipa": "gyotong kadeu",
    "meaning": "Thẻ giao thông",
    "example": "지하철을 탈 때 교통카드를 찍으세요.",
    "exampleKo": "Khi đi tàu điện ngầm, hãy quẹt thẻ giao thông.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "교통·외출",
    "word": "지름길",
    "ipa": "jireumgil",
    "meaning": "Đường tắt",
    "example": "공원 옆 지름길로 가면 십 분 빨라요.",
    "exampleKo": "Đi đường tắt cạnh công viên sẽ nhanh hơn mười phút.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "교통·외출",
    "word": "골목",
    "ipa": "golmok",
    "meaning": "Ngõ; hẻm",
    "example": "그 카페는 좁은 골목 안에 있어요.",
    "exampleKo": "Quán cà phê đó nằm trong con hẻm nhỏ.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "교통·외출",
    "word": "출입구",
    "ipa": "churipgu",
    "meaning": "Lối ra vào",
    "example": "건물 출입구는 오른쪽에 있습니다.",
    "exampleKo": "Lối ra vào tòa nhà ở bên phải.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "교통·외출",
    "word": "표지판",
    "ipa": "pyojipan",
    "meaning": "Biển chỉ dẫn",
    "example": "표지판을 보고 버스 정류장을 찾았어요.",
    "exampleKo": "Tôi nhìn biển chỉ dẫn để tìm trạm xe buýt.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "교통·외출",
    "word": "운전면허증",
    "ipa": "unjeon myeonheojeung",
    "meaning": "Bằng lái xe",
    "example": "차를 빌리려면 운전면허증이 필요해요.",
    "exampleKo": "Muốn thuê xe ô tô thì cần bằng lái xe.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "교통·외출",
    "word": "목적지",
    "ipa": "mokjeokji",
    "meaning": "Điểm đến",
    "example": "택시 기사님께 목적지를 말씀드렸어요.",
    "exampleKo": "Tôi đã nói điểm đến cho tài xế taxi.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "교통·외출",
    "word": "도착시간",
    "ipa": "dochak sigan",
    "meaning": "Giờ đến",
    "example": "버스 도착시간을 앱으로 확인했어요.",
    "exampleKo": "Tôi kiểm tra giờ đến của xe buýt trên ứng dụng.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "교통·외출",
    "word": "출발시간",
    "ipa": "chulbal sigan",
    "meaning": "Giờ khởi hành",
    "example": "기차 출발시간보다 일찍 역에 도착했어요.",
    "exampleKo": "Tôi đến ga trước giờ tàu khởi hành.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "교통·외출",
    "word": "요금",
    "ipa": "yogeum",
    "meaning": "Giá vé; cước phí",
    "example": "지하철 요금은 교통카드로 냈어요.",
    "exampleKo": "Tôi thanh toán tiền vé tàu điện ngầm bằng thẻ giao thông.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "건강·소통",
    "word": "처방전",
    "ipa": "cheobangjeon",
    "meaning": "Đơn thuốc",
    "example": "진료가 끝나고 의사에게 처방전을 받았어요.",
    "exampleKo": "Sau khi khám xong, tôi nhận đơn thuốc từ bác sĩ.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "건강·소통",
    "word": "예약",
    "ipa": "yeyak",
    "meaning": "Đặt lịch; đặt chỗ",
    "example": "병원 예약을 내일 오전으로 바꿨어요.",
    "exampleKo": "Tôi đổi lịch hẹn khám bệnh sang sáng mai.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "건강·소통",
    "word": "접수증",
    "ipa": "jeopsujeung",
    "meaning": "Phiếu tiếp nhận",
    "example": "접수증을 받고 대기실에서 기다렸어요.",
    "exampleKo": "Tôi nhận phiếu tiếp nhận rồi ngồi đợi ở phòng chờ.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "건강·소통",
    "word": "건강검진",
    "ipa": "geongang geomjin",
    "meaning": "Khám sức khỏe định kỳ",
    "example": "회사에서 매년 건강검진을 받아요.",
    "exampleKo": "Tôi khám sức khỏe định kỳ hằng năm qua công ty.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "건강·소통",
    "word": "휴식",
    "ipa": "hyusik",
    "meaning": "Nghỉ ngơi",
    "example": "오래 걸은 뒤에는 잠깐 휴식이 필요해요.",
    "exampleKo": "Sau khi đi bộ lâu, tôi cần nghỉ một lát.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "건강·소통",
    "word": "운동화",
    "ipa": "undonghwa",
    "meaning": "Giày thể thao",
    "example": "편한 운동화를 신고 산책했어요.",
    "exampleKo": "Tôi mang giày thể thao thoải mái để đi dạo.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "건강·소통",
    "word": "일정",
    "ipa": "iljeong",
    "meaning": "Lịch trình",
    "example": "이번 주 일정을 달력에 적어 두었어요.",
    "exampleKo": "Tôi ghi lịch trình tuần này vào lịch.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "건강·소통",
    "word": "약속시간",
    "ipa": "yaksok sigan",
    "meaning": "Giờ hẹn",
    "example": "약속시간에 늦지 않으려고 일찍 나갔어요.",
    "exampleKo": "Tôi ra ngoài sớm để không đến muộn giờ hẹn.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "건강·소통",
    "word": "인증번호",
    "ipa": "injeung beonho",
    "meaning": "Mã xác minh",
    "example": "문자로 받은 인증번호를 입력하세요.",
    "exampleKo": "Hãy nhập mã xác minh nhận được qua tin nhắn.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "건강·소통",
    "word": "메시지",
    "ipa": "mesiji",
    "meaning": "Tin nhắn",
    "example": "친구에게 도착했다고 메시지를 보냈어요.",
    "exampleKo": "Tôi nhắn cho bạn biết rằng mình đã đến nơi.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "정리하다",
    "ipa": "jeongnihada",
    "meaning": "Sắp xếp; dọn dẹp",
    "example": "주말마다 책상을 정리해요.",
    "exampleKo": "Cuối tuần nào tôi cũng dọn bàn học.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "청소하다",
    "ipa": "cheongsohada",
    "meaning": "Dọn vệ sinh",
    "example": "아침에 거실을 청소했어요.",
    "exampleKo": "Sáng nay tôi dọn phòng khách.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "빨래하다",
    "ipa": "ppallaehada",
    "meaning": "Giặt quần áo",
    "example": "비가 그쳐서 오늘은 빨래하려고 해요.",
    "exampleKo": "Trời đã tạnh mưa nên hôm nay tôi định giặt quần áo.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "닦다",
    "ipa": "dakda",
    "meaning": "Lau; chùi",
    "example": "식사 후에 식탁을 깨끗이 닦았어요.",
    "exampleKo": "Sau bữa ăn, tôi lau sạch bàn ăn.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "씻다",
    "ipa": "ssitda",
    "meaning": "Rửa; tắm",
    "example": "밖에서 돌아오면 손부터 씻어요.",
    "exampleKo": "Khi về từ bên ngoài, tôi rửa tay trước.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "끓이다",
    "ipa": "kkeurida",
    "meaning": "Đun sôi; nấu",
    "example": "냄비에 물을 끓여서 라면을 만들었어요.",
    "exampleKo": "Tôi đun nước trong nồi để nấu mì.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "볶다",
    "ipa": "bokda",
    "meaning": "Xào; rang",
    "example": "양파와 고기를 함께 볶았어요.",
    "exampleKo": "Tôi xào hành tây với thịt.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "데우다",
    "ipa": "deuda",
    "meaning": "Hâm nóng",
    "example": "남은 국을 전자레인지에 데웠어요.",
    "exampleKo": "Tôi hâm nóng canh còn lại bằng lò vi sóng.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "꺼내다",
    "ipa": "kkeonaeda",
    "meaning": "Lấy ra",
    "example": "가방에서 지갑을 꺼냈어요.",
    "exampleKo": "Tôi lấy ví ra khỏi túi.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "넣다",
    "ipa": "neota",
    "meaning": "Cho vào",
    "example": "냉장고에 우유를 넣어 주세요.",
    "exampleKo": "Hãy cho sữa vào tủ lạnh.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "챙기다",
    "ipa": "chaenggida",
    "meaning": "Chuẩn bị; mang theo",
    "example": "집을 나서기 전에 우산을 챙기세요.",
    "exampleKo": "Trước khi ra khỏi nhà, hãy nhớ mang ô.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "잊다",
    "ipa": "itda",
    "meaning": "Quên",
    "example": "비밀번호를 잊어서 다시 설정했어요.",
    "exampleKo": "Tôi quên mật khẩu nên đã đặt lại.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "기억하다",
    "ipa": "gieokhada",
    "meaning": "Ghi nhớ",
    "example": "친구의 생일을 꼭 기억하려고 해요.",
    "exampleKo": "Tôi cố gắng nhớ sinh nhật của bạn.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "고르다",
    "ipa": "goreuda",
    "meaning": "Chọn",
    "example": "메뉴가 많아서 무엇을 고를지 고민했어요.",
    "exampleKo": "Vì có nhiều món nên tôi phân vân không biết chọn gì.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "바꾸다",
    "ipa": "bakkuda",
    "meaning": "Thay đổi; đổi",
    "example": "휴대폰 배경화면을 새 사진으로 바꿨어요.",
    "exampleKo": "Tôi đổi hình nền điện thoại sang ảnh mới.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "비교하다",
    "ipa": "bigyohada",
    "meaning": "So sánh",
    "example": "두 제품의 가격을 비교했어요.",
    "exampleKo": "Tôi so sánh giá của hai sản phẩm.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "저장하다",
    "ipa": "jeojanghada",
    "meaning": "Lưu",
    "example": "중요한 사진은 따로 저장해 두세요.",
    "exampleKo": "Hãy lưu riêng những bức ảnh quan trọng.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "확인하다",
    "ipa": "hwaginhada",
    "meaning": "Kiểm tra; xác nhận",
    "example": "출발 전에 기차 시간을 다시 확인했어요.",
    "exampleKo": "Tôi kiểm tra lại giờ tàu trước khi khởi hành.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "신청하다",
    "ipa": "sincheonghada",
    "meaning": "Đăng ký; nộp đơn",
    "example": "온라인으로 수업을 신청했어요.",
    "exampleKo": "Tôi đăng ký lớp học trực tuyến.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 동사",
    "word": "취소하다",
    "ipa": "chwisohada",
    "meaning": "Hủy",
    "example": "비가 많이 와서 예약을 취소했어요.",
    "exampleKo": "Mưa to nên tôi hủy đặt chỗ.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "편하다",
    "ipa": "pyeonhada",
    "meaning": "Thoải mái",
    "example": "이 신발은 오래 걸어도 발이 편해요.",
    "exampleKo": "Đôi giày này đi lâu chân vẫn thoải mái.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "불편하다",
    "ipa": "bulpyeonhada",
    "meaning": "Bất tiện; khó chịu",
    "example": "의자가 너무 낮아서 앉기 불편해요.",
    "exampleKo": "Ghế quá thấp nên ngồi không thoải mái.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "피곤하다",
    "ipa": "pigonhada",
    "meaning": "Mệt mỏi",
    "example": "어제 늦게 자서 오늘 피곤해요.",
    "exampleKo": "Hôm qua tôi ngủ muộn nên hôm nay mệt.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "배고프다",
    "ipa": "baegopeuda",
    "meaning": "Đói",
    "example": "점심을 못 먹어서 많이 배고파요.",
    "exampleKo": "Tôi chưa ăn trưa nên rất đói.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "목마르다",
    "ipa": "mongmareuda",
    "meaning": "Khát",
    "example": "운동하고 나니 목말라서 물을 마셨어요.",
    "exampleKo": "Tập thể dục xong tôi khát nên uống nước.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "늦다",
    "ipa": "neutda",
    "meaning": "Muộn",
    "example": "길이 막혀서 조금 늦었어요.",
    "exampleKo": "Tắc đường nên tôi đến muộn một chút.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "빠르다",
    "ipa": "ppareuda",
    "meaning": "Nhanh",
    "example": "이 열차는 버스보다 빨라요.",
    "exampleKo": "Tàu này nhanh hơn xe buýt.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "비싸다",
    "ipa": "bissada",
    "meaning": "Đắt",
    "example": "이 가게의 과일은 조금 비싸요.",
    "exampleKo": "Trái cây ở cửa hàng này hơi đắt.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "저렴하다",
    "ipa": "jeoryeomhada",
    "meaning": "Rẻ; giá hợp lý",
    "example": "시장에서는 채소를 저렴하게 살 수 있어요.",
    "exampleKo": "Ở chợ có thể mua rau với giá hợp lý.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "깨끗하다",
    "ipa": "kkaekkeuthada",
    "meaning": "Sạch sẽ",
    "example": "손님이 오기 전에 방을 깨끗하게 청소했어요.",
    "exampleKo": "Tôi đã dọn phòng sạch sẽ trước khi khách đến.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "더럽다",
    "ipa": "deoreopda",
    "meaning": "Bẩn",
    "example": "바닥이 더러워서 걸레질을 했어요.",
    "exampleKo": "Sàn bẩn nên tôi lau nhà.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "시끄럽다",
    "ipa": "sikkeureopda",
    "meaning": "Ồn ào",
    "example": "밖이 시끄러워서 창문을 닫았어요.",
    "exampleKo": "Ngoài trời ồn nên tôi đóng cửa sổ.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "조용하다",
    "ipa": "joyonghada",
    "meaning": "Yên tĩnh",
    "example": "아침 일찍 카페가 조용해서 공부하기 좋아요.",
    "exampleKo": "Sáng sớm quán cà phê yên tĩnh nên rất thích hợp để học.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "복잡하다",
    "ipa": "bokjaphada",
    "meaning": "Đông đúc; phức tạp",
    "example": "퇴근 시간에는 지하철이 복잡해요.",
    "exampleKo": "Giờ tan tầm tàu điện ngầm rất đông.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "한가하다",
    "ipa": "hangahada",
    "meaning": "Rảnh rỗi",
    "example": "오늘은 일이 적어서 오후에 조금 한가해요.",
    "exampleKo": "Hôm nay ít việc nên buổi chiều tôi khá rảnh.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "충분하다",
    "ipa": "chungbunhada",
    "meaning": "Đủ; đầy đủ",
    "example": "시간이 충분하니 천천히 해도 돼요.",
    "exampleKo": "Còn đủ thời gian nên bạn cứ làm từ từ.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "부족하다",
    "ipa": "bujokhada",
    "meaning": "Thiếu; không đủ",
    "example": "재료가 부족해서 마트에 다녀왔어요.",
    "exampleKo": "Thiếu nguyên liệu nên tôi đã đi siêu thị.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "잠깐",
    "ipa": "jamkkan",
    "meaning": "Một lát",
    "example": "잠깐만 기다려 주세요.",
    "exampleKo": "Xin hãy đợi một lát.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "금방",
    "ipa": "geumbang",
    "meaning": "Ngay; rất nhanh",
    "example": "음식이 금방 나올 거예요.",
    "exampleKo": "Món ăn sẽ ra ngay thôi.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "상태·부사",
    "word": "자주",
    "ipa": "jaju",
    "meaning": "Thường xuyên",
    "example": "저는 집 근처 공원에 자주 가요.",
    "exampleKo": "Tôi thường xuyên đến công viên gần nhà.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "마스크",
    "ipa": "maseukeu",
    "meaning": "Khẩu trang",
    "example": "감기에 걸렸을 때는 마스크를 써요.",
    "exampleKo": "Khi bị cảm, tôi đeo khẩu trang.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "손소독제",
    "ipa": "son sodokje",
    "meaning": "Dung dịch sát khuẩn tay",
    "example": "병원 입구에 손소독제가 있어요.",
    "exampleKo": "Có dung dịch sát khuẩn tay ở cửa bệnh viện.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "분리수거",
    "ipa": "bulli sugeo",
    "meaning": "Phân loại rác",
    "example": "우리 아파트는 수요일에 분리수거를 해요.",
    "exampleKo": "Chung cư của chúng tôi phân loại rác vào thứ Tư.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "재활용",
    "ipa": "jaehwaryong",
    "meaning": "Tái chế",
    "example": "플라스틱 병은 재활용 쓰레기로 버리세요.",
    "exampleKo": "Hãy bỏ chai nhựa vào rác tái chế.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "음식물쓰레기",
    "ipa": "eumsikmul sseuregi",
    "meaning": "Rác thải thực phẩm",
    "example": "음식물쓰레기는 전용 봉투에 버려요.",
    "exampleKo": "Rác thực phẩm được bỏ vào túi chuyên dụng.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "택배",
    "ipa": "taekbae",
    "meaning": "Hàng giao tận nhà",
    "example": "주문한 택배가 오늘 도착했어요.",
    "exampleKo": "Đơn hàng tôi đặt được giao đến hôm nay.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "배송",
    "ipa": "baesong",
    "meaning": "Giao hàng",
    "example": "배송이 늦어져서 고객센터에 연락했어요.",
    "exampleKo": "Việc giao hàng chậm nên tôi đã liên hệ bộ phận chăm sóc khách hàng.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "택배기사",
    "ipa": "taekbae gisa",
    "meaning": "Nhân viên giao hàng",
    "example": "택배기사님이 문 앞에 상자를 놓고 가셨어요.",
    "exampleKo": "Nhân viên giao hàng để thùng hàng trước cửa rồi đi.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "송장",
    "ipa": "songjang",
    "meaning": "Vận đơn",
    "example": "송장 번호로 배송 위치를 확인했어요.",
    "exampleKo": "Tôi tra cứu vị trí đơn hàng bằng mã vận đơn.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "거스름돈",
    "ipa": "geoseureumdon",
    "meaning": "Tiền thối lại",
    "example": "현금으로 계산하고 거스름돈을 받았어요.",
    "exampleKo": "Tôi trả tiền mặt và nhận tiền thừa.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "계좌번호",
    "ipa": "gyejwa beonho",
    "meaning": "Số tài khoản ngân hàng",
    "example": "송금하기 전에 계좌번호를 다시 확인했어요.",
    "exampleKo": "Tôi kiểm tra lại số tài khoản trước khi chuyển tiền.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "이체",
    "ipa": "iche",
    "meaning": "Chuyển khoản",
    "example": "은행 앱으로 월세를 이체했어요.",
    "exampleKo": "Tôi chuyển tiền thuê nhà bằng ứng dụng ngân hàng.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "결제",
    "ipa": "gyeolje",
    "meaning": "Thanh toán",
    "example": "카드 결제가 안 돼서 현금으로 냈어요.",
    "exampleKo": "Thanh toán bằng thẻ không được nên tôi trả tiền mặt.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "가격표",
    "ipa": "gagyeokpyo",
    "meaning": "Nhãn giá",
    "example": "가격표를 확인한 뒤 물건을 골랐어요.",
    "exampleKo": "Tôi xem nhãn giá rồi chọn món hàng.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "품절",
    "ipa": "pumjeol",
    "meaning": "Hết hàng",
    "example": "사려고 했던 운동화가 품절됐어요.",
    "exampleKo": "Đôi giày thể thao tôi định mua đã hết hàng.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "교환",
    "ipa": "gyohwan",
    "meaning": "Đổi hàng",
    "example": "사이즈가 안 맞아서 교환을 요청했어요.",
    "exampleKo": "Vì kích cỡ không vừa nên tôi yêu cầu đổi hàng.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "반품",
    "ipa": "banpum",
    "meaning": "Trả hàng",
    "example": "제품에 문제가 있어 반품을 신청했어요.",
    "exampleKo": "Sản phẩm có vấn đề nên tôi yêu cầu trả hàng.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "환불",
    "ipa": "hwanbul",
    "meaning": "Hoàn tiền",
    "example": "취소한 주문의 환불을 기다리고 있어요.",
    "exampleKo": "Tôi đang chờ hoàn tiền cho đơn hàng đã hủy.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "관리비",
    "ipa": "gwanribi",
    "meaning": "Phí quản lý",
    "example": "이번 달 관리비가 지난달보다 많이 나왔어요.",
    "exampleKo": "Phí quản lý tháng này cao hơn tháng trước khá nhiều.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "category": "생활 서비스",
    "word": "공과금",
    "ipa": "gonggwageum",
    "meaning": "Hóa đơn tiện ích",
    "example": "전기와 수도 공과금을 제때 내야 해요.",
    "exampleKo": "Cần thanh toán hóa đơn điện nước đúng hạn.",
    "exampleReviewed": true
  }
];
  const current = Array.isArray(window.KOREAN_WORDS) ? window.KOREAN_WORDS : [];
  const known = new Set(current.map(function (entry) { return entry.word.normalize("NFC"); }));
  additions.forEach(function (entry) {
    if (known.has(entry.word.normalize("NFC"))) throw new Error("Duplicate Korean daily word: " + entry.word);
    known.add(entry.word.normalize("NFC"));
  });
  window.KOREAN_WORDS = current.concat(additions);
}());
