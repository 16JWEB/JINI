(function () {
  "use strict";

  const groups = [
    `남자|namja|Người đàn ông
여자|yeoja|Người phụ nữ
아이|ai|Trẻ em
어른|eoreun|Người lớn
아버지|abeoji|Bố
어머니|eomeoni|Mẹ
부모님|bumonim|Bố mẹ
형|hyeong|Anh trai (nam giới dùng)
누나|nuna|Chị gái (nam giới dùng)
오빠|oppa|Anh trai (nữ giới dùng)
언니|eonni|Chị gái (nữ giới dùng)
동생|dongsaeng|Em
형제|hyeongje|Anh chị em trai
자매|jamae|Chị em gái
아들|adeul|Con trai
딸|ttal|Con gái
남편|nampyeon|Chồng
아내|anae|Vợ
할아버지|harabeoji|Ông
할머니|halmeoni|Bà
삼촌|samchon|Chú; cậu
이모|imo|Dì (bên mẹ)
고모|gomo|Cô (bên bố)
사촌|sachon|Anh chị em họ
손님|sonnim|Khách
주인|juin|Chủ
의사|uisa|Bác sĩ
간호사|ganhosa|Y tá
경찰관|gyeongchalgwan|Cảnh sát
요리사|yorisa|Đầu bếp`,
    `아파트|apateu|Căn hộ
건물|geonmul|Tòa nhà
문|mun|Cửa
창문|changmun|Cửa sổ
거실|geosil|Phòng khách
부엌|bueok|Nhà bếp
화장실|hwajangsil|Nhà vệ sinh
침실|chimsil|Phòng ngủ
책상|chaeksang|Bàn học
의자|uija|Ghế
침대|chimdae|Giường
소파|sopa|Ghế sofa
옷장|otjang|Tủ quần áo
냉장고|naengjanggo|Tủ lạnh
세탁기|setakgi|Máy giặt
텔레비전|tellebijeon|Ti vi
컴퓨터|keompyuteo|Máy tính
휴대폰|hyudaepon|Điện thoại di động
전화기|jeonhwagi|Điện thoại
시계|sigye|Đồng hồ
열쇠|yeolsoe|Chìa khóa
가방|gabang|Túi; cặp
신발|sinbal|Giày
옷|ot|Quần áo
모자|moja|Mũ
우산|usan|Ô; dù
수건|sugeon|Khăn
비누|binu|Xà phòng
칫솔|chitsol|Bàn chải đánh răng
거울|geoul|Gương`,
    `과일|gwail|Trái cây
사과|sagwa|Táo
바나나|banana|Chuối
포도|podo|Nho
딸기|ttalgi|Dâu tây
수박|subak|Dưa hấu
오렌지|orenji|Cam
채소|chaeso|Rau
감자|gamja|Khoai tây
고구마|goguma|Khoai lang
당근|danggeun|Cà rốt
양파|yangpa|Hành tây
마늘|maneul|Tỏi
토마토|tomato|Cà chua
고기|gogi|Thịt
소고기|sogogi|Thịt bò
돼지고기|dwaejigogi|Thịt lợn
닭고기|dakgogi|Thịt gà
생선|saengseon|Cá
달걀|dalgyal|Trứng
치즈|chijeu|Phô mai
주스|juseu|Nước ép
차|cha|Trà
국|guk|Canh
찌개|jjigae|Món hầm
김치|gimchi|Kim chi
국수|guksu|Mì
라면|ramyeon|Mì ăn liền
빵|ppang|Bánh mì
설탕|seoltang|Đường`,
    `회사|hoesa|Công ty
가게|gage|Cửa hàng
시장|sijang|Chợ
식당|sikdang|Nhà hàng
카페|kape|Quán cà phê
병원|byeongwon|Bệnh viện
약국|yakguk|Nhà thuốc
은행|eunhaeng|Ngân hàng
우체국|ucheguk|Bưu điện
도서관|doseogwan|Thư viện
공원|gongwon|Công viên
역|yeok|Nhà ga
공항|gonghang|Sân bay
정류장|jeongnyujang|Trạm xe buýt
호텔|hotel|Khách sạn
경찰서|gyeongchalseo|Đồn cảnh sát
소방서|sobangseo|Trạm cứu hỏa
박물관|bangmulgwan|Bảo tàng
영화관|yeonghwagwan|Rạp chiếu phim
운동장|undongjang|Sân vận động
교실|gyosil|Phòng học
사무실|samusil|Văn phòng
나라|nara|Đất nước
도시|dosi|Thành phố
마을|maeul|Ngôi làng
거리|geori|Con phố
길|gil|Con đường
주차장|juchajang|Bãi đỗ xe
백화점|baekhwajeom|Cửa hàng bách hóa
미용실|miyongsil|Tiệm làm tóc`,
    `자동차|jadongcha|Ô tô
버스|beoseu|Xe buýt
기차|gicha|Tàu hỏa
지하철|jihacheol|Tàu điện ngầm
택시|taeksi|Taxi
비행기|bihaenggi|Máy bay
자전거|jajeongeo|Xe đạp
오토바이|otobai|Xe máy
배|bae|Thuyền
표|pyo|Vé
여권|yeogwon|Hộ chiếu
지도|jido|Bản đồ
여행|yeohaeng|Chuyến du lịch
휴가|hyuga|Kỳ nghỉ
출발|chulbal|Sự khởi hành
도착|dochak|Sự đến nơi
주소|juso|Địa chỉ
교통|gyotong|Giao thông
신호등|sinhodeung|Đèn giao thông
짐|jim|Hành lý
좌석|jwaseok|Chỗ ngồi
입구|ipgu|Lối vào
출구|chulgu|Lối ra
계단|gyedan|Cầu thang
엘리베이터|ellibeiteo|Thang máy
에스컬레이터|eseukalleiteo|Thang cuốn
다리|dari|Cây cầu
터널|teoneol|Đường hầm
교차로|gyocharo|Ngã tư
정거장|jeonggeojang|Bến xe`,
    `몸|mom|Cơ thể
머리|meori|Đầu
얼굴|eolgul|Khuôn mặt
눈|nun|Mắt
코|ko|Mũi
입|ip|Miệng
귀|gwi|Tai
목|mok|Cổ
어깨|eokkae|Vai
팔|pal|Cánh tay
손|son|Bàn tay
손가락|songarak|Ngón tay
무릎|mureup|Đầu gối
발|bal|Bàn chân
발가락|balgarak|Ngón chân
등|deung|Lưng
위|wi|Dạ dày
심장|simjang|Tim
건강|geongang|Sức khỏe
병|byeong|Bệnh
감기|gamgi|Cảm lạnh
약|yak|Thuốc
진료|jillyo|Việc khám bệnh
수술|susul|Ca phẫu thuật
열|yeol|Cơn sốt
기침|gichim|Cơn ho
통증|tongjeung|Cơn đau
상처|sangcheo|Vết thương
잠|jam|Giấc ngủ
꿈|kkum|Giấc mơ`,
    `하늘|haneul|Bầu trời
구름|gureum|Đám mây
바람|baram|Gió
비|bi|Mưa
안개|angae|Sương mù
날씨|nalssi|Thời tiết
햇빛|haetbit|Ánh nắng
달|dal|Mặt trăng
별|byeol|Ngôi sao
바다|bada|Biển
강|gang|Sông
산|san|Núi
섬|seom|Hòn đảo
숲|sup|Rừng
나무|namu|Cây
꽃|kkot|Hoa
풀|pul|Cỏ
돌|dol|Đá
모래|morae|Cát
바위|bawi|Tảng đá
동물|dongmul|Động vật
개|gae|Chó
고양이|goyangi|Mèo
새|sae|Chim
벌|beol|Ong
나비|nabi|Bướm
벌레|beolle|Côn trùng
계절|gyejeol|Mùa
여름|yeoreum|Mùa hè
가을|gaeul|Mùa thu`,
    `시간|sigan|Thời gian
분|bun|Phút
초|cho|Giây
하루|haru|Một ngày
아침|achim|Buổi sáng
점심|jeomsim|Buổi trưa
저녁|jeonyeok|Buổi tối
밤|bam|Ban đêm
새벽|saebyeok|Rạng sáng
주|ju|Tuần
주말|jumal|Cuối tuần
평일|pyeongil|Ngày thường
월요일|woryoil|Thứ Hai
화요일|hwayoil|Thứ Ba
수요일|suyoil|Thứ Tư
목요일|mogyoil|Thứ Năm
금요일|geumyoil|Thứ Sáu
토요일|toyoil|Thứ Bảy
일요일|iryoil|Chủ nhật
월|wol|Tháng
년|nyeon|Năm
생일|saengil|Sinh nhật
날짜|naljja|Ngày tháng
달력|dallyeok|Lịch
약속|yaksok|Cuộc hẹn
계획|gyehoek|Kế hoạch
순간|sungan|Khoảnh khắc
미래|mirae|Tương lai
과거|gwageo|Quá khứ
지금|jigeum|Bây giờ`,
    `한국어|hangugeo|Tiếng Hàn
한국|hanguk|Hàn Quốc
베트남|beteunam|Việt Nam
말|mal|Lời nói
단어|daneo|Từ vựng
문장|munjang|Câu
글자|geulja|Chữ cái
이름|ireum|Tên
질문|jilmun|Câu hỏi
대답|daedap|Câu trả lời
뜻|tteut|Ý nghĩa
소리|sori|Âm thanh
음악|eumak|Âm nhạc
노래|norae|Bài hát
사진|sajin|Ảnh
그림|geurim|Bức tranh
영화|yeonghwa|Phim
이야기|iyagi|Câu chuyện
편지|pyeonji|Thư
이메일|imeil|Thư điện tử
인터넷|inteonet|Internet
비밀번호|bimilbeonho|Mật khẩu
숫자|sutja|Con số
돈|don|Tiền
가격|gagyeok|Giá cả
카드|kadeu|Thẻ
현금|hyeongeum|Tiền mặt
영수증|yeongsujeung|Hóa đơn
선물|seonmul|Quà tặng
취미|chwimi|Sở thích`
  ];

  const rows = groups.reduce(function (allRows, group) {
    return allRows.concat(group.split("\n").map(function (row) { return row.trim(); }));
  }, []);

  if (rows.length !== 270) {
    throw new Error("Korean vocabulary additions must contain exactly 270 entries; found " + rows.length + ".");
  }

  const curatedExamples = {
    "남자": ["저 남자는 우리 회사에서 일해요.", "Người đàn ông đó làm việc ở công ty tôi."],
    "여자": ["그 여자는 매일 아침 공원에서 운동해요.", "Người phụ nữ đó tập thể dục ở công viên mỗi sáng."],
    "아이": ["아이가 엄마 손을 잡고 길을 건너요.", "Đứa trẻ nắm tay mẹ băng qua đường."],
    "어른": ["어른이 되면 혼자서 결정할 일이 많아져요.", "Khi trưởng thành, bạn sẽ có nhiều việc phải tự quyết định hơn."],
    "아버지": ["아버지는 주말마다 가족을 위해 요리하세요.", "Bố nấu ăn cho gia đình mỗi cuối tuần."],
    "어머니": ["어머니께서 시장에서 신선한 과일을 사 오셨어요.", "Mẹ đã mua trái cây tươi ở chợ về."],
    "부모님": ["부모님께 여행 사진을 보내 드렸어요.", "Tôi đã gửi ảnh du lịch cho bố mẹ."],
    "형": ["형은 퇴근 후에 동생과 축구를 해요.", "Anh trai chơi bóng đá với em sau giờ làm."],
    "누나": ["누나가 제가 모르는 한국어 단어를 알려 줬어요.", "Chị gái đã chỉ cho tôi những từ tiếng Hàn mà tôi chưa biết."],
    "오빠": ["오빠는 주말에 새 자전거를 타고 한강에 가요.", "Anh trai đạp xe mới đến sông Hàn vào cuối tuần."],
    "언니": ["언니와 카페에서 만나서 점심을 먹었어요.", "Tôi gặp chị gái ở quán cà phê và ăn trưa cùng nhau."],
    "동생": ["동생은 올해 대학교에 입학했어요.", "Em tôi đã vào đại học năm nay."],
    "형제": ["그 집에는 사이좋은 형제가 세 명 있어요.", "Gia đình đó có ba anh em trai rất hòa thuận."],
    "자매": ["두 자매는 같은 학교에서 공부해요.", "Hai chị em gái học cùng một trường."],
    "아들": ["아들이 학교에서 배운 노래를 집에서 불렀어요.", "Con trai tôi đã hát bài học ở trường tại nhà."],
    "딸": ["딸은 그림 그리기를 좋아해서 미술 수업을 들어요.", "Con gái tôi thích vẽ nên tham gia lớp mỹ thuật."],
    "남편": ["남편과 저녁 식사 후에 동네를 산책했어요.", "Tôi đi dạo quanh khu phố với chồng sau bữa tối."],
    "아내": ["아내가 출장에서 돌아오는 날 공항에 마중 나갔어요.", "Tôi ra sân bay đón vợ vào ngày cô ấy trở về sau chuyến công tác."],
    "할아버지": ["할아버지는 어릴 때 살던 마을 이야기를 자주 해 주세요.", "Ông thường kể cho tôi nghe chuyện về ngôi làng nơi ông sống khi còn nhỏ."],
    "할머니": ["할머니께서 직접 만드신 김치가 정말 맛있어요.", "Kim chi bà tự làm thật sự rất ngon."],
    "삼촌": ["삼촌은 다음 달에 베트남으로 여행을 가세요.", "Chú tôi sẽ đi du lịch Việt Nam vào tháng tới."],
    "이모": ["이모가 생일 선물로 예쁜 가방을 사 주셨어요.", "Dì đã mua tặng tôi một chiếc túi đẹp làm quà sinh nhật."],
    "고모": ["고모는 명절마다 가족에게 안부 전화를 하세요.", "Cô thường gọi điện hỏi thăm gia đình vào mỗi dịp lễ."],
    "사촌": ["방학 동안 사촌과 바닷가에서 즐거운 시간을 보냈어요.", "Tôi đã có khoảng thời gian vui vẻ ở bãi biển với anh chị em họ trong kỳ nghỉ."],
    "손님": ["손님이 오시기 전에 거실을 깨끗하게 청소했어요.", "Tôi đã dọn phòng khách sạch sẽ trước khi khách đến."],
    "주인": ["가게 주인이 친절하게 길을 알려 주셨어요.", "Chủ cửa hàng đã nhiệt tình chỉ đường cho tôi."],
    "의사": ["의사는 검사 결과를 설명하고 약을 처방했어요.", "Bác sĩ giải thích kết quả kiểm tra và kê thuốc."],
    "간호사": ["간호사가 환자의 체온을 확인하고 물을 가져다줬어요.", "Y tá kiểm tra nhiệt độ của bệnh nhân và mang nước đến."],
    "경찰관": ["경찰관이 사고 현장에서 교통을 정리하고 있어요.", "Cảnh sát đang điều tiết giao thông tại hiện trường vụ tai nạn."],
    "요리사": ["요리사가 신선한 재료로 저녁 메뉴를 준비했어요.", "Đầu bếp đã chuẩn bị thực đơn bữa tối bằng nguyên liệu tươi."],

    "아파트": ["저는 회사에서 가까운 아파트에 살고 있어요.", "Tôi đang sống trong một căn hộ gần công ty."],
    "건물": ["이 건물에는 엘리베이터와 작은 카페가 있어요.", "Tòa nhà này có thang máy và một quán cà phê nhỏ."],
    "문": ["바람이 들어오지 않게 문을 닫아 주세요.", "Vui lòng đóng cửa để gió không lùa vào."],
    "창문": ["아침에 창문을 열면 신선한 공기가 들어와요.", "Mở cửa sổ vào buổi sáng sẽ đón được không khí trong lành."],
    "거실": ["저녁에는 가족과 거실에서 함께 텔레비전을 봐요.", "Buổi tối tôi xem ti vi cùng gia đình trong phòng khách."],
    "부엌": ["부엌에서 채소를 씻고 저녁을 준비했어요.", "Tôi rửa rau và chuẩn bị bữa tối trong nhà bếp."],
    "화장실": ["화장실은 복도 끝에 있으니 오른쪽으로 가세요.", "Nhà vệ sinh ở cuối hành lang, hãy đi về phía bên phải."],
    "침실": ["침실을 어둡게 하고 일찍 잠자리에 들었어요.", "Tôi làm tối phòng ngủ và đi ngủ sớm."],
    "책상": ["책상 위에 책과 노트를 가지런히 놓았어요.", "Tôi xếp sách và vở ngay ngắn trên bàn học."],
    "의자": ["오래 앉아 있었더니 의자가 조금 불편해요.", "Ngồi lâu khiến tôi thấy chiếc ghế hơi khó chịu."],
    "침대": ["피곤한 날에는 침대에 눕자마자 잠이 들어요.", "Vào ngày mệt mỏi, tôi ngủ thiếp đi ngay khi nằm lên giường."],
    "소파": ["손님이 오셔서 소파에 앉아 차를 마셨어요.", "Khách đến nên chúng tôi ngồi trên ghế sofa uống trà."],
    "옷장": ["계절이 바뀌어서 옷장에 겨울옷을 정리했어요.", "Mùa thay đổi nên tôi sắp xếp quần áo mùa đông trong tủ."],
    "냉장고": ["냉장고에 우유와 달걀, 과일이 있어요.", "Trong tủ lạnh có sữa, trứng và trái cây."],
    "세탁기": ["운동복이 더러워져서 세탁기에 넣었어요.", "Quần áo tập bị bẩn nên tôi cho vào máy giặt."],
    "텔레비전": ["저녁 뉴스를 보려고 텔레비전을 켰어요.", "Tôi bật ti vi để xem tin tức buổi tối."],
    "컴퓨터": ["컴퓨터로 보고서를 작성한 뒤 이메일로 보냈어요.", "Tôi soạn báo cáo trên máy tính rồi gửi qua email."],
    "휴대폰": ["휴대폰 배터리가 없어서 친구에게 연락하지 못했어요.", "Điện thoại hết pin nên tôi không thể liên lạc với bạn."],
    "전화기": ["전화기가 울려서 회의가 잠시 중단됐어요.", "Điện thoại reo nên cuộc họp tạm dừng một lúc."],
    "시계": ["약속 시간에 늦지 않도록 시계를 확인했어요.", "Tôi xem đồng hồ để không đến muộn cuộc hẹn."],
    "열쇠": ["집에 도착했는데 열쇠를 사무실에 두고 왔어요.", "Tôi về đến nhà nhưng đã để quên chìa khóa ở văn phòng."],
    "가방": ["여행에 필요한 옷과 여권을 가방에 넣었어요.", "Tôi cho quần áo cần thiết và hộ chiếu vào túi."],
    "신발": ["비가 와서 젖은 신발을 현관에 벗어 두었어요.", "Trời mưa nên tôi cởi đôi giày ướt và để ở cửa ra vào."],
    "옷": ["내일 중요한 약속이 있어서 깨끗한 옷을 준비했어요.", "Ngày mai có cuộc hẹn quan trọng nên tôi đã chuẩn bị quần áo sạch."],
    "모자": ["햇빛이 강해서 밖에 나갈 때 모자를 썼어요.", "Nắng gắt nên tôi đội mũ khi ra ngoài."],
    "우산": ["비가 올 것 같아서 가방에 작은 우산을 넣었어요.", "Có vẻ trời sắp mưa nên tôi bỏ chiếc ô nhỏ vào túi."],
    "수건": ["운동을 마친 뒤 수건으로 땀을 닦았어요.", "Sau khi tập thể dục, tôi lau mồ hôi bằng khăn."],
    "비누": ["손을 씻을 때 비누를 사용하면 더 깨끗해요.", "Dùng xà phòng khi rửa tay sẽ sạch hơn."],
    "칫솔": ["새 칫솔로 이를 닦고 잠자리에 들었어요.", "Tôi đánh răng bằng bàn chải mới rồi đi ngủ."],
    "거울": ["외출하기 전에 거울을 보고 머리를 정리했어요.", "Trước khi ra ngoài, tôi soi gương và chỉnh lại tóc."],

    "과일": ["아침마다 여러 가지 과일을 먹으려고 해요.", "Tôi cố gắng ăn nhiều loại trái cây vào mỗi buổi sáng."],
    "사과": ["시장에 들러서 사과와 배를 몇 개 샀어요.", "Tôi ghé chợ và mua vài quả táo với lê."],
    "바나나": ["운동하기 전에 바나나를 하나 먹으면 힘이 나요.", "Ăn một quả chuối trước khi tập thể dục giúp tôi có thêm năng lượng."],
    "포도": ["이 포도는 달고 씨가 거의 없어요.", "Chùm nho này ngọt và hầu như không có hạt."],
    "딸기": ["딸기를 씻어서 요구르트와 함께 먹었어요.", "Tôi rửa dâu tây rồi ăn cùng sữa chua."],
    "수박": ["더운 날에는 차가운 수박을 먹으면 기분이 좋아져요.", "Ăn dưa hấu lạnh vào ngày nóng khiến tôi thấy dễ chịu."],
    "오렌지": ["오렌지를 반으로 잘라 신선한 주스를 만들었어요.", "Tôi cắt đôi quả cam và làm nước ép tươi."],
    "채소": ["건강을 위해 매일 식사에 채소를 충분히 넣어요.", "Vì sức khỏe, tôi thêm đủ rau vào bữa ăn mỗi ngày."],
    "감자": ["감자를 삶아서 소금과 함께 간단히 먹었어요.", "Tôi luộc khoai tây và ăn đơn giản với muối."],
    "고구마": ["겨울에는 따뜻하게 구운 고구마가 특히 맛있어요.", "Vào mùa đông, khoai lang nướng nóng đặc biệt ngon."],
    "당근": ["당근을 잘게 썰어 볶음밥에 넣었어요.", "Tôi thái nhỏ cà rốt rồi cho vào cơm rang."],
    "양파": ["양파를 볶으니 부엌에 맛있는 냄새가 퍼졌어요.", "Xào hành tây khiến mùi thơm lan khắp nhà bếp."],
    "마늘": ["한국 요리에는 마늘을 자주 넣어요.", "Tỏi thường được dùng trong các món ăn Hàn Quốc."],
    "토마토": ["토마토와 양상추로 신선한 샐러드를 만들었어요.", "Tôi làm món salad tươi với cà chua và xà lách."],
    "고기": ["저녁에 손님이 와서 고기와 채소를 준비했어요.", "Buổi tối có khách đến nên tôi chuẩn bị thịt và rau."],
    "소고기": ["소고기를 얇게 썰어 불고기를 만들었어요.", "Tôi thái thịt bò mỏng để làm món bulgogi."],
    "돼지고기": ["돼지고기와 김치를 넣고 맛있는 찌개를 끓였어요.", "Tôi nấu món hầm ngon với thịt lợn và kim chi."],
    "닭고기": ["닭고기를 구워서 샐러드와 함께 먹었어요.", "Tôi nướng thịt gà và ăn cùng salad."],
    "생선": ["생선을 신선하게 먹으려고 시장에 일찍 갔어요.", "Tôi đi chợ sớm để mua cá tươi."],
    "달걀": ["아침에 달걀을 삶아서 빵과 함께 먹었어요.", "Buổi sáng tôi luộc trứng và ăn cùng bánh mì."],
    "치즈": ["샌드위치에 치즈를 한 장 더 넣어 주세요.", "Vui lòng thêm một lát phô mai vào bánh mì kẹp."],
    "주스": ["아침 식사와 함께 오렌지 주스를 마셨어요.", "Tôi uống nước cam cùng bữa sáng."],
    "차": ["비가 오는 날에는 따뜻한 차를 마시며 책을 읽어요.", "Vào ngày mưa, tôi vừa uống trà nóng vừa đọc sách."],
    "국": ["어머니가 끓여 주신 따뜻한 국을 먹었어요.", "Tôi ăn món canh nóng mẹ nấu cho."],
    "찌개": ["날씨가 추워서 저녁으로 김치찌개를 끓였어요.", "Trời lạnh nên tôi nấu canh kim chi cho bữa tối."],
    "김치": ["김치는 밥이나 국수와 함께 먹으면 잘 어울려요.", "Kim chi rất hợp khi ăn cùng cơm hoặc mì."],
    "국수": ["점심으로 따뜻한 국수를 먹고 싶어요.", "Tôi muốn ăn mì nóng vào bữa trưa."],
    "라면": ["늦은 밤에 라면을 끓여서 친구와 나눠 먹었어요.", "Tôi nấu mì ăn liền vào đêm khuya và chia sẻ với bạn."],
    "빵": ["아침에 빵에 달걀과 치즈를 넣어 먹었어요.", "Buổi sáng tôi ăn bánh mì kẹp trứng và phô mai."],
    "설탕": ["커피가 너무 써서 설탕을 조금 넣었어요.", "Cà phê quá đắng nên tôi cho thêm một ít đường."],

    "회사": ["우리 회사는 지하철역에서 걸어서 십 분 거리에 있어요.", "Công ty tôi cách ga tàu điện ngầm mười phút đi bộ."],
    "가게": ["집 앞 가게에서 우유와 빵을 샀어요.", "Tôi mua sữa và bánh mì ở cửa hàng trước nhà."],
    "시장": ["주말 시장에는 신선한 과일과 채소가 많이 나와요.", "Ở chợ cuối tuần có nhiều trái cây và rau củ tươi."],
    "식당": ["친구가 추천한 식당에서 점심을 먹었어요.", "Tôi ăn trưa tại nhà hàng bạn giới thiệu."],
    "카페": ["조용한 카페에서 커피를 마시며 공부했어요.", "Tôi học bài trong khi uống cà phê ở quán yên tĩnh."],
    "병원": ["열이 계속 나서 아침에 병원에 갔어요.", "Tôi bị sốt liên tục nên đã đến bệnh viện vào buổi sáng."],
    "약국": ["병원에서 나온 뒤 약국에 들러 처방약을 받았어요.", "Sau khi rời bệnh viện, tôi ghé nhà thuốc lấy thuốc theo đơn."],
    "은행": ["점심시간에 은행에 가서 돈을 찾았어요.", "Tôi đến ngân hàng rút tiền trong giờ nghỉ trưa."],
    "우체국": ["우체국에서 베트남에 보낼 소포를 부쳤어요.", "Tôi gửi bưu kiện đi Việt Nam tại bưu điện."],
    "도서관": ["시험 기간에는 도서관에서 조용히 공부해요.", "Trong kỳ thi, tôi học yên tĩnh ở thư viện."],
    "공원": ["날씨가 좋아서 가족과 공원에서 산책했어요.", "Thời tiết đẹp nên tôi đi dạo công viên cùng gia đình."],
    "역": ["기차를 타려면 삼 번 출구 쪽 역으로 가세요.", "Nếu muốn đi tàu, hãy đến ga phía lối ra số ba."],
    "공항": ["비행기 출발 두 시간 전에 공항에 도착했어요.", "Tôi đến sân bay trước giờ máy bay khởi hành hai tiếng."],
    "정류장": ["버스 정류장에서 십 분 정도 기다렸어요.", "Tôi đã đợi khoảng mười phút ở trạm xe buýt."],
    "호텔": ["여행 전에 바다가 보이는 호텔을 예약했어요.", "Trước chuyến đi, tôi đã đặt khách sạn nhìn ra biển."],
    "경찰서": ["지갑을 잃어버려서 가까운 경찰서에 신고했어요.", "Tôi bị mất ví nên đã trình báo tại đồn cảnh sát gần nhất."],
    "소방서": ["소방서 직원들이 화재가 난 건물로 빠르게 출동했어요.", "Nhân viên trạm cứu hỏa nhanh chóng đến tòa nhà xảy ra hỏa hoạn."],
    "박물관": ["주말에 박물관에서 한국의 역사를 배웠어요.", "Cuối tuần tôi tìm hiểu lịch sử Hàn Quốc tại bảo tàng."],
    "영화관": ["친구와 영화관에서 코미디 영화를 봤어요.", "Tôi xem phim hài ở rạp cùng bạn."],
    "운동장": ["학생들이 운동장에서 달리기 연습을 하고 있어요.", "Các học sinh đang luyện chạy trên sân vận động."],
    "교실": ["수업이 시작되기 전에 교실 창문을 열었어요.", "Tôi mở cửa sổ lớp học trước khi tiết học bắt đầu."],
    "사무실": ["회의가 끝난 뒤 사무실에서 이메일을 확인했어요.", "Sau cuộc họp, tôi kiểm tra email tại văn phòng."],
    "나라": ["저는 여러 나라의 음식을 먹어 보는 것을 좋아해요.", "Tôi thích thử món ăn của nhiều quốc gia."],
    "도시": ["서울은 밤에도 사람들이 많은 큰 도시예요.", "Seoul là một thành phố lớn đông người ngay cả vào ban đêm."],
    "마을": ["산 아래 작은 마을에는 오래된 집이 많아요.", "Ngôi làng nhỏ dưới chân núi có nhiều ngôi nhà cổ."],
    "거리": ["비가 그친 뒤 거리에 사람들이 다시 나왔어요.", "Sau khi mưa tạnh, mọi người lại ra đường."],
    "길": ["처음 가는 곳이라 휴대폰 지도를 보며 길을 찾았어요.", "Vì là nơi lần đầu đến nên tôi tìm đường bằng bản đồ trên điện thoại."],
    "주차장": ["주말이라 쇼핑몰 주차장에 빈자리가 없었어요.", "Vì là cuối tuần nên bãi đỗ xe trung tâm mua sắm không còn chỗ trống."],
    "백화점": ["어머니 생신 선물을 사러 백화점에 갔어요.", "Tôi đến cửa hàng bách hóa để mua quà sinh nhật cho mẹ."],
    "미용실": ["약속 전에 미용실에서 머리를 짧게 잘랐어요.", "Tôi cắt tóc ngắn ở tiệm làm tóc trước cuộc hẹn."],

    "자동차": ["출근 시간에는 자동차보다 지하철이 더 빨라요.", "Vào giờ đi làm, tàu điện ngầm nhanh hơn ô tô."],
    "버스": ["버스를 잘못 타서 약속 장소에 늦었어요.", "Tôi lên nhầm xe buýt nên đến muộn ở chỗ hẹn."],
    "기차": ["기차 창밖으로 산과 들판이 보였어요.", "Qua cửa sổ tàu hỏa, tôi nhìn thấy núi và cánh đồng."],
    "지하철": ["지하철을 타면 시내까지 삼십 분이면 갈 수 있어요.", "Đi tàu điện ngầm chỉ mất ba mươi phút để đến trung tâm."],
    "택시": ["비가 많이 와서 역까지 택시를 탔어요.", "Trời mưa to nên tôi đi taxi đến ga."],
    "비행기": ["비행기가 이륙하기 전에 휴대폰을 껐어요.", "Tôi tắt điện thoại trước khi máy bay cất cánh."],
    "자전거": ["주말 아침마다 자전거를 타고 강변을 달려요.", "Sáng cuối tuần nào tôi cũng đạp xe dọc bờ sông."],
    "오토바이": ["베트남에서는 많은 사람이 오토바이로 출근해요.", "Ở Việt Nam, nhiều người đi làm bằng xe máy."],
    "배": ["우리는 작은 배를 타고 섬으로 건너갔어요.", "Chúng tôi đi thuyền nhỏ sang hòn đảo."],
    "표": ["기차표를 미리 예매해서 창가 자리에 앉았어요.", "Tôi đặt vé tàu trước nên được ngồi cạnh cửa sổ."],
    "여권": ["해외여행을 가기 전에 여권 유효 기간을 확인하세요.", "Hãy kiểm tra thời hạn hộ chiếu trước khi đi du lịch nước ngoài."],
    "지도": ["휴대폰 지도를 보면서 호텔까지 걸어갔어요.", "Tôi vừa xem bản đồ trên điện thoại vừa đi bộ đến khách sạn."],
    "여행": ["이번 여름에는 친구와 함께 제주도로 여행을 가요.", "Mùa hè này tôi đi du lịch đảo Jeju cùng bạn."],
    "휴가": ["휴가 동안에는 늦잠을 자고 가족과 시간을 보냈어요.", "Trong kỳ nghỉ, tôi ngủ nướng và dành thời gian bên gia đình."],
    "출발": ["버스 출발 시간이 다가와서 서둘러 정류장으로 갔어요.", "Sắp đến giờ xe buýt khởi hành nên tôi vội đến trạm."],
    "도착": ["기차 도착 시간을 확인한 뒤 친구를 마중 나갔어요.", "Sau khi kiểm tra giờ tàu đến, tôi ra đón bạn."],
    "주소": ["택시 기사님께 목적지 주소를 휴대폰으로 보여 드렸어요.", "Tôi cho tài xế taxi xem địa chỉ điểm đến trên điện thoại."],
    "교통": ["출근 시간에는 교통이 복잡해서 지하철을 이용해요.", "Vào giờ đi làm, giao thông đông đúc nên tôi đi tàu điện ngầm."],
    "신호등": ["신호등이 초록색으로 바뀐 뒤에 길을 건너세요.", "Hãy qua đường sau khi đèn giao thông chuyển sang màu xanh."],
    "짐": ["여행 짐이 많아서 큰 가방을 하나 더 가져왔어요.", "Hành lý du lịch nhiều nên tôi mang thêm một chiếc túi lớn."],
    "좌석": ["창가 좌석을 예약해서 바깥 풍경을 볼 수 있었어요.", "Tôi đặt chỗ cạnh cửa sổ nên có thể ngắm cảnh bên ngoài."],
    "입구": ["박물관 입구에서 표를 보여 주고 안으로 들어갔어요.", "Tôi đưa vé ở lối vào bảo tàng rồi đi vào trong."],
    "출구": ["사람이 많으니 출구 앞에서 친구를 기다리지 마세요.", "Đông người nên đừng đợi bạn trước lối ra."],
    "계단": ["엘리베이터가 고장 나서 계단으로 삼 층까지 올라갔어요.", "Thang máy hỏng nên tôi đi cầu thang lên tầng ba."],
    "엘리베이터": ["무거운 짐이 있어서 엘리베이터를 이용했어요.", "Tôi dùng thang máy vì có hành lý nặng."],
    "에스컬레이터": ["에스컬레이터에서는 오른쪽에 서 주세요.", "Vui lòng đứng bên phải trên thang cuốn."],
    "다리": ["강 위에 놓인 다리를 건너면 공원이 나와요.", "Qua cây cầu bắc qua sông là đến công viên."],
    "터널": ["긴 터널을 지나자 바다가 보이기 시작했어요.", "Sau khi đi qua đường hầm dài, biển bắt đầu hiện ra."],
    "교차로": ["다음 교차로에서 왼쪽으로 돌면 은행이 보여요.", "Rẽ trái ở ngã tư tiếp theo sẽ thấy ngân hàng."],
    "정거장": ["다음 정거장에서 내려서 버스로 갈아타세요.", "Hãy xuống ở bến tiếp theo rồi đổi sang xe buýt."],

    "몸": ["몸이 피곤할 때는 충분히 쉬고 물을 많이 마셔요.", "Khi cơ thể mệt mỏi, hãy nghỉ ngơi đầy đủ và uống nhiều nước."],
    "머리": ["아침부터 머리가 아파서 약을 먹고 쉬었어요.", "Tôi bị đau đầu từ sáng nên đã uống thuốc và nghỉ ngơi."],
    "얼굴": ["찬물로 얼굴을 씻고 잠을 깨웠어요.", "Tôi rửa mặt bằng nước lạnh để tỉnh ngủ."],
    "눈": ["컴퓨터를 오래 봐서 눈이 피곤해졌어요.", "Mắt tôi mỏi vì nhìn máy tính quá lâu."],
    "코": ["감기에 걸려서 코가 막히고 목도 아파요.", "Tôi bị cảm nên nghẹt mũi và đau họng."],
    "입": ["뜨거운 국을 먹기 전에 입으로 천천히 불었어요.", "Trước khi ăn canh nóng, tôi thổi nhẹ bằng miệng."],
    "귀": ["이어폰 소리가 너무 커서 귀가 아팠어요.", "Âm thanh tai nghe quá lớn khiến tai tôi đau."],
    "목": ["목이 아파서 따뜻한 차를 마셨어요.", "Tôi bị đau họng nên đã uống trà nóng."],
    "어깨": ["하루 종일 컴퓨터를 했더니 어깨가 뻐근해요.", "Vai tôi bị mỏi vì làm việc với máy tính cả ngày."],
    "팔": ["무거운 상자를 옮기다가 팔을 조금 다쳤어요.", "Tôi hơi bị thương ở tay khi chuyển chiếc hộp nặng."],
    "손": ["음식을 만들기 전에 손을 깨끗이 씻으세요.", "Hãy rửa tay sạch trước khi chuẩn bị thức ăn."],
    "손가락": ["문에 손가락이 끼지 않도록 조심하세요.", "Hãy cẩn thận để không bị kẹt ngón tay vào cửa."],
    "무릎": ["계단에서 넘어져서 무릎에 작은 상처가 났어요.", "Tôi ngã ở cầu thang và bị một vết thương nhỏ ở đầu gối."],
    "발": ["오래 걸어서 발이 아프니 잠깐 쉬고 싶어요.", "Tôi đi bộ lâu nên đau chân và muốn nghỉ một lát."],
    "발가락": ["새 신발이 작아서 발가락이 아파요.", "Giày mới chật nên ngón chân tôi bị đau."],
    "등": ["무거운 가방을 오래 메고 있어서 등이 아파요.", "Tôi bị đau lưng vì đeo túi nặng quá lâu."],
    "위": ["식사 후에 바로 누우면 위가 불편할 수 있어요.", "Nằm ngay sau bữa ăn có thể khiến dạ dày khó chịu."],
    "심장": ["규칙적으로 운동하면 심장을 건강하게 지킬 수 있어요.", "Tập thể dục đều đặn giúp giữ cho tim khỏe mạnh."],
    "건강": ["건강을 지키려면 잠을 충분히 자고 잘 먹어야 해요.", "Để giữ sức khỏe, bạn cần ngủ đủ và ăn uống đầy đủ."],
    "병": ["그 병은 초기에 치료하면 빨리 나을 수 있어요.", "Bệnh đó có thể khỏi nhanh nếu được điều trị sớm."],
    "감기": ["감기에 걸리지 않도록 외출 후에 손을 씻어요.", "Tôi rửa tay sau khi ra ngoài để tránh bị cảm."],
    "약": ["의사가 준 약은 식사 후에 하루 세 번 드세요.", "Hãy uống thuốc bác sĩ kê ba lần mỗi ngày sau bữa ăn."],
    "진료": ["병원에서 진료를 받으려면 먼저 접수해야 해요.", "Muốn được khám ở bệnh viện thì trước tiên phải đăng ký."],
    "수술": ["수술을 받은 뒤에는 의사의 지시에 따라 쉬어야 해요.", "Sau khi phẫu thuật, bạn cần nghỉ ngơi theo hướng dẫn của bác sĩ."],
    "열": ["밤새 열이 나서 아침에 병원에 갔어요.", "Tôi bị sốt cả đêm nên đã đến bệnh viện vào buổi sáng."],
    "기침": ["기침이 오래 계속되면 의사에게 진료를 받으세요.", "Nếu ho kéo dài, hãy đi khám bác sĩ."],
    "통증": ["통증이 심해지면 참지 말고 병원에 가세요.", "Nếu cơn đau trở nên nghiêm trọng, đừng cố chịu mà hãy đến bệnh viện."],
    "상처": ["작은 상처도 깨끗하게 씻고 소독해야 해요.", "Ngay cả vết thương nhỏ cũng cần được rửa sạch và khử trùng."],
    "잠": ["어제 잠을 충분히 자서 오늘은 기분이 좋아요.", "Hôm qua tôi ngủ đủ nên hôm nay cảm thấy dễ chịu."],
    "꿈": ["어젯밤에 바다를 여행하는 꿈을 꾸었어요.", "Đêm qua tôi mơ thấy mình đi du lịch biển."],

    "하늘": ["비가 그친 뒤 맑은 하늘에 무지개가 떴어요.", "Sau khi mưa tạnh, cầu vồng xuất hiện trên bầu trời trong xanh."],
    "구름": ["하얀 구름이 천천히 산 너머로 움직이고 있어요.", "Những đám mây trắng đang chậm rãi di chuyển qua ngọn núi."],
    "바람": ["바람이 시원하게 불어서 창문을 열었어요.", "Gió thổi mát nên tôi đã mở cửa sổ."],
    "비": ["비가 많이 와서 우산을 쓰고 버스 정류장까지 갔어요.", "Trời mưa to nên tôi che ô đi đến trạm xe buýt."],
    "안개": ["아침에 안개가 짙어서 운전할 때 조심했어요.", "Sáng nay sương mù dày nên tôi lái xe cẩn thận."],
    "날씨": ["주말 날씨가 좋아서 가족과 소풍을 가기로 했어요.", "Thời tiết cuối tuần đẹp nên tôi quyết định đi dã ngoại cùng gia đình."],
    "햇빛": ["햇빛이 강하니 외출할 때 모자를 쓰세요.", "Nắng gắt nên hãy đội mũ khi ra ngoài."],
    "달": ["오늘 밤에는 구름이 없어서 달이 잘 보여요.", "Đêm nay không có mây nên có thể nhìn thấy mặt trăng rõ."],
    "별": ["도시 밖으로 나가니 밤하늘에 별이 많이 보였어요.", "Ra khỏi thành phố, tôi nhìn thấy nhiều ngôi sao trên bầu trời đêm."],
    "바다": ["여름 방학에 가족과 바다에서 수영했어요.", "Trong kỳ nghỉ hè, tôi bơi ở biển cùng gia đình."],
    "강": ["아침마다 강 옆 길을 걸으며 운동해요.", "Mỗi sáng tôi đi bộ tập thể dục trên con đường cạnh sông."],
    "산": ["날씨가 맑아서 친구와 가까운 산에 올라갔어요.", "Trời quang nên tôi leo ngọn núi gần đó cùng bạn."],
    "섬": ["배를 타고 작은 섬에 가서 하루를 보냈어요.", "Tôi đi thuyền đến một hòn đảo nhỏ và dành cả ngày ở đó."],
    "숲": ["숲속을 걸으니 나무 냄새와 새소리가 들렸어요.", "Đi bộ trong rừng, tôi ngửi thấy mùi cây và nghe tiếng chim."],
    "나무": ["마을 입구에 오래된 나무가 한 그루 서 있어요.", "Có một cây cổ thụ đứng ở lối vào ngôi làng."],
    "꽃": ["친구의 생일에 좋아하는 꽃을 선물했어요.", "Tôi tặng loài hoa bạn thích vào ngày sinh nhật của bạn ấy."],
    "풀": ["비가 온 뒤에는 공원에 풀이 더 푸르게 보여요.", "Sau cơn mưa, cỏ trong công viên trông xanh hơn."],
    "돌": ["길에 큰 돌이 있어서 발밑을 조심해야 해요.", "Có một hòn đá lớn trên đường nên phải chú ý dưới chân."],
    "모래": ["아이들이 해변 모래로 작은 성을 만들었어요.", "Bọn trẻ dùng cát trên bãi biển xây một tòa lâu đài nhỏ."],
    "바위": ["등산로 옆 큰 바위에서 잠시 쉬었어요.", "Tôi nghỉ một lát trên tảng đá lớn cạnh đường leo núi."],
    "동물": ["동물을 키우려면 매일 먹이를 주고 돌봐야 해요.", "Nuôi động vật thì phải cho ăn và chăm sóc chúng mỗi ngày."],
    "개": ["우리 개는 산책할 시간이 되면 문 앞에서 기다려요.", "Chú chó nhà tôi đợi trước cửa khi đến giờ đi dạo."],
    "고양이": ["고양이가 따뜻한 햇빛 아래에서 낮잠을 자고 있어요.", "Con mèo đang ngủ trưa dưới ánh nắng ấm áp."],
    "새": ["아침에 창문을 여니 나무 위에서 새가 노래했어요.", "Mở cửa sổ buổi sáng, tôi nghe chim hót trên cây."],
    "벌": ["꽃 주변에 벌이 날아다니니 가까이 가지 마세요.", "Ong đang bay quanh hoa nên đừng đến gần."],
    "나비": ["노란 나비 한 마리가 정원 꽃 위에 앉았어요.", "Một con bướm vàng đậu trên bông hoa trong vườn."],
    "벌레": ["여름에는 창문에 작은 벌레가 자주 붙어요.", "Vào mùa hè, côn trùng nhỏ thường đậu trên cửa sổ."],
    "계절": ["한국에는 봄, 여름, 가을, 겨울 네 계절이 있어요.", "Hàn Quốc có bốn mùa: xuân, hạ, thu và đông."],
    "여름": ["여름에는 날씨가 더워서 시원한 음료를 자주 마셔요.", "Mùa hè trời nóng nên tôi thường uống đồ uống mát."],
    "가을": ["가을이 되면 나뭇잎이 빨갛고 노랗게 변해요.", "Khi mùa thu đến, lá cây chuyển sang màu đỏ và vàng."],

    "시간": ["출근 준비를 하려면 아침 시간을 잘 계획해야 해요.", "Để chuẩn bị đi làm, tôi cần sắp xếp thời gian buổi sáng hợp lý."],
    "분": ["약속 장소까지 걸어서 십 분 정도 걸려요.", "Đi bộ đến chỗ hẹn mất khoảng mười phút."],
    "초": ["신호가 바뀌기까지 몇 초만 더 기다려 주세요.", "Vui lòng đợi thêm vài giây cho đến khi đèn tín hiệu đổi."],
    "하루": ["바쁜 하루가 끝나면 따뜻한 저녁을 먹고 쉬어요.", "Khi một ngày bận rộn kết thúc, tôi ăn tối ấm nóng rồi nghỉ ngơi."],
    "아침": ["아침에 일어나서 물을 마시고 가볍게 운동해요.", "Buổi sáng thức dậy, tôi uống nước và tập thể dục nhẹ."],
    "점심": ["오늘 점심에는 회사 동료와 새 식당에 가요.", "Hôm nay tôi đi ăn ở nhà hàng mới cùng đồng nghiệp vào bữa trưa."],
    "저녁": ["저녁 식사 후에 가족과 공원을 산책했어요.", "Sau bữa tối, tôi đi dạo công viên cùng gia đình."],
    "밤": ["밤에는 조용한 음악을 들으며 책을 읽어요.", "Buổi tối tôi đọc sách trong khi nghe nhạc nhẹ."],
    "새벽": ["새벽에 공항으로 출발해서 첫 비행기를 탔어요.", "Tôi khởi hành đến sân bay lúc rạng sáng và đi chuyến bay đầu tiên."],
    "주": ["한국에 온 지 세 주가 지나서 친구가 많이 생겼어요.", "Đã ba tuần kể từ khi tôi đến Hàn Quốc và tôi có thêm nhiều bạn."],
    "주말": ["주말에는 늦잠을 자고 가족과 함께 장을 봐요.", "Cuối tuần tôi ngủ nướng rồi đi chợ cùng gia đình."],
    "평일": ["평일에는 일찍 출근하고 저녁에 한국어를 공부해요.", "Ngày thường tôi đi làm sớm và học tiếng Hàn vào buổi tối."],
    "월요일": ["월요일 아침에는 이번 주 일정을 먼저 확인해요.", "Sáng thứ Hai, tôi kiểm tra lịch trình tuần này trước."],
    "화요일": ["화요일 저녁마다 온라인으로 한국어 수업을 들어요.", "Tối thứ Ba nào tôi cũng học tiếng Hàn trực tuyến."],
    "수요일": ["수요일에는 점심시간에 동료와 함께 산책해요.", "Thứ Tư tôi đi dạo cùng đồng nghiệp trong giờ nghỉ trưa."],
    "목요일": ["목요일까지 보고서를 보내 달라고 부탁받았어요.", "Tôi được nhờ gửi báo cáo trước thứ Năm."],
    "금요일": ["금요일 퇴근 후에는 친구들과 저녁을 먹어요.", "Sau giờ làm thứ Sáu, tôi ăn tối cùng bạn bè."],
    "토요일": ["토요일에는 시장에 가서 일주일 동안 먹을 음식을 사요.", "Thứ Bảy tôi đi chợ mua thức ăn cho cả tuần."],
    "일요일": ["일요일 오후에는 다음 주 수업을 미리 준비해요.", "Chiều Chủ nhật tôi chuẩn bị trước bài học cho tuần tới."],
    "월": ["월별 지출을 정리하고 다음 달 예산을 세웠어요.", "Tôi tổng hợp chi tiêu theo tháng và lập ngân sách cho tháng tới."],
    "년": ["한국에서 산 지 삼 년이 되어 이제 생활이 익숙해요.", "Tôi đã sống ở Hàn Quốc được ba năm nên giờ đã quen với cuộc sống."],
    "생일": ["생일에 친구들이 케이크와 작은 선물을 준비해 줬어요.", "Bạn bè chuẩn bị bánh kem và một món quà nhỏ cho tôi vào ngày sinh nhật."],
    "날짜": ["병원 예약 날짜를 달력에 적어 두었어요.", "Tôi ghi ngày hẹn bệnh viện lên lịch."],
    "달력": ["새 달력을 벽에 걸고 중요한 일정을 표시했어요.", "Tôi treo lịch mới lên tường và đánh dấu những lịch trình quan trọng."],
    "약속": ["친구와 한 약속을 잊지 않도록 휴대폰에 저장했어요.", "Tôi lưu cuộc hẹn với bạn vào điện thoại để không quên."],
    "계획": ["주말 계획을 세우고 필요한 표를 미리 샀어요.", "Tôi lên kế hoạch cuối tuần và mua vé cần thiết trước."],
    "순간": ["비행기에서 바다를 내려다본 순간을 아직도 기억해요.", "Tôi vẫn nhớ khoảnh khắc nhìn xuống biển từ máy bay."],
    "미래": ["미래를 위해 매일 새로운 기술을 배우고 있어요.", "Tôi đang học kỹ năng mới mỗi ngày cho tương lai."],
    "과거": ["과거의 실수에서 배우면 같은 문제를 피할 수 있어요.", "Nếu học từ sai lầm trong quá khứ, bạn có thể tránh vấn đề tương tự."],
    "지금": ["지금은 회의 중이니 끝난 뒤에 다시 전화할게요.", "Bây giờ tôi đang họp nên sẽ gọi lại sau khi kết thúc."],

    "한국어": ["한국에서 생활하면서 한국어를 매일 연습하고 있어요.", "Tôi luyện tiếng Hàn mỗi ngày trong khi sống ở Hàn Quốc."],
    "한국": ["친구는 한국의 음식과 문화를 직접 경험하고 싶어 해요.", "Bạn tôi muốn trực tiếp trải nghiệm ẩm thực và văn hóa Hàn Quốc."],
    "베트남": ["제 가족은 베트남에 살고 있어서 자주 영상 통화를 해요.", "Gia đình tôi sống ở Việt Nam nên chúng tôi thường gọi video."],
    "말": ["천천히 말해 주시면 제가 더 잘 이해할 수 있어요.", "Nếu bạn nói chậm, tôi có thể hiểu rõ hơn."],
    "단어": ["새 단어를 공책에 적고 예문과 함께 외웠어요.", "Tôi ghi từ mới vào vở và học thuộc cùng với câu ví dụ."],
    "문장": ["이 문장을 소리 내어 읽고 뜻을 확인해 보세요.", "Hãy đọc câu này thành tiếng và kiểm tra nghĩa."],
    "글자": ["간판에 적힌 글자가 작아서 가까이 가서 읽었어요.", "Chữ trên biển hiệu nhỏ nên tôi đến gần để đọc."],
    "이름": ["처음 만난 사람에게 이름과 고향을 물어봤어요.", "Tôi hỏi tên và quê quán của người mới gặp."],
    "질문": ["수업이 끝나기 전에 궁금한 질문을 선생님께 했어요.", "Trước khi buổi học kết thúc, tôi đã hỏi giáo viên điều mình thắc mắc."],
    "대답": ["질문을 잘 듣고 천천히 대답해도 괜찮아요.", "Nghe kỹ câu hỏi rồi trả lời chậm cũng không sao."],
    "뜻": ["모르는 단어의 뜻을 사전에서 찾아봤어요.", "Tôi tra nghĩa của từ chưa biết trong từ điển."],
    "소리": ["한국어 소리를 정확하게 내기 위해 여러 번 따라 했어요.", "Tôi luyện đọc theo nhiều lần để phát âm tiếng Hàn chính xác."],
    "음악": ["집안일을 할 때 좋아하는 음악을 들으면 즐거워요.", "Nghe nhạc yêu thích khi làm việc nhà khiến tôi vui hơn."],
    "노래": ["한국어 노래를 들으며 새로운 표현을 배웠어요.", "Tôi học cách diễn đạt mới khi nghe bài hát tiếng Hàn."],
    "사진": ["여행에서 찍은 사진을 가족에게 보내 줬어요.", "Tôi gửi cho gia đình những bức ảnh chụp trong chuyến du lịch."],
    "그림": ["아이가 그린 그림을 냉장고 문에 붙여 두었어요.", "Tôi dán bức tranh con vẽ lên cửa tủ lạnh."],
    "영화": ["주말에 한국어 자막이 있는 영화를 한 편 봤어요.", "Cuối tuần tôi xem một bộ phim có phụ đề tiếng Hàn."],
    "이야기": ["할머니가 들려주신 어린 시절 이야기가 재미있었어요.", "Câu chuyện thời thơ ấu bà kể cho tôi nghe rất thú vị."],
    "편지": ["고향에 있는 친구에게 안부 편지를 썼어요.", "Tôi viết thư hỏi thăm người bạn ở quê nhà."],
    "이메일": ["회의 자료를 정리해서 동료에게 이메일로 보냈어요.", "Tôi sắp xếp tài liệu cuộc họp rồi gửi email cho đồng nghiệp."],
    "인터넷": ["인터넷으로 버스 시간과 여행 정보를 확인했어요.", "Tôi kiểm tra giờ xe buýt và thông tin du lịch trên mạng."],
    "비밀번호": ["개인 정보를 보호하려면 비밀번호를 다른 사람과 공유하지 마세요.", "Để bảo vệ thông tin cá nhân, đừng chia sẻ mật khẩu với người khác."],
    "숫자": ["전화번호를 들으면서 숫자를 하나씩 적었어요.", "Tôi nghe số điện thoại và ghi từng con số."],
    "돈": ["여행을 가기 전에 필요한 돈을 미리 환전했어요.", "Trước chuyến đi, tôi đổi trước số tiền cần thiết."],
    "가격": ["같은 물건이라도 가게마다 가격이 다를 수 있어요.", "Cùng một món đồ nhưng giá có thể khác nhau tùy cửa hàng."],
    "카드": ["현금이 없어서 식당에서 카드로 계산했어요.", "Tôi không có tiền mặt nên thanh toán bằng thẻ ở nhà hàng."],
    "현금": ["작은 가게에서는 현금만 받는 경우도 있어요.", "Một số cửa hàng nhỏ chỉ nhận tiền mặt."],
    "영수증": ["물건을 산 뒤 영수증을 가방에 잘 보관했어요.", "Sau khi mua đồ, tôi cất hóa đơn cẩn thận trong túi."],
    "선물": ["베트남에 돌아갈 때 가족에게 줄 선물을 골랐어요.", "Tôi chọn quà cho gia đình để mang về Việt Nam."],
    "취미": ["제 취미는 주말마다 새로운 음식을 만들어 보는 거예요.", "Sở thích của tôi là thử nấu món ăn mới mỗi cuối tuần."]
  };

  const existingWords = new Set(window.KOREAN_WORDS.map(function (item) { return item.word; }));
  const additions = rows.map(function (row) {
    const parts = row.split("|");
    if (parts.length !== 3 || parts.some(function (part) { return !part; })) {
      throw new Error("Invalid Korean vocabulary row: " + row);
    }
    const word = parts[0];
    if (existingWords.has(word)) {
      throw new Error("Duplicate Korean vocabulary word: " + word);
    }
    existingWords.add(word);
    const example = curatedExamples[word];
    if (!example) {
      throw new Error("Missing Korean example for vocabulary word: " + word);
    }

    return {
      level: "기초",
      word: word,
      ipa: parts[1].replace(/^\s+|\s+$/g, ""),
      meaning: parts[2],
      example: example[0],
      exampleKo: example[1]
    };
  });

  window.KOREAN_WORDS = window.KOREAN_WORDS.concat(additions);
}());
