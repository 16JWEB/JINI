/* JINI 개별 검수 예문 누적 데이터 — 기존 디자인과 북마크 키 유지. */
(function () {
  'use strict';
  const rows = [
  [
    "EN",
    "squirrel",
    "A squirrel buried an acorn in our garden.",
    "다람쥐 한 마리가 우리 정원에 도토리를 묻었어요."
  ],
  [
    "EN",
    "chipmunk",
    "A chipmunk ran across the trail and disappeared.",
    "얼룩다람쥐 한 마리가 산책로를 가로질러 달아났어요."
  ],
  [
    "EN",
    "raccoon",
    "A raccoon knocked over the trash can last night.",
    "어젯밤 라쿤 한 마리가 쓰레기통을 넘어뜨렸어요."
  ],
  [
    "EN",
    "fox",
    "We spotted a fox near the edge of the forest.",
    "숲 가장자리 근처에서 여우 한 마리를 발견했어요."
  ],
  [
    "EN",
    "wolf",
    "We heard a wolf howling in the distance.",
    "멀리서 늑대가 울부짖는 소리를 들었어요."
  ],
  [
    "EN",
    "deer",
    "A deer crossed the road in front of our car.",
    "사슴 한 마리가 우리 차 앞에서 길을 건넜어요."
  ],
  [
    "EN",
    "moose",
    "A moose stood beside the lake early in the morning.",
    "이른 아침에 말코손바닥사슴 한 마리가 호숫가에 서 있었어요."
  ],
  [
    "EN",
    "zebra",
    "Each zebra has a unique pattern of stripes.",
    "얼룩말마다 줄무늬 모양이 달라요."
  ],
  [
    "EN",
    "giraffe",
    "The giraffe reached up to eat leaves from a tall tree.",
    "기린은 키 큰 나무의 잎을 먹으려고 목을 뻗었어요."
  ],
  [
    "EN",
    "gorilla",
    "The gorilla gently carried its baby through the grass.",
    "고릴라는 새끼를 조심스럽게 안고 풀밭을 지나갔어요."
  ],
  [
    "EN",
    "panda",
    "The panda spent most of the afternoon eating bamboo.",
    "판다는 오후 대부분을 대나무를 먹으며 보냈어요."
  ],
  [
    "EN",
    "koala",
    "A koala was sleeping high up in a tree.",
    "코알라 한 마리가 나무 높은 곳에서 자고 있었어요."
  ],
  [
    "EN",
    "kangaroo",
    "The kangaroo hopped across the open field.",
    "캥거루는 탁 트인 들판을 뛰어다녔어요."
  ],
  [
    "EN",
    "camel",
    "The camel carried our bags across the desert.",
    "낙타가 사막을 가로질러 우리 가방을 실어 날랐어요."
  ],
  [
    "EN",
    "hippo",
    "The hippo stayed in the water to keep cool.",
    "하마는 더위를 식히려고 물속에 머물렀어요."
  ],
  [
    "EN",
    "rhino",
    "We watched a rhino drinking water at the zoo.",
    "동물원에서 물을 마시는 코뿔소를 지켜봤어요."
  ],
  [
    "EN",
    "cheetah",
    "A cheetah can run very fast over short distances.",
    "치타는 짧은 거리를 아주 빠르게 달릴 수 있어요."
  ],
  [
    "EN",
    "leopard",
    "The leopard climbed into a tree to rest.",
    "표범은 쉬기 위해 나무 위로 올라갔어요."
  ],
  [
    "EN",
    "beak",
    "The bird picked up a seed with its beak.",
    "새는 부리로 씨앗 하나를 집었어요."
  ],
  [
    "EN",
    "feather",
    "A small white feather floated to the ground.",
    "작은 하얀 깃털 하나가 바닥으로 살며시 내려앉았어요."
  ],
  [
    "EN",
    "wing",
    "The injured bird could not move its left wing.",
    "다친 새는 왼쪽 날개를 움직일 수 없었어요."
  ],
  [
    "EN",
    "tail",
    "The dog wagged its tail when I came home.",
    "제가 집에 오자 개가 꼬리를 흔들었어요."
  ],
  [
    "EN",
    "fin",
    "We could see the dolphin's fin above the water.",
    "물 위로 나온 돌고래의 지느러미가 보였어요."
  ],
  [
    "EN",
    "claw",
    "The cat caught the toy with one sharp claw.",
    "고양이가 날카로운 발톱 하나로 장난감을 붙잡았어요."
  ],
  [
    "EN",
    "paw",
    "The puppy put its muddy paw on my shoe.",
    "강아지가 진흙 묻은 앞발을 제 신발 위에 올렸어요."
  ],
  [
    "EN",
    "whisker",
    "The kitten's whiskers moved as it sniffed the bowl.",
    "새끼 고양이는 그릇 냄새를 맡으며 수염을 움직였어요."
  ],
  [
    "EN",
    "fur",
    "The rabbit's fur feels soft and warm.",
    "토끼의 털은 부드럽고 따뜻하게 느껴져요."
  ],
  [
    "EN",
    "shellfish",
    "He cannot eat shellfish because he is allergic to it.",
    "그는 조개류 알레르기가 있어서 조개류를 먹지 못해요."
  ],
  [
    "EN",
    "nest",
    "A robin built its nest under our roof.",
    "울새 한 마리가 우리 집 지붕 아래에 둥지를 지었어요."
  ],
  [
    "EN",
    "web",
    "A spider spun a web between two branches.",
    "거미가 두 나뭇가지 사이에 거미줄을 쳤어요."
  ],
  [
    "EN",
    "den",
    "The fox returned to its den before sunrise.",
    "여우는 해가 뜨기 전에 굴로 돌아갔어요."
  ],
  [
    "EN",
    "burrow",
    "The rabbit disappeared into its burrow.",
    "토끼가 자기 굴속으로 사라졌어요."
  ],
  [
    "EN",
    "hive",
    "Bees carried pollen back to the hive.",
    "벌들이 꽃가루를 벌집으로 날라 왔어요."
  ],
  [
    "EN",
    "pondweed",
    "Small fish hid among the pondweed.",
    "작은 물고기들이 연못풀 사이에 숨었어요."
  ],
  [
    "EN",
    "bakery",
    "The bakery opens at seven every morning.",
    "그 빵집은 매일 아침 일곱 시에 문을 열어요."
  ],
  [
    "EN",
    "butcher",
    "We bought fresh beef from the butcher.",
    "우리는 정육점에서 신선한 소고기를 샀어요."
  ],
  [
    "EN",
    "pharmacy",
    "Is there a pharmacy near this station?",
    "이 역 근처에 약국이 있나요?"
  ],
  [
    "EN",
    "aquarium",
    "The children watched jellyfish at the aquarium.",
    "아이들이 수족관에서 해파리를 구경했어요."
  ],
  [
    "EN",
    "stadium",
    "Thousands of fans filled the stadium before the match.",
    "경기 시작 전에 수천 명의 팬이 경기장을 가득 채웠어요."
  ],
  [
    "EN",
    "theater",
    "We arrived at the theater ten minutes before the play.",
    "우리는 연극 시작 10분 전에 극장에 도착했어요."
  ],
  [
    "KO",
    "접시",
    "깨끗한 접시를 식탁 위에 놓아 주세요.",
    "Hãy đặt đĩa sạch lên bàn ăn."
  ],
  [
    "KO",
    "그릇",
    "국이 뜨거우니 그릇을 조심해서 잡으세요.",
    "Canh nóng nên hãy cầm bát cẩn thận."
  ],
  [
    "KO",
    "포크",
    "스테이크를 먹으려고 포크와 나이프를 준비했어요.",
    "Tôi chuẩn bị nĩa và dao để ăn bít tết."
  ],
  [
    "KO",
    "나이프",
    "이 나이프로 빵을 얇게 썰어 주세요.",
    "Hãy dùng con dao này cắt bánh mì thành lát mỏng."
  ],
  [
    "KO",
    "냅킨",
    "손에 소스가 묻어서 냅킨으로 닦았어요.",
    "Tay tôi dính nước sốt nên tôi lau bằng khăn ăn."
  ],
  [
    "KO",
    "앞치마",
    "요리하기 전에 앞치마를 둘렀어요.",
    "Tôi đeo tạp dề trước khi nấu ăn."
  ],
  [
    "KO",
    "조리법",
    "이 요리의 조리법을 인터넷에서 찾아봤어요.",
    "Tôi đã tìm công thức nấu món này trên mạng."
  ],
  [
    "KO",
    "양념",
    "고기에 양념을 한 뒤 냉장고에 넣었어요.",
    "Tôi ướp thịt với gia vị rồi cho vào tủ lạnh."
  ],
  [
    "KO",
    "소금",
    "국이 싱거우면 소금을 조금 넣으세요.",
    "Nếu canh nhạt, hãy cho thêm một ít muối."
  ],
  [
    "KO",
    "후추",
    "수프에 후추를 조금 뿌렸어요.",
    "Tôi rắc một chút tiêu vào súp."
  ],
  [
    "KO",
    "식초",
    "샐러드 소스에 식초를 한 숟가락 넣었어요.",
    "Tôi cho một thìa giấm vào nước sốt salad."
  ],
  [
    "KO",
    "간장",
    "만두를 간장에 찍어 먹었어요.",
    "Tôi chấm bánh xếp vào nước tương rồi ăn."
  ],
  [
    "KO",
    "된장",
    "어머니가 된장으로 찌개를 끓이셨어요.",
    "Mẹ tôi nấu canh hầm với tương đậu nành Hàn Quốc."
  ],
  [
    "KO",
    "고추장",
    "비빔밥에 고추장을 조금만 넣어 주세요.",
    "Hãy cho một ít tương ớt Hàn Quốc vào cơm trộn thôi."
  ],
  [
    "KO",
    "참기름",
    "나물을 무칠 때 참기름을 넣어요.",
    "Tôi cho dầu mè khi trộn rau đã luộc."
  ],
  [
    "KO",
    "식용유",
    "프라이팬에 식용유를 두르고 달걀을 부쳤어요.",
    "Tôi cho dầu ăn vào chảo rồi chiên trứng."
  ],
  [
    "KO",
    "밀가루",
    "밀가루에 물을 조금씩 부어 반죽했어요.",
    "Tôi rót nước từng chút một vào bột mì rồi nhào bột."
  ],
  [
    "KO",
    "버터",
    "따뜻한 빵 위에 버터를 발랐어요.",
    "Tôi phết bơ lên bánh mì còn ấm."
  ],
  [
    "KO",
    "꿀",
    "목이 아파서 따뜻한 차에 꿀을 넣었어요.",
    "Tôi bị đau họng nên cho mật ong vào trà ấm."
  ],
  [
    "KO",
    "두부",
    "찌개에 두부를 넣고 조금 더 끓이세요.",
    "Hãy cho đậu phụ vào canh hầm rồi đun thêm một lúc."
  ],
  [
    "EX",
    "이번 달 자동 이체가 정상 처리됐나요?",
    "월세가 빠져나갔는지 확인하려고 은행에 \"이번 달 자동 이체가 정상 처리됐나요?\"라고 물었어요.",
    "Tôi hỏi ngân hàng để kiểm tra tiền thuê nhà đã được trừ chưa: \"Khoản chuyển tiền tự động tháng này đã được xử lý thành công chưa?\""
  ],
  [
    "EX",
    "계좌 거래 내역을 최근 석 달분으로 출력해 주세요.",
    "서류를 제출해야 해서 은행 직원에게 \"계좌 거래 내역을 최근 석 달분으로 출력해 주세요.\"라고 부탁했어요.",
    "Vì cần nộp giấy tờ, tôi nhờ nhân viên ngân hàng: \"Vui lòng in sao kê tài khoản trong ba tháng gần đây.\""
  ],
  [
    "EX",
    "잔액 증명서를 발급받고 싶어요.",
    "비자 신청에 필요한 서류를 준비하면서 \"잔액 증명서를 발급받고 싶어요.\"라고 말했어요.",
    "Khi chuẩn bị giấy tờ xin thị thực, tôi nói: \"Tôi muốn xin giấy xác nhận số dư tài khoản.\""
  ],
  [
    "EX",
    "대출 금리를 고정형으로 바꿀 수 있나요?",
    "금리가 오를까 걱정돼서 상담원에게 \"대출 금리를 고정형으로 바꿀 수 있나요?\"라고 물었어요.",
    "Vì lo lãi suất tăng, tôi hỏi nhân viên tư vấn: \"Tôi có thể chuyển lãi suất khoản vay sang lãi suất cố định không?\""
  ],
  [
    "EX",
    "이자 납부일을 다음 주로 미룰 수 있을까요?",
    "급여일이 늦어져 은행에 \"이자 납부일을 다음 주로 미룰 수 있을까요?\"라고 문의했어요.",
    "Vì ngày nhận lương bị lùi, tôi hỏi ngân hàng: \"Tôi có thể hoãn ngày trả lãi sang tuần sau không?\""
  ],
  [
    "EX",
    "예금 만기일에 자동으로 재예치되나요?",
    "정기예금 계약을 확인하며 \"예금 만기일에 자동으로 재예치되나요?\"라고 물었어요.",
    "Khi kiểm tra hợp đồng tiền gửi có kỳ hạn, tôi hỏi: \"Khi đến ngày đáo hạn, tiền gửi có được tự động tái tục không?\""
  ],
  [
    "EX",
    "이 거래를 취소하고 싶어요.",
    "금액을 잘못 입력해서 은행 직원에게 \"이 거래를 취소하고 싶어요.\"라고 말했어요.",
    "Vì nhập sai số tiền, tôi nói với nhân viên ngân hàng: \"Tôi muốn hủy giao dịch này.\""
  ],
  [
    "EX",
    "비밀번호를 세 번 잘못 입력했어요.",
    "계좌가 잠긴 것 같아 상담원에게 \"비밀번호를 세 번 잘못 입력했어요.\"라고 설명했어요.",
    "Vì có vẻ tài khoản đã bị khóa, tôi giải thích với nhân viên tư vấn: \"Tôi đã nhập sai mật khẩu ba lần.\""
  ],
  [
    "EX",
    "새 계좌에 급여를 입금해 주세요.",
    "급여 계좌를 바꾸려고 인사팀에 \"새 계좌에 급여를 입금해 주세요.\"라고 요청했어요.",
    "Để đổi tài khoản nhận lương, tôi nhờ phòng nhân sự: \"Vui lòng chuyển lương vào tài khoản mới.\""
  ],
  [
    "EX",
    "카드 분실 신고를 접수해 주세요.",
    "지갑을 잃어버려 카드사에 전화해 \"카드 분실 신고를 접수해 주세요.\"라고 요청했어요.",
    "Vì làm mất ví, tôi gọi cho công ty thẻ và nói: \"Vui lòng tiếp nhận yêu cầu báo mất thẻ của tôi.\""
  ],
  [
    "EN",
    "citizen",
    "Every citizen has a role in keeping the community clean.",
    "모든 시민은 지역 사회를 깨끗하게 유지하는 데 역할이 있어요."
  ],
  [
    "EN",
    "difference",
    "Can you explain the difference between these two plans?",
    "이 두 계획의 차이를 설명해 주실 수 있나요?"
  ],
  [
    "EN",
    "election",
    "The school held an election for class president.",
    "학교에서 학급 회장 선거를 실시했어요."
  ],
  [
    "EN",
    "law",
    "The new law takes effect next January.",
    "새 법은 내년 1월부터 시행돼요."
  ],
  [
    "EN",
    "leader",
    "A good leader listens to the whole team.",
    "좋은 지도자는 팀원 모두의 의견을 들어요."
  ],
  [
    "EN",
    "meeting",
    "Our team has a meeting every Monday morning.",
    "우리 팀은 매주 월요일 아침에 회의를 해요."
  ],
  [
    "EN",
    "member",
    "My sister is a member of the school orchestra.",
    "제 여동생은 학교 오케스트라 단원이에요."
  ],
  [
    "EN",
    "organization",
    "This organization helps families find affordable housing.",
    "이 단체는 가족들이 부담할 수 있는 주거지를 찾도록 도와줘요."
  ],
  [
    "EN",
    "president",
    "The club elected a new president yesterday.",
    "그 동아리는 어제 새 회장을 선출했어요."
  ],
  [
    "EN",
    "public",
    "This park is open to the public all year round.",
    "이 공원은 일 년 내내 일반인에게 개방돼 있어요."
  ],
  [
    "EN",
    "rule",
    "Please follow the safety rules in the laboratory.",
    "실험실에서는 안전 규칙을 지켜 주세요."
  ],
  [
    "EN",
    "service",
    "The restaurant provides excellent service.",
    "그 식당은 서비스가 아주 좋아요."
  ],
  [
    "EN",
    "volunteer",
    "I volunteer at the local library twice a month.",
    "저는 한 달에 두 번 지역 도서관에서 자원봉사를 해요."
  ],
  [
    "EN",
    "agreement",
    "We reached an agreement after a long discussion.",
    "우리는 긴 논의 끝에 합의에 이르렀어요."
  ],
  [
    "EN",
    "cooperation",
    "The project succeeded because of everyone's cooperation.",
    "모두가 협력한 덕분에 프로젝트가 성공했어요."
  ],
  [
    "EN",
    "crime",
    "The police are investigating a crime reported last night.",
    "경찰은 어젯밤 신고된 범죄를 수사하고 있어요."
  ],
  [
    "EN",
    "fairness",
    "The new rules were designed to ensure fairness.",
    "새 규칙은 공정성을 보장하도록 만들어졌어요."
  ],
  [
    "EN",
    "generation",
    "Each generation faces its own challenges.",
    "세대마다 저마다의 어려움에 직면해요."
  ],
  [
    "EN",
    "identity",
    "You need to prove your identity to open an account.",
    "계좌를 개설하려면 신원을 증명해야 해요."
  ],
  [
    "EN",
    "justice",
    "The families continued to demand justice.",
    "가족들은 계속해서 정의로운 해결을 요구했어요."
  ],
  [
    "EN",
    "minority",
    "The policy aims to protect the rights of minority groups.",
    "그 정책은 소수 집단의 권리를 보호하는 것을 목표로 해요."
  ],
  [
    "EN",
    "neighborhood",
    "A new grocery store opened in our neighborhood.",
    "우리 동네에 새 식료품점이 문을 열었어요."
  ],
  [
    "EN",
    "population growth",
    "Rapid population growth has increased the need for schools.",
    "빠른 인구 증가로 학교가 더 많이 필요해졌어요."
  ],
  [
    "EN",
    "rights",
    "Everyone should know their basic rights.",
    "모든 사람은 자신의 기본적인 권리를 알아야 해요."
  ],
  [
    "EN",
    "volunteering",
    "Volunteering helped me meet people in my community.",
    "자원봉사 덕분에 지역 주민들을 만날 수 있었어요."
  ],
  [
    "EN",
    "arrival",
    "The arrival of our train was delayed by heavy snow.",
    "폭설 때문에 우리 열차의 도착이 지연됐어요."
  ],
  [
    "EN",
    "border",
    "We showed our passports at the border.",
    "우리는 국경에서 여권을 보여 줬어요."
  ],
  [
    "EN",
    "departure",
    "Check the departure time before you leave home.",
    "집에서 출발하기 전에 출발 시간을 확인하세요."
  ],
  [
    "EN",
    "destination",
    "Our final destination is a small town near the coast.",
    "우리의 최종 목적지는 해안 근처의 작은 마을이에요."
  ],
  [
    "EN",
    "fare",
    "How much is the bus fare to the airport?",
    "공항까지 버스 요금이 얼마인가요?"
  ],
  [
    "EN",
    "passport",
    "Make sure your passport is valid before booking a flight.",
    "항공편을 예약하기 전에 여권 유효기간을 확인하세요."
  ],
  [
    "EN",
    "platform",
    "The train to Busan leaves from platform three.",
    "부산행 열차는 3번 승강장에서 출발해요."
  ],
  [
    "EN",
    "route",
    "This route takes us through the city center.",
    "이 경로를 따라가면 도심을 지나게 돼요."
  ],
  [
    "EN",
    "ticket",
    "I bought a train ticket on my phone.",
    "휴대전화로 기차표를 샀어요."
  ],
  [
    "EN",
    "tour",
    "We joined a walking tour of the old town.",
    "우리는 구시가지를 걷는 관광 투어에 참여했어요."
  ],
  [
    "EN",
    "tourist",
    "The tourist asked me how to get to the palace.",
    "관광객이 제게 궁전으로 가는 길을 물었어요."
  ],
  [
    "EN",
    "transportation",
    "Public transportation is convenient in this city.",
    "이 도시는 대중교통이 편리해요."
  ],
  [
    "EN",
    "vehicle",
    "Please do not park your vehicle in front of the gate.",
    "출입구 앞에 차량을 주차하지 마세요."
  ],
  [
    "EN",
    "visa",
    "She applied for a student visa last week.",
    "그녀는 지난주 학생 비자를 신청했어요."
  ],
  [
    "EN",
    "accommodation",
    "We booked accommodation close to the station.",
    "우리는 역에서 가까운 숙소를 예약했어요."
  ],
  [
    "KO",
    "요구르트",
    "아침마다 요구르트 한 컵을 먹어요.",
    "Sáng nào tôi cũng ăn một hộp sữa chua."
  ],
  [
    "KO",
    "견과류",
    "간식으로 견과류를 조금 챙겨 왔어요.",
    "Tôi mang theo một ít hạt để ăn nhẹ."
  ],
  [
    "KO",
    "건포도",
    "빵 반죽에 건포도를 넣었어요.",
    "Tôi cho nho khô vào bột làm bánh mì."
  ],
  [
    "KO",
    "청소기",
    "바닥에 먼지가 많아서 청소기를 돌렸어요.",
    "Sàn nhà nhiều bụi nên tôi dùng máy hút bụi."
  ],
  [
    "KO",
    "세제",
    "세제를 너무 많이 넣으면 거품이 많이 나요.",
    "Nếu cho quá nhiều chất tẩy rửa thì sẽ có nhiều bọt."
  ],
  [
    "KO",
    "빨래",
    "비가 오기 전에 빨래를 걷어야 해요.",
    "Tôi phải thu quần áo đang phơi trước khi trời mưa."
  ],
  [
    "KO",
    "건조대",
    "젖은 수건을 건조대에 널었어요.",
    "Tôi phơi khăn ướt lên giá phơi đồ."
  ],
  [
    "KO",
    "수납장",
    "자주 쓰지 않는 물건은 수납장에 넣어 두세요.",
    "Hãy cất đồ ít dùng vào tủ đựng đồ."
  ],
  [
    "KO",
    "서랍",
    "여권을 책상 첫 번째 서랍에 넣어 뒀어요.",
    "Tôi cất hộ chiếu trong ngăn kéo đầu tiên của bàn làm việc."
  ],
  [
    "KO",
    "전구",
    "방이 어두워서 전구를 새것으로 갈았어요.",
    "Phòng tối nên tôi thay bóng đèn mới."
  ],
  [
    "KO",
    "콘센트",
    "휴대전화 충전기를 콘센트에 꽂았어요.",
    "Tôi cắm bộ sạc điện thoại vào ổ cắm điện."
  ],
  [
    "KO",
    "스위치",
    "나가기 전에 불 스위치를 꺼 주세요.",
    "Hãy tắt công tắc đèn trước khi ra ngoài."
  ],
  [
    "KO",
    "환풍기",
    "샤워한 뒤에는 환풍기를 켜 두세요.",
    "Sau khi tắm, hãy bật quạt thông gió."
  ],
  [
    "KO",
    "수도꼭지",
    "물을 아끼려고 수도꼭지를 꼭 잠갔어요.",
    "Tôi khóa chặt vòi nước để tiết kiệm nước."
  ],
  [
    "KO",
    "배수구",
    "배수구가 막혀서 물이 잘 내려가지 않아요.",
    "Lỗ thoát nước bị tắc nên nước thoát rất chậm."
  ],
  [
    "KO",
    "싱크대",
    "설거지를 마치고 싱크대를 닦았어요.",
    "Tôi lau bồn rửa bát sau khi rửa chén xong."
  ],
  [
    "KO",
    "가스레인지",
    "요리를 마친 뒤 가스레인지를 껐어요.",
    "Tôi tắt bếp ga sau khi nấu ăn xong."
  ],
  [
    "KO",
    "전자레인지",
    "남은 음식을 전자레인지에 데웠어요.",
    "Tôi hâm nóng thức ăn còn lại bằng lò vi sóng."
  ],
  [
    "KO",
    "에어컨",
    "날씨가 더워서 에어컨을 켰어요.",
    "Trời nóng nên tôi bật máy điều hòa."
  ],
  [
    "KO",
    "보일러",
    "뜨거운 물이 나오지 않아서 보일러를 점검했어요.",
    "Không có nước nóng nên tôi kiểm tra hệ thống đun nước."
  ],
  [
    "EX",
    "해외에서 카드 사용이 가능한지 확인해 주세요.",
    "출장을 앞두고 카드사에 \"해외에서 카드 사용이 가능한지 확인해 주세요.\"라고 문의했어요.",
    "Trước chuyến công tác, tôi hỏi công ty thẻ: \"Vui lòng kiểm tra giúp tôi xem thẻ có thể sử dụng ở nước ngoài không.\""
  ],
  [
    "EX",
    "현금 인출 수수료가 붙나요?",
    "ATM 화면을 보다가 직원에게 \"현금 인출 수수료가 붙나요?\"라고 물었어요.",
    "Khi xem màn hình ATM, tôi hỏi nhân viên: \"Rút tiền mặt có mất phí không?\""
  ],
  [
    "EX",
    "세금 납부 기한을 연장할 수 있나요?",
    "납부일을 맞추기 어려워 세무서에 \"세금 납부 기한을 연장할 수 있나요?\"라고 물었어요.",
    "Vì khó nộp kịp hạn, tôi hỏi cơ quan thuế: \"Tôi có thể gia hạn thời hạn nộp thuế không?\""
  ],
  [
    "EX",
    "영수증을 전자 문서로 보내 주세요.",
    "종이 영수증 대신 전자 파일이 필요해서 \"영수증을 전자 문서로 보내 주세요.\"라고 부탁했어요.",
    "Vì cần tệp điện tử thay cho hóa đơn giấy, tôi nhờ: \"Vui lòng gửi biên lai dưới dạng tài liệu điện tử.\""
  ],
  [
    "EX",
    "환율이 바뀌면 알려 주세요.",
    "환전을 계획하면서 은행 상담원에게 \"환율이 바뀌면 알려 주세요.\"라고 부탁했어요.",
    "Khi dự định đổi tiền, tôi nhờ nhân viên ngân hàng: \"Vui lòng báo cho tôi khi tỷ giá thay đổi.\""
  ],
  [
    "EX",
    "자동 납부 계좌를 새 계좌로 옮겨야 해요.",
    "통장을 바꾼 뒤 고객센터에 \"자동 납부 계좌를 새 계좌로 옮겨야 해요.\"라고 말했어요.",
    "Sau khi đổi tài khoản, tôi nói với tổng đài hỗ trợ: \"Tôi cần chuyển tài khoản thanh toán tự động sang tài khoản mới.\""
  ],
  [
    "EX",
    "이체가 완료되면 문자로 알려 주세요.",
    "큰 금액을 송금하면서 \"이체가 완료되면 문자로 알려 주세요.\"라고 요청했어요.",
    "Khi chuyển một khoản tiền lớn, tôi yêu cầu: \"Vui lòng báo cho tôi bằng tin nhắn khi chuyển khoản hoàn tất.\""
  ],
  [
    "EX",
    "월별 지출 내역을 확인하고 싶어요.",
    "가계부를 정리하려고 \"월별 지출 내역을 확인하고 싶어요.\"라고 은행에 말했어요.",
    "Để ghi chép chi tiêu gia đình, tôi nói với ngân hàng: \"Tôi muốn xem chi tiết chi tiêu theo từng tháng.\""
  ],
  [
    "EX",
    "동전으로 바꿀 수 있는 기계가 있나요?",
    "동전이 필요해서 은행 직원에게 \"동전으로 바꿀 수 있는 기계가 있나요?\"라고 물었어요.",
    "Vì cần tiền xu, tôi hỏi nhân viên ngân hàng: \"Ở đây có máy đổi tiền sang tiền xu không?\""
  ],
  [
    "EX",
    "공과금 납부가 두 번 처리된 것 같아요.",
    "계좌 내역에서 같은 금액이 두 번 빠져나가 \"공과금 납부가 두 번 처리된 것 같아요.\"라고 문의했어요.",
    "Thấy cùng một khoản tiền bị trừ hai lần trong tài khoản, tôi báo: \"Có vẻ hóa đơn điện nước đã được thanh toán hai lần.\""
  ],
  [
    "EN",
    "anatomy",
    "Students examined the anatomy of the human heart.",
    "학생들은 사람 심장의 해부학적 구조를 살펴봤어요."
  ],
  [
    "EN",
    "anomaly",
    "The unusual reading may indicate an anomaly in the system.",
    "그 특이한 측정값은 시스템의 이상 현상을 나타낼 수 있어요."
  ],
  [
    "EN",
    "anticipation",
    "She waited for the results with a mixture of hope and anticipation.",
    "그녀는 희망과 기대가 뒤섞인 마음으로 결과를 기다렸어요."
  ],
  [
    "EN",
    "apparatus",
    "The laboratory apparatus must be cleaned after each experiment.",
    "실험 장치는 실험이 끝날 때마다 청소해야 해요."
  ],
  [
    "EN",
    "appraisal",
    "The manager gave a detailed appraisal of my performance.",
    "관리자는 제 업무 성과에 대해 자세히 평가했어요."
  ],
  [
    "EN",
    "arbitration",
    "The two companies agreed to settle the dispute through arbitration.",
    "두 회사는 중재를 통해 분쟁을 해결하기로 합의했어요."
  ],
  [
    "EN",
    "artifact",
    "Archaeologists discovered an ancient artifact near the river.",
    "고고학자들은 강 근처에서 고대 유물을 발견했어요."
  ],
  [
    "EN",
    "assertion",
    "His assertion was not supported by any evidence.",
    "그의 주장은 어떤 증거로도 뒷받침되지 않았어요."
  ],
  [
    "EN",
    "assimilation",
    "Cultural assimilation can affect a community's traditions.",
    "문화적 동화는 공동체의 전통에 영향을 줄 수 있어요."
  ],
  [
    "EN",
    "assumption",
    "Our plan is based on the assumption that prices will remain stable.",
    "우리 계획은 가격이 안정적으로 유지될 것이라는 가정에 바탕을 두고 있어요."
  ],
  [
    "EN",
    "attribute",
    "Patience is an important attribute of a good teacher.",
    "인내심은 좋은 교사의 중요한 자질이에요."
  ],
  [
    "EN",
    "authenticity",
    "Experts questioned the authenticity of the painting.",
    "전문가들은 그 그림이 진품인지 의문을 제기했어요."
  ],
  [
    "EN",
    "autonomy",
    "The new policy gives schools greater autonomy.",
    "새 정책은 학교에 더 큰 자율성을 부여해요."
  ],
  [
    "EN",
    "axiom",
    "The proof begins with a basic mathematical axiom.",
    "그 증명은 기본적인 수학 공리에서 시작해요."
  ],
  [
    "EN",
    "benchmark",
    "Last year's sales figures serve as a benchmark for this year's goals.",
    "지난해 매출 수치는 올해 목표의 기준이 돼요."
  ],
  [
    "EN",
    "bias",
    "Researchers tried to reduce bias in the survey.",
    "연구자들은 설문조사의 편향을 줄이려고 노력했어요."
  ],
  [
    "EN",
    "calculation",
    "There was an error in the final calculation.",
    "최종 계산에 오류가 있었어요."
  ],
  [
    "EN",
    "capacity",
    "The hall has a seating capacity of 300 people.",
    "그 홀에는 300명이 앉을 수 있어요."
  ],
  [
    "EN",
    "categorization",
    "The categorization of the books made them easier to find.",
    "책을 분류하니 찾기가 더 쉬워졌어요."
  ],
  [
    "EN",
    "causation",
    "A strong correlation does not necessarily prove causation.",
    "강한 상관관계가 반드시 인과관계를 증명하는 것은 아니에요."
  ],
  [
    "EN",
    "coefficient",
    "The coefficient in this equation is negative.",
    "이 방정식의 계수는 음수예요."
  ],
  [
    "EN",
    "coherence",
    "The editor improved the coherence of the argument.",
    "편집자는 논지의 일관성을 높였어요."
  ],
  [
    "EN",
    "coincidence",
    "It was a coincidence that we booked the same flight.",
    "우리가 같은 항공편을 예약한 건 우연이었어요."
  ],
  [
    "EN",
    "compilation",
    "This book is a compilation of essays by young writers.",
    "이 책은 젊은 작가들의 수필을 모은 편집물이에요."
  ],
  [
    "EN",
    "complexity",
    "The complexity of the problem surprised the team.",
    "문제가 예상보다 복잡해서 팀이 놀랐어요."
  ],
  [
    "EN",
    "compliance",
    "The factory was inspected for compliance with safety regulations.",
    "그 공장은 안전 규정 준수 여부를 점검받았어요."
  ],
  [
    "EN",
    "composition",
    "Scientists studied the chemical composition of the water.",
    "과학자들은 물의 화학적 구성을 연구했어요."
  ],
  [
    "EN",
    "conception",
    "Our conception of a good education changes over time.",
    "좋은 교육에 대한 우리의 생각은 시간이 지나면서 달라져요."
  ],
  [
    "EN",
    "conformity",
    "The school emphasized conformity rather than creativity.",
    "그 학교는 창의성보다 획일적인 순응을 강조했어요."
  ],
  [
    "EN",
    "consistency",
    "The two reports showed consistency in their findings.",
    "두 보고서는 연구 결과에서 일관성을 보였어요."
  ],
  [
    "EN",
    "constraint",
    "Limited time is our biggest constraint.",
    "제한된 시간이 우리의 가장 큰 제약이에요."
  ],
  [
    "EN",
    "convergence",
    "The convergence of these trends suggests a common cause.",
    "이러한 추세의 수렴은 공통된 원인을 시사해요."
  ],
  [
    "EN",
    "correlation",
    "The study found a correlation between sleep and memory.",
    "그 연구는 수면과 기억력 사이의 상관관계를 발견했어요."
  ],
  [
    "EN",
    "criterion",
    "Cost is one important criterion for choosing a hotel.",
    "비용은 호텔을 선택할 때 중요한 기준 중 하나예요."
  ],
  [
    "EN",
    "deduction",
    "Her deduction followed logically from the evidence.",
    "그녀의 연역적 추론은 증거에서 논리적으로 도출됐어요."
  ],
  [
    "EN",
    "deficiency",
    "A vitamin deficiency can cause serious health problems.",
    "비타민 결핍은 심각한 건강 문제를 일으킬 수 있어요."
  ],
  [
    "EN",
    "definition",
    "Please give a clear definition of the term.",
    "그 용어의 뜻을 명확히 정의해 주세요."
  ],
  [
    "EN",
    "deviation",
    "The results showed a slight deviation from the expected value.",
    "결과는 예상값에서 약간 벗어난 편차를 보였어요."
  ],
  [
    "EN",
    "discrepancy",
    "We found a discrepancy between the receipt and the bank statement.",
    "영수증과 은행 거래 내역 사이에서 불일치를 발견했어요."
  ],
  [
    "EN",
    "distribution",
    "The chart shows the distribution of income across age groups.",
    "그 도표는 연령대별 소득 분포를 보여 줘요."
  ],
  [
    "KO",
    "난방",
    "날씨가 추워져서 어제부터 난방을 켰어요.",
    "Trời trở lạnh nên tôi bật hệ thống sưởi từ hôm qua."
  ],
  [
    "KO",
    "방충망",
    "모기가 들어오지 않도록 방충망을 닫아 주세요.",
    "Hãy đóng lưới chống côn trùng để muỗi không bay vào."
  ],
  [
    "KO",
    "커튼",
    "아침 햇빛이 너무 강해서 커튼을 쳤어요.",
    "Nắng buổi sáng quá gắt nên tôi kéo rèm lại."
  ],
  [
    "KO",
    "카펫",
    "거실 카펫에 주스를 쏟아서 바로 닦았어요.",
    "Tôi làm đổ nước trái cây lên thảm phòng khách nên lau ngay."
  ],
  [
    "KO",
    "현관",
    "신발은 현관에서 벗어 주세요.",
    "Hãy cởi giày ở lối vào nhà."
  ],
  [
    "KO",
    "베란다",
    "베란다에 작은 화분 세 개를 놓았어요.",
    "Tôi đặt ba chậu cây nhỏ ở ban công."
  ],
  [
    "KO",
    "천장",
    "윗집에서 물이 새서 천장에 얼룩이 생겼어요.",
    "Nước rò rỉ từ tầng trên khiến trần nhà bị ố."
  ],
  [
    "KO",
    "벽지",
    "이사하기 전에 오래된 벽지를 새것으로 바꿨어요.",
    "Tôi thay giấy dán tường cũ bằng giấy mới trước khi chuyển vào."
  ],
  [
    "KO",
    "페인트",
    "벽을 칠하려고 흰색 페인트를 샀어요.",
    "Tôi mua sơn trắng để sơn tường."
  ],
  [
    "KO",
    "공구",
    "고장 난 의자를 고치려고 공구를 꺼냈어요.",
    "Tôi lấy dụng cụ ra để sửa chiếc ghế bị hỏng."
  ],
  [
    "KO",
    "망치",
    "망치로 못을 조심해서 박았어요.",
    "Tôi cẩn thận đóng đinh bằng búa."
  ],
  [
    "KO",
    "드라이버",
    "나사를 조이려면 십자 드라이버가 필요해요.",
    "Tôi cần tua vít đầu chữ thập để siết ốc vít."
  ],
  [
    "KO",
    "못",
    "벽에 못을 박기 전에 위치를 표시했어요.",
    "Tôi đánh dấu vị trí trước khi đóng đinh lên tường."
  ],
  [
    "KO",
    "숙박",
    "이번 여행은 호텔에서 이틀 숙박할 예정이에요.",
    "Trong chuyến đi này, tôi dự định ở khách sạn hai đêm."
  ],
  [
    "KO",
    "숙소",
    "역에서 가까운 숙소를 예약했어요.",
    "Tôi đã đặt chỗ ở gần ga."
  ],
  [
    "KO",
    "체크인",
    "호텔 체크인은 오후 세 시부터 가능해요.",
    "Khách sạn cho phép nhận phòng từ ba giờ chiều."
  ],
  [
    "KO",
    "체크아웃",
    "체크아웃을 마친 뒤 프런트에 짐을 맡겼어요.",
    "Sau khi trả phòng, tôi gửi hành lý ở quầy lễ tân."
  ],
  [
    "KO",
    "여정",
    "비행기가 지연되면서 전체 여정이 바뀌었어요.",
    "Chuyến bay bị hoãn khiến toàn bộ hành trình thay đổi."
  ],
  [
    "KO",
    "환승",
    "이 역에서 지하철 2호선으로 환승하세요.",
    "Hãy chuyển sang tuyến tàu điện ngầm số 2 ở ga này."
  ],
  [
    "KO",
    "승강장",
    "부산행 열차는 5번 승강장에서 출발해요.",
    "Tàu đi Busan khởi hành từ sân ga số 5."
  ],
  [
    "EX",
    "저축 목표액을 매달 자동으로 이체하고 싶어요.",
    "매달 일정한 금액을 모으려고 \"저축 목표액을 매달 자동으로 이체하고 싶어요.\"라고 상담했어요.",
    "Vì muốn tiết kiệm một khoản cố định mỗi tháng, tôi hỏi nhân viên tư vấn: \"Tôi muốn tự động chuyển số tiền tiết kiệm mục tiêu hằng tháng.\""
  ],
  [
    "EX",
    "신분증을 꼭 가져와야 하나요?",
    "은행 방문 전에 전화로 \"신분증을 꼭 가져와야 하나요?\"라고 확인했어요.",
    "Trước khi đến ngân hàng, tôi gọi hỏi: \"Tôi có nhất thiết phải mang theo giấy tờ tùy thân không?\""
  ],
  [
    "EX",
    "송금받을 사람의 이름을 다시 확인해 주세요.",
    "계좌번호가 비슷해 보여 \"송금받을 사람의 이름을 다시 확인해 주세요.\"라고 부탁했어요.",
    "Vì các số tài khoản trông khá giống nhau, tôi nhờ: \"Vui lòng kiểm tra lại tên người nhận tiền.\""
  ],
  [
    "EX",
    "청구 금액에 이의가 있어요.",
    "사용하지 않은 서비스 요금이 나와서 \"청구 금액에 이의가 있어요.\"라고 문의했어요.",
    "Vì bị tính phí cho dịch vụ không sử dụng, tôi khiếu nại: \"Tôi không đồng ý với số tiền được tính.\""
  ],
  [
    "EX",
    "수수료가 없는 계좌가 있나요?",
    "새 통장을 만들면서 직원에게 \"수수료가 없는 계좌가 있나요?\"라고 물었어요.",
    "Khi mở tài khoản mới, tôi hỏi nhân viên: \"Có loại tài khoản nào không mất phí không?\""
  ],
  [
    "EX",
    "이 상품은 중도 해지해도 되나요?",
    "적금 상품을 살펴보다가 \"이 상품은 중도 해지해도 되나요?\"라고 물었어요.",
    "Khi tìm hiểu sản phẩm tiết kiệm định kỳ, tôi hỏi: \"Tôi có thể tất toán sản phẩm này trước hạn không?\""
  ],
  [
    "EX",
    "금융 상담을 예약하고 싶어요.",
    "대출 조건을 자세히 알아보려고 \"금융 상담을 예약하고 싶어요.\"라고 전화했어요.",
    "Vì muốn tìm hiểu kỹ điều kiện vay, tôi gọi điện và nói: \"Tôi muốn đặt lịch tư vấn tài chính.\""
  ],
  [
    "EX",
    "조용한 쪽 객실로 배정해 주실 수 있나요?",
    "소음이 걱정돼 체크인할 때 \"조용한 쪽 객실로 배정해 주실 수 있나요?\"라고 부탁했어요.",
    "Vì lo có tiếng ồn, khi nhận phòng tôi nhờ: \"Có thể xếp cho tôi phòng ở phía yên tĩnh không?\""
  ],
  [
    "EX",
    "늦은 체크아웃이 가능한지 확인해 주세요.",
    "출발 항공편이 저녁이라 \"늦은 체크아웃이 가능한지 확인해 주세요.\"라고 요청했어요.",
    "Vì chuyến bay khởi hành vào buổi tối, tôi yêu cầu: \"Vui lòng kiểm tra xem có thể trả phòng muộn không.\""
  ],
  [
    "EX",
    "오늘은 객실 청소를 건너뛰어 주세요.",
    "방에서 쉬고 싶어서 호텔 직원에게 \"오늘은 객실 청소를 건너뛰어 주세요.\"라고 말했어요.",
    "Vì muốn nghỉ ngơi trong phòng, tôi nói với nhân viên khách sạn: \"Hôm nay vui lòng không dọn phòng.\""
  ],
  [
    "EN",
    "cinema",
    "Let's go to the cinema after dinner.",
    "저녁을 먹고 영화관에 가요."
  ],
  [
    "EN",
    "restaurant",
    "We reserved a table at a restaurant near the station.",
    "우리는 역 근처 식당에 자리를 예약했어요."
  ],
  [
    "EN",
    "hotel",
    "Our hotel is a five-minute walk from the beach.",
    "우리 호텔은 해변에서 걸어서 5분 거리에 있어요."
  ],
  [
    "EN",
    "station",
    "Get off at the next station and change trains.",
    "다음 역에서 내려서 열차를 갈아타세요."
  ],
  [
    "EN",
    "sidewalk",
    "Please stay on the sidewalk while you walk.",
    "걸어갈 때는 인도로 다니세요."
  ],
  [
    "EN",
    "crosswalk",
    "Wait for the green light before using the crosswalk.",
    "횡단보도를 건너기 전에 초록불이 켜질 때까지 기다리세요."
  ],
  [
    "EN",
    "tunnel",
    "The train passed through a long tunnel.",
    "열차가 긴 터널을 지나갔어요."
  ],
  [
    "EN",
    "elevator",
    "Take the elevator to the sixth floor.",
    "엘리베이터를 타고 6층으로 가세요."
  ],
  [
    "EN",
    "staircase",
    "The staircase is next to the main entrance.",
    "계단은 정문 옆에 있어요."
  ],
  [
    "EN",
    "balcony",
    "We drank coffee on the balcony in the morning.",
    "우리는 아침에 발코니에서 커피를 마셨어요."
  ],
  [
    "EN",
    "basement",
    "The washing machine is in the basement.",
    "세탁기는 지하실에 있어요."
  ],
  [
    "EN",
    "attic",
    "We keep our old family photos in the attic.",
    "우리는 오래된 가족사진을 다락방에 보관해요."
  ],
  [
    "EN",
    "chimney",
    "Smoke rose slowly from the chimney.",
    "굴뚝에서 연기가 천천히 피어올랐어요."
  ],
  [
    "EN",
    "roof",
    "Workers repaired the roof after the storm.",
    "폭풍이 지나간 뒤 작업자들이 지붕을 수리했어요."
  ],
  [
    "EN",
    "ceiling",
    "There is a water stain on the ceiling.",
    "천장에 물이 샌 자국이 있어요."
  ],
  [
    "EN",
    "wallpaper",
    "We chose light blue wallpaper for the bedroom.",
    "우리는 침실 벽지로 연한 파란색을 골랐어요."
  ],
  [
    "EN",
    "carpet",
    "Please take off your shoes before stepping on the carpet.",
    "카펫 위에 올라가기 전에 신발을 벗어 주세요."
  ],
  [
    "EN",
    "curtain",
    "Close the curtain if the sunlight is too bright.",
    "햇빛이 너무 강하면 커튼을 쳐 주세요."
  ],
  [
    "EN",
    "mirror",
    "She checked her hair in the mirror before leaving.",
    "그녀는 나가기 전에 거울로 머리를 확인했어요."
  ],
  [
    "EN",
    "drawer",
    "The spare batteries are in the top drawer.",
    "여분의 건전지는 맨 위 서랍에 있어요."
  ],
  [
    "EN",
    "shelf",
    "Put the books back on the shelf after reading.",
    "책을 읽은 뒤에는 선반에 다시 꽂아 주세요."
  ],
  [
    "EN",
    "cupboard",
    "The cups are in the cupboard above the sink.",
    "컵은 싱크대 위쪽 찬장에 있어요."
  ],
  [
    "EN",
    "refrigerator",
    "Put the milk back in the refrigerator.",
    "우유를 냉장고에 다시 넣어 주세요."
  ],
  [
    "EN",
    "freezer",
    "The ice cream is in the freezer.",
    "아이스크림은 냉동고에 있어요."
  ],
  [
    "EN",
    "microwave",
    "Heat the leftovers in the microwave for one minute.",
    "남은 음식을 전자레인지에 1분 동안 데우세요."
  ],
  [
    "EN",
    "toaster",
    "The bread popped out of the toaster.",
    "토스터에서 빵이 튀어 올라왔어요."
  ],
  [
    "EN",
    "blender",
    "I made a banana smoothie with a blender.",
    "믹서기로 바나나 스무디를 만들었어요."
  ],
  [
    "EN",
    "kettle",
    "The kettle is boiling; would you like some tea?",
    "주전자에 물이 끓고 있어요. 차를 드실래요?"
  ],
  [
    "EN",
    "saucepan",
    "Warm the soup in a small saucepan.",
    "작은 냄비에 수프를 데우세요."
  ],
  [
    "EN",
    "spatula",
    "Use a spatula to turn the pancake over.",
    "뒤집개로 팬케이크를 뒤집으세요."
  ],
  [
    "EN",
    "ladle",
    "She used a ladle to serve the soup.",
    "그녀는 국자로 수프를 떠서 나눠 주었어요."
  ],
  [
    "EN",
    "whisk",
    "Beat the eggs with a whisk until smooth.",
    "거품기로 달걀을 부드럽게 풀어 주세요."
  ],
  [
    "EN",
    "colander",
    "Drain the cooked pasta in a colander.",
    "삶은 파스타를 채반에 밭쳐 물기를 빼세요."
  ],
  [
    "EN",
    "napkin",
    "Could I have another napkin, please?",
    "냅킨 하나 더 주시겠어요?"
  ],
  [
    "EN",
    "tablecloth",
    "We spread a clean tablecloth over the table.",
    "우리는 식탁 위에 깨끗한 식탁보를 펼쳤어요."
  ],
  [
    "EN",
    "placemat",
    "Put a placemat under each plate.",
    "접시마다 밑에 식탁 매트를 깔아 주세요."
  ],
  [
    "EN",
    "pitcher",
    "She filled the pitcher with cold water.",
    "그녀는 물병에 찬물을 채웠어요."
  ],
  [
    "EN",
    "thermos",
    "I brought hot tea to work in a thermos.",
    "저는 보온병에 따뜻한 차를 담아 회사에 가져왔어요."
  ],
  [
    "EN",
    "straw",
    "He drank the juice through a straw.",
    "그는 빨대로 주스를 마셨어요."
  ],
  [
    "EN",
    "toothbrush",
    "I replace my toothbrush every few months.",
    "저는 몇 달에 한 번씩 칫솔을 바꿔요."
  ],
  [
    "KO",
    "정차",
    "이 버스는 다음 정류장에 정차하지 않아요.",
    "Xe buýt này không dừng ở trạm tiếp theo."
  ],
  [
    "KO",
    "국경",
    "국경을 넘기 전에 여권을 확인했어요.",
    "Tôi kiểm tra hộ chiếu trước khi qua biên giới."
  ],
  [
    "KO",
    "승객",
    "승객들은 안전벨트를 매고 자리에 앉았어요.",
    "Các hành khách thắt dây an toàn và ngồi vào chỗ."
  ],
  [
    "KO",
    "가뭄",
    "오랜 가뭄으로 저수지의 물이 줄었어요.",
    "Hạn hán kéo dài khiến lượng nước trong hồ chứa giảm."
  ],
  [
    "KO",
    "눈보라",
    "눈보라가 심해서 앞이 거의 보이지 않았어요.",
    "Bão tuyết mạnh đến mức tôi hầu như không nhìn thấy phía trước."
  ],
  [
    "KO",
    "우박",
    "갑자기 우박이 내려 차 유리에 부딪혔어요.",
    "Mưa đá bất ngờ rơi xuống và đập vào kính ô tô."
  ],
  [
    "KO",
    "천둥",
    "밤새 천둥이 쳐서 잠을 설쳤어요.",
    "Sấm vang suốt đêm khiến tôi ngủ không ngon."
  ],
  [
    "KO",
    "번개",
    "번개가 치자 곧 큰 천둥소리가 들렸어요.",
    "Ngay sau khi tia chớp lóe lên, một tiếng sấm lớn vang lên."
  ],
  [
    "KO",
    "이슬",
    "아침에는 풀잎에 이슬이 맺혀 있어요.",
    "Buổi sáng, những giọt sương đọng trên lá cỏ."
  ],
  [
    "KO",
    "서리",
    "새벽 기온이 떨어지면서 차창에 서리가 꼈어요.",
    "Nhiệt độ rạng sáng giảm khiến kính xe phủ một lớp sương giá."
  ],
  [
    "KO",
    "기온",
    "내일은 오늘보다 기온이 낮아질 거예요.",
    "Ngày mai nhiệt độ sẽ thấp hơn hôm nay."
  ],
  [
    "KO",
    "습도",
    "장마철에는 실내 습도가 높아져요.",
    "Vào mùa mưa, độ ẩm trong nhà tăng cao."
  ],
  [
    "KO",
    "기압",
    "태풍이 다가오면서 기압이 떨어졌어요.",
    "Áp suất khí quyển giảm khi bão tiến đến gần."
  ],
  [
    "KO",
    "일출",
    "우리는 일출을 보려고 새벽에 산에 올랐어요.",
    "Chúng tôi leo núi từ sáng sớm để ngắm bình minh."
  ],
  [
    "KO",
    "일몰",
    "해변에서 아름다운 일몰을 구경했어요.",
    "Chúng tôi ngắm hoàng hôn tuyệt đẹp trên bãi biển."
  ],
  [
    "KO",
    "파도",
    "바람이 강해지자 파도가 높아졌어요.",
    "Khi gió mạnh hơn, sóng cũng cao hơn."
  ],
  [
    "KO",
    "해안",
    "우리는 해안을 따라 한 시간쯤 걸었어요.",
    "Chúng tôi đi bộ dọc bờ biển khoảng một giờ."
  ],
  [
    "KO",
    "절벽",
    "절벽 가장자리에는 가까이 가지 마세요.",
    "Đừng đến gần mép vách đá."
  ],
  [
    "KO",
    "계곡",
    "여름에는 시원한 계곡에서 쉬는 걸 좋아해요.",
    "Vào mùa hè, tôi thích nghỉ ngơi bên thung lũng mát mẻ."
  ],
  [
    "KO",
    "폭포",
    "숲길을 따라 걷다가 작은 폭포를 발견했어요.",
    "Đi dọc đường mòn trong rừng, chúng tôi phát hiện một thác nước nhỏ."
  ],
  [
    "EX",
    "방에 여분의 베개를 가져다주실래요?",
    "베개가 하나 더 필요해서 프런트에 \"방에 여분의 베개를 가져다주실래요?\"라고 요청했어요.",
    "Vì cần thêm một chiếc gối, tôi nhờ lễ tân: \"Anh/chị có thể mang thêm gối lên phòng giúp tôi không?\""
  ],
  [
    "EX",
    "방 열쇠가 작동하지 않아요.",
    "방에 들어가지 못해서 직원에게 \"방 열쇠가 작동하지 않아요.\"라고 말했어요.",
    "Vì không vào được phòng, tôi báo nhân viên: \"Chìa khóa phòng không hoạt động.\""
  ],
  [
    "EX",
    "예약자 이름을 바꾸고 싶어요.",
    "친구 대신 제가 숙박하게 되어 \"예약자 이름을 바꾸고 싶어요.\"라고 말했어요.",
    "Vì tôi sẽ ở thay bạn mình, tôi nói: \"Tôi muốn đổi tên người đặt phòng.\""
  ],
  [
    "EX",
    "예약 확인서를 다시 보내 주세요.",
    "예약 메일을 찾을 수 없어 \"예약 확인서를 다시 보내 주세요.\"라고 요청했어요.",
    "Vì không tìm thấy email đặt phòng, tôi yêu cầu: \"Vui lòng gửi lại xác nhận đặt phòng.\""
  ],
  [
    "EX",
    "전망이 좋은 방으로 바꿀 수 있나요?",
    "객실에서 밖이 잘 보이지 않아 \"전망이 좋은 방으로 바꿀 수 있나요?\"라고 물었어요.",
    "Vì từ phòng không nhìn rõ cảnh bên ngoài, tôi hỏi: \"Tôi có thể đổi sang phòng có tầm nhìn đẹp hơn không?\""
  ],
  [
    "EX",
    "호텔까지 셔틀버스가 운행하나요?",
    "기차역에서 호텔로 가려고 \"호텔까지 셔틀버스가 운행하나요?\"라고 물었어요.",
    "Để đi từ ga tàu đến khách sạn, tôi hỏi: \"Có xe đưa đón chạy đến khách sạn không?\""
  ],
  [
    "EX",
    "공항에서 호텔까지 무료 픽업이 있나요?",
    "공항에 늦게 도착할 예정이라 \"공항에서 호텔까지 무료 픽업이 있나요?\"라고 문의했어요.",
    "Vì dự kiến đến sân bay muộn, tôi hỏi: \"Có dịch vụ đón miễn phí từ sân bay đến khách sạn không?\""
  ],
  [
    "EX",
    "항공편이 지연되어 도착이 늦을 것 같아요.",
    "호텔에 전화해서 \"항공편이 지연되어 도착이 늦을 것 같아요.\"라고 알렸어요.",
    "Tôi gọi cho khách sạn và báo: \"Chuyến bay bị hoãn nên có lẽ tôi sẽ đến muộn.\""
  ],
  [
    "EX",
    "기내 반입 가방 크기를 확인해 주세요.",
    "탑승 전에 직원에게 \"기내 반입 가방 크기를 확인해 주세요.\"라고 부탁했어요.",
    "Trước khi lên máy bay, tôi nhờ nhân viên: \"Vui lòng kiểm tra kích thước hành lý xách tay của tôi.\""
  ],
  [
    "EX",
    "좌석을 통로 쪽으로 바꿀 수 있나요?",
    "장거리 비행이라 \"좌석을 통로 쪽으로 바꿀 수 있나요?\"라고 직원에게 물었어요.",
    "Vì chuyến bay dài, tôi hỏi nhân viên: \"Tôi có thể đổi sang ghế cạnh lối đi không?\""
  ],
  [
    "EN",
    "aisle",
    "Could you show me where the aisle seats are?",
    "통로 쪽 좌석이 어디인지 알려 주실 수 있나요?"
  ],
  [
    "EN",
    "podium",
    "The speaker stepped up to the podium before the ceremony.",
    "연설자가 행사 시작 전에 연단으로 올라갔어요."
  ],
  [
    "EN",
    "booking",
    "I received a confirmation email for my hotel booking.",
    "호텔 예약 확인 이메일을 받았어요."
  ],
  [
    "EN",
    "bus stop",
    "The bus stop is across the street from the bank.",
    "버스 정류장은 은행 건너편에 있어요."
  ],
  [
    "EN",
    "cab",
    "We took a cab to the airport because it was raining.",
    "비가 와서 택시를 타고 공항에 갔어요."
  ],
  [
    "EN",
    "commute",
    "My daily commute takes about forty minutes.",
    "저는 매일 출퇴근하는 데 약 40분이 걸려요."
  ],
  [
    "EN",
    "delay",
    "We apologized to the customers for the delay.",
    "우리는 고객들에게 지연에 대해 사과했어요."
  ],
  [
    "EN",
    "gate",
    "Our flight is boarding at gate twelve.",
    "우리 항공편은 12번 탑승구에서 탑승 중이에요."
  ],
  [
    "EN",
    "highway",
    "Traffic on the highway was heavy this morning.",
    "오늘 아침 고속도로에 차가 많이 막혔어요."
  ],
  [
    "EN",
    "hostel",
    "We stayed at a small hostel near the old town.",
    "우리는 구시가지 근처의 작은 호스텔에 머물렀어요."
  ],
  [
    "EN",
    "intersection",
    "Turn left at the next intersection.",
    "다음 교차로에서 좌회전하세요."
  ],
  [
    "EN",
    "itinerary",
    "I shared our travel itinerary with my family.",
    "가족에게 여행 일정표를 공유했어요."
  ],
  [
    "EN",
    "luggage",
    "You can leave your luggage at the hotel after checkout.",
    "체크아웃 후에도 호텔에 짐을 맡길 수 있어요."
  ],
  [
    "EN",
    "parking",
    "Is free parking available for hotel guests?",
    "호텔 투숙객은 무료 주차가 가능한가요?"
  ],
  [
    "EN",
    "reservation",
    "I need to change my dinner reservation to seven o'clock.",
    "저녁 식사 예약을 7시로 변경해야 해요."
  ],
  [
    "EN",
    "transfer",
    "We have only fifteen minutes to make the transfer.",
    "우리는 환승하는 데 15분밖에 없어요."
  ],
  [
    "EN",
    "way",
    "Is there a faster way to get to the station?",
    "역까지 더 빨리 가는 방법이 있나요?"
  ],
  [
    "EN",
    "account",
    "I opened a new savings account at the bank.",
    "은행에서 새 저축 계좌를 개설했어요."
  ],
  [
    "EN",
    "article",
    "I read an interesting article about space travel.",
    "우주여행에 관한 흥미로운 기사를 읽었어요."
  ],
  [
    "EN",
    "channel",
    "Please subscribe to our school's video channel.",
    "우리 학교 영상 채널을 구독해 주세요."
  ],
  [
    "EN",
    "connection",
    "My internet connection keeps dropping during meetings.",
    "회의 중에 인터넷 연결이 자꾸 끊겨요."
  ],
  [
    "EN",
    "device",
    "Please turn off your device during the performance.",
    "공연 중에는 기기를 꺼 주세요."
  ],
  [
    "EN",
    "file",
    "I attached the wrong file to the email.",
    "이메일에 잘못된 파일을 첨부했어요."
  ],
  [
    "EN",
    "message",
    "I sent you a message about tomorrow's meeting.",
    "내일 회의에 관해 메시지를 보냈어요."
  ],
  [
    "EN",
    "network",
    "The office network is down this morning.",
    "오늘 아침 사무실 네트워크가 작동하지 않아요."
  ],
  [
    "EN",
    "password",
    "Choose a strong password for your account.",
    "계정에 사용할 안전한 비밀번호를 정하세요."
  ],
  [
    "EN",
    "signal",
    "My phone has no signal inside the tunnel.",
    "터널 안에서는 휴대전화 신호가 잡히지 않아요."
  ],
  [
    "EN",
    "software",
    "The software automatically saves your work.",
    "그 소프트웨어는 작업 내용을 자동으로 저장해요."
  ],
  [
    "EN",
    "video",
    "She sent me a short video of the concert.",
    "그녀는 콘서트의 짧은 영상을 보내 줬어요."
  ],
  [
    "EN",
    "wireless",
    "This wireless keyboard connects to my tablet.",
    "이 무선 키보드는 제 태블릿에 연결돼요."
  ],
  [
    "EN",
    "app",
    "I use an app to track my daily spending.",
    "저는 앱으로 매일 지출을 기록해요."
  ],
  [
    "EN",
    "browser",
    "Open the website in a different browser.",
    "다른 브라우저에서 그 웹사이트를 열어 보세요."
  ],
  [
    "EN",
    "emoji",
    "He added a smiley emoji to the end of his message.",
    "그는 메시지 끝에 웃는 얼굴 이모지를 넣었어요."
  ],
  [
    "EN",
    "hashtag",
    "Add a hashtag so people can find your post.",
    "사람들이 게시물을 찾을 수 있도록 해시태그를 넣으세요."
  ],
  [
    "EN",
    "icon",
    "Tap the bell icon to turn on notifications.",
    "알림을 켜려면 종 모양 아이콘을 누르세요."
  ],
  [
    "EN",
    "login",
    "My login stopped working after the update.",
    "업데이트 후에 로그인이 되지 않아요."
  ],
  [
    "EN",
    "online",
    "You can submit the application online.",
    "신청서를 온라인으로 제출할 수 있어요."
  ],
  [
    "EN",
    "podcast",
    "I listen to a history podcast on my way to work.",
    "출근길에 역사 팟캐스트를 들어요."
  ],
  [
    "EN",
    "profile",
    "She updated her profile picture yesterday.",
    "그녀는 어제 프로필 사진을 바꿨어요."
  ],
  [
    "EN",
    "social media",
    "Many students share their artwork on social media.",
    "많은 학생이 소셜 미디어에 자신의 작품을 공유해요."
  ],
  [
    "KO",
    "호수",
    "호수 주변을 천천히 한 바퀴 걸었어요.",
    "Tôi thong thả đi bộ một vòng quanh hồ."
  ],
  [
    "KO",
    "사막",
    "사막에서는 낮과 밤의 기온 차가 클 수 있어요.",
    "Ở sa mạc, nhiệt độ giữa ngày và đêm có thể chênh lệch lớn."
  ],
  [
    "KO",
    "초원",
    "넓은 초원에서 말들이 풀을 뜯고 있었어요.",
    "Những con ngựa đang gặm cỏ trên đồng cỏ rộng lớn."
  ],
  [
    "KO",
    "화산",
    "그 화산은 수십 년 동안 분화하지 않았어요.",
    "Núi lửa đó đã không phun trào trong nhiều thập kỷ."
  ],
  [
    "KO",
    "지진",
    "지진이 나면 머리를 보호하고 안전한 곳으로 대피하세요.",
    "Khi xảy ra động đất, hãy bảo vệ đầu và sơ tán đến nơi an toàn."
  ],
  [
    "KO",
    "산사태",
    "폭우가 내린 뒤 산사태가 발생했어요.",
    "Sau trận mưa lớn, một vụ sạt lở đất đã xảy ra."
  ],
  [
    "KO",
    "산불",
    "산불이 번지자 주민들이 대피했어요.",
    "Khi cháy rừng lan rộng, người dân đã sơ tán."
  ],
  [
    "KO",
    "진찰",
    "의사 선생님께 진찰을 받고 약을 처방받았어요.",
    "Tôi được bác sĩ khám và kê đơn thuốc."
  ],
  [
    "KO",
    "혈압",
    "간호사님이 혈압을 두 번 측정했어요.",
    "Y tá đo huyết áp của tôi hai lần."
  ],
  [
    "KO",
    "체온",
    "아이가 열이 나는 것 같아 체온을 쟀어요.",
    "Tôi đo thân nhiệt của bé vì có vẻ bé bị sốt."
  ],
  [
    "KO",
    "맥박",
    "운동을 마친 뒤 맥박을 확인했어요.",
    "Sau khi tập thể dục, tôi kiểm tra nhịp mạch."
  ],
  [
    "KO",
    "복용",
    "약을 복용하기 전에 설명서를 읽어 보세요.",
    "Hãy đọc hướng dẫn trước khi uống thuốc."
  ],
  [
    "KO",
    "예방접종",
    "아이의 예방접종 기록을 확인했어요.",
    "Tôi kiểm tra hồ sơ tiêm chủng của bé."
  ],
  [
    "KO",
    "영양",
    "균형 잡힌 식사를 하면 필요한 영양을 골고루 얻을 수 있어요.",
    "Ăn uống cân bằng giúp cơ thể nhận được các chất dinh dưỡng cần thiết."
  ],
  [
    "KO",
    "영양소",
    "채소와 과일에는 다양한 영양소가 들어 있어요.",
    "Rau và trái cây chứa nhiều loại chất dinh dưỡng."
  ],
  [
    "KO",
    "단백질",
    "달걀과 두부는 단백질을 얻을 수 있는 식품이에요.",
    "Trứng và đậu phụ là những thực phẩm cung cấp chất đạm."
  ],
  [
    "KO",
    "탄수화물",
    "쌀과 빵에는 탄수화물이 많이 들어 있어요.",
    "Gạo và bánh mì chứa nhiều carbohydrate."
  ],
  [
    "KO",
    "지방",
    "견과류에는 지방이 들어 있어요.",
    "Các loại hạt có chứa chất béo."
  ],
  [
    "KO",
    "비타민",
    "이 음식에는 비타민 C가 풍부해요.",
    "Món ăn này giàu vitamin C."
  ],
  [
    "KO",
    "칼로리",
    "영양 정보를 보고 음식의 칼로리를 확인했어요.",
    "Tôi xem thông tin dinh dưỡng để kiểm tra lượng calo của món ăn."
  ],
  [
    "EX",
    "특별식 요청이 예약에 반영됐나요?",
    "비행기를 타기 전에 항공사에 \"특별식 요청이 예약에 반영됐나요?\"라고 확인했어요.",
    "Trước khi lên máy bay, tôi hỏi hãng hàng không: \"Yêu cầu suất ăn đặc biệt đã được ghi nhận trong đặt chỗ chưa?\""
  ],
  [
    "EX",
    "탑승 시작 시간이 언제예요?",
    "출발 안내판을 보면서 직원에게 \"탑승 시작 시간이 언제예요?\"라고 물었어요.",
    "Khi xem bảng thông tin chuyến bay, tôi hỏi nhân viên: \"Mấy giờ bắt đầu lên máy bay?\""
  ],
  [
    "EX",
    "환승할 때 보안 검색을 다시 받아야 하나요?",
    "다른 나라에서 비행기를 갈아타야 해서 \"환승할 때 보안 검색을 다시 받아야 하나요?\"라고 물었어요.",
    "Vì phải nối chuyến ở một nước khác, tôi hỏi: \"Khi nối chuyến, tôi có phải kiểm tra an ninh lại không?\""
  ],
  [
    "EX",
    "면세품을 찾는 곳이 어디인가요?",
    "면세점에서 미리 주문한 물건을 찾으려고 \"면세품을 찾는 곳이 어디인가요?\"라고 물었어요.",
    "Để nhận món hàng đã đặt trước ở cửa hàng miễn thuế, tôi hỏi: \"Tôi nhận hàng miễn thuế ở đâu?\""
  ],
  [
    "EX",
    "여행 일정표를 인쇄해 주실 수 있나요?",
    "종이 일정표가 필요해서 직원에게 \"여행 일정표를 인쇄해 주실 수 있나요?\"라고 부탁했어요.",
    "Vì cần lịch trình bằng giấy, tôi nhờ nhân viên: \"Anh/chị có thể in lịch trình chuyến đi giúp tôi không?\""
  ],
  [
    "EX",
    "예약 취소 수수료가 얼마예요?",
    "일정을 바꾸게 되어 \"예약 취소 수수료가 얼마예요?\"라고 문의했어요.",
    "Vì phải thay đổi kế hoạch, tôi hỏi: \"Phí hủy đặt chỗ là bao nhiêu?\""
  ],
  [
    "EX",
    "날씨 때문에 투어가 취소됐나요?",
    "비가 많이 와서 여행사에 \"날씨 때문에 투어가 취소됐나요?\"라고 물었어요.",
    "Vì trời mưa to, tôi hỏi công ty du lịch: \"Chuyến tham quan đã bị hủy do thời tiết phải không?\""
  ],
  [
    "EX",
    "체크인하려면 여권이 필요해요?",
    "호텔에 들어가기 전에 \"체크인하려면 여권이 필요해요?\"라고 확인했어요.",
    "Trước khi nhận phòng khách sạn, tôi hỏi: \"Tôi có cần hộ chiếu để làm thủ tục nhận phòng không?\""
  ],
  [
    "EX",
    "이 짐은 깨지기 쉬우니 조심해 주세요.",
    "유리병이 들어 있는 가방을 맡기며 \"이 짐은 깨지기 쉬우니 조심해 주세요.\"라고 부탁했어요.",
    "Khi gửi túi có chai thủy tinh, tôi nhờ: \"Hành lý này có đồ dễ vỡ, xin hãy cẩn thận.\""
  ],
  [
    "EX",
    "수하물이 나오지 않았어요.",
    "수하물 벨트에서 가방을 찾지 못해 직원에게 \"수하물이 나오지 않았어요.\"라고 말했어요.",
    "Vì không tìm thấy vali trên băng chuyền hành lý, tôi báo nhân viên: \"Hành lý của tôi chưa xuất hiện.\""
  ],
  [
    "EN",
    "ecosystem",
    "Plastic waste can harm the marine ecosystem.",
    "플라스틱 쓰레기는 해양 생태계에 해를 끼칠 수 있어요."
  ],
  [
    "EN",
    "organism",
    "The pond is home to many tiny organisms.",
    "그 연못에는 작은 생물들이 많이 살고 있어요."
  ],
  [
    "EN",
    "specimen",
    "The scientist labeled each specimen before the experiment.",
    "과학자는 실험 전에 각 표본에 이름표를 붙였어요."
  ],
  [
    "EN",
    "habitat",
    "Protecting the forest helps preserve the animals' habitat.",
    "숲을 보호하면 동물들의 서식지를 보전하는 데 도움이 돼요."
  ],
  [
    "EN",
    "biodiversity",
    "Biodiversity is important for a healthy ecosystem.",
    "생물 다양성은 건강한 생태계에 중요해요."
  ],
  [
    "EN",
    "organ",
    "The heart is an organ that pumps blood around the body.",
    "심장은 온몸으로 혈액을 내보내는 기관이에요."
  ],
  [
    "EN",
    "tissue",
    "The doctor examined a small sample of tissue.",
    "의사는 소량의 조직 표본을 검사했어요."
  ],
  [
    "EN",
    "cell",
    "Every living cell needs energy to function.",
    "모든 살아 있는 세포는 기능하려면 에너지가 필요해요."
  ],
  [
    "EN",
    "molecule",
    "A water molecule contains two hydrogen atoms and one oxygen atom.",
    "물 분자는 수소 원자 두 개와 산소 원자 한 개로 이루어져 있어요."
  ],
  [
    "EN",
    "atom",
    "An atom is made up of a nucleus and electrons.",
    "원자는 원자핵과 전자로 이루어져 있어요."
  ],
  [
    "EN",
    "compound",
    "Water is a compound of hydrogen and oxygen.",
    "물은 수소와 산소로 이루어진 화합물이에요."
  ],
  [
    "EN",
    "particle",
    "A tiny particle of dust landed on the lens.",
    "작은 먼지 입자 하나가 렌즈 위에 내려앉았어요."
  ],
  [
    "EN",
    "substance",
    "The label warns that the substance is harmful if swallowed.",
    "표시에는 그 물질을 삼키면 해롭다고 경고되어 있어요."
  ],
  [
    "EN",
    "reaction",
    "The experiment produced a chemical reaction that released heat.",
    "그 실험에서는 열을 방출하는 화학 반응이 일어났어요."
  ],
  [
    "EN",
    "catalyst",
    "A catalyst can speed up a chemical reaction.",
    "촉매는 화학 반응의 속도를 높일 수 있어요."
  ],
  [
    "EN",
    "enzyme",
    "An enzyme helps the body break down food.",
    "효소는 몸이 음식을 분해하도록 도와줘요."
  ],
  [
    "EN",
    "protein",
    "Beans are a good source of plant protein.",
    "콩은 식물성 단백질을 얻기 좋은 식품이에요."
  ],
  [
    "EN",
    "chromosome",
    "Each chromosome carries genetic information.",
    "각 염색체에는 유전 정보가 담겨 있어요."
  ],
  [
    "EN",
    "gene",
    "The researchers identified a gene linked to the disease.",
    "연구자들은 그 질병과 연관된 유전자 하나를 확인했어요."
  ],
  [
    "EN",
    "genetics",
    "She studies genetics to understand inherited traits.",
    "그녀는 유전 형질을 이해하기 위해 유전학을 연구해요."
  ],
  [
    "EN",
    "heredity",
    "Heredity influences some physical characteristics.",
    "유전은 일부 신체적 특징에 영향을 줘요."
  ],
  [
    "EN",
    "mutation",
    "A mutation can change the instructions carried by a gene.",
    "돌연변이는 유전자에 담긴 정보를 바꿀 수 있어요."
  ],
  [
    "EN",
    "evolution",
    "Evolution explains how populations change over generations.",
    "진화는 생물 집단이 여러 세대를 거쳐 어떻게 변하는지 설명해요."
  ],
  [
    "EN",
    "fossil",
    "The museum displays a fossil of an ancient fish.",
    "박물관에는 고대 물고기의 화석이 전시되어 있어요."
  ],
  [
    "EN",
    "metabolism",
    "Exercise can affect how the body's metabolism works.",
    "운동은 몸의 신진대사 방식에 영향을 줄 수 있어요."
  ],
  [
    "EN",
    "respiration",
    "The researchers measured the fish's rate of respiration.",
    "연구자들은 물고기의 호흡 속도를 측정했어요."
  ],
  [
    "EN",
    "photosynthesis",
    "Plants use sunlight to make food through photosynthesis.",
    "식물은 광합성을 통해 햇빛을 이용하여 양분을 만들어요."
  ],
  [
    "EN",
    "nutrient",
    "Calcium is an important nutrient for bone health.",
    "칼슘은 뼈 건강에 중요한 영양소예요."
  ],
  [
    "EN",
    "species",
    "Several species of birds nest in this forest.",
    "이 숲에는 여러 종의 새가 둥지를 틀어요."
  ],
  [
    "EN",
    "predator",
    "The fox is a predator that hunts small animals.",
    "여우는 작은 동물을 사냥하는 포식자예요."
  ],
  [
    "EN",
    "prey",
    "The owl watched its prey from a high branch.",
    "올빼미는 높은 나뭇가지에서 먹잇감을 지켜봤어요."
  ],
  [
    "EN",
    "parasite",
    "The veterinarian found a parasite in the dog's fur.",
    "수의사는 개의 털에서 기생충을 발견했어요."
  ],
  [
    "EN",
    "microbe",
    "Not every microbe causes disease.",
    "모든 미생물이 질병을 일으키는 것은 아니에요."
  ],
  [
    "EN",
    "bacterium",
    "A single bacterium can reproduce under suitable conditions.",
    "세균 한 개체도 조건이 맞으면 증식할 수 있어요."
  ],
  [
    "EN",
    "virus",
    "The virus spreads mainly through close contact.",
    "그 바이러스는 주로 밀접한 접촉을 통해 퍼져요."
  ],
  [
    "EN",
    "immunity",
    "Vaccination can help the body build immunity.",
    "예방접종은 몸이 면역력을 형성하는 데 도움이 될 수 있어요."
  ],
  [
    "EN",
    "antibody",
    "The test looks for a specific antibody in the blood.",
    "그 검사는 혈액에서 특정 항체를 찾아요."
  ],
  [
    "EN",
    "infection",
    "The doctor checked the wound for signs of infection.",
    "의사는 상처에 감염 징후가 있는지 살펴봤어요."
  ],
  [
    "EN",
    "diagnosis",
    "An accurate diagnosis helps doctors choose the right treatment.",
    "정확한 진단은 의사가 적절한 치료를 선택하는 데 도움이 돼요."
  ],
  [
    "EN",
    "symptom",
    "A persistent cough can be a symptom of several illnesses.",
    "지속적인 기침은 여러 질병의 증상일 수 있어요."
  ],
  [
    "KO",
    "운동량",
    "요즘 앉아 있는 시간이 길어져 운동량이 줄었어요.",
    "Dạo này tôi ngồi nhiều nên lượng vận động giảm."
  ],
  [
    "KO",
    "스트레칭",
    "운동하기 전에 가볍게 스트레칭을 했어요.",
    "Tôi giãn cơ nhẹ trước khi tập thể dục."
  ],
  [
    "KO",
    "체력",
    "계단을 자주 오르면서 체력이 조금 좋아졌어요.",
    "Nhờ thường xuyên leo cầu thang, thể lực của tôi cải thiện đôi chút."
  ],
  [
    "KO",
    "피로",
    "며칠 동안 잠을 못 자서 피로가 쌓였어요.",
    "Tôi thiếu ngủ mấy ngày nên cảm thấy mệt mỏi tích tụ."
  ],
  [
    "KO",
    "스트레스",
    "일이 많을 때는 스트레스를 풀 시간을 내려고 해요.",
    "Khi công việc nhiều, tôi cố gắng dành thời gian giải tỏa căng thẳng."
  ],
  [
    "KO",
    "불면증",
    "잠을 잘 못 자는 날이 계속돼서 불면증 상담을 받았어요.",
    "Vì nhiều ngày liên tiếp khó ngủ, tôi đã đi tư vấn về chứng mất ngủ."
  ],
  [
    "KO",
    "두통",
    "오후부터 두통이 있어서 잠깐 쉬었어요.",
    "Từ chiều tôi bị đau đầu nên nghỉ một lát."
  ],
  [
    "KO",
    "소화",
    "천천히 씹어 먹으면 소화에 도움이 될 수 있어요.",
    "Nhai chậm có thể giúp tiêu hóa tốt hơn."
  ],
  [
    "KO",
    "소화불량",
    "식사 후에 소화불량이 계속돼서 병원에 갔어요.",
    "Vì liên tục khó tiêu sau bữa ăn, tôi đã đến bệnh viện."
  ],
  [
    "KO",
    "재채기",
    "먼지가 많은 곳에 들어가자 재채기가 났어요.",
    "Vừa vào nơi nhiều bụi, tôi đã hắt hơi."
  ],
  [
    "KO",
    "콧물",
    "감기에 걸렸는지 콧물이 계속 나와요.",
    "Không biết có bị cảm không mà nước mũi cứ chảy mãi."
  ],
  [
    "KO",
    "근육통",
    "오랜만에 등산했더니 다리에 근육통이 생겼어요.",
    "Lâu rồi mới leo núi nên tôi bị đau cơ ở chân."
  ],
  [
    "KO",
    "기쁨",
    "합격 소식을 듣고 큰 기쁨을 느꼈어요.",
    "Tôi cảm thấy vô cùng vui sướng khi nghe tin đỗ."
  ],
  [
    "KO",
    "슬픔",
    "친구는 슬픔을 혼자 감당하려고 했어요.",
    "Bạn tôi cố gắng một mình chịu đựng nỗi buồn."
  ],
  [
    "KO",
    "분노",
    "그는 분노를 가라앉힌 뒤 차분하게 이야기했어요.",
    "Anh ấy bình tĩnh nói chuyện sau khi cơn giận lắng xuống."
  ],
  [
    "KO",
    "불안",
    "시험 결과를 기다리는 동안 불안이 커졌어요.",
    "Trong lúc chờ kết quả thi, tôi ngày càng lo âu."
  ],
  [
    "KO",
    "긴장",
    "면접장에 들어가기 전에 긴장을 풀려고 숨을 깊게 쉬었어요.",
    "Trước khi vào phòng phỏng vấn, tôi hít thở sâu để giảm căng thẳng."
  ],
  [
    "KO",
    "안도",
    "가족이 무사하다는 소식을 듣고 안도했어요.",
    "Tôi thở phào nhẹ nhõm khi nghe tin gia đình bình an."
  ],
  [
    "KO",
    "실망",
    "기대했던 공연이 취소돼서 실망했어요.",
    "Tôi thất vọng vì buổi biểu diễn mong đợi đã bị hủy."
  ],
  [
    "KO",
    "만족",
    "새로 산 의자의 품질에 만족하고 있어요.",
    "Tôi hài lòng với chất lượng của chiếc ghế mới mua."
  ],
  [
    "EX",
    "여행용 어댑터를 빌릴 수 있나요?",
    "충전기 플러그가 맞지 않아 호텔에 \"여행용 어댑터를 빌릴 수 있나요?\"라고 물었어요.",
    "Vì phích cắm sạc không phù hợp, tôi hỏi khách sạn: \"Tôi có thể mượn bộ chuyển đổi ổ cắm du lịch không?\""
  ],
  [
    "EX",
    "이 근처에 환전소가 있나요?",
    "현금이 부족해서 직원에게 \"이 근처에 환전소가 있나요?\"라고 물었어요.",
    "Vì không đủ tiền mặt, tôi hỏi nhân viên: \"Gần đây có quầy đổi tiền không?\""
  ],
  [
    "EX",
    "관광지 입장료가 포함돼 있나요?",
    "투어 상품을 예약하기 전에 \"관광지 입장료가 포함돼 있나요?\"라고 확인했어요.",
    "Trước khi đặt tour, tôi hỏi: \"Giá đã bao gồm phí vào cửa các điểm tham quan chưa?\""
  ],
  [
    "EX",
    "객실에 금고가 있나요?",
    "여권을 안전하게 보관하려고 \"객실에 금고가 있나요?\"라고 물었어요.",
    "Để cất hộ chiếu an toàn, tôi hỏi: \"Trong phòng có két sắt không?\""
  ],
  [
    "EX",
    "체크아웃 후에도 짐을 보관해 주시나요?",
    "비행기가 저녁에 출발해서 \"체크아웃 후에도 짐을 보관해 주시나요?\"라고 물었어요.",
    "Vì chuyến bay khởi hành buổi tối, tôi hỏi: \"Sau khi trả phòng, khách sạn vẫn giữ hành lý giúp tôi chứ?\""
  ],
  [
    "EX",
    "아이 하원 시간이 바뀌었어요.",
    "어린이집 선생님께 연락해 \"아이 하원 시간이 바뀌었어요.\"라고 알렸어요.",
    "Tôi liên hệ với cô giáo nhà trẻ và báo: \"Giờ đón bé đã thay đổi.\""
  ],
  [
    "EX",
    "오늘은 할머니가 아이를 데리러 갈 거예요.",
    "제가 늦게 퇴근하게 되어 \"오늘은 할머니가 아이를 데리러 갈 거예요.\"라고 선생님께 말씀드렸어요.",
    "Vì hôm nay tôi tan làm muộn, tôi báo cô giáo: \"Hôm nay bà sẽ đến đón bé.\""
  ],
  [
    "EX",
    "알림장을 확인하고 서명했어요.",
    "아이 선생님께 \"알림장을 확인하고 서명했어요.\"라고 전했어요.",
    "Tôi báo với cô giáo của bé: \"Tôi đã xem và ký vào sổ thông báo.\""
  ],
  [
    "EX",
    "준비물을 내일까지 보내 주세요.",
    "체험 수업을 앞두고 선생님이 \"준비물을 내일까지 보내 주세요.\"라고 안내했어요.",
    "Trước buổi học trải nghiệm, cô giáo dặn: \"Vui lòng gửi đồ dùng cần chuẩn bị trước ngày mai.\""
  ],
  [
    "EX",
    "아이가 우유 알레르기가 있어요.",
    "급식 메뉴를 확인하면서 선생님께 \"아이가 우유 알레르기가 있어요.\"라고 알렸어요.",
    "Khi xem thực đơn bữa ăn, tôi báo cô giáo: \"Con tôi bị dị ứng sữa.\""
  ],
  [
    "EN",
    "scale",
    "Each scale on the fish reflected the sunlight.",
    "물고기의 비늘 하나하나가 햇빛을 반사했어요."
  ],
  [
    "EN",
    "toothpaste",
    "I forgot to pack my toothpaste for the trip.",
    "여행 갈 때 치약을 챙기는 걸 잊었어요."
  ],
  [
    "EN",
    "comb",
    "Do you have a comb I can borrow?",
    "제가 잠깐 빌릴 수 있는 빗이 있나요?"
  ],
  [
    "EN",
    "hairbrush",
    "She cleaned the hairbrush after brushing her hair.",
    "그녀는 머리를 빗은 뒤 머리빗을 깨끗이 닦았어요."
  ],
  [
    "EN",
    "soap",
    "Wash your hands with soap before dinner.",
    "저녁 먹기 전에 비누로 손을 씻으세요."
  ],
  [
    "EN",
    "sponge",
    "Use a soft sponge to clean the glass.",
    "부드러운 스펀지로 유리잔을 닦으세요."
  ],
  [
    "EN",
    "towel",
    "Could you bring me a clean towel?",
    "깨끗한 수건 하나 가져다줄 수 있나요?"
  ],
  [
    "EN",
    "bathtub",
    "The baby splashed water in the bathtub.",
    "아기가 욕조에서 물장구를 쳤어요."
  ],
  [
    "EN",
    "shower",
    "The shower isn't working, so I called the hotel desk.",
    "샤워기가 작동하지 않아서 호텔 프런트에 연락했어요."
  ],
  [
    "EN",
    "faucet",
    "Please turn off the faucet when you're done.",
    "다 썼으면 수도꼭지를 잠가 주세요."
  ],
  [
    "EN",
    "sink",
    "There are a few dirty dishes in the sink.",
    "싱크대에 더러운 그릇이 몇 개 있어요."
  ],
  [
    "EN",
    "toilet",
    "The toilet won't flush, so I called a plumber.",
    "변기의 물이 내려가지 않아서 배관 수리공을 불렀어요."
  ],
  [
    "EN",
    "laundry",
    "I'll fold the laundry after it dries.",
    "빨래가 마르면 개어 놓을게요."
  ],
  [
    "EN",
    "cook",
    "My father likes to cook breakfast on weekends.",
    "아버지는 주말에 아침을 요리하는 걸 좋아하세요."
  ],
  [
    "EN",
    "wash",
    "Please wash these apples before eating them.",
    "이 사과들은 먹기 전에 씻어 주세요."
  ],
  [
    "EN",
    "brush",
    "I brush my teeth after every meal.",
    "저는 식사 후마다 이를 닦아요."
  ],
  [
    "EN",
    "smile",
    "The little girl gave me a big smile.",
    "어린 여자아이가 저에게 환하게 웃어 보였어요."
  ],
  [
    "EN",
    "laugh",
    "Everyone began to laugh at his funny story.",
    "그의 재미있는 이야기에 모두 웃기 시작했어요."
  ],
  [
    "EN",
    "cry",
    "The baby started to cry when he woke up.",
    "아기는 잠에서 깨자 울기 시작했어요."
  ],
  [
    "EN",
    "dance",
    "Would you like to dance with me?",
    "저와 함께 춤추실래요?"
  ],
  [
    "EN",
    "sing",
    "We sing this song at the end of every class.",
    "우리는 수업이 끝날 때마다 이 노래를 불러요."
  ],
  [
    "EN",
    "jump",
    "Be careful when you jump off that step.",
    "그 계단에서 뛰어내릴 때 조심해요."
  ],
  [
    "EN",
    "swim",
    "My brother learned to swim last summer.",
    "제 남동생은 지난여름에 수영을 배웠어요."
  ],
  [
    "EN",
    "fly",
    "Some birds fly south when winter comes.",
    "어떤 새들은 겨울이 오면 남쪽으로 날아가요."
  ],
  [
    "EN",
    "catch",
    "Can you catch the ball with one hand?",
    "한 손으로 공을 잡을 수 있나요?"
  ],
  [
    "EN",
    "throw",
    "Don't throw stones into the pond.",
    "연못에 돌을 던지지 마세요."
  ],
  [
    "EN",
    "kick",
    "He kicked the ball toward the goal.",
    "그는 골대를 향해 공을 찼어요."
  ],
  [
    "EN",
    "pull",
    "Pull the door gently to open it.",
    "문을 열려면 부드럽게 당기세요."
  ],
  [
    "EN",
    "push",
    "Please push the cart to the checkout counter.",
    "카트를 계산대까지 밀어 주세요."
  ],
  [
    "EN",
    "cut",
    "Cut the paper along the dotted line.",
    "점선을 따라 종이를 자르세요."
  ],
  [
    "EN",
    "paint",
    "We're going to paint the wall light blue.",
    "우리는 벽을 연한 파란색으로 칠할 거예요."
  ],
  [
    "EN",
    "fix",
    "Can you fix my bicycle before Friday?",
    "금요일 전에 제 자전거를 고쳐 줄 수 있나요?"
  ],
  [
    "EN",
    "bake",
    "We're going to bake cookies for the school fair.",
    "학교 행사에 가져갈 쿠키를 구울 거예요."
  ],
  [
    "EN",
    "boil",
    "Boil the water before adding the noodles.",
    "면을 넣기 전에 물을 끓이세요."
  ],
  [
    "EN",
    "pick",
    "You can pick any seat near the window.",
    "창가 쪽 자리는 아무 데나 골라도 돼요."
  ],
  [
    "EN",
    "feed",
    "Please feed the cat while I'm away.",
    "제가 없는 동안 고양이에게 밥을 주세요."
  ],
  [
    "EN",
    "use",
    "May I use your phone for a minute?",
    "잠깐 전화기를 사용해도 될까요?"
  ],
  [
    "EN",
    "ride",
    "I ride my bike to the library on Saturdays.",
    "저는 토요일마다 자전거를 타고 도서관에 가요."
  ],
  [
    "EN",
    "turn",
    "Turn left at the next traffic light.",
    "다음 신호등에서 왼쪽으로 도세요."
  ],
  [
    "EN",
    "stop",
    "The bus will stop in front of the museum.",
    "버스는 박물관 앞에서 정차할 거예요."
  ],
  [
    "KO",
    "연못",
    "공원 연못에 오리 두 마리가 헤엄치고 있어요.",
    "Có hai con vịt đang bơi trong ao ở công viên."
  ],
  [
    "KO",
    "자신감",
    "발표 연습을 여러 번 하니 자신감이 생겼어요.",
    "Sau khi luyện thuyết trình nhiều lần, tôi đã tự tin hơn."
  ],
  [
    "KO",
    "용기",
    "친구의 응원 덕분에 지원할 용기가 났어요.",
    "Nhờ bạn bè động viên, tôi đã có can đảm để nộp đơn."
  ],
  [
    "KO",
    "인내심",
    "아이에게 글자를 가르치려면 인내심이 필요해요.",
    "Cần có sự kiên nhẫn khi dạy trẻ học chữ."
  ],
  [
    "KO",
    "성격",
    "제 동생은 성격이 밝고 사람들과 잘 어울려요.",
    "Em tôi có tính cách vui vẻ và hòa đồng với mọi người."
  ],
  [
    "KO",
    "태도",
    "그는 실수를 인정하고 책임지는 태도를 보였어요.",
    "Anh ấy thể hiện thái độ nhận lỗi và chịu trách nhiệm."
  ],
  [
    "KO",
    "친절",
    "길을 알려 준 분의 친절이 정말 고마웠어요.",
    "Tôi rất biết ơn lòng tốt của người đã chỉ đường cho tôi."
  ],
  [
    "KO",
    "예의",
    "다른 사람이 말할 때 끼어들지 않는 것도 예의예요.",
    "Không ngắt lời khi người khác đang nói cũng là phép lịch sự."
  ],
  [
    "KO",
    "배려",
    "임산부에게 자리를 양보하는 작은 배려가 필요해요.",
    "Nhường chỗ cho phụ nữ mang thai là một hành động quan tâm nhỏ nhưng cần thiết."
  ],
  [
    "KO",
    "존중",
    "서로 생각이 달라도 존중하는 마음을 잃지 마세요.",
    "Dù suy nghĩ khác nhau, đừng đánh mất sự tôn trọng dành cho nhau."
  ],
  [
    "KO",
    "신뢰",
    "약속을 지키는 일이 신뢰를 쌓는 첫걸음이에요.",
    "Giữ lời hứa là bước đầu tiên để xây dựng lòng tin."
  ],
  [
    "KO",
    "책임",
    "팀장은 문제가 생기면 책임을 피하지 않았어요.",
    "Khi có vấn đề xảy ra, trưởng nhóm không trốn tránh trách nhiệm."
  ],
  [
    "KO",
    "습관",
    "자기 전에 책을 읽는 습관을 들이고 있어요.",
    "Tôi đang tập thói quen đọc sách trước khi đi ngủ."
  ],
  [
    "KO",
    "관심",
    "요즘 한국 음식에 관심이 많아졌어요.",
    "Dạo gần đây tôi ngày càng quan tâm đến ẩm thực Hàn Quốc."
  ],
  [
    "KO",
    "취향",
    "음악 취향이 비슷해서 금방 친해졌어요.",
    "Chúng tôi nhanh chóng thân nhau vì có gu âm nhạc giống nhau."
  ],
  [
    "KO",
    "추억",
    "이 사진을 보면 가족 여행의 추억이 떠올라요.",
    "Nhìn bức ảnh này, tôi nhớ lại kỷ niệm chuyến du lịch cùng gia đình."
  ],
  [
    "KO",
    "목표",
    "올해 목표는 한국어로 편하게 대화하는 거예요.",
    "Mục tiêu năm nay của tôi là trò chuyện thoải mái bằng tiếng Hàn."
  ],
  [
    "KO",
    "노력",
    "매일 조금씩 연습한 노력이 좋은 결과로 이어졌어요.",
    "Nỗ lực luyện tập một chút mỗi ngày đã mang lại kết quả tốt."
  ],
  [
    "KO",
    "성공",
    "첫 도전에서 성공해서 정말 기뻤어요.",
    "Tôi rất vui vì đã thành công ngay trong lần thử đầu tiên."
  ],
  [
    "KO",
    "실패",
    "이번 실패를 통해 무엇을 고쳐야 할지 알게 됐어요.",
    "Qua thất bại lần này, tôi đã biết mình cần sửa điều gì."
  ],
  [
    "EX",
    "낮잠 이불은 매주 금요일에 가져가요.",
    "어린이집 생활을 설명하면서 \"낮잠 이불은 매주 금요일에 가져가요.\"라고 말했어요.",
    "Khi nói về sinh hoạt ở nhà trẻ, tôi nói: \"Tôi mang chăn ngủ trưa về vào thứ Sáu hằng tuần.\""
  ],
  [
    "EX",
    "열이 있어서 오늘은 어린이집에 못 가요.",
    "아침에 아이의 열을 재고 선생님께 \"열이 있어서 오늘은 어린이집에 못 가요.\"라고 연락했어요.",
    "Sau khi đo nhiệt độ cho bé vào buổi sáng, tôi báo với cô giáo: \"Bé bị sốt nên hôm nay không thể đến nhà trẻ.\""
  ],
  [
    "EX",
    "아이에게 약을 먹인 시간을 적어 두었어요.",
    "병원에서 의사에게 \"아이에게 약을 먹인 시간을 적어 두었어요.\"라고 말씀드렸어요.",
    "Ở bệnh viện, tôi nói với bác sĩ: \"Tôi đã ghi lại thời gian cho bé uống thuốc.\""
  ],
  [
    "EX",
    "부모 상담 시간을 예약하고 싶어요.",
    "담임 선생님께 메시지를 보내 \"부모 상담 시간을 예약하고 싶어요.\"라고 말씀드렸어요.",
    "Tôi nhắn tin cho giáo viên chủ nhiệm: \"Tôi muốn đặt lịch trao đổi với phụ huynh.\""
  ],
  [
    "EX",
    "수업이 끝난 뒤 돌봄 교실에 있나요?",
    "하교 시간을 확인하려고 선생님께 \"수업이 끝난 뒤 돌봄 교실에 있나요?\"라고 물었어요.",
    "Để xác nhận giờ tan học, tôi hỏi cô giáo: \"Sau khi học xong, bé có ở lớp trông trẻ không?\""
  ],
  [
    "EX",
    "아이 신발이 바뀐 것 같아요.",
    "집에 와서 신발을 확인한 뒤 선생님께 \"아이 신발이 바뀐 것 같아요.\"라고 연락했어요.",
    "Sau khi về nhà kiểm tra giày, tôi liên lạc với cô giáo: \"Hình như giày của bé đã bị đổi nhầm.\""
  ],
  [
    "EX",
    "새 학기 준비물 목록을 받을 수 있나요?",
    "새 학기를 앞두고 선생님께 \"새 학기 준비물 목록을 받을 수 있나요?\"라고 물었어요.",
    "Trước học kỳ mới, tôi hỏi cô giáo: \"Tôi có thể nhận danh sách đồ dùng cần chuẩn bị cho học kỳ mới không?\""
  ],
  [
    "EX",
    "이 음식은 너무 매워서 아이가 못 먹어요.",
    "식당에서 직원에게 \"이 음식은 너무 매워서 아이가 못 먹어요.\"라고 설명했어요.",
    "Ở nhà hàng, tôi giải thích với nhân viên: \"Món này cay quá nên bé không ăn được.\""
  ],
  [
    "EX",
    "아이가 혼자 옷을 입도록 기다려 주세요.",
    "어린이집 선생님께 \"아이가 혼자 옷을 입도록 기다려 주세요.\"라고 부탁했어요.",
    "Tôi nhờ cô giáo ở nhà trẻ: \"Xin hãy chờ để bé tự mặc quần áo.\""
  ],
  [
    "EX",
    "오늘은 조금 일찍 데리러 갈게요.",
    "일찍 퇴근하는 날이라 선생님께 \"오늘은 조금 일찍 데리러 갈게요.\"라고 연락했어요.",
    "Vì hôm nay tan làm sớm, tôi nhắn cô giáo: \"Hôm nay tôi sẽ đến đón bé sớm hơn một chút.\""
  ],
  [
    "EN",
    "update",
    "The app needs an update before it will open.",
    "앱을 실행하려면 먼저 업데이트해야 해요."
  ],
  [
    "EN",
    "user",
    "Each user can change the language in the settings.",
    "사용자는 설정에서 언어를 변경할 수 있어요."
  ],
  [
    "EN",
    "artist",
    "The artist showed us how she mixes her colors.",
    "그 예술가는 자신이 색을 섞는 방법을 보여 줬어요."
  ],
  [
    "EN",
    "artwork",
    "Students displayed their artwork in the school hallway.",
    "학생들이 학교 복도에 미술 작품을 전시했어요."
  ],
  [
    "EN",
    "band",
    "My friend's band is playing at the festival tonight.",
    "제 친구의 밴드가 오늘 밤 축제에서 공연해요."
  ],
  [
    "EN",
    "canvas",
    "She painted a landscape on a large canvas.",
    "그녀는 큰 캔버스에 풍경화를 그렸어요."
  ],
  [
    "EN",
    "cartoon",
    "My little brother watches a cartoon after breakfast.",
    "제 남동생은 아침을 먹고 만화를 봐요."
  ],
  [
    "EN",
    "choir",
    "The school choir practiced for the winter concert.",
    "학교 합창단은 겨울 음악회를 위해 연습했어요."
  ],
  [
    "EN",
    "costume",
    "I made the costume for our school play.",
    "저는 학교 연극에 쓸 의상을 만들었어요."
  ],
  [
    "EN",
    "exhibition",
    "The photography exhibition opens next weekend.",
    "사진 전시회는 다음 주말에 열려요."
  ],
  [
    "EN",
    "gallery",
    "You can see local paintings at this gallery.",
    "이 미술관에서는 지역 화가들의 그림을 볼 수 있어요."
  ],
  [
    "EN",
    "instrument",
    "Which musical instrument would you like to learn?",
    "어떤 악기를 배우고 싶나요?"
  ],
  [
    "EN",
    "melody",
    "I recognized the melody but couldn't remember the song's name.",
    "멜로디는 알아들었지만 노래 제목이 기억나지 않았어요."
  ],
  [
    "EN",
    "performance",
    "The dancers received a standing ovation after their performance.",
    "무용수들은 공연이 끝난 뒤 기립 박수를 받았어요."
  ],
  [
    "EN",
    "photography",
    "She became interested in photography during her travels.",
    "그녀는 여행하면서 사진 찍는 일에 관심을 갖게 됐어요."
  ],
  [
    "EN",
    "poem",
    "Our teacher asked us to write a short poem about spring.",
    "선생님은 봄을 주제로 짧은 시를 쓰라고 하셨어요."
  ],
  [
    "EN",
    "poet",
    "The poet read her latest work at the library.",
    "그 시인은 도서관에서 자신의 최신 작품을 낭독했어요."
  ],
  [
    "EN",
    "portrait",
    "The portrait of her grandmother hangs in the living room.",
    "할머니의 초상화가 거실에 걸려 있어요."
  ],
  [
    "EN",
    "rhythm",
    "Try clapping your hands to the rhythm of the music.",
    "음악의 리듬에 맞춰 손뼉을 쳐 보세요."
  ],
  [
    "EN",
    "scene",
    "The final scene of the movie made me cry.",
    "영화의 마지막 장면을 보고 눈물이 났어요."
  ],
  [
    "EN",
    "stage",
    "The actors walked onto the stage when the lights came on.",
    "조명이 켜지자 배우들이 무대 위로 걸어 나왔어요."
  ],
  [
    "EN",
    "title",
    "I forgot the title of the book you recommended.",
    "당신이 추천한 책의 제목을 잊어버렸어요."
  ],
  [
    "EN",
    "viewer",
    "Each viewer can vote for a favorite photo online.",
    "관람객은 누구나 온라인에서 마음에 드는 사진에 투표할 수 있어요."
  ],
  [
    "EN",
    "animation",
    "The animation was created by a small team of students.",
    "그 애니메이션은 소규모 학생 팀이 제작했어요."
  ],
  [
    "EN",
    "applause",
    "The audience burst into applause after the song.",
    "노래가 끝나자 관객들이 큰 박수를 보냈어요."
  ],
  [
    "EN",
    "audition",
    "She has an audition for the school musical tomorrow.",
    "그녀는 내일 학교 뮤지컬 오디션을 봐요."
  ],
  [
    "EN",
    "composer",
    "The composer wrote this piece when he was only sixteen.",
    "그 작곡가는 겨우 열여섯 살 때 이 곡을 썼어요."
  ],
  [
    "EN",
    "craft",
    "My grandfather taught me a traditional craft.",
    "할아버지는 제게 전통 공예를 가르쳐 주셨어요."
  ],
  [
    "EN",
    "film",
    "We watched a short film made by local teenagers.",
    "우리는 지역 청소년들이 만든 단편 영화를 봤어요."
  ],
  [
    "EN",
    "lyrics",
    "I looked up the lyrics so I could sing along.",
    "따라 부르려고 노래 가사를 찾아봤어요."
  ],
  [
    "EN",
    "musician",
    "The musician tuned her guitar before the show.",
    "그 음악가는 공연 전에 기타를 조율했어요."
  ],
  [
    "EN",
    "screenplay",
    "The director made several changes to the screenplay.",
    "감독은 각본을 여러 군데 수정했어요."
  ],
  [
    "EN",
    "studio",
    "The artist works in a small studio behind her house.",
    "그 예술가는 집 뒤의 작은 작업실에서 일해요."
  ],
  [
    "EN",
    "talent",
    "She has a natural talent for playing the piano.",
    "그녀는 피아노 연주에 타고난 재능이 있어요."
  ],
  [
    "EN",
    "ticket office",
    "You can collect your tickets at the ticket office.",
    "매표소에서 표를 수령할 수 있어요."
  ],
  [
    "EN",
    "wellness",
    "The company offers a wellness program for employees.",
    "회사는 직원들을 위한 건강 관리 프로그램을 운영해요."
  ],
  [
    "EN",
    "dentist",
    "I have an appointment with the dentist tomorrow morning.",
    "내일 아침에 치과 진료 예약이 있어요."
  ],
  [
    "EN",
    "diet",
    "I'm trying to include more vegetables in my diet.",
    "식단에 채소를 더 많이 넣으려고 해요."
  ],
  [
    "EN",
    "fever",
    "She stayed home because she had a high fever.",
    "그녀는 열이 높아서 집에서 쉬었어요."
  ],
  [
    "EN",
    "fitness",
    "Walking every day has improved my fitness.",
    "매일 걸었더니 체력이 좋아졌어요."
  ],
  [
    "KO",
    "선택",
    "두 가지 메뉴 중에서 하나를 선택해야 해요.",
    "Tôi phải lựa chọn một trong hai món ăn."
  ],
  [
    "KO",
    "기대",
    "새로운 직장에서 일할 생각에 기대가 커요.",
    "Tôi rất háo hức khi nghĩ đến việc làm ở nơi mới."
  ],
  [
    "KO",
    "후회",
    "충분히 준비하지 않은 것을 뒤늦게 후회했어요.",
    "Sau đó tôi hối tiếc vì đã không chuẩn bị đầy đủ."
  ],
  [
    "KO",
    "강의",
    "오늘 강의는 온라인으로 진행돼요.",
    "Buổi học hôm nay được tổ chức trực tuyến."
  ],
  [
    "KO",
    "강사",
    "강사가 어려운 내용을 쉽게 설명해 줬어요.",
    "Giảng viên đã giải thích nội dung khó một cách dễ hiểu."
  ],
  [
    "KO",
    "수강생",
    "수강생들은 수업이 끝난 뒤 질문을 했어요.",
    "Các học viên đặt câu hỏi sau khi buổi học kết thúc."
  ],
  [
    "KO",
    "학기",
    "다음 학기에는 한국어 수업을 하나 더 들을 거예요.",
    "Học kỳ tới tôi sẽ học thêm một lớp tiếng Hàn."
  ],
  [
    "KO",
    "학점",
    "졸업하려면 학점이 얼마나 더 필요한가요?",
    "Tôi còn cần bao nhiêu tín chỉ nữa để tốt nghiệp?"
  ],
  [
    "KO",
    "시험지",
    "시험지를 받으면 먼저 이름을 쓰세요.",
    "Khi nhận đề thi, hãy viết tên trước."
  ],
  [
    "KO",
    "성적",
    "지난 학기보다 성적이 많이 올랐어요.",
    "Điểm số của tôi đã tăng nhiều so với học kỳ trước."
  ],
  [
    "KO",
    "점수",
    "문제를 다시 확인했더니 점수가 올라갔어요.",
    "Sau khi kiểm tra lại bài, điểm số của tôi đã tăng lên."
  ],
  [
    "KO",
    "합격",
    "합격 소식을 듣고 부모님께 바로 전화했어요.",
    "Nghe tin trúng tuyển, tôi lập tức gọi điện cho bố mẹ."
  ],
  [
    "KO",
    "불합격",
    "불합격 통보를 받았지만 다음 시험에 다시 도전할 거예요.",
    "Dù nhận thông báo không trúng tuyển, tôi sẽ thử lại trong kỳ thi tiếp theo."
  ],
  [
    "KO",
    "장학금",
    "이번 학기에 장학금을 받아 등록금 부담이 줄었어요.",
    "Học kỳ này tôi nhận được học bổng nên gánh nặng học phí giảm bớt."
  ],
  [
    "KO",
    "등록금",
    "등록금 납부 마감일이 언제인지 확인하세요.",
    "Hãy kiểm tra hạn cuối đóng học phí là khi nào."
  ],
  [
    "KO",
    "졸업",
    "동생의 졸업을 축하하려고 꽃다발을 샀어요.",
    "Tôi mua một bó hoa để chúc mừng em tốt nghiệp."
  ],
  [
    "KO",
    "입학",
    "대학교 입학 전에 기숙사를 신청했어요.",
    "Tôi đăng ký ký túc xá trước khi nhập học đại học."
  ],
  [
    "KO",
    "전공",
    "저는 대학에서 컴퓨터공학을 전공했어요.",
    "Tôi học chuyên ngành kỹ thuật máy tính ở đại học."
  ],
  [
    "KO",
    "교재",
    "수업에 필요한 교재를 서점에서 샀어요.",
    "Tôi mua giáo trình cần dùng cho lớp học ở hiệu sách."
  ],
  [
    "KO",
    "참고서",
    "시험을 준비하려고 참고서를 한 권 더 샀어요.",
    "Tôi mua thêm một cuốn sách tham khảo để ôn thi."
  ],
  [
    "EX",
    "아이가 친구와 다퉜다고 들었어요.",
    "담임 선생님과 통화하며 \"아이가 친구와 다퉜다고 들었어요.\"라고 말씀드렸어요.",
    "Khi nói chuyện điện thoại với giáo viên chủ nhiệm, tôi nói: \"Tôi nghe nói con tôi đã cãi nhau với bạn.\""
  ],
  [
    "EX",
    "숙제를 다 했는지 같이 확인해 주세요.",
    "아이를 돌봐 주는 가족에게 \"숙제를 다 했는지 같이 확인해 주세요.\"라고 부탁했어요.",
    "Tôi nhờ người nhà đang trông bé: \"Hãy cùng kiểm tra xem bé đã làm xong bài tập chưa.\""
  ],
  [
    "EX",
    "방과 후에 피아노 학원에 가요.",
    "아이의 하교 일정을 설명하며 \"방과 후에 피아노 학원에 가요.\"라고 말했어요.",
    "Khi giải thích lịch sau giờ học của bé, tôi nói: \"Sau giờ học, bé đến lớp học piano.\""
  ],
  [
    "EX",
    "아이가 열이 나면 바로 전화해 주세요.",
    "어린이집에 아이를 맡기며 \"아이가 열이 나면 바로 전화해 주세요.\"라고 부탁했어요.",
    "Khi gửi bé ở nhà trẻ, tôi nhờ cô giáo: \"Nếu bé bị sốt, hãy gọi cho tôi ngay.\""
  ],
  [
    "EX",
    "사진 촬영 동의서를 제출할게요.",
    "학교 행사 안내를 읽고 선생님께 \"사진 촬영 동의서를 제출할게요.\"라고 말씀드렸어요.",
    "Sau khi đọc thông báo về sự kiện của trường, tôi nói với cô giáo: \"Tôi sẽ nộp giấy đồng ý cho chụp ảnh.\""
  ],
  [
    "EX",
    "이번 주 소풍 장소가 어디예요?",
    "준비물을 챙기려고 선생님께 \"이번 주 소풍 장소가 어디예요?\"라고 물었어요.",
    "Để chuẩn bị đồ dùng, tôi hỏi cô giáo: \"Địa điểm dã ngoại tuần này ở đâu?\""
  ],
  [
    "EX",
    "도시락을 냉장고에 넣어 주세요.",
    "음식이 상하지 않도록 선생님께 \"도시락을 냉장고에 넣어 주세요.\"라고 부탁했어요.",
    "Để thức ăn không bị hỏng, tôi nhờ cô giáo: \"Xin hãy để hộp cơm vào tủ lạnh.\""
  ],
  [
    "EX",
    "아이에게 여벌 옷을 한 벌 더 챙겨 주세요.",
    "물놀이 활동을 앞두고 가족에게 \"아이에게 여벌 옷을 한 벌 더 챙겨 주세요.\"라고 부탁했어요.",
    "Trước buổi chơi với nước, tôi nhờ người nhà: \"Hãy chuẩn bị thêm một bộ quần áo dự phòng cho bé.\""
  ],
  [
    "EX",
    "아이가 잠들 때까지 책을 읽어 줬어요.",
    "어젯밤 있었던 일을 이야기하며 \"아이가 잠들 때까지 책을 읽어 줬어요.\"라고 말했어요.",
    "Khi kể chuyện tối qua, tôi nói: \"Tôi đã đọc sách cho bé nghe đến khi bé ngủ.\""
  ],
  [
    "EX",
    "아이 돌봄 서비스를 알아보고 있어요.",
    "맞벌이 일정 때문에 친구에게 \"아이 돌봄 서비스를 알아보고 있어요.\"라고 말했어요.",
    "Do lịch làm việc của hai vợ chồng, tôi nói với bạn: \"Tôi đang tìm hiểu dịch vụ trông trẻ.\""
  ],
  [
    "EN",
    "therapy",
    "After the injury, she attended physical therapy twice a week.",
    "그녀는 부상 후 일주일에 두 번 물리 치료를 받았어요."
  ],
  [
    "EN",
    "vaccine",
    "The clinic explained when the vaccine would be available.",
    "진료소에서는 백신을 언제 접종할 수 있는지 설명했어요."
  ],
  [
    "EN",
    "genome",
    "Researchers compared the genome of two closely related species.",
    "연구진은 가까운 두 종의 유전체를 비교했어요."
  ],
  [
    "EN",
    "observatory",
    "We visited the observatory to see Saturn through a telescope.",
    "우리는 망원경으로 토성을 보려고 천문대를 방문했어요."
  ],
  [
    "EN",
    "microscope",
    "The student examined a leaf under the microscope.",
    "학생은 현미경으로 나뭇잎을 관찰했어요."
  ],
  [
    "EN",
    "asteroid",
    "An asteroid passed safely by Earth last night.",
    "어젯밤 소행성 하나가 지구 옆을 안전하게 지나갔어요."
  ],
  [
    "EN",
    "observation",
    "Her observation of the birds lasted for three hours.",
    "그녀의 새 관찰은 세 시간 동안 이어졌어요."
  ],
  [
    "EN",
    "measurement",
    "The first measurement was incorrect, so we tried again.",
    "첫 번째 측정값이 잘못되어 다시 측정했어요."
  ],
  [
    "EN",
    "variable",
    "Temperature was the only variable we changed in the experiment.",
    "실험에서 우리가 바꾼 변수는 온도뿐이었어요."
  ],
  [
    "EN",
    "parameter",
    "We adjusted one parameter to improve the model's accuracy.",
    "모형의 정확도를 높이려고 매개변수 하나를 조정했어요."
  ],
  [
    "EN",
    "replication",
    "Replication of the experiment produced similar results.",
    "실험을 반복했을 때도 비슷한 결과가 나왔어요."
  ],
  [
    "EN",
    "inference",
    "Her inference was based on the evidence collected at the site.",
    "그녀의 추론은 현장에서 수집한 증거를 바탕으로 했어요."
  ],
  [
    "EN",
    "interpretation",
    "Different readers may offer a different interpretation of the poem.",
    "독자마다 그 시를 다르게 해석할 수 있어요."
  ],
  [
    "EN",
    "methodology",
    "The report explains the research methodology in detail.",
    "그 보고서는 연구 방법론을 자세히 설명해요."
  ],
  [
    "EN",
    "procedure",
    "Follow the safety procedure before starting the machine.",
    "기계를 작동하기 전에 안전 절차를 따르세요."
  ],
  [
    "EN",
    "protocol",
    "The laboratory updated its protocol for handling samples.",
    "연구실은 시료 취급 규약을 개정했어요."
  ],
  [
    "EN",
    "statistic",
    "One statistic in the report surprised the committee.",
    "보고서의 한 통계 수치가 위원들을 놀라게 했어요."
  ],
  [
    "EN",
    "probability",
    "The probability of rain increases in the afternoon.",
    "오후에는 비가 올 확률이 높아져요."
  ],
  [
    "EN",
    "algorithm",
    "The new algorithm sorts the photos by date.",
    "새 알고리즘은 사진을 날짜별로 정렬해요."
  ],
  [
    "EN",
    "database",
    "The hospital stores patient appointments in a secure database.",
    "병원은 환자 예약 정보를 보안이 강화된 데이터베이스에 저장해요."
  ],
  [
    "EN",
    "simulation",
    "A computer simulation showed how the storm might move.",
    "컴퓨터 모의실험으로 폭풍이 어떻게 이동할지 살펴봤어요."
  ],
  [
    "EN",
    "innovation",
    "The company encourages innovation by supporting new ideas.",
    "그 회사는 새로운 아이디어를 지원해 혁신을 장려해요."
  ],
  [
    "EN",
    "infrastructure",
    "The city invested in infrastructure such as bridges and water pipes.",
    "시는 교량과 수도관 같은 기반 시설에 투자했어요."
  ],
  [
    "EN",
    "emission",
    "The new engine produces fewer carbon emissions than the old one.",
    "새 엔진은 기존 엔진보다 탄소 배출량이 적어요."
  ],
  [
    "EN",
    "pollutant",
    "The filter removes a harmful pollutant from the water.",
    "그 필터는 물속의 유해 오염 물질 하나를 제거해요."
  ],
  [
    "EN",
    "contamination",
    "The factory closed the well after signs of water contamination appeared.",
    "물 오염 징후가 나타나자 공장은 우물을 폐쇄했어요."
  ],
  [
    "EN",
    "conservation",
    "Wildlife conservation requires cooperation across borders.",
    "야생동물 보존에는 국경을 넘는 협력이 필요해요."
  ],
  [
    "EN",
    "degradation",
    "Soil degradation has reduced the farm's crop yields.",
    "토양 악화로 농장의 작물 수확량이 줄었어요."
  ],
  [
    "EN",
    "deforestation",
    "Deforestation threatens the habitats of many animals.",
    "삼림 벌채는 많은 동물의 서식지를 위협해요."
  ],
  [
    "EN",
    "erosion",
    "Heavy rain caused erosion along the riverbank.",
    "폭우로 강둑을 따라 토양 침식이 발생했어요."
  ],
  [
    "EN",
    "precipitation",
    "The weather report predicts little precipitation this weekend.",
    "일기예보에 따르면 이번 주말에는 강수량이 적을 거예요."
  ],
  [
    "EN",
    "carbon",
    "Carbon is present in all living things.",
    "탄소는 모든 생명체에 존재해요."
  ],
  [
    "EN",
    "sustainability",
    "The school discussed sustainability and ways to reduce waste.",
    "학교에서는 지속 가능성과 쓰레기를 줄이는 방법을 논의했어요."
  ],
  [
    "EN",
    "geology",
    "She studied geology to learn how mountains form.",
    "그녀는 산이 형성되는 과정을 배우려고 지질학을 공부했어요."
  ],
  [
    "EN",
    "tectonics",
    "Plate tectonics helps explain why earthquakes occur.",
    "판구조론은 지진이 발생하는 이유를 설명하는 데 도움이 돼요."
  ],
  [
    "EN",
    "mineral",
    "The museum displayed a rare mineral found deep underground.",
    "박물관에는 지하 깊은 곳에서 발견된 희귀 광물이 전시돼 있었어요."
  ],
  [
    "EN",
    "sediment",
    "The river carried sediment into the lake after the flood.",
    "홍수 뒤 강물이 퇴적물을 호수로 실어 날랐어요."
  ],
  [
    "EN",
    "volcano",
    "Scientists are monitoring the volcano for signs of activity.",
    "과학자들은 화산 활동의 징후가 있는지 관찰하고 있어요."
  ],
  [
    "EN",
    "earthquake",
    "The earthquake damaged several old buildings in the town.",
    "지진으로 그 마을의 오래된 건물 여러 채가 파손됐어요."
  ],
  [
    "EN",
    "astronomy",
    "His interest in astronomy began when he saw a meteor shower.",
    "그는 유성우를 본 뒤 천문학에 관심을 갖게 됐어요."
  ],
  [
    "KO",
    "연습문제",
    "수업 후에 연습문제 열 개를 더 풀었어요.",
    "Sau giờ học, tôi giải thêm mười bài tập luyện."
  ],
  [
    "KO",
    "과제",
    "이번 주 과제는 금요일까지 제출해야 해요.",
    "Bài tập tuần này phải nộp trước thứ Sáu."
  ],
  [
    "KO",
    "연구",
    "연구 결과를 학회에서 발표했어요.",
    "Tôi đã trình bày kết quả nghiên cứu tại hội nghị học thuật."
  ],
  [
    "KO",
    "실험",
    "실험을 시작하기 전에 보호안경을 썼어요.",
    "Tôi đeo kính bảo hộ trước khi bắt đầu thí nghiệm."
  ],
  [
    "KO",
    "관찰",
    "식물의 변화를 매일 관찰해서 기록했어요.",
    "Tôi quan sát và ghi chép sự thay đổi của cây mỗi ngày."
  ],
  [
    "KO",
    "토론",
    "오늘 토론에서는 서로 다른 의견이 많이 나왔어요.",
    "Trong buổi thảo luận hôm nay có nhiều ý kiến khác nhau."
  ],
  [
    "KO",
    "작품",
    "이 작품은 작가의 어린 시절을 떠올리게 해요.",
    "Tác phẩm này gợi nhớ đến thời thơ ấu của tác giả."
  ],
  [
    "KO",
    "전시회",
    "주말에 친구와 사진 전시회를 보러 갔어요.",
    "Cuối tuần, tôi đi xem triển lãm ảnh cùng bạn."
  ],
  [
    "KO",
    "공연",
    "공연이 시작되기 십 분 전에 입장했어요.",
    "Tôi vào chỗ ngồi mười phút trước khi buổi biểu diễn bắt đầu."
  ],
  [
    "KO",
    "무대",
    "배우가 무대 위에서 마지막 인사를 했어요.",
    "Diễn viên cúi chào lần cuối trên sân khấu."
  ],
  [
    "KO",
    "관객",
    "공연이 끝나자 관객들이 일어나 박수를 쳤어요.",
    "Khi buổi biểu diễn kết thúc, khán giả đứng dậy vỗ tay."
  ],
  [
    "KO",
    "연주",
    "그의 피아노 연주를 직접 들을 수 있어서 좋았어요.",
    "Tôi rất vui vì được nghe anh ấy biểu diễn piano trực tiếp."
  ],
  [
    "KO",
    "악기",
    "이 악기는 처음이라 사용법을 배우고 있어요.",
    "Đây là lần đầu tôi dùng nhạc cụ này nên tôi đang học cách sử dụng."
  ],
  [
    "KO",
    "노트북",
    "노트북 배터리가 부족해서 충전기를 연결했어요.",
    "Pin máy tính xách tay sắp hết nên tôi cắm sạc."
  ],
  [
    "KO",
    "데스크톱",
    "집에서는 데스크톱으로 영상을 편집해요.",
    "Ở nhà tôi chỉnh sửa video bằng máy tính để bàn."
  ],
  [
    "KO",
    "모니터",
    "모니터 높이를 눈높이에 맞춰 조절했어요.",
    "Tôi điều chỉnh độ cao màn hình ngang tầm mắt."
  ],
  [
    "KO",
    "마우스",
    "마우스가 움직이지 않아 건전지를 교체했어요.",
    "Chuột máy tính không hoạt động nên tôi thay pin."
  ],
  [
    "KO",
    "프린터",
    "프린터에 종이가 없어서 새 종이를 넣었어요.",
    "Máy in hết giấy nên tôi cho thêm giấy mới."
  ],
  [
    "KO",
    "복사기",
    "복사기가 고장 나서 다른 층에서 복사했어요.",
    "Máy photocopy bị hỏng nên tôi sang tầng khác để sao chép tài liệu."
  ],
  [
    "KO",
    "스캐너",
    "스캐너로 신분증을 스캔해서 파일로 저장했어요.",
    "Tôi dùng máy quét quét giấy tờ tùy thân rồi lưu thành tệp."
  ],
  [
    "EX",
    "예방접종 확인서를 가져왔어요.",
    "어린이집 등록 서류를 제출하면서 \"예방접종 확인서를 가져왔어요.\"라고 말했어요.",
    "Khi nộp hồ sơ đăng ký nhà trẻ, tôi nói: \"Tôi đã mang giấy xác nhận tiêm chủng.\""
  ],
  [
    "EX",
    "새 담임 선생님과 인사했어요.",
    "첫 등교 날을 이야기하며 \"새 담임 선생님과 인사했어요.\"라고 말했어요.",
    "Khi kể về ngày đầu tiên đi học, tôi nói: \"Tôi đã chào hỏi giáo viên chủ nhiệm mới.\""
  ],
  [
    "EX",
    "아이가 스스로 정리하도록 격려했어요.",
    "아이의 생활 습관을 설명하며 \"아이가 스스로 정리하도록 격려했어요.\"라고 말했어요.",
    "Khi nói về thói quen của bé, tôi kể: \"Tôi đã khuyến khích bé tự dọn dẹp.\""
  ],
  [
    "EX",
    "가족 행사 때문에 하루 결석할게요.",
    "선생님께 미리 연락해서 \"가족 행사 때문에 하루 결석할게요.\"라고 알렸어요.",
    "Tôi báo trước với cô giáo: \"Bé sẽ nghỉ học một ngày vì gia đình có việc.\""
  ],
  [
    "EX",
    "아이의 알레르기 정보를 다시 전달할게요.",
    "담당 교사가 바뀌었다는 말을 듣고 \"아이의 알레르기 정보를 다시 전달할게요.\"라고 말했어요.",
    "Nghe nói giáo viên phụ trách đã thay đổi, tôi nói: \"Tôi sẽ gửi lại thông tin dị ứng của bé.\""
  ],
  [
    "EX",
    "초보자 강습이 따로 있나요?",
    "수영장에 처음 등록하면서 \"초보자 강습이 따로 있나요?\"라고 물었어요.",
    "Khi đăng ký ở hồ bơi lần đầu, tôi hỏi: \"Có lớp hướng dẫn riêng cho người mới bắt đầu không?\""
  ],
  [
    "EX",
    "운동화를 꼭 신어야 해요?",
    "실내 체육 수업을 신청하며 \"운동화를 꼭 신어야 해요?\"라고 문의했어요.",
    "Khi đăng ký lớp thể dục trong nhà, tôi hỏi: \"Có bắt buộc phải mang giày thể thao không?\""
  ],
  [
    "EX",
    "수업 시작 전에 준비 운동을 할게요.",
    "강사에게 \"수업 시작 전에 준비 운동을 할게요.\"라고 말하고 몸을 풀었어요.",
    "Tôi nói với huấn luyện viên: \"Tôi sẽ khởi động trước khi lớp bắt đầu\", rồi làm nóng cơ thể."
  ],
  [
    "EX",
    "라켓을 하루 동안 빌릴 수 있나요?",
    "장비를 가져오지 못해 안내 데스크에 \"라켓을 하루 동안 빌릴 수 있나요?\"라고 물었어요.",
    "Vì không mang theo dụng cụ, tôi hỏi quầy lễ tân: \"Tôi có thể mượn vợt trong một ngày không?\""
  ],
  [
    "EX",
    "오늘은 무릎이 아파서 쉬고 싶어요.",
    "운동을 시작하기 전에 강사에게 \"오늘은 무릎이 아파서 쉬고 싶어요.\"라고 말했어요.",
    "Trước khi tập, tôi nói với huấn luyện viên: \"Hôm nay tôi đau đầu gối nên muốn nghỉ.\""
  ],
  [
    "EN",
    "wave",
    "Wave to me when you see me at the station.",
    "역에서 저를 보면 손을 흔들어 주세요."
  ],
  [
    "EN",
    "point",
    "Can you point to your house on this map?",
    "이 지도에서 네 집을 가리킬 수 있니?"
  ],
  [
    "EN",
    "touch",
    "Do not touch the paintings in the museum.",
    "박물관의 그림을 만지지 마세요."
  ],
  [
    "EN",
    "count",
    "Let's count the chairs before the guests arrive.",
    "손님들이 오기 전에 의자 개수를 세어 봅시다."
  ],
  [
    "EN",
    "check",
    "Please check your bag before leaving the bus.",
    "버스에서 내리기 전에 가방을 확인하세요."
  ],
  [
    "EN",
    "cross",
    "Wait for the green light before you cross the street.",
    "길을 건너기 전에 초록불을 기다리세요."
  ],
  [
    "EN",
    "rest",
    "We stopped under a tree to rest for a while.",
    "우리는 잠시 쉬려고 나무 아래에 멈췄어요."
  ],
  [
    "EN",
    "hurry",
    "We need to hurry or we'll miss the train.",
    "서두르지 않으면 기차를 놓칠 거예요."
  ],
  [
    "EN",
    "smell",
    "Can you smell the bread baking in the oven?",
    "오븐에서 굽는 빵 냄새가 나나요?"
  ],
  [
    "EN",
    "taste",
    "Would you like to taste the soup before I serve it?",
    "수프를 내놓기 전에 맛을 봐 줄래요?"
  ],
  [
    "EN",
    "save",
    "I save a little money each month for my trip.",
    "저는 여행을 위해 매달 돈을 조금씩 모아요."
  ],
  [
    "EN",
    "drop",
    "Be careful not to drop the glass.",
    "유리잔을 떨어뜨리지 않도록 조심하세요."
  ],
  [
    "EN",
    "shout",
    "You don't need to shout; I can hear you.",
    "소리 지를 필요 없어요. 잘 들려요."
  ],
  [
    "EN",
    "lend",
    "Could you lend me your umbrella until tomorrow?",
    "내일까지 우산을 빌려줄 수 있나요?"
  ],
  [
    "EN",
    "unpack",
    "I'll unpack my suitcase after dinner.",
    "저녁을 먹은 뒤 여행 가방을 풀 거예요."
  ],
  [
    "EN",
    "unfold",
    "Unfold the map so we can find the trail.",
    "산책로를 찾을 수 있게 지도를 펼쳐 주세요."
  ],
  [
    "EN",
    "measure",
    "We need to measure the window before ordering curtains.",
    "커튼을 주문하기 전에 창문 크기를 재야 해요."
  ],
  [
    "EN",
    "weigh",
    "Please weigh the package before you send it.",
    "소포를 보내기 전에 무게를 재 주세요."
  ],
  [
    "EN",
    "sort",
    "Let's sort these books by subject.",
    "이 책들을 주제별로 분류해 봅시다."
  ],
  [
    "EN",
    "gather",
    "The children gathered leaves for their art project.",
    "아이들이 미술 과제를 위해 나뭇잎을 모았어요."
  ],
  [
    "EN",
    "arrange",
    "Could you arrange the chairs in a circle?",
    "의자들을 원형으로 배치해 줄 수 있나요?"
  ],
  [
    "EN",
    "organize",
    "I use a calendar to organize my schedule.",
    "저는 일정을 정리하려고 달력을 사용해요."
  ],
  [
    "EN",
    "review",
    "I review new vocabulary before going to bed.",
    "저는 자기 전에 새로 배운 단어를 복습해요."
  ],
  [
    "EN",
    "memorize",
    "It's easier to memorize words when I use them in sentences.",
    "단어를 문장 속에서 사용하면 더 쉽게 외울 수 있어요."
  ],
  [
    "EN",
    "spell",
    "Could you spell your last name for me?",
    "성의 철자를 알려주시겠어요?"
  ],
  [
    "EN",
    "pronounce",
    "How do you pronounce this word in American English?",
    "이 단어는 미국 영어로 어떻게 발음하나요?"
  ],
  [
    "EN",
    "discuss",
    "We will discuss the plan after lunch.",
    "점심을 먹은 뒤 그 계획을 논의할 거예요."
  ],
  [
    "EN",
    "subtract",
    "If you subtract three from ten, you get seven.",
    "10에서 3을 빼면 7이 돼요."
  ],
  [
    "EN",
    "multiply",
    "To find the total, multiply six by four.",
    "합계를 구하려면 6에 4를 곱하세요."
  ],
  [
    "EN",
    "observe",
    "We went outside to observe the stars.",
    "우리는 별을 관찰하러 밖으로 나갔어요."
  ],
  [
    "EN",
    "experiment",
    "Students experiment with different colors in art class.",
    "학생들은 미술 시간에 여러 색을 직접 섞어 보며 실험해요."
  ],
  [
    "EN",
    "investigate",
    "The class will investigate why the plants are dying.",
    "학생들은 식물이 죽어 가는 이유를 조사할 거예요."
  ],
  [
    "EN",
    "record",
    "Please record the temperature every morning.",
    "매일 아침 기온을 기록해 주세요."
  ],
  [
    "EN",
    "present",
    "Each student will present a short report on Friday.",
    "학생마다 금요일에 짧은 보고서를 발표할 거예요."
  ],
  [
    "EN",
    "greet",
    "The teacher stood at the door to greet the students.",
    "선생님은 학생들을 맞이하려고 문 앞에 서 계셨어요."
  ],
  [
    "EN",
    "congratulate",
    "I called to congratulate her on her graduation.",
    "저는 그녀의 졸업을 축하하려고 전화했어요."
  ],
  [
    "EN",
    "forgive",
    "I hope you can forgive me for being late.",
    "늦은 저를 용서해 주셨으면 좋겠어요."
  ],
  [
    "EN",
    "warn",
    "The sign warns drivers about the sharp curve ahead.",
    "그 표지판은 운전자들에게 앞쪽 급커브를 경고해요."
  ],
  [
    "EN",
    "rescue",
    "Firefighters worked through the night to rescue the hikers.",
    "소방관들은 등산객들을 구조하려고 밤새 일했어요."
  ],
  [
    "EN",
    "trade",
    "Would you like to trade your red pencil for my blue one?",
    "네 빨간 연필을 내 파란 연필과 바꿀래?"
  ],
  [
    "KO",
    "파일",
    "이 파일을 열려면 비밀번호를 입력해야 해요.",
    "Bạn phải nhập mật khẩu để mở tệp này."
  ],
  [
    "KO",
    "폴더",
    "여행 사진을 날짜별 폴더에 정리했어요.",
    "Tôi sắp xếp ảnh du lịch vào các thư mục theo ngày."
  ],
  [
    "KO",
    "첨부파일",
    "이메일에 첨부파일이 빠졌으니 다시 보내 주세요.",
    "Email bị thiếu tệp đính kèm nên vui lòng gửi lại."
  ],
  [
    "KO",
    "계정",
    "새 휴대폰에서 같은 계정으로 로그인했어요.",
    "Tôi đăng nhập bằng cùng một tài khoản trên điện thoại mới."
  ],
  [
    "KO",
    "사용자명",
    "로그인할 때 사용자명과 비밀번호를 입력하세요.",
    "Khi đăng nhập, hãy nhập tên người dùng và mật khẩu."
  ],
  [
    "KO",
    "인증",
    "휴대폰 본인 인증을 마쳐야 신청할 수 있어요.",
    "Bạn phải hoàn tất xác thực danh tính qua điện thoại mới có thể đăng ký."
  ],
  [
    "KO",
    "알림",
    "중요한 메시지를 놓치지 않으려고 알림을 켰어요.",
    "Tôi bật thông báo để không bỏ lỡ tin nhắn quan trọng."
  ],
  [
    "KO",
    "앱",
    "이 앱에서는 한국어 단어를 소리로 들을 수 있어요.",
    "Trong ứng dụng này, bạn có thể nghe phát âm của từ tiếng Hàn."
  ],
  [
    "KO",
    "소프트웨어",
    "컴퓨터를 안전하게 쓰려면 소프트웨어를 최신 상태로 유지하세요.",
    "Để sử dụng máy tính an toàn, hãy luôn cập nhật phần mềm."
  ],
  [
    "KO",
    "업데이트",
    "업데이트가 끝나면 앱을 다시 실행하세요.",
    "Sau khi cập nhật xong, hãy mở lại ứng dụng."
  ],
  [
    "KO",
    "다운로드",
    "다운로드한 사진은 휴대폰의 사진 폴더에 있어요.",
    "Ảnh đã tải xuống nằm trong thư mục ảnh trên điện thoại."
  ],
  [
    "KO",
    "업로드",
    "동영상 업로드가 끝날 때까지 창을 닫지 마세요.",
    "Đừng đóng cửa sổ cho đến khi tải video lên xong."
  ],
  [
    "KO",
    "연결",
    "이어폰 연결이 자꾸 끊어져서 다시 설정했어요.",
    "Kết nối tai nghe liên tục bị ngắt nên tôi đã thiết lập lại."
  ],
  [
    "KO",
    "와이파이",
    "카페 와이파이 비밀번호가 어디에 적혀 있나요?",
    "Mật khẩu Wi-Fi của quán cà phê được ghi ở đâu?"
  ],
  [
    "KO",
    "데이터",
    "해외에서는 모바일 데이터 사용량을 확인하세요.",
    "Khi ở nước ngoài, hãy kiểm tra lượng dữ liệu di động đã sử dụng."
  ],
  [
    "KO",
    "저장공간",
    "사진이 너무 많아서 휴대폰 저장공간이 부족해요.",
    "Có quá nhiều ảnh nên điện thoại của tôi thiếu dung lượng lưu trữ."
  ],
  [
    "KO",
    "검색어",
    "검색어를 조금 바꾸니 원하는 결과가 나왔어요.",
    "Khi thay đổi từ khóa tìm kiếm một chút, tôi đã tìm được kết quả mong muốn."
  ],
  [
    "KO",
    "웹사이트",
    "이 웹사이트에서 강의 시간표를 확인할 수 있어요.",
    "Bạn có thể xem thời khóa biểu các buổi học trên trang web này."
  ],
  [
    "KO",
    "댓글",
    "친구가 올린 사진에 응원 댓글을 남겼어요.",
    "Tôi để lại bình luận động viên dưới bức ảnh bạn tôi đăng."
  ],
  [
    "KO",
    "게시물",
    "잘못된 정보를 담은 게시물은 공유하지 마세요.",
    "Đừng chia sẻ bài đăng chứa thông tin sai lệch."
  ],
  [
    "EX",
    "다음 경기 일정을 단체방에 올려 주세요.",
    "팀원에게 \"다음 경기 일정을 단체방에 올려 주세요.\"라고 부탁했어요.",
    "Tôi nhờ một thành viên trong đội: \"Hãy đăng lịch thi đấu tiếp theo lên nhóm chat.\""
  ],
  [
    "EX",
    "회원권을 한 달 더 연장할게요.",
    "헬스장 카운터에서 \"회원권을 한 달 더 연장할게요.\"라고 말했어요.",
    "Ở quầy lễ tân phòng tập, tôi nói: \"Tôi sẽ gia hạn thẻ hội viên thêm một tháng.\""
  ],
  [
    "EX",
    "악기 조율을 부탁드려도 될까요?",
    "연주 전 악기 상태를 확인하고 \"악기 조율을 부탁드려도 될까요?\"라고 물었어요.",
    "Sau khi kiểm tra nhạc cụ trước buổi biểu diễn, tôi hỏi: \"Tôi có thể nhờ anh/chị lên dây nhạc cụ được không?\""
  ],
  [
    "EX",
    "연습실을 한 시간 예약했어요.",
    "친구에게 모임 장소를 알려 주며 \"연습실을 한 시간 예약했어요.\"라고 말했어요.",
    "Khi báo địa điểm gặp mặt cho bạn, tôi nói: \"Tôi đã đặt phòng tập trong một giờ.\""
  ],
  [
    "EX",
    "이 곡의 박자를 천천히 알려 주세요.",
    "음악 선생님께 \"이 곡의 박자를 천천히 알려 주세요.\"라고 부탁했어요.",
    "Tôi nhờ giáo viên âm nhạc: \"Xin hãy hướng dẫn nhịp của bản nhạc này thật chậm.\""
  ],
  [
    "EX",
    "사진 동아리에서 야외 촬영을 가요.",
    "주말 계획을 이야기하며 \"사진 동아리에서 야외 촬영을 가요.\"라고 말했어요.",
    "Khi kể về kế hoạch cuối tuần, tôi nói: \"Câu lạc bộ nhiếp ảnh sẽ đi chụp ảnh ngoài trời.\""
  ],
  [
    "EX",
    "뜨개질 도안을 한 장 더 받을 수 있나요?",
    "뜨개질 수업에서 강사에게 \"뜨개질 도안을 한 장 더 받을 수 있나요?\"라고 물었어요.",
    "Trong lớp đan len, tôi hỏi giảng viên: \"Tôi có thể nhận thêm một bản mẫu đan nữa không?\""
  ],
  [
    "EX",
    "식물에 물을 며칠마다 줘야 하나요?",
    "화분을 새로 사면서 점원에게 \"식물에 물을 며칠마다 줘야 하나요?\"라고 물었어요.",
    "Khi mua chậu cây mới, tôi hỏi người bán: \"Bao nhiêu ngày nên tưới cây một lần?\""
  ],
  [
    "EX",
    "책 모임에서 다음 달 책을 정했어요.",
    "친구에게 독서 모임 소식을 전하며 \"책 모임에서 다음 달 책을 정했어요.\"라고 말했어요.",
    "Khi kể với bạn về câu lạc bộ sách, tôi nói: \"Nhóm đã chọn cuốn sách để đọc vào tháng sau.\""
  ],
  [
    "EX",
    "보드게임 규칙을 먼저 설명해 주세요.",
    "처음 하는 게임이라 친구에게 \"보드게임 규칙을 먼저 설명해 주세요.\"라고 부탁했어요.",
    "Vì chơi trò này lần đầu, tôi nhờ bạn: \"Hãy giải thích luật chơi trò chơi bàn cờ trước nhé.\""
  ],
  [
    "EN",
    "headache",
    "I got a headache after staring at the screen all afternoon.",
    "오후 내내 화면을 봤더니 머리가 아파졌어요."
  ],
  [
    "EN",
    "pain",
    "Tell the doctor where you feel the most pain.",
    "어디가 가장 아픈지 의사에게 말씀하세요."
  ],
  [
    "EN",
    "pressure",
    "The nurse checked my blood pressure before the examination.",
    "간호사가 진찰 전에 제 혈압을 쟀어요."
  ],
  [
    "EN",
    "stress",
    "Taking short breaks helps me manage stress at work.",
    "짧게 쉬는 것은 직장에서 스트레스를 관리하는 데 도움이 돼요."
  ],
  [
    "EN",
    "appointment card",
    "The receptionist wrote the date on my appointment card.",
    "접수 직원이 예약 카드에 날짜를 적어 줬어요."
  ],
  [
    "EN",
    "bandage",
    "The nurse put a clean bandage over the cut.",
    "간호사가 베인 상처 위에 깨끗한 붕대를 감아 줬어요."
  ],
  [
    "EN",
    "checkup",
    "I booked a checkup for next Thursday.",
    "다음 주 목요일로 건강검진을 예약했어요."
  ],
  [
    "EN",
    "clinic",
    "There's a small clinic across from the station.",
    "역 맞은편에 작은 진료소가 있어요."
  ],
  [
    "EN",
    "emergency",
    "Call for help immediately in an emergency.",
    "응급 상황에서는 즉시 도움을 요청하세요."
  ],
  [
    "EN",
    "injury",
    "She took a break from running after her ankle injury.",
    "그녀는 발목 부상 후 달리기를 잠시 쉬었어요."
  ],
  [
    "EN",
    "nap",
    "I took a short nap after lunch.",
    "점심을 먹고 잠깐 낮잠을 잤어요."
  ],
  [
    "EN",
    "nutrition",
    "Good nutrition is important while children are growing.",
    "아이들이 성장할 때는 충분하고 균형 잡힌 영양이 중요해요."
  ],
  [
    "EN",
    "recovery",
    "The doctor said her recovery was going well.",
    "의사는 그녀가 잘 회복하고 있다고 말했어요."
  ],
  [
    "EN",
    "routine",
    "My morning routine includes stretching and breakfast.",
    "제 아침 일과에는 스트레칭과 아침 식사가 포함돼요."
  ],
  [
    "EN",
    "throat",
    "My throat feels dry after speaking for hours.",
    "몇 시간 동안 말을 했더니 목이 건조해요."
  ],
  [
    "EN",
    "well-being",
    "Spending time with friends supports my well-being.",
    "친구들과 시간을 보내는 것은 제 삶의 안녕에 도움이 돼요."
  ],
  [
    "EN",
    "appointment time",
    "I need to change my appointment time to three o'clock.",
    "예약 시간을 세 시로 변경해야 해요."
  ],
  [
    "EN",
    "allergy",
    "Please tell us if your child has a food allergy.",
    "자녀에게 음식 알레르기가 있다면 알려 주세요."
  ],
  [
    "EN",
    "breath",
    "Take a deep breath before you start speaking.",
    "말하기 전에 숨을 깊이 들이마시세요."
  ],
  [
    "EN",
    "care",
    "My grandmother needs extra care after her surgery.",
    "할머니는 수술 후 더 세심한 돌봄이 필요하세요."
  ],
  [
    "EN",
    "confidence",
    "Practicing every day helped her build confidence.",
    "매일 연습한 덕분에 그녀는 자신감을 키웠어요."
  ],
  [
    "EN",
    "contentment",
    "He felt a sense of contentment after finishing the project.",
    "그는 프로젝트를 마치고 만족감을 느꼈어요."
  ],
  [
    "EN",
    "courage",
    "It took courage to admit that I was wrong.",
    "제가 틀렸다고 인정하는 데는 용기가 필요했어요."
  ],
  [
    "EN",
    "curiosity",
    "The child's curiosity led her to ask many questions.",
    "그 아이는 호기심 때문에 질문을 많이 했어요."
  ],
  [
    "EN",
    "disappointment",
    "I could hear the disappointment in his voice.",
    "그의 목소리에서 실망한 마음이 느껴졌어요."
  ],
  [
    "EN",
    "doubt",
    "There is some doubt about the accuracy of the results.",
    "그 결과의 정확성에 대해 어느 정도 의문이 있어요."
  ],
  [
    "EN",
    "dream",
    "Her dream is to become a wildlife photographer.",
    "그녀의 꿈은 야생동물 사진가가 되는 거예요."
  ],
  [
    "EN",
    "fear",
    "He learned to manage his fear of speaking in public.",
    "그는 사람들 앞에서 말하는 두려움을 다루는 법을 배웠어요."
  ],
  [
    "EN",
    "feeling",
    "I had a strange feeling that I had forgotten something.",
    "무언가를 잊어버린 것 같은 이상한 기분이 들었어요."
  ],
  [
    "EN",
    "imagination",
    "Reading stories can help children develop their imagination.",
    "이야기책을 읽으면 아이들의 상상력을 키우는 데 도움이 돼요."
  ],
  [
    "EN",
    "interest",
    "She developed an interest in history after visiting the museum.",
    "그녀는 박물관에 다녀온 뒤 역사에 관심이 생겼어요."
  ],
  [
    "EN",
    "mood",
    "Listening to music often improves my mood.",
    "음악을 들으면 기분이 좋아지는 경우가 많아요."
  ],
  [
    "EN",
    "patience",
    "Learning a new language takes time and patience.",
    "새로운 언어를 배우려면 시간과 인내심이 필요해요."
  ],
  [
    "EN",
    "peace",
    "After the argument, they talked calmly and made peace.",
    "말다툼한 뒤 그들은 차분히 대화하고 화해했어요."
  ],
  [
    "EN",
    "pleasure",
    "It was a pleasure to meet your family.",
    "가족분들을 만나서 정말 기뻤어요."
  ],
  [
    "EN",
    "pride",
    "She took pride in completing the work on her own.",
    "그녀는 스스로 일을 끝낸 것을 자랑스러워했어요."
  ],
  [
    "EN",
    "regret",
    "My only regret is that I didn't visit my grandparents more often.",
    "제가 유일하게 후회하는 일은 조부모님을 더 자주 찾아뵙지 않은 거예요."
  ],
  [
    "EN",
    "respect",
    "The students showed respect by listening to each other.",
    "학생들은 서로의 말을 경청하며 존중을 보여 줬어요."
  ],
  [
    "EN",
    "success",
    "The event was a success thanks to the volunteers.",
    "자원봉사자들 덕분에 행사가 성공적으로 끝났어요."
  ],
  [
    "EN",
    "surprise",
    "We planned a surprise for our teacher's birthday.",
    "선생님의 생일에 깜짝 이벤트를 준비했어요."
  ],
  [
    "KO",
    "구독",
    "새 강의가 올라오면 보려고 채널을 구독했어요.",
    "Tôi đăng ký theo dõi kênh để xem khi có bài giảng mới."
  ],
  [
    "KO",
    "방송",
    "오늘 저녁 방송에서 경기 결과를 알려 준대요.",
    "Nghe nói chương trình phát sóng tối nay sẽ thông báo kết quả trận đấu."
  ],
  [
    "KO",
    "영상",
    "설명 영상을 보고 따라 하니 쉽게 배웠어요.",
    "Tôi xem video hướng dẫn rồi làm theo nên học được khá dễ dàng."
  ],
  [
    "KO",
    "주민",
    "아파트 주민들이 모여 쓰레기 분리수거 문제를 논의했어요.",
    "Cư dân chung cư họp để bàn về việc phân loại rác."
  ],
  [
    "KO",
    "이웃",
    "이사 온 이웃에게 먼저 인사를 건넸어요.",
    "Tôi chủ động chào người hàng xóm mới chuyển đến."
  ],
  [
    "KO",
    "시민",
    "많은 시민이 공원 정화 활동에 참여했어요.",
    "Nhiều người dân đã tham gia hoạt động dọn dẹp công viên."
  ],
  [
    "KO",
    "지역",
    "이 지역은 대중교통이 편리해서 살기 좋아요.",
    "Khu vực này thuận tiện giao thông công cộng nên rất dễ sống."
  ],
  [
    "KO",
    "동네",
    "주말에 동네 작은 서점에 들렀어요.",
    "Cuối tuần tôi ghé một hiệu sách nhỏ trong khu phố."
  ],
  [
    "KO",
    "행정",
    "온라인으로 처리할 수 있는 행정 업무가 많아졌어요.",
    "Ngày càng có nhiều thủ tục hành chính có thể thực hiện trực tuyến."
  ],
  [
    "KO",
    "민원",
    "도로에 가로등이 고장 나서 구청에 민원을 넣었어요.",
    "Vì đèn đường bị hỏng nên tôi gửi kiến nghị đến văn phòng quận."
  ],
  [
    "KO",
    "구청",
    "전입 신고 절차를 문의하려고 구청에 전화했어요.",
    "Tôi gọi đến văn phòng quận để hỏi về thủ tục khai báo chuyển nơi cư trú."
  ],
  [
    "KO",
    "시청",
    "시청 홈페이지에서 행사 일정을 확인했어요.",
    "Tôi kiểm tra lịch sự kiện trên trang web của tòa thị chính."
  ],
  [
    "KO",
    "주민센터",
    "주민센터에 가서 필요한 서류를 발급받았어요.",
    "Tôi đến trung tâm hành chính phường để xin cấp giấy tờ cần thiết."
  ],
  [
    "KO",
    "복지",
    "노인을 위한 복지 프로그램을 알아보고 있어요.",
    "Tôi đang tìm hiểu các chương trình phúc lợi dành cho người cao tuổi."
  ],
  [
    "KO",
    "지원금",
    "지원금 신청에 필요한 서류를 미리 준비하세요.",
    "Hãy chuẩn bị trước giấy tờ cần thiết để xin tiền trợ cấp."
  ],
  [
    "KO",
    "보험",
    "여행 전에 보험 보장 내용을 확인했어요.",
    "Trước chuyến đi, tôi đã kiểm tra phạm vi bảo hiểm."
  ],
  [
    "KO",
    "세금",
    "올해 납부해야 할 세금이 얼마인지 확인했어요.",
    "Tôi kiểm tra số tiền thuế phải nộp trong năm nay."
  ],
  [
    "KO",
    "법률",
    "계약서를 쓰기 전에 관련 법률을 찾아봤어요.",
    "Tôi tìm hiểu luật pháp liên quan trước khi ký hợp đồng."
  ],
  [
    "KO",
    "규칙",
    "도서관에서는 조용히 해야 한다는 규칙을 지켜요.",
    "Ở thư viện, tôi tuân thủ quy tắc phải giữ yên lặng."
  ],
  [
    "KO",
    "안전",
    "공사장 주변에서는 안전에 특히 주의하세요.",
    "Hãy đặc biệt chú ý đến an toàn khi ở gần công trường."
  ],
  [
    "EX",
    "낚시 허가증이 필요한 장소인가요?",
    "처음 방문한 낚시터에서 직원에게 \"낚시 허가증이 필요한 장소인가요?\"라고 물었어요.",
    "Ở địa điểm câu cá lần đầu đến, tôi hỏi nhân viên: \"Chỗ này có cần giấy phép câu cá không?\""
  ],
  [
    "EX",
    "자전거 타이어에 바람이 빠졌어요.",
    "수리점에서 자전거를 보여 주며 \"자전거 타이어에 바람이 빠졌어요.\"라고 말했어요.",
    "Tại tiệm sửa xe, tôi chỉ chiếc xe đạp và nói: \"Lốp xe đạp bị xì hơi.\""
  ],
  [
    "EX",
    "수영장 레인별 이용 시간을 확인하고 싶어요.",
    "수영장 안내 데스크에서 \"수영장 레인별 이용 시간을 확인하고 싶어요.\"라고 문의했어요.",
    "Ở quầy hướng dẫn hồ bơi, tôi hỏi: \"Tôi muốn kiểm tra giờ sử dụng của từng làn bơi.\""
  ],
  [
    "EX",
    "경기 결과를 기록해 둘게요.",
    "다음에 실력을 비교하려고 팀원에게 \"경기 결과를 기록해 둘게요.\"라고 말했어요.",
    "Để so sánh khả năng thi đấu lần sau, tôi nói với đồng đội: \"Tôi sẽ ghi lại kết quả trận đấu.\""
  ],
  [
    "EX",
    "공연 리허설은 몇 시에 시작해요?",
    "무대 준비 중 진행자에게 \"공연 리허설은 몇 시에 시작해요?\"라고 물었어요.",
    "Khi chuẩn bị sân khấu, tôi hỏi người điều phối: \"Buổi tổng duyệt bắt đầu lúc mấy giờ?\""
  ],
  [
    "EX",
    "좌석에서 무대가 잘 보이나요?",
    "공연 표를 예매하기 전에 직원에게 \"좌석에서 무대가 잘 보이나요?\"라고 물었어요.",
    "Trước khi đặt vé biểu diễn, tôi hỏi nhân viên: \"Từ ghế này có nhìn rõ sân khấu không?\""
  ],
  [
    "EX",
    "단체 사진을 찍기 전에 줄을 맞춰 주세요.",
    "행사 진행자가 사람들에게 \"단체 사진을 찍기 전에 줄을 맞춰 주세요.\"라고 안내했어요.",
    "Người điều phối sự kiện thông báo: \"Xin hãy xếp hàng ngay ngắn trước khi chụp ảnh tập thể.\""
  ],
  [
    "EX",
    "장비를 사용한 뒤 제자리에 놓아 주세요.",
    "운동 강사가 수강생들에게 \"장비를 사용한 뒤 제자리에 놓아 주세요.\"라고 부탁했어요.",
    "Huấn luyện viên nhắc học viên: \"Sau khi sử dụng, vui lòng đặt dụng cụ về đúng chỗ.\""
  ],
  [
    "EX",
    "체험 수업을 한 번 받아 보고 싶어요.",
    "등록하기 전에 강사에게 \"체험 수업을 한 번 받아 보고 싶어요.\"라고 말했어요.",
    "Trước khi đăng ký, tôi nói với giáo viên: \"Tôi muốn thử tham gia một buổi học trải nghiệm.\""
  ],
  [
    "EX",
    "참가 신청 마감이 언제예요?",
    "행사에 신청하려고 주최 측에 \"참가 신청 마감이 언제예요?\"라고 물었어요.",
    "Để đăng ký tham gia sự kiện, tôi hỏi ban tổ chức: \"Hạn cuối đăng ký tham gia là khi nào?\""
  ],
  [
    "EN",
    "galaxy",
    "Our solar system is part of the Milky Way galaxy.",
    "우리 태양계는 은하수 은하에 속해 있어요."
  ],
  [
    "EN",
    "exoplanet",
    "Astronomers discovered an exoplanet orbiting a distant star.",
    "천문학자들은 먼 별 주위를 도는 외계 행성을 발견했어요."
  ],
  [
    "EN",
    "orbit",
    "The satellite entered a stable orbit around Earth.",
    "위성이 지구 주위의 안정적인 궤도에 진입했어요."
  ],
  [
    "EN",
    "gravity",
    "Gravity keeps the Moon moving around Earth.",
    "중력은 달이 지구 주위를 돌게 하는 힘이에요."
  ],
  [
    "EN",
    "velocity",
    "The scientists measured the spacecraft's velocity during launch.",
    "과학자들은 발사 중 우주선의 속도를 측정했어요."
  ],
  [
    "EN",
    "acceleration",
    "The car's acceleration increased as the driver pressed the pedal.",
    "운전자가 페달을 밟자 자동차의 가속도가 증가했어요."
  ],
  [
    "EN",
    "friction",
    "Friction between the tires and the road helps the car stop.",
    "타이어와 도로 사이의 마찰은 자동차가 멈추는 데 도움이 돼요."
  ],
  [
    "EN",
    "momentum",
    "The moving ball lost momentum as it rolled across the grass.",
    "공은 잔디 위를 구르면서 운동량이 줄었어요."
  ],
  [
    "EN",
    "electromagnetism",
    "We studied electromagnetism to understand how electric motors work.",
    "우리는 전동기의 작동 원리를 이해하려고 전자기학을 공부했어요."
  ],
  [
    "EN",
    "frequency",
    "This sound has a higher frequency than the previous one.",
    "이 소리는 앞의 소리보다 주파수가 높아요."
  ],
  [
    "EN",
    "wavelength",
    "Blue light has a shorter wavelength than red light.",
    "파란빛은 빨간빛보다 파장이 짧아요."
  ],
  [
    "EN",
    "resonance",
    "The engineer checked whether resonance was causing the vibration.",
    "기술자는 공명 때문에 진동이 생기는지 확인했어요."
  ],
  [
    "EN",
    "optics",
    "The course in optics covered lenses and the behavior of light.",
    "그 광학 강의에서는 렌즈와 빛의 성질을 다뤘어요."
  ],
  [
    "EN",
    "refraction",
    "The straw looks bent in water because of refraction.",
    "물속의 빨대가 휘어 보이는 것은 굴절 때문이에요."
  ],
  [
    "EN",
    "conductivity",
    "Copper is widely used in wires because of its high conductivity.",
    "구리는 전도성이 높아서 전선에 널리 사용돼요."
  ],
  [
    "EN",
    "semiconductor",
    "A semiconductor can control the flow of electric current.",
    "반도체는 전류의 흐름을 제어할 수 있어요."
  ],
  [
    "EN",
    "alloy",
    "Brass is an alloy made mainly from copper and zinc.",
    "황동은 주로 구리와 아연으로 만든 합금이에요."
  ],
  [
    "EN",
    "polymer",
    "This polymer is used to make lightweight packaging.",
    "이 중합체는 가벼운 포장재를 만드는 데 쓰여요."
  ],
  [
    "EN",
    "crystal",
    "A small salt crystal formed as the water evaporated.",
    "물이 증발하면서 작은 소금 결정이 생겼어요."
  ],
  [
    "EN",
    "equilibrium",
    "The system reached equilibrium when the two forces balanced.",
    "두 힘이 균형을 이루자 계가 평형 상태에 도달했어요."
  ],
  [
    "EN",
    "solubility",
    "The solubility of sugar in water increases as the water gets warmer.",
    "물의 온도가 높아지면 설탕의 용해도가 증가해요."
  ],
  [
    "EN",
    "acidity",
    "The scientist measured the acidity of the lake water.",
    "과학자는 호수 물의 산성도를 측정했어요."
  ],
  [
    "EN",
    "alkalinity",
    "The test measures the alkalinity of the water sample.",
    "그 검사는 물 시료의 알칼리도를 측정해요."
  ],
  [
    "EN",
    "isotope",
    "Carbon-14 is an isotope used to estimate the age of ancient objects.",
    "탄소-14는 오래된 물체의 연대를 추정하는 데 쓰이는 동위원소예요."
  ],
  [
    "EN",
    "radioactivity",
    "The team monitored radioactivity around the old facility.",
    "연구팀은 오래된 시설 주변의 방사능을 관측했어요."
  ],
  [
    "EN",
    "fission",
    "Nuclear fission releases energy when a heavy atomic nucleus splits.",
    "핵분열은 무거운 원자핵이 쪼개질 때 에너지를 방출해요."
  ],
  [
    "EN",
    "fusion",
    "In the Sun, nuclear fusion produces enormous amounts of energy.",
    "태양에서는 핵융합으로 엄청난 에너지가 만들어져요."
  ],
  [
    "EN",
    "thermodynamics",
    "Thermodynamics explains how heat and energy move through a system.",
    "열역학은 계 안에서 열과 에너지가 어떻게 이동하는지 설명해요."
  ],
  [
    "EN",
    "calculus",
    "Calculus helps us describe how a quantity changes over time.",
    "미적분학은 어떤 양이 시간에 따라 어떻게 변하는지 설명하는 데 도움이 돼요."
  ],
  [
    "EN",
    "geometry",
    "We used geometry to calculate the area of the triangle.",
    "우리는 삼각형의 넓이를 계산하려고 기하학을 이용했어요."
  ],
  [
    "EN",
    "theorem",
    "The teacher demonstrated the theorem with a simple diagram.",
    "선생님은 간단한 그림으로 그 정리를 설명해 주셨어요."
  ],
  [
    "EN",
    "equation",
    "Solve the equation to find the value of x.",
    "x의 값을 구하려면 방정식을 푸세요."
  ],
  [
    "EN",
    "fraction",
    "One half is a fraction representing one of two equal parts of a whole.",
    "2분의 1은 전체를 똑같이 두 부분으로 나눈 것 중 한 부분을 나타내는 분수예요."
  ],
  [
    "EN",
    "integer",
    "Negative three is an integer, but one half is not.",
    "마이너스 3은 정수이지만 2분의 1은 정수가 아니에요."
  ],
  [
    "EN",
    "numerator",
    "In the fraction three quarters, three is the numerator.",
    "4분의 3이라는 분수에서 3은 분자예요."
  ],
  [
    "EN",
    "denominator",
    "The denominator tells us how many equal parts make up a whole.",
    "분모는 전체가 똑같은 몇 부분으로 나뉘는지 나타내요."
  ],
  [
    "EN",
    "polynomial",
    "Our teacher showed us how to factor a polynomial.",
    "선생님은 다항식을 인수분해하는 방법을 알려 주셨어요."
  ],
  [
    "EN",
    "matrix",
    "The program stores the numbers in a two-dimensional matrix.",
    "그 프로그램은 수들을 2차원 행렬에 저장해요."
  ],
  [
    "EN",
    "vector",
    "A vector has both magnitude and direction.",
    "벡터에는 크기와 방향이 모두 있어요."
  ],
  [
    "EN",
    "dimension",
    "Length is one dimension of the rectangular box.",
    "길이는 직육면체의 한 차원을 나타내요."
  ],
  [
    "KO",
    "위험",
    "젖은 바닥에서 뛰면 넘어질 위험이 있어요.",
    "Chạy trên sàn ướt có nguy cơ bị ngã."
  ],
  [
    "KO",
    "사고",
    "퇴근길에 교통사고가 나서 길이 많이 막혔어요.",
    "Trên đường tan làm xảy ra tai nạn giao thông nên đường tắc nặng."
  ],
  [
    "KO",
    "신고",
    "휴대폰을 잃어버려 경찰서에 분실 신고를 했어요.",
    "Tôi bị mất điện thoại nên đã trình báo mất đồ tại đồn cảnh sát."
  ],
  [
    "KO",
    "구조",
    "산에서 길을 잃은 등산객이 구조를 기다렸어요.",
    "Người leo núi bị lạc đang chờ được cứu hộ."
  ],
  [
    "KO",
    "대피",
    "화재 경보가 울려 모두 밖으로 대피했어요.",
    "Chuông báo cháy vang lên nên mọi người đã sơ tán ra ngoài."
  ],
  [
    "KO",
    "소방",
    "학교에서 소방 안전 교육을 받았어요.",
    "Tôi đã tham gia buổi giáo dục an toàn phòng cháy chữa cháy ở trường."
  ],
  [
    "KO",
    "접수",
    "서류 접수가 완료되었다는 문자를 받았어요.",
    "Tôi nhận được tin nhắn cho biết hồ sơ đã được tiếp nhận."
  ],
  [
    "KO",
    "안내",
    "입구에 붙어 있는 안내를 먼저 읽어 주세요.",
    "Trước tiên hãy đọc hướng dẫn dán ở lối vào."
  ],
  [
    "KO",
    "문의",
    "예약을 변경하려면 고객센터에 문의하세요.",
    "Nếu muốn đổi lịch đặt chỗ, hãy liên hệ trung tâm chăm sóc khách hàng."
  ],
  [
    "KO",
    "운영",
    "도서관은 일요일에도 정상 운영해요.",
    "Thư viện vẫn hoạt động bình thường vào Chủ nhật."
  ],
  [
    "KO",
    "영업시간",
    "카페 영업시간이 변경됐는지 확인해 보세요.",
    "Hãy kiểm tra xem giờ mở cửa của quán cà phê có thay đổi không."
  ],
  [
    "KO",
    "시설",
    "이 체육관에는 샤워 시설과 탈의실이 있어요.",
    "Phòng tập này có phòng tắm và phòng thay đồ."
  ],
  [
    "KO",
    "분실물",
    "분실물을 찾으려면 안내 데스크에 문의하세요.",
    "Nếu muốn tìm đồ thất lạc, hãy hỏi quầy hướng dẫn."
  ],
  [
    "EX",
    "자원봉사자로 행사에 참여할게요.",
    "행사 담당자에게 연락해 \"자원봉사자로 행사에 참여할게요.\"라고 전했어요.",
    "Tôi liên hệ với người phụ trách sự kiện và nói: \"Tôi sẽ tham gia sự kiện với tư cách tình nguyện viên.\""
  ],
  [
    "EX",
    "산책로에서는 반려견 목줄을 착용해 주세요.",
    "공원 안내원이 이용객에게 \"산책로에서는 반려견 목줄을 착용해 주세요.\"라고 안내했어요.",
    "Nhân viên công viên nhắc khách: \"Vui lòng đeo dây dắt cho chó khi đi trên lối đi dạo.\""
  ],
  [
    "EX",
    "이 운동은 하루에 몇 세트 하면 돼요?",
    "새 운동을 배우면서 강사에게 \"이 운동은 하루에 몇 세트 하면 돼요?\"라고 물었어요.",
    "Khi học bài tập mới, tôi hỏi huấn luyện viên: \"Bài tập này nên thực hiện mấy hiệp mỗi ngày?\""
  ],
  [
    "EX",
    "물을 마시며 잠깐 쉬었다 갈게요.",
    "등산하다가 친구에게 \"물을 마시며 잠깐 쉬었다 갈게요.\"라고 말했어요.",
    "Khi đang leo núi, tôi nói với bạn: \"Tôi sẽ uống nước và nghỉ một lát rồi mới đi tiếp.\""
  ],
  [
    "EX",
    "취미 모임에 처음 참여해도 괜찮나요?",
    "모임 운영자에게 \"취미 모임에 처음 참여해도 괜찮나요?\"라고 문의했어요.",
    "Tôi hỏi người tổ chức nhóm: \"Tôi tham gia nhóm sở thích lần đầu có được không?\""
  ],
  [
    "EX",
    "기상 특보가 발효됐는지 확인해 주세요.",
    "태풍 소식을 듣고 동료에게 \"기상 특보가 발효됐는지 확인해 주세요.\"라고 부탁했어요.",
    "Nghe tin về bão, tôi nhờ đồng nghiệp: \"Hãy kiểm tra xem cảnh báo thời tiết đặc biệt đã có hiệu lực chưa.\""
  ],
  [
    "EX",
    "폭우가 그칠 때까지 건물 안에서 기다리세요.",
    "관리 직원이 방문객에게 \"폭우가 그칠 때까지 건물 안에서 기다리세요.\"라고 안내했어요.",
    "Nhân viên quản lý nhắc khách: \"Hãy đợi trong tòa nhà cho đến khi mưa lớn tạnh.\""
  ],
  [
    "EX",
    "침수된 도로로 들어가지 마세요.",
    "현장 통제 요원이 운전자들에게 \"침수된 도로로 들어가지 마세요.\"라고 경고했어요.",
    "Nhân viên điều tiết tại hiện trường cảnh báo người lái xe: \"Đừng đi vào con đường bị ngập nước.\""
  ],
  [
    "EX",
    "정전이 되면 손전등을 사용하세요.",
    "비상 대피 교육에서 \"정전이 되면 손전등을 사용하세요.\"라고 안내받았어요.",
    "Trong buổi hướng dẫn sơ tán khẩn cấp, chúng tôi được dặn: \"Khi mất điện, hãy dùng đèn pin.\""
  ],
  [
    "EX",
    "가스 냄새가 나면 밸브를 잠그고 밖으로 나가세요.",
    "안전 교육에서 \"가스 냄새가 나면 밸브를 잠그고 밖으로 나가세요.\"라는 안내를 들었어요.",
    "Trong buổi huấn luyện an toàn, chúng tôi được hướng dẫn: \"Nếu ngửi thấy mùi gas, hãy khóa van và ra ngoài.\""
  ],
  [
    "EX",
    "연기가 보여서 소방서에 신고했어요.",
    "관리자에게 상황을 설명하며 \"연기가 보여서 소방서에 신고했어요.\"라고 말했어요.",
    "Khi báo tình hình cho người quản lý, tôi nói: \"Tôi thấy khói nên đã gọi báo cho cơ quan cứu hỏa.\""
  ],
  [
    "EX",
    "다친 사람이 있으니 구급차를 불러 주세요.",
    "사고 현장에서 주변 사람들에게 \"다친 사람이 있으니 구급차를 불러 주세요.\"라고 외쳤어요.",
    "Tại hiện trường tai nạn, tôi kêu gọi mọi người: \"Có người bị thương, xin hãy gọi xe cứu thương.\""
  ],
  [
    "EX",
    "안전한 대피 장소가 어디인가요?",
    "건물 안내 직원에게 \"안전한 대피 장소가 어디인가요?\"라고 물었어요.",
    "Tôi hỏi nhân viên hướng dẫn của tòa nhà: \"Nơi sơ tán an toàn ở đâu?\""
  ],
  [
    "EX",
    "비상구를 막지 말아 주세요.",
    "행사 진행자가 관람객들에게 \"비상구를 막지 말아 주세요.\"라고 부탁했어요.",
    "Người điều phối sự kiện nhắc khán giả: \"Vui lòng đừng chắn lối thoát hiểm.\""
  ],
  [
    "EX",
    "여진에 대비해 넓은 곳으로 이동하세요.",
    "지진 대피 방송에서 \"여진에 대비해 넓은 곳으로 이동하세요.\"라고 안내했어요.",
    "Trong thông báo sơ tán động đất có hướng dẫn: \"Hãy di chuyển đến khu vực trống trải để đề phòng dư chấn.\""
  ],
  [
    "EX",
    "바람이 강하니 간판 아래에 서 있지 마세요.",
    "강풍이 부는 날 안내 방송에서 \"바람이 강하니 간판 아래에 서 있지 마세요.\"라고 경고했어요.",
    "Trong ngày gió lớn, loa thông báo cảnh báo: \"Gió mạnh, đừng đứng dưới các biển hiệu.\""
  ],
  [
    "EX",
    "번개가 치면 나무 밑에 있지 마세요.",
    "야외 안전 교육에서 \"번개가 치면 나무 밑에 있지 마세요.\"라고 강조했어요.",
    "Trong buổi hướng dẫn an toàn ngoài trời, người hướng dẫn nhấn mạnh: \"Khi có sấm sét, đừng trú dưới gốc cây.\""
  ],
  [
    "EN",
    "drag",
    "Don't drag the chair across the wooden floor.",
    "나무 바닥 위로 의자를 끌지 마세요."
  ],
  [
    "EN",
    "lift",
    "Can you help me lift this heavy box?",
    "이 무거운 상자 드는 것 좀 도와줄래요?"
  ],
  [
    "EN",
    "bounce",
    "The ball will bounce higher on the hard ground.",
    "공은 단단한 바닥에서 더 높이 튀어 오를 거예요."
  ],
  [
    "EN",
    "roll",
    "Roll the dough into a small ball.",
    "반죽을 굴려 작은 공 모양으로 만드세요."
  ],
  [
    "EN",
    "slide",
    "Be careful not to slide on the wet tiles.",
    "젖은 타일 바닥에서 미끄러지지 않도록 조심하세요."
  ],
  [
    "EN",
    "step",
    "Step over the puddle so your shoes stay dry.",
    "신발이 젖지 않도록 물웅덩이를 넘어가세요."
  ],
  [
    "EN",
    "march",
    "The children march around the playground to the music.",
    "아이들이 음악에 맞춰 운동장을 행진해요."
  ],
  [
    "EN",
    "race",
    "My brother and I race to the school gate.",
    "동생과 나는 학교 정문까지 달리기 시합을 해요."
  ],
  [
    "EN",
    "chase",
    "The puppy likes to chase falling leaves.",
    "강아지는 떨어지는 낙엽을 쫓아다니는 걸 좋아해요."
  ],
  [
    "EN",
    "exit",
    "Please exit the building through the side door.",
    "옆문으로 건물에서 나가 주세요."
  ],
  [
    "EN",
    "arrive",
    "What time will the train arrive at the station?",
    "기차가 역에 몇 시에 도착하나요?"
  ],
  [
    "EN",
    "depart",
    "Our flight will depart at seven in the morning.",
    "우리 비행기는 아침 일곱 시에 출발해요."
  ],
  [
    "EN",
    "board",
    "Passengers may now board the bus.",
    "승객 여러분은 이제 버스에 탑승하셔도 됩니다."
  ],
  [
    "EN",
    "steer",
    "Hold the handlebars firmly to steer the bicycle.",
    "자전거의 방향을 조종하려면 핸들을 단단히 잡으세요."
  ],
  [
    "EN",
    "pedal",
    "Keep your feet on the pedals as you pedal uphill.",
    "오르막길에서 페달을 밟을 때 발을 페달에 올려 두세요."
  ],
  [
    "EN",
    "row",
    "We took turns rowing the small boat across the lake.",
    "우리는 번갈아 노를 저어 작은 배로 호수를 건넜어요."
  ],
  [
    "EN",
    "sail",
    "They plan to sail around the island tomorrow.",
    "그들은 내일 섬 주위를 배로 항해할 계획이에요."
  ],
  [
    "EN",
    "float",
    "A dry leaf can float on the surface of the pond.",
    "마른 잎은 연못 수면에 떠 있을 수 있어요."
  ],
  [
    "EN",
    "dive",
    "Never dive into water if you don't know how deep it is.",
    "수심을 모르는 물속에는 절대 다이빙하지 마세요."
  ],
  [
    "EN",
    "splash",
    "The kids splash water on each other at the pool.",
    "아이들은 수영장에서 서로에게 물을 튀겨요."
  ],
  [
    "EN",
    "wiggle",
    "Wiggle your toes to warm up your feet.",
    "발을 따뜻하게 하려면 발가락을 꼼지락거려 보세요."
  ],
  [
    "EN",
    "stretch",
    "Stretch your arms above your head after waking up.",
    "잠에서 깬 뒤 팔을 머리 위로 쭉 뻗어 보세요."
  ],
  [
    "EN",
    "bend",
    "Bend your knees when you pick up the box.",
    "상자를 들어 올릴 때 무릎을 굽히세요."
  ],
  [
    "EN",
    "twist",
    "Twist the lid to open the jar.",
    "뚜껑을 돌려 병을 여세요."
  ],
  [
    "EN",
    "shake",
    "Shake the bottle gently before you pour the juice.",
    "주스를 따르기 전에 병을 부드럽게 흔드세요."
  ],
  [
    "EN",
    "nod",
    "If you understand the question, just nod your head.",
    "질문을 이해했다면 고개를 끄덕여 보세요."
  ],
  [
    "EN",
    "tap",
    "Tap the screen once to start the video.",
    "동영상을 시작하려면 화면을 한 번 톡 누르세요."
  ],
  [
    "EN",
    "knock",
    "Please knock before entering my room.",
    "제 방에 들어오기 전에 노크해 주세요."
  ],
  [
    "EN",
    "scratch",
    "Try not to scratch the itchy spot on your arm.",
    "팔에서 가려운 부분을 긁지 않도록 해 보세요."
  ],
  [
    "EN",
    "rub",
    "Rub your hands together to warm them up.",
    "손을 따뜻하게 하려면 두 손을 비비세요."
  ],
  [
    "EN",
    "wipe",
    "Wipe the table with a clean cloth after dinner.",
    "저녁 식사 후 깨끗한 천으로 식탁을 닦으세요."
  ],
  [
    "EN",
    "polish",
    "Dad used a soft cloth to polish his shoes.",
    "아빠는 부드러운 천으로 구두를 닦아 광을 냈어요."
  ],
  [
    "EN",
    "scrub",
    "Scrub the dirty pan with a sponge and warm water.",
    "스펀지와 따뜻한 물로 더러워진 냄비를 박박 닦으세요."
  ],
  [
    "EN",
    "rinse",
    "Rinse the strawberries under running water before eating them.",
    "딸기는 먹기 전에 흐르는 물에 헹구세요."
  ],
  [
    "EN",
    "pour",
    "Pour the milk slowly so it doesn't spill.",
    "우유가 쏟아지지 않도록 천천히 따르세요."
  ],
  [
    "EN",
    "spill",
    "Be careful not to spill your soup on the table.",
    "식탁에 수프를 쏟지 않도록 조심하세요."
  ],
  [
    "EN",
    "stir",
    "Stir the soup until the salt dissolves.",
    "소금이 녹을 때까지 수프를 저으세요."
  ],
  [
    "EN",
    "mix",
    "Mix the flour and water in a large bowl.",
    "큰 그릇에 밀가루와 물을 섞으세요."
  ],
  [
    "EN",
    "slice",
    "Slice the cucumber into thin pieces for the salad.",
    "샐러드에 넣을 오이를 얇게 썰어 주세요."
  ],
  [
    "EN",
    "chop",
    "Chop the carrots into small pieces for the soup.",
    "수프에 넣을 당근을 잘게 썰어 주세요."
  ],
  [
    "EN",
    "peel",
    "Peel the orange before sharing it with your friend.",
    "친구와 나눠 먹기 전에 오렌지 껍질을 벗기세요."
  ],
  [
    "EN",
    "grate",
    "Grate some cheese over the hot pasta.",
    "따뜻한 파스타 위에 치즈를 조금 갈아 올리세요."
  ],
  [
    "EN",
    "spread",
    "Spread a little jam on the warm toast.",
    "따뜻한 토스트에 잼을 조금 펴 발라 주세요."
  ],
  [
    "EN",
    "sprinkle",
    "Sprinkle sesame seeds on top of the rice.",
    "밥 위에 참깨를 뿌리세요."
  ],
  [
    "EN",
    "serve",
    "The waiter will serve our food in a few minutes.",
    "직원이 몇 분 뒤에 음식을 가져다줄 거예요."
  ],
  [
    "EN",
    "chew",
    "Chew your food slowly before swallowing.",
    "음식을 삼키기 전에 천천히 씹으세요."
  ],
  [
    "EN",
    "swallow",
    "It hurts when I swallow water.",
    "물을 삼킬 때 아파요."
  ],
  [
    "EN",
    "fry",
    "We usually fry eggs for breakfast on Sundays.",
    "우리는 보통 일요일 아침에 달걀을 프라이해서 먹어요."
  ],
  [
    "EN",
    "roast",
    "We roast sweet potatoes in the oven when it gets cold.",
    "날씨가 추워지면 우리는 오븐에 고구마를 구워요."
  ],
  [
    "EN",
    "freeze",
    "You can freeze the leftover soup for another day.",
    "남은 수프는 나중에 먹을 수 있도록 얼려 두면 돼요."
  ],
  [
    "EN",
    "weed",
    "We need to weed the garden before planting flowers.",
    "꽃을 심기 전에 정원의 잡초를 뽑아야 해요."
  ],
  [
    "EN",
    "harvest",
    "The farmers harvest apples in early autumn.",
    "농부들은 초가을에 사과를 수확해요."
  ],
  [
    "EN",
    "dig",
    "The dog likes to dig holes in the backyard.",
    "그 개는 뒷마당에 구멍 파는 것을 좋아해요."
  ],
  [
    "EN",
    "bury",
    "We decided to bury the time capsule under a tree.",
    "우리는 타임캡슐을 나무 아래에 묻기로 했어요."
  ],
  [
    "EN",
    "sprout",
    "The beans will sprout if you keep the soil moist.",
    "흙을 촉촉하게 유지하면 콩에서 싹이 틀 거예요."
  ],
  [
    "EN",
    "blossom",
    "The cherry trees usually blossom in spring.",
    "벚나무는 보통 봄에 꽃이 피어요."
  ],
  [
    "EN",
    "bathe",
    "We bathe our dog once a month.",
    "우리는 한 달에 한 번 개를 목욕시켜요."
  ],
  [
    "EN",
    "adopt",
    "My family decided to adopt a cat from the shelter.",
    "우리 가족은 보호소에서 고양이를 입양하기로 했어요."
  ],
  [
    "EN",
    "fetch",
    "Could you fetch my jacket from the bedroom?",
    "침실에서 내 재킷을 가져다줄래요?"
  ],
  [
    "EN",
    "guard",
    "The dog was trained to guard the house at night.",
    "그 개는 밤에 집을 지키도록 훈련받았어요."
  ],
  [
    "EN",
    "hide",
    "Let's hide the birthday present in the closet.",
    "생일 선물을 옷장에 숨기자."
  ],
  [
    "EN",
    "whisper",
    "Please whisper so you don't wake the baby.",
    "아기가 깨지 않도록 속삭여 주세요."
  ],
  [
    "EN",
    "yell",
    "Don't yell across the library; walk over and talk quietly.",
    "도서관에서 멀리 대고 소리치지 말고 다가가서 조용히 이야기하세요."
  ],
  [
    "EN",
    "cheer",
    "We all stood up to cheer for our team.",
    "우리는 모두 일어나서 우리 팀을 응원했어요."
  ],
  [
    "EN",
    "giggle",
    "The children giggle whenever they hear that funny song.",
    "아이들은 그 재미있는 노래를 들을 때마다 킥킥 웃어요."
  ],
  [
    "EN",
    "frown",
    "Mom began to frown when she saw the messy room.",
    "엄마는 어질러진 방을 보고 얼굴을 찌푸리기 시작했어요."
  ],
  [
    "EN",
    "chuckle",
    "Grandpa likes to chuckle at his own jokes.",
    "할아버지는 자기 농담을 하며 낮게 웃는 걸 좋아하세요."
  ],
  [
    "EN",
    "sob",
    "The little boy began to sob after losing his toy.",
    "어린 남자아이는 장난감을 잃어버리고 흐느껴 울기 시작했어요."
  ],
  [
    "EN",
    "cough",
    "Cover your mouth when you cough.",
    "기침할 때는 입을 가리세요."
  ],
  [
    "EN",
    "sneeze",
    "I always sneeze when there's too much dust in the room.",
    "방에 먼지가 너무 많으면 나는 항상 재채기를 해요."
  ],
  [
    "EN",
    "thought",
    "A sudden thought made me check whether I had locked the door.",
    "문득 문을 잠갔는지 확인해야겠다는 생각이 들었어요."
  ],
  [
    "EN",
    "trust",
    "It takes time to build trust with new teammates.",
    "새로운 팀원들과 신뢰를 쌓는 데는 시간이 걸려요."
  ],
  [
    "EN",
    "truth",
    "She finally told her parents the truth about the broken window.",
    "그녀는 마침내 깨진 창문에 관한 진실을 부모님께 말씀드렸어요."
  ],
  [
    "EN",
    "anthology",
    "Our class read an anthology of short stories by young writers.",
    "우리 반은 젊은 작가들의 단편소설 선집을 읽었어요."
  ],
  [
    "EN",
    "autobiography",
    "In her autobiography, the singer describes her childhood.",
    "그 가수는 자서전에서 자신의 어린 시절을 이야기해요."
  ],
  [
    "EN",
    "biography",
    "I borrowed a biography of the scientist from the library.",
    "나는 도서관에서 그 과학자의 전기를 빌렸어요."
  ],
  [
    "EN",
    "brochure",
    "The hotel brochure includes a map of nearby attractions.",
    "호텔 안내 책자에는 주변 명소 지도가 들어 있어요."
  ],
  [
    "EN",
    "caption",
    "Read the caption below the photo to learn when it was taken.",
    "사진 아래의 설명을 읽으면 촬영 시기를 알 수 있어요."
  ],
  [
    "EN",
    "ceremony",
    "Parents were invited to the graduation ceremony.",
    "부모님들이 졸업식에 초대되었어요."
  ],
  [
    "EN",
    "charity",
    "The students collected warm clothes for a local charity.",
    "학생들은 지역 자선 단체에 기부할 따뜻한 옷을 모았어요."
  ],
  [
    "EN",
    "chorus",
    "Everyone sang along when the chorus began.",
    "후렴이 시작되자 모두가 따라 불렀어요."
  ],
  [
    "EN",
    "coastline",
    "We followed the coastline and stopped at a quiet beach.",
    "우리는 해안선을 따라가다가 조용한 해변에 들렀어요."
  ],
  [
    "EN",
    "community center",
    "The community center offers free computer classes on weekends.",
    "주민 센터는 주말에 무료 컴퓨터 수업을 제공해요."
  ],
  [
    "EN",
    "counselor",
    "The school counselor helped me choose my classes for next year.",
    "학교 상담 선생님이 내년 수업을 선택하는 데 도움을 주셨어요."
  ],
  [
    "EN",
    "countryside",
    "My grandparents live in the countryside, far from the busy city.",
    "우리 조부모님은 번잡한 도시에서 멀리 떨어진 시골에 사세요."
  ],
  [
    "EN",
    "crowd",
    "A large crowd gathered outside the concert hall.",
    "많은 사람들이 공연장 밖에 모였어요."
  ],
  [
    "EN",
    "customer service",
    "I contacted customer service because my order arrived damaged.",
    "주문한 물건이 손상된 채 도착해서 고객 서비스 센터에 연락했어요."
  ],
  [
    "EN",
    "decoration",
    "We made paper decorations for the school festival.",
    "우리는 학교 축제를 위해 종이 장식품을 만들었어요."
  ],
  [
    "EN",
    "editor",
    "The editor suggested a clearer title for my article.",
    "편집자는 내 기사에 더 명확한 제목을 붙이자고 제안했어요."
  ],
  [
    "EN",
    "entertainment",
    "The festival provides free entertainment for families.",
    "그 축제에서는 가족들이 무료로 즐길 수 있는 공연과 오락을 제공해요."
  ],
  [
    "EN",
    "equality",
    "The students discussed why equality in education matters.",
    "학생들은 교육에서 평등이 왜 중요한지 토론했어요."
  ],
  [
    "EN",
    "fundraiser",
    "Our class held a fundraiser to buy books for the library.",
    "우리 반은 도서관에 책을 사 주기 위한 모금 행사를 열었어요."
  ],
  [
    "EN",
    "headline",
    "The newspaper headline caught my attention immediately.",
    "신문의 큰 제목이 바로 내 눈길을 끌었어요."
  ],
  [
    "EN",
    "homepage",
    "You can find the opening hours on the museum's homepage.",
    "박물관 홈페이지에서 운영 시간을 확인할 수 있어요."
  ],
  [
    "EN",
    "journalist",
    "The journalist interviewed people who had witnessed the storm.",
    "기자는 폭풍을 목격한 사람들을 인터뷰했어요."
  ],
  [
    "EN",
    "librarian",
    "Ask the librarian if you can't find the book you need.",
    "필요한 책을 찾지 못하면 사서에게 물어보세요."
  ],
  [
    "EN",
    "membership",
    "My gym membership expires at the end of this month.",
    "내 헬스장 회원권은 이번 달 말에 만료돼요."
  ],
  [
    "EN",
    "opinion poll",
    "An opinion poll showed that most students wanted a longer lunch break.",
    "여론 조사 결과 대부분의 학생이 점심시간 연장을 원했어요."
  ],
  [
    "EN",
    "orchestra",
    "The school orchestra practiced for the winter concert.",
    "학교 관현악단은 겨울 음악회를 위해 연습했어요."
  ],
  [
    "EN",
    "orientation",
    "New students will attend an orientation on Monday.",
    "신입생들은 월요일에 오리엔테이션에 참석할 거예요."
  ],
  [
    "EN",
    "package tour",
    "We chose a package tour because it included a guide and transportation.",
    "가이드와 교통편이 포함되어 있어서 우리는 패키지여행을 선택했어요."
  ],
  [
    "EN",
    "poverty",
    "The organization works to reduce poverty in rural communities.",
    "그 단체는 농촌 지역의 빈곤을 줄이기 위해 활동해요."
  ],
  [
    "EN",
    "recycling",
    "Our school has separate bins for recycling paper and plastic.",
    "우리 학교에는 종이와 플라스틱을 재활용하기 위한 분리수거함이 있어요."
  ],
  [
    "EN",
    "referee",
    "The referee stopped the match after a player was injured.",
    "선수가 다치자 심판은 경기를 중단시켰어요."
  ],
  [
    "EN",
    "spectator",
    "Every spectator stood up to applaud the winning team.",
    "모든 관중이 일어나 우승 팀에 박수를 보냈어요."
  ],
  [
    "EN",
    "sponsor",
    "A local business agreed to be the sponsor of the event.",
    "지역 업체 한 곳이 그 행사의 후원자가 되기로 했어요."
  ],
  [
    "EN",
    "tournament",
    "Our team reached the final round of the basketball tournament.",
    "우리 팀은 농구 대회 결승전에 진출했어요."
  ],
  [
    "EN",
    "traffic jam",
    "We missed the beginning of the movie because of a traffic jam.",
    "교통 체증 때문에 영화 시작 부분을 놓쳤어요."
  ],
  [
    "EN",
    "translation",
    "The Korean translation helped me understand the poem.",
    "한국어 번역 덕분에 그 시를 이해할 수 있었어요."
  ],
  [
    "EN",
    "youth center",
    "The youth center runs art workshops after school.",
    "청소년 센터에서는 방과 후 미술 수업을 운영해요."
  ],
  [
    "EN",
    "guesthouse",
    "We stayed at a small guesthouse near the train station.",
    "우리는 기차역 근처의 작은 게스트하우스에서 묵었어요."
  ],
  [
    "EN",
    "landmark",
    "The old clock tower is a famous landmark in our town.",
    "오래된 시계탑은 우리 마을의 유명한 명소예요."
  ],
  [
    "EN",
    "add",
    "Please add your name to the list before Friday.",
    "금요일 전까지 명단에 이름을 추가해 주세요."
  ],
  [
    "EN",
    "advise",
    "I advise you to save a copy of your important files.",
    "중요한 파일은 사본을 저장해 두는 게 좋겠어요."
  ],
  [
    "EN",
    "announce",
    "The principal will announce the contest winners tomorrow.",
    "교장 선생님이 내일 대회 수상자를 발표하실 거예요."
  ],
  [
    "EN",
    "apologize",
    "I need to apologize for arriving late to the meeting.",
    "회의에 늦게 도착한 것에 대해 사과해야 해요."
  ],
  [
    "EN",
    "apply",
    "You can apply for the scholarship online.",
    "그 장학금은 온라인으로 신청할 수 있어요."
  ],
  [
    "EN",
    "behave",
    "The children behaved politely during the museum visit.",
    "아이들은 박물관 견학 중에 예의 바르게 행동했어요."
  ],
  [
    "EN",
    "complain",
    "Several neighbors complained about the noise at night.",
    "이웃 몇 명이 밤에 나는 소음에 대해 불평했어요."
  ],
  [
    "EN",
    "complete",
    "You must complete the form before the interview.",
    "면접 전에 양식을 모두 작성해야 해요."
  ],
  [
    "EN",
    "continue",
    "The rain stopped, so we decided to continue our hike.",
    "비가 그쳐서 우리는 등산을 계속하기로 했어요."
  ],
  [
    "EN",
    "control",
    "Use this button to control the volume of the speakers.",
    "이 버튼으로 스피커의 음량을 조절하세요."
  ],
  [
    "EN",
    "divide",
    "Let's divide the pizza into eight equal slices.",
    "피자를 똑같은 크기로 여덟 조각으로 나누자."
  ],
  [
    "EN",
    "enter",
    "Enter your password to open the account settings.",
    "계정 설정을 열려면 비밀번호를 입력하세요."
  ],
  [
    "EN",
    "escape",
    "The cat managed to escape through the open window.",
    "고양이는 열린 창문으로 빠져나가는 데 성공했어요."
  ],
  [
    "EN",
    "expect",
    "We expect the delivery to arrive before noon.",
    "배송품이 정오 전에 도착할 것으로 예상해요."
  ],
  [
    "EN",
    "fail",
    "If you fail the driving test, you can take it again.",
    "운전면허 시험에 떨어지더라도 다시 응시할 수 있어요."
  ],
  [
    "EN",
    "fill",
    "Please fill this bottle with clean drinking water.",
    "이 병에 깨끗한 식수를 채워 주세요."
  ],
  [
    "EN",
    "guess",
    "Can you guess how many marbles are in the jar?",
    "병 안에 구슬이 몇 개 있는지 맞혀 볼래요?"
  ],
  [
    "EN",
    "happen",
    "What will happen if we miss the last train?",
    "막차를 놓치면 어떻게 될까요?"
  ],
  [
    "EN",
    "introduce",
    "I'd like to introduce my friend to the rest of the group.",
    "제 친구를 다른 모임 사람들에게 소개하고 싶어요."
  ],
  [
    "EN",
    "miss",
    "I missed the bus because I left home too late.",
    "집에서 너무 늦게 나오는 바람에 버스를 놓쳤어요."
  ],
  [
    "EN",
    "prepare",
    "We need to prepare everything before the guests arrive.",
    "손님들이 도착하기 전에 모든 것을 준비해야 해요."
  ],
  [
    "EN",
    "promise",
    "I promise to return your book by Monday.",
    "월요일까지 네 책을 돌려주겠다고 약속할게."
  ],
  [
    "EN",
    "reach",
    "We should reach the mountain shelter before sunset.",
    "해가 지기 전에 산속 대피소에 도착할 수 있을 거예요."
  ],
  [
    "EN",
    "receive",
    "Did you receive the confirmation email yesterday?",
    "어제 확인 이메일을 받았나요?"
  ],
  [
    "EN",
    "refuse",
    "The shop refused to accept the damaged coupon.",
    "가게는 훼손된 쿠폰을 받기를 거절했어요."
  ],
  [
    "EN",
    "repeat",
    "Could you repeat the last sentence more slowly?",
    "마지막 문장을 좀 더 천천히 다시 말해 주실래요?"
  ],
  [
    "EN",
    "reply",
    "Please reply to my message when you have time.",
    "시간 날 때 제 메시지에 답장해 주세요."
  ],
  [
    "EN",
    "search",
    "I searched the website for information about the museum.",
    "나는 박물관 정보를 찾으려고 웹사이트를 검색했어요."
  ],
  [
    "EN",
    "coordinate",
    "Enter the coordinate of each point on the map.",
    "지도에 각 지점의 좌표를 입력하세요."
  ],
  [
    "EN",
    "perimeter",
    "To find the perimeter, add the lengths of all four sides.",
    "둘레를 구하려면 네 변의 길이를 모두 더하세요."
  ],
  [
    "EN",
    "circumference",
    "We measured the circumference of the circular table with a tape measure.",
    "우리는 줄자로 원형 탁자의 둘레를 쟀어요."
  ],
  [
    "EN",
    "diameter",
    "The diameter of this circle is twice its radius.",
    "이 원의 지름은 반지름의 두 배예요."
  ],
  [
    "EN",
    "radius",
    "Draw a line from the center to the edge to show the radius.",
    "반지름을 나타내려면 중심에서 원의 가장자리까지 선을 그으세요."
  ],
  [
    "EN",
    "model",
    "The students built a model of the solar system out of clay.",
    "학생들은 점토로 태양계 모형을 만들었어요."
  ],
  [
    "EN",
    "formula",
    "I used the correct formula but made a mistake in the calculation.",
    "공식은 올바르게 사용했지만 계산에서 실수했어요."
  ],
  [
    "EN",
    "proof",
    "The mathematician presented a proof of the theorem.",
    "수학자는 그 정리의 증명을 제시했어요."
  ],
  [
    "EN",
    "inquiry",
    "The science teacher encouraged inquiry rather than memorizing answers.",
    "과학 선생님은 답을 외우기보다 탐구하는 태도를 장려하셨어요."
  ],
  [
    "EN",
    "scholarship",
    "Her scholarship on Korean history has influenced many researchers.",
    "한국사에 관한 그녀의 학문적 연구는 많은 연구자에게 영향을 주었어요."
  ],
  [
    "EN",
    "discipline",
    "Psychology is a discipline that studies behavior and the mind.",
    "심리학은 행동과 마음을 연구하는 학문 분야예요."
  ],
  [
    "EN",
    "curriculum",
    "The new curriculum includes more hands-on science activities.",
    "새 교육과정에는 직접 해 보는 과학 활동이 더 많이 포함되어 있어요."
  ],
  [
    "EN",
    "pedagogy",
    "The course explores pedagogy for teaching children to read.",
    "그 강좌는 아이들에게 읽기를 가르치는 교육학적 방법을 탐구해요."
  ],
  [
    "EN",
    "literacy",
    "Digital literacy helps people evaluate information they find online.",
    "디지털 문해력은 사람들이 온라인 정보의 가치를 판단하는 데 도움이 돼요."
  ],
  [
    "EN",
    "proficiency",
    "Her proficiency in English improved after a year of daily practice.",
    "1년 동안 매일 연습한 뒤 그녀의 영어 숙련도가 향상됐어요."
  ],
  [
    "EN",
    "competence",
    "The training aims to improve teachers' competence in using technology.",
    "그 연수는 교사들의 기술 활용 역량을 높이는 것을 목표로 해요."
  ],
  [
    "EN",
    "aptitude",
    "The test measures aptitude for solving mathematical problems.",
    "그 검사는 수학 문제 해결에 대한 적성을 측정해요."
  ],
  [
    "EN",
    "assessment",
    "The final assessment includes a written test and a group project.",
    "최종 평가에는 필기시험과 조별 과제가 포함돼요."
  ],
  [
    "EN",
    "credential",
    "Employers may ask applicants to provide proof of a professional credential.",
    "고용주는 지원자에게 전문 자격 증빙을 요구할 수 있어요."
  ],
  [
    "EN",
    "enrollment",
    "Enrollment in the evening course opens next Monday.",
    "야간 강좌 등록은 다음 주 월요일에 시작돼요."
  ],
  [
    "EN",
    "institution",
    "The research institution published its findings online.",
    "그 연구 기관은 연구 결과를 온라인에 발표했어요."
  ],
  [
    "EN",
    "academy",
    "She joined an academy devoted to the study of ancient languages.",
    "그녀는 고대 언어 연구에 전념하는 학술 기관에 가입했어요."
  ],
  [
    "EN",
    "seminar",
    "Students discussed climate policy during the afternoon seminar.",
    "학생들은 오후 세미나에서 기후 정책을 토론했어요."
  ],
  [
    "EN",
    "lecture",
    "The professor gave a lecture on the history of medical science.",
    "교수는 의학사의 역사에 관한 강의를 했어요."
  ],
  [
    "EN",
    "dissertation",
    "She spent three years writing her doctoral dissertation.",
    "그녀는 박사학위 논문을 쓰는 데 3년을 보냈어요."
  ],
  [
    "EN",
    "manuscript",
    "The author sent the finished manuscript to the publisher.",
    "작가는 완성한 원고를 출판사에 보냈어요."
  ],
  [
    "EN",
    "citation",
    "Every direct quotation in your report needs a citation.",
    "보고서에서 직접 인용한 내용에는 모두 출처 표기가 필요해요."
  ],
  [
    "EN",
    "bibliography",
    "Check the bibliography if you want to read the original studies.",
    "원문 연구를 읽고 싶다면 참고 문헌 목록을 확인하세요."
  ],
  [
    "EN",
    "archive",
    "The city archive preserves photographs from a century ago.",
    "시립 기록 보관소에는 100년 전 사진들이 보존되어 있어요."
  ],
  [
    "EN",
    "chronology",
    "The textbook includes a chronology of major historical events.",
    "그 교과서에는 주요 역사적 사건의 연대표가 실려 있어요."
  ],
  [
    "EN",
    "heritage",
    "The museum protects the region's cultural heritage.",
    "그 박물관은 지역의 문화유산을 보호해요."
  ],
  [
    "EN",
    "civilization",
    "Ancient Egyptian civilization developed along the Nile River.",
    "고대 이집트 문명은 나일강을 따라 발전했어요."
  ],
  [
    "EN",
    "dynasty",
    "The exhibition traces the art of the Joseon dynasty.",
    "그 전시는 조선 왕조의 미술을 시대별로 살펴봐요."
  ],
  [
    "EN",
    "empire",
    "The empire expanded its territory through trade and military campaigns.",
    "그 제국은 무역과 군사 원정을 통해 영토를 확장했어요."
  ],
  [
    "EN",
    "revolution",
    "The industrial revolution transformed how goods were produced.",
    "산업혁명은 물건을 생산하는 방식을 크게 바꾸었어요."
  ],
  [
    "EX",
    "도로가 얼어서 차량이 미끄러져요.",
    "출근길에 도로 상황을 전하며 \"도로가 얼어서 차량이 미끄러져요.\"라고 동료에게 말했어요.",
    "Trên đường đi làm, tôi báo tình hình đường sá với đồng nghiệp: \"Đường đóng băng nên xe cộ bị trượt.\""
  ],
  [
    "EX",
    "폭설 때문에 버스 운행이 중단됐어요.",
    "버스를 기다리던 친구에게 \"폭설 때문에 버스 운행이 중단됐어요.\"라고 알려 줬어요.",
    "Tôi báo cho người bạn đang đợi xe buýt: \"Xe buýt đã ngừng hoạt động vì tuyết rơi quá dày.\""
  ],
  [
    "EX",
    "실종된 사람의 인상착의를 알려 드릴게요.",
    "경찰관에게 연락해 \"실종된 사람의 인상착의를 알려 드릴게요.\"라고 말했어요.",
    "Tôi liên hệ với cảnh sát và nói: \"Tôi sẽ cung cấp đặc điểm nhận dạng của người mất tích.\""
  ],
  [
    "EX",
    "경찰에 분실 신고를 하고 싶어요.",
    "지갑을 잃어버린 뒤 경찰서 안내 창구에서 \"경찰에 분실 신고를 하고 싶어요.\"라고 말했어요.",
    "Sau khi làm mất ví, tôi nói tại quầy hướng dẫn ở đồn cảnh sát: \"Tôi muốn trình báo việc mất đồ với cảnh sát.\""
  ],
  [
    "EX",
    "사고 현장에 접근하지 말아 주세요.",
    "현장 통제 요원이 주변 사람들에게 \"사고 현장에 접근하지 말아 주세요.\"라고 안내했어요.",
    "Nhân viên phong tỏa hiện trường nhắc những người xung quanh: \"Xin đừng đến gần hiện trường tai nạn.\""
  ],
  [
    "EX",
    "구조대가 도착할 때까지 환자를 움직이지 마세요.",
    "응급 구조 담당자가 전화로 \"구조대가 도착할 때까지 환자를 움직이지 마세요.\"라고 안내했어요.",
    "Nhân viên cấp cứu hướng dẫn qua điện thoại: \"Đừng di chuyển bệnh nhân cho đến khi đội cứu hộ đến.\""
  ],
  [
    "EX",
    "비상 연락망에 제 번호를 추가해 주세요.",
    "새 직장에 들어가서 담당자에게 \"비상 연락망에 제 번호를 추가해 주세요.\"라고 부탁했어요.",
    "Khi bắt đầu công việc mới, tôi nhờ người phụ trách: \"Vui lòng thêm số điện thoại của tôi vào danh sách liên lạc khẩn cấp.\""
  ],
  [
    "EX",
    "안전 점검이 끝날 때까지 출입을 제한합니다.",
    "건물 입구에 \"안전 점검이 끝날 때까지 출입을 제한합니다.\"라는 안내문이 붙어 있었어요.",
    "Ở lối vào tòa nhà có dán thông báo: \"Hạn chế ra vào cho đến khi hoàn tất kiểm tra an toàn.\""
  ],
  [
    "EX",
    "지진 알림을 받으면 책상 밑으로 들어가세요.",
    "안전 교육 시간에 선생님이 \"지진 알림을 받으면 책상 밑으로 들어가세요.\"라고 설명했어요.",
    "Trong giờ học an toàn, giáo viên hướng dẫn: \"Khi nhận được cảnh báo động đất, hãy chui xuống dưới bàn.\""
  ],
  [
    "EX",
    "산불 연기가 보이면 반대 방향으로 대피하세요.",
    "산불 대피 훈련에서 \"산불 연기가 보이면 반대 방향으로 대피하세요.\"라는 지침을 들었어요.",
    "Trong buổi diễn tập sơ tán khi có cháy rừng, chúng tôi nghe hướng dẫn: \"Nếu thấy khói từ đám cháy rừng, hãy sơ tán theo hướng ngược lại.\""
  ],
  [
    "EX",
    "도로 통제 구간을 피해 우회하세요.",
    "내비게이션에서 \"도로 통제 구간을 피해 우회하세요.\"라는 음성 안내가 나왔어요.",
    "Ứng dụng chỉ đường phát thông báo bằng giọng nói: \"Hãy đi đường vòng để tránh đoạn đường đang bị phong tỏa.\""
  ],
  [
    "EX",
    "응급 처치 방법을 알려 주세요.",
    "동료가 다쳤을 때 전화 상담원에게 \"응급 처치 방법을 알려 주세요.\"라고 요청했어요.",
    "Khi đồng nghiệp bị thương, tôi yêu cầu nhân viên tư vấn qua điện thoại: \"Xin hướng dẫn cách sơ cứu.\""
  ],
  [
    "EX",
    "구급함이 어디 있는지 아세요?",
    "체육관에서 작은 상처가 나서 직원에게 \"구급함이 어디 있는지 아세요?\"라고 물었어요.",
    "Khi bị một vết thương nhỏ ở phòng tập, tôi hỏi nhân viên: \"Bạn có biết hộp sơ cứu ở đâu không?\""
  ],
  [
    "EX",
    "물이 차오르기 전에 높은 곳으로 이동하세요.",
    "홍수 대비 교육에서 \"물이 차오르기 전에 높은 곳으로 이동하세요.\"라는 안내를 받았어요.",
    "Trong buổi hướng dẫn phòng tránh lũ lụt, chúng tôi được dặn: \"Hãy di chuyển lên nơi cao trước khi nước dâng.\""
  ],
  [
    "EX",
    "아이와 함께 대피소로 가고 있어요.",
    "가족에게 현재 위치를 알리며 \"아이와 함께 대피소로 가고 있어요.\"라고 연락했어요.",
    "Tôi liên lạc với gia đình để báo vị trí của mình: \"Tôi đang đưa con đến nơi trú ẩn.\""
  ],
  [
    "EX",
    "안전 문자를 받으면 내용을 끝까지 확인하세요.",
    "주민 안전 교육에서 \"안전 문자를 받으면 내용을 끝까지 확인하세요.\"라고 강조했어요.",
    "Trong buổi hướng dẫn an toàn cho cư dân, người hướng dẫn nhấn mạnh: \"Khi nhận được tin nhắn cảnh báo an toàn, hãy đọc hết nội dung.\""
  ],
  [
    "EX",
    "신고자의 위치를 정확히 말씀해 주세요.",
    "신고 전화를 받은 상담원이 \"신고자의 위치를 정확히 말씀해 주세요.\"라고 요청했어요.",
    "Nhân viên tổng đài tiếp nhận cuộc gọi báo sự cố yêu cầu: \"Vui lòng cho biết chính xác vị trí của người báo tin.\""
  ],
  [
    "EX",
    "피난 경로에 위험물이 있는지 확인해 주세요.",
    "대피 훈련을 준비하며 관리자에게 \"피난 경로에 위험물이 있는지 확인해 주세요.\"라고 부탁했어요.",
    "Khi chuẩn bị diễn tập sơ tán, tôi nhờ người quản lý: \"Vui lòng kiểm tra xem có vật nguy hiểm trên lối thoát nạn không.\""
  ],
  [
    "EX",
    "아침 약을 먹었는지 기억이 안 나요.",
    "진료실에서 의사에게 \"아침 약을 먹었는지 기억이 안 나요.\"라고 솔직하게 말했어요.",
    "Tại phòng khám, tôi nói thật với bác sĩ: \"Tôi không nhớ mình đã uống thuốc buổi sáng hay chưa.\""
  ],
  [
    "EX",
    "식사 전에 혈당을 측정해 주세요.",
    "간호사가 환자에게 \"식사 전에 혈당을 측정해 주세요.\"라고 안내했어요.",
    "Điều dưỡng hướng dẫn bệnh nhân: \"Vui lòng đo đường huyết trước bữa ăn.\""
  ],
  [
    "EX",
    "검사 결과를 이메일로 받을 수 있나요?",
    "검사 접수 창구에서 \"검사 결과를 이메일로 받을 수 있나요?\"라고 문의했어요.",
    "Tại quầy tiếp nhận xét nghiệm, tôi hỏi: \"Tôi có thể nhận kết quả xét nghiệm qua email không?\""
  ],
  [
    "EX",
    "진료 기록 사본을 발급받고 싶어요.",
    "병원 원무과에 가서 \"진료 기록 사본을 발급받고 싶어요.\"라고 말했어요.",
    "Tôi đến bộ phận hành chính của bệnh viện và nói: \"Tôi muốn xin bản sao hồ sơ khám chữa bệnh.\""
  ],
  [
    "EX",
    "이 약은 공복에 먹어도 괜찮나요?",
    "처방전을 받은 뒤 약사에게 \"이 약은 공복에 먹어도 괜찮나요?\"라고 물었어요.",
    "Sau khi nhận đơn thuốc, tôi hỏi dược sĩ: \"Tôi có thể uống thuốc này khi bụng đói không?\""
  ],
  [
    "EX",
    "복용 중인 약 목록을 가져왔어요.",
    "처음 만난 의사에게 \"복용 중인 약 목록을 가져왔어요.\"라고 말하며 메모를 건넸어요.",
    "Tôi đưa tờ ghi chú cho bác sĩ mới gặp và nói: \"Tôi đã mang theo danh sách các thuốc đang dùng.\""
  ],
  [
    "EX",
    "예약 시간을 삼십 분 늦춰도 될까요?",
    "병원에 전화해서 \"예약 시간을 삼십 분 늦춰도 될까요?\"라고 물었어요.",
    "Tôi gọi điện đến bệnh viện hỏi: \"Tôi có thể lùi giờ hẹn lại ba mươi phút không?\""
  ],
  [
    "EX",
    "증상이 시작된 날짜를 알려 주세요.",
    "진료를 시작하며 의사가 \"증상이 시작된 날짜를 알려 주세요.\"라고 물었어요.",
    "Khi bắt đầu khám, bác sĩ hỏi: \"Vui lòng cho biết ngày các triệu chứng bắt đầu xuất hiện.\""
  ],
  [
    "EX",
    "통증이 어느 부위에서 가장 심한가요?",
    "진찰 중 의사가 환자에게 \"통증이 어느 부위에서 가장 심한가요?\"라고 물었어요.",
    "Trong lúc khám, bác sĩ hỏi bệnh nhân: \"Cơn đau dữ dội nhất ở chỗ nào?\""
  ],
  [
    "EX",
    "알레르기 반응이 있으면 즉시 중단하세요.",
    "약사가 약 사용법을 설명하며 \"알레르기 반응이 있으면 즉시 중단하세요.\"라고 주의를 줬어요.",
    "Khi giải thích cách sử dụng thuốc, dược sĩ lưu ý: \"Nếu xuất hiện phản ứng dị ứng, hãy ngừng sử dụng ngay.\""
  ],
  [
    "EX",
    "오늘은 무리하지 말고 가볍게 걸어요.",
    "몸이 피곤하다는 친구에게 \"오늘은 무리하지 말고 가볍게 걸어요.\"라고 제안했어요.",
    "Tôi đề nghị người bạn đang mệt: \"Hôm nay đừng gắng sức, chỉ đi bộ nhẹ nhàng thôi.\""
  ],
  [
    "EX",
    "운동 후에는 종아리를 천천히 늘려 주세요.",
    "트레이너가 운동을 마치고 \"운동 후에는 종아리를 천천히 늘려 주세요.\"라고 설명했어요.",
    "Sau buổi tập, huấn luyện viên hướng dẫn: \"Sau khi tập, hãy từ từ giãn cơ bắp chân.\""
  ],
  [
    "EX",
    "물리 치료 예약을 변경하고 싶어요.",
    "병원 접수처에 전화해 \"물리 치료 예약을 변경하고 싶어요.\"라고 말했어요.",
    "Tôi gọi đến quầy tiếp nhận của bệnh viện và nói: \"Tôi muốn đổi lịch hẹn vật lý trị liệu.\""
  ],
  [
    "EX",
    "다음 검사 전에 금식해야 하나요?",
    "다음 진료를 예약하면서 \"다음 검사 전에 금식해야 하나요?\"라고 확인했어요.",
    "Khi đặt lịch khám tiếp theo, tôi hỏi lại: \"Tôi có cần nhịn ăn trước lần xét nghiệm tiếp theo không?\""
  ],
  [
    "EX",
    "혈압을 다시 한번 재 주세요.",
    "혈압 측정 결과를 보고 환자가 \"혈압을 다시 한번 재 주세요.\"라고 부탁했어요.",
    "Sau khi xem kết quả đo huyết áp, bệnh nhân nhờ: \"Vui lòng đo huyết áp cho tôi thêm một lần nữa.\""
  ],
  [
    "EX",
    "최근에 잠을 잘 못 자고 있어요.",
    "상담을 받으며 \"최근에 잠을 잘 못 자고 있어요.\"라고 이야기했어요.",
    "Trong buổi tư vấn, tôi chia sẻ: \"Gần đây tôi ngủ không ngon.\""
  ],
  [
    "EX",
    "오른쪽 어깨가 움직일 때 아파요.",
    "진료실에서 팔을 들어 보이며 \"오른쪽 어깨가 움직일 때 아파요.\"라고 설명했어요.",
    "Trong phòng khám, tôi giơ cánh tay lên và giải thích: \"Vai phải của tôi đau khi cử động.\""
  ],
  [
    "EN",
    "yawn",
    "I always yawn when I stay up too late.",
    "나는 너무 늦게 자면 꼭 하품이 나요."
  ],
  [
    "EN",
    "breathe",
    "Take a moment to breathe slowly before the test.",
    "시험을 보기 전에 잠시 천천히 숨을 쉬세요."
  ],
  [
    "EN",
    "blink",
    "Try not to blink while I take your picture.",
    "사진을 찍는 동안 눈을 깜박이지 않도록 해 보세요."
  ],
  [
    "EN",
    "wink",
    "Dad gave me a wink when our surprise worked.",
    "깜짝 이벤트가 성공하자 아빠가 나에게 윙크했어요."
  ],
  [
    "EN",
    "sniff",
    "The puppy began to sniff the new shoes by the door.",
    "강아지가 문 옆의 새 신발 냄새를 킁킁 맡기 시작했어요."
  ],
  [
    "EN",
    "stare",
    "It's rude to stare at someone on the bus.",
    "버스에서 누군가를 빤히 쳐다보는 건 무례해요."
  ],
  [
    "EN",
    "peek",
    "Don't peek at your birthday present yet.",
    "아직 생일 선물을 몰래 들여다보지 마세요."
  ],
  [
    "EN",
    "glance",
    "I took a quick glance at the clock before leaving.",
    "나가기 전에 시계를 잠깐 힐끗 봤어요."
  ],
  [
    "EN",
    "notice",
    "Did you notice the new painting on the wall?",
    "벽에 걸린 새 그림을 알아차렸나요?"
  ],
  [
    "EN",
    "imagine",
    "Imagine living in a house beside the sea.",
    "바닷가 집에서 사는 모습을 상상해 보세요."
  ],
  [
    "EN",
    "invent",
    "Our class tried to invent a game using paper cups.",
    "우리 반은 종이컵을 이용한 놀이를 발명해 보려고 했어요."
  ],
  [
    "EN",
    "sketch",
    "I like to sketch the trees in the park.",
    "나는 공원의 나무들을 간단히 스케치하는 걸 좋아해요."
  ],
  [
    "EN",
    "doodle",
    "I sometimes doodle little stars in my notebook.",
    "나는 가끔 공책에 작은 별을 끄적여요."
  ],
  [
    "EN",
    "wrap",
    "Can you help me wrap this gift for Grandma?",
    "할머니께 드릴 이 선물을 포장하는 걸 도와줄래요?"
  ],
  [
    "EN",
    "unwrap",
    "Please wait until everyone arrives to unwrap your gift.",
    "모두 도착할 때까지 기다렸다가 선물 포장을 풀어 주세요."
  ],
  [
    "EN",
    "tie",
    "Remember to tie your shoelaces before running.",
    "달리기 전에 신발 끈을 묶는 걸 잊지 마세요."
  ],
  [
    "EN",
    "untie",
    "I had to untie the ribbon to open the box.",
    "상자를 열려면 리본을 풀어야 했어요."
  ],
  [
    "EN",
    "knot",
    "Can you knot the end of this rope securely?",
    "이 밧줄 끝에 매듭을 단단히 묶어 줄 수 있나요?"
  ],
  [
    "EN",
    "zip",
    "Make sure you zip your coat before going outside.",
    "밖에 나가기 전에 외투 지퍼를 꼭 올리세요."
  ],
  [
    "EN",
    "unzip",
    "I couldn't unzip my backpack with my gloves on.",
    "장갑을 낀 채로는 배낭 지퍼를 열 수 없었어요."
  ],
  [
    "EN",
    "button",
    "It's getting cold, so button your jacket.",
    "추워지고 있으니 재킷 단추를 잠그세요."
  ],
  [
    "EN",
    "unbutton",
    "Please unbutton your sleeves before washing your hands.",
    "손을 씻기 전에 소매 단추를 풀어 주세요."
  ],
  [
    "EN",
    "buckle",
    "Buckle your seat belt before the car starts moving.",
    "차가 움직이기 전에 안전벨트 버클을 채우세요."
  ],
  [
    "EN",
    "fasten",
    "Please fasten the strap under your helmet.",
    "헬멧 아래쪽의 끈을 잠가 주세요."
  ],
  [
    "EN",
    "unlock",
    "I forgot the code to unlock my phone.",
    "휴대전화 잠금을 푸는 비밀번호를 잊어버렸어요."
  ],
  [
    "EN",
    "switch",
    "Switch the lamp on if it's too dark to read.",
    "책 읽기에 너무 어두우면 스탠드 스위치를 켜세요."
  ],
  [
    "EN",
    "plug",
    "Don't forget to plug the charger into the wall socket.",
    "충전기를 벽면 콘센트에 꽂는 걸 잊지 마세요."
  ],
  [
    "EN",
    "unplug",
    "Always unplug the toaster before cleaning it.",
    "토스터를 청소하기 전에는 반드시 플러그를 뽑으세요."
  ],
  [
    "EN",
    "press",
    "Press the green button to start the washing machine.",
    "세탁기를 작동하려면 초록색 버튼을 누르세요."
  ],
  [
    "EN",
    "click",
    "Click the blue icon to open your homework file.",
    "숙제 파일을 열려면 파란 아이콘을 클릭하세요."
  ],
  [
    "EN",
    "scroll",
    "Scroll down to see the rest of the pictures.",
    "나머지 사진을 보려면 화면을 아래로 내리세요."
  ],
  [
    "EN",
    "copy",
    "Please copy this sentence into your notebook.",
    "이 문장을 공책에 그대로 옮겨 적으세요."
  ],
  [
    "EN",
    "paste",
    "Copy the address and paste it into the message.",
    "주소를 복사해서 메시지에 붙여 넣으세요."
  ],
  [
    "EN",
    "delete",
    "Be careful not to delete the photos from our trip.",
    "우리 여행 사진을 실수로 삭제하지 않도록 조심하세요."
  ],
  [
    "EN",
    "upload",
    "You need to upload your assignment before Friday.",
    "금요일 전까지 과제를 업로드해야 해요."
  ],
  [
    "EN",
    "sign",
    "Please sign your name at the bottom of the form.",
    "서식 맨 아래에 서명해 주세요."
  ],
  [
    "EN",
    "mail",
    "I will mail the postcard to my friend tomorrow.",
    "내일 친구에게 엽서를 우편으로 보낼 거예요."
  ],
  [
    "EN",
    "text",
    "Text me when you arrive at the station.",
    "역에 도착하면 나에게 문자 보내 줘요."
  ],
  [
    "EN",
    "dial",
    "Dial the number shown on the notice board.",
    "게시판에 적힌 전화번호를 누르세요."
  ],
  [
    "EN",
    "hang",
    "Can you hang your wet coat by the door?",
    "젖은 외투를 문 옆에 걸어 줄래요?"
  ],
  [
    "EN",
    "clap",
    "Let's clap to the beat of the music.",
    "음악 박자에 맞춰 박수를 쳐 봅시다."
  ],
  [
    "EN",
    "applaud",
    "The audience stood up to applaud the young dancers.",
    "관객들은 어린 무용수들에게 박수갈채를 보내려고 일어섰어요."
  ],
  [
    "EN",
    "bow",
    "In the play, the actors bow to the audience at the end.",
    "연극이 끝나면 배우들이 관객에게 허리를 굽혀 인사해요."
  ],
  [
    "EN",
    "skip",
    "The little girl likes to skip along the path.",
    "그 어린 여자아이는 길을 따라 깡충깡충 뛰어다니는 걸 좋아해요."
  ],
  [
    "EN",
    "hop",
    "Can you hop on one foot all the way to the line?",
    "저 선까지 한 발로 깡충깡충 뛸 수 있나요?"
  ],
  [
    "EN",
    "leap",
    "Watch the deer leap over the fallen tree.",
    "사슴이 쓰러진 나무를 뛰어넘는 걸 보세요."
  ],
  [
    "EN",
    "creep",
    "We watched a caterpillar creep across the leaf.",
    "애벌레가 나뭇잎 위를 천천히 기어가는 모습을 봤어요."
  ],
  [
    "EN",
    "tiptoe",
    "We had to tiptoe past the sleeping baby.",
    "잠든 아기 옆을 발끝으로 살금살금 지나가야 했어요."
  ],
  [
    "EN",
    "sneak",
    "The cat tried to sneak into the kitchen unnoticed.",
    "고양이는 들키지 않고 부엌으로 몰래 들어가려고 했어요."
  ],
  [
    "EN",
    "stumble",
    "I started to stumble when my foot hit a rock.",
    "발이 돌에 부딪혀 비틀거리기 시작했어요."
  ],
  [
    "EN",
    "trip",
    "Be careful not to trip over the loose cable.",
    "바닥에 놓인 느슨한 전선에 발이 걸려 넘어지지 않도록 조심하세요."
  ],
  [
    "EN",
    "land",
    "Bend your knees when you land after a jump.",
    "점프한 뒤 착지할 때 무릎을 굽히세요."
  ],
  [
    "EN",
    "balance",
    "I can balance on one foot for ten seconds.",
    "나는 한 발로 10초 동안 균형을 잡을 수 있어요."
  ],
  [
    "EN",
    "tall",
    "My brother is tall enough to reach the top shelf.",
    "내 남동생은 키가 커서 맨 위 선반에 손이 닿아요."
  ],
  [
    "EN",
    "low",
    "The ceiling is so low that Dad has to bend down.",
    "천장이 너무 낮아서 아빠가 몸을 숙여야 해요."
  ],
  [
    "EN",
    "large",
    "We need a large bowl to mix all the ingredients.",
    "모든 재료를 섞으려면 큰 그릇이 필요해요."
  ],
  [
    "EN",
    "little",
    "A little bird was sitting outside my window.",
    "작은 새 한 마리가 내 창문 밖에 앉아 있었어요."
  ],
  [
    "EN",
    "full",
    "The bus was full, so we waited for the next one.",
    "버스가 가득 차서 다음 버스를 기다렸어요."
  ],
  [
    "EN",
    "empty",
    "This water bottle is empty; can you fill it?",
    "이 물병이 비었는데 물을 채워 줄래요?"
  ],
  [
    "EN",
    "sleepy",
    "I feel sleepy after a long day at school.",
    "학교에서 긴 하루를 보내고 나면 졸려요."
  ],
  [
    "EN",
    "sick",
    "She stayed home because she felt sick.",
    "그녀는 몸이 아파서 집에 있었어요."
  ],
  [
    "EN",
    "ill",
    "My uncle became ill during his trip and visited a doctor.",
    "삼촌은 여행 중 병이 나서 의사를 찾아갔어요."
  ],
  [
    "EN",
    "brave",
    "It was brave of her to tell the truth.",
    "진실을 말한 그녀는 정말 용감했어요."
  ],
  [
    "EN",
    "noisy",
    "The classroom gets noisy during group activities.",
    "조별 활동을 할 때 교실이 시끄러워져요."
  ],
  [
    "EN",
    "dark",
    "The trail gets dark quickly after sunset.",
    "해가 지면 산책로가 금세 어두워져요."
  ],
  [
    "EN",
    "light",
    "Open the curtains so the room feels light and bright.",
    "방이 밝아지도록 커튼을 열어 주세요."
  ],
  [
    "EN",
    "soft",
    "The baby's blanket feels soft against my cheek.",
    "아기 담요가 뺨에 닿으니 부드러워요."
  ],
  [
    "EN",
    "loud",
    "The music was too loud for us to talk.",
    "음악 소리가 너무 커서 대화할 수 없었어요."
  ],
  [
    "EN",
    "sweet",
    "These strawberries are sweet even without sugar.",
    "이 딸기는 설탕을 넣지 않아도 달아요."
  ],
  [
    "EN",
    "sour",
    "I made a face because the lemon was so sour.",
    "레몬이 너무 셔서 나도 모르게 얼굴을 찡그렸어요."
  ],
  [
    "EN",
    "seem",
    "You seem tired today; did you sleep well?",
    "오늘 피곤해 보이는데, 잠은 잘 잤어요?"
  ],
  [
    "EN",
    "thank",
    "Don't forget to thank your teacher for the extra help.",
    "추가로 도와주신 선생님께 감사 인사하는 걸 잊지 마세요."
  ],
  [
    "EN",
    "translate",
    "Could you translate this short email into Korean?",
    "이 짧은 이메일을 한국어로 번역해 줄 수 있나요?"
  ],
  [
    "EN",
    "waste",
    "Don't waste clean water while brushing your teeth.",
    "양치할 때 깨끗한 물을 낭비하지 마세요."
  ],
  [
    "EN",
    "wonder",
    "I wonder why the library is closed today.",
    "오늘 도서관이 왜 문을 닫았는지 궁금해요."
  ],
  [
    "EN",
    "belong",
    "This blue umbrella doesn't belong to me.",
    "이 파란 우산은 제 것이 아니에요."
  ],
  [
    "EN",
    "collect",
    "We collect used batteries at school for recycling.",
    "우리 학교에서는 재활용하려고 폐건전지를 모아요."
  ],
  [
    "EN",
    "deliver",
    "The company will deliver the furniture on Saturday.",
    "그 회사는 토요일에 가구를 배송할 거예요."
  ],
  [
    "EN",
    "handle",
    "Please handle the glass vase carefully.",
    "유리 꽃병을 조심해서 다뤄 주세요."
  ],
  [
    "EN",
    "lead",
    "Our guide will lead us through the old town.",
    "안내자가 우리를 이끌고 구시가지를 둘러볼 거예요."
  ],
  [
    "EN",
    "print",
    "Can you print two copies of the schedule?",
    "일정표를 두 부 인쇄해 줄래요?"
  ],
  [
    "EN",
    "raise",
    "Please raise your hand if you know the answer.",
    "정답을 알면 손을 들어 주세요."
  ],
  [
    "EN",
    "pack",
    "I need to pack my suitcase before the morning flight.",
    "아침 비행기를 타기 전에 여행 가방을 싸야 해요."
  ],
  [
    "EN",
    "remind",
    "Please remind me to buy milk on the way home.",
    "집에 오는 길에 우유를 사라고 나에게 알려 줘요."
  ],
  [
    "EN",
    "fold",
    "Fold the paper in half before cutting it.",
    "종이를 자르기 전에 반으로 접으세요."
  ],
  [
    "EN",
    "calculate",
    "We can calculate the total cost with a calculator.",
    "계산기로 총비용을 계산할 수 있어요."
  ],
  [
    "EN",
    "celebrate",
    "Our family will celebrate Grandma's birthday on Sunday.",
    "우리 가족은 일요일에 할머니 생신을 축하할 거예요."
  ],
  [
    "EN",
    "cancel",
    "I had to cancel my appointment because of a fever.",
    "열이 나서 예약을 취소해야 했어요."
  ],
  [
    "EN",
    "decorate",
    "We decorate the classroom with paper flowers every spring.",
    "우리는 매년 봄 종이꽃으로 교실을 장식해요."
  ],
  [
    "EN",
    "disagree",
    "It's okay to disagree, but please listen to the other person.",
    "의견이 달라도 괜찮지만 상대방의 말을 들어 주세요."
  ],
  [
    "EN",
    "download",
    "You can download the map before going offline.",
    "인터넷 연결을 끊기 전에 지도를 다운로드할 수 있어요."
  ],
  [
    "EN",
    "appreciate",
    "I really appreciate your help with the heavy boxes.",
    "무거운 상자를 옮기는 걸 도와주셔서 정말 감사해요."
  ],
  [
    "EN",
    "correct",
    "The teacher asked us to correct the spelling mistakes.",
    "선생님은 우리에게 철자 오류를 고치라고 하셨어요."
  ],
  [
    "EN",
    "destroy",
    "The storm could destroy the small wooden bridge.",
    "폭풍이 작은 나무다리를 파괴할 수도 있어요."
  ],
  [
    "EN",
    "browse",
    "I like to browse the shelves before choosing a book.",
    "나는 책을 고르기 전에 서가를 둘러보는 걸 좋아해요."
  ],
  [
    "EN",
    "camp",
    "We plan to camp beside the lake this weekend.",
    "우리는 이번 주말에 호숫가에서 야영할 계획이에요."
  ],
  [
    "EN",
    "erase",
    "Use a soft eraser to erase the pencil marks.",
    "부드러운 지우개로 연필 자국을 지우세요."
  ],
  [
    "EN",
    "hike",
    "We usually hike in the mountains when the weather is cool.",
    "우리는 날씨가 선선할 때 보통 산에서 하이킹해요."
  ],
  [
    "EN",
    "kneel",
    "The gardener had to kneel to plant the flowers.",
    "정원사는 꽃을 심기 위해 무릎을 꿇어야 했어요."
  ],
  [
    "EN",
    "mend",
    "Grandma showed me how to mend a hole in my sock.",
    "할머니가 양말의 구멍을 꿰매어 수선하는 방법을 보여 주셨어요."
  ],
  [
    "EN",
    "admire",
    "I admire my sister for working hard to reach her goal.",
    "목표를 이루려고 열심히 노력하는 언니가 존경스러워요."
  ],
  [
    "EN",
    "admit",
    "He finally had to admit that he had broken the cup.",
    "그는 결국 자신이 컵을 깼다고 인정해야 했어요."
  ],
  [
    "EN",
    "concentrate",
    "It's hard to concentrate when the television is on.",
    "텔레비전이 켜져 있으면 집중하기 어려워요."
  ],
  [
    "EN",
    "cooperate",
    "The students must cooperate to finish the group project.",
    "학생들은 조별 과제를 끝내려면 협력해야 해요."
  ],
  [
    "EN",
    "judge",
    "Don't judge someone by their clothes alone.",
    "옷차림만 보고 사람을 판단하지 마세요."
  ],
  [
    "EN",
    "prefer",
    "I prefer walking to school when it isn't raining.",
    "비가 오지 않을 때는 걸어서 학교에 가는 편을 더 좋아해요."
  ],
  [
    "EN",
    "approve",
    "The principal must approve our plan for the school trip.",
    "교장 선생님이 수학여행 계획을 승인해야 해요."
  ],
  [
    "EN",
    "attach",
    "Please attach a photo of the receipt to your email.",
    "이메일에 영수증 사진을 첨부해 주세요."
  ],
  [
    "EN",
    "disappear",
    "The rainbow began to disappear behind the clouds.",
    "무지개가 구름 뒤로 사라지기 시작했어요."
  ],
  [
    "EN",
    "earn",
    "She works on weekends to earn money for college.",
    "그녀는 대학 학비를 벌기 위해 주말에 일해요."
  ],
  [
    "EN",
    "educate",
    "The program aims to educate children about road safety.",
    "그 프로그램은 아이들에게 교통안전을 교육하는 것을 목표로 해요."
  ],
  [
    "EN",
    "graduate",
    "My cousin will graduate from high school next February.",
    "사촌은 내년 2월에 고등학교를 졸업할 거예요."
  ],
  [
    "EN",
    "take part",
    "Would you like to take part in the school talent show?",
    "학교 장기 자랑에 참여하고 싶나요?"
  ],
  [
    "EN",
    "mention",
    "She didn't mention the schedule change during the meeting.",
    "그녀는 회의 중에 일정 변경을 언급하지 않았어요."
  ],
  [
    "EN",
    "plan",
    "Let's plan our trip before booking the hotel.",
    "호텔을 예약하기 전에 여행을 계획해 봐요."
  ],
  [
    "EN",
    "register",
    "You need to register online before attending the class.",
    "수업에 참석하려면 미리 온라인으로 등록해야 해요."
  ],
  [
    "EN",
    "relax",
    "I like to relax with a book after dinner.",
    "나는 저녁을 먹고 책을 읽으며 쉬는 걸 좋아해요."
  ],
  [
    "EN",
    "remove",
    "Please remove your shoes before entering the room.",
    "방에 들어가기 전에 신발을 벗어 주세요."
  ],
  [
    "EN",
    "rent",
    "We decided to rent bicycles for the afternoon.",
    "우리는 오후 동안 자전거를 빌리기로 했어요."
  ],
  [
    "EN",
    "reserve",
    "I'd like to reserve a table for four at seven.",
    "일곱 시에 네 명이 앉을 자리를 예약하고 싶어요."
  ],
  [
    "EN",
    "accompany",
    "A parent must accompany children under ten on this tour.",
    "이 투어에는 열 살 미만 어린이가 보호자와 동행해야 해요."
  ],
  [
    "EN",
    "advertise",
    "The café will advertise its new menu on social media.",
    "카페는 새 메뉴를 소셜 미디어에 광고할 거예요."
  ],
  [
    "EN",
    "afford",
    "I can't afford a new laptop this month.",
    "이번 달에는 새 노트북을 살 형편이 안 돼요."
  ],
  [
    "EN",
    "assist",
    "A staff member will assist you with your luggage.",
    "직원이 짐을 옮기는 것을 도와드릴 거예요."
  ],
  [
    "EN",
    "attempt",
    "Don't attempt to repair the broken outlet yourself.",
    "고장 난 콘센트를 직접 수리하려고 시도하지 마세요."
  ],
  [
    "EN",
    "blame",
    "It's unfair to blame her for a mistake we all made.",
    "우리 모두가 저지른 실수를 그녀 탓으로 돌리는 건 불공평해요."
  ],
  [
    "EN",
    "compete",
    "Our team will compete against three other schools.",
    "우리 팀은 다른 세 학교와 겨룰 거예요."
  ],
  [
    "EN",
    "compliment",
    "I wanted to compliment the chef on the delicious soup.",
    "맛있는 수프를 만든 요리사에게 칭찬을 전하고 싶었어요."
  ],
  [
    "EN",
    "cycle",
    "Many people cycle along the river on sunny days.",
    "맑은 날에는 많은 사람이 강변에서 자전거를 타요."
  ],
  [
    "EN",
    "disappoint",
    "I don't want to disappoint my parents by breaking my promise.",
    "약속을 어겨 부모님을 실망시키고 싶지 않아요."
  ],
  [
    "EN",
    "display",
    "The museum will display children's artwork this month.",
    "그 박물관은 이번 달에 어린이들의 미술 작품을 전시할 거예요."
  ],
  [
    "EN",
    "encounter",
    "We might encounter wild animals on the forest trail.",
    "숲길에서 야생동물을 마주칠 수도 있어요."
  ],
  [
    "EN",
    "entertain",
    "The magician came to entertain the children at the party.",
    "마술사가 파티에서 아이들을 즐겁게 해 주려고 왔어요."
  ],
  [
    "EN",
    "hesitate",
    "Don't hesitate to ask questions if you're confused.",
    "헷갈리는 점이 있으면 주저하지 말고 질문하세요."
  ],
  [
    "EN",
    "inspire",
    "Her story may inspire others to try again.",
    "그녀의 이야기가 다른 사람들이 다시 도전하도록 영감을 줄 수도 있어요."
  ],
  [
    "EN",
    "interrupt",
    "Please don't interrupt your friend while she's speaking.",
    "친구가 말하는 동안 끼어들지 마세요."
  ],
  [
    "EN",
    "locate",
    "We used a map to locate the nearest pharmacy.",
    "우리는 지도로 가장 가까운 약국의 위치를 찾았어요."
  ],
  [
    "EN",
    "marry",
    "They plan to marry next spring after finishing school.",
    "그들은 학교를 마친 뒤 내년 봄에 결혼할 계획이에요."
  ],
  [
    "EN",
    "obey",
    "Drivers must obey traffic signals even late at night.",
    "운전자는 밤늦게도 교통 신호를 따라야 해요."
  ],
  [
    "EN",
    "react",
    "How did your brother react when he heard the good news?",
    "좋은 소식을 들었을 때 남동생이 어떻게 반응했나요?"
  ],
  [
    "EN",
    "reform",
    "The city announced a reform of its public transport system.",
    "시는 대중교통 시스템의 개혁안을 발표했어요."
  ],
  [
    "EN",
    "constitution",
    "The constitution protects basic rights such as freedom of expression.",
    "헌법은 표현의 자유와 같은 기본권을 보호해요."
  ],
  [
    "EN",
    "legislation",
    "New legislation will require restaurants to show allergen information.",
    "새 법률에 따라 식당은 알레르기 유발 물질 정보를 표시해야 해요."
  ],
  [
    "EN",
    "jurisdiction",
    "The local court has jurisdiction over cases filed in this district.",
    "지역 법원은 이 구역에서 제기된 사건에 대한 관할권이 있어요."
  ],
  [
    "EN",
    "sovereignty",
    "The treaty recognizes the sovereignty of both countries.",
    "그 조약은 두 나라의 주권을 인정해요."
  ],
  [
    "EN",
    "democracy",
    "In a democracy, citizens can influence government through elections.",
    "민주주의에서는 시민이 선거를 통해 정부에 영향을 미칠 수 있어요."
  ],
  [
    "EN",
    "citizenship",
    "She applied for citizenship after living in the country for many years.",
    "그녀는 그 나라에서 오랫동안 산 뒤 시민권을 신청했어요."
  ],
  [
    "EN",
    "representation",
    "The committee needs better representation of younger residents.",
    "그 위원회에는 젊은 주민들의 의견을 대변할 사람이 더 필요해요."
  ],
  [
    "EN",
    "constituency",
    "The candidate visited schools across her constituency.",
    "그 후보는 자신의 선거구에 있는 학교들을 방문했어요."
  ],
  [
    "EN",
    "referendum",
    "Voters will decide the proposed change in a national referendum.",
    "유권자들은 국민투표에서 제안된 변경안을 결정할 거예요."
  ],
  [
    "EN",
    "coalition",
    "Three parties formed a coalition to support the new budget.",
    "세 정당이 새 예산안을 지지하기 위해 연합했어요."
  ],
  [
    "EN",
    "bureaucracy",
    "Too much bureaucracy can delay a simple permit application.",
    "지나치게 복잡한 관료적 절차는 간단한 허가 신청도 지연시킬 수 있어요."
  ],
  [
    "EN",
    "administration",
    "The new administration introduced a plan to improve public housing.",
    "새 행정부는 공공주택 개선 계획을 도입했어요."
  ],
  [
    "EN",
    "diplomacy",
    "The dispute was resolved through diplomacy rather than military force.",
    "그 분쟁은 군사력이 아닌 외교로 해결됐어요."
  ],
  [
    "EN",
    "negotiation",
    "After weeks of negotiation, the two sides reached an agreement.",
    "몇 주간의 협상 끝에 양측은 합의에 도달했어요."
  ],
  [
    "EN",
    "mediation",
    "Both neighbors agreed to mediation over the noise dispute.",
    "두 이웃은 소음 분쟁에 대해 조정을 받기로 합의했어요."
  ],
  [
    "EN",
    "sanction",
    "The organization imposed a sanction for repeated violations of its rules.",
    "그 단체는 규칙을 반복해서 위반한 데 대해 제재를 부과했어요."
  ],
  [
    "EN",
    "treaty",
    "The countries signed a treaty to protect the shared river.",
    "그 나라들은 공동으로 이용하는 강을 보호하기 위한 조약에 서명했어요."
  ],
  [
    "EN",
    "alliance",
    "The two companies formed an alliance to develop safer batteries.",
    "두 회사는 더 안전한 배터리를 개발하려고 협력 동맹을 맺었어요."
  ],
  [
    "EN",
    "federation",
    "In a federation, power is divided between central and regional governments.",
    "연방에서는 중앙정부와 지역정부가 권한을 나누어 가져요."
  ],
  [
    "EN",
    "municipality",
    "Our municipality collects food waste separately from other garbage.",
    "우리 지방자치단체는 음식물 쓰레기를 다른 쓰레기와 분리 수거해요."
  ],
  [
    "EN",
    "suffrage",
    "The exhibition traces the history of women's suffrage in the country.",
    "그 전시는 그 나라 여성 참정권의 역사를 살펴봐요."
  ],
  [
    "EN",
    "economics",
    "She chose to study economics to understand how markets work.",
    "그녀는 시장의 작동 원리를 이해하려고 경제학을 공부하기로 했어요."
  ],
  [
    "EN",
    "inflation",
    "High inflation has made groceries more expensive this year.",
    "높은 물가 상승률 때문에 올해 식료품 가격이 더 비싸졌어요."
  ],
  [
    "EN",
    "recession",
    "During a recession, businesses may cut spending and hiring.",
    "경기 침체기에는 기업들이 지출과 채용을 줄일 수 있어요."
  ],
  [
    "EN",
    "prosperity",
    "The port helped bring prosperity to the small coastal town.",
    "그 항구는 작은 해안 마을의 번영에 기여했어요."
  ],
  [
    "EN",
    "revenue",
    "Ticket sales provide most of the museum's annual revenue.",
    "입장권 판매는 박물관 연간 수익의 대부분을 차지해요."
  ],
  [
    "EN",
    "expenditure",
    "The report lists monthly expenditure on rent and utilities.",
    "그 보고서에는 월세와 공과금에 대한 월별 지출이 나와 있어요."
  ],
  [
    "EN",
    "deficit",
    "The city reduced its budget deficit by cutting unnecessary costs.",
    "시는 불필요한 비용을 줄여 예산 적자를 축소했어요."
  ],
  [
    "EN",
    "surplus",
    "A budget surplus allowed the school to buy new computers.",
    "예산 흑자 덕분에 학교는 새 컴퓨터를 살 수 있었어요."
  ],
  [
    "EN",
    "commodity",
    "Coffee is an important agricultural commodity in many countries.",
    "커피는 여러 나라에서 중요한 농산물 상품이에요."
  ],
  [
    "EN",
    "transaction",
    "Check the transaction details before confirming the payment.",
    "결제를 확정하기 전에 거래 내역을 확인하세요."
  ],
  [
    "EN",
    "investment",
    "Buying equipment was a major investment for the small bakery.",
    "장비 구입은 작은 빵집에 큰 투자였어요."
  ],
  [
    "EN",
    "portfolio",
    "She reviewed her investment portfolio after the market fell.",
    "그녀는 시장이 하락한 뒤 자신의 투자 포트폴리오를 점검했어요."
  ],
  [
    "EN",
    "equity",
    "The founder invested more money to increase the company's equity.",
    "창업자는 회사의 자기자본을 늘리려고 추가 자금을 투자했어요."
  ],
  [
    "EX",
    "처방된 연고를 하루 두 번 바르세요.",
    "약사는 사용법을 설명하며 \"처방된 연고를 하루 두 번 바르세요.\"라고 안내했어요.",
    "Dược sĩ hướng dẫn cách sử dụng và nói: \"Hãy bôi thuốc mỡ được kê đơn hai lần mỗi ngày.\""
  ],
  [
    "EX",
    "기침이 심해져서 다시 진료받으러 왔어요.",
    "진료실에 들어가 의사에게 \"기침이 심해져서 다시 진료받으러 왔어요.\"라고 설명했어요.",
    "Khi vào phòng khám, tôi giải thích với bác sĩ: \"Tôi quay lại khám vì cơn ho nặng hơn.\""
  ],
  [
    "EX",
    "운동 전후에 물을 충분히 마셔요.",
    "체육 선생님이 학생들에게 \"운동 전후에 물을 충분히 마셔요.\"라고 당부했어요.",
    "Giáo viên thể dục dặn học sinh: \"Hãy uống đủ nước trước và sau khi tập.\""
  ],
  [
    "EX",
    "오늘 몸 상태를 점수로 기록해 볼게요.",
    "운동 일지를 쓰면서 \"오늘 몸 상태를 점수로 기록해 볼게요.\"라고 트레이너에게 말했어요.",
    "Khi ghi nhật ký tập luyện, tôi nói với huấn luyện viên: \"Hôm nay tôi sẽ thử đánh giá tình trạng cơ thể của mình bằng điểm số.\""
  ],
  [
    "EX",
    "식단에서 나트륨을 줄이고 싶어요.",
    "영양 상담을 받으며 \"식단에서 나트륨을 줄이고 싶어요.\"라고 이야기했어요.",
    "Trong buổi tư vấn dinh dưỡng, tôi nói: \"Tôi muốn giảm lượng natri trong chế độ ăn của mình.\""
  ],
  [
    "EX",
    "검사 전에 액세서리를 빼 주세요.",
    "검사실 직원이 목걸이와 귀걸이를 가리키며 \"검사 전에 액세서리를 빼 주세요.\"라고 말했어요.",
    "Nhân viên phòng kiểm tra chỉ vào vòng cổ và khuyên tai rồi nói: \"Vui lòng tháo phụ kiện trước khi kiểm tra.\""
  ],
  [
    "EX",
    "예방접종 후에는 잠시 대기해 주세요.",
    "간호사가 접종을 마친 사람들에게 \"예방접종 후에는 잠시 대기해 주세요.\"라고 안내했어요.",
    "Điều dưỡng hướng dẫn những người vừa tiêm chủng: \"Vui lòng ở lại chờ một lát sau khi tiêm.\""
  ],
  [
    "EX",
    "이 증상이 약 부작용일 수 있나요?",
    "새 약을 먹은 뒤 발진이 생겨서 의사에게 \"이 증상이 약 부작용일 수 있나요?\"라고 물었어요.",
    "Sau khi uống thuốc mới, tôi bị phát ban nên hỏi bác sĩ: \"Triệu chứng này có thể là tác dụng phụ của thuốc không?\""
  ],
  [
    "EX",
    "환자 이름과 생년월일을 확인해 주세요.",
    "접수 담당자가 서류를 건네며 \"환자 이름과 생년월일을 확인해 주세요.\"라고 부탁했어요.",
    "Nhân viên tiếp nhận đưa giấy tờ và nói: \"Vui lòng kiểm tra họ tên và ngày sinh của bệnh nhân.\""
  ],
  [
    "EX",
    "휴식 시간을 조금 더 늘려도 될까요?",
    "운동 중 숨이 차서 코치에게 \"휴식 시간을 조금 더 늘려도 될까요?\"라고 요청했어요.",
    "Trong lúc tập, tôi bị hụt hơi nên hỏi huấn luyện viên: \"Tôi có thể nghỉ lâu hơn một chút được không?\""
  ],
  [
    "EX",
    "통증이 가라앉을 때까지 찜질해 주세요.",
    "치료사가 보호자에게 \"통증이 가라앉을 때까지 찜질해 주세요.\"라고 안내했어요.",
    "Chuyên viên trị liệu hướng dẫn người nhà: \"Hãy chườm cho đến khi cơn đau dịu xuống.\""
  ],
  [
    "EX",
    "운동 강도를 한 단계 낮춰 주세요.",
    "무릎이 불편해서 트레이너에게 \"운동 강도를 한 단계 낮춰 주세요.\"라고 말했어요.",
    "Vì đầu gối khó chịu, tôi nói với huấn luyện viên: \"Vui lòng giảm cường độ tập xuống một mức.\""
  ],
  [
    "EX",
    "응급 연락처가 바뀌었어요.",
    "회사 인사 담당자에게 \"응급 연락처가 바뀌었어요.\"라고 알리고 새 번호를 전달했어요.",
    "Tôi thông báo với bộ phận nhân sự: \"Thông tin liên lạc khẩn cấp của tôi đã thay đổi\", rồi cung cấp số mới."
  ],
  [
    "EX",
    "화면 밝기를 조금 낮춰 주세요.",
    "불을 끈 방에서 영화를 보다가 \"화면 밝기를 조금 낮춰 주세요.\"라고 부탁했어요.",
    "Khi xem phim trong phòng tối, tôi nhờ: \"Vui lòng giảm độ sáng màn hình xuống một chút.\""
  ],
  [
    "EX",
    "앱을 최신 버전으로 업데이트했어요.",
    "오류가 해결됐는지 확인하며 친구에게 \"앱을 최신 버전으로 업데이트했어요.\"라고 말했어요.",
    "Trong lúc kiểm tra xem lỗi đã được khắc phục chưa, tôi nói với bạn: \"Tôi đã cập nhật ứng dụng lên phiên bản mới nhất.\""
  ],
  [
    "EX",
    "로그인 코드를 다시 보내 주세요.",
    "인증 문자가 오지 않아서 고객센터에 \"로그인 코드를 다시 보내 주세요.\"라고 요청했어요.",
    "Vì không nhận được tin nhắn xác minh, tôi yêu cầu bộ phận hỗ trợ: \"Vui lòng gửi lại mã đăng nhập.\""
  ],
  [
    "EX",
    "첨부 파일이 열리지 않아요.",
    "이메일을 확인하다가 동료에게 \"첨부 파일이 열리지 않아요.\"라고 연락했어요.",
    "Khi kiểm tra email, tôi liên lạc với đồng nghiệp và nói: \"Tệp đính kèm không mở được.\""
  ],
  [
    "EX",
    "문서를 PDF로 저장해 주실래요?",
    "서류를 공유하기 전에 동료에게 \"문서를 PDF로 저장해 주실래요?\"라고 부탁했어요.",
    "Trước khi chia sẻ tài liệu, tôi nhờ đồng nghiệp: \"Bạn có thể lưu tài liệu thành PDF giúp tôi không?\""
  ],
  [
    "EX",
    "자동 저장 기능을 켜 두세요.",
    "작업 파일을 잃어버리지 않도록 선배가 \"자동 저장 기능을 켜 두세요.\"라고 조언했어요.",
    "Để tránh mất tệp đang làm việc, đồng nghiệp đi trước khuyên tôi: \"Hãy bật tính năng tự động lưu.\""
  ],
  [
    "EX",
    "파일 이름에 날짜를 넣어 주세요.",
    "보고서를 구별하기 쉽게 팀장이 \"파일 이름에 날짜를 넣어 주세요.\"라고 요청했어요.",
    "Để dễ phân biệt các báo cáo, trưởng nhóm yêu cầu: \"Vui lòng thêm ngày tháng vào tên tệp.\""
  ],
  [
    "EX",
    "공유 링크에 만료일을 설정했어요.",
    "외부 업체에 자료를 보내며 \"공유 링크에 만료일을 설정했어요.\"라고 덧붙였어요.",
    "Khi gửi tài liệu cho công ty đối tác, tôi nói thêm: \"Tôi đã đặt ngày hết hạn cho liên kết chia sẻ.\""
  ],
  [
    "EX",
    "비밀번호 재설정 링크가 만료됐어요.",
    "계정에 다시 접속하려다 \"비밀번호 재설정 링크가 만료됐어요.\"라고 고객센터에 알렸어요.",
    "Khi cố đăng nhập lại vào tài khoản, tôi báo cho bộ phận hỗ trợ: \"Liên kết đặt lại mật khẩu đã hết hạn.\""
  ],
  [
    "EX",
    "계정에 다른 기기가 접속했어요.",
    "보안 알림을 보고 가족에게 \"계정에 다른 기기가 접속했어요.\"라고 말했어요.",
    "Sau khi thấy cảnh báo bảo mật, tôi nói với gia đình: \"Một thiết bị khác đã đăng nhập vào tài khoản.\""
  ],
  [
    "EX",
    "알림을 잠시 무음으로 바꿀게요.",
    "회의가 시작되자 \"알림을 잠시 무음으로 바꿀게요.\"라고 말하고 휴대전화를 설정했어요.",
    "Khi cuộc họp bắt đầu, tôi nói: \"Tôi sẽ tạm chuyển thông báo sang chế độ im lặng\", rồi chỉnh điện thoại."
  ],
  [
    "EX",
    "영상 자막을 켜 주실 수 있나요?",
    "강의 소리가 잘 들리지 않아 \"영상 자막을 켜 주실 수 있나요?\"라고 진행자에게 물었어요.",
    "Vì không nghe rõ âm thanh bài giảng, tôi hỏi người điều hành: \"Bạn có thể bật phụ đề video giúp tôi không?\""
  ],
  [
    "EX",
    "회의 링크가 작동하지 않아요.",
    "화상회의에 들어갈 수 없어 팀원에게 \"회의 링크가 작동하지 않아요.\"라고 메시지를 보냈어요.",
    "Vì không vào được cuộc họp trực tuyến, tôi nhắn cho đồng đội: \"Liên kết cuộc họp không hoạt động.\""
  ],
  [
    "EX",
    "화면을 확대해서 글자를 크게 보여 주세요.",
    "뒷자리에 앉은 사람이 발표자에게 \"화면을 확대해서 글자를 크게 보여 주세요.\"라고 부탁했어요.",
    "Một người ngồi hàng ghế sau nhờ người thuyết trình: \"Vui lòng phóng to màn hình để chữ hiển thị lớn hơn.\""
  ],
  [
    "EX",
    "데이터가 동기화될 때까지 기다려 주세요.",
    "앱을 처음 실행하자 \"데이터가 동기화될 때까지 기다려 주세요.\"라는 안내가 나타났어요.",
    "Khi tôi mở ứng dụng lần đầu, thông báo hiện lên: \"Vui lòng chờ cho đến khi dữ liệu được đồng bộ.\""
  ],
  [
    "EX",
    "와이파이가 연결됐는데 인터넷이 안 돼요.",
    "카페 직원에게 \"와이파이가 연결됐는데 인터넷이 안 돼요.\"라고 도움을 요청했어요.",
    "Tôi nhờ nhân viên quán cà phê giúp đỡ: \"Wi-Fi đã kết nối nhưng tôi không vào mạng được.\""
  ],
  [
    "EX",
    "저장 공간이 부족하다는 알림이 떠요.",
    "휴대전화로 사진을 찍으려는데 \"저장 공간이 부족하다는 알림이 떠요.\"라고 친구에게 말했어요.",
    "Khi định chụp ảnh bằng điện thoại, tôi nói với bạn: \"Điện thoại hiện thông báo không đủ dung lượng lưu trữ.\""
  ],
  [
    "EX",
    "이 페이지를 즐겨찾기에 추가해 주세요.",
    "나중에 다시 찾을 수 있도록 \"이 페이지를 즐겨찾기에 추가해 주세요.\"라고 동료에게 부탁했어요.",
    "Để có thể tìm lại sau, tôi nhờ đồng nghiệp: \"Vui lòng thêm trang này vào mục yêu thích.\""
  ],
  [
    "EX",
    "사진의 위치 정보는 삭제해 주세요.",
    "사진을 공개하기 전에 담당자에게 \"사진의 위치 정보는 삭제해 주세요.\"라고 요청했어요.",
    "Trước khi công khai ảnh, tôi yêu cầu người phụ trách: \"Vui lòng xóa thông tin vị trí khỏi ảnh.\""
  ],
  [
    "EX",
    "마이크 접근을 허용해야 하나요?",
    "음성 녹음 기능을 처음 사용하며 \"마이크 접근을 허용해야 하나요?\"라고 물었어요.",
    "Khi dùng chức năng ghi âm lần đầu, tôi hỏi: \"Tôi có cần cho phép truy cập micrô không?\""
  ],
  [
    "EX",
    "음성 메시지를 천천히 다시 들어 볼게요.",
    "말이 너무 빨라서 \"음성 메시지를 천천히 다시 들어 볼게요.\"라고 말하고 재생 속도를 낮췄어요.",
    "Vì người nói quá nhanh, tôi nói: \"Tôi sẽ nghe lại tin nhắn thoại với tốc độ chậm hơn\", rồi giảm tốc độ phát."
  ],
  [
    "EX",
    "삭제한 파일을 복구할 수 있나요?",
    "중요한 자료를 실수로 지워서 \"삭제한 파일을 복구할 수 있나요?\"라고 관리자에게 문의했어요.",
    "Vì lỡ xóa tài liệu quan trọng, tôi hỏi quản trị viên: \"Có thể khôi phục tệp đã xóa không?\""
  ],
  [
    "EN",
    "salty",
    "This soup is too salty for me.",
    "이 수프는 제 입맛에는 너무 짜요."
  ],
  [
    "EN",
    "spicy",
    "Is this curry very spicy?",
    "이 카레는 많이 매운가요?"
  ],
  [
    "EN",
    "fresh",
    "We bought fresh strawberries at the market.",
    "우리는 시장에서 신선한 딸기를 샀어요."
  ],
  [
    "EN",
    "delicious",
    "The noodles you made were delicious.",
    "네가 만든 국수가 정말 맛있었어."
  ],
  [
    "EN",
    "favorite",
    "My favorite season is autumn.",
    "제가 가장 좋아하는 계절은 가을이에요."
  ],
  [
    "EN",
    "next",
    "The next bus arrives in ten minutes.",
    "다음 버스는 10분 뒤에 도착해요."
  ],
  [
    "EN",
    "last",
    "I missed the last train home.",
    "집에 가는 마지막 기차를 놓쳤어요."
  ],
  [
    "EN",
    "early",
    "We arrived early to get good seats.",
    "좋은 자리를 잡으려고 일찍 도착했어요."
  ],
  [
    "EN",
    "late",
    "I'm sorry I'm late for class.",
    "수업에 늦어서 죄송해요."
  ],
  [
    "EN",
    "right",
    "Turn right at the traffic light.",
    "신호등에서 오른쪽으로 도세요."
  ],
  [
    "EN",
    "wrong",
    "I wrote the wrong address on the package.",
    "소포에 주소를 잘못 적었어요."
  ],
  [
    "EN",
    "messy",
    "Please clean your messy desk before dinner.",
    "저녁 먹기 전에 어질러진 책상을 치워 주세요."
  ],
  [
    "EN",
    "awake",
    "Are you still awake at this hour?",
    "이 시간까지 아직 깨어 있어?"
  ],
  [
    "EN",
    "asleep",
    "The baby fell asleep in the car.",
    "아기가 차 안에서 잠들었어요."
  ],
  [
    "EN",
    "deaf",
    "My uncle is deaf, so we often communicate in sign language.",
    "우리 삼촌은 청각장애가 있어서 우리는 자주 수어로 대화해요."
  ],
  [
    "EN",
    "well",
    "I wasn't feeling well, so I went home early.",
    "몸이 좋지 않아서 일찍 집에 갔어요."
  ],
  [
    "EN",
    "crowded",
    "The subway was crowded during rush hour.",
    "출퇴근 시간에는 지하철이 붐볐어요."
  ],
  [
    "EN",
    "polite",
    "It's polite to say thank you when someone helps you.",
    "누군가 도와주면 고맙다고 말하는 게 예의예요."
  ],
  [
    "EN",
    "rude",
    "It's rude to interrupt someone while they're speaking.",
    "다른 사람이 말하는 도중에 끼어드는 건 무례해요."
  ],
  [
    "EN",
    "patient",
    "Our teacher was patient when I asked the same question again.",
    "제가 같은 질문을 다시 했을 때도 선생님은 참을성 있게 기다려 주셨어요."
  ],
  [
    "EN",
    "unkind",
    "It was unkind to laugh at his mistake.",
    "그의 실수를 비웃은 건 불친절한 행동이었어요."
  ],
  [
    "EN",
    "lonely",
    "She felt lonely after moving to a new city.",
    "그녀는 낯선 도시로 이사한 뒤 외로움을 느꼈어요."
  ],
  [
    "EN",
    "jealous",
    "He felt jealous when his friend won the prize.",
    "친구가 상을 받자 그는 질투가 났어요."
  ],
  [
    "EN",
    "relaxed",
    "I feel relaxed after taking a warm bath.",
    "따뜻한 목욕을 하고 나면 마음이 편안해져요."
  ],
  [
    "EN",
    "foolish",
    "It would be foolish to go hiking without water.",
    "물도 없이 등산하는 건 어리석은 일이에요."
  ],
  [
    "EN",
    "fair",
    "The teacher made sure the rules were fair to everyone.",
    "선생님은 규칙이 모두에게 공정하도록 신경 쓰셨어요."
  ],
  [
    "EN",
    "unfair",
    "It seems unfair that only one team gets extra time.",
    "한 팀만 추가 시간을 받는 건 불공평해 보여요."
  ],
  [
    "EN",
    "useless",
    "This flashlight is useless without batteries.",
    "이 손전등은 건전지가 없으면 쓸모가 없어요."
  ],
  [
    "EN",
    "impossible",
    "It's impossible to finish this puzzle in one minute.",
    "이 퍼즐을 1분 안에 끝내는 건 불가능해요."
  ],
  [
    "EN",
    "busy",
    "I'm busy preparing for tomorrow's exam.",
    "내일 시험을 준비하느라 바빠요."
  ],
  [
    "EN",
    "free",
    "The public library offers free English classes on weekends.",
    "공공 도서관에서는 주말에 무료 영어 수업을 제공해요."
  ],
  [
    "EN",
    "quick",
    "Let's take a quick break before the next lesson.",
    "다음 수업 전에 잠깐 쉬어요."
  ],
  [
    "EN",
    "heavy",
    "This suitcase is too heavy for me to lift.",
    "이 여행 가방은 너무 무거워서 제가 들 수 없어요."
  ],
  [
    "EN",
    "thick",
    "The book is thick, but the story is exciting.",
    "이 책은 두껍지만 이야기가 재미있어요."
  ],
  [
    "EN",
    "thin",
    "Wear another jacket; that sweater is too thin.",
    "스웨터가 너무 얇으니 재킷을 하나 더 입으세요."
  ],
  [
    "EN",
    "wide",
    "The river is too wide to swim across safely.",
    "그 강은 너무 넓어서 안전하게 헤엄쳐 건너기 어려워요."
  ],
  [
    "EN",
    "shallow",
    "The water is shallow near the shore.",
    "물가 근처는 수심이 얕아요."
  ],
  [
    "EN",
    "curved",
    "Follow the curved path around the garden.",
    "정원을 따라 굽은 길로 가세요."
  ],
  [
    "EN",
    "flat",
    "Place the bowl on a flat surface.",
    "그릇을 평평한 곳에 놓으세요."
  ],
  [
    "EN",
    "rough",
    "The road is rough, so drive slowly.",
    "길이 울퉁불퉁하니 천천히 운전하세요."
  ],
  [
    "EN",
    "dry",
    "My hands get dry in winter.",
    "겨울에는 손이 건조해져요."
  ],
  [
    "EN",
    "freezing",
    "It's freezing outside; don't forget your gloves.",
    "밖이 몹시 추우니 장갑을 잊지 마세요."
  ],
  [
    "EN",
    "boiling",
    "It's boiling in here; could you open a window?",
    "여기 너무 더운데 창문 좀 열어 줄래요?"
  ],
  [
    "EN",
    "stale",
    "These crackers have gone stale.",
    "이 과자는 눅눅해져서 신선하지 않아요."
  ],
  [
    "EN",
    "ripe",
    "The peaches are ripe enough to eat today.",
    "복숭아가 잘 익어서 오늘 먹어도 돼요."
  ],
  [
    "EN",
    "raw",
    "Wash your hands after touching raw chicken.",
    "생닭을 만진 뒤에는 손을 씻으세요."
  ],
  [
    "EN",
    "bitter",
    "This medicine tastes bitter.",
    "이 약은 맛이 써요."
  ],
  [
    "EN",
    "gigantic",
    "A gigantic whale appeared beside the boat.",
    "거대한 고래가 배 옆에 나타났어요."
  ],
  [
    "EN",
    "miniature",
    "She built a miniature model of her house.",
    "그녀는 자기 집의 축소 모형을 만들었어요."
  ],
  [
    "EN",
    "microscopic",
    "Some organisms are microscopic and cannot be seen without a microscope.",
    "어떤 생물은 아주 작아서 현미경 없이는 볼 수 없어요."
  ],
  [
    "EN",
    "dim",
    "The room was dim, so I turned on a lamp.",
    "방이 어두침침해서 스탠드를 켰어요."
  ],
  [
    "EN",
    "colorful",
    "The children made colorful paper flowers.",
    "아이들이 알록달록한 종이꽃을 만들었어요."
  ],
  [
    "EN",
    "colorless",
    "Pure water is colorless.",
    "순수한 물은 색이 없어요."
  ],
  [
    "EN",
    "striped",
    "He wore a striped shirt to the picnic.",
    "그는 소풍에 줄무늬 셔츠를 입고 갔어요."
  ],
  [
    "EN",
    "spotted",
    "We saw a spotted dog near the park.",
    "공원 근처에서 점박이 개를 봤어요."
  ],
  [
    "EN",
    "checked",
    "I bought a checked tablecloth for the kitchen.",
    "부엌에서 쓸 체크무늬 식탁보를 샀어요."
  ],
  [
    "EN",
    "plaid",
    "She chose a red plaid scarf for winter.",
    "그녀는 겨울용으로 빨간 격자무늬 목도리를 골랐어요."
  ],
  [
    "EN",
    "patterned",
    "The patterned curtains brighten up the living room.",
    "무늬가 있는 커튼 덕분에 거실이 한층 화사해 보여요."
  ],
  [
    "EN",
    "dotted",
    "Her dotted dress has small white circles on it.",
    "그녀의 물방울무늬 원피스에는 작은 흰 동그라미가 있어요."
  ],
  [
    "EN",
    "shiny",
    "He polished his shoes until they were shiny.",
    "그는 구두가 반짝일 때까지 닦았어요."
  ],
  [
    "EN",
    "sparkling",
    "The sparkling lights made the street look festive.",
    "반짝이는 불빛 덕분에 거리가 축제 분위기였어요."
  ],
  [
    "EN",
    "glowing",
    "I could see a glowing light through the window.",
    "창문 너머로 은은하게 빛나는 불빛이 보였어요."
  ],
  [
    "EN",
    "dull",
    "The old silver ring had become dull.",
    "오래된 은반지는 광택을 잃었어요."
  ],
  [
    "EN",
    "golden",
    "The setting sun turned the clouds golden.",
    "지는 해가 구름을 금빛으로 물들였어요."
  ],
  [
    "EN",
    "silvery",
    "Her hair looked silvery in the moonlight.",
    "달빛 아래에서 그녀의 머리카락이 은빛으로 보였어요."
  ],
  [
    "EN",
    "wooden",
    "We sat on a wooden bench under the tree.",
    "우리는 나무 아래 나무 벤치에 앉았어요."
  ],
  [
    "EN",
    "plastic",
    "Please put the plastic bottles in the recycling bin.",
    "플라스틱 병은 재활용 수거함에 넣어 주세요."
  ],
  [
    "EN",
    "metallic",
    "I heard a metallic sound coming from the engine.",
    "엔진 쪽에서 금속성 소리가 들렸어요."
  ],
  [
    "EN",
    "woolly",
    "The lamb had a soft, woolly coat.",
    "어린 양은 부드럽고 복슬복슬한 털로 덮여 있었어요."
  ],
  [
    "EN",
    "furry",
    "The furry kitten curled up on my lap.",
    "털이 복슬복슬한 새끼 고양이가 제 무릎 위에 웅크렸어요."
  ],
  [
    "EN",
    "retire",
    "My grandfather plans to retire at the end of this year.",
    "할아버지는 올해 말에 은퇴하실 계획이에요."
  ],
  [
    "EN",
    "sign up",
    "You can sign up for the cooking class online.",
    "요리 수업은 온라인으로 등록할 수 있어요."
  ],
  [
    "EN",
    "absorb",
    "A dry towel can absorb the spilled water.",
    "마른 수건은 쏟아진 물을 흡수할 수 있어요."
  ],
  [
    "EN",
    "accomplish",
    "Our team worked together to accomplish the goal.",
    "우리 팀은 목표를 이루기 위해 함께 노력했어요."
  ],
  [
    "EN",
    "accuse",
    "It's unfair to accuse someone without evidence.",
    "증거 없이 누군가를 비난하는 것은 불공평해요."
  ],
  [
    "EN",
    "adjust",
    "You can adjust the seat to make it more comfortable.",
    "더 편하게 앉을 수 있도록 좌석을 조절할 수 있어요."
  ],
  [
    "EN",
    "aim",
    "The athlete aims to break the school record.",
    "그 선수는 학교 기록을 깨는 것을 목표로 해요."
  ],
  [
    "EN",
    "appoint",
    "The principal will appoint a new team leader tomorrow.",
    "교장 선생님은 내일 새 팀장을 임명할 거예요."
  ],
  [
    "EN",
    "astonish",
    "The magician's final trick astonished the audience.",
    "마술사의 마지막 묘기는 관객들을 깜짝 놀라게 했어요."
  ],
  [
    "EN",
    "doubtful",
    "I'm doubtful that the parcel will arrive before noon.",
    "소포가 정오 전에 도착할지는 의심스러워요."
  ],
  [
    "EN",
    "ban",
    "The city plans to ban smoking in public parks.",
    "시는 공원에서의 흡연을 금지할 계획이에요."
  ],
  [
    "EN",
    "beg",
    "The child begged her parents to let her stay longer.",
    "그 아이는 조금 더 머물게 해 달라고 부모님께 간청했어요."
  ],
  [
    "EN",
    "block",
    "A fallen tree blocked the road after the storm.",
    "폭풍이 지나간 뒤 쓰러진 나무가 길을 막았어요."
  ],
  [
    "EN",
    "bookmark",
    "Bookmark this page so you can find it again later.",
    "나중에 다시 찾을 수 있도록 이 페이지를 즐겨찾기에 추가하세요."
  ],
  [
    "EN",
    "capture",
    "The photographer captured a beautiful sunset.",
    "사진작가는 아름다운 일몰 장면을 포착했어요."
  ],
  [
    "EN",
    "carve",
    "He learned how to carve a small bird from wood.",
    "그는 나무를 깎아 작은 새를 만드는 법을 배웠어요."
  ],
  [
    "EN",
    "command",
    "The officer commanded the soldiers to stop.",
    "장교는 병사들에게 멈추라고 명령했어요."
  ],
  [
    "EN",
    "commit",
    "He was arrested for committing a serious crime.",
    "그는 중대한 범죄를 저질러 체포됐어요."
  ],
  [
    "EN",
    "compose",
    "She composed a short song for the school concert.",
    "그녀는 학교 음악회를 위해 짧은 곡을 작곡했어요."
  ],
  [
    "EN",
    "confuse",
    "The two similar street names confuse visitors.",
    "비슷한 두 거리 이름 때문에 방문객들이 헷갈려 해요."
  ],
  [
    "EN",
    "conserve",
    "Turn off the lights when you leave to conserve energy.",
    "에너지를 아끼려면 나갈 때 불을 끄세요."
  ],
  [
    "EN",
    "contact",
    "Please contact the hotel if your flight is delayed.",
    "비행기가 지연되면 호텔에 연락하세요."
  ],
  [
    "EN",
    "crash",
    "The car crashed into a fence, but no one was hurt.",
    "차가 울타리에 충돌했지만 다친 사람은 없었어요."
  ],
  [
    "EN",
    "criticize",
    "It's easier to criticize a plan than to improve it.",
    "계획을 개선하는 것보다 비판하는 게 더 쉬워요."
  ],
  [
    "EN",
    "damage",
    "The heavy rain damaged several houses near the river.",
    "폭우로 강 근처의 집 여러 채가 파손됐어요."
  ],
  [
    "EN",
    "deny",
    "She denied taking the missing notebook.",
    "그녀는 사라진 공책을 가져가지 않았다고 부인했어요."
  ],
  [
    "EN",
    "deserve",
    "You worked hard, and you deserve a break.",
    "열심히 일했으니 쉴 자격이 있어요."
  ],
  [
    "EN",
    "donate",
    "We decided to donate our old books to the library.",
    "우리는 오래된 책을 도서관에 기부하기로 했어요."
  ],
  [
    "EN",
    "edit",
    "I need to edit the video before uploading it.",
    "영상을 올리기 전에 편집해야 해요."
  ],
  [
    "EN",
    "elect",
    "The students will elect a class president on Friday.",
    "학생들은 금요일에 반장을 선출할 거예요."
  ],
  [
    "EN",
    "employ",
    "The factory employs more than two hundred workers.",
    "그 공장에는 직원이 200명 넘게 고용되어 있어요."
  ],
  [
    "EN",
    "export",
    "The company exports coffee to several countries.",
    "그 회사는 여러 나라에 커피를 수출해요."
  ],
  [
    "EN",
    "force",
    "Don't force your younger brother to play if he doesn't want to.",
    "동생이 싫어하면 억지로 놀게 하지 마세요."
  ],
  [
    "EN",
    "forbid",
    "The school rules forbid using phones during exams.",
    "학교 규정은 시험 중 휴대전화 사용을 금지해요."
  ],
  [
    "EN",
    "forecast",
    "Meteorologists forecast rain for the weekend.",
    "기상학자들은 주말에 비가 올 것으로 예측해요."
  ],
  [
    "EN",
    "frighten",
    "Loud fireworks can frighten young children and pets.",
    "큰 폭죽 소리는 어린아이들과 반려동물을 놀라게 할 수 있어요."
  ],
  [
    "EN",
    "guarantee",
    "A receipt does not guarantee a full refund.",
    "영수증이 있다고 해서 전액 환불이 보장되지는 않아요."
  ],
  [
    "EN",
    "hire",
    "The restaurant plans to hire two more servers.",
    "그 식당은 종업원 두 명을 더 고용할 계획이에요."
  ],
  [
    "EN",
    "host",
    "Our school will host a science fair next month.",
    "우리 학교는 다음 달에 과학 박람회를 개최할 거예요."
  ],
  [
    "EN",
    "hunt",
    "The children hunted for hidden clues around the classroom.",
    "아이들은 교실 곳곳에 숨겨진 단서를 찾아다녔어요."
  ],
  [
    "EN",
    "imitate",
    "The toddler tried to imitate his father's dance moves.",
    "어린아이는 아빠의 춤 동작을 흉내 내려 했어요."
  ],
  [
    "EN",
    "inform",
    "Please inform the teacher if you cannot attend.",
    "참석할 수 없다면 선생님께 알려 주세요."
  ],
  [
    "EN",
    "injure",
    "She injured her ankle while playing basketball.",
    "그녀는 농구를 하다가 발목을 다쳤어요."
  ],
  [
    "EN",
    "insist",
    "He insisted that he had locked the door.",
    "그는 문을 잠갔다고 계속 주장했어요."
  ],
  [
    "EN",
    "instruct",
    "The coach instructed us to warm up before running.",
    "코치는 달리기 전에 준비운동을 하라고 지시했어요."
  ],
  [
    "EN",
    "invest",
    "They decided to invest in new equipment for the bakery.",
    "그들은 제과점의 새 장비에 투자하기로 했어요."
  ],
  [
    "EN",
    "launch",
    "The company will launch its new app next week.",
    "그 회사는 다음 주에 새 앱을 출시할 거예요."
  ],
  [
    "EN",
    "leak",
    "Water began to leak from the pipe under the sink.",
    "싱크대 아래 배관에서 물이 새기 시작했어요."
  ],
  [
    "EN",
    "load",
    "We loaded our luggage into the car before sunrise.",
    "우리는 해 뜨기 전에 짐을 차에 실었어요."
  ],
  [
    "EN",
    "motivate",
    "Her kind words motivated me to keep practicing.",
    "그녀의 따뜻한 말은 제가 연습을 계속할 동기를 줬어요."
  ],
  [
    "EN",
    "pause",
    "Could you pause the video while I take notes?",
    "제가 메모하는 동안 영상을 잠깐 멈춰 줄래요?"
  ],
  [
    "EN",
    "permit",
    "The museum does not permit flash photography.",
    "그 박물관은 플래시 촬영을 허용하지 않아요."
  ],
  [
    "EN",
    "punish",
    "The teacher chose to explain the rule rather than punish the child.",
    "선생님은 아이를 벌주는 대신 규칙을 설명하기로 했어요."
  ],
  [
    "EN",
    "recycle",
    "We recycle paper and plastic every Thursday.",
    "우리는 매주 목요일에 종이와 플라스틱을 분리배출해요."
  ],
  [
    "EN",
    "repair",
    "A technician came to repair our washing machine.",
    "기술자가 세탁기를 수리하러 왔어요."
  ],
  [
    "EN",
    "ask for",
    "Don't be afraid to ask for help when you need it.",
    "도움이 필요할 때는 주저하지 말고 요청하세요."
  ],
  [
    "EN",
    "break down",
    "Our car broke down on the way to the airport.",
    "공항에 가는 길에 우리 차가 고장 났어요."
  ],
  [
    "EN",
    "bring up",
    "She brought up an important question during the meeting.",
    "그녀는 회의 중에 중요한 질문을 꺼냈어요."
  ],
  [
    "EN",
    "call back",
    "I'm in a meeting now; I'll call back in an hour.",
    "지금 회의 중이니 한 시간 뒤에 다시 전화할게요."
  ],
  [
    "EN",
    "call off",
    "They had to call off the picnic because of the storm.",
    "폭풍 때문에 소풍을 취소해야 했어요."
  ],
  [
    "EN",
    "carry on",
    "Even when it started raining, the runners carried on.",
    "비가 내리기 시작했지만 달리기 선수들은 계속 달렸어요."
  ],
  [
    "EN",
    "check in",
    "We need to check in at the airport two hours early.",
    "우리는 공항에서 두 시간 일찍 체크인해야 해요."
  ],
  [
    "EN",
    "check out",
    "Let's check out that new bookstore after lunch.",
    "점심을 먹고 새로 생긴 서점을 한번 가 보자."
  ],
  [
    "EN",
    "come across",
    "I came across an old photo while cleaning my room.",
    "방을 청소하다가 우연히 옛 사진을 발견했어요."
  ],
  [
    "EN",
    "come along",
    "Would you like to come along to the market?",
    "시장에 같이 갈래요?"
  ],
  [
    "EN",
    "come up with",
    "Our group came up with a solution to the problem.",
    "우리 조는 그 문제의 해결책을 생각해 냈어요."
  ],
  [
    "EN",
    "count on",
    "You can count on me to pick you up after school.",
    "방과 후에 내가 데리러 갈 테니 믿어도 돼."
  ],
  [
    "EN",
    "drop off",
    "I'll drop off the package on my way to work.",
    "출근하는 길에 소포를 맡기고 갈게요."
  ],
  [
    "EN",
    "fill out",
    "Please fill out this form before your appointment.",
    "예약한 진료를 받기 전에 이 양식을 작성해 주세요."
  ],
  [
    "EN",
    "find out",
    "I called the station to find out when the train leaves.",
    "기차가 언제 출발하는지 알아보려고 역에 전화했어요."
  ],
  [
    "EN",
    "dividend",
    "The company paid a dividend to shareholders after a profitable year.",
    "그 회사는 수익이 좋았던 한 해를 마친 뒤 주주들에게 배당금을 지급했어요."
  ],
  [
    "EN",
    "monopoly",
    "A monopoly can leave consumers with fewer choices.",
    "독점 기업이 시장을 지배하면 소비자들의 선택지가 줄어들 수 있어요."
  ],
  [
    "EN",
    "consumer",
    "Consumers should compare prices before making a purchase.",
    "소비자는 물건을 사기 전에 가격을 비교하는 것이 좋아요."
  ],
  [
    "EN",
    "enterprise",
    "The enterprise expanded its operations into two new markets.",
    "그 기업은 두 개의 새로운 시장으로 사업을 확장했어요."
  ],
  [
    "EN",
    "entrepreneur",
    "The young entrepreneur started a business from her garage.",
    "그 젊은 기업가는 차고에서 사업을 시작했어요."
  ],
  [
    "EN",
    "labor",
    "The project requires skilled labor to install the equipment safely.",
    "그 프로젝트에서 장비를 안전하게 설치하려면 숙련된 노동력이 필요해요."
  ],
  [
    "EN",
    "productivity",
    "Short breaks can improve productivity during a long workday.",
    "긴 근무 시간 동안 짧게 쉬면 생산성이 높아질 수 있어요."
  ],
  [
    "EN",
    "incentive",
    "The company offered an incentive for employees who completed the training.",
    "회사는 교육을 마친 직원들에게 장려금을 제공했어요."
  ],
  [
    "EN",
    "subsidy",
    "The government provided a subsidy to help farmers buy equipment.",
    "정부는 농민들이 장비를 구입하도록 보조금을 지원했어요."
  ],
  [
    "EN",
    "tariff",
    "A higher tariff may increase the price of imported goods.",
    "관세가 높아지면 수입품 가격이 오를 수 있어요."
  ],
  [
    "EN",
    "analyze",
    "Researchers will analyze the survey results before publishing their report.",
    "연구진은 보고서를 발표하기 전에 설문 결과를 분석할 거예요."
  ],
  [
    "EN",
    "assess",
    "The doctor will assess the patient's condition before recommending treatment.",
    "의사는 치료를 권하기 전에 환자의 상태를 평가할 거예요."
  ],
  [
    "EN",
    "assume",
    "We should not assume that everyone has access to the internet.",
    "모든 사람이 인터넷을 이용할 수 있다고 가정해서는 안 돼요."
  ],
  [
    "EN",
    "claim",
    "The manufacturer claims that the battery lasts up to twelve hours.",
    "제조사는 그 배터리가 최대 12시간 지속된다고 주장해요."
  ],
  [
    "EN",
    "clarify",
    "Could you clarify what you mean by 'urgent'?",
    "'긴급하다'는 말씀이 정확히 어떤 뜻인지 설명해 주실 수 있나요?"
  ],
  [
    "EN",
    "conduct",
    "The university conducted a study on students' sleep habits.",
    "그 대학은 학생들의 수면 습관에 관한 연구를 수행했어요."
  ],
  [
    "EN",
    "confirm",
    "Please confirm your reservation by replying to the email.",
    "이메일에 답장해서 예약을 확인해 주세요."
  ],
  [
    "EN",
    "connect",
    "The bridge connects the two sides of the river.",
    "그 다리는 강 양쪽을 이어 줘요."
  ],
  [
    "EN",
    "consist",
    "The committee consists of five teachers and two parents.",
    "그 위원회는 교사 다섯 명과 학부모 두 명으로 구성돼 있어요."
  ],
  [
    "EN",
    "convince",
    "She used clear evidence to convince the team to change its plan.",
    "그녀는 명확한 근거를 들어 팀이 계획을 바꾸도록 설득했어요."
  ],
  [
    "EN",
    "demonstrate",
    "The experiment demonstrates how heat affects the material.",
    "그 실험은 열이 물질에 어떤 영향을 미치는지 보여 줘요."
  ],
  [
    "EN",
    "determine",
    "The test results will help determine the cause of the problem.",
    "검사 결과는 문제의 원인을 판단하는 데 도움이 될 거예요."
  ],
  [
    "EN",
    "distinguish",
    "Young children sometimes struggle to distinguish fact from fiction.",
    "어린아이들은 때로 사실과 허구를 구별하는 데 어려움을 겪어요."
  ],
  [
    "EN",
    "distribute",
    "Volunteers distributed blankets to families affected by the flood.",
    "자원봉사자들은 홍수 피해를 입은 가족들에게 담요를 나눠 줬어요."
  ],
  [
    "EN",
    "emphasize",
    "The instructor emphasized the importance of wearing safety glasses.",
    "강사는 보안경 착용의 중요성을 강조했어요."
  ],
  [
    "EN",
    "enable",
    "The new software will enable staff to work from home securely.",
    "새 소프트웨어를 사용하면 직원들이 집에서도 안전하게 일할 수 있어요."
  ],
  [
    "EN",
    "ensure",
    "Please check the address again to ensure the package reaches the right person.",
    "소포가 올바른 사람에게 도착하도록 주소를 다시 확인해 주세요."
  ],
  [
    "EN",
    "evaluate",
    "The judges will evaluate each design based on safety and cost.",
    "심사위원들은 안전성과 비용을 기준으로 각 설계를 평가할 거예요."
  ],
  [
    "EN",
    "examine",
    "The mechanic examined the engine to find the source of the noise.",
    "정비사는 소음의 원인을 찾기 위해 엔진을 점검했어요."
  ],
  [
    "EN",
    "expand",
    "The library plans to expand its collection of foreign-language books.",
    "도서관은 외국어 도서 소장량을 늘릴 계획이에요."
  ],
  [
    "EN",
    "explore",
    "The students explored different ways to reduce food waste.",
    "학생들은 음식물 쓰레기를 줄이는 여러 방법을 탐구했어요."
  ],
  [
    "EN",
    "express",
    "He found it difficult to express his feelings in words.",
    "그는 자기 감정을 말로 표현하기 어려워했어요."
  ],
  [
    "EN",
    "extend",
    "We asked the landlord to extend the lease for another year.",
    "우리는 집주인에게 임대차 계약을 1년 더 연장해 달라고 요청했어요."
  ],
  [
    "EN",
    "gain",
    "She gained valuable experience while working at the hospital.",
    "그녀는 병원에서 일하면서 귀중한 경험을 쌓았어요."
  ],
  [
    "EN",
    "identify",
    "Police used security footage to identify the suspect.",
    "경찰은 보안 카메라 영상을 이용해 용의자의 신원을 확인했어요."
  ],
  [
    "EX",
    "검색 결과를 날짜순으로 정렬해 주세요.",
    "옛날 글부터 먼저 보여서 관리자에게 \"검색 결과를 날짜순으로 정렬해 주세요.\"라고 요청했어요.",
    "Các bài cũ hiện lên trước nên tôi nhờ quản trị viên: \"Vui lòng sắp xếp kết quả tìm kiếm theo thứ tự ngày tháng.\""
  ],
  [
    "EX",
    "이 게시물에 답글을 남겨도 될까요?",
    "게시판 이용 규칙을 잘 몰라서 \"이 게시물에 답글을 남겨도 될까요?\"라고 물었어요.",
    "Vì chưa rõ nội quy diễn đàn, tôi hỏi: \"Tôi có thể để lại câu trả lời dưới bài đăng này không?\""
  ],
  [
    "EX",
    "앱 사용 권한을 확인하고 싶어요.",
    "휴대전화 설정 메뉴를 찾으며 \"앱 사용 권한을 확인하고 싶어요.\"라고 말했어요.",
    "Trong lúc tìm mục cài đặt điện thoại, tôi nói: \"Tôi muốn kiểm tra quyền truy cập của ứng dụng.\""
  ],
  [
    "EX",
    "QR 코드를 다시 스캔해 주세요.",
    "입장 확인이 되지 않아 직원이 \"QR 코드를 다시 스캔해 주세요.\"라고 안내했어요.",
    "Vì chưa xác nhận được vé vào cửa, nhân viên hướng dẫn: \"Vui lòng quét lại mã QR.\""
  ],
  [
    "EX",
    "백업이 완료되면 알려 주세요.",
    "자료를 옮기기 전에 동료에게 \"백업이 완료되면 알려 주세요.\"라고 부탁했어요.",
    "Trước khi chuyển dữ liệu, tôi nhờ đồng nghiệp: \"Vui lòng báo cho tôi khi sao lưu hoàn tất.\""
  ],
  [
    "EX",
    "화면 공유를 종료해 주세요.",
    "온라인 회의가 끝난 뒤 진행자가 \"화면 공유를 종료해 주세요.\"라고 말했어요.",
    "Sau khi cuộc họp trực tuyến kết thúc, người điều phối nói: \"Vui lòng dừng chia sẻ màn hình.\""
  ],
  [
    "EX",
    "통화 중에 소리가 끊겨요.",
    "고객센터와 통화하다가 \"통화 중에 소리가 끊겨요.\"라고 설명했어요.",
    "Khi gọi cho bộ phận chăm sóc khách hàng, tôi giải thích: \"Âm thanh bị ngắt quãng trong lúc gọi.\""
  ],
  [
    "EX",
    "새 기기에서 계정을 로그아웃해야 하나요?",
    "새 휴대전화를 설정하다가 직원에게 \"새 기기에서 계정을 로그아웃해야 하나요?\"라고 물었어요.",
    "Khi cài đặt điện thoại mới, tôi hỏi nhân viên: \"Tôi có cần đăng xuất tài khoản trên thiết bị mới không?\""
  ],
  [
    "EX",
    "주민등록 주소를 변경하고 싶어요.",
    "이사를 마친 뒤 주민센터에 가서 \"주민등록 주소를 변경하고 싶어요.\"라고 말했어요.",
    "Sau khi chuyển nhà, tôi đến trung tâm hành chính địa phương và nói: \"Tôi muốn thay đổi địa chỉ đăng ký cư trú.\""
  ],
  [
    "EX",
    "필요한 서류 목록을 먼저 확인할게요.",
    "신청 전에 직원에게 \"필요한 서류 목록을 먼저 확인할게요.\"라고 말했어요.",
    "Trước khi nộp đơn, tôi nói với nhân viên: \"Tôi sẽ kiểm tra danh sách giấy tờ cần thiết trước.\""
  ],
  [
    "EX",
    "번호표를 뽑고 기다리면 되나요?",
    "민원실에 들어가서 안내 직원에게 \"번호표를 뽑고 기다리면 되나요?\"라고 물었어요.",
    "Khi vào phòng tiếp nhận hồ sơ, tôi hỏi nhân viên hướng dẫn: \"Tôi lấy số thứ tự rồi chờ là được phải không?\""
  ],
  [
    "EX",
    "이 신청서는 어느 창구에 제출하나요?",
    "양식을 다 작성한 후 \"이 신청서는 어느 창구에 제출하나요?\"라고 물었어요.",
    "Sau khi điền xong mẫu đơn, tôi hỏi: \"Tôi phải nộp đơn này ở quầy nào?\""
  ],
  [
    "EX",
    "운영 시간이 공휴일에도 같나요?",
    "연휴에 방문할 계획이라 \"운영 시간이 공휴일에도 같나요?\"라고 전화로 확인했어요.",
    "Vì dự định đến vào dịp nghỉ lễ, tôi gọi điện hỏi: \"Giờ hoạt động vào ngày lễ có giống ngày thường không?\""
  ],
  [
    "EX",
    "복지 상담을 예약하고 싶어요.",
    "상담 창구에 전화해 \"복지 상담을 예약하고 싶어요.\"라고 말했어요.",
    "Tôi gọi đến quầy tư vấn và nói: \"Tôi muốn đặt lịch tư vấn phúc lợi xã hội.\""
  ],
  [
    "EX",
    "세금 납부 확인서를 발급해 주세요.",
    "서류 제출에 필요해서 창구에서 \"세금 납부 확인서를 발급해 주세요.\"라고 요청했어요.",
    "Vì cần giấy tờ để nộp hồ sơ, tôi yêu cầu tại quầy: \"Vui lòng cấp giấy xác nhận đã nộp thuế.\""
  ],
  [
    "EX",
    "도서관 회원증을 재발급받고 싶어요.",
    "회원증을 잃어버려서 사서에게 \"도서관 회원증을 재발급받고 싶어요.\"라고 말했어요.",
    "Vì làm mất thẻ, tôi nói với thủ thư: \"Tôi muốn xin cấp lại thẻ thư viện.\""
  ],
  [
    "EX",
    "반납 기한을 일주일 연장해 주실래요?",
    "책을 아직 다 읽지 못해서 \"반납 기한을 일주일 연장해 주실래요?\"라고 부탁했어요.",
    "Vì chưa đọc xong sách, tôi nhờ: \"Bạn có thể gia hạn ngày trả thêm một tuần không?\""
  ],
  [
    "EX",
    "체육관 강좌에 대기 신청을 할 수 있나요?",
    "수업 정원이 이미 찼다고 해서 \"체육관 강좌에 대기 신청을 할 수 있나요?\"라고 물었어요.",
    "Vì lớp học đã đủ chỗ, tôi hỏi: \"Tôi có thể đăng ký vào danh sách chờ của lớp học ở nhà thể thao không?\""
  ],
  [
    "EX",
    "공원에서 자전거를 타도 되나요?",
    "자전거 출입 안내가 보이지 않아 \"공원에서 자전거를 타도 되나요?\"라고 직원에게 물었어요.",
    "Vì không thấy biển hướng dẫn về xe đạp, tôi hỏi nhân viên: \"Tôi có được đi xe đạp trong công viên không?\""
  ],
  [
    "EX",
    "쓰레기 배출 날짜를 다시 알려 주세요.",
    "수거 일정을 잊어버려서 관리사무소에 \"쓰레기 배출 날짜를 다시 알려 주세요.\"라고 문의했어요.",
    "Vì quên lịch thu gom rác, tôi hỏi ban quản lý: \"Vui lòng cho tôi biết lại ngày được mang rác ra ngoài.\""
  ],
  [
    "EX",
    "대형 폐기물 신고를 온라인으로 할 수 있어요?",
    "낡은 소파를 버리려다가 \"대형 폐기물 신고를 온라인으로 할 수 있어요?\"라고 문의했어요.",
    "Khi chuẩn bị bỏ chiếc ghế sofa cũ, tôi hỏi: \"Tôi có thể đăng ký xử lý rác thải cồng kềnh qua mạng không?\""
  ],
  [
    "EX",
    "이 구역에 주차하면 과태료가 부과되나요?",
    "주차 금지 표지를 보고 \"이 구역에 주차하면 과태료가 부과되나요?\"라고 물었어요.",
    "Thấy biển cấm đỗ xe, tôi hỏi: \"Nếu đỗ xe ở khu vực này thì có bị phạt tiền không?\""
  ],
  [
    "EX",
    "도로 공사는 언제 끝나나요?",
    "집 앞 도로가 계속 막혀 있어 \"도로 공사는 언제 끝나나요?\"라고 구청에 문의했어요.",
    "Vì đường trước nhà liên tục bị chặn, tôi hỏi văn phòng quận: \"Khi nào công trình làm đường dự kiến kết thúc?\""
  ],
  [
    "EX",
    "분실한 지갑이 접수됐는지 확인해 주세요.",
    "경찰서에 전화해서 \"분실한 지갑이 접수됐는지 확인해 주세요.\"라고 부탁했어요.",
    "Tôi gọi đến đồn cảnh sát và nhờ: \"Vui lòng kiểm tra xem đã có ai nộp chiếc ví tôi làm mất hay chưa.\""
  ],
  [
    "EX",
    "민원 처리 결과를 문자로 받고 싶어요.",
    "접수 창구에서 \"민원 처리 결과를 문자로 받고 싶어요.\"라고 요청했어요.",
    "Tại quầy tiếp nhận, tôi yêu cầu: \"Tôi muốn nhận kết quả giải quyết kiến nghị qua tin nhắn.\""
  ],
  [
    "EX",
    "통역 지원을 요청할 수 있을까요?",
    "한국어 설명이 어려워서 \"통역 지원을 요청할 수 있을까요?\"라고 물었어요.",
    "Vì khó hiểu phần giải thích bằng tiếng Hàn, tôi hỏi: \"Tôi có thể yêu cầu hỗ trợ phiên dịch không?\""
  ],
  [
    "EX",
    "장애인 주차 구역은 어디에 있나요?",
    "주차장에 들어서며 \"장애인 주차 구역은 어디에 있나요?\"라고 안내 직원에게 물었어요.",
    "Khi vào bãi đỗ xe, tôi hỏi nhân viên hướng dẫn: \"Chỗ đỗ xe dành cho người khuyết tật ở đâu?\""
  ],
  [
    "EX",
    "공공시설 예약을 취소하고 싶어요.",
    "예정이 바뀌어서 담당자에게 \"공공시설 예약을 취소하고 싶어요.\"라고 말했어요.",
    "Vì lịch trình thay đổi, tôi nói với người phụ trách: \"Tôi muốn hủy lịch đặt cơ sở công cộng.\""
  ],
  [
    "EX",
    "접수 번호를 잊어버렸어요.",
    "신청 진행 상황을 조회하다가 \"접수 번호를 잊어버렸어요.\"라고 상담원에게 말했어요.",
    "Khi tra cứu tình trạng hồ sơ, tôi nói với nhân viên tư vấn: \"Tôi quên mất mã số tiếp nhận hồ sơ.\""
  ],
  [
    "EX",
    "담당 부서로 연결해 주세요.",
    "대표 전화로 문의한 뒤 \"담당 부서로 연결해 주세요.\"라고 요청했어요.",
    "Sau khi gọi đến tổng đài, tôi yêu cầu: \"Vui lòng chuyển máy đến bộ phận phụ trách.\""
  ],
  [
    "EX",
    "안내문을 베트남어로 받을 수 있나요?",
    "내용을 정확히 이해하려고 \"안내문을 베트남어로 받을 수 있나요?\"라고 물었어요.",
    "Để hiểu chính xác nội dung, tôi hỏi: \"Tôi có thể nhận tờ hướng dẫn bằng tiếng Việt không?\""
  ],
  [
    "EX",
    "이 서류에 서명하는 곳을 알려 주세요.",
    "신청서를 제출하기 전에 \"이 서류에 서명하는 곳을 알려 주세요.\"라고 부탁했어요.",
    "Trước khi nộp đơn, tôi nhờ: \"Vui lòng chỉ cho tôi chỗ cần ký trên giấy tờ này.\""
  ],
  [
    "EX",
    "야간에도 이용할 수 있는 창구가 있나요?",
    "퇴근 후에 방문해야 해서 \"야간에도 이용할 수 있는 창구가 있나요?\"라고 물었어요.",
    "Vì phải đến sau giờ làm, tôi hỏi: \"Có quầy giao dịch nào mở cửa vào buổi tối không?\""
  ],
  [
    "EX",
    "주민 설명회에 참석 신청을 했어요.",
    "안내 담당자에게 \"주민 설명회에 참석 신청을 했어요.\"라고 말하고 명단을 확인했어요.",
    "Tôi nói với người phụ trách hướng dẫn: \"Tôi đã đăng ký tham dự buổi họp thông tin dành cho cư dân\", rồi kiểm tra danh sách."
  ],
  [
    "EX",
    "공사 소음 신고는 어디에 하면 되나요?",
    "밤늦게까지 공사 소리가 들려서 \"공사 소음 신고는 어디에 하면 되나요?\"라고 물었어요.",
    "Vì tiếng thi công kéo dài đến khuya, tôi hỏi: \"Tôi có thể báo cáo tiếng ồn từ công trình ở đâu?\""
  ],
  [
    "EX",
    "어린이 놀이터 이용 규칙을 확인해 주세요.",
    "아이들과 놀이터에 가기 전에 \"어린이 놀이터 이용 규칙을 확인해 주세요.\"라고 부탁했어요.",
    "Trước khi đưa các em đến sân chơi, tôi nhờ: \"Vui lòng kiểm tra các quy định sử dụng sân chơi trẻ em.\""
  ],
  [
    "EX",
    "반려동물 등록 정보를 수정하고 싶어요.",
    "연락처가 바뀌어서 \"반려동물 등록 정보를 수정하고 싶어요.\"라고 문의했어요.",
    "Vì đã đổi số liên lạc, tôi hỏi: \"Tôi muốn cập nhật thông tin đăng ký thú cưng.\""
  ],
  [
    "EX",
    "공공 와이파이 비밀번호를 어디서 받나요?",
    "도서관에서 인터넷을 쓰려고 \"공공 와이파이 비밀번호를 어디서 받나요?\"라고 물었어요.",
    "Vì muốn dùng internet tại thư viện, tôi hỏi: \"Tôi có thể lấy mật khẩu Wi-Fi công cộng ở đâu?\""
  ],
  [
    "EN",
    "feathery",
    "The baby bird had soft, feathery wings.",
    "새끼 새의 날개는 깃털처럼 부드러웠어요."
  ],
  [
    "EN",
    "prickly",
    "Be careful; this plant has prickly leaves.",
    "조심하세요. 이 식물에는 가시가 있는 잎이 달려 있어요."
  ],
  [
    "EN",
    "bumpy",
    "The bus shook as it drove along the bumpy road.",
    "버스가 울퉁불퉁한 길을 달리면서 흔들렸어요."
  ],
  [
    "EN",
    "sticky",
    "My fingers felt sticky after I ate the candy.",
    "사탕을 먹고 나니 손가락이 끈적끈적했어요."
  ],
  [
    "EN",
    "slippery",
    "The bathroom floor gets slippery when it is wet.",
    "욕실 바닥은 젖으면 미끄러워져요."
  ],
  [
    "EN",
    "muddy",
    "Take off your muddy shoes before coming inside.",
    "집 안에 들어오기 전에 진흙 묻은 신발을 벗으세요."
  ],
  [
    "EN",
    "dusty",
    "I wiped the dusty shelf with a damp cloth.",
    "먼지가 쌓인 선반을 젖은 천으로 닦았어요."
  ],
  [
    "EN",
    "sandy",
    "There was a sandy path leading to the beach.",
    "해변으로 이어지는 모래가 많은 길이 있었어요."
  ],
  [
    "EN",
    "grassy",
    "We spread our picnic blanket on the grassy hill.",
    "우리는 풀이 무성한 언덕에 돗자리를 폈어요."
  ],
  [
    "EN",
    "leafy",
    "The leafy trees kept the playground cool.",
    "잎이 무성한 나무들이 놀이터를 시원하게 해 주었어요."
  ],
  [
    "EN",
    "rocky",
    "Wear sturdy shoes because the trail is rocky.",
    "산책로에 바위가 많으니 튼튼한 신발을 신으세요."
  ],
  [
    "EN",
    "snowy",
    "The children made a snowman on a snowy morning.",
    "아이들은 눈이 내리는 아침에 눈사람을 만들었어요."
  ],
  [
    "EN",
    "windy",
    "It was too windy to fly our paper airplanes outside.",
    "바람이 너무 많이 불어서 밖에서 종이비행기를 날릴 수 없었어요."
  ],
  [
    "EN",
    "sunny",
    "We ate lunch outside on a sunny afternoon.",
    "햇살이 좋은 오후에 밖에서 점심을 먹었어요."
  ],
  [
    "EN",
    "foggy",
    "The driver slowed down because the road was foggy.",
    "도로에 안개가 끼어서 운전자가 속도를 줄였어요."
  ],
  [
    "EN",
    "stormy",
    "We stayed indoors during the stormy night.",
    "폭풍우가 치는 밤에는 실내에 머물렀어요."
  ],
  [
    "EN",
    "breezy",
    "A breezy morning is perfect for a walk by the sea.",
    "산들바람이 부는 아침은 바닷가를 걷기에 딱 좋아요."
  ],
  [
    "EN",
    "chilly",
    "Bring a light jacket; it gets chilly after sunset.",
    "해가 지면 쌀쌀해지니 얇은 겉옷을 챙기세요."
  ],
  [
    "EN",
    "humid",
    "The air feels humid after a summer shower.",
    "여름 소나기가 내린 뒤에는 공기가 습하게 느껴져요."
  ],
  [
    "EN",
    "icy",
    "Walk slowly because the steps are icy.",
    "계단이 얼어 있으니 천천히 걸으세요."
  ],
  [
    "EN",
    "lukewarm",
    "The tea was lukewarm by the time I drank it.",
    "제가 차를 마실 때쯤에는 미지근해졌어요."
  ],
  [
    "EN",
    "damp",
    "Hang the damp towel outside to dry.",
    "축축한 수건을 밖에 널어 말리세요."
  ],
  [
    "EN",
    "soggy",
    "The cereal became soggy after sitting in milk too long.",
    "시리얼을 우유에 너무 오래 담가 두었더니 눅눅해졌어요."
  ],
  [
    "EN",
    "bland",
    "The soup tastes bland, so I'll add a little salt.",
    "국이 싱거워서 소금을 조금 넣을게요."
  ],
  [
    "EN",
    "crunchy",
    "These fresh carrots are sweet and crunchy.",
    "이 신선한 당근은 달고 아삭아삭해요."
  ],
  [
    "EN",
    "chewy",
    "The rice cakes are soft but pleasantly chewy.",
    "떡은 부드러우면서도 기분 좋게 쫄깃해요."
  ],
  [
    "EN",
    "juicy",
    "Be careful when you bite into that juicy peach.",
    "과즙이 많은 복숭아를 베어 물 때 조심하세요."
  ],
  [
    "EN",
    "rotten",
    "We threw away the rotten apple at the bottom of the bag.",
    "가방 맨 아래에 있던 썩은 사과를 버렸어요."
  ],
  [
    "EN",
    "grumpy",
    "Dad gets grumpy when he hasn't slept enough.",
    "아빠는 잠을 충분히 못 자면 심술이 나요."
  ],
  [
    "EN",
    "cranky",
    "The baby became cranky because she was tired.",
    "아기는 피곤해서 짜증을 내기 시작했어요."
  ],
  [
    "EN",
    "miserable",
    "After spending three days in bed with the flu, I felt miserable.",
    "독감으로 사흘 동안 누워 있으니 정말 괴로웠어요."
  ],
  [
    "EN",
    "calm",
    "Try to stay calm and tell me what happened.",
    "침착하게 무슨 일이 있었는지 말해 주세요."
  ],
  [
    "EN",
    "thankful",
    "I'm thankful that everyone got home safely.",
    "모두 무사히 집에 돌아와서 감사해요."
  ],
  [
    "EN",
    "grateful",
    "She was grateful for the help from her neighbors.",
    "그녀는 이웃들이 도와준 것에 감사했어요."
  ],
  [
    "EN",
    "amazed",
    "We were amazed by how quickly the puppy learned.",
    "우리는 강아지가 얼마나 빨리 배우는지 보고 깜짝 놀랐어요."
  ],
  [
    "EN",
    "puzzled",
    "He looked puzzled when he read the unusual sign.",
    "그는 낯선 표지판을 읽고 어리둥절한 표정을 지었어요."
  ],
  [
    "EN",
    "confused",
    "I was confused by the instructions, so I asked again.",
    "설명이 헷갈려서 다시 물어봤어요."
  ],
  [
    "EN",
    "disappointed",
    "The children were disappointed when the picnic was canceled.",
    "소풍이 취소되자 아이들은 실망했어요."
  ],
  [
    "EN",
    "embarrassed",
    "I felt embarrassed when I called my teacher by the wrong name.",
    "선생님 이름을 잘못 불러서 당황했어요."
  ],
  [
    "EN",
    "scared",
    "My little brother was scared of the loud thunder.",
    "남동생은 큰 천둥소리를 무서워했어요."
  ],
  [
    "EN",
    "frightened",
    "The dog was frightened by the sudden fireworks.",
    "개는 갑자기 터진 폭죽 소리에 겁에 질렸어요."
  ],
  [
    "EN",
    "delighted",
    "Grandma was delighted to see the whole family together.",
    "할머니는 온 가족이 모인 모습을 보고 무척 기뻐하셨어요."
  ],
  [
    "EN",
    "get along",
    "My sister and I get along much better now.",
    "저와 여동생은 이제 훨씬 더 사이좋게 지내요."
  ],
  [
    "EN",
    "get back",
    "What time did you get back from the museum?",
    "박물관에서 몇 시에 돌아왔어요?"
  ],
  [
    "EN",
    "get in",
    "Please get in the car before it starts raining.",
    "비가 오기 전에 차에 타세요."
  ],
  [
    "EN",
    "get off",
    "We need to get off the bus at the next stop.",
    "우리는 다음 정류장에서 버스에서 내려야 해요."
  ],
  [
    "EN",
    "get on",
    "Hurry up and get on the train before the doors close.",
    "문이 닫히기 전에 서둘러 기차에 타세요."
  ],
  [
    "EN",
    "get out",
    "Everyone must get out of the building during the fire drill.",
    "화재 대피 훈련 중에는 모두 건물 밖으로 나가야 해요."
  ],
  [
    "EN",
    "get over",
    "It took him several weeks to get over the flu.",
    "그는 독감에서 회복하는 데 몇 주가 걸렸어요."
  ],
  [
    "EN",
    "get together",
    "Our old classmates get together once a year.",
    "우리 옛 반 친구들은 일 년에 한 번 모여요."
  ],
  [
    "EN",
    "give away",
    "We decided to give away the toys we no longer use.",
    "더 이상 쓰지 않는 장난감을 다른 사람들에게 나눠 주기로 했어요."
  ],
  [
    "EN",
    "give back",
    "Please give back the library book by Friday.",
    "금요일까지 도서관 책을 반납해 주세요."
  ],
  [
    "EN",
    "give up",
    "Don't give up just because the first lesson is difficult.",
    "첫 수업이 어렵다고 포기하지 마세요."
  ],
  [
    "EN",
    "go ahead",
    "If you're ready, go ahead with your presentation.",
    "준비가 됐다면 발표를 진행하세요."
  ],
  [
    "EN",
    "go away",
    "The children didn't want their grandparents to go away.",
    "아이들은 조부모님이 떠나는 것을 원하지 않았어요."
  ],
  [
    "EN",
    "go on",
    "The concert will go on even if it rains.",
    "비가 와도 공연은 계속될 거예요."
  ],
  [
    "EN",
    "grow up",
    "She wants to be a veterinarian when she grows up.",
    "그녀는 자라서 수의사가 되고 싶어 해요."
  ],
  [
    "EN",
    "hang out",
    "We often hang out at the park after school.",
    "우리는 방과 후에 공원에서 자주 어울려 놀아요."
  ],
  [
    "EN",
    "keep on",
    "Keep on practicing, and the song will become easier.",
    "계속 연습하면 그 노래가 더 쉬워질 거예요."
  ],
  [
    "EN",
    "leave out",
    "Don't leave out your phone number on the application.",
    "신청서에 전화번호를 빠뜨리지 마세요."
  ],
  [
    "EN",
    "look after",
    "Can you look after my cat while I'm away?",
    "제가 없는 동안 고양이를 돌봐 줄 수 있나요?"
  ],
  [
    "EN",
    "look around",
    "We had time to look around the market before lunch.",
    "우리는 점심 전에 시장을 둘러볼 시간이 있었어요."
  ],
  [
    "EN",
    "look for",
    "I'm looking for a charger that fits this phone.",
    "이 휴대전화에 맞는 충전기를 찾고 있어요."
  ],
  [
    "EN",
    "look forward to",
    "I'm looking forward to meeting your family this weekend.",
    "이번 주말에 당신 가족을 만날 날을 기대하고 있어요."
  ],
  [
    "EN",
    "look into",
    "The manager promised to look into the missing payment.",
    "관리자는 누락된 결제 건을 조사하겠다고 약속했어요."
  ],
  [
    "EN",
    "look out",
    "Look out! There's a bicycle coming from behind you.",
    "조심해요! 뒤에서 자전거가 오고 있어요."
  ],
  [
    "EN",
    "look up",
    "You can look up the word in an online dictionary.",
    "온라인 사전에서 그 단어를 찾아볼 수 있어요."
  ],
  [
    "EN",
    "make up",
    "He tried to make up an excuse for being late.",
    "그는 늦은 이유를 핑계로 지어내려고 했어요."
  ],
  [
    "EN",
    "pick up",
    "Could you pick up my package at the front desk?",
    "안내 데스크에서 제 소포를 찾아다 줄 수 있나요?"
  ],
  [
    "EN",
    "put away",
    "Please put away your books before dinner.",
    "저녁 먹기 전에 책을 치워 주세요."
  ],
  [
    "EN",
    "put off",
    "We had to put off the trip because of the storm.",
    "폭풍 때문에 여행을 미뤄야 했어요."
  ],
  [
    "EN",
    "put on",
    "Put on your jacket before you go outside.",
    "밖에 나가기 전에 재킷을 입으세요."
  ],
  [
    "EN",
    "put out",
    "The firefighters managed to put out the kitchen fire.",
    "소방관들이 주방에서 난 불을 끄는 데 성공했어요."
  ],
  [
    "EN",
    "absent",
    "Mina was absent from school because she had a fever.",
    "미나는 열이 나서 학교에 결석했어요."
  ],
  [
    "EN",
    "active",
    "My grandfather stays active by walking every morning.",
    "할아버지는 매일 아침 걸으면서 활발하게 생활하세요."
  ],
  [
    "EN",
    "alive",
    "The rescued kitten was weak but still alive.",
    "구조된 새끼 고양이는 약했지만 아직 살아 있었어요."
  ],
  [
    "EN",
    "alone",
    "I don't like walking home alone after dark.",
    "저는 어두워진 뒤 혼자 집에 걸어가는 것을 좋아하지 않아요."
  ],
  [
    "EN",
    "amazing",
    "The view from the top of the mountain was amazing.",
    "산 정상에서 바라본 풍경은 놀라웠어요."
  ],
  [
    "EN",
    "awful",
    "An awful smell was coming from the trash bin.",
    "쓰레기통에서 끔찍한 냄새가 나고 있었어요."
  ],
  [
    "EN",
    "blind",
    "The blind musician read the music in Braille.",
    "눈이 먼 음악가는 점자로 된 악보를 읽었어요."
  ],
  [
    "EN",
    "bored",
    "I got bored while waiting for the delayed train.",
    "지연된 기차를 기다리는 동안 지루해졌어요."
  ],
  [
    "EN",
    "boring",
    "The lecture was boring because it repeated the same points.",
    "강의가 같은 내용을 반복해서 지루했어요."
  ],
  [
    "EN",
    "cheerful",
    "Our cheerful neighbor always says hello with a smile.",
    "쾌활한 이웃은 언제나 웃으며 인사해요."
  ],
  [
    "EN",
    "clear",
    "The instructions are clear enough for beginners to follow.",
    "설명이 분명해서 초보자도 따라 할 수 있어요."
  ],
  [
    "EN",
    "clever",
    "The clever child solved the puzzle in just a minute.",
    "영리한 아이가 단 1분 만에 퍼즐을 풀었어요."
  ],
  [
    "EN",
    "cloudy",
    "It was cloudy all morning, but it never rained.",
    "오전 내내 흐렸지만 비는 오지 않았어요."
  ],
  [
    "EN",
    "dead",
    "We found a dead plant on the windowsill.",
    "창턱에서 말라 죽은 식물을 발견했어요."
  ],
  [
    "EN",
    "deep",
    "The water is too deep for young children to swim here.",
    "여기는 물이 너무 깊어서 어린아이들이 수영하기 어려워요."
  ],
  [
    "EN",
    "gentle",
    "Please be gentle when you hold the baby rabbit.",
    "새끼 토끼를 안을 때는 부드럽게 다뤄 주세요."
  ],
  [
    "EN",
    "glad",
    "I'm glad you made it home before the rain started.",
    "비가 오기 전에 집에 무사히 도착해서 기뻐요."
  ],
  [
    "EN",
    "gray",
    "My father bought a gray coat for the winter.",
    "아버지는 겨울에 입을 회색 코트를 사셨어요."
  ],
  [
    "EN",
    "green",
    "The leaves turn bright green in the spring.",
    "봄이 되면 잎이 선명한 초록색으로 변해요."
  ],
  [
    "EN",
    "helpful",
    "The station map was helpful when we changed trains.",
    "기차를 갈아탈 때 역 안내도가 도움이 됐어요."
  ],
  [
    "EN",
    "honest",
    "Please give me your honest opinion about this plan.",
    "이 계획에 대한 솔직한 의견을 말해 주세요."
  ],
  [
    "EN",
    "huge",
    "A huge crowd gathered outside the stadium.",
    "경기장 밖에 엄청나게 많은 사람들이 모였어요."
  ],
  [
    "EN",
    "independent",
    "She's become more independent since moving out.",
    "그녀는 독립해서 살기 시작한 뒤로 더 자립적이 되었어요."
  ],
  [
    "EN",
    "lovely",
    "We had a lovely dinner with our friends by the river.",
    "우리는 강가에서 친구들과 즐거운 저녁 식사를 했어요."
  ],
  [
    "EN",
    "mad",
    "My brother was mad when he found his bike broken.",
    "동생은 자전거가 망가진 것을 보고 화가 났어요."
  ],
  [
    "EN",
    "narrow",
    "The alley is too narrow for two cars to pass.",
    "골목이 너무 좁아서 차 두 대가 지나갈 수 없어요."
  ],
  [
    "EN",
    "nervous",
    "I always feel nervous before speaking in front of a crowd.",
    "저는 많은 사람 앞에서 말하기 전에 항상 긴장해요."
  ],
  [
    "EN",
    "pleased",
    "The teacher was pleased with our progress this month.",
    "선생님은 이번 달 우리의 발전에 만족하셨어요."
  ],
  [
    "EN",
    "proud",
    "Her parents were proud of her hard work.",
    "부모님은 그녀가 열심히 노력한 것을 자랑스러워하셨어요."
  ],
  [
    "EN",
    "rainy",
    "We played board games at home on the rainy afternoon.",
    "비 오는 오후에는 집에서 보드게임을 했어요."
  ],
  [
    "EN",
    "real",
    "Is that a real diamond or just a piece of glass?",
    "그거 진짜 다이아몬드인가요, 아니면 그냥 유리 조각인가요?"
  ],
  [
    "EN",
    "responsible",
    "Each student is responsible for keeping the classroom clean.",
    "학생마다 교실을 깨끗하게 유지할 책임이 있어요."
  ],
  [
    "EN",
    "round",
    "We sat at a round table in the corner of the café.",
    "우리는 카페 구석에 있는 둥근 탁자에 앉았어요."
  ],
  [
    "EN",
    "silent",
    "The library became silent after the doors closed.",
    "문이 닫힌 뒤 도서관은 조용해졌어요."
  ],
  [
    "EN",
    "smooth",
    "The stone felt smooth after years in the river.",
    "그 돌은 오랫동안 강물에 닳아 표면이 매끄러웠어요."
  ],
  [
    "EN",
    "social",
    "The club organizes social events for new students.",
    "동아리는 신입생을 위한 사교 행사를 열어요."
  ],
  [
    "EN",
    "sorry",
    "I'm sorry I forgot to bring your umbrella.",
    "당신 우산을 가져오는 걸 잊어서 미안해요."
  ],
  [
    "EN",
    "straight",
    "Draw a straight line under the title.",
    "제목 아래에 직선을 그으세요."
  ],
  [
    "EN",
    "sure",
    "Are you sure you locked the front door?",
    "현관문을 잠갔다고 확신해요?"
  ],
  [
    "EN",
    "indicate",
    "The warning light indicates that the battery is low.",
    "경고등은 배터리 잔량이 부족하다는 것을 나타내요."
  ],
  [
    "EN",
    "interpret",
    "Two experts may interpret the same data differently.",
    "전문가 두 명이 같은 데이터를 다르게 해석할 수도 있어요."
  ],
  [
    "EN",
    "maintain",
    "The building staff maintain the elevators every month.",
    "건물 관리 직원들은 매달 엘리베이터를 정비해요."
  ],
  [
    "EN",
    "obtain",
    "You must obtain permission before entering the research area.",
    "연구 구역에 들어가기 전에 허가를 받아야 해요."
  ],
  [
    "EN",
    "perform",
    "The technician will perform a safety check before takeoff.",
    "기술자가 이륙 전에 안전 점검을 수행할 거예요."
  ],
  [
    "EN",
    "persuade",
    "She tried to persuade her friend to wear a helmet.",
    "그녀는 친구에게 헬멧을 쓰라고 설득하려고 했어요."
  ],
  [
    "EN",
    "prevent",
    "Washing your hands regularly helps prevent infection.",
    "손을 규칙적으로 씻으면 감염을 예방하는 데 도움이 돼요."
  ],
  [
    "EN",
    "publish",
    "The author plans to publish her first novel next spring.",
    "작가는 내년 봄에 첫 소설을 출판할 계획이에요."
  ],
  [
    "EN",
    "recognize",
    "I didn't recognize my old teacher with his new haircut.",
    "선생님이 머리를 새로 자르셔서 알아보지 못했어요."
  ],
  [
    "EN",
    "recommend",
    "The librarian can recommend a book for beginners.",
    "사서가 초보자에게 알맞은 책을 추천해 줄 수 있어요."
  ],
  [
    "EN",
    "reflect",
    "The survey results reflect what local residents need.",
    "설문조사 결과는 지역 주민들이 필요로 하는 것을 반영해요."
  ],
  [
    "EN",
    "reject",
    "The company may reject applications submitted after the deadline.",
    "회사는 마감일이 지나 제출된 지원서를 거절할 수 있어요."
  ],
  [
    "EN",
    "release",
    "The agency will release the final report on Monday.",
    "그 기관은 월요일에 최종 보고서를 발표할 거예요."
  ],
  [
    "EN",
    "represent",
    "These figures represent the number of visitors each month.",
    "이 수치들은 월별 방문객 수를 나타내요."
  ],
  [
    "EN",
    "reveal",
    "The test results revealed a problem with the water supply.",
    "검사 결과는 급수 시설에 문제가 있음을 드러냈어요."
  ],
  [
    "EN",
    "select",
    "Please select a seat before completing your booking.",
    "예약을 완료하기 전에 좌석을 선택해 주세요."
  ],
  [
    "EN",
    "separate",
    "Separate the paper from the plastic before recycling.",
    "재활용하기 전에 종이와 플라스틱을 분리하세요."
  ],
  [
    "EN",
    "strengthen",
    "Regular exercise can strengthen the muscles around your knees.",
    "규칙적으로 운동하면 무릎 주변 근육을 강화할 수 있어요."
  ],
  [
    "EN",
    "struggle",
    "Many students struggle to stay focused during long lectures.",
    "많은 학생이 긴 강의 시간에 집중력을 유지하려고 애써요."
  ],
  [
    "EN",
    "target",
    "The program targets people who are learning English for work.",
    "이 프로그램은 업무를 위해 영어를 배우는 사람들을 대상으로 해요."
  ],
  [
    "EN",
    "transform",
    "The renovation will transform the old factory into a library.",
    "이번 리모델링으로 오래된 공장이 도서관으로 바뀔 거예요."
  ],
  [
    "EN",
    "vary",
    "Ticket prices vary depending on the day of the week.",
    "입장권 가격은 요일에 따라 달라져요."
  ],
  [
    "EN",
    "advance",
    "The team hopes to advance the project before the deadline.",
    "팀은 마감일 전에 프로젝트를 진전시키기를 바라고 있어요."
  ],
  [
    "EN",
    "attract",
    "The flower's bright color helps attract bees.",
    "꽃의 선명한 색은 벌을 끌어들이는 데 도움이 돼요."
  ],
  [
    "EN",
    "combine",
    "Combine the flour and water until the dough is smooth.",
    "반죽이 매끄러워질 때까지 밀가루와 물을 섞으세요."
  ],
  [
    "EN",
    "depend",
    "Many small shops depend on regular customers.",
    "많은 작은 가게는 단골손님에게 의존해요."
  ],
  [
    "EN",
    "estimate",
    "We estimate that the repairs will cost about two million won.",
    "수리 비용이 약 200만 원 들 것으로 추정해요."
  ],
  [
    "EN",
    "generate",
    "The solar panels generate electricity during daylight hours.",
    "태양광 패널은 낮 동안 전기를 생산해요."
  ],
  [
    "EN",
    "tiny",
    "A tiny spider was hiding behind the picture frame.",
    "작은 거미 한 마리가 액자 뒤에 숨어 있었어요."
  ],
  [
    "EN",
    "upset",
    "Mina was upset when her best friend forgot her birthday.",
    "미나는 가장 친한 친구가 생일을 잊어서 속상했어요."
  ],
  [
    "EN",
    "wet",
    "Hang your wet jacket by the door to dry.",
    "젖은 재킷을 말리려면 문 옆에 걸어 두세요."
  ],
  [
    "EN",
    "wise",
    "It was wise to check the weather before hiking.",
    "등산하기 전에 날씨를 확인한 것은 현명한 선택이었어요."
  ],
  [
    "EN",
    "yellow",
    "The yellow bus stops in front of our school.",
    "노란 버스가 우리 학교 앞에 정차해요."
  ],
  [
    "EN",
    "curious",
    "The children were curious about how the robot moved.",
    "아이들은 로봇이 어떻게 움직이는지 궁금해했어요."
  ],
  [
    "EN",
    "foreign",
    "Learning a foreign language takes practice and patience.",
    "외국어를 배우려면 연습과 인내심이 필요해요."
  ],
  [
    "EN",
    "pleasant",
    "We had a pleasant walk along the river after dinner.",
    "우리는 저녁 식사 후 강변을 기분 좋게 산책했어요."
  ],
  [
    "EN",
    "strange",
    "I heard a strange noise coming from the kitchen.",
    "부엌에서 이상한 소리가 들렸어요."
  ],
  [
    "EN",
    "shy",
    "He was too shy to introduce himself to the class.",
    "그는 너무 수줍어서 반 친구들 앞에서 자기소개를 하지 못했어요."
  ],
  [
    "EN",
    "wild",
    "We saw wild deer near the forest at dawn.",
    "우리는 새벽에 숲 근처에서 야생 사슴을 봤어요."
  ],
  [
    "EN",
    "minor",
    "The bicycle had only minor damage after the fall.",
    "자전거는 넘어지고 나서 작은 손상만 입었어요."
  ],
  [
    "EN",
    "accessible",
    "The museum is accessible by subway and bus.",
    "그 박물관은 지하철과 버스로 쉽게 갈 수 있어요."
  ],
  [
    "EN",
    "accidental",
    "The accidental spill left coffee on my homework.",
    "실수로 커피를 쏟는 바람에 숙제에 커피가 묻었어요."
  ],
  [
    "EN",
    "amused",
    "The students were amused by the teacher's funny story.",
    "학생들은 선생님의 재미있는 이야기를 듣고 즐거워했어요."
  ],
  [
    "EN",
    "anxious",
    "I felt anxious while waiting for my exam results.",
    "시험 결과를 기다리는 동안 불안했어요."
  ],
  [
    "EN",
    "ashamed",
    "He felt ashamed of lying to his sister.",
    "그는 여동생에게 거짓말한 것을 부끄러워했어요."
  ],
  [
    "EN",
    "athletic",
    "My athletic cousin enjoys running and playing basketball.",
    "운동을 잘하는 사촌은 달리기와 농구를 즐겨요."
  ],
  [
    "EN",
    "attractive",
    "The café has an attractive garden full of flowers.",
    "그 카페에는 꽃이 가득한 매력적인 정원이 있어요."
  ],
  [
    "EN",
    "awkward",
    "There was an awkward silence after my joke failed.",
    "내 농담이 통하지 않자 어색한 침묵이 흘렀어요."
  ],
  [
    "EN",
    "brief",
    "The manager gave us a brief update before the meeting.",
    "관리자는 회의 전에 간단히 진행 상황을 알려 줬어요."
  ],
  [
    "EN",
    "carefree",
    "On vacation, we spent a carefree afternoon at the beach.",
    "휴가 중 우리는 걱정 없이 해변에서 오후를 보냈어요."
  ],
  [
    "EN",
    "casual",
    "The invitation says we can wear casual clothes.",
    "초대장에는 편한 평상복을 입어도 된다고 적혀 있어요."
  ],
  [
    "EN",
    "challenging",
    "The final math problem was challenging but interesting.",
    "마지막 수학 문제는 어렵지만 흥미로웠어요."
  ],
  [
    "EN",
    "charming",
    "We stayed in a charming little village near the sea.",
    "우리는 바다 근처의 매력적인 작은 마을에 머물렀어요."
  ],
  [
    "EN",
    "complicated",
    "The instructions were so complicated that I asked for help.",
    "설명이 너무 복잡해서 도움을 요청했어요."
  ],
  [
    "EN",
    "considerate",
    "It was considerate of you to save a seat for me.",
    "나를 위해 자리를 맡아 주다니 참 사려 깊었어요."
  ],
  [
    "EN",
    "cooperative",
    "The students were cooperative during the group project.",
    "학생들은 조별 과제를 하는 동안 서로 협조적이었어요."
  ],
  [
    "EN",
    "energetic",
    "Our puppy is most energetic early in the morning.",
    "우리 강아지는 이른 아침에 가장 활기차요."
  ],
  [
    "EN",
    "enthusiastic",
    "The new students were enthusiastic about joining the club.",
    "신입생들은 동아리에 가입하는 데 열정적이었어요."
  ],
  [
    "EN",
    "exact",
    "Please tell me the exact time the train leaves.",
    "기차가 출발하는 정확한 시간을 알려 주세요."
  ],
  [
    "EN",
    "fascinating",
    "I watched a fascinating documentary about deep-sea animals.",
    "심해 동물에 관한 매우 흥미로운 다큐멘터리를 봤어요."
  ],
  [
    "EN",
    "flexible",
    "Our coach is flexible about changing the practice schedule.",
    "우리 코치는 연습 일정 변경에 융통성 있게 대응해요."
  ],
  [
    "EN",
    "fortunate",
    "We were fortunate to catch the last bus home.",
    "운 좋게 집으로 가는 막차를 탔어요."
  ],
  [
    "EN",
    "frustrated",
    "She felt frustrated because the app kept crashing.",
    "앱이 계속 꺼지는 바람에 그녀는 답답하고 좌절감을 느꼈어요."
  ],
  [
    "EN",
    "graceful",
    "The dancer made a graceful turn across the stage.",
    "무용수는 무대 위에서 우아하게 회전했어요."
  ],
  [
    "EN",
    "hopeful",
    "I'm hopeful that my ankle will heal before the race.",
    "경기 전에 발목이 나을 거라는 희망을 품고 있어요."
  ],
  [
    "EN",
    "imaginative",
    "Her imaginative stories always surprise the class.",
    "그녀의 상상력이 풍부한 이야기는 늘 반 친구들을 놀라게 해요."
  ],
  [
    "EN",
    "impressive",
    "Your improvement in pronunciation is impressive.",
    "발음이 정말 인상적일 만큼 좋아졌네요."
  ],
  [
    "EN",
    "inexpensive",
    "We found an inexpensive restaurant near the station.",
    "역 근처에서 가격이 저렴한 식당을 찾았어요."
  ],
  [
    "EN",
    "invisible",
    "The marks are almost invisible under this light.",
    "이 조명 아래에서는 자국이 거의 보이지 않아요."
  ],
  [
    "EN",
    "memorable",
    "Our first camping trip was a memorable experience.",
    "첫 캠핑 여행은 기억에 남는 경험이었어요."
  ],
  [
    "EN",
    "mysterious",
    "A mysterious letter arrived without a sender's name.",
    "보낸 사람 이름이 없는 수수께끼 같은 편지가 도착했어요."
  ],
  [
    "EN",
    "neat",
    "Please keep your desk neat so you can find your books.",
    "책을 쉽게 찾을 수 있도록 책상을 깔끔하게 정리하세요."
  ],
  [
    "EN",
    "negative",
    "Try not to let one negative comment ruin your day.",
    "부정적인 댓글 하나 때문에 하루를 망치지 마세요."
  ],
  [
    "EN",
    "optimistic",
    "Despite the delay, the team remained optimistic.",
    "일정이 지연됐지만 팀은 여전히 낙관적이었어요."
  ],
  [
    "EN",
    "powerful",
    "The storm brought powerful winds to the coast.",
    "폭풍이 해안에 강력한 바람을 몰고 왔어요."
  ],
  [
    "EN",
    "precious",
    "This photo is precious because it's the last one with my grandmother.",
    "이 사진은 할머니와 함께 찍은 마지막 사진이라 소중해요."
  ],
  [
    "EN",
    "reasonable",
    "The repair shop offered a reasonable price.",
    "수리점에서 합리적인 가격을 제시했어요."
  ],
  [
    "EN",
    "respectful",
    "Please be respectful when someone else is speaking.",
    "다른 사람이 말할 때는 존중하는 태도를 보여 주세요."
  ],
  [
    "EN",
    "romantic",
    "They planned a romantic dinner by the lake.",
    "그들은 호숫가에서 낭만적인 저녁 식사를 계획했어요."
  ],
  [
    "EN",
    "skillful",
    "The skillful carpenter fixed the broken chair in minutes.",
    "능숙한 목수가 몇 분 만에 부서진 의자를 고쳤어요."
  ],
  [
    "EN",
    "thoughtful",
    "That was a thoughtful gift; you remembered my favorite book.",
    "내가 좋아하는 책을 기억하다니 정말 사려 깊은 선물이었어요."
  ],
  [
    "EN",
    "tight",
    "These shoes are too tight around my toes.",
    "이 신발은 발가락 부분이 너무 꽉 끼어요."
  ],
  [
    "EN",
    "uncomfortable",
    "The chair was uncomfortable during the long lecture.",
    "긴 강의 동안 의자가 불편했어요."
  ],
  [
    "EN",
    "unforgettable",
    "Seeing the northern lights was an unforgettable moment.",
    "오로라를 본 것은 잊을 수 없는 순간이었어요."
  ],
  [
    "EN",
    "ancient",
    "We visited the ruins of an ancient temple.",
    "우리는 고대 사원의 유적을 방문했어요."
  ],
  [
    "EN",
    "annual",
    "The school holds an annual science fair in October.",
    "학교는 매년 10월에 과학 전시회를 열어요."
  ],
  [
    "EN",
    "available",
    "Is this meeting room available after three o'clock?",
    "이 회의실은 세 시 이후에 사용할 수 있나요?"
  ],
  [
    "EN",
    "convenient",
    "Online check-in is convenient when you're in a hurry.",
    "바쁠 때는 온라인 체크인이 편리해요."
  ],
  [
    "EN",
    "daily",
    "A short daily walk can help clear your mind.",
    "매일 짧게 산책하면 머리를 맑게 하는 데 도움이 될 수 있어요."
  ],
  [
    "EN",
    "expensive",
    "That coat looks nice, but it's too expensive for me.",
    "그 코트는 멋지지만 내게는 너무 비싸요."
  ],
  [
    "EN",
    "familiar",
    "Her voice sounded familiar, but I couldn't remember her name.",
    "그녀의 목소리는 익숙했지만 이름이 기억나지 않았어요."
  ],
  [
    "EN",
    "international",
    "Students from ten countries joined the international event.",
    "열 개 나라에서 온 학생들이 국제 행사에 참가했어요."
  ],
  [
    "EN",
    "lucky",
    "We were lucky to find two empty seats on the train.",
    "기차에서 빈자리 두 개를 찾아서 운이 좋았어요."
  ],
  [
    "EN",
    "peaceful",
    "The park is peaceful before the crowds arrive.",
    "사람들이 몰려오기 전에는 공원이 평화로워요."
  ],
  [
    "EN",
    "regular",
    "Regular exercise helps me sleep better at night.",
    "규칙적인 운동은 밤에 숙면하는 데 도움이 돼요."
  ],
  [
    "EN",
    "adorable",
    "The kitten looked adorable sleeping in the basket.",
    "바구니 안에서 자는 새끼 고양이가 정말 사랑스러워 보였어요."
  ],
  [
    "EN",
    "allergic",
    "My brother is allergic to peanuts, so check the ingredients.",
    "남동생은 땅콩 알레르기가 있으니 재료를 확인해 주세요."
  ],
  [
    "EN",
    "blank",
    "Leave this box blank if you don't have a phone number.",
    "전화번호가 없으면 이 칸을 비워 두세요."
  ],
  [
    "EN",
    "blurry",
    "The photo is blurry because my hand moved.",
    "손이 움직여서 사진이 흐릿하게 나왔어요."
  ],
  [
    "EN",
    "bulky",
    "This bulky suitcase won't fit in the overhead compartment.",
    "이 부피가 큰 여행 가방은 머리 위 짐칸에 들어가지 않아요."
  ],
  [
    "EN",
    "central",
    "The library is in a central location near the bus terminal.",
    "도서관은 버스 터미널 근처의 중심 지역에 있어요."
  ],
  [
    "EN",
    "classic",
    "My father still enjoys classic movies from the 1960s.",
    "아버지는 아직도 1960년대의 고전 영화를 즐겨 보세요."
  ],
  [
    "EN",
    "dizzy",
    "I felt dizzy after spinning around too many times.",
    "너무 많이 빙빙 돈 뒤에 어지러웠어요."
  ],
  [
    "EN",
    "eager",
    "The children were eager to open their presents.",
    "아이들은 선물을 빨리 열어 보고 싶어 했어요."
  ],
  [
    "EN",
    "elderly",
    "The bus driver waited until the elderly passenger sat down.",
    "버스 기사는 나이가 지긋한 승객이 앉을 때까지 기다렸어요."
  ],
  [
    "EN",
    "equal",
    "All team members should have an equal chance to speak.",
    "모든 팀원에게 말할 기회가 동등하게 주어져야 해요."
  ],
  [
    "EN",
    "extra",
    "I packed an extra pair of socks for the hike.",
    "등산을 위해 양말 한 켤레를 여분으로 챙겼어요."
  ],
  [
    "EN",
    "fancy",
    "She wore a fancy dress to the award ceremony.",
    "그녀는 시상식에 화려한 드레스를 입고 갔어요."
  ],
  [
    "EN",
    "fierce",
    "A fierce dog barked at us from behind the fence.",
    "사나운 개가 울타리 뒤에서 우리를 향해 짖었어요."
  ],
  [
    "EN",
    "fashionable",
    "That style of jacket is fashionable this season.",
    "그런 스타일의 재킷은 이번 시즌에 유행해요."
  ],
  [
    "EN",
    "fuzzy",
    "My new blanket feels fuzzy and warm.",
    "새 담요는 보송보송하고 따뜻한 촉감이에요."
  ],
  [
    "EN",
    "guilty",
    "I felt guilty for forgetting to feed the fish.",
    "물고기에게 먹이를 주는 걸 잊어서 죄책감이 들었어요."
  ],
  [
    "EN",
    "innocent",
    "The evidence showed that the accused man was innocent.",
    "증거는 기소된 남자가 죄가 없다는 것을 보여 줬어요."
  ],
  [
    "EN",
    "obvious",
    "It was obvious that the dog wanted to go outside.",
    "개가 밖에 나가고 싶어 한다는 것은 분명했어요."
  ],
  [
    "EN",
    "perfect",
    "This table is the perfect size for our small kitchen.",
    "이 식탁은 우리 작은 부엌에 딱 맞는 완벽한 크기예요."
  ],
  [
    "EN",
    "plain",
    "He prefers plain white shirts without patterns.",
    "그는 무늬 없는 수수한 흰 셔츠를 더 좋아해요."
  ],
  [
    "EN",
    "rare",
    "It's rare to see snow in this town in April.",
    "이 마을에서 4월에 눈을 보는 일은 드물어요."
  ],
  [
    "EN",
    "selfish",
    "It was selfish to eat the whole cake without sharing.",
    "나눠 주지 않고 케이크를 혼자 다 먹은 건 이기적인 행동이었어요."
  ],
  [
    "EN",
    "sensible",
    "Wearing a helmet is a sensible choice when cycling.",
    "자전거를 탈 때 헬멧을 쓰는 것은 분별 있는 선택이에요."
  ],
  [
    "EN",
    "sharp",
    "Be careful: this knife has a very sharp blade.",
    "조심하세요. 이 칼날은 매우 날카로워요."
  ],
  [
    "EN",
    "strict",
    "Our teacher is strict about turning in homework on time.",
    "우리 선생님은 숙제를 제때 내는 것에 엄격하세요."
  ],
  [
    "EN",
    "various",
    "The market sells various kinds of fresh fruit.",
    "그 시장에서는 다양한 종류의 신선한 과일을 팔아요."
  ],
  [
    "EN",
    "acceptable",
    "A short delay is acceptable, but an hour is too long.",
    "조금 늦는 건 받아들일 만하지만 한 시간은 너무 길어요."
  ],
  [
    "EN",
    "cheap",
    "I bought a cheap umbrella, but it broke the next day.",
    "값싼 우산을 샀는데 다음 날 부러졌어요."
  ],
  [
    "EN",
    "brilliant",
    "She had a brilliant idea for saving water at school.",
    "그녀는 학교에서 물을 절약할 뛰어난 아이디어를 냈어요."
  ],
  [
    "EN",
    "cautious",
    "Be cautious when crossing the road in heavy rain.",
    "비가 많이 올 때 도로를 건널 때는 조심하세요."
  ],
  [
    "EN",
    "exhausting",
    "Moving all those boxes upstairs was exhausting.",
    "그 상자들을 전부 위층으로 옮기는 일은 몹시 힘들었어요."
  ],
  [
    "EN",
    "fake",
    "The shop was fined for selling fake designer bags.",
    "그 가게는 가짜 명품 가방을 팔아 벌금을 물었어요."
  ],
  [
    "EN",
    "false",
    "The article contained false information about the event.",
    "그 기사에는 행사에 관한 거짓 정보가 담겨 있었어요."
  ],
  [
    "EN",
    "faithful",
    "The faithful dog waited by the door for its owner.",
    "충실한 개는 문 옆에서 주인을 기다렸어요."
  ],
  [
    "EN",
    "fearless",
    "The fearless firefighter entered the burning building.",
    "두려움을 모르는 소방관이 불타는 건물에 들어갔어요."
  ],
  [
    "EN",
    "fertile",
    "Vegetables grow well in the fertile soil near the river.",
    "강 근처의 비옥한 토양에서는 채소가 잘 자라요."
  ],
  [
    "EN",
    "harmless",
    "The spider looks scary, but it's harmless to people.",
    "그 거미는 무섭게 생겼지만 사람에게 해가 없어요."
  ],
  [
    "EN",
    "horizontal",
    "Draw a horizontal line across the middle of the page.",
    "종이 가운데를 가로지르는 수평선을 그리세요."
  ],
  [
    "EN",
    "humorous",
    "His humorous speech made everyone laugh.",
    "그의 유머러스한 연설에 모두가 웃었어요."
  ],
  [
    "EN",
    "ideal",
    "A quiet room is ideal for recording clear audio.",
    "조용한 방은 깨끗한 음성을 녹음하기에 이상적이에요."
  ],
  [
    "EN",
    "immediate",
    "The alarm requires immediate attention from the staff.",
    "경보가 울렸으니 직원들의 즉각적인 대응이 필요해요."
  ],
  [
    "EN",
    "indoor",
    "The children played indoor games because it was raining.",
    "비가 와서 아이들은 실내 놀이를 했어요."
  ],
  [
    "EN",
    "itchy",
    "This sweater makes my neck itchy.",
    "이 스웨터를 입으면 목이 가려워요."
  ],
  [
    "EN",
    "loose",
    "These pants are too loose around the waist.",
    "이 바지는 허리 부분이 너무 헐렁해요."
  ],
  [
    "EN",
    "ignore",
    "Don't ignore the warning light on your car's dashboard.",
    "자동차 계기판의 경고등을 무시하지 마세요."
  ],
  [
    "EN",
    "imply",
    "Her silence seemed to imply that she disagreed.",
    "그녀의 침묵은 동의하지 않는다는 뜻을 암시하는 듯했어요."
  ],
  [
    "EN",
    "occur",
    "Power outages can occur during severe storms.",
    "심한 폭풍우가 치면 정전이 발생할 수 있어요."
  ],
  [
    "EN",
    "participate",
    "Students can participate in the debate without joining the club.",
    "학생들은 동아리에 가입하지 않아도 토론에 참여할 수 있어요."
  ],
  [
    "EN",
    "pursue",
    "After graduation, she decided to pursue a career in nursing.",
    "그녀는 졸업 후 간호 분야에서 경력을 쌓기로 결심했어요."
  ],
  [
    "EN",
    "recover",
    "It took him several weeks to recover from the injury.",
    "그는 부상에서 회복하는 데 몇 주가 걸렸어요."
  ],
  [
    "EN",
    "refer",
    "Please refer to the map on page twelve for the route.",
    "경로는 12쪽의 지도를 참고하세요."
  ],
  [
    "EN",
    "relate",
    "The report tries to relate sleep quality to daily stress.",
    "그 보고서는 수면의 질과 일상 스트레스를 관련지어 설명하려 해요."
  ],
  [
    "EN",
    "replace",
    "We need to replace the broken battery before the trip.",
    "여행 전에 고장 난 배터리를 교체해야 해요."
  ],
  [
    "EN",
    "request",
    "You can request a refund within seven days of purchase.",
    "구매 후 7일 이내에 환불을 요청할 수 있어요."
  ],
  [
    "EN",
    "retain",
    "The museum hopes to retain its original wooden windows.",
    "그 박물관은 원래의 나무 창문을 그대로 보존하고 싶어 해요."
  ],
  [
    "EN",
    "abrogate",
    "The new law will abrogate the outdated regulation.",
    "새 법은 시대에 뒤떨어진 규정을 폐지할 거예요."
  ],
  [
    "EN",
    "abstract",
    "The artist tried to abstract the shapes of birds into simple lines.",
    "화가는 새의 형태를 단순한 선으로 추상화하려 했어요."
  ],
  [
    "EN",
    "accelerate",
    "Adding another delivery truck could accelerate the process.",
    "배송 트럭을 한 대 더 투입하면 작업 속도를 높일 수 있어요."
  ],
  [
    "EN",
    "accommodate",
    "The hall can accommodate up to three hundred guests.",
    "그 홀은 손님을 최대 300명까지 수용할 수 있어요."
  ],
  [
    "EN",
    "accumulate",
    "Dust can accumulate behind furniture that is rarely moved.",
    "거의 움직이지 않는 가구 뒤에는 먼지가 쌓일 수 있어요."
  ],
  [
    "EN",
    "acknowledge",
    "The company finally acknowledged its mistake in the report.",
    "회사는 마침내 보고서에서 자신들의 실수를 인정했어요."
  ],
  [
    "EN",
    "acquire",
    "She hopes to acquire basic coding skills this year.",
    "그녀는 올해 기본적인 코딩 기술을 습득하고 싶어 해요."
  ],
  [
    "EN",
    "adapt",
    "We must adapt the lessons to meet each student's needs.",
    "학생마다 필요한 것이 다르므로 수업을 그에 맞게 조정해야 해요."
  ],
  [
    "EN",
    "advocate",
    "The organization advocates better access to public libraries.",
    "그 단체는 공공도서관의 접근성 개선을 옹호해요."
  ],
  [
    "EN",
    "aggregate",
    "The researcher will aggregate survey results from five schools.",
    "연구자는 다섯 학교의 설문 결과를 모아 하나로 취합할 거예요."
  ],
  [
    "EN",
    "alleviate",
    "A cold compress may help alleviate the swelling.",
    "냉찜질은 부기를 완화하는 데 도움이 될 수 있어요."
  ],
  [
    "EN",
    "amplify",
    "A microphone can amplify your voice in a large room.",
    "마이크는 넓은 공간에서 목소리를 증폭할 수 있어요."
  ],
  [
    "EN",
    "anticipate",
    "We anticipate heavy traffic near the stadium tonight.",
    "우리는 오늘 밤 경기장 근처에 교통 체증이 심할 것으로 예상해요."
  ],
  [
    "EN",
    "articulate",
    "She struggled to articulate why the decision felt unfair.",
    "그녀는 그 결정이 왜 불공평하게 느껴지는지 분명히 표현하기 어려워했어요."
  ],
  [
    "EN",
    "ascertain",
    "The technician checked the wiring to ascertain the cause of the failure.",
    "기술자는 고장 원인을 확인하기 위해 배선을 점검했어요."
  ],
  [
    "EN",
    "assign",
    "The teacher will assign a different task to each group.",
    "선생님은 각 조에 서로 다른 과제를 배정할 거예요."
  ],
  [
    "EN",
    "assimilate",
    "New students need time to assimilate into the school community.",
    "신입생들이 학교 공동체에 동화되려면 시간이 필요해요."
  ],
  [
    "EN",
    "attain",
    "With steady practice, she was able to attain her goal.",
    "꾸준히 연습한 끝에 그녀는 목표를 달성할 수 있었어요."
  ],
  [
    "EN",
    "authenticate",
    "You must authenticate your identity before changing the password.",
    "비밀번호를 변경하기 전에 본인 여부를 확인해야 해요."
  ],
  [
    "EN",
    "authorize",
    "Only a manager can authorize a refund above this amount.",
    "이 금액을 초과하는 환불은 관리자만 승인할 권한이 있어요."
  ],
  [
    "EN",
    "automate",
    "The team wants to automate the daily backup process.",
    "팀은 매일 하는 백업 작업을 자동화하려 해요."
  ],
  [
    "EN",
    "categorize",
    "The app lets you categorize expenses by type.",
    "이 앱에서는 지출을 유형별로 분류할 수 있어요."
  ],
  [
    "EN",
    "characterize",
    "Warm colors and natural wood characterize the café's interior.",
    "따뜻한 색감과 천연 목재가 그 카페 실내의 특징을 이뤄요."
  ],
  [
    "EN",
    "classify",
    "Scientists classify the samples according to their size and shape.",
    "과학자들은 표본을 크기와 모양에 따라 분류해요."
  ],
  [
    "EN",
    "coincide",
    "The festival dates coincide with our school vacation.",
    "축제 날짜가 우리 학교 방학 기간과 일치해요."
  ],
  [
    "EN",
    "collaborate",
    "Two local schools will collaborate on the science project.",
    "지역의 두 학교가 그 과학 프로젝트에서 협력할 거예요."
  ],
  [
    "EN",
    "compile",
    "The librarian compiled a reading list for new students.",
    "사서는 신입생을 위한 추천 도서 목록을 편집했어요."
  ],
  [
    "EN",
    "complement",
    "The fresh salad complements the rich pasta dish.",
    "신선한 샐러드는 맛이 진한 파스타 요리와 잘 어울려요."
  ],
  [
    "EN",
    "comprehend",
    "I couldn't comprehend the instructions until I saw a demonstration.",
    "시범을 보기 전까지는 설명을 이해할 수 없었어요."
  ],
  [
    "EN",
    "comprise",
    "The course comprises six lectures and a final project.",
    "이 강좌는 강의 여섯 개와 최종 과제로 구성돼 있어요."
  ],
  [
    "EN",
    "conceive",
    "The engineer conceived a safer way to store the batteries.",
    "그 기술자는 배터리를 더 안전하게 보관할 방법을 생각해 냈어요."
  ],
  [
    "EN",
    "conclude",
    "After reviewing the evidence, the panel concluded that the bridge was safe.",
    "증거를 검토한 뒤 위원회는 그 다리가 안전하다는 결론을 내렸어요."
  ],
  [
    "EN",
    "condense",
    "Please condense the report into a one-page summary.",
    "보고서를 한 페이지 분량의 요약문으로 압축해 주세요."
  ],
  [
    "EN",
    "confer",
    "The university will confer honorary degrees at the ceremony.",
    "그 대학은 행사에서 명예 학위를 수여할 예정이에요."
  ],
  [
    "EN",
    "configure",
    "You can configure the app to send notifications only at night.",
    "밤에만 알림을 보내도록 앱을 설정할 수 있어요."
  ],
  [
    "EN",
    "conform",
    "All new buildings must conform to the fire safety regulations.",
    "모든 신축 건물은 소방 안전 규정을 따라야 해요."
  ],
  [
    "EN",
    "confront",
    "The team had to confront unexpected delays during construction.",
    "그 팀은 공사 중 예상치 못한 지연에 직면해야 했어요."
  ],
  [
    "EN",
    "consolidate",
    "We consolidated three small databases into one system.",
    "작은 데이터베이스 세 개를 하나의 시스템으로 통합했어요."
  ],
  [
    "EN",
    "constitute",
    "Women constitute more than half of the research team.",
    "여성은 그 연구팀의 절반 이상을 구성해요."
  ],
  [
    "EN",
    "constrain",
    "A limited budget can constrain the choices available to a school.",
    "제한된 예산은 학교가 선택할 수 있는 대안을 줄일 수 있어요."
  ],
  [
    "EN",
    "construct",
    "Students constructed a model bridge from wooden sticks.",
    "학생들은 나무 막대로 다리 모형을 만들었어요."
  ],
  [
    "EN",
    "contemplate",
    "She's contemplating whether to study abroad next year.",
    "그녀는 내년에 유학할지 숙고하고 있어요."
  ],
  [
    "EN",
    "contradict",
    "The witness's new statement appears to contradict his earlier account.",
    "그 증인의 새 진술은 이전 설명과 모순되는 것으로 보여요."
  ],
  [
    "EN",
    "correlate",
    "Researchers correlated sleep duration with students' test scores.",
    "연구진은 수면 시간과 학생들의 시험 점수 사이의 상관관계를 분석했어요."
  ],
  [
    "EN",
    "deduce",
    "From the footprints, the detective deduced that two people had entered the room.",
    "형사는 발자국을 근거로 두 사람이 방에 들어왔다는 결론을 도출했어요."
  ],
  [
    "EN",
    "define",
    "The contract clearly defines each party's responsibilities.",
    "계약서는 각 당사자의 책임을 명확히 정의하고 있어요."
  ],
  [
    "EN",
    "derive",
    "Scientists derived a new formula from the experimental results.",
    "과학자들은 실험 결과에서 새로운 공식을 도출했어요."
  ],
  [
    "EN",
    "designate",
    "The city designated this street as a pedestrian-only zone.",
    "시는 이 거리를 보행자 전용 구역으로 지정했어요."
  ],
  [
    "EN",
    "detect",
    "The sensor can detect smoke before anyone sees a flame.",
    "이 감지기는 불꽃이 보이기 전에 연기를 감지할 수 있어요."
  ],
  [
    "EN",
    "differentiate",
    "Good teachers differentiate instruction according to students' needs.",
    "좋은 교사는 학생들의 필요에 따라 수업 방식을 다르게 적용해요."
  ],
  [
    "EN",
    "discriminate",
    "The software can discriminate between genuine and altered images.",
    "그 소프트웨어는 원본 이미지와 변형된 이미지를 식별할 수 있어요."
  ],
  [
    "EN",
    "elaborate",
    "Could you elaborate on how the new policy will affect students?",
    "새 정책이 학생들에게 어떤 영향을 줄지 좀 더 자세히 설명해 주시겠어요?"
  ],
  [
    "EN",
    "eliminate",
    "The new filter eliminates most of the dust from the air.",
    "새 필터는 공기 중 먼지 대부분을 제거해요."
  ],
  [
    "EN",
    "encompass",
    "The training program encompasses both theory and practical exercises.",
    "그 교육 과정은 이론과 실습을 모두 포괄해요."
  ],
  [
    "EN",
    "enhance",
    "Adding captions can enhance the accessibility of online videos.",
    "자막을 추가하면 온라인 영상의 접근성을 높일 수 있어요."
  ],
  [
    "EN",
    "enumerate",
    "The guide enumerates five steps for submitting an application.",
    "안내문에는 신청서를 제출하는 다섯 단계가 열거되어 있어요."
  ],
  [
    "EN",
    "exaggerate",
    "Don't exaggerate the risks just to win the argument.",
    "논쟁에서 이기려고 위험을 과장하지 마세요."
  ],
  [
    "EN",
    "exemplify",
    "Her careful work exemplifies the standards we expect from our team.",
    "그녀의 꼼꼼한 업무는 우리 팀이 기대하는 기준을 잘 보여 줘요."
  ],
  [
    "EN",
    "exclude",
    "The ticket price excludes meals and transportation.",
    "티켓 가격에는 식사와 교통비가 포함되지 않아요."
  ],
  [
    "EN",
    "exhibit",
    "The museum will exhibit paintings by local artists next month.",
    "박물관은 다음 달에 지역 예술가들의 그림을 전시할 예정이에요."
  ],
  [
    "EN",
    "facilitate",
    "The online form should facilitate faster registration.",
    "온라인 양식은 더 빠른 등록을 돕도록 만들어졌어요."
  ],
  [
    "EN",
    "formulate",
    "The committee formulated a plan to reduce food waste.",
    "위원회는 음식물 쓰레기를 줄이기 위한 계획을 수립했어요."
  ],
  [
    "EN",
    "postulate",
    "The researchers postulated that the unknown particle had a very short lifetime.",
    "연구진은 미지의 입자가 매우 짧은 수명을 가진다고 가정했어요."
  ],
  [
    "EN",
    "illustrate",
    "This diagram illustrates how the heart pumps blood.",
    "이 도표는 심장이 혈액을 어떻게 펌프질하는지 설명해 줘요."
  ],
  [
    "EN",
    "implement",
    "The hospital will implement the new safety rules on Monday.",
    "병원은 월요일부터 새로운 안전 규칙을 시행할 예정이에요."
  ],
  [
    "EN",
    "incorporate",
    "The designer incorporated customer feedback into the next version.",
    "디자이너는 다음 버전에 고객 의견을 반영했어요."
  ],
  [
    "EN",
    "infer",
    "We can infer from the wet ground that it rained overnight.",
    "젖은 땅을 보고 밤사이에 비가 왔다고 추론할 수 있어요."
  ],
  [
    "EN",
    "integrate",
    "The school plans to integrate coding into its science classes.",
    "학교는 과학 수업에 코딩을 통합할 계획이에요."
  ],
  [
    "EN",
    "hypothesize",
    "The students hypothesized that plants would grow faster in natural light.",
    "학생들은 식물이 자연광에서 더 빨리 자랄 것이라는 가설을 세웠어요."
  ],
  [
    "EN",
    "justify",
    "Can you justify spending so much on equipment we rarely use?",
    "거의 쓰지 않는 장비에 그렇게 많은 돈을 쓴 이유를 정당화할 수 있나요?"
  ],
  [
    "EN",
    "manipulate",
    "The editor manipulated the image to make the sky appear brighter.",
    "편집자는 하늘이 더 밝아 보이도록 이미지를 조작했어요."
  ],
  [
    "EN",
    "mediate",
    "A neutral counselor helped mediate the dispute between the neighbors.",
    "중립적인 상담사가 이웃 사이의 분쟁을 중재하는 데 도움을 줬어요."
  ],
  [
    "EN",
    "modify",
    "You can modify the reservation up to a day before arrival.",
    "도착 하루 전까지 예약을 변경할 수 있어요."
  ],
  [
    "EN",
    "monitor",
    "Nurses monitor patients' temperatures throughout the night.",
    "간호사들은 밤새 환자들의 체온을 관찰해요."
  ],
  [
    "EN",
    "negotiate",
    "The tenants negotiated a longer lease with the landlord.",
    "세입자들은 집주인과 더 긴 임대 기간을 협상했어요."
  ],
  [
    "EN",
    "omit",
    "You can omit your middle name if the form doesn't require it.",
    "서류에 요구되지 않는다면 중간 이름은 생략해도 돼요."
  ],
  [
    "EN",
    "perceive",
    "Children may perceive the same event differently from adults.",
    "아이들은 같은 사건을 어른들과 다르게 인식할 수 있어요."
  ],
  [
    "EN",
    "predict",
    "The forecast predicts heavy rain in the afternoon.",
    "일기예보에서는 오후에 비가 많이 올 것으로 예측해요."
  ],
  [
    "EN",
    "presume",
    "I presumed the shop was closed because the lights were off.",
    "불이 꺼져 있어서 가게가 문을 닫았다고 추정했어요."
  ],
  [
    "EN",
    "proceed",
    "Once your documents are approved, you can proceed to payment.",
    "서류가 승인되면 결제 단계로 진행할 수 있어요."
  ],
  [
    "EN",
    "promote",
    "The campaign promotes the use of reusable shopping bags.",
    "이 캠페인은 재사용 장바구니 사용을 장려해요."
  ],
  [
    "EN",
    "propose",
    "Several residents proposed adding more benches to the park.",
    "주민 몇 명이 공원에 벤치를 더 설치하자고 제안했어요."
  ],
  [
    "EN",
    "qualify",
    "You must complete the course to qualify for the certificate.",
    "자격증을 받을 자격을 갖추려면 그 강좌를 이수해야 해요."
  ],
  [
    "EN",
    "quantify",
    "It's difficult to quantify how much confidence the training gave her.",
    "그 훈련이 그녀에게 얼마나 많은 자신감을 줬는지 수치로 나타내기는 어려워요."
  ],
  [
    "EN",
    "reconcile",
    "The accountant reconciled the bank statement with the company's records.",
    "회계사는 은행 거래 내역과 회사 장부의 금액을 대조해 맞췄어요."
  ],
  [
    "EN",
    "refine",
    "After the trial run, the team refined the design to reduce noise.",
    "시범 운전 후 팀은 소음을 줄이도록 설계를 개선했어요."
  ],
  [
    "EN",
    "reinforce",
    "Regular practice reinforces what students learn in class.",
    "규칙적인 연습은 학생들이 수업에서 배운 내용을 강화해 줘요."
  ],
  [
    "EN",
    "render",
    "The road repairs rendered the bridge inaccessible for two days.",
    "도로 보수 공사 때문에 이틀 동안 그 다리를 이용할 수 없게 됐어요."
  ],
  [
    "EN",
    "resolve",
    "The customer service team resolved my billing problem within a day.",
    "고객 지원팀은 하루 만에 내 요금 청구 문제를 해결했어요."
  ],
  [
    "EN",
    "revise",
    "I revised the essay after reading my teacher's comments.",
    "선생님의 의견을 읽은 뒤 글을 수정했어요."
  ],
  [
    "EN",
    "specify",
    "Please specify the size and color when placing your order.",
    "주문할 때 크기와 색상을 명시해 주세요."
  ],
  [
    "EN",
    "stimulate",
    "The teacher used puzzles to stimulate the children's curiosity.",
    "선생님은 아이들의 호기심을 자극하려고 퍼즐을 활용했어요."
  ],
  [
    "EN",
    "substantiate",
    "The reporter could not substantiate the claim with reliable evidence.",
    "기자는 믿을 만한 증거로 그 주장을 입증하지 못했어요."
  ],
  [
    "EN",
    "substitute",
    "You can substitute yogurt for cream in this recipe.",
    "이 조리법에서는 크림 대신 요구르트를 사용해도 돼요."
  ],
  [
    "EN",
    "summarize",
    "At the end of class, each group summarized its findings.",
    "수업이 끝날 때 각 조는 조사 결과를 요약했어요."
  ],
  [
    "EN",
    "synthesize",
    "The students synthesized ideas from several articles into one presentation.",
    "학생들은 여러 글에서 얻은 아이디어를 종합해 하나의 발표 자료로 만들었어요."
  ],
  [
    "EN",
    "theorize",
    "Historians theorize that the settlement was abandoned after a long drought.",
    "역사학자들은 오랜 가뭄 후에 그 정착지가 버려졌다고 추정하는 이론을 세웠어요."
  ],
  [
    "EN",
    "transmit",
    "The device transmits temperature readings to the control room.",
    "그 장치는 온도 측정값을 관제실로 전송해요."
  ],
  [
    "EN",
    "validate",
    "The researchers repeated the experiment to validate their initial findings.",
    "연구진은 초기 연구 결과를 검증하기 위해 실험을 반복했어요."
  ],
  [
    "EN",
    "verify",
    "Please verify your email address before signing in.",
    "로그인하기 전에 이메일 주소를 인증해 주세요."
  ],
  [
    "EN",
    "withstand",
    "These windows can withstand strong coastal winds.",
    "이 창문은 해안의 강한 바람을 견딜 수 있어요."
  ],
  [
    "EN",
    "acclimate",
    "New employees need time to acclimate to the night shift.",
    "신입 직원들이 야간 근무에 적응하려면 시간이 필요해요."
  ],
  [
    "EN",
    "admonish",
    "The coach admonished the players for ignoring the safety rules.",
    "코치는 안전 규칙을 무시한 선수들을 훈계했어요."
  ],
  [
    "EN",
    "amend",
    "The committee voted to amend the outdated rule.",
    "위원회는 오래된 규칙을 수정하기로 표결했어요."
  ],
  [
    "EN",
    "anecdote",
    "She opened her speech with an anecdote about her first day at work.",
    "그녀는 직장 첫날에 관한 일화로 연설을 시작했어요."
  ],
  [
    "EN",
    "appraise",
    "An independent expert appraised the painting before the sale.",
    "판매 전에 독립적인 전문가가 그 그림의 가치를 평가했어요."
  ],
  [
    "EN",
    "arbitrate",
    "A retired judge agreed to arbitrate the disagreement between the two companies.",
    "은퇴한 판사가 두 회사의 의견 충돌을 중재하기로 동의했어요."
  ],
  [
    "EN",
    "assail",
    "Critics assailed the proposal for ignoring the needs of rural communities.",
    "비평가들은 농촌 지역의 필요를 무시했다며 그 제안을 맹렬히 비판했어요."
  ],
  [
    "EN",
    "bolster",
    "The positive reviews helped bolster confidence in the new restaurant.",
    "좋은 후기들이 새 식당에 대한 신뢰를 높이는 데 도움이 됐어요."
  ],
  [
    "EN",
    "broach",
    "She waited until dinner was over to broach the subject of moving.",
    "그녀는 저녁 식사가 끝나기를 기다렸다가 이사 이야기를 꺼냈어요."
  ],
  [
    "EN",
    "circumvent",
    "The company tried to circumvent the rules by using a legal loophole.",
    "그 회사는 법의 허점을 이용해 규정을 우회하려 했어요."
  ],
  [
    "EN",
    "coalesce",
    "Several neighborhood groups coalesced into a single volunteer organization.",
    "여러 동네 모임이 하나의 자원봉사 단체로 합쳐졌어요."
  ],
  [
    "EN",
    "corroborate",
    "Security camera footage corroborated the driver's account of the accident.",
    "보안 카메라 영상이 사고에 대한 운전자의 진술을 뒷받침했어요."
  ],
  [
    "EN",
    "deem",
    "The building was deemed unsafe after the earthquake.",
    "지진 이후 그 건물은 안전하지 않은 것으로 여겨졌어요."
  ],
  [
    "EN",
    "denote",
    "On this map, a blue line denotes a river.",
    "이 지도에서 파란 선은 강을 나타내요."
  ],
  [
    "EN",
    "deplete",
    "Years of drought have depleted the village's water reserves.",
    "수년간 이어진 가뭄으로 마을의 저장된 물이 고갈됐어요."
  ],
  [
    "EN",
    "deprecate",
    "The writer deprecated the practice of judging people by their accents.",
    "그 작가는 억양으로 사람을 평가하는 관행을 비난했어요."
  ],
  [
    "EN",
    "deviate",
    "The train had to deviate from its usual route because of flooding.",
    "홍수 때문에 열차는 평소 운행 경로에서 벗어나야 했어요."
  ],
  [
    "EN",
    "diminish",
    "The pain began to diminish after she rested for an hour.",
    "한 시간 동안 쉬자 통증이 점차 줄어들기 시작했어요."
  ],
  [
    "EN",
    "disclose",
    "The seller must disclose any known problems with the property.",
    "판매자는 해당 부동산에 대해 알고 있는 문제를 공개해야 해요."
  ],
  [
    "EN",
    "dispel",
    "The doctor's explanation helped dispel my worries about the test.",
    "의사의 설명은 검사에 대한 내 걱정을 덜어 주었어요."
  ],
  [
    "EN",
    "disseminate",
    "The health department disseminated safety guidelines through local schools.",
    "보건 당국은 지역 학교를 통해 안전 지침을 널리 배포했어요."
  ],
  [
    "EN",
    "distort",
    "A wide-angle lens can distort the shape of objects near the edge of a photo.",
    "광각 렌즈는 사진 가장자리의 물체 모양을 왜곡할 수 있어요."
  ],
  [
    "EN",
    "divulge",
    "The lawyer refused to divulge confidential details of the case.",
    "변호사는 사건의 기밀 사항을 누설하기를 거부했어요."
  ],
  [
    "EN",
    "elicit",
    "The teacher asked open-ended questions to elicit thoughtful answers.",
    "선생님은 깊이 생각한 답을 이끌어 내기 위해 개방형 질문을 했어요."
  ],
  [
    "EN",
    "embody",
    "The new library embodies the town's commitment to public education.",
    "새 도서관은 공교육에 대한 마을의 의지를 구체적으로 보여 줘요."
  ],
  [
    "EN",
    "entail",
    "Working abroad may entail learning a new language.",
    "해외에서 일하는 데는 새로운 언어를 배우는 일이 수반될 수 있어요."
  ],
  [
    "EN",
    "equate",
    "You shouldn't equate a high price with high quality.",
    "높은 가격을 높은 품질과 동일시해서는 안 돼요."
  ],
  [
    "EN",
    "evoke",
    "The smell of pine trees evoked memories of childhood camping trips.",
    "솔향기가 어린 시절 캠핑을 갔던 기억을 떠올리게 했어요."
  ],
  [
    "EN",
    "exacerbate",
    "Skipping meals can exacerbate fatigue during a long workday.",
    "긴 근무일에 끼니를 거르면 피로가 더 심해질 수 있어요."
  ],
  [
    "EN",
    "extrapolate",
    "Scientists extrapolated future trends from ten years of climate data.",
    "과학자들은 10년간의 기후 자료를 바탕으로 미래 추세를 추정했어요."
  ],
  [
    "EN",
    "foster",
    "The reading club fosters friendships among students from different grades.",
    "독서 모임은 학년이 다른 학생들 사이에 우정을 길러 줘요."
  ],
  [
    "EN",
    "impede",
    "A fallen tree impeded traffic on the narrow mountain road.",
    "쓰러진 나무 한 그루가 좁은 산길의 교통을 방해했어요."
  ],
  [
    "EN",
    "inhibit",
    "Fear of making mistakes can inhibit students from speaking English.",
    "실수에 대한 두려움은 학생들이 영어로 말하는 것을 주저하게 만들 수 있어요."
  ],
  [
    "EN",
    "instigate",
    "Investigators found that one employee had instigated the argument.",
    "조사관들은 직원 한 명이 말다툼을 부추긴 사실을 알아냈어요."
  ],
  [
    "EN",
    "invoke",
    "The speaker invoked a famous historical example to support her argument.",
    "연사는 자신의 주장을 뒷받침하기 위해 유명한 역사적 사례를 언급했어요."
  ],
  [
    "EN",
    "mitigate",
    "Planting trees can help mitigate the effects of summer heat in cities.",
    "나무를 심는 것은 도시의 여름 더위 영향을 완화하는 데 도움이 될 수 있어요."
  ],
  [
    "EN",
    "negate",
    "One small error does not negate the value of all your hard work.",
    "작은 실수 하나가 그동안의 모든 노력을 무효로 만드는 것은 아니에요."
  ],
  [
    "EN",
    "obscure",
    "Thick fog obscured our view of the lighthouse.",
    "짙은 안개가 등대의 모습을 가렸어요."
  ],
  [
    "EN",
    "perpetuate",
    "Repeating the false rumor only perpetuates the misunderstanding.",
    "잘못된 소문을 반복하면 오해가 계속 이어질 뿐이에요."
  ],
  [
    "EN",
    "portray",
    "The film portrays the scientist as a determined but lonely person.",
    "그 영화는 과학자를 의지가 강하지만 외로운 사람으로 묘사해요."
  ],
  [
    "EN",
    "prevail",
    "After hours of debate, the proposal supported by most residents prevailed.",
    "몇 시간의 토론 끝에 주민 대다수가 지지한 제안이 채택됐어요."
  ],
  [
    "EN",
    "prohibit",
    "The school prohibits students from using phones during exams.",
    "학교는 시험 중 학생들의 휴대전화 사용을 금지해요."
  ],
  [
    "EN",
    "proliferate",
    "Small cafés began to proliferate around the new train station.",
    "새 기차역 주변에 작은 카페가 급격히 늘어나기 시작했어요."
  ],
  [
    "EN",
    "reiterate",
    "The manager reiterated that all visitors must wear safety helmets.",
    "관리자는 모든 방문객이 안전모를 착용해야 한다고 다시 강조했어요."
  ],
  [
    "EN",
    "scrutinize",
    "The auditor scrutinized every expense listed in the report.",
    "감사관은 보고서에 적힌 모든 지출 항목을 면밀히 조사했어요."
  ],
  [
    "EN",
    "supersede",
    "The updated guidelines will supersede the rules published last year.",
    "새 지침은 지난해 발표된 규정을 대체할 예정이에요."
  ],
  [
    "EN",
    "undermine",
    "Constant interruptions can undermine a student's concentration.",
    "계속되는 방해는 학생의 집중력을 떨어뜨릴 수 있어요."
  ],
  [
    "EN",
    "underpin",
    "Clear evidence must underpin any serious scientific claim.",
    "진지한 과학적 주장은 반드시 명확한 증거에 기반해야 해요."
  ],
  [
    "EN",
    "uphold",
    "The appeals court decided to uphold the original ruling.",
    "항소법원은 원심 판결을 유지하기로 결정했어요."
  ],
  [
    "EN",
    "accurate",
    "The clock is accurate to within one second per month.",
    "이 시계는 한 달 동안 오차가 1초 이내일 만큼 정확해요."
  ],
  [
    "EN",
    "additional",
    "We need additional chairs for the guests arriving tonight.",
    "오늘 밤 도착하는 손님들을 위해 의자가 더 필요해요."
  ],
  [
    "EN",
    "appropriate",
    "Jeans may not be appropriate for a formal job interview.",
    "격식을 차리는 취업 면접에는 청바지가 적절하지 않을 수 있어요."
  ],
  [
    "EN",
    "beneficial",
    "Daily stretching can be beneficial for people who sit for long hours.",
    "매일 스트레칭을 하는 것은 오랫동안 앉아 있는 사람들에게 도움이 될 수 있어요."
  ],
  [
    "EN",
    "broad",
    "The course offers a broad introduction to modern European history.",
    "그 강좌는 현대 유럽사를 폭넓게 소개해요."
  ],
  [
    "EN",
    "capable",
    "The new employee is capable of handling difficult customer requests.",
    "신입 직원은 까다로운 고객 요청도 처리할 수 있는 능력이 있어요."
  ],
  [
    "EN",
    "chief",
    "The chief reason for the delay was a shortage of materials.",
    "지연의 주된 이유는 자재 부족이었어요."
  ],
  [
    "EN",
    "civil",
    "Civil rights apply to everyone, regardless of their background.",
    "시민권은 배경에 관계없이 모두에게 적용돼요."
  ],
  [
    "EN",
    "commercial",
    "The building is in a commercial district near the airport.",
    "그 건물은 공항 근처 상업 지구에 있어요."
  ],
  [
    "EN",
    "competitive",
    "The company offers competitive salaries to attract experienced engineers.",
    "그 회사는 경력 있는 엔지니어를 유치하기 위해 경쟁력 있는 급여를 제공해요."
  ],
  [
    "EN",
    "considerable",
    "The repairs will require a considerable amount of time and money.",
    "수리에는 상당한 시간과 비용이 필요할 거예요."
  ],
  [
    "EN",
    "constant",
    "The constant noise from the construction site made it hard to study.",
    "공사장에서 끊임없이 들리는 소음 때문에 공부하기가 어려웠어요."
  ],
  [
    "EN",
    "cultural",
    "The festival gives visitors a chance to experience local cultural traditions.",
    "그 축제는 방문객에게 지역 문화 전통을 체험할 기회를 줘요."
  ],
  [
    "EN",
    "deliberate",
    "The damage was deliberate, not an accident.",
    "그 피해는 사고가 아니라 고의로 일어난 것이었어요."
  ],
  [
    "EN",
    "dependent",
    "Young children are dependent on adults for food and shelter.",
    "어린아이들은 음식과 거처를 어른들에게 의존해요."
  ],
  [
    "EN",
    "direct",
    "There is no direct train from this town to the airport.",
    "이 마을에서 공항으로 바로 가는 직행 열차는 없어요."
  ],
  [
    "EN",
    "distinct",
    "The two paintings use distinct styles, even though they share the same theme.",
    "두 그림은 주제가 같지만 화풍은 뚜렷하게 달라요."
  ],
  [
    "EN",
    "domestic",
    "Domestic flights leave from Terminal 1.",
    "국내선 항공편은 1번 터미널에서 출발해요."
  ],
  [
    "EN",
    "dramatic",
    "The patient's condition showed a dramatic improvement overnight.",
    "환자의 상태가 하룻밤 사이에 극적으로 좋아졌어요."
  ],
  [
    "EN",
    "educational",
    "The museum offers educational workshops for primary school students.",
    "박물관은 초등학생을 위한 교육 워크숍을 제공해요."
  ],
  [
    "EN",
    "efficient",
    "The new dishwasher uses less water and is more efficient than the old one.",
    "새 식기세척기는 물을 적게 쓰고 기존 제품보다 효율적이에요."
  ],
  [
    "EN",
    "enormous",
    "An enormous whale surfaced beside the boat.",
    "거대한 고래 한 마리가 배 옆으로 수면 위에 올라왔어요."
  ],
  [
    "EN",
    "financial",
    "Before signing the loan agreement, consider the financial risks.",
    "대출 계약서에 서명하기 전에 재정적 위험을 고려하세요."
  ],
  [
    "EN",
    "former",
    "My former teacher still sends me a message on my birthday.",
    "예전에 가르쳐 주시던 선생님은 지금도 생일에 연락을 주세요."
  ],
  [
    "EN",
    "formal",
    "You must submit a formal request to change the registered address.",
    "등록된 주소를 바꾸려면 공식적인 요청서를 제출해야 해요."
  ],
  [
    "EN",
    "frequent",
    "Frequent train delays have frustrated commuters this month.",
    "이번 달 잦은 열차 지연으로 통근자들이 불편을 겪었어요."
  ],
  [
    "EN",
    "fundamental",
    "Understanding fractions is fundamental to learning more advanced mathematics.",
    "분수를 이해하는 것은 더 높은 수준의 수학을 배우는 데 기본이 돼요."
  ],
  [
    "EN",
    "initial",
    "Our initial estimate was too low because we overlooked shipping costs.",
    "배송비를 빠뜨리는 바람에 초기 예상 금액이 너무 낮았어요."
  ],
  [
    "EN",
    "limited",
    "Seats are limited, so please book before Friday.",
    "좌석 수가 제한되어 있으니 금요일 전까지 예약해 주세요."
  ],
  [
    "EN",
    "overall",
    "Despite two mistakes, her overall performance was excellent.",
    "실수가 두 번 있었지만 그녀의 전반적인 성과는 훌륭했어요."
  ],
  [
    "EN",
    "particular",
    "Is there a particular reason you chose this university?",
    "이 대학을 선택한 특별한 이유가 있나요?"
  ],
  [
    "EN",
    "political",
    "The discussion focused on the political consequences of the decision.",
    "토론은 그 결정이 가져올 정치적 결과에 초점을 맞췄어요."
  ],
  [
    "EN",
    "professional",
    "We hired a professional photographer for the family portrait.",
    "가족사진을 찍기 위해 전문 사진작가를 고용했어요."
  ],
  [
    "EN",
    "proper",
    "Be sure to use the proper tools when repairing electrical equipment.",
    "전기 장비를 수리할 때는 반드시 적절한 공구를 사용하세요."
  ],
  [
    "EN",
    "relevant",
    "Please include only the experience relevant to this job.",
    "이 직무와 관련 있는 경력만 기재해 주세요."
  ],
  [
    "EN",
    "reliable",
    "The backup generator provides a reliable source of power during outages.",
    "예비 발전기는 정전 시 믿을 만한 전력 공급원이 돼요."
  ],
  [
    "EN",
    "remarkable",
    "Her recovery after the surgery was remarkable.",
    "수술 후 그녀의 회복은 놀라울 정도였어요."
  ],
  [
    "EN",
    "significant",
    "There was a significant increase in the number of cyclists this year.",
    "올해 자전거 이용자 수가 크게 증가했어요."
  ],
  [
    "EN",
    "slight",
    "I noticed a slight change in the color of the water.",
    "물 색깔이 약간 달라진 것을 알아챘어요."
  ],
  [
    "EN",
    "sufficient",
    "We don't have sufficient evidence to reach a final conclusion.",
    "최종 결론을 내리기에는 증거가 충분하지 않아요."
  ],
  [
    "EN",
    "technical",
    "The manual explains the technical requirements for installing the program.",
    "설명서에는 프로그램 설치에 필요한 기술적 요구 사항이 나와 있어요."
  ],
  [
    "EN",
    "temporary",
    "The library has moved to a temporary location during renovations.",
    "도서관은 보수 공사 동안 임시 장소로 이전했어요."
  ],
  [
    "EN",
    "theoretical",
    "The theoretical model predicts what would happen in a perfect vacuum.",
    "그 이론적 모형은 완전한 진공 상태에서 어떤 일이 일어날지 예측해요."
  ],
  [
    "EN",
    "unique",
    "Each handmade bowl has a unique shape and pattern.",
    "수공예 그릇은 저마다 독특한 모양과 무늬를 가지고 있어요."
  ],
  [
    "EN",
    "urban",
    "Urban residents often rely on public transportation.",
    "도시 주민들은 대중교통에 의존하는 경우가 많아요."
  ],
  [
    "EN",
    "widespread",
    "The storm caused widespread power outages across the region.",
    "폭풍으로 그 지역 곳곳에서 대규모 정전이 발생했어요."
  ],
  [
    "EN",
    "academic",
    "She received an academic award for her research in chemistry.",
    "그녀는 화학 연구 성과로 학술상을 받았어요."
  ],
  [
    "EN",
    "adaptive",
    "Adaptive software adjusts the lesson difficulty based on a student's progress.",
    "적응형 소프트웨어는 학생의 학습 진도에 맞춰 수업 난이도를 조절해요."
  ],
  [
    "EN",
    "analogous",
    "The human heart is analogous to a pump in the way it moves fluid.",
    "인간의 심장은 액체를 이동시킨다는 점에서 펌프와 유사해요."
  ],
  [
    "EN",
    "analytical",
    "Her analytical approach helped the team identify the source of the error.",
    "그녀의 분석적인 접근 방식은 팀이 오류의 원인을 찾는 데 도움이 됐어요."
  ],
  [
    "EN",
    "anomalous",
    "The scientist checked the equipment after recording an anomalous reading.",
    "과학자는 이례적인 측정값이 나오자 장비를 점검했어요."
  ],
  [
    "EN",
    "applicable",
    "These safety rules are applicable to everyone working in the laboratory.",
    "이 안전 규칙은 실험실에서 일하는 모든 사람에게 적용돼요."
  ],
  [
    "EN",
    "arbitrary",
    "The deadline seemed arbitrary because no one explained why it was chosen.",
    "마감일을 그렇게 정한 이유를 아무도 설명하지 않아 임의로 정해진 것처럼 보였어요."
  ],
  [
    "EN",
    "artificial",
    "The flowers look real, but they're made from artificial materials.",
    "그 꽃들은 진짜처럼 보이지만 인공 재료로 만들어졌어요."
  ],
  [
    "EN",
    "authentic",
    "The restaurant serves authentic regional dishes prepared from traditional recipes.",
    "그 식당은 전통 조리법으로 만든 정통 지역 요리를 제공해요."
  ],
  [
    "EN",
    "autonomous",
    "The factory is testing autonomous vehicles that move supplies between buildings.",
    "그 공장은 건물 사이로 물품을 운반하는 자율주행 차량을 시험하고 있어요."
  ],
  [
    "EN",
    "coherent",
    "She gave a coherent explanation of what happened during the experiment.",
    "그녀는 실험 중에 일어난 일을 일관되고 이해하기 쉽게 설명했어요."
  ],
  [
    "EN",
    "cognitive",
    "Regular sleep is important for cognitive functions such as memory and attention.",
    "규칙적인 수면은 기억력과 주의력 같은 인지 기능에 중요해요."
  ],
  [
    "EN",
    "compatible",
    "This charger is compatible with most phones that support USB-C.",
    "이 충전기는 USB-C를 지원하는 대부분의 휴대전화와 호환돼요."
  ],
  [
    "EN",
    "comprehensive",
    "The guide provides a comprehensive overview of the scholarship application process.",
    "그 안내서는 장학금 신청 절차를 포괄적으로 설명해요."
  ],
  [
    "EN",
    "conclusive",
    "The test results were not conclusive, so doctors ordered another examination.",
    "검사 결과가 확정적이지 않아 의사들은 추가 검사를 지시했어요."
  ],
  [
    "EN",
    "conditional",
    "The university offered her conditional admission pending her final exam results.",
    "대학은 최종 시험 결과를 확인하는 조건으로 그녀에게 입학을 허가했어요."
  ],
  [
    "EN",
    "consecutive",
    "He worked three consecutive night shifts and then took two days off.",
    "그는 3일 연속 야간 근무를 한 뒤 이틀을 쉬었어요."
  ],
  [
    "EN",
    "consistent",
    "Her answers were consistent with the information in the official report.",
    "그녀의 답변은 공식 보고서의 정보와 일치했어요."
  ],
  [
    "EN",
    "contemporary",
    "The gallery features works by contemporary Korean artists.",
    "그 미술관은 동시대 한국 예술가들의 작품을 전시해요."
  ],
  [
    "EN",
    "conventional",
    "Unlike conventional ovens, this device cooks food with steam.",
    "이 기기는 기존의 일반 오븐과 달리 증기로 음식을 조리해요."
  ],
  [
    "EN",
    "corresponding",
    "Please write your answers in the corresponding boxes on the form.",
    "서류에서 각 질문에 해당하는 칸에 답을 적어 주세요."
  ],
  [
    "EN",
    "credible",
    "The journalist relied on credible sources before publishing the story.",
    "기자는 기사를 발표하기 전에 신뢰할 만한 자료를 확인했어요."
  ],
  [
    "EN",
    "critical",
    "The review offers a critical assessment of the study's methods.",
    "그 평론은 연구 방법을 비판적으로 평가해요."
  ],
  [
    "EN",
    "cumulative",
    "The cumulative total includes sales from January through June.",
    "누적 합계에는 1월부터 6월까지의 매출이 포함돼요."
  ],
  [
    "EN",
    "deductive",
    "In a deductive argument, a conclusion follows from the stated premises.",
    "연역적 논증에서는 명시된 전제로부터 결론이 도출돼요."
  ],
  [
    "EN",
    "definitive",
    "The team will publish its definitive report after the final inspection.",
    "팀은 최종 점검이 끝나면 최종 보고서를 발표할 예정이에요."
  ],
  [
    "EN",
    "descriptive",
    "Her descriptive writing makes the mountain village easy to imagine.",
    "그녀의 묘사적인 글을 읽으면 산골 마을의 모습이 쉽게 떠올라요."
  ],
  [
    "EN",
    "deterministic",
    "In this deterministic model, the same inputs always produce the same result.",
    "이 결정론적 모형에서는 입력이 같으면 언제나 결과도 같아요."
  ],
  [
    "EN",
    "differential",
    "The program applies differential rates based on household income.",
    "그 프로그램은 가구 소득에 따라 차등 요율을 적용해요."
  ],
  [
    "EN",
    "discrete",
    "The survey treats the two age groups as discrete categories.",
    "그 설문조사는 두 연령 집단을 별개의 범주로 취급해요."
  ],
  [
    "EN",
    "empirical",
    "The theory needs empirical evidence from real-world observations.",
    "그 이론에는 실제 관찰을 통해 얻은 경험적 증거가 필요해요."
  ],
  [
    "EN",
    "equivalent",
    "One thousand meters is equivalent to one kilometer.",
    "1,000미터는 1킬로미터와 같아요."
  ],
  [
    "EN",
    "explicit",
    "The application form gives explicit instructions about which documents to submit.",
    "신청서에는 어떤 서류를 제출해야 하는지 명확한 안내가 적혀 있어요."
  ],
  [
    "EN",
    "factual",
    "The documentary contains factual information rather than fictional stories.",
    "그 다큐멘터리에는 허구의 이야기가 아니라 사실에 근거한 정보가 담겨 있어요."
  ],
  [
    "EN",
    "feasible",
    "Building the new playground is feasible within the school's budget.",
    "새 놀이터를 만드는 일은 학교 예산 안에서 실현 가능해요."
  ],
  [
    "EN",
    "generalized",
    "The author warned against making generalized claims from a single case.",
    "저자는 단 하나의 사례로 일반화된 주장을 하는 일을 경계했어요."
  ],
  [
    "EN",
    "hypothetical",
    "The teacher asked us to discuss a hypothetical situation in which cars could fly.",
    "선생님은 자동차가 날 수 있다는 가상의 상황을 토론하라고 하셨어요."
  ],
  [
    "EN",
    "implicit",
    "Her silence seemed to express implicit agreement with the decision.",
    "그녀의 침묵은 그 결정에 암묵적으로 동의한다는 뜻처럼 보였어요."
  ],
  [
    "EN",
    "incompatible",
    "The old software is incompatible with the latest operating system.",
    "예전 소프트웨어는 최신 운영체제와 호환되지 않아요."
  ],
  [
    "EN",
    "inductive",
    "Inductive reasoning moves from individual observations toward a broader conclusion.",
    "귀납적 추론은 개별 관찰에서 더 일반적인 결론으로 나아가요."
  ],
  [
    "EN",
    "inherent",
    "Some uncertainty is inherent in long-term weather forecasts.",
    "장기 일기예보에는 어느 정도 불확실성이 본래 내재되어 있어요."
  ],
  [
    "EN",
    "innovative",
    "The school introduced an innovative way to teach science through games.",
    "그 학교는 게임을 활용한 혁신적인 과학 교육 방식을 도입했어요."
  ],
  [
    "EN",
    "integral",
    "Community support was integral to the success of the library project.",
    "지역사회의 지원은 도서관 사업의 성공에 필수적이었어요."
  ],
  [
    "EN",
    "intellectual",
    "The discussion challenged students to explore difficult intellectual questions.",
    "그 토론은 학생들이 어려운 지적 질문을 탐구하도록 이끌었어요."
  ],
  [
    "EN",
    "interpretive",
    "The museum offers an interpretive tour that explains the meaning of the paintings.",
    "박물관은 그림의 의미를 설명하는 해설 투어를 제공해요."
  ],
  [
    "EN",
    "intrinsic",
    "She enjoys painting for its intrinsic pleasure, not for prizes.",
    "그녀는 상을 받기 위해서가 아니라 그림 그리기 자체의 즐거움 때문에 그림을 그려요."
  ],
  [
    "EN",
    "logical",
    "Your conclusion is logical, but we still need to check the evidence.",
    "결론은 논리적이지만 증거는 여전히 확인해야 해요."
  ],
  [
    "EN",
    "methodical",
    "He took a methodical approach, checking each part of the machine in order.",
    "그는 기계의 각 부품을 순서대로 점검하는 체계적인 방식으로 접근했어요."
  ],
  [
    "EN",
    "methodological",
    "The researchers discussed methodological weaknesses in the first study.",
    "연구진은 첫 번째 연구의 방법론적인 약점을 논의했어요."
  ],
  [
    "EN",
    "objective",
    "An objective evaluation should consider both strengths and weaknesses.",
    "객관적인 평가는 장점과 단점을 모두 고려해야 해요."
  ],
  [
    "EN",
    "observational",
    "The researchers gathered observational data by watching birds in the wild.",
    "연구진은 야생의 새들을 관찰해 관찰 데이터를 수집했어요."
  ],
  [
    "EN",
    "operational",
    "The new schedule caused operational difficulties at the airport.",
    "새 일정은 공항 운영에 어려움을 일으켰어요."
  ],
  [
    "EN",
    "original",
    "Her original solution used materials that everyone else had overlooked.",
    "그녀의 독창적인 해결책은 다른 사람들이 모두 놓쳤던 재료를 활용했어요."
  ],
  [
    "EN",
    "paradoxical",
    "It seems paradoxical that having more choices can make decisions harder.",
    "선택지가 많을수록 결정이 더 어려워질 수 있다는 것은 역설적으로 보여요."
  ],
  [
    "EN",
    "parallel",
    "The two railway tracks run parallel for several kilometers.",
    "두 철길은 수 킬로미터 동안 나란히 평행하게 이어져요."
  ],
  [
    "EN",
    "perceptual",
    "The experiment examined how perceptual differences affect color judgments.",
    "그 실험은 지각적 차이가 색을 판단하는 데 어떤 영향을 주는지 살펴봤어요."
  ],
  [
    "EN",
    "plausible",
    "Her explanation sounded plausible, but the team asked for proof.",
    "그녀의 설명은 그럴듯했지만 팀은 증거를 요구했어요."
  ],
  [
    "EN",
    "precise",
    "The technician took precise measurements before cutting the glass.",
    "기술자는 유리를 자르기 전에 정밀하게 치수를 쟀어요."
  ],
  [
    "EN",
    "predictable",
    "The bus arrival times became more predictable after the timetable changed.",
    "시간표가 바뀐 뒤 버스 도착 시간을 더 쉽게 예측할 수 있게 됐어요."
  ],
  [
    "EN",
    "preliminary",
    "The preliminary results are promising, but the study is not complete.",
    "예비 결과는 긍정적이지만 연구가 아직 끝나지는 않았어요."
  ],
  [
    "EN",
    "probable",
    "Rain is probable this evening, so we should bring jackets.",
    "오늘 저녁에는 비가 올 가능성이 높으니 겉옷을 챙기는 게 좋겠어요."
  ],
  [
    "EN",
    "procedural",
    "A procedural error delayed the approval of the application.",
    "절차상의 오류로 신청서 승인이 늦어졌어요."
  ],
  [
    "EN",
    "qualitative",
    "The interviews provided qualitative insights into how customers felt.",
    "인터뷰는 고객들이 어떻게 느꼈는지에 관한 질적인 정보를 제공했어요."
  ],
  [
    "EN",
    "quantitative",
    "The report uses quantitative data to compare energy consumption across buildings.",
    "그 보고서는 건물별 에너지 사용량을 비교하기 위해 정량적 자료를 사용해요."
  ],
  [
    "EN",
    "rational",
    "It was rational to save money before making such a large purchase.",
    "그렇게 큰돈이 드는 물건을 사기 전에 돈을 모은 것은 합리적인 선택이었어요."
  ],
  [
    "EN",
    "recurrent",
    "The clinic investigated the cause of his recurrent headaches.",
    "병원은 반복되는 두통의 원인을 조사했어요."
  ],
  [
    "EN",
    "representative",
    "The survey used a representative sample of residents from across the city.",
    "그 설문조사는 도시 전역의 주민을 대표할 수 있는 표본을 사용했어요."
  ],
  [
    "EN",
    "reproducible",
    "A reproducible experiment should yield similar results when repeated under the same conditions.",
    "재현 가능한 실험은 같은 조건에서 반복하면 비슷한 결과가 나와야 해요."
  ],
  [
    "EN",
    "rigorous",
    "The new medicine underwent rigorous testing before it was approved.",
    "그 신약은 승인되기 전에 엄격한 시험을 거쳤어요."
  ],
  [
    "EN",
    "scientific",
    "A scientific explanation should be supported by evidence that can be tested.",
    "과학적인 설명은 검증할 수 있는 증거로 뒷받침되어야 해요."
  ]
];
  const sources = { EN: window.WORDS || [], KO: window.KOREAN_WORDS || [], EX: window.KOREAN_EXPRESSIONS || [] };
  // 검수 중에 확인한 기존 뜻풀이를 바로잡습니다.
  const glossCorrections = {
    raccoon: '라쿤, 아메리카너구리',
    moose: '말코손바닥사슴',
    anomaly: '이상 현상, 변칙',
    wireless: '무선의',
    public: '대중, 일반인; 공공의',
    organism: '생물, 유기체',
    conception: '개념, 구상',
    available: '이용할 수 있는, 구할 수 있는',
    familiar: '익숙한, 친숙한',
    equate: '동일시하다',
    construct: '건설하다, 구성하다',
    correlate: '상관관계를 밝히다, 연관시키다',
    obscure: '가리다, 모호하게 하다',
    operational: '운영상의, 작업상의',
    descriptive: '묘사하는, 서술적인',
    anecdote: '일화, 짧은 경험담'
  };
  const counts = { EN: 0, KO: 0, EX: 0 };
  const dicts = {};
  for (const type of Object.keys(sources)) {
    dicts[type] = new Map(sources[type].map(item => [item.word, item]));
  }
  for (const [type, key, example, translated] of rows) {
    const item = dicts[type].get(key);
    if (!item) throw Error('검수 데이터에 대응되는 항목 없음: '+type+'/'+key);
    if (item.exampleReviewed !== false) throw Error('이미 개별 예문이 존재함: '+type+'/'+key);
    if (type === 'EN' && Object.prototype.hasOwnProperty.call(glossCorrections, key)) item.meaning = glossCorrections[key];
    item.example = example;
    item.exampleKo = translated;
    item.exampleReviewed = true;
    delete item.unreviewedOriginal;
    counts[type]++;
  }
  if (window.JINI_CONTENT_REVIEW) {
    window.JINI_CONTENT_REVIEW.newCurated = counts;
    for (const [key, items] of [ ['english',sources.EN], ['koreanWords',sources.KO], ['koreanExpressions',sources.EX] ]) {
      window.JINI_CONTENT_REVIEW.summary[key].individual = items.filter(x => x.exampleReviewed !== false).length;
    }
  }
}());
