/* JINI English expressions, items 351-400. Append after prior expressions to retain all existing bookmark and game XP IDs. */
(function () {
  "use strict";
  const data = [
  [
    "일상",
    "keep a steady routine",
    "규칙적인 생활 패턴을 유지하다",
    "I try to keep a steady routine even on weekends.",
    "주말에도 규칙적인 생활 패턴을 유지하려고 해요."
  ],
  [
    "일상",
    "be in a rush",
    "급하게 서두르는 중이다",
    "I was in a rush this morning and forgot my umbrella.",
    "오늘 아침에 서두르다가 우산을 깜빡했어요."
  ],
  [
    "일상",
    "sleep through my alarm",
    "알람을 못 듣고 계속 자다",
    "I slept through my alarm and arrived late for work.",
    "알람을 못 듣고 자는 바람에 회사에 늦게 도착했어요."
  ],
  [
    "일상",
    "get caught in the rain",
    "갑자기 비를 맞다",
    "I got caught in the rain on my way home.",
    "집에 오는 길에 갑자기 비를 맞았어요."
  ],
  [
    "일상",
    "have something delivered",
    "~을 배달받다",
    "I had groceries delivered because I didn't have time to shop.",
    "장 볼 시간이 없어서 식료품을 배달받았어요."
  ],
  [
    "일상",
    "do a quick cleanup",
    "간단히 청소하거나 정리하다",
    "I did a quick cleanup before my friends arrived.",
    "친구들이 오기 전에 집을 간단히 정리했어요."
  ],
  [
    "일상",
    "make do with",
    "부족하지만 있는 것으로 해결하다",
    "We didn't have enough chairs, so we made do with a bench.",
    "의자가 부족해서 벤치로 대신했어요."
  ],
  [
    "일상",
    "get a head start",
    "남보다 먼저 시작해 앞서가다",
    "I prepared lunch the night before to get a head start on my morning.",
    "아침을 좀 더 여유롭게 시작하려고 전날 밤에 점심을 준비했어요."
  ],
  [
    "일상",
    "set a reminder for",
    "~에 대한 알림을 설정하다",
    "I set a reminder for my dentist appointment.",
    "치과 예약을 잊지 않도록 알림을 설정했어요."
  ],
  [
    "일상",
    "treat myself to",
    "나에게 ~을 선물하다, 스스로에게 보상하다",
    "I treated myself to a nice dinner after a busy week.",
    "바쁜 한 주를 보낸 뒤 맛있는 저녁 식사로 스스로에게 보상했어요."
  ],
  [
    "직장",
    "get down to business",
    "본격적으로 일을 시작하다, 본론으로 들어가다",
    "After a quick greeting, we got down to business.",
    "간단히 인사를 나눈 뒤 바로 본론으로 들어갔어요."
  ],
  [
    "직장",
    "be on the lookout for",
    "~을 유심히 살피다",
    "We're on the lookout for errors in the new software.",
    "새 소프트웨어에 오류가 있는지 유심히 살피고 있어요."
  ],
  [
    "직장",
    "run into a snag",
    "예상치 못한 문제에 부딪히다",
    "We ran into a snag while testing the new feature.",
    "새 기능을 테스트하다가 예상치 못한 문제에 부딪혔어요."
  ],
  [
    "직장",
    "keep the momentum going",
    "좋은 진행 흐름을 계속 유지하다",
    "Let's keep the momentum going and finish the next task today.",
    "이 흐름을 이어서 오늘 다음 작업까지 마칩시다."
  ],
  [
    "직장",
    "follow the procedure",
    "정해진 절차를 따르다",
    "Please follow the procedure when reporting a defect.",
    "불량을 보고할 때는 정해진 절차를 따라 주세요."
  ],
  [
    "직장",
    "draw up a plan",
    "계획을 구체적으로 작성하다",
    "We drew up a plan to improve the inspection process.",
    "검사 절차를 개선하기 위한 계획을 작성했어요."
  ],
  [
    "직장",
    "take a closer look at",
    "~을 더 자세히 살펴보다",
    "We need to take a closer look at the test results.",
    "시험 결과를 좀 더 자세히 살펴봐야 해요."
  ],
  [
    "직장",
    "hold off on",
    "~을 잠시 미루다",
    "Let's hold off on the update until we finish testing.",
    "테스트를 마칠 때까지 업데이트를 잠시 미룹시다."
  ],
  [
    "직장",
    "be ready to roll",
    "시작할 준비가 되어 있다",
    "The equipment is checked, and we're ready to roll.",
    "장비 점검이 끝나서 이제 시작할 준비가 됐어요."
  ],
  [
    "직장",
    "meet the requirements",
    "요구 사항을 충족하다",
    "The new design meets all the safety requirements.",
    "새 설계는 모든 안전 요구 사항을 충족해요."
  ],
  [
    "답변",
    "the first thing that comes to mind is",
    "가장 먼저 떠오르는 것은 ~이다",
    "The first thing that comes to mind is the beach near my hometown.",
    "가장 먼저 떠오르는 건 고향 근처의 해변이에요."
  ],
  [
    "답변",
    "one example that comes to mind is",
    "생각나는 예시 하나는 ~이다",
    "One example that comes to mind is a restaurant I visited last summer.",
    "떠오르는 예시 하나는 지난여름에 갔던 식당이에요."
  ],
  [
    "답변",
    "if I were in that situation",
    "제가 그런 상황이라면",
    "If I were in that situation, I would ask a friend for advice.",
    "제가 그런 상황이라면 친구에게 조언을 구할 거예요."
  ],
  [
    "답변",
    "what I enjoy about it is",
    "제가 그것에서 좋아하는 점은 ~이다",
    "What I enjoy about it is that I can relax without spending much money.",
    "제가 그걸 좋아하는 이유는 돈을 많이 쓰지 않고도 쉴 수 있기 때문이에요."
  ],
  [
    "답변",
    "one thing I would recommend is",
    "제가 추천하고 싶은 한 가지는 ~이다",
    "One thing I would recommend is visiting the park in the evening.",
    "제가 추천하고 싶은 한 가지는 저녁에 공원을 방문하는 거예요."
  ],
  [
    "답변",
    "from what I've seen",
    "제가 직접 본 바로는",
    "From what I've seen, the area is much quieter on weekdays.",
    "제가 직접 본 바로는 그 지역은 평일에 훨씬 조용해요."
  ],
  [
    "답변",
    "what made the biggest difference was",
    "가장 큰 변화를 가져온 것은 ~이다",
    "What made the biggest difference was practicing English a little every day.",
    "가장 큰 변화를 가져온 건 매일 영어를 조금씩 연습한 것이었어요."
  ],
  [
    "답변",
    "it's hard to choose, but",
    "고르기 어렵지만",
    "It's hard to choose, but I would say spring is my favorite season.",
    "고르기 어렵지만 봄이 제가 가장 좋아하는 계절인 것 같아요."
  ],
  [
    "답변",
    "that's a good question",
    "좋은 질문이에요, 생각해 볼 만하네요",
    "That's a good question. I've never really thought about it before.",
    "좋은 질문이에요. 전에는 그 문제를 진지하게 생각해 본 적이 없어요."
  ],
  [
    "답변",
    "there are a couple of reasons",
    "몇 가지 이유가 있다",
    "There are a couple of reasons why I prefer living near a train station.",
    "제가 기차역 근처에 사는 걸 선호하는 데는 몇 가지 이유가 있어요."
  ],
  [
    "여행",
    "check the train schedule",
    "열차 시간표를 확인하다",
    "I checked the train schedule before leaving the hotel.",
    "호텔을 나서기 전에 열차 시간표를 확인했어요."
  ],
  [
    "여행",
    "miss the last train",
    "막차를 놓치다",
    "We nearly missed the last train after dinner.",
    "저녁을 먹고 막차를 놓칠 뻔했어요."
  ],
  [
    "여행",
    "find an alternative route",
    "다른 경로를 찾다",
    "The subway line was closed, so we found an alternative route.",
    "지하철 노선이 운행을 중단해서 다른 경로를 찾았어요."
  ],
  [
    "여행",
    "have my hands full with luggage",
    "짐이 많아 두 손이 바쁘다",
    "I had my hands full with luggage, so I couldn't check my phone.",
    "짐 때문에 두 손이 바빠서 휴대전화를 확인할 수 없었어요."
  ],
  [
    "여행",
    "ask for an extra blanket",
    "담요를 추가로 요청하다",
    "I asked the hotel staff for an extra blanket because the room was cold.",
    "방이 추워서 호텔 직원에게 담요를 하나 더 요청했어요."
  ],
  [
    "여행",
    "pay a cancellation fee",
    "취소 수수료를 내다",
    "We had to pay a cancellation fee when we changed our hotel plans.",
    "호텔 계획을 변경하면서 취소 수수료를 내야 했어요."
  ],
  [
    "여행",
    "scan a QR code",
    "QR 코드를 스캔하다",
    "We scanned a QR code to enter the museum.",
    "박물관에 입장하려고 QR 코드를 스캔했어요."
  ],
  [
    "여행",
    "be charged extra for",
    "~에 대해 추가 요금을 부과받다",
    "We were charged extra for checking a second bag.",
    "두 번째 가방을 위탁하면서 추가 요금이 부과됐어요."
  ],
  [
    "여행",
    "make a stopover in",
    "~에 잠시 경유하다",
    "We made a stopover in Singapore on our way to Australia.",
    "호주로 가는 길에 싱가포르에 잠시 경유했어요."
  ],
  [
    "여행",
    "leave something behind",
    "~을 두고 오다",
    "I left my sunglasses behind at the restaurant.",
    "식당에 선글라스를 두고 왔어요."
  ],
  [
    "관계",
    "give someone a heads-up",
    "~에게 미리 알려주다",
    "I gave my friend a heads-up that I might be late.",
    "늦을 수도 있다고 친구에게 미리 알려줬어요."
  ],
  [
    "관계",
    "get off on the wrong foot",
    "첫 만남이나 시작부터 관계가 어긋나다",
    "We got off on the wrong foot, but we became good friends later.",
    "처음에는 서로 잘 맞지 않았지만 나중에는 좋은 친구가 됐어요."
  ],
  [
    "관계",
    "be there when it counts",
    "정말 중요한 순간에 곁에 있어 주다",
    "My sister is always there when it counts.",
    "누나는 정말 중요한 순간마다 제 곁에 있어 줘요."
  ],
  [
    "관계",
    "make someone feel at ease",
    "~을 편안하게 해 주다",
    "The host made everyone feel at ease at the party.",
    "집주인은 파티에 온 모두가 편안하게 느끼도록 해 줬어요."
  ],
  [
    "관계",
    "show up for someone",
    "~이 필요할 때 곁에 있어 주다",
    "My friends showed up for me when I needed support.",
    "제가 도움이 필요했을 때 친구들이 제 곁에 있어 줬어요."
  ],
  [
    "관계",
    "hear someone out",
    "~의 말을 끝까지 들어주다",
    "I didn't agree with him, but I wanted to hear him out.",
    "그의 의견에는 동의하지 않았지만 끝까지 들어 주고 싶었어요."
  ],
  [
    "관계",
    "say what's on my mind",
    "속마음을 솔직하게 말하다",
    "It took me a while to say what was on my mind.",
    "제 속마음을 솔직하게 말하기까지 시간이 좀 걸렸어요."
  ],
  [
    "관계",
    "have a falling-out with",
    "~와 다퉈서 사이가 틀어지다",
    "She had a falling-out with a friend over a misunderstanding.",
    "그녀는 오해 때문에 친구와 다퉈 사이가 틀어졌어요."
  ],
  [
    "관계",
    "reconnect with an old friend",
    "오랜 친구와 다시 연락하다",
    "I reconnected with an old friend after moving back to my hometown.",
    "고향으로 돌아온 뒤 오랜 친구와 다시 연락하게 됐어요."
  ],
  [
    "관계",
    "give someone the benefit of the doubt",
    "확실하지 않을 때 ~을 좋게 믿어주다",
    "I gave him the benefit of the doubt when he said he hadn't seen my message.",
    "그가 제 메시지를 못 봤다고 했을 때 일단 그 말을 믿어줬어요."
  ]
];
  const previous = window.JINI_ESSENTIAL_EXPRESSIONS_EXTRA;
  if (!Array.isArray(previous)) throw Error("JINI expressions are unavailable");
  const seen = new Set(previous.map(item => item[1].trim().toLowerCase()));
  data.forEach(function (item, index) {
    if (!Array.isArray(item) || item.length !== 5 || item.some(value => typeof value !== "string" || !value.trim())) throw Error("Malformed expression " + (index + 1));
    if (seen.has(item[1].trim().toLowerCase())) throw Error("Duplicate expression " + item[1]);
    seen.add(item[1].trim().toLowerCase());
  });
  if (data.length !== 50) throw Error("Expected 50 new expressions");
  window.JINI_ESSENTIAL_EXPRESSIONS_EXTRA = previous.concat(data);
}());
