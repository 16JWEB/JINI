(function () {
  "use strict";

  const groups = [
    `사원|sawon|Nhân viên
동료|dongnyo|Đồng nghiệp
상사|sangsa|Cấp trên
사장|sajang|Giám đốc
부장|bujang|Trưởng phòng
팀장|timjang|Trưởng nhóm
부서|buseo|Phòng ban
업무|eommu|Công việc
직무|jingmu|Nhiệm vụ công việc
근무|geunmu|Ca làm việc
회의|hoeui|Cuộc họp
회의록|hoeuirok|Biên bản họp
발표|balpyo|Bài thuyết trình
보고서|bogoseo|Báo cáo
서류|seoryu|Giấy tờ
문서|munseo|Tài liệu
계약|gyeyak|Hợp đồng
계약서|gyeyakseo|Văn bản hợp đồng
신청서|sincheongseo|Đơn đăng ký
이력서|iryeokseo|Sơ yếu lý lịch
면접|myeonjeop|Phỏng vấn
채용|chaeyong|Tuyển dụng
승진|seungjin|Thăng chức
월급|wolgeup|Lương tháng
수당|sudang|Phụ cấp
야근|yageun|Làm thêm buổi tối
초과근무|chogwageunmu|Làm thêm giờ
출장|chuljang|Chuyến công tác
명함|myeongham|Danh thiếp
사무용품|samuyongpum|Đồ dùng văn phòng`,
    `냄비|naembi|Nồi
프라이팬|peuraipaen|Chảo
국자|gukja|Muôi múc canh
도마|doma|Thớt
식칼|sikkal|Dao làm bếp
접시|jeopsi|Đĩa
그릇|geureut|Bát; tô
젓가락|jeotgarak|Đũa
숟가락|sutgarak|Thìa
포크|pokeu|Nĩa
나이프|naipeu|Dao ăn
냅킨|naepkin|Khăn ăn
앞치마|apchima|Tạp dề
조리법|joribeop|Cách nấu ăn
양념|yangnyeom|Gia vị
소금|sogeum|Muối
후추|huchu|Tiêu
식초|sikcho|Giấm
간장|ganjang|Nước tương
된장|doenjang|Tương đậu nành
고추장|gochujang|Tương ớt Hàn Quốc
참기름|chamgireum|Dầu mè
식용유|sigyongyu|Dầu ăn
밀가루|milgaru|Bột mì
버터|beoteo|Bơ
꿀|kkul|Mật ong
두부|dubu|Đậu phụ
요구르트|yogureuteu|Sữa chua
견과류|gyeongwaryu|Các loại hạt
건포도|geonpodo|Nho khô`,
    `청소기|cheongsogi|Máy hút bụi
세제|seje|Chất tẩy rửa
빨래|ppallae|Quần áo cần giặt
건조대|geonjodae|Giá phơi đồ
수납장|sunapjang|Tủ đựng đồ
서랍|seorap|Ngăn kéo
전구|jeongu|Bóng đèn
콘센트|konsenteu|Ổ cắm điện
스위치|seuwichi|Công tắc
환풍기|hwanpunggi|Quạt thông gió
수도꼭지|sudokkokji|Vòi nước
배수구|baesugu|Lỗ thoát nước
싱크대|singkeudae|Bồn rửa bát
가스레인지|gaseureinji|Bếp ga
전자레인지|jeonjareinji|Lò vi sóng
에어컨|eeokeon|Máy điều hòa
보일러|boilleo|Nồi hơi
난방|nanbang|Hệ thống sưởi
방충망|bangchungmang|Lưới chống côn trùng
커튼|keoteun|Rèm cửa
카펫|kapet|Thảm trải sàn
현관|hyeongwan|Lối vào nhà
베란다|beranda|Ban công
천장|cheonjang|Trần nhà
벽지|byeokji|Giấy dán tường
페인트|peinteu|Sơn
공구|gonggu|Dụng cụ
망치|mangchi|Búa
드라이버|deuraibeo|Tua vít
못|mot|Đinh`,
    `숙박|sukbak|Việc lưu trú
숙소|sukso|Chỗ ở
체크인|chekeuin|Nhận phòng
체크아웃|chekeuaut|Trả phòng
여정|yeojeong|Hành trình
환승|hwanseung|Chuyển tuyến
승강장|seunggangjang|Sân ga
정차|jeongcha|Việc dừng lại
노선|noseon|Tuyến đường
교통편|gyotongpyeon|Phương tiện đi lại
편도|pyeondo|Vé một chiều
왕복|wangbok|Khứ hồi
통근|tonggeun|Việc đi làm hằng ngày
정체|jeongche|Tình trạng ùn tắc
주행|juhaeng|Việc lái xe
운전면허|unjeonmyeonheo|Bằng lái xe
주유소|juyuso|Trạm xăng
주차|jucha|Việc đỗ xe
주차료|jucharyo|Phí đỗ xe
렌터카|renteoka|Xe thuê
항공권|hanggonggwon|Vé máy bay
탑승권|tapseunggwon|Thẻ lên máy bay
탑승구|tapseunggu|Cửa lên máy bay
수하물|suhamul|Hành lý ký gửi
기내|ginae|Trên máy bay
비자|bija|Thị thực
국경|gukgyeong|Biên giới
여행자보험|yeohaengjaboheom|Bảo hiểm du lịch
여행가방|yeohaenggabang|Va-li du lịch
승객|seunggaek|Hành khách`,
    `폭풍|pokpung|Bão
태풍|taepung|Bão nhiệt đới
장마|jangma|Mùa mưa
가뭄|gamum|Hạn hán
홍수|hongsu|Lũ lụt
눈보라|nunbora|Bão tuyết
우박|ubak|Mưa đá
천둥|cheondung|Sấm
번개|beongae|Tia chớp
이슬|iseul|Sương đọng
서리|seori|Sương giá
기온|gion|Nhiệt độ không khí
습도|seupdo|Độ ẩm
기압|giap|Áp suất khí quyển
일기예보|ilgiyebo|Dự báo thời tiết
일출|ilchul|Bình minh
일몰|ilmol|Hoàng hôn
파도|pado|Sóng
해안|haean|Bờ biển
절벽|jeolbyeok|Vách đá
계곡|gyegok|Thung lũng
폭포|pokpo|Thác nước
연못|yeonmot|Ao
호수|hosu|Hồ
사막|samak|Sa mạc
초원|chowon|Đồng cỏ
화산|hwasan|Núi lửa
지진|jijin|Động đất
산사태|sansatae|Sạt lở đất
산불|sanbul|Cháy rừng`,
    `증상|jeungsang|Triệu chứng
진찰|jinchal|Việc khám bệnh
검사|geomsa|Xét nghiệm
혈압|hyeorap|Huyết áp
체온|cheon|Thân nhiệt
맥박|maekbak|Mạch
처방|cheobang|Đơn thuốc; việc kê đơn
복용|bogyong|Việc uống thuốc
부작용|bujagyong|Tác dụng phụ
알레르기|allereugi|Dị ứng
예방접종|yebangjeopjong|Tiêm chủng
영양|yeongyang|Dinh dưỡng
영양소|yeongyangso|Chất dinh dưỡng
단백질|danbaekjil|Chất đạm
탄수화물|tansuhwamul|Tinh bột
지방|jibang|Chất béo
비타민|bitamin|Vitamin
칼로리|kallori|Calo
운동량|undongnyang|Lượng vận động
스트레칭|seuteureching|Động tác giãn cơ
체력|cheryeok|Thể lực
피로|piro|Sự mệt mỏi
스트레스|seuteureseu|Căng thẳng
불면증|bulmyeonjeung|Chứng mất ngủ
두통|dutong|Đau đầu
소화|sohwa|Tiêu hóa
소화불량|sohwabullyang|Chứng khó tiêu
재채기|jaechaegi|Cơn hắt hơi
콧물|konmul|Nước mũi
근육통|geunyuktong|Đau cơ`,
    `기쁨|gippeum|Niềm vui
슬픔|seulpeum|Nỗi buồn
분노|bunno|Cơn giận
불안|buran|Sự lo âu
긴장|ginjang|Sự căng thẳng
안도|ando|Sự nhẹ nhõm
실망|silmang|Sự thất vọng
만족|manjok|Sự hài lòng
자신감|jasingam|Sự tự tin
용기|yonggi|Lòng can đảm
인내심|innaesim|Sự kiên nhẫn
성격|seonggyeok|Tính cách
태도|taedo|Thái độ
친절|chinjeol|Sự tử tế
예의|yeui|Phép lịch sự
배려|baeryeo|Sự quan tâm
존중|jonjung|Sự tôn trọng
신뢰|silloe|Sự tin tưởng
책임|chaegim|Trách nhiệm
습관|seupgwan|Thói quen
관심|gwansim|Sự quan tâm
취향|chwihyang|Sở thích
추억|chueok|Kỷ niệm
목표|mokpyo|Mục tiêu
노력|noryeok|Sự nỗ lực
성공|seonggong|Thành công
실패|silpae|Thất bại
선택|seontaek|Sự lựa chọn
기대|gidae|Sự mong đợi
후회|huhoe|Sự hối tiếc`,
    `강의|gangui|Bài giảng
강사|gangsa|Giảng viên
수강생|sugangsaeng|Học viên
학기|hakgi|Học kỳ
학점|hakjeom|Tín chỉ
시험지|siheomji|Đề thi
성적|seongjeok|Điểm số
점수|jeomsu|Điểm
합격|hapgyeok|Đỗ; trúng tuyển
불합격|bulhapgyeok|Trượt; không trúng tuyển
장학금|janghakgeum|Học bổng
등록금|deungnokgeum|Học phí
졸업|joreop|Tốt nghiệp
입학|iphak|Nhập học
전공|jeongong|Chuyên ngành
교재|gyojae|Giáo trình
참고서|chamgoseo|Sách tham khảo
연습문제|yeonseupmunje|Bài tập luyện
과제|gwaje|Bài tập
연구|yeongu|Nghiên cứu
실험|silheom|Thí nghiệm
관찰|gwanchal|Sự quan sát
토론|toron|Thảo luận
작품|jakpum|Tác phẩm
전시회|jeonsihoe|Triển lãm
공연|gongyeon|Buổi biểu diễn
무대|mudae|Sân khấu
관객|gwangaek|Khán giả
연주|yeonju|Buổi biểu diễn nhạc
악기|akgi|Nhạc cụ`,
    `노트북|noteubuk|Máy tính xách tay
데스크톱|deseukeutop|Máy tính để bàn
모니터|moniteo|Màn hình
마우스|mauseu|Chuột máy tính
프린터|peurinteo|Máy in
복사기|boksagi|Máy photocopy
스캐너|seukaeneo|Máy quét
파일|pail|Tệp
폴더|poldeo|Thư mục
첨부파일|cheombupail|Tệp đính kèm
계정|gyejeong|Tài khoản
사용자명|sayongjamyeong|Tên người dùng
인증|injeung|Xác thực
알림|allim|Thông báo
앱|aep|Ứng dụng
소프트웨어|sopeuteuweeo|Phần mềm
업데이트|eopdeiteu|Bản cập nhật
다운로드|daunrodeu|Tải xuống
업로드|eoprodeu|Tải lên
연결|yeongyeol|Kết nối
와이파이|waipai|Wi-Fi
데이터|deiteo|Dữ liệu
저장공간|jeojanggonggan|Dung lượng lưu trữ
검색어|geomsaekeo|Từ khóa tìm kiếm
웹사이트|wepsaiteu|Trang web
댓글|daetgeul|Bình luận
게시물|gesimul|Bài đăng
구독|gudok|Đăng ký theo dõi
방송|bangsong|Chương trình phát sóng
영상|yeongsang|Video`,
    `주민|jumin|Cư dân
이웃|iut|Hàng xóm
시민|simin|Người dân
지역|jiyeok|Khu vực
동네|dongne|Khu phố
행정|haengjeong|Hành chính
민원|minwon|Đơn kiến nghị
구청|gucheong|Văn phòng quận
시청|sicheong|Tòa thị chính
주민센터|jumin senteo|Trung tâm hành chính phường
복지|bokji|Phúc lợi
지원금|jiwongeum|Tiền trợ cấp
보험|boheom|Bảo hiểm
세금|segeum|Thuế
법률|beomnyul|Pháp luật
규칙|gyuchik|Quy tắc
안전|anjeon|Sự an toàn
위험|wiheom|Nguy hiểm
사고|sago|Tai nạn
신고|singo|Khai báo
구조|gujo|Cứu hộ
대피|daepi|Sơ tán
소방|sobang|Cứu hỏa
접수|jeopsu|Tiếp nhận
안내|annae|Hướng dẫn
문의|munui|Câu hỏi; việc hỏi
운영|unyeong|Hoạt động; vận hành
영업시간|yeongeopsigan|Giờ mở cửa
시설|siseol|Cơ sở vật chất
분실물|bunsilmul|Đồ thất lạc`
  ];

  const rowEntries = groups.reduce(function (allRows, group, groupIndex) {
    return allRows.concat(group.split("\n").map(function (row, rowIndex) {
      return { row: row.trim(), groupIndex: groupIndex, rowIndex: rowIndex };
    }));
  }, []);
  const rows = rowEntries.map(function (entry) { return entry.row; });
  const exampleTemplates = [
    [
      ["회의 전에 '{word}' 관련 자료를 정리했어요.", "Trước cuộc họp, tôi sắp xếp tài liệu liên quan đến '{meaning}'."],
      ["오늘은 '{word}'에 관한 내용을 동료와 확인했어요.", "Hôm nay, tôi kiểm tra nội dung về '{meaning}' cùng đồng nghiệp."],
      ["업무를 처리하며 '{word}'의 의미를 다시 확인했어요.", "Khi xử lý công việc, tôi kiểm tra lại ý nghĩa của '{meaning}'."]
    ],
    [
      ["요리할 때 '{word}'{objectParticle} 사용했어요.", "Khi nấu ăn, tôi đã dùng '{meaning}'."],
      ["주방에서 '{word}'{objectParticle} 찾느라 서랍을 열어 봤어요.", "Tôi mở ngăn kéo để tìm '{meaning}' trong bếp."],
      ["새 조리법에서 '{word}'의 용도를 확인했어요.", "Tôi xem công dụng của '{meaning}' trong công thức mới."]
    ],
    [
      ["집을 정리하면서 '{word}'{objectParticle} 제자리에 두었어요.", "Khi dọn nhà, tôi đặt '{meaning}' về đúng chỗ."],
      ["집에서 '{word}' 상태를 꼼꼼히 확인했어요.", "Tôi kiểm tra kỹ tình trạng của '{meaning}' ở nhà."],
      ["이사 전에 '{word}'{objectParticle} 빠짐없이 챙겼어요.", "Trước khi chuyển nhà, tôi chuẩn bị đầy đủ '{meaning}'."]
    ],
    [
      ["출발 전에 '{word}' 정보를 다시 확인했어요.", "Trước khi khởi hành, tôi kiểm tra lại thông tin về '{meaning}'."],
      ["여행 계획에 '{word}'{objectParticle} 미리 포함했어요.", "Tôi đưa '{meaning}' vào kế hoạch du lịch từ trước."],
      ["이동 중에 '{word}' 관련 안내를 확인했어요.", "Trên đường đi, tôi xem thông tin hướng dẫn liên quan đến '{meaning}'."]
    ],
    [
      ["자연 다큐멘터리에서 '{word}'의 모습을 봤어요.", "Tôi xem hình ảnh về '{meaning}' trong phim tài liệu thiên nhiên."],
      ["수업 시간에 '{word}'의 특징을 배웠어요.", "Trong giờ học, tôi tìm hiểu đặc điểm của '{meaning}'."],
      ["산책 중에 '{word}'의 변화를 자세히 관찰했어요.", "Trong lúc đi dạo, tôi quan sát kỹ sự thay đổi của '{meaning}'."]
    ],
    [
      ["진료 때 '{word}'에 대해 의사에게 질문했어요.", "Trong buổi khám, tôi hỏi bác sĩ về '{meaning}'."],
      ["건강을 위해 '{word}' 상태를 꾸준히 확인하고 있어요.", "Để giữ gìn sức khỏe, tôi thường xuyên theo dõi tình trạng '{meaning}'."],
      ["병원에서 '{word}' 관련 설명을 듣고 메모했어요.", "Ở bệnh viện, tôi nghe giải thích về '{meaning}' rồi ghi chú lại."]
    ],
    [
      ["친구와 대화하면서 '{word}'에 대해 솔직하게 이야기했어요.", "Khi trò chuyện với bạn, tôi thành thật nói về '{meaning}'."],
      ["그 일을 겪으며 '{word}'의 중요성을 깨달았어요.", "Qua chuyện đó, tôi nhận ra tầm quan trọng của '{meaning}'."],
      ["'{word}'에 관해 서로의 생각을 나눴어요.", "Chúng tôi chia sẻ suy nghĩ của nhau về '{meaning}'."]
    ],
    [
      ["수업이 끝난 뒤 '{word}' 내용을 복습했어요.", "Sau giờ học, tôi ôn lại nội dung về '{meaning}'."],
      ["과제를 위해 '{word}' 자료를 도서관에서 찾았어요.", "Tôi tìm tài liệu về '{meaning}' ở thư viện để làm bài tập."],
      ["선생님께 '{word}' 관련 질문을 했어요.", "Tôi hỏi giáo viên một câu liên quan đến '{meaning}'."]
    ],
    [
      ["컴퓨터를 사용하면서 '{word}'{objectParticle} 확인했어요.", "Khi dùng máy tính, tôi kiểm tra '{meaning}'."],
      ["필요한 정보를 찾으려고 '{word}' 기능을 이용했어요.", "Tôi dùng chức năng '{meaning}' để tìm thông tin cần thiết."],
      ["새 기기에서 '{word}'{objectParticle} 사용할 수 있는지 확인했어요.", "Tôi kiểm tra xem có thể dùng '{meaning}' trên thiết bị mới không."]
    ],
    [
      ["주민센터에서 '{word}' 관련 안내를 받았어요.", "Tôi nhận được hướng dẫn về '{meaning}' tại trung tâm hành chính."],
      ["필요한 '{word}' 절차를 담당자에게 물어봤어요.", "Tôi hỏi nhân viên phụ trách về thủ tục '{meaning}' cần thiết."],
      ["지역 주민을 위해 '{word}' 정보를 게시판에 올렸어요.", "Tôi đăng thông tin về '{meaning}' lên bảng tin để người dân trong khu vực cùng biết."]
    ]
  ];
  const existing = Array.isArray(window.KOREAN_WORDS) ? window.KOREAN_WORDS : [];
  const normalize = function (value) { return value.normalize("NFC").replace(/\s+/g, "").toLowerCase(); };
  const existingWords = new Set(existing.map(function (item) { return normalize(item.word); }));

  if (rows.length !== 300 || groups.some(function (group) { return group.split("\n").length !== 30; })) {
    throw new Error("Expected 300 new Korean vocabulary entries in 10 groups of 30.");
  }

  const additions = rows.map(function (row, index) {
    const parts = row.split("|");
    if (parts.length !== 3 || parts.some(function (part) { return !part.trim(); })) {
      throw new Error("Invalid Korean vocabulary row: " + row);
    }
    const word = parts[0].trim();
    const ipa = parts[1].trim();
    const meaning = parts[2].trim();
    const normalizedWord = normalize(word);
    if (existingWords.has(normalizedWord)) throw new Error("Duplicate Korean vocabulary word: " + word);
    existingWords.add(normalizedWord);
    const entry = rowEntries[index];
    const template = exampleTemplates[entry.groupIndex][entry.rowIndex % 3];
    const finalSyllable = word.charCodeAt(word.length - 1);
    const hasFinalConsonant = finalSyllable >= 0xac00 && finalSyllable <= 0xd7a3 && (finalSyllable - 0xac00) % 28 !== 0;
    const objectParticle = hasFinalConsonant ? "을" : "를";
    return {
      level: "기초",
      word: word,
      ipa: ipa,
      meaning: meaning,
      example: template[0].replace(/\{word\}/g, word).replace(/\{objectParticle\}/g, objectParticle),
      exampleKo: template[1].replace(/\{meaning\}/g, meaning)
    };
  });

  if (new Set(additions.map(function (item) { return item.example; })).size !== 300 ||
      additions.some(function (item) { return /[가-힣]/.test(item.meaning) || /[가-힣]/.test(item.exampleKo); })) {
    throw new Error("Korean vocabulary examples must be unique and Vietnamese translations must not contain Korean text.");
  }

  window.KOREAN_WORDS = existing.concat(additions);
}());
