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
교차로|gyochalo|Ngã tư
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

  const existingWords = new Set(window.KOREAN_WORDS.map(function (item) { return item.word; }));
  const examples = [
    ["이/가 있어요.", "Có "],
    ["을/를 주세요.", "Cho tôi "],
    ["을/를 좋아해요.", "Tôi thích "],
    ["이/가 필요해요.", "Tôi cần "]
  ];

  const additions = rows.map(function (row, index) {
    const parts = row.split("|");
    if (parts.length !== 3 || parts.some(function (part) { return !part; })) {
      throw new Error("Invalid Korean vocabulary row: " + row);
    }
    const word = parts[0];
    if (existingWords.has(word)) {
      throw new Error("Duplicate Korean vocabulary word: " + word);
    }
    existingWords.add(word);

    const lastSyllable = word.charCodeAt(word.length - 1);
    const hasFinalConsonant = lastSyllable >= 0xAC00 && lastSyllable <= 0xD7A3 &&
      (lastSyllable - 0xAC00) % 28 !== 0;
    const example = examples[index % examples.length];
    const particle = example[0].startsWith("을") ?
      (hasFinalConsonant ? "을" : "를") : (hasFinalConsonant ? "이" : "가");

    return {
      level: "기초",
      word: word,
      ipa: parts[1].replace(/^\s+|\s+$/g, ""),
      meaning: parts[2],
      example: word + particle + example[0].slice(3),
      exampleKo: example[1] + parts[2].toLocaleLowerCase("vi") + "."
    };
  });

  window.KOREAN_WORDS = window.KOREAN_WORDS.concat(additions);
}());
