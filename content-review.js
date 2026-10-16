/* JINI 콘텐츠 검수 1차 패치 (2026-10-17)
 * 단어의 실제 사용을 보여주지 않는 자동 조합 문장을 학습 예문으로 제공하지 않습니다.
 * 개별 작성 문장의 추가 검수도 지속적으로 필요합니다.
 */
(function () {
  "use strict";

  const englishExamples = `
aunt|My aunt lives near the beach.|우리 이모는 해변 근처에 살아요.
uncle|My uncle makes pancakes on Sundays.|우리 삼촌은 일요일마다 팬케이크를 만들어요.
cousin|My cousin and I are in the same class.|사촌과 저는 같은 반이에요.
baby|The baby is sleeping in her crib.|아기가 아기 침대에서 자고 있어요.
child|Every child needs time to play.|모든 아이에게는 놀 시간이 필요해요.
man|A man helped me carry the box.|한 남자가 상자를 옮기는 것을 도와줬어요.
woman|The woman at the desk gave me directions.|안내 데스크에 있던 여성이 길을 알려 줬어요.
parent|A parent must sign this form.|부모님 중 한 분이 이 서류에 서명해야 해요.
son|Their son started school this year.|그들의 아들은 올해 학교에 입학했어요.
daughter|My daughter loves drawing animals.|제 딸은 동물 그리기를 좋아해요.
shirt|I need a clean shirt for tomorrow.|내일 입을 깨끗한 셔츠가 필요해요.
pants|These pants are too long for me.|이 바지는 제게 너무 길어요.
dress|She wore a blue dress to the party.|그녀는 파티에 파란 원피스를 입고 갔어요.
skirt|The skirt is on sale today.|그 치마는 오늘 할인 중이에요.
coat|Put on your coat before you go outside.|밖에 나가기 전에 코트를 입으세요.
jacket|I left my jacket on the bus.|버스에 재킷을 두고 내렸어요.
shoe|I can't find my left shoe.|왼쪽 신발을 찾을 수 없어요.
sock|There's a hole in my sock.|제 양말에 구멍이 났어요.
hat|Wear a hat to protect your face from the sun.|햇빛으로부터 얼굴을 보호하려면 모자를 쓰세요.
cap|He put on a cap before going for a run.|그는 달리러 나가기 전에 야구 모자를 썼어요.
scarf|My grandmother knitted me a scarf.|할머니가 제게 목도리를 떠 주셨어요.
glove|I lost one glove in the snow.|눈밭에서 장갑 한 짝을 잃어버렸어요.
belt|This belt is too big for me.|이 벨트는 제게 너무 커요.
pocket|I put my keys in my pocket.|열쇠를 주머니에 넣었어요.
uniform|Students wear a uniform at this school.|이 학교 학생들은 교복을 입어요.
classroom|Our classroom is on the second floor.|우리 교실은 2층에 있어요.
desk|Please put your books on the desk.|책을 책상 위에 놓아 주세요.
notebook|I wrote the new words in my notebook.|새 단어들을 공책에 적었어요.
pencil|Can I borrow a pencil?|연필 하나 빌려도 될까요?
pen|Please sign your name with a pen.|펜으로 이름에 서명해 주세요.
eraser|I used an eraser to fix my mistake.|실수를 고치려고 지우개를 사용했어요.
ruler|Use a ruler to draw a straight line.|자를 사용해서 직선을 그리세요.
paper|Write your answer on a piece of paper.|종이 한 장에 답을 적으세요.
lesson|Our English lesson starts at nine.|우리 영어 수업은 아홉 시에 시작해요.
homework|I finished my homework before dinner.|저녁 먹기 전에 숙제를 끝냈어요.
test|We have a math test on Friday.|금요일에 수학 시험이 있어요.
subject|Science is my favorite school subject.|과학은 제가 학교에서 가장 좋아하는 과목이에요.
lunch|We eat lunch at noon.|우리는 정오에 점심을 먹어요.
sandwich|I made a cheese sandwich for lunch.|점심으로 치즈 샌드위치를 만들었어요.
breakfast|I usually eat eggs for breakfast.|저는 보통 아침 식사로 달걀을 먹어요.
dinner|What are we having for dinner?|저녁으로 무엇을 먹나요?
snack|I brought a snack for the train ride.|기차에서 먹을 간식을 가져왔어요.
fruit|Fresh fruit tastes good in summer.|신선한 과일은 여름에 맛있어요.
banana|I ate a banana after my workout.|운동 후에 바나나를 먹었어요.
orange|She peeled an orange for her little brother.|그녀는 남동생을 위해 오렌지 껍질을 벗겨 줬어요.
grape|Would you like some grapes?|포도 좀 드실래요?
lemon|Add a little lemon juice to the water.|물에 레몬즙을 조금 넣으세요.
peach|This peach is sweet and juicy.|이 복숭아는 달고 과즙이 많아요.
pear|He sliced a pear for the children.|그는 아이들을 위해 배를 얇게 썰었어요.
strawberry|We picked strawberries at the farm.|우리는 농장에서 딸기를 땄어요.
vegetable|You should eat vegetables every day.|매일 채소를 먹는 게 좋아요.
potato|I baked a potato for lunch.|점심으로 감자를 구웠어요.
tomato|She added a tomato to her salad.|그녀는 샐러드에 토마토 하나를 넣었어요.
carrot|The rabbit is eating a carrot.|토끼가 당근을 먹고 있어요.
onion|Chop the onion into small pieces.|양파를 작은 조각으로 썰어 주세요.
corn|We had corn with our dinner.|우리는 저녁 식사 때 옥수수를 먹었어요.
bean|There are beans in this soup.|이 수프에는 콩이 들어 있어요.
cheese|Would you like extra cheese on your pizza?|피자에 치즈를 더 올려 드릴까요?
butter|Spread some butter on the toast.|토스트에 버터를 조금 발라 주세요.
soup|The soup is too hot to eat.|수프가 너무 뜨거워서 먹을 수 없어요.
salad|She ordered a chicken salad.|그녀는 치킨 샐러드를 주문했어요.
cake|We made a chocolate cake for Mom.|엄마를 위해 초콜릿 케이크를 만들었어요.
cookie|I baked cookies with my sister.|여동생과 함께 쿠키를 구웠어요.
candy|The children shared a bag of candy.|아이들이 사탕 한 봉지를 나눠 먹었어요.
chocolate|This chocolate melts quickly in the sun.|이 초콜릿은 햇볕에 빨리 녹아요.
juice|Can I have a glass of orange juice?|오렌지 주스 한 잔 주실 수 있나요?
tea|My grandfather drinks green tea every morning.|할아버지는 매일 아침 녹차를 드세요.
coffee|I usually drink coffee after breakfast.|저는 보통 아침 식사 후에 커피를 마셔요.
sugar|Do you take sugar in your tea?|차에 설탕을 넣어 드시나요?
salt|This dish needs a little more salt.|이 요리에는 소금이 조금 더 필요해요.
meat|I don't eat meat on Fridays.|저는 금요일에는 고기를 먹지 않아요.
chicken|We're having roast chicken tonight.|오늘 저녁에는 구운 닭고기를 먹을 거예요.
rabbit|A white rabbit ran across the garden.|하얀 토끼 한 마리가 정원을 가로질러 달렸어요.
mouse|A mouse ran under the table.|생쥐 한 마리가 탁자 아래로 달려갔어요.
duck|The duck is swimming in the pond.|오리가 연못에서 헤엄치고 있어요.
sheep|The sheep are eating grass in the field.|양들이 들판에서 풀을 먹고 있어요.
cow|The cows are resting under a tree.|소들이 나무 아래에서 쉬고 있어요.
pig|The pig rolled in the mud.|돼지가 진흙에서 뒹굴었어요.
goat|A goat climbed onto a large rock.|염소 한 마리가 큰 바위 위로 올라갔어요.
bear|We saw a bear from a safe distance.|우리는 안전한 거리에서 곰을 봤어요.
lion|The lion was resting in the shade.|사자가 그늘에서 쉬고 있었어요.
tiger|A tiger has black stripes.|호랑이는 검은 줄무늬가 있어요.
monkey|The monkey climbed to the top of the tree.|원숭이가 나무 꼭대기까지 올라갔어요.
elephant|An elephant uses its trunk to pick up food.|코끼리는 코를 사용해서 먹이를 집어요.
frog|A frog jumped into the pond.|개구리 한 마리가 연못으로 뛰어들었어요.
turtle|The turtle moved slowly across the sand.|거북이가 모래 위를 천천히 지나갔어요.
snake|We saw a snake near the river.|우리는 강 근처에서 뱀을 봤어요.
bee|A bee landed on the flower.|벌 한 마리가 꽃 위에 내려앉았어요.
butterfly|A butterfly flew into our garden.|나비 한 마리가 우리 정원으로 날아왔어요.
kitchen|Mom is cooking dinner in the kitchen.|엄마가 부엌에서 저녁을 만들고 있어요.
bathroom|The bathroom is at the end of the hall.|화장실은 복도 끝에 있어요.
backpack|My backpack is full of schoolbooks.|제 배낭에는 교과서가 가득해요.
chalk|The teacher wrote on the board with chalk.|선생님이 분필로 칠판에 글을 쓰셨어요.
crayon|The child drew a rainbow with crayons.|아이가 크레용으로 무지개를 그렸어요.
scissors|Be careful when using scissors.|가위를 사용할 때 조심하세요.
glue|I need glue to finish this project.|이 과제를 끝내려면 풀이 필요해요.
marker|Use a black marker to write the title.|검은색 마커로 제목을 적으세요.
workbook|Please open your workbook to page ten.|연습장 10쪽을 펼쳐 주세요.
textbook|I forgot my science textbook at home.|과학 교과서를 집에 두고 왔어요.
dictionary|Look up the word in a dictionary.|사전에서 그 단어를 찾아보세요.
calculator|You can use a calculator on this test.|이 시험에서는 계산기를 사용해도 돼요.
calendar|I marked the exam date on my calendar.|달력에 시험 날짜를 표시했어요.
folder|Keep your homework in this folder.|숙제는 이 폴더에 넣어 두세요.
envelope|I put the letter in an envelope.|편지를 봉투에 넣었어요.
umbrella|Take an umbrella because it might rain.|비가 올 수도 있으니 우산을 챙기세요.
weekend|What are you doing this weekend?|이번 주말에 무엇을 할 예정인가요?
planet|Earth is the planet we live on.|지구는 우리가 사는 행성이에요.
rocket|The rocket launched early this morning.|로켓이 오늘 이른 아침에 발사됐어요.
accident|Nobody was hurt in the accident.|그 사고로 다친 사람은 없었어요.
airport|We arrived at the airport two hours early.|우리는 공항에 두 시간 일찍 도착했어요.
advice|My teacher gave me useful advice.|선생님이 제게 유용한 조언을 해 주셨어요.
advertisement|I saw an advertisement for a new phone.|새 휴대전화 광고를 봤어요.
address|Please write your address on the form.|서류에 주소를 적어 주세요.
author|The author signed my copy of her book.|작가가 제 책에 서명해 줬어요.
business|Her family runs a small business.|그녀의 가족은 작은 사업을 운영해요.
career|He wants a career in medicine.|그는 의료 분야에서 일하고 싶어 해요.
concert|The concert starts at eight tonight.|콘서트는 오늘 밤 여덟 시에 시작해요.
customer|A customer asked for a refund.|한 고객이 환불을 요청했어요.
deadline|The deadline for the report is Friday.|보고서 제출 마감일은 금요일이에요.
department|She works in the sales department.|그녀는 영업 부서에서 일해요.
direction|Can you give me directions to the station?|역까지 가는 길을 알려 주실 수 있나요?
discussion|We had a discussion about the new rules.|우리는 새 규칙에 대해 토론했어요.
distance|The distance between the cities is about 50 kilometers.|두 도시 사이의 거리는 약 50킬로미터예요.
exercise|I try to get some exercise every day.|저는 매일 조금이라도 운동하려고 노력해요.
factory|The factory makes car parts.|그 공장은 자동차 부품을 만들어요.
flight|Our flight was delayed by an hour.|우리 항공편은 한 시간 지연됐어요.
guest|We have a guest staying with us tonight.|오늘 밤 우리 집에 손님이 머물 거예요.
habit|Reading before bed is a good habit.|자기 전에 책을 읽는 것은 좋은 습관이에요.
information|I need more information about the course.|그 강좌에 대한 정보가 더 필요해요.
meal|We enjoyed a delicious meal together.|우리는 함께 맛있는 식사를 했어요.
neighbor|Our neighbor helped us move the sofa.|이웃이 소파를 옮기는 걸 도와줬어요.
news|I heard the news on the radio.|라디오에서 그 소식을 들었어요.
passenger|Every passenger must wear a seat belt.|모든 승객은 안전벨트를 매야 해요.
permission|You need permission to enter this room.|이 방에 들어가려면 허락이 필요해요.
project|Our team finished the project on time.|우리 팀은 프로젝트를 제시간에 끝냈어요.
report|Please send me the report by Monday.|월요일까지 보고서를 보내 주세요.
skill|Cooking is a useful life skill.|요리는 일상생활에 유용한 기술이에요.
traffic|There was heavy traffic on the way home.|집에 오는 길에 교통 체증이 심했어요.
website|I found the schedule on the school's website.|학교 웹사이트에서 일정을 찾았어요.
analysis|The analysis showed why sales had fallen.|분석 결과 매출이 감소한 이유가 드러났어요.
approach|We need a different approach to this problem.|이 문제에는 다른 접근법이 필요해요.
authority|The local authority approved the plan.|지역 당국이 그 계획을 승인했어요.
climate|The region has a warm, dry climate.|그 지역은 따뜻하고 건조한 기후를 가지고 있어요.
conflict|The two teams resolved their conflict through discussion.|두 팀은 대화를 통해 갈등을 해결했어요.
context|You need to read the sentence in context.|그 문장을 문맥 속에서 읽어야 해요.
contract|Please read the contract before signing it.|서명하기 전에 계약서를 읽어 주세요.
contribution|Her contribution helped the project succeed.|그녀의 기여가 프로젝트의 성공에 도움이 됐어요.
debate|The students held a debate about online privacy.|학생들은 온라인 개인정보 보호를 주제로 토론했어요.
demand|Demand for electric cars is growing.|전기차에 대한 수요가 증가하고 있어요.
design|The new design uses less plastic.|새 디자인은 플라스틱 사용량을 줄였어요.
diversity|The school celebrates cultural diversity.|그 학교는 문화적 다양성을 존중하고 기념해요.
evidence|The police collected evidence at the scene.|경찰은 현장에서 증거를 수집했어요.
expense|Travel is our biggest expense this month.|이번 달 가장 큰 지출 항목은 여행이에요.
finance|She studied finance at university.|그녀는 대학교에서 금융을 공부했어요.
impact|The new law could have a major impact on small businesses.|새 법은 소규모 사업체에 큰 영향을 줄 수 있어요.
independence|The country celebrates its independence every year.|그 나라는 매년 독립을 기념해요.
policy|The company changed its remote-work policy.|회사는 원격 근무 정책을 변경했어요.
regulation|New safety regulations take effect next month.|새 안전 규정이 다음 달에 시행돼요.
security|The website uses encryption to improve security.|그 웹사이트는 보안을 강화하기 위해 암호화를 사용해요.
survey|More than 500 people answered the survey.|500명이 넘는 사람들이 설문조사에 응답했어요.
theory|The scientist tested her theory in the laboratory.|과학자는 실험실에서 자신의 이론을 검증했어요.
threat|Rising sea levels are a threat to coastal towns.|해수면 상승은 해안 도시들에 위협이 돼요.
`;

  const koreanWordExamples = `
노선|이 버스 노선은 서울역을 지나가요.|Tuyến xe buýt này đi qua ga Seoul.
교통편|공항까지 가는 교통편을 미리 알아봤어요.|Tôi đã tìm hiểu trước phương tiện đi đến sân bay.
편도|서울에서 부산까지 편도 표를 샀어요.|Tôi đã mua vé một chiều từ Seoul đến Busan.
왕복|기차 왕복 표를 미리 예약했어요.|Tôi đã đặt trước vé tàu khứ hồi.
통근|저는 매일 지하철로 통근해요.|Tôi đi làm bằng tàu điện ngầm mỗi ngày.
정체|퇴근 시간이라 도로 정체가 심해요.|Vì đang giờ tan tầm nên đường tắc nghiêm trọng.
주행|빗길에서는 주행 속도를 줄여야 해요.|Trên đường mưa, cần giảm tốc độ lái xe.
운전면허|운전면허를 따려고 학원에 등록했어요.|Tôi đăng ký học lái xe để lấy bằng lái.
주유소|기름이 거의 없어서 주유소에 들렀어요.|Xe gần hết xăng nên tôi ghé trạm xăng.
주차|이 건물에는 무료 주차가 가능해요.|Có thể đỗ xe miễn phí tại tòa nhà này.
주차료|주차료는 한 시간에 이천 원이에요.|Phí đỗ xe là hai nghìn won một giờ.
렌터카|여행할 때 렌터카를 빌렸어요.|Tôi thuê xe ô tô tự lái khi đi du lịch.
항공권|출발하기 전에 항공권을 확인해 주세요.|Vui lòng kiểm tra vé máy bay trước khi khởi hành.
탑승권|탑승권은 휴대전화에 저장해 뒀어요.|Tôi đã lưu thẻ lên máy bay vào điện thoại.
탑승구|비행기 탑승구가 변경됐어요.|Cửa lên máy bay đã thay đổi.
수하물|수하물이 무거워서 추가 요금을 냈어요.|Hành lý ký gửi quá nặng nên tôi đã trả thêm phí.
기내|기내에서는 안전벨트를 매 주세요.|Vui lòng thắt dây an toàn trên máy bay.
비자|여행 전에 비자가 필요한지 확인하세요.|Hãy kiểm tra xem có cần thị thực trước chuyến đi không.
여행자보험|해외여행을 가기 전에 여행자보험에 가입했어요.|Tôi đã mua bảo hiểm du lịch trước khi ra nước ngoài.
여행가방|여행가방에 옷과 세면도구를 넣었어요.|Tôi đã cho quần áo và đồ vệ sinh cá nhân vào va-li.
폭풍|폭풍 때문에 배가 출항하지 못했어요.|Vì bão nên tàu không thể rời cảng.
태풍|태풍이 다가와서 학교가 휴교했어요.|Vì bão nhiệt đới đang đến gần nên trường học đóng cửa.
장마|장마철에는 우산을 자주 챙겨요.|Vào mùa mưa, tôi thường mang theo ô.
홍수|큰비로 강이 넘쳐 홍수가 났어요.|Do mưa lớn, sông tràn bờ gây lũ lụt.
일기예보|내일 비가 오는지 일기예보를 확인했어요.|Tôi đã xem dự báo thời tiết để biết ngày mai có mưa không.
증상|기침 증상이 언제 시작됐나요?|Triệu chứng ho bắt đầu từ khi nào?
검사|병원에서 혈액 검사를 받았어요.|Tôi đã làm xét nghiệm máu tại bệnh viện.
처방|의사 선생님이 약을 처방해 주셨어요.|Bác sĩ đã kê đơn thuốc cho tôi.
부작용|약을 먹고 부작용이 있으면 의사에게 알려 주세요.|Nếu có tác dụng phụ sau khi uống thuốc, hãy báo cho bác sĩ.
알레르기|저는 땅콩 알레르기가 있어요.|Tôi bị dị ứng đậu phộng.
`;

  const koreanExpressionExamples = `
관리비 고지서를 어디에서 확인할 수 있나요?|새로 이사 온 아파트 관리실에 전화해서 "관리비 고지서를 어디에서 확인할 수 있나요?"라고 물었어요.|Tôi gọi cho ban quản lý căn hộ mới chuyển đến và hỏi: "Tôi có thể xem hóa đơn phí quản lý ở đâu?"
계약 갱신 조건을 미리 알려 주세요.|월세 계약이 끝나기 전에 집주인에게 "계약 갱신 조건을 미리 알려 주세요."라고 연락했어요.|Trước khi hợp đồng thuê nhà hết hạn, tôi nhắn chủ nhà: "Vui lòng báo trước điều kiện gia hạn hợp đồng."
보증금 반환 일정이 어떻게 되나요?|이사 날짜가 정해져서 집주인에게 "보증금 반환 일정이 어떻게 되나요?"라고 물었어요.|Khi đã xác định ngày chuyển nhà, tôi hỏi chủ nhà: "Lịch hoàn trả tiền đặt cọc thế nào?"
수도 요금이 평소보다 많이 나왔어요.|지난달보다 물을 적게 썼는데 요금이 높아 "수도 요금이 평소보다 많이 나왔어요."라고 관리실에 말했어요.|Tôi dùng ít nước hơn tháng trước nhưng hóa đơn cao nên báo với ban quản lý: "Tiền nước tháng này cao hơn bình thường."
난방이 작동하지 않아 점검을 부탁드려요.|방이 계속 추워 관리실에 "난방이 작동하지 않아 점검을 부탁드려요."라고 요청했어요.|Phòng vẫn lạnh nên tôi đề nghị ban quản lý: "Hệ thống sưởi không hoạt động, mong anh chị kiểm tra giúp."
세탁기에서 이상한 소리가 나요.|탈수할 때 큰 소음이 나서 수리 센터에 "세탁기에서 이상한 소리가 나요."라고 설명했어요.|Máy phát ra tiếng ồn lớn khi vắt nên tôi báo trung tâm sửa chữa: "Máy giặt phát ra tiếng lạ."
벽에 작은 누수 자국이 보여요.|비가 온 뒤 벽이 젖어 관리인에게 "벽에 작은 누수 자국이 보여요."라고 연락했어요.|Sau cơn mưa, tường bị ướt nên tôi báo người quản lý: "Tôi thấy một vết thấm nước nhỏ trên tường."
오늘은 집에 사람이 없으니 내일 와 주세요.|수리 기사님이 방문 시간을 묻자 "오늘은 집에 사람이 없으니 내일 와 주세요."라고 답했어요.|Khi thợ sửa hỏi giờ đến, tôi trả lời: "Hôm nay không có ai ở nhà, vui lòng đến vào ngày mai."
수리 전에 예상 비용을 알려 주세요.|에어컨 수리를 맡기면서 "수리 전에 예상 비용을 알려 주세요."라고 부탁했어요.|Khi yêu cầu sửa điều hòa, tôi nói: "Vui lòng báo chi phí dự kiến trước khi sửa."
현관 열쇠를 하나 더 만들고 싶어요.|열쇠 가게에 가서 "현관 열쇠를 하나 더 만들고 싶어요."라고 말했어요.|Tôi đến cửa hàng làm chìa khóa và nói: "Tôi muốn làm thêm một chìa khóa cửa ra vào."
카드 결제 한도를 올리고 싶어요.|큰 금액을 결제해야 해서 카드사 고객센터에 "카드 결제 한도를 올리고 싶어요."라고 문의했어요.|Tôi cần thanh toán một khoản lớn nên gọi tổng đài công ty thẻ: "Tôi muốn tăng hạn mức thanh toán thẻ."
해외 송금 수수료가 얼마인지 알려 주세요.|가족에게 돈을 보내기 전에 은행에 "해외 송금 수수료가 얼마인지 알려 주세요."라고 물었어요.|Trước khi gửi tiền cho gia đình, tôi hỏi ngân hàng: "Vui lòng cho tôi biết phí chuyển tiền quốc tế là bao nhiêu."
체크카드가 승인되지 않았어요.|식당에서 계산을 못 해서 은행 상담원에게 "체크카드가 승인되지 않았어요."라고 말했어요.|Tôi không thanh toán được tại nhà hàng nên báo nhân viên ngân hàng: "Thẻ ghi nợ của tôi không được chấp nhận."
체크인 전에 짐을 맡길 수 있나요?|호텔에 일찍 도착해서 프런트에 "체크인 전에 짐을 맡길 수 있나요?"라고 물었어요.|Tôi đến khách sạn sớm và hỏi lễ tân: "Tôi có thể gửi hành lý trước khi nhận phòng không?"
조식은 몇 시부터 제공되나요?|호텔에 체크인하면서 직원에게 "조식은 몇 시부터 제공되나요?"라고 물었어요.|Khi nhận phòng, tôi hỏi nhân viên: "Bữa sáng được phục vụ từ mấy giờ?"
`;

  // 사람이 개별 작성한 내용만 추가합니다. 같은 단어의 기존 원문은 덮어쓰되 뜻·발음·북마크 키는 보존합니다.
  function apply(data, items, label) {
    const map = new Map(items.map(function (item) { return [item.word, item]; }));
    let updated = 0;
    data.trim().split(/\n/).forEach(function (row) {
      const cells = row.split("|");
      if (cells.length !== 3) throw new Error(label + " 예문 구문 오류: " + row);
      const item = map.get(cells[0]);
      if (!item) throw new Error(label + " 존재하지 않는 단어: " + cells[0]);
      item.example = cells[1];
      item.exampleKo = cells[2];
      item.exampleReviewed = true;
      updated += 1;
    });
    return updated;
  }

  const english = window.WORDS || [];
  const koreanWords = window.KOREAN_WORDS || [];
  const expressions = window.KOREAN_EXPRESSIONS || [];
  const updates = {
    english: apply(englishExamples, english, "영어"),
    koreanWords: apply(koreanWordExamples, koreanWords, "한국어 단어"),
    koreanExpressions: apply(koreanExpressionExamples, expressions, "한국어 표현")
  };

  [english, koreanWords, expressions].forEach(function (items) {
    items.forEach(function (item) {
      // 이전 자동 생성 예문은 화면/학습 음성에서 제거하되 추후 검수 가능하도록 백업 속성에 보관합니다.
      if (item.exampleReviewed === false) {
        item.unreviewedOriginal = { example: item.example, exampleKo: item.exampleKo };
        item.example = "";
        item.exampleKo = "";
      }
      (item.otherSenses || []).forEach(function (sense) {
        if (sense.exampleReviewed === false) {
          sense.unreviewedOriginal = { example: sense.example, exampleKo: sense.exampleKo };
          sense.example = "";
          sense.exampleKo = "";
        }
      });
    });
  });
  window.JINI_CONTENT_REVIEW = {
    updates: updates,
    summary: {
      english: { total: english.length, individual: english.filter(function (x) { return x.exampleReviewed !== false; }).length },
      koreanWords: { total: koreanWords.length, individual: koreanWords.filter(function (x) { return x.exampleReviewed !== false; }).length },
      koreanExpressions: { total: expressions.length, individual: expressions.filter(function (x) { return x.exampleReviewed !== false; }).length }
    }
  };
}());
