/* JINI curriculum: reorganize the actual shared data arrays, without changing words, meanings or stable game IDs. */
(function () {
  "use strict";
  const levels = ["초등", "중등", "고등"];
  const topicOrder = ["일상", "직장", "답변", "여행", "관계"];
  const priorityWords = {
  "초등": "be have do go get make take come give want need like love know think see look hear say tell talk speak ask answer help use try work study learn read write listen watch play eat drink sleep wake walk run sit stand pay buy sell shop spend save choose find lose keep put set let bring carry leave stay wait live move meet call send get back open close start stop finish clean wash cook drive ride travel visit stay book order check wear feel seem sound mean remember forget hope worry enjoy hate prefer agree thank sorry happy sad tired hungry thirsty sick busy free ready good bad better best nice great fine okay easy hard difficult simple fast slow big small new old young first last next today tomorrow yesterday morning night time place thing people person family friend house home room apartment school class job office money price cost bill food water coffee breakfast lunch dinner hotel station bus train subway taxi car phone computer email message question problem reason answer idea chance clothes shoes restaurant menu chair table bed floor door window year week month day hour minute please maybe probably actually usually always often sometimes never almost really just also only very too quite enough instead again still already now later soon",
  "중등": "actually probably definitely usually normally generally recently currently especially simply basically carefully clearly exactly nearly slightly naturally eventually suddenly immediately mostly frequently regularly rarely occasionally personally honestly seriously prefer afford affordable comfortable convenient necessary important typical ordinary normal surprised frustrated anxious confident uncertain improve improvement understand understanding experience opportunity choice option outcome detail concern solution problem risk suggestion recommendation priority progress goal habit routine lifestyle motivation manage cope pretend reassure explanation expectation assume notice recognize realize impress compare decide cancel postpone schedule arrange explain describe check reply update upgrade handle efficient effective productive polite impatient patient available unexpected unfamiliar worried overwhelmed",
  "고등": "ability opportunity challenge relationship community development education environment technology society responsibility performance attention economy industry consequence decision benefit advantage purpose condition quality standard result resource achieve improve influence suggest respond involve establish require provide protect produce evaluate resolve strategy analysis significant relevant sufficient considerable appropriate sophisticated complicated implementation perspective"
};
  const priorityExpressions = {
  "일상": "take a break,these days,once in a while,most of the time,take care of,feel like doing,on my way to,be into,run out of,make time for,get ready for,be used to,get used to,keep track of,pay attention to,get rid of,put off,look up,sleep in,stay up late,get some fresh air,take it easy,get back into a routine,be a morning person,in a rush,make up my mind,go with the flow,go without,lose track of time,be worth the effort,make ends meet",
  "직장": "be in charge of,work on,deal with,make sure,take part in,be responsible for,take notes,go over,meet a deadline,get back to someone,follow up on,come up with,figure out,bring up,point out,on short notice,keep someone updated,set priorities,be on the same page,wrap up,hand in,look into,stay on track,check with,get approval for,make progress on,get feedback on,get down to business,follow the procedure,meet the requirements",
  "답변": "in my opinion,to be honest,for example,first of all,that's why,it depends on,as far as I know,what I like most about,the main reason is that,the best part is that,one of the reasons is that,in addition to,as a result,on the other hand,compared to,from my experience,what matters to me is,the thing is,what I mean is,for the most part,when it comes to,I would say that,in particular,if I had to choose,back then,as time went by,if I could change one thing,there are a couple of reasons",
  "여행": "make a reservation,confirm a booking,check in at,check out of,book in advance,pay by card,order to go,get a refund,get off at,transfer to,ask for directions,catch a flight,be delayed,go sightseeing,take a day trip,on foot,be fully booked,board a plane,go through security,pick up my luggage,drop off my bags,get a window seat,ask for a recommendation,split the bill,find my way to,take a shortcut,top up a transit card,get through immigration,check the train schedule,miss the last train",
  "관계": "keep in touch,get along with,hang out with,have a lot in common,be there for someone,count on,cheer someone up,get to know,reach out to,have a misunderstanding,clear the air,listen carefully to,respect someone's opinion,give someone a hand,let someone down,keep a promise,make someone laugh,invite someone over,catch up with someone,make plans with someone,get together with,talk things through,hear someone out,strike up a conversation,make someone feel at ease,have someone's back"
};
  const PAGE_SIZE = 10;
  const normalize = value => String(value || "").trim().toLowerCase();
  function indexList(text, phrases) {
    const rank = new Map();
    String(text).split(phrases ? "," : /[\s,]+/).map(term => term.trim()).filter(Boolean).forEach(function (term, index) {
      if (!rank.has(normalize(term))) rank.set(normalize(term), index);
    });
    return rank;
  }
  function vocabularyMatches(item, level, query) {
    if (level !== "all" && item.level !== level) return false;
    const other = (item.otherSenses || []).map(sense => sense.meaning).join(" ");
    return (item.word + " " + item.meaning + " " + item.example + " " + item.exampleKo + " " + other)
      .toLocaleLowerCase("ko").includes(query.toLocaleLowerCase("ko"));
  }
  function filteredWords(items, level, query) {
    return items.filter(item => vocabularyMatches(item, level || "all", String(query || "").trim()));
  }
  // Pair added vocabulary with already-studied words that share a real learning context.
  // These references are not display-only: they determine the canonical WORDS array order.
  const nearby = {
    access: "account website internet permission", attraction: "museum tourist landmark",
    boundary: "limit border", celebration: "party festival", content: "article information",
    convenience: "convenient comfort", equipment: "device machine tool",
    facility: "building gym", household: "family home", humidity: "weather temperature",
    image: "picture photo", income: "salary money", interaction: "conversation communication",
    introduction: "meeting name", landscape: "mountain scenery", pattern: "habit routine",
    position: "place location", possibility: "chance possible", protection: "safety protect",
    savings: "money bank", slippers: "shoes socks", adapter: "charger outlet",
    mug: "cup coffee", fan: "air conditioner", wall: "door window",
    escalator: "stairs elevator", downtown: "city town", suburb: "neighborhood city",
    serving: "portion meal", beverage: "drink water", texture: "taste flavor",
    packaging: "package box", container: "bottle box", souvenir: "gift trip",
    pronunciation: "word language", convert: "change transform",
    decrease: "reduce increase", filter: "sort remove", rearrange: "arrange organize",
    detach: "remove attach", recheck: "check confirm", recharge: "charge battery",
    stroll: "walk", notify: "tell inform", unwind: "relax rest",
    skim: "read", snooze: "wake sleep", settle: "move stay", bump: "hit",
    tidy: "clean organize", unbox: "open", scan: "check read",
    recap: "review summarize", revisit: "visit", untangle: "fix",
    disconnect: "connect", inspect: "check test", rehearse: "practice",
    retry: "try", iron: "wash fold", actual: "real",
    firm: "hard soft", informal: "casual formal", official: "formal",
    overwhelming: "difficult hard", recommended: "useful popular",
    related: "similar different", stable: "safe steady",
    suitable: "appropriate good", unavailable: "available",
    unusual: "strange different", spacious: "big wide",
    oversized: "large big", snug: "tight comfortable",
    lightweight: "light heavy", durable: "strong reliable",
    fragile: "weak delicate", pricey: "expensive cheap",
    stylish: "nice fashionable", relieved: "happy relaxed",
    briefly: "quickly", gradually: "slowly", anymore: "still now",
    otherwise: "instead", either: "also", neither: "either",
    anywhere: "everywhere somewhere", somewhere: "anywhere there",
    anyway: "actually", meanwhile: "simultaneously",
    finally: "eventually last", upstairs: "downstairs",
    downstairs: "upstairs", nearby: "near", abroad: "overseas",
    overnight: "night", beforehand: "early", aloud: "clearly",
    perhaps: "probably maybe", luckily: "fortunately happy"
  };
  // Reconstruct the prior 3,060-word curriculum exactly, so old references can
  // be migrated even after the new batch has been installed.
  function legacyOrganize(previous) {
    const arranged = [];
    levels.forEach(function (level) {
      const group = previous.filter(item => item.level === level);
      const priority = indexList(priorityWords[level]);
      const top = group.filter(item => priority.has(normalize(item.word)))
        .sort((a, b) => priority.get(normalize(a.word)) - priority.get(normalize(b.word)));
      const selected = new Set(top);
      const queues = { verb: [], noun: [], adjective: [], adverb: [], other: [] };
      group.forEach(item => {
        if (!selected.has(item)) (queues[item.partOfSpeech] || queues.other).push(item);
      });
      const pattern = ["verb", "noun", "adjective", "noun", "verb", "adverb"];
      const remaining = group.length - top.length;
      const mixed = [];
      for (let i = 0; mixed.length < remaining; i++) {
        let queue = queues[pattern[i % pattern.length]];
        if (!queue.length) queue = [queues.verb, queues.noun, queues.adjective, queues.adverb, queues.other].find(list => list.length);
        if (!queue) break;
        mixed.push(queue.shift());
      }
      arranged.push(...top, ...mixed);
    });
    previous.filter(item => !levels.includes(item.level)).forEach(item => arranged.push(item));
    return arranged;
  }
  function naturalMerge(base, additions) {
    if (!additions.length) return base.slice();
    const anchors = new Map();
    base.forEach(function (item, index) {
      if (!anchors.has(normalize(item.word))) anchors.set(normalize(item.word), index);
    });
    const gaps = new Map();
    additions.forEach(function (item) {
      const related = (nearby[normalize(item.word)] || "").split(" ").filter(Boolean);
      let pos = -1;
      for (const term of related) {
        if (anchors.has(term) && base[anchors.get(term)].partOfSpeech === item.partOfSpeech) {
          pos = anchors.get(term) + 1;
          break;
        }
      }
      if (pos === -1) {
        for (const term of related) {
          if (anchors.has(term)) { pos = anchors.get(term) + 1; break; }
        }
      }
      if (pos === -1) {
        // For a future batch without a curated neighbor, distribute entries
        // throughout the matching level rather than collecting them at its end.
        let hash = 0;
        for (const char of item.word) hash = (hash * 31 + char.charCodeAt(0)) % 100003;
        const target = Math.floor(base.length * (0.08 + 0.84 * (hash % 997) / 997));
        const samePart = base
          .map((word, index) => word.partOfSpeech === item.partOfSpeech ? index : -1)
          .filter(index => index >= 0);
        pos = samePart.length
          ? samePart.reduce((closest, index) => Math.abs(index - target) < Math.abs(closest - target) ? index : closest, samePart[0]) + 1
          : target;
      }
      if (!gaps.has(pos)) gaps.set(pos, []);
      gaps.get(pos).push(item);
    });
    const combined = [];
    for (let index = 0; index <= base.length; index++) {
      if (index > 0) combined.push(base[index - 1]);
      if (gaps.has(index)) combined.push(...gaps.get(index));
    }
    return combined;
  }
  function reorganizeVocabulary() {
    const words = window.WORDS;
    if (!Array.isArray(words) || !words.length) return;
    const previous = words.slice();
    const isAdditional = item => Number(item.sourceBatch) >= 14;
    const legacy = previous.filter(item => !isAdditional(item));
    const newlyAdded = previous.filter(isAdditional);
    const previouslySorted = legacyOrganize(legacy);
    const arranged = [];
    levels.forEach(function (level) {
      const core = previouslySorted.filter(item => item.level === level);
      const additions = newlyAdded.filter(item => item.level === level);
      const organized = naturalMerge(core, additions);
      organized.forEach((item, index) => { item.studyOrder = index + 1; });
      arranged.push(...organized);
    });
    previous.filter(item => !levels.includes(item.level)).forEach(item => arranged.push(item));
    if (arranged.length !== previous.length || new Set(arranged).size !== previous.length) {
      throw Error("Vocabulary curriculum integrity check failed");
    }
    words.splice(0, words.length, ...arranged);
    migrateVocabularyReferences(previous, previouslySorted, words);
    window.JINI_CURRICULUM_COUNTS = {
      words: words.length,
      levels: Object.fromEntries(levels.map(level => [level, words.filter(item => item.level === level).length]))
    };
  }
  function migrateVocabularyReferences(original, priorCurriculum, sorted) {
    const flag = "jini-vocabulary-order-migration-v2";
    try {
      if (localStorage.getItem(flag)) return;
      // Users who have already used curriculum v1 saved page indexes in its
      // 3,060-word ordering; other users still have original source-order indexes.
      const base = localStorage.getItem("jini-vocabulary-order-migration-v1")
        ? priorCurriculum : original;
      const locate = (word, level, query) => filteredWords(sorted, level, query)
        .findIndex(item => normalize(item.word) === normalize(word));
      const bookmarkKey = "jini-learning-bookmarks";
      const rawBookmarks = localStorage.getItem(bookmarkKey);
      if (rawBookmarks) {
        const bookmarks = JSON.parse(rawBookmarks);
        let touched = false;
        if (Array.isArray(bookmarks.vocabulary)) {
          bookmarks.vocabulary.forEach(function (entry) {
            if (!entry || (entry.study || "english") !== "english" || !Number.isInteger(entry.page) || entry.page < 1) return;
            const before = filteredWords(base, entry.level, entry.query);
            const anchor = before[(entry.page - 1) * PAGE_SIZE];
            const intended = entry.anchorWord || (anchor && anchor.word);
            if (!intended) return;
            const newIndex = locate(intended, entry.level, entry.query);
            if (newIndex < 0) return;
            entry.previousPageV2 = entry.page;
            entry.anchorWord = intended;
            entry.page = Math.floor(newIndex / PAGE_SIZE) + 1;
            touched = true;
          });
        }
        if (touched) localStorage.setItem(bookmarkKey, JSON.stringify(bookmarks));
      }
      const stateKey = "jini-last-study-state";
      const rawState = localStorage.getItem(stateKey);
      if (rawState) {
        const stored = JSON.parse(rawState);
        let touched = false;
        const visited = new Set();
        function relocate(state) {
          if (!state || typeof state !== "object" || visited.has(state) || state.page !== "vocabulary") return;
          visited.add(state);
          if (state.study === "korean") return;
          const before = filteredWords(base, state.level, state.query);
          const requested = Number.isInteger(state.selectedVocabularyIndex) && state.selectedVocabularyIndex >= 0
            ? state.selectedVocabularyIndex : (Math.max(1, state.pageNumber || 1) - 1) * PAGE_SIZE;
          const item = before[requested];
          const intended = state.vocabularyAnchorWord || (item && item.word);
          if (!intended) return;
          const newIndex = locate(intended, state.level, state.query);
          if (newIndex < 0) return;
          state.previousPageV2 = state.pageNumber;
          state.vocabularyAnchorWord = intended;
          state.pageNumber = Math.floor(newIndex / PAGE_SIZE) + 1;
          state.selectedVocabularyIndex = newIndex;
          touched = true;
        }
        relocate(stored);
        relocate(stored.english);
        if (stored.pages) relocate(stored.pages.vocabulary);
        if (touched) localStorage.setItem(stateKey, JSON.stringify(stored));
      }
      localStorage.setItem(flag, "1");
    } catch (error) {
      console.warn("JINI curriculum v2 bookmark migration was skipped:", error);
    }
  }
  const expressionNeighbors = new Map(String.raw`head out|on my way to
get home safely|on my way to
have a quick look|look up
run a little late|be pressed for time
keep the place tidy|do the dishes
get some rest|take a break
have a busy day|be short on
be out of town|on my way to
get back on track|get back into a routine
pick up where I left off|get around to
set an alarm for|turn in early
warm up before exercising|get in shape
cool down after a workout|get in shape
check the weather forecast|get some fresh air
take out the trash|do the dishes
stock up on groceries|pick up groceries
grab a cup of coffee|take a break
be in the middle of something|be short on
put on a jacket|get ready for
take off my shoes|get ready for
check the status of|follow up on
work through an issue|figure out
share the latest update|keep someone updated
keep to the schedule|stay on track
set a clear deadline|meet a deadline
bring someone into the discussion|bring up
go through the checklist|go over
sign off on|get approval for
get a second opinion|get feedback on
take action on|flag an issue
make a quick change|make an adjustment
keep the discussion focused|touch on
handle a customer complaint|deal with
roll out a new feature|move forward with
follow the instructions|follow the procedure
be out of the office|fill in for
prioritize the urgent tasks|set priorities
be scheduled for|ahead of schedule
hand over the task to|take over
keep a record of|take notes
let me think for a second|that's a good question
to start with|first of all
I tend to agree that|to some extent
if you think about it|come to think of it
it was a turning point for me|looking back
I wasn't expecting that|I couldn't believe how
the biggest advantage is|the best part is that
I'd rather do that than|compared to
it wasn't until then that|back then
what I found interesting was|one thing I noticed is
that's exactly why|that's why
I can see both sides|on the other hand
I have noticed that|one thing I noticed is
it really depends on|it depends on
I guess you could say|I would say that
a good example would be|for example
to sum it up|all things considered
there is no doubt that|in my opinion
at least in my experience|from my experience
the thing I remember most is|it reminds me of
show my passport at|go through security
collect my baggage|pick up my luggage
take a connecting flight|miss a connection
ask about the baggage allowance|drop off my bags
buy a round-trip ticket|book in advance
find the nearest exit|find my way to
take the subway instead|transfer to
use a translation app|ask for directions
check the departure board|check the train schedule
get through customs|get through immigration
ask for the Wi-Fi password|ask for a recommendation
report a lost item|leave something behind
request a room change|change my reservation
ask for a quieter room|request an early check-in
pay in local currency|exchange some currency
take the airport shuttle|get around
avoid the rush hour|get stuck in traffic
check the bus stop|get off at
look for the platform number|take the wrong train
confirm the pickup location|confirm a booking
introduce myself to|break the ice
make someone smile|make someone laugh
apologize for being late|make amends
thank someone in person|show appreciation for
be happy for someone|cheer for
worry about someone|look out for
ask how someone's doing|check in on someone
make a good first impression|get to know
feel comfortable around|make someone feel at ease
share a common interest|have a lot in common
be thoughtful of others|put yourself in someone's shoes
support someone through|be there for someone
spend more time together|spend quality time with
work things out with|talk things through
give someone some advice|give someone a hand
take time to listen|hear someone out
respect someone's boundaries|set boundaries
make plans to meet up|make plans with someone
check if someone is okay|check in on someone
make time for each other|spend quality time with`.split(/\n/).map(line => {
    const separator = line.indexOf("|");
    return [line.slice(0, separator).toLowerCase(), line.slice(separator + 1).toLowerCase()];
  }));
  function reorganizeExpressions(items) {
    if (!Array.isArray(items)) return;
    if (new Set(items.map(item => item.id)).size !== items.length) throw Error("English expression IDs must remain unique");
    const byCategory = Object.fromEntries(topicOrder.map(category => [category, indexList(priorityExpressions[category], true)]));
    const rank = new Map(topicOrder.map((category, index) => [category, index]));
    // The saved ID is immutable. Reorganize source records only, never renumber IDs.
    const existing = items.filter(item => item.id <= 400);
    const additions = items.filter(item => item.id > 400);
    existing.sort(function (a, b) {
      const categoryDifference = (rank.get(a.category) ?? 99) - (rank.get(b.category) ?? 99);
      if (categoryDifference) return categoryDifference;
      const pri = byCategory[a.category] || new Map();
      const aRank = pri.has(normalize(a.phrase)) ? pri.get(normalize(a.phrase)) : 10000;
      const bRank = pri.has(normalize(b.phrase)) ? pri.get(normalize(b.phrase)) : 10000;
      if (aRank !== bRank) return aRank - bRank;
      const aLength = String(a.phrase).trim().split(/\s+/).length;
      const bLength = String(b.phrase).trim().split(/\s+/).length;
      return aLength - bLength || a.id - b.id;
    });
    const arranged = [];
    topicOrder.forEach(function (category) {
      const old = existing.filter(item => item.category === category);
      const next = additions.filter(item => item.category === category);
      const positions = new Map();
      const oldRanks = new Map(old.map((item, index) => [normalize(item.phrase), index]));
      next.forEach(function (item, index) {
        const anchor = expressionNeighbors.get(normalize(item.phrase));
        // New phrases sit beside related older expressions, not at the end.
        const position = oldRanks.has(anchor) ? oldRanks.get(anchor) + 1
          : Math.min(old.length, Math.floor((index + 1) * old.length / (next.length + 1)));
        if (!positions.has(position)) positions.set(position, []);
        positions.get(position).push(item);
      });
      for (let i = 0; i <= old.length; i++) {
        if (i > 0) arranged.push(old[i - 1]);
        if (positions.has(i)) arranged.push(...positions.get(i));
      }
    });
    existing.concat(additions).filter(item => !topicOrder.includes(item.category)).forEach(item => arranged.push(item));
    if (arranged.length !== items.length || new Set(arranged).size !== items.length) throw Error("English expression merge integrity failed");
    items.splice(0, items.length, ...arranged);
    items.forEach((item, index) => { item.studyNumber = index + 1; });
    return items;
  }
  window.JINI_LEARNING_ORDER_DATA = { reorganizeVocabulary, reorganizeExpressions };
  reorganizeVocabulary();
}());
