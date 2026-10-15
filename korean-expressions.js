(function () {
  "use strict";

  window.KOREAN_EXPRESSIONS = [
    { word: "안녕하세요?", ipa: "annyeonghaseyo", meaning: "Xin chào.", example: "가게에 들어가며 직원에게 안녕하세요라고 인사했어요.", exampleKo: "Tôi chào nhân viên khi bước vào cửa hàng." },
    { word: "잘 지냈어요?", ipa: "jal jinaesseoyo", meaning: "Bạn vẫn khỏe chứ? / Dạo này thế nào?", example: "오랜만에 만난 친구에게 잘 지냈어요라고 물었어요.", exampleKo: "Tôi hỏi người bạn lâu ngày mới gặp rằng dạo này bạn có khỏe không." },
    { word: "고마워요.", ipa: "gomawoyo", meaning: "Cảm ơn bạn.", example: "문을 잡아 준 분에게 고마워요라고 말했어요.", exampleKo: "Tôi cảm ơn người đã giữ cửa giúp mình." },
    { word: "정말 감사합니다.", ipa: "jeongmal gamsahamnida", meaning: "Xin chân thành cảm ơn.", example: "도움을 받은 뒤 정말 감사합니다라고 인사했어요.", exampleKo: "Sau khi được giúp đỡ, tôi đã nói lời cảm ơn chân thành." },
    { word: "죄송해요.", ipa: "joesonghaeyo", meaning: "Tôi xin lỗi.", example: "약속에 늦어서 친구에게 죄송해요라고 말했어요.", exampleKo: "Tôi xin lỗi bạn vì đến muộn buổi hẹn." },
    { word: "괜찮아요.", ipa: "gwaenchanayo", meaning: "Không sao đâu. / Tôi ổn.", example: "친구가 실수했지만 괜찮아요라고 대답했어요.", exampleKo: "Bạn tôi mắc lỗi, nhưng tôi trả lời rằng không sao." },
    { word: "잠시만요.", ipa: "jamsimanyo", meaning: "Xin đợi một chút.", example: "계산 중에 전화가 와서 잠시만요라고 말했어요.", exampleKo: "Điện thoại gọi đến lúc đang thanh toán nên tôi nói xin đợi một chút." },
    { word: "실례합니다.", ipa: "sillyehamnida", meaning: "Xin lỗi, cho tôi hỏi. / Xin phép.", example: "길을 물어보려고 지나가는 분에게 실례합니다라고 했어요.", exampleKo: "Tôi nói xin lỗi để hỏi đường một người đi ngang qua." },
    { word: "이거 얼마예요?", ipa: "igeo eolmayeyo", meaning: "Cái này giá bao nhiêu?", example: "시장에서 가방을 보고 이거 얼마예요라고 물었어요.", exampleKo: "Tôi nhìn thấy chiếc túi ở chợ và hỏi giá bao nhiêu." },
    { word: "카드로 결제할게요.", ipa: "kadeuro gyeoljehalgeyo", meaning: "Tôi sẽ thanh toán bằng thẻ.", example: "계산대에서 카드로 결제할게요라고 말했어요.", exampleKo: "Tôi nói sẽ thanh toán bằng thẻ tại quầy." },
    { word: "영수증 주세요.", ipa: "yeongsujeung juseyo", meaning: "Vui lòng đưa hóa đơn cho tôi.", example: "물건을 산 뒤 영수증 주세요라고 부탁했어요.", exampleKo: "Sau khi mua đồ, tôi nhờ nhân viên đưa hóa đơn." },
    { word: "포장해 주세요.", ipa: "pojanghae juseyo", meaning: "Vui lòng gói mang về.", example: "식당에서 남은 음식을 포장해 주세요라고 했어요.", exampleKo: "Tôi nhờ nhà hàng gói phần thức ăn còn lại mang về." },
    { word: "물 좀 주세요.", ipa: "mul jom juseyo", meaning: "Làm ơn cho tôi xin chút nước.", example: "목이 말라서 직원에게 물 좀 주세요라고 부탁했어요.", exampleKo: "Tôi khát nên nhờ nhân viên cho xin chút nước." },
    { word: "메뉴판 좀 주세요.", ipa: "menyupan jom juseyo", meaning: "Làm ơn cho tôi xin thực đơn.", example: "자리에 앉은 뒤 메뉴판 좀 주세요라고 말했어요.", exampleKo: "Sau khi ngồi vào bàn, tôi nhờ đưa thực đơn." },
    { word: "이걸로 주세요.", ipa: "igeollo juseyo", meaning: "Cho tôi món này.", example: "메뉴에서 음식을 고르고 이걸로 주세요라고 주문했어요.", exampleKo: "Tôi chọn món trong thực đơn và gọi món này." },
    { word: "맵지 않게 해 주세요.", ipa: "maepji anke hae juseyo", meaning: "Vui lòng làm món không cay.", example: "매운 음식을 못 먹어서 맵지 않게 해 주세요라고 부탁했어요.", exampleKo: "Tôi không ăn được cay nên nhờ làm món không cay." },
    { word: "화장실이 어디예요?", ipa: "hwajangsiri eodiyeyo", meaning: "Nhà vệ sinh ở đâu?", example: "역에 도착한 뒤 안내 직원에게 화장실이 어디예요라고 물었어요.", exampleKo: "Sau khi đến ga, tôi hỏi nhân viên nhà vệ sinh ở đâu." },
    { word: "여기 어떻게 가요?", ipa: "yeogi eotteoke gayo", meaning: "Đi đến đây bằng cách nào?", example: "지도에 있는 주소를 보여 주며 여기 어떻게 가요라고 물었어요.", exampleKo: "Tôi đưa địa chỉ trên bản đồ cho xem và hỏi đường đến đó." },
    { word: "이 근처에 지하철역이 있어요?", ipa: "i geuncheoe jihacheolyeogi isseoyo", meaning: "Gần đây có ga tàu điện ngầm không?", example: "길을 걷다가 이 근처에 지하철역이 있어요라고 물었어요.", exampleKo: "Đang đi bộ, tôi hỏi gần đây có ga tàu điện ngầm không." },
    { word: "여기서 내려 주세요.", ipa: "yeogiseo naeryeo juseyo", meaning: "Vui lòng cho tôi xuống ở đây.", example: "목적지에 도착해서 기사님께 여기서 내려 주세요라고 했어요.", exampleKo: "Khi đến nơi, tôi nhờ tài xế cho xuống ở đây." },
    { word: "천천히 말씀해 주세요.", ipa: "cheoncheonhi malsseumhae juseyo", meaning: "Vui lòng nói chậm lại.", example: "한국어가 아직 어려워서 천천히 말씀해 주세요라고 부탁했어요.", exampleKo: "Tiếng Hàn vẫn còn khó nên tôi nhờ người kia nói chậm lại." },
    { word: "다시 말씀해 주세요.", ipa: "dasi malsseumhae juseyo", meaning: "Vui lòng nói lại một lần nữa.", example: "잘 듣지 못해서 다시 말씀해 주세요라고 요청했어요.", exampleKo: "Vì chưa nghe rõ nên tôi nhờ nói lại một lần nữa." },
    { word: "무슨 뜻이에요?", ipa: "museun tteusieyo", meaning: "Có nghĩa là gì?", example: "처음 듣는 단어가 있어서 무슨 뜻이에요라고 물었어요.", exampleKo: "Có một từ lần đầu nghe thấy nên tôi hỏi nó có nghĩa là gì." },
    { word: "한국어를 조금 할 수 있어요.", ipa: "hangugeoreul jogeum hal su isseoyo", meaning: "Tôi có thể nói một chút tiếng Hàn.", example: "새로 만난 이웃에게 한국어를 조금 할 수 있어요라고 소개했어요.", exampleKo: "Tôi giới thiệu với người hàng xóm mới rằng mình có thể nói một chút tiếng Hàn." },
    { word: "사진 좀 찍어 주시겠어요?", ipa: "sajin jom jjigeo jusigesseoyo", meaning: "Bạn có thể chụp giúp tôi một tấm ảnh được không?", example: "관광지에서 지나가는 분께 사진 좀 찍어 주시겠어요라고 부탁했어요.", exampleKo: "Tôi nhờ một người đi ngang qua chụp giúp ảnh ở điểm du lịch." },
    { word: "와이파이 비밀번호가 뭐예요?", ipa: "waipai bimilbeonhoga mwoyeyo", meaning: "Mật khẩu Wi-Fi là gì?", example: "카페에 앉아 직원에게 와이파이 비밀번호가 뭐예요라고 물었어요.", exampleKo: "Tôi ngồi trong quán cà phê và hỏi nhân viên mật khẩu Wi-Fi." },
    { word: "예약했어요.", ipa: "yeyakhaesseoyo", meaning: "Tôi đã đặt chỗ rồi.", example: "식당에 도착해 직원에게 예약했어요라고 말했어요.", exampleKo: "Khi đến nhà hàng, tôi nói với nhân viên rằng mình đã đặt chỗ." },
    { word: "조금 늦을 것 같아요.", ipa: "jogeum neujeul geot gatayo", meaning: "Có lẽ tôi sẽ đến muộn một chút.", example: "버스가 늦게 와서 친구에게 조금 늦을 것 같다고 연락했어요.", exampleKo: "Xe buýt đến muộn nên tôi nhắn bạn rằng có lẽ mình sẽ đến trễ một chút." },
    { word: "먼저 갈게요.", ipa: "meonjeo galgeyo", meaning: "Tôi đi trước nhé.", example: "약속이 있어서 친구들에게 먼저 갈게요라고 인사했어요.", exampleKo: "Vì có hẹn nên tôi chào bạn bè và nói mình đi trước." },
    { word: "내일 봐요.", ipa: "naeil bwayo", meaning: "Hẹn gặp bạn ngày mai.", example: "수업이 끝난 뒤 친구와 내일 봐요라고 인사했어요.", exampleKo: "Sau giờ học, tôi chào bạn và hẹn gặp lại vào ngày mai." }
  ];
}());
