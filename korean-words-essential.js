(function () {
  "use strict";
  // Individually reviewed high-frequency Korean words missing from the original 600.
  const additions = [
  {
    "level": "기초",
    "word": "바닥",
    "ipa": "badak",
    "meaning": "Sàn nhà",
    "example": "바닥에 물이 떨어져서 걸레로 닦았어요.",
    "exampleKo": "Nước đổ xuống sàn nên tôi đã dùng giẻ lau sạch.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "벽",
    "ipa": "byeok",
    "meaning": "Tường",
    "example": "벽에 가족사진을 걸었어요.",
    "exampleKo": "Tôi treo ảnh gia đình lên tường.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "방",
    "ipa": "bang",
    "meaning": "Phòng",
    "example": "제 방은 작지만 창문이 커서 밝아요.",
    "exampleKo": "Phòng tôi nhỏ nhưng sáng vì có cửa sổ lớn.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "복도",
    "ipa": "bokdo",
    "meaning": "Hành lang",
    "example": "복도에서는 뛰지 말고 천천히 걸으세요.",
    "exampleKo": "Đừng chạy ở hành lang, hãy đi chậm thôi.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "주방",
    "ipa": "jubang",
    "meaning": "Nhà bếp",
    "example": "주방에서 저녁을 준비하고 있어요.",
    "exampleKo": "Tôi đang chuẩn bị bữa tối trong bếp.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "선풍기",
    "ipa": "seonpunggi",
    "meaning": "Quạt máy",
    "example": "더워서 선풍기를 켰어요.",
    "exampleKo": "Trời nóng nên tôi đã bật quạt máy.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "쓰레기통",
    "ipa": "sseuregitong",
    "meaning": "Thùng rác",
    "example": "쓰레기는 저쪽 쓰레기통에 버려 주세요.",
    "exampleKo": "Vui lòng bỏ rác vào thùng rác đằng kia.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "우유",
    "ipa": "uyu",
    "meaning": "Sữa",
    "example": "아침에 빵과 우유를 먹었어요.",
    "exampleKo": "Buổi sáng tôi ăn bánh mì và uống sữa.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "컵",
    "ipa": "keop",
    "meaning": "Cốc",
    "example": "컵에 물을 한 잔 따라 주세요.",
    "exampleKo": "Hãy rót cho tôi một cốc nước.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "양말",
    "ipa": "yangmal",
    "meaning": "Tất",
    "example": "비에 젖은 양말을 갈아 신었어요.",
    "exampleKo": "Tôi thay đôi tất bị ướt mưa.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "바지",
    "ipa": "baji",
    "meaning": "Quần dài",
    "example": "이 바지는 조금 길어서 수선해야 해요.",
    "exampleKo": "Chiếc quần này hơi dài nên cần sửa lại.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "횡단보도",
    "ipa": "hoengdanbodo",
    "meaning": "Vạch sang đường",
    "example": "신호가 초록색일 때 횡단보도를 건너세요.",
    "exampleKo": "Hãy băng qua vạch sang đường khi đèn chuyển xanh.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "버스정류장",
    "ipa": "beoseujeongnyujang",
    "meaning": "Trạm xe buýt",
    "example": "버스정류장에서 십 분 정도 기다렸어요.",
    "exampleKo": "Tôi đã đợi khoảng mười phút ở trạm xe buýt.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "편의점",
    "ipa": "pyeonuijeom",
    "meaning": "Cửa hàng tiện lợi",
    "example": "집 앞 편의점에서 물을 샀어요.",
    "exampleKo": "Tôi mua nước ở cửa hàng tiện lợi trước nhà.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "마트",
    "ipa": "mateu",
    "meaning": "Siêu thị",
    "example": "주말에 마트에서 과일과 채소를 샀어요.",
    "exampleKo": "Cuối tuần tôi mua trái cây và rau ở siêu thị.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "연필",
    "ipa": "yeonpil",
    "meaning": "Bút chì",
    "example": "연필로 이름을 써 주세요.",
    "exampleKo": "Hãy viết tên bằng bút chì.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "지우개",
    "ipa": "jiugae",
    "meaning": "Cục tẩy",
    "example": "틀린 글자는 지우개로 지워도 돼요.",
    "exampleKo": "Bạn có thể dùng cục tẩy để xóa chữ viết sai.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "공책",
    "ipa": "gongchaek",
    "meaning": "Vở",
    "example": "새 단어를 공책에 적어 두었어요.",
    "exampleKo": "Tôi ghi từ mới vào vở.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "가위",
    "ipa": "gawi",
    "meaning": "Kéo",
    "example": "가위로 종이를 반듯하게 잘랐어요.",
    "exampleKo": "Tôi dùng kéo cắt giấy cho thẳng.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "치약",
    "ipa": "chiyak",
    "meaning": "Kem đánh răng",
    "example": "치약을 칫솔에 조금 짜세요.",
    "exampleKo": "Hãy bóp một ít kem đánh răng lên bàn chải.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "휴지",
    "ipa": "hyuji",
    "meaning": "Giấy vệ sinh; khăn giấy",
    "example": "휴지가 다 떨어져서 새로 샀어요.",
    "exampleKo": "Hết giấy vệ sinh rồi nên tôi mua thêm.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "있다",
    "ipa": "itda",
    "meaning": "Có; tồn tại",
    "example": "가방 안에 지갑이 있어요.",
    "exampleKo": "Trong túi có ví.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "없다",
    "ipa": "eopda",
    "meaning": "Không có",
    "example": "오늘은 시간이 없어서 못 만나요.",
    "exampleKo": "Hôm nay tôi không có thời gian nên không thể gặp.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "알다",
    "ipa": "alda",
    "meaning": "Biết",
    "example": "저는 그 가게가 어디에 있는지 알아요.",
    "exampleKo": "Tôi biết cửa hàng đó ở đâu.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "모르다",
    "ipa": "moreuda",
    "meaning": "Không biết",
    "example": "이 단어의 뜻을 아직 몰라요.",
    "exampleKo": "Tôi vẫn chưa biết nghĩa của từ này.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "읽다",
    "ipa": "ikda",
    "meaning": "Đọc",
    "example": "저녁마다 한국어 책을 읽어요.",
    "exampleKo": "Tối nào tôi cũng đọc sách tiếng Hàn.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "듣다",
    "ipa": "deutda",
    "meaning": "Nghe",
    "example": "지하철에서 음악을 듣고 있어요.",
    "exampleKo": "Tôi đang nghe nhạc trên tàu điện ngầm.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "쓰다",
    "ipa": "sseuda",
    "meaning": "Viết",
    "example": "친구에게 짧은 편지를 썼어요.",
    "exampleKo": "Tôi đã viết một lá thư ngắn cho bạn.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "배우다",
    "ipa": "baeuda",
    "meaning": "Học",
    "example": "요즘 한국어를 배우고 있어요.",
    "exampleKo": "Dạo này tôi đang học tiếng Hàn.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "말하다",
    "ipa": "malhada",
    "meaning": "Nói",
    "example": "모르면 편하게 질문해 달라고 말했어요.",
    "exampleKo": "Tôi đã bảo rằng nếu không biết thì cứ thoải mái hỏi.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "가르치다",
    "ipa": "gareuchida",
    "meaning": "Dạy",
    "example": "선생님이 학생들에게 발음을 가르쳐요.",
    "exampleKo": "Giáo viên dạy phát âm cho học sinh.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "기다리다",
    "ipa": "gidarida",
    "meaning": "Chờ",
    "example": "친구가 올 때까지 여기서 기다릴게요.",
    "exampleKo": "Tôi sẽ đợi ở đây cho đến khi bạn tới.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "사다",
    "ipa": "sada",
    "meaning": "Mua",
    "example": "시장에서 사과 다섯 개를 샀어요.",
    "exampleKo": "Tôi đã mua năm quả táo ở chợ.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "팔다",
    "ipa": "palda",
    "meaning": "Bán",
    "example": "이 가게는 신선한 빵을 팔아요.",
    "exampleKo": "Cửa hàng này bán bánh mì tươi.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "열다",
    "ipa": "yeolda",
    "meaning": "Mở",
    "example": "방이 더워서 창문을 열었어요.",
    "exampleKo": "Phòng nóng nên tôi đã mở cửa sổ.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "닫다",
    "ipa": "datda",
    "meaning": "Đóng",
    "example": "나가기 전에 문을 꼭 닫아 주세요.",
    "exampleKo": "Hãy nhớ đóng cửa trước khi ra ngoài.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "주다",
    "ipa": "juda",
    "meaning": "Đưa; cho",
    "example": "동생에게 생일 선물을 줬어요.",
    "exampleKo": "Tôi đã tặng em một món quà sinh nhật.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "받다",
    "ipa": "batda",
    "meaning": "Nhận",
    "example": "어제 친구에게 선물을 받았어요.",
    "exampleKo": "Hôm qua tôi nhận quà từ bạn.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "찾다",
    "ipa": "chatda",
    "meaning": "Tìm",
    "example": "잃어버린 열쇠를 찾았어요.",
    "exampleKo": "Tôi đã tìm thấy chiếc chìa khóa bị mất.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "자다",
    "ipa": "jada",
    "meaning": "Ngủ",
    "example": "어젯밤에는 일찍 잤어요.",
    "exampleKo": "Tối qua tôi đã đi ngủ sớm.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "쉬다",
    "ipa": "swida",
    "meaning": "Nghỉ ngơi",
    "example": "일이 끝나면 집에서 조금 쉴 거예요.",
    "exampleKo": "Khi xong việc tôi sẽ nghỉ một chút ở nhà.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "걷다",
    "ipa": "geotda",
    "meaning": "Đi bộ",
    "example": "날씨가 좋아서 공원까지 걸었어요.",
    "exampleKo": "Trời đẹp nên tôi đã đi bộ đến công viên.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "타다",
    "ipa": "tada",
    "meaning": "Đi bằng; lên xe",
    "example": "학교에 갈 때 버스를 타요.",
    "exampleKo": "Tôi đi xe buýt khi đến trường.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "내리다",
    "ipa": "naerida",
    "meaning": "Xuống xe",
    "example": "다음 정류장에서 내려야 해요.",
    "exampleKo": "Tôi phải xuống ở trạm tiếp theo.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "만나다",
    "ipa": "mannada",
    "meaning": "Gặp",
    "example": "퇴근한 뒤에 친구를 만났어요.",
    "exampleKo": "Sau khi tan làm tôi đã gặp bạn.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "일어나다",
    "ipa": "ireonada",
    "meaning": "Thức dậy",
    "example": "매일 아침 일곱 시에 일어나요.",
    "exampleKo": "Sáng nào tôi cũng thức dậy lúc bảy giờ.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "덥다",
    "ipa": "deopda",
    "meaning": "Nóng (thời tiết)",
    "example": "오늘은 날씨가 너무 더워요.",
    "exampleKo": "Hôm nay trời nóng quá.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "춥다",
    "ipa": "chupda",
    "meaning": "Lạnh (thời tiết)",
    "example": "겨울에는 밖이 추우니까 따뜻하게 입으세요.",
    "exampleKo": "Mùa đông bên ngoài lạnh nên hãy mặc ấm.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "쉽다",
    "ipa": "swipda",
    "meaning": "Dễ",
    "example": "이 문제는 생각보다 쉬워요.",
    "exampleKo": "Câu hỏi này dễ hơn tôi tưởng.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "어렵다",
    "ipa": "eoryeopda",
    "meaning": "Khó",
    "example": "처음에는 한국어 발음이 어려웠어요.",
    "exampleKo": "Ban đầu phát âm tiếng Hàn rất khó.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "뜨겁다",
    "ipa": "tteugeopda",
    "meaning": "Nóng (đồ vật, đồ ăn)",
    "example": "국이 뜨거우니 조심해서 드세요.",
    "exampleKo": "Canh nóng nên hãy cẩn thận khi ăn.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "차갑다",
    "ipa": "chagapda",
    "meaning": "Lạnh (khi chạm vào)",
    "example": "냉장고에서 꺼낸 물이 차가워요.",
    "exampleKo": "Nước lấy từ tủ lạnh ra rất lạnh.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "무겁다",
    "ipa": "mugeopda",
    "meaning": "Nặng",
    "example": "이 가방은 책이 많아서 무거워요.",
    "exampleKo": "Chiếc túi này nặng vì có nhiều sách.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "가볍다",
    "ipa": "gabyeopda",
    "meaning": "Nhẹ",
    "example": "이 신발은 가벼워서 걷기 편해요.",
    "exampleKo": "Đôi giày này nhẹ nên đi bộ rất thoải mái.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "싫다",
    "ipa": "silta",
    "meaning": "Ghét; không thích",
    "example": "저는 너무 시끄러운 곳이 싫어요.",
    "exampleKo": "Tôi không thích những nơi quá ồn ào.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "어제",
    "ipa": "eoje",
    "meaning": "Hôm qua",
    "example": "어제는 비가 와서 집에 있었어요.",
    "exampleKo": "Hôm qua trời mưa nên tôi ở nhà.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "모레",
    "ipa": "more",
    "meaning": "Ngày kia",
    "example": "모레 오후에 병원 예약이 있어요.",
    "exampleKo": "Chiều ngày kia tôi có lịch hẹn ở bệnh viện.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "빨리",
    "ipa": "ppalli",
    "meaning": "Nhanh",
    "example": "버스가 곧 출발하니까 빨리 가요.",
    "exampleKo": "Xe buýt sắp chạy rồi nên đi nhanh lên.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "천천히",
    "ipa": "cheoncheonhi",
    "meaning": "Chậm rãi",
    "example": "한국어를 잘 못 알아들으면 천천히 말씀해 주세요.",
    "exampleKo": "Nếu tôi không hiểu rõ tiếng Hàn, xin hãy nói chậm lại.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "조금",
    "ipa": "jogeum",
    "meaning": "Một chút",
    "example": "음식이 너무 매우니 물을 조금 주세요.",
    "exampleKo": "Món ăn cay quá nên cho tôi xin một ít nước.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "많이",
    "ipa": "mani",
    "meaning": "Nhiều",
    "example": "오늘은 일이 많아서 커피를 많이 마셨어요.",
    "exampleKo": "Hôm nay nhiều việc nên tôi uống nhiều cà phê.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "나중에",
    "ipa": "najunge",
    "meaning": "Lát nữa; sau này",
    "example": "지금은 바빠서 나중에 전화할게요.",
    "exampleKo": "Bây giờ tôi bận nên lát nữa sẽ gọi lại.",
    "exampleReviewed": true
  },
  {
    "level": "기초",
    "word": "먼저",
    "ipa": "meonjeo",
    "meaning": "Trước; trước tiên",
    "example": "제가 먼저 주문하고 자리를 잡을게요.",
    "exampleKo": "Tôi sẽ gọi món trước rồi tìm chỗ ngồi.",
    "exampleReviewed": true
  }
];
  const words = Array.isArray(window.KOREAN_WORDS) ? window.KOREAN_WORDS : [];
  const known = new Set(words.map(function (item) { return item.word.normalize("NFC"); }));
  additions.forEach(function (entry) {
    if (known.has(entry.word.normalize("NFC"))) throw new Error("Duplicate Korean word: " + entry.word);
    known.add(entry.word.normalize("NFC"));
  });
  window.KOREAN_WORDS = words.concat(additions);
}());
