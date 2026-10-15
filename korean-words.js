(function () {
  "use strict";

  window.KOREAN_WORDS = [
    { level: "기초", word: "안녕하세요", ipa: "annyeonghaseyo", meaning: "Xin chào", example: "처음 만난 이웃에게 웃으며 안녕하세요라고 인사했어요.", exampleKo: "Tôi mỉm cười chào người hàng xóm mới gặp." },
    { level: "기초", word: "감사합니다", ipa: "gamsahamnida", meaning: "Cảm ơn", example: "길을 알려 주셔서 정말 감사합니다.", exampleKo: "Cảm ơn bạn rất nhiều vì đã chỉ đường." },
    { level: "기초", word: "네", ipa: "ne", meaning: "Vâng; có", example: "내일 아침 아홉 시에 만나기로 했지요? 네, 기억하고 있어요.", exampleKo: "Chúng ta hẹn gặp lúc chín giờ sáng mai phải không? Vâng, tôi nhớ rồi." },
    { level: "기초", word: "아니요", ipa: "aniyo", meaning: "Không", example: "커피를 더 드릴까요? 아니요, 지금은 괜찮아요.", exampleKo: "Bạn có muốn thêm cà phê không? Không, bây giờ tôi ổn rồi." },
    { level: "기초", word: "저", ipa: "jeo", meaning: "Tôi (khiêm nhường)", example: "저는 베트남에서 왔고 지금 서울에서 한국어를 공부해요.", exampleKo: "Tôi đến từ Việt Nam và hiện đang học tiếng Hàn ở Seoul." },
    { level: "기초", word: "우리", ipa: "uri", meaning: "Chúng tôi; chúng ta", example: "우리 주말에 같이 시장에 가서 저녁 재료를 사요.", exampleKo: "Cuối tuần chúng ta cùng đi chợ mua nguyên liệu cho bữa tối nhé." },
    { level: "기초", word: "사람", ipa: "saram", meaning: "Người", example: "버스에 사람이 많아서 다음 차를 기다렸어요.", exampleKo: "Trên xe buýt đông người nên tôi đợi chuyến tiếp theo." },
    { level: "기초", word: "친구", ipa: "chingu", meaning: "Bạn bè", example: "오랜만에 만난 친구와 카페에서 두 시간 동안 이야기했어요.", exampleKo: "Tôi trò chuyện hai tiếng ở quán cà phê với người bạn lâu ngày mới gặp." },
    { level: "기초", word: "가족", ipa: "gajok", meaning: "Gia đình", example: "우리 가족은 주말마다 함께 저녁을 먹으며 한 주 이야기를 나눠요.", exampleKo: "Mỗi cuối tuần, gia đình tôi cùng ăn tối và kể chuyện trong tuần." },
    { level: "기초", word: "집", ipa: "jip", meaning: "Nhà", example: "오늘은 비가 와서 퇴근하자마자 집에 가서 쉬었어요.", exampleKo: "Hôm nay trời mưa nên tan làm xong tôi về nhà nghỉ ngay." },
    { level: "기초", word: "학교", ipa: "hakgyo", meaning: "Trường học", example: "아침마다 집에서 학교까지 버스로 삼십 분쯤 걸려요.", exampleKo: "Mỗi sáng đi xe buýt từ nhà đến trường mất khoảng ba mươi phút." },
    { level: "기초", word: "학생", ipa: "haksaeng", meaning: "Học sinh; sinh viên", example: "그 학생은 수업이 끝난 뒤 도서관에서 복습해요.", exampleKo: "Học sinh đó ôn bài ở thư viện sau khi tan học." },
    { level: "기초", word: "선생님", ipa: "seonsaengnim", meaning: "Giáo viên; thầy/cô", example: "선생님께 모르는 표현을 질문하고 노트에 적었어요.", exampleKo: "Tôi hỏi giáo viên về cách diễn đạt chưa biết rồi ghi vào vở." },
    { level: "기초", word: "책", ipa: "chaek", meaning: "Sách", example: "잠들기 전에 한국어 책을 몇 쪽 읽는 습관이 있어요.", exampleKo: "Tôi có thói quen đọc vài trang sách tiếng Hàn trước khi ngủ." },
    { level: "기초", word: "물", ipa: "mul", meaning: "Nước", example: "운동을 마친 뒤에는 물을 충분히 마셔야 해요.", exampleKo: "Sau khi tập thể dục, bạn nên uống đủ nước." },
    { level: "기초", word: "밥", ipa: "bap", meaning: "Cơm; bữa ăn", example: "오늘은 시간이 없어서 밥을 먹으면서 회의 자료를 확인했어요.", exampleKo: "Hôm nay không có thời gian nên tôi vừa ăn cơm vừa xem tài liệu họp." },
    { level: "기초", word: "음식", ipa: "eumsik", meaning: "Đồ ăn; thức ăn", example: "한국에 온 뒤 매운 음식에도 조금씩 익숙해지고 있어요.", exampleKo: "Sau khi đến Hàn Quốc, tôi đang dần quen với món ăn cay." },
    { level: "기초", word: "커피", ipa: "keopi", meaning: "Cà phê", example: "아침에 커피 한 잔을 마시면 하루를 시작할 힘이 생겨요.", exampleKo: "Uống một tách cà phê buổi sáng giúp tôi có năng lượng bắt đầu ngày mới." },
    { level: "기초", word: "가다", ipa: "gada", meaning: "Đi", example: "저는 매일 아침 버스를 타고 회사에 가요.", exampleKo: "Mỗi sáng tôi đi xe buýt đến công ty." },
    { level: "기초", word: "오다", ipa: "oda", meaning: "Đến", example: "비가 많이 오는데 우산을 가지고 왔어요?", exampleKo: "Trời đang mưa to, bạn có mang ô đến không?" },
    { level: "기초", word: "먹다", ipa: "meokda", meaning: "Ăn", example: "점심으로 친구와 비빔밥을 먹고 근처 공원을 걸었어요.", exampleKo: "Tôi ăn cơm trộn với bạn vào bữa trưa rồi đi bộ ở công viên gần đó." },
    { level: "기초", word: "마시다", ipa: "masida", meaning: "Uống", example: "목이 아플 때는 따뜻한 물을 자주 마시는 게 좋아요.", exampleKo: "Khi đau họng, uống nước ấm thường xuyên sẽ tốt." },
    { level: "기초", word: "보다", ipa: "boda", meaning: "Xem; nhìn", example: "주말 저녁에 가족과 함께 재미있는 영화를 봤어요.", exampleKo: "Tối cuối tuần tôi xem một bộ phim thú vị cùng gia đình." },
    { level: "기초", word: "하다", ipa: "hada", meaning: "Làm", example: "저는 저녁 식사 후에 삼십 분씩 한국어 공부를 해요.", exampleKo: "Sau bữa tối, tôi học tiếng Hàn mỗi ngày ba mươi phút." },
    { level: "기초", word: "좋다", ipa: "jota", meaning: "Tốt; đẹp; hay", example: "오늘은 날씨가 좋아서 점심시간에 밖에서 산책했어요.", exampleKo: "Hôm nay thời tiết đẹp nên tôi đi dạo bên ngoài vào giờ nghỉ trưa." },
    { level: "기초", word: "크다", ipa: "keuda", meaning: "To; lớn", example: "새로 이사한 집은 창문이 커서 방 안이 밝아요.", exampleKo: "Ngôi nhà mới chuyển đến có cửa sổ lớn nên căn phòng sáng sủa." },
    { level: "기초", word: "작다", ipa: "jakda", meaning: "Nhỏ", example: "작은 가방에 물과 지갑만 넣어서 가볍게 외출했어요.", exampleKo: "Tôi chỉ cho nước và ví vào chiếc túi nhỏ rồi ra ngoài nhẹ nhàng." },
    { level: "기초", word: "오늘", ipa: "oneul", meaning: "Hôm nay", example: "오늘은 일이 많지만 저녁에는 친구를 만나기로 했어요.", exampleKo: "Hôm nay có nhiều việc nhưng buổi tối tôi đã hẹn gặp bạn." },
    { level: "기초", word: "내일", ipa: "naeil", meaning: "Ngày mai", example: "내일 아침 일찍 출발해야 해서 오늘 밤에는 일찍 잘 거예요.", exampleKo: "Ngày mai phải khởi hành sớm nên tối nay tôi sẽ ngủ sớm." },
    { level: "기초", word: "어디", ipa: "eodi", meaning: "Ở đâu", example: "실례합니다, 이 근처에서 가장 가까운 지하철역이 어디예요?", exampleKo: "Xin lỗi, ga tàu điện ngầm gần nhất ở khu vực này ở đâu ạ?" }
  ];
}());
