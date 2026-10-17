/* JINI individually reviewed everyday vocabulary (batch 3 of 3). */
(function () {
  "use strict";
  const rows = String.raw`초등|noun|light bulb|ˈlaɪt bʌlb|전구|The light bulb in the hallway went out.|복도 전구가 나갔어요.
중등|noun|nightstand|ˈnaɪtstænd|침대 옆 협탁|I keep a glass of water on my nightstand.|침대 옆 협탁에 물 한 잔을 둬요.
초등|noun|bookshelf|ˈbʊkʃelf|책장|My new bookshelf is already full of books.|새 책장이 벌써 책으로 가득 찼어요.
초등|noun|cushion|ˈkʊʃən|쿠션|There are two cushions on the sofa.|소파에 쿠션이 두 개 있어요.
중등|noun|pillowcase|ˈpɪloʊkeɪs|베갯잇|I change my pillowcase every week.|저는 매주 베갯잇을 갈아요.
중등|noun|duvet|duːˈveɪ|두꺼운 이불|This duvet keeps me warm in winter.|이 이불은 겨울에 따뜻하게 해 줘요.
초등|noun|garage|ɡəˈrɑːʒ|차고|My father's car is in the garage.|아버지 차가 차고에 있어요.
초등|noun|driveway|ˈdraɪvweɪ|집 앞 진입로|Please don't park in our driveway.|우리 집 진입로에 주차하지 마세요.
중등|noun|porch|pɔːrtʃ|현관 앞 공간, 베란다|We sat on the porch and watched the rain.|우리는 현관 앞에 앉아 비를 바라봤어요.
초등|noun|mailbox|ˈmeɪlbɑːks|우편함|There was a postcard in our mailbox.|우편함에 엽서 한 장이 있었어요.
중등|noun|landlord|ˈlændlɔːrd|집주인|I called the landlord about the broken heater.|고장 난 난방기 때문에 집주인에게 전화했어요.
중등|noun|tenant|ˈtenənt|세입자|The tenant reported a leak in the kitchen.|세입자가 주방 누수를 신고했어요.
중등|noun|lease|liːs|임대차 계약|We signed a one-year lease for the apartment.|우리는 그 아파트에 대해 1년짜리 임대차 계약을 맺었어요.
초등|noun|roommate|ˈruːmmeɪt|룸메이트, 동거인|My roommate makes coffee every morning.|룸메이트는 매일 아침 커피를 내려요.
중등|adjective|clogged|klɑːɡd|막힌|The kitchen sink is clogged again.|주방 싱크대가 또 막혔어요.
중등|noun|drain|dreɪn|배수구|Hair can block the shower drain.|머리카락이 샤워실 배수구를 막을 수 있어요.
초등|noun|dish soap|ˈdɪʃ soʊp|주방 세제|We need dish soap to wash the plates.|접시를 씻으려면 주방 세제가 필요해요.
초등|noun|trash can|ˈtræʃ kæn|쓰레기통|The trash can is full.|쓰레기통이 가득 찼어요.
중등|noun|recycling bin|riːˈsaɪklɪŋ bɪn|재활용 수거함|Put empty bottles in the recycling bin.|빈 병을 재활용 수거함에 넣으세요.
초등|noun|cutting board|ˈkʌtɪŋ bɔːrd|도마|Wash the cutting board after cutting raw meat.|생고기를 자른 뒤에는 도마를 씻으세요.
중등|noun|grater|ˈɡreɪtər|강판|Use a grater to shred the cheese.|강판으로 치즈를 갈아 주세요.
초등|noun|garlic|ˈɡɑːrlɪk|마늘|Add two cloves of garlic to the soup.|수프에 마늘 두 쪽을 넣으세요.
초등|noun|cabbage|ˈkæbɪdʒ|양배추|I bought a small cabbage at the market.|시장에서 작은 양배추 한 통을 샀어요.
초등|noun|cucumber|ˈkjuːkʌmbər|오이|She sliced a cucumber for the salad.|그녀는 샐러드에 넣을 오이를 썰었어요.
초등|noun|lettuce|ˈletɪs|상추, 양상추|Put some fresh lettuce in the sandwich.|샌드위치에 신선한 상추를 넣으세요.
초등|noun|spinach|ˈspɪnɪtʃ|시금치|My mother added spinach to the soup.|어머니가 수프에 시금치를 넣으셨어요.
초등|noun|mushroom|ˈmʌʃruːm|버섯|I added some mushrooms to the pasta.|파스타에 버섯을 좀 넣었어요.
초등|noun|flour|flaʊər|밀가루|We need flour to make the pancakes.|팬케이크를 만들려면 밀가루가 필요해요.
초등|noun|noodles|ˈnuːdəlz|국수, 면|I had noodles for lunch today.|오늘 점심으로 국수를 먹었어요.
초등|noun|pasta|ˈpɑːstə|파스타|We made pasta for dinner.|저녁으로 파스타를 만들었어요.
초등|noun|cereal|ˈsɪriəl|아침용 시리얼|I eat cereal with milk before school.|학교에 가기 전에 우유와 시리얼을 먹어요.
초등|noun|yogurt|ˈjoʊɡərt|요구르트|She eats yogurt with fruit every morning.|그녀는 매일 아침 과일과 함께 요구르트를 먹어요.
초등|noun|jam|dʒæm|잼|I spread strawberry jam on the toast.|토스트에 딸기잼을 발랐어요.
초등|noun|toast|toʊst|토스트, 구운 빵|I made toast and eggs for breakfast.|아침으로 토스트와 달걀을 준비했어요.`;
  const list = window.WORDS;
  if (!Array.isArray(list)) throw Error("Missing WORDS source");
  const known = new Set(list.map(x => x.word.trim().toLowerCase()));
  const added=[];
  rows.split(/\n/).forEach((line,i)=>{
    const a=line.split("|");
    if(a.length!==7||a.some(x=>!x.trim()))throw Error("Malformed entry "+(i+1));
    const [level,partOfSpeech,word,ipa,meaning,example,exampleKo]=a.map(x=>x.trim());
    if(known.has(word.toLowerCase()))throw Error("Duplicate vocabulary "+word);
    if(!["초등","중등","고등"].includes(level))throw Error("Bad level "+word);
    if(!["noun","verb","adjective","adverb"].includes(partOfSpeech))throw Error("Bad part of speech "+word);
    known.add(word.toLowerCase());
    added.push({level,partOfSpeech,word,ipa:"/"+ipa+"/",meaning,example,exampleKo,exampleReviewed:true,otherSenses:[]});
  });
  list.push(...added);
  (window.JINI_ADDED_VOCAB_BATCHES=window.JINI_ADDED_VOCAB_BATCHES||[]).push({batch:3,count:added.length});
}());