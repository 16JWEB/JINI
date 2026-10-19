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
  function indexList(text) {
    const rank = new Map();
    String(text).split(/[\s,]+/).filter(Boolean).forEach(function (term, index) {
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
  function reorganizeVocabulary() {
    const words = window.WORDS;
    if (!Array.isArray(words) || !words.length) return;
    const previous = words.slice();
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
      const organized = top.concat(mixed);
      organized.forEach((item, i) => { item.studyOrder = i + 1; });
      arranged.push(...organized);
    });
    previous.filter(item => !levels.includes(item.level)).forEach(item => arranged.push(item));
    if (arranged.length !== previous.length || new Set(arranged).size !== previous.length) throw Error("Vocabulary integrity check failed");
    words.splice(0, words.length, ...arranged);
    migrateVocabularyReferences(previous, words);
    window.JINI_CURRICULUM_COUNTS = {
      words: words.length,
      levels: Object.fromEntries(levels.map(level => [level, words.filter(item => item.level === level).length]))
    };
  }
  function migrateVocabularyReferences(previous, sorted) {
    const flag = "jini-vocabulary-order-migration-v1";
    try {
      if (localStorage.getItem(flag)) return;
      const bookmarkKey = "jini-learning-bookmarks";
      const rawBookmarks = localStorage.getItem(bookmarkKey);
      if (rawBookmarks) {
        const bookmarks = JSON.parse(rawBookmarks);
        let touched = false;
        if (Array.isArray(bookmarks.vocabulary)) {
          bookmarks.vocabulary.forEach(function (entry) {
            if (!entry || (entry.study || "english") !== "english" || !Number.isInteger(entry.page) || entry.page < 1) return;
            const before = filteredWords(previous, entry.level, entry.query);
            const anchor = before[(entry.page - 1) * PAGE_SIZE];
            if (!anchor) return;
            const after = filteredWords(sorted, entry.level, entry.query);
            const newIndex = after.indexOf(anchor);
            if (newIndex < 0) return;
            entry.legacyPage = entry.page;
            entry.anchorWord = anchor.word;
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
          const before = filteredWords(previous, state.level, state.query);
          const wanted = Number.isInteger(state.selectedVocabularyIndex) && state.selectedVocabularyIndex >= 0
            ? state.selectedVocabularyIndex : (Math.max(1, state.pageNumber || 1) - 1) * PAGE_SIZE;
          const anchor = before[wanted];
          if (!anchor) return;
          const after = filteredWords(sorted, state.level, state.query);
          const newIndex = after.indexOf(anchor);
          if (newIndex < 0) return;
          state.legacyPageNumber = state.pageNumber;
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
      // Never interrupt learning or reset a learner's records if browser storage is unavailable.
      console.warn("JINI curriculum bookmark migration was skipped:", error);
    }
  }
  function reorganizeExpressions(items) {
    if (!Array.isArray(items)) return;
    if (new Set(items.map(item => item.id)).size !== items.length) throw Error("English expression IDs must remain unique");
    const byCategory = Object.fromEntries(topicOrder.map(category => [category, indexList(priorityExpressions[category])]));
    const rank = new Map(topicOrder.map((category, index) => [category, index]));
    // IDs are the permanent references for bookmarks, earned XP and review questions.
    items.sort(function (a, b) {
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
    items.forEach((item, index) => { item.studyNumber = index + 1; });
    return items;
  }
  window.JINI_LEARNING_ORDER_DATA = { reorganizeVocabulary, reorganizeExpressions };
  reorganizeVocabulary();
}());
