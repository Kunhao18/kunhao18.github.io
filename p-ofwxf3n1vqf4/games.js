/* =============================================================================
 *  GAMES CONFIG  —  edit this file to update the "Player 2" games page
 * =============================================================================
 *  Everything on the page is generated from the object below. No build step:
 *  edit, save, push. Text fields are plain text (no HTML). Fields written as
 *  { ko: "…", en: "…" } switch with the language toggle on the page.
 *
 *  Each game:
 *    id        short unique slug. Also the share link:  <page URL>/#<id>
 *              (add "/start" to open the "시작하기" tab directly)
 *    passion   1–5, how much you want to play it. Drives the order + the meter.
 *    status    "wishlist" → she can send you a request from the page
 *              "gifted"   → you've sent the Steam gift; page tells her to accept
 *              "playing"  → you're playing it together
 *              "finished" → done!
 *    pc / mobile   which platform tags to show
 *    delivery  "gift" (you buy it on Steam)  |  "free" (free to play)
 *    join      how you play together:
 *              "party" (same server, you invite)  |  "host" (she joins your world)
 *              "uid"   (add each other in-game by ID)
 *    cover     card image (landscape, ~16:10)      hero  pop-up banner (wide)
 *    trailer   YouTube video id (the part after watch?v=). Leave "" for none.
 *    facts     short pills under the intro: things a non-gamer wants to know
 *              (language, difficulty, session length…). Any number of { ko, en }.
 *    systems   the "what's fun" tabs. Each has an icon, a label, a screenshot,
 *              what it is (what), what we do together (together) and our goal.
 *    links     store pages shown in the About tab
 * ========================================================================== */

window.GAMES_CONFIG = {
  /* ---- Settings ---------------------------------------------------------- */
  settings: {
    defaultLang: "ko",              // "ko" or "en". A visitor's choice is remembered.
    theme: "peach",                 // "peach" (soft coral + lilac) | "organic" (terracotta + sage) | "mist" (clean, single accent)
                                    // Preview any of them with ?theme=… in the URL.
    partnerName: "",                // her name. Empty = "플레이어 2 전용 / 너랑 하고 싶은 게임들".
                                    // Set = "○○ 전용 / ○○(이)랑 하고 싶은 게임들".
    formspreeId: "mwllznnb",        // from https://formspree.io (free).
                                    // Empty = the send button opens her mail app instead.
    ownerEmail: ["zhihao.2.wu", "kcl.ac.uk"],   // [user, domain] — joined at runtime
    emailSubject: "{emoji} {game} 하자는 요청이 왔어",   // subject line you receive
    lastUpdated: "November 2026",   // shown at the bottom of the page
  },

  /* ---- Games -------------------------------------------------------------- */
  games: [
    {
      id: "archeage", passion: 5, status: "wishlist",
      pc: true, mobile: false, delivery: "gift", join: "party",
      cover: "img/archeage-card.jpg",
      hero:  "img/archeage-hero.jpg",
      trailer: "mgidt1SW5Pc",
      name:  { ko: "아키에이지 크로니클", en: "ArcheAge Chronicles" },
      hook:  { ko: "둘이 무역회사 차려서 대륙 하나 접수하자.",
               en: "Let's start a trading company and take over a continent." },
      intro: { ko: "XLGAMES가 만든 아키에이지의 후속작, 오픈월드 액션 MMORPG야. 잊혀졌던 대륙 '오로리아'에 개척자로 첫발을 딛는 이야기야. 2026년 11월 4일(한국 시간)에 Steam 앞서 해보기로 막 나왔어.",
               en: "XLGAMES' follow-up to ArcheAge, an open-world action MMORPG. We set foot on Auroria, a long-lost continent, as pioneers. It just launched in Steam Early Access on November 3, 2026 (PT)." },
      facts: [
        { ko: "한국어 자막 + 음성", en: "Korean text + voice" },
        { ko: "초보 난이도 보통 (퀘스트만 따라가면 돼)", en: "Medium for beginners (just follow the quests)" },
        { ko: "한 판 1~2시간", en: "1–2 hours a session" },
      ],
      systems: [
        { icon: "🗺️", label: { ko: "탐험", en: "Explore" }, shot: "img/archeage-explore.jpg",
          what: { ko: "오로리아는 언리얼 엔진 5로 만든 넓은 오픈월드야. 고대 유적, 추락한 비행선, 안개 낀 늪지까지, 가는 곳마다 숨겨진 거랑 수집 요소가 천 개 넘게 깔려 있어. 점프하고 구르고 어디든 올라갈 수 있어.",
                  en: "Auroria is a big open world built in Unreal Engine 5: ancient ruins, a crashed airship, foggy marshes, with over a thousand hidden things to find. Jump, roll and climb; nowhere is off limits." },
          together: { ko: "같은 서버에서 파티 맺고 지도 구석구석 같이 돌아. 네가 길 잃으면 내가 찾으러 갈게.",
                      en: "Party up on the same server and sweep the map corner by corner. Get lost and I'll come find you." },
          goal: { ko: "지도 전부 밝히기 + 숨겨진 유적 다 찾기", en: "Uncover the whole map and every hidden ruin" } },
        { icon: "🚢", label: { ko: "무역", en: "Trade runs" }, shot: "img/archeage-trade.jpg",
          what: { ko: "아키에이지의 상징. 특산품을 만들어서 마차나 배에 싣고 먼 도시까지 직접 운반해서 팔아. 멀수록 비싸게 팔리는데, 가는 길에 몬스터랑 다른 플레이어가 노려.",
                  en: "ArcheAge's signature. Craft regional goods, load them on a cart or a ship and haul them to a far-off city to sell. The further you go, the more they pay, and monsters and other players will be eyeing the cargo." },
          together: { ko: "한 명은 짐 싣고 몰고, 한 명은 옆에서 호위. 도착하면 수익 반반.",
                      en: "One drives the cargo, one rides shotgun. We split the profit at the other end." },
          goal: { ko: "무역회사 차려서 대륙 1위 상단 되기", en: "Start a trading company and become the richest outfit on the continent" } },
        { icon: "🏡", label: { ko: "집 & 생활", en: "Home & life" }, shot: "img/archeage-home.jpg",
          what: { ko: "사냥, 채집, 농사, 제작, 하우징까지 생활 콘텐츠가 따로 있어. 내 땅에 집 짓고 가구 놓고, 밭에 작물 심어서 무역품 재료로 써.",
                  en: "There's a whole 'life' side: hunting, gathering, farming, crafting and housing. Build a house on your own plot, furnish it, and grow crops that feed the trade runs." },
          together: { ko: "집은 내가 지을게. 인테리어랑 정원은 네 담당.",
                      en: "I build the house. Interior and garden are yours." },
          goal: { ko: "둘이 사는 집 완성 + 정원에 뭐라도 키우기", en: "Finish our house and grow something in the garden" } },
        { icon: "⚔️", label: { ko: "전투", en: "Combat" }, shot: "img/archeage-fight.jpg",
          what: { ko: "타겟팅 없이 직접 조준하는 액션 전투야. 점프, 구르기, 막기, 패링 다 있고, 무기 두 개 조합해서 내 스타일대로 빌드 짜. 던전이랑 레이드 보스는 파티로 가.",
                  en: "Action combat with free aim: jump, roll, block and parry, and mix two weapons into your own build. Dungeons and raid bosses are party content." },
          together: { ko: "처음엔 네가 원거리(레인저나 마법사)로 뒤에서 쏴. 앞에서 맞는 건 내가 할게.",
                      en: "Start ranged (ranger or mage) and shoot from the back. I'll take the hits up front." },
          goal: { ko: "첫 던전 보스 둘이서 잡기", en: "Clear our first dungeon boss as a duo" } },
      ],
      note:  { ko: "집은 내가 지을게. 인테리어는 네 맘대로 해.",
               en: "I'll build the house. The interior is all yours." },
      links: [
        { label: { ko: "Steam 페이지", en: "Steam page" }, href: "https://store.steampowered.com/app/3218230/ArcheAge_Chronicles/" },
      ],
    },
    {
      id: "dst", passion: 4, status: "wishlist",
      pc: true, mobile: false, delivery: "gift", join: "host",
      cover: "img/dst-card.jpg",
      hero:  "img/dst-hero.jpg",
      trailer: "dU-aq2JbLkk",
      name:  { ko: "돈 스타브 투게더", en: "Don't Starve Together" },
      hook:  { ko: "굶어 죽지 않기 대작전. 근데 꼭 둘이서.",
               en: "Operation: don't starve. Strictly as a duo." },
      intro: { ko: "Klei가 만든 협동 생존 게임. 이상한 세계 '콘스턴트'에 떨어져서 재료 모으고, 도구 만들고, 밤이랑 겨울을 버텨. 그림체는 팀 버튼 영화 같고, 죽어도 유령으로 떠돌다가 다시 살아날 수 있어.",
               en: "Klei's co-op survival game. We're dropped into a strange world called The Constant: gather, craft, and make it through the nights and the winter. It looks like a Tim Burton film, and if you die you float around as a ghost until you're revived." },
      facts: [
        { ko: "한국어 OK", en: "Korean OK" },
        { ko: "초보 난이도 높음 (대신 내가 캐리)", en: "Hard for beginners (but I'll carry)" },
        { ko: "한 판 1시간~ (게임 속 하루 8분)", en: "1 hour+ a session (a day is 8 min)" },
      ],
      systems: [
        { icon: "🏕️", label: { ko: "기지", en: "Base camp" }, shot: "img/dst-base.jpg",
          what: { ko: "모닥불, 과학 기계, 냉장고, 울타리… 재료 모아서 우리만의 캠프를 짓는 게 핵심이야. 밤엔 어둠 속에 뭔가 있어서 불 옆에 꼭 붙어 있어야 돼.",
                  en: "Fire pit, science machine, ice box, fences... the heart of the game is gathering and building a camp of our own. At night something lives in the dark, so stay by the fire." },
          together: { ko: "낮엔 나뉘어서 재료 모으고, 해 지기 전에 캠프로 모여. 캠프 배치는 네가 정해.",
                      en: "Split up to gather by day, meet back at camp before sunset. You decide the camp layout." },
          goal: { ko: "겨울 오기 전에 제대로 된 기지 완성", en: "A proper base before the first winter" } },
        { icon: "🍲", label: { ko: "농사 & 요리", en: "Farm & cook" }, shot: "img/dst-farm.jpg",
          what: { ko: "밭 만들어서 작물 키우고, 크록팟에 재료 4개 넣으면 요리가 나와. 레시피가 수십 개라 조합 찾는 재미가 있고, 잘 먹어야 정신력도 안 떨어져.",
                  en: "Plant crops, then drop four ingredients into the crock pot and see what comes out. There are dozens of recipes to discover, and eating well keeps your sanity up too." },
          together: { ko: "너는 요리 담당. 내가 사냥해 온 고기로 뭐 해줄래?",
                      en: "You're the cook. What are you making with the meat I bring back?" },
          goal: { ko: "미트볼부터 시작해서 레시피 10개 깨기", en: "Start with meatballs, unlock ten recipes" } },
        { icon: "❄️", label: { ko: "계절", en: "Seasons" }, shot: "img/dst-seasons.jpg",
          what: { ko: "가을 → 겨울 → 봄 → 여름이 돌아가고 계절마다 위기가 달라. 겨울엔 얼어 죽고, 여름엔 더위로 쓰러지고, 봄엔 비 때문에 미쳐가. 미리 준비하는 게 전부야.",
                  en: "Autumn, winter, spring, summer, each with its own way to end you: freezing, overheating, going mad in the rain. It's all about preparing early." },
          together: { ko: "첫 겨울을 둘이 살아남으면 진짜 한 팀. 겨울옷은 내가 만들어 줄게.",
                      en: "If we survive the first winter together, we're a real team. I'll craft your winter clothes." },
          goal: { ko: "1년(4계절) 완주", en: "Survive a full year, all four seasons" } },
        { icon: "👹", label: { ko: "괴물 & 보스", en: "Bosses" }, shot: "img/dst-boss.jpg",
          what: { ko: "겨울엔 디어클롭스가 기지를 부수러 오고, 하운드 떼랑 거미가 주기적으로 몰려와. 큰 보스를 잡으면 좋은 재료랑 장비가 나와.",
                  en: "Deerclops comes to wreck the base in winter, and hounds and spiders show up on a schedule. Big bosses drop the good materials and gear." },
          together: { ko: "괴물은 내 담당. 네가 죽어도 '텔테일 하트'로 살려줄게.",
                      en: "Monsters are my job. If you die, I'll bring you back with a Telltale Heart." },
          goal: { ko: "디어클롭스 잡기 (그 다음엔 더 큰 애들)", en: "Take down Deerclops, then the bigger ones" } },
      ],
      note:  { ko: "너는 요리 담당, 나는 괴물 담당. 죽으면 내가 살려줄게.",
               en: "You cook, I handle the monsters. If you die, I'll bring you back." },
      links: [
        { label: { ko: "Steam 페이지", en: "Steam page" }, href: "https://store.steampowered.com/app/322330/Dont_Starve_Together/" },
      ],
    },
    {
      id: "aniimo", passion: 4, status: "wishlist",
      pc: true, mobile: true, delivery: "free", join: "uid",
      cover: "img/aniimo-card.jpg",
      hero:  "img/aniimo-hero.jpg",
      trailer: "puReoQo7K0E",
      name:  { ko: "Aniimo", en: "Aniimo" },
      hook:  { ko: "귀여운 애들 잡으러 가자. 이름은 네가 다 지어.",
               en: "Let's go catch cute things. You get to name them all." },
      intro: { ko: "Pawprint Studio가 만든 무료 오픈월드 크리처 수집 RPG. 널찍한 대륙 '이딜'에서 귀여운 애니모를 잡고, 키우고, 직접 애니모로 변신해서 돌아다녀. PC랑 폰이 크로스플레이라 침대에서도 돼.",
               en: "A free-to-play open-world creature-catching RPG from Pawprint Studio. Roam the continent of Idyll, catch and raise cute Aniimo, and even turn into them. PC and phone cross-play, so it works from bed too." },
      facts: [
        { ko: "한국어 OK", en: "Korean OK" },
        { ko: "초보 난이도 쉬움 (포켓몬 해봤으면 끝)", en: "Easy (if you've touched Pokémon, you're set)" },
        { ko: "30분부터 OK", en: "30 minutes is enough" },
      ],
      systems: [
        { icon: "🐾", label: { ko: "포획 & 수집", en: "Catch" }, shot: "img/aniimo-catch.jpg",
          what: { ko: "'애니팟'을 던져서 잡아. 함정 놓고 타이밍 맞추는 재미가 있고, 날씨·시간·지형 따라 나오는 애가 달라. 대부분 진화도 해.",
                  en: "Throw an Aniipod to catch them, with traps and timing to get right. Different Aniimo show up with the weather, the time of day and the terrain, and most of them evolve." },
          together: { ko: "잡으면 이름은 네가 다 지어. 제일 귀여운 애는 너 줄게. 도감은 둘이 나눠서 채우자.",
                      en: "You name everything we catch, and the cutest one is yours. Let's split the Aniidex between us." },
          goal: { ko: "둘이서 도감 완성", en: "Complete the Aniidex together" } },
        { icon: "✨", label: { ko: "변신", en: "Twine" }, shot: "img/aniimo-twine.jpg",
          what: { ko: "이 게임만의 핵심 시스템. 잡은 애니모랑 '트와인'해서 그 애가 되는 거야. 불 뿜는 애, 땅 파는 애, 물속 가는 애. 능력을 직접 써서 퍼즐 풀고 싸워.",
                  en: "The game's own trick. Twine with an Aniimo you've caught and you become it: fire-breathers, diggers, swimmers. Use their abilities yourself to solve puzzles and fight." },
          together: { ko: "나는 큰 애로 변신해서 길 뚫고, 너는 날아다니는 애로 위에서 봐줘.",
                      en: "I'll twine into something big and clear the way; you take a flyer and scout from above." },
          goal: { ko: "서로 다른 변신으로 못 가던 데 다 가기", en: "Reach every spot we couldn't, using each other's forms" } },
        { icon: "🏡", label: { ko: "홈랜드", en: "Homeland" }, shot: "img/aniimo-home.jpg",
          what: { ko: "각자 캠핑카가 있고, '홈랜드'에 돌아가면 작물 심고 꾸미고 애니모를 풀어놓을 수 있어. 다른 플레이어도 놀러 와.",
                  en: "Everyone gets an RV, and back in your Homeland you plant, decorate and let your Aniimo roam. Other players can visit." },
          together: { ko: "우리 홈랜드 꾸미기. 애니모들 뛰노는 마당은 네가 설계해.",
                      en: "Decorate our Homeland. You design the yard where the Aniimo play." },
          goal: { ko: "애니모 다 풀어놓은 마당 완성", en: "A finished yard with every Aniimo running around" } },
        { icon: "🗺️", label: { ko: "이딜 탐험", en: "Explore Idyll" }, shot: "img/aniimo-world.jpg",
          what: { ko: "활강하고, 잠수하고, 땅 파고. 대륙 어디든 갈 수 있어. 하늘에 떠 있는 도시도 있고, 3명이 팀 짜는 '에그 하이스트' 모드도 있어.",
                  en: "Glide, dive, burrow: the whole continent is open. There's a city floating in the sky and a 3-player 'Egg Heist' mode too." },
          together: { ko: "폰으로 너, PC로 나, 같은 지도에서 만나. 숨은 데 찾으면 사진 찍어 보내줘.",
                      en: "You on your phone, me on PC, same map. Send me a photo when you find something hidden." },
          goal: { ko: "하늘 도시까지 같이 도착", en: "Reach the sky city together" } },
      ],
      note:  { ko: "무료라 선물할 건 없어. 대신 제일 귀여운 애는 너 줄게.",
               en: "It's free, so there's nothing to gift. You get the cutest one, though." },
      links: [
        { label: { ko: "Steam 페이지", en: "Steam page" }, href: "https://store.steampowered.com/app/4126040/Aniimo/" },
      ],
    },
  ],

  /* ---- Moods (the "ask me to play" buttons) -------------------------------- */
  moods: [
    { id: "tonight", e: "🔥", label: { ko: "오늘 밤 당장", en: "Tonight!" } },
    { id: "hyped",   e: "😆", label: { ko: "완전 기대돼",  en: "So hyped" } },
    { id: "please",  e: "🥺", label: { ko: "같이 해줘",    en: "Play with me" } },
    { id: "curious", e: "🤔", label: { ko: "일단 궁금해",  en: "Just curious" } },
  ],

  /* ---- UI text ------------------------------------------------------------- */
  // {name} = the game's name.
  // In titleNamed, {name} = partnerName and {rang} = 랑/이랑.
  strings: {
    ko: {
      title: "너랑 하고 싶은\n게임들", titleNamed: "{name}{rang} 하고 싶은\n게임들",   // \n = line break
      lede: "하나 골라줘. 그게 우리 다음 데이트야.",
      platformPc: "PC", platformMobile: "폰", requestedTag: "조르기 완료", close: "닫기",
      tabAbout: "어떤 게임이야?", tabStart: "시작하기",
      systemsTitle: "뭐가 재밌냐면", sysTogether: "같이 하면", sysGoal: "우리 목표", enlarge: "크게 보기",
      trailerTitle: "영상으로 보기", play: "재생",
      noteLabel: "내 한마디", goStart: "시작하기",
      requestTitle: "이거 하자고 조르기", requestSub: "기분 하나 고르면 나한테 메일로 바로 가.",
      send: "보내기", sending: "보내는 중…",
      sentTitle: "접수 완료!",
      sentGift: "Steam 선물 곧 보낼게. 알림 뜨면 수락만 해.",
      sentFree: "알림 받았어. 설치하고 나한테 말해줘.",
      sendAgain: "다시 조르기",
      error: "전송에 실패했어. 한 번만 다시 눌러줘.",
      gift: "🎁 Steam 선물로 보내줄게. 넌 받기만 하면 돼.",
      free: "무료 게임이야. 그냥 설치하면 돼.",
      giftedTitle: "선물 보냈어!", giftedBody: "Steam 알림에서 \"선물 수락\"만 눌러줘. 그럼 라이브러리에 바로 들어가.",
      playingTitle: "같이 하는 중!", playingBody: "지금 같이 하고 있는 게임이야.",
      finishedTitle: "깼다!", finishedBody: "같이 끝낸 게임. 다음 거 고르자.",
      updated: "업데이트",
      passion: ["궁금한 정도", "해볼 만해", "꽤 하고 싶어", "엄청 하고 싶어", "제발 같이 해줘"],
      status: { wishlist: "하고 싶어", gifted: "선물 보냄", playing: "같이 하는 중", finished: "깼다!" },
      tutorial: {
        gift: { label: "Steam 선물 받기", steps: [
          { title: "선물 수락하기", body: "내가 보내면 Steam 상단에 초록색 알림이 뜨고 메일로도 와. 열어서 \"선물 수락\"을 누르면 라이브러리에 바로 들어가." },
          { title: "설치하기", body: "라이브러리에서 {name} 선택 → 설치. 다 받아지면 나한테 알려줘." },
        ] },
        freePc: { label: "PC에서 받기", steps: [
          { title: "Steam에서 검색", body: "Steam 상점에서 \"{name}\" 검색 → \"무료 플레이\"를 누르면 라이브러리에 추가되고 설치가 시작돼. Epic Games Store에서도 받을 수 있어." },
        ] },
        freeMobile: { label: "폰에서 받기", steps: [
          { title: "앱스토어에서 설치", body: "아이폰은 App Store, 안드로이드는 Google Play에서 \"{name}\" 검색 → 설치." },
          { title: "와이파이에서 처음 실행", body: "처음 켜면 추가 데이터를 꽤 받아. 와이파이 연결하고 켜줘." },
        ] },
        joinLabel: "같이 하기",
        join: {
          party: { title: "같은 서버로 접속", body: "게임 켜고 나랑 같은 서버를 골라. 캐릭터 만들면 내가 파티 초대 보낼게." },
          host:  { title: "내 월드로 들어오기", body: "Steam 친구 목록에서 내 이름 우클릭 → \"게임 참가\". 아니면 게임 안에서 \"게임 찾기\"를 열고 내 서버를 골라도 돼." },
          uid:   { title: "게임 안에서 친구 추가", body: "내 UID는 카톡으로 보내줄게. 친구 추가하면 내가 초대 보낼게. PC든 폰이든 같이 할 수 있어." },
        },
      },
    },
    en: {
      title: "Games to play\nwith you", titleNamed: "Games to play\nwith {name}",
      lede: "Pick one, and that's our next date.",
      platformPc: "PC", platformMobile: "Phone", requestedTag: "Requested", close: "Close",
      tabAbout: "What is it?", tabStart: "Get started",
      systemsTitle: "What makes it fun", sysTogether: "Together", sysGoal: "Our goal", enlarge: "View larger",
      trailerTitle: "Watch the trailer", play: "Play",
      noteLabel: "A word from me", goStart: "Get started",
      requestTitle: "Ask me to play this", requestSub: "Pick a mood and it goes straight to my inbox.",
      send: "Send", sending: "Sending…",
      sentTitle: "Got it!",
      sentGift: "Steam gift incoming. Just accept it when the notification pops up.",
      sentFree: "Noted. Install it and let me know.",
      sendAgain: "Ask again",
      error: "Couldn't send. Tap it once more.",
      gift: "🎁 I'll send it as a Steam gift. You just accept it.",
      free: "It's free. Just install it.",
      giftedTitle: "Gift sent!", giftedBody: "Hit \"Accept Gift\" in your Steam notifications and it lands in your library.",
      playingTitle: "We're playing this!", playingBody: "Already in progress.",
      finishedTitle: "Finished!", finishedBody: "One we beat together. Pick the next one.",
      updated: "Updated",
      passion: ["Mildly curious", "Worth a try", "Pretty keen", "Really want to", "Please play with me"],
      status: { wishlist: "Wishlist", gifted: "Gift sent", playing: "Playing", finished: "Finished!" },
      tutorial: {
        gift: { label: "Accept the Steam gift", steps: [
          { title: "Accept the gift", body: "When I send it, a green notification shows up at the top of Steam (and in your email). Open it and hit Accept Gift; it goes straight into your library." },
          { title: "Install it", body: "In your Library, pick {name} → Install. Ping me when it's done." },
        ] },
        freePc: { label: "On PC", steps: [
          { title: "Search on Steam", body: "Search \"{name}\" in the Steam store → hit Play Game (free). It's added to your library and starts installing. It's on the Epic Games Store too." },
        ] },
        freeMobile: { label: "On your phone", steps: [
          { title: "Install from the store", body: "iPhone: App Store. Android: Google Play. Search \"{name}\" → Install." },
          { title: "First launch on Wi-Fi", body: "The first launch downloads a lot of extra data, so do it on Wi-Fi." },
        ] },
        joinLabel: "Play together",
        join: {
          party: { title: "Join the same server", body: "Launch the game and pick the same server as me. Once your character's made, I'll send a party invite." },
          host:  { title: "Join my world", body: "Right-click my name in your Steam friends list → Join Game. Or open Browse Games in-game and pick my server." },
          uid:   { title: "Add me in-game", body: "I'll text you my UID. Add me and I'll send an invite. PC or phone, we can play together." },
        },
      },
    },
  },
};
