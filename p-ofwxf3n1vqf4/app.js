/* =============================================================================
 *  app.js  —  builds the games page from window.GAMES_CONFIG
 * =============================================================================
 *  You normally don't need to edit this file. To change content, edit
 *  games.js. To change colors / spacing / layout, edit the <style> block in
 *  index.html. This file wires the data into the markup, runs the pop-up,
 *  the language toggle, the #hash links and the "ask me to play" button.
 * ========================================================================== */
(function () {
  "use strict";

  var cfg = window.GAMES_CONFIG || {};
  var S = cfg.settings || {};
  var GAMES = cfg.games || [];
  var MOODS = cfg.moods || [];
  var STR = cfg.strings || {};
  var STATUS_CLASS = { wishlist: "tag-accent", gifted: "tag-accent-2", playing: "tag-accent-2", finished: "tag-neutral" };

  /* ---- small helpers ---------------------------------------------------- */

  // Create an element with attributes / inner HTML / child nodes.
  function el(tag, opts, children) {
    var node = document.createElement(tag);
    opts = opts || {};
    Object.keys(opts).forEach(function (k) {
      if (k === "class") node.className = opts[k];
      else if (k === "html") node.innerHTML = opts[k];
      else node.setAttribute(k, opts[k]);
    });
    (children || []).forEach(function (c) {
      if (c == null || c === false) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }
  function fmt(str, vars) {
    return String(str == null ? "" : str).replace(/\{(\w+)\}/g, function (m, k) { return k in vars ? vars[k] : m; });
  }
  function findById(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  // Korean particle after a name: 랑 after a vowel, 이랑 after a final consonant.
  function rangFor(name) {
    var c = name.charCodeAt(name.length - 1);
    if (c >= 0xac00 && c <= 0xd7a3) return (c - 0xac00) % 28 ? "이랑" : "랑";
    return "랑";
  }

  /* ---- icons (Lucide, stroke 2.75 per the design system) ---------------- */

  function svg(path, size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + "</svg>";
  }
  var IC = {
    monitor: svg('<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>', 12),
    phone: svg('<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>', 12),
    x: svg('<path d="M18 6 6 18M6 6l12 12"/>', 18),
    send: svg('<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>', 16),
    heart: svg('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>', 18),
    heartOn: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    heartOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    ext: svg('<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>', 14),
    copy: svg('<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>', 14),
    play: '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>',
  };

  /* ---- state & language ------------------------------------------------- */

  var state = {
    lang: load("gw-lang", null) || S.defaultLang || "ko",
    openId: null,          // id of the game in the pop-up
    tab: "about",          // "about" | "howto"
    sys: 0,                // selected "what's fun" tab inside the pop-up
    mood: null,            // selected mood id in the request bar
    sending: false,
    error: false,
    requested: load("gw-requested", {}),   // { gameId: moodId } in this browser
    canGoBack: false,      // did a click inside this page push the #hash?
  };

  function L() { return state.lang === "en" ? "en" : "ko"; }
  function t() { return STR[L()] || STR.ko || {}; }
  // Localized value ({ko, en}) or a plain string.
  function tx(v) {
    if (v && typeof v === "object") { var l = L(); return v[l] != null ? v[l] : (v.ko != null ? v.ko : v.en); }
    return v == null ? "" : String(v);
  }

  function sortedGames() {
    return GAMES.map(function (g, i) { return { g: g, i: i }; })
      .sort(function (a, b) { return (b.g.passion - a.g.passion) || (a.i - b.i); })
      .map(function (x) { return x.g; });
  }

  /* ---- tutorial steps (How to get it) ----------------------------------- */

  function tutorial(g) {
    var T = t().tutorial || {};
    var code = (S.steamFriendCode || "").trim();
    var vars = {
      name: tx(g.name),
      code: code,
      friend: code ? fmt(T.friendWithCode, { code: code }) : (T.friendNoCode || ""),
    };
    function sec(block) {
      return { label: block.label, steps: (block.steps || []).map(function (s) {
        return {
          title: fmt(s.title, vars),
          body: fmt(s.body, vars),
          copy: code && /\{friend\}|\{code\}/.test(s.body || "") ? code : "",   // show a copy button here
        };
      }) };
    }
    var out = [];
    if (g.delivery === "gift") { if (T.gift) out.push(sec(T.gift)); }
    else {
      if (g.pc && T.freePc) out.push(sec(T.freePc));
      if (g.mobile && T.freeMobile) out.push(sec(T.freeMobile));
    }
    var join = (T.join || {})[g.join];
    if (join) out.push(sec({ label: T.joinLabel, steps: [join] }));
    return out;
  }

  /* ---- shared pieces ---------------------------------------------------- */

  function passionLabel(p) { return (t().passion || [])[p - 1] || ""; }

  function hearts(passion, size) {
    var m = el("div", { class: "hearts" + (size ? " " + size : ""), role: "img", "aria-label": passion + "/5 · " + passionLabel(passion) });
    for (var i = 1; i <= 5; i++) m.appendChild(el("span", { class: i <= passion ? "on" : "off", html: i <= passion ? IC.heartOn : IC.heartOff }));
    return m;
  }

  function tagList(g, withIcons) {
    var tt = t(), out = [];
    if (g.status && g.status !== "wishlist") out.push(el("span", { class: "tag " + (STATUS_CLASS[g.status] || "tag-neutral") }, [(tt.status || {})[g.status] || g.status]));
    if (g.pc) out.push(el("span", { class: "tag tag-neutral", html: withIcons ? IC.monitor : "" }, ["PC"]));
    if (g.mobile) out.push(el("span", { class: "tag tag-neutral", html: withIcons ? IC.phone : "" }, [tt.mobile]));
    if (g.status === "wishlist" && state.requested[g.id]) out.push(el("span", { class: "tag tag-accent-2" }, ["✓ " + tt.requestedTag]));
    return el("div", { class: "tags" }, out);
  }

  /* ---- page ------------------------------------------------------------- */

  function buildLangSeg() {
    function opt(code, label) {
      var input = el("input", { type: "radio", name: "lang", value: code });
      input.checked = L() === code;
      input.addEventListener("change", function () { setLang(code); });
      return el("label", { class: "seg-opt" }, [input, label]);
    }
    return el("div", { class: "seg lang-seg", role: "group", "aria-label": "Language" }, [opt("ko", "한국어"), opt("en", "English")]);
  }

  function buildCard(g, rank) {
    var a = el("a", { class: "game-card", href: "#" + g.id }, [
      el("div", { class: "card-cover washed" }, [g.cover ? el("img", { src: g.cover, alt: "", loading: "lazy", decoding: "async" }) : null]),
      el("div", { class: "card-main" }, [
        tagList(g, true),
        el("div", { class: "card-name" }, [tx(g.name)]),
        el("div", { class: "card-hook" }, [tx(g.hook)]),
      ]),
      el("div", { class: "card-passion" }, [hearts(g.passion), el("div", { class: "passion-label" }, [passionLabel(g.passion)])]),
    ]);
    // Clicking a card normally just changes the #hash (handled below). If the
    // hash already matches (e.g. the pop-up was closed with Esc), open directly.
    a.addEventListener("click", function (e) {
      if (location.hash === "#" + g.id) { e.preventDefault(); openGame(g.id, "about"); }
    });
    return a;
  }

  function pageTitle() {
    var tt = t(), name = (S.partnerName || "").trim();
    if (!name) return tt.title;
    return fmt(tt.titleNamed || tt.title, { name: name, rang: rangFor(name) });
  }

  function renderPage() {
    var tt = t();
    var root = document.getElementById("root");
    var title = pageTitle();

    var parts = [
      el("header", { class: "top" }, [buildLangSeg()]),
      el("section", { class: "intro" }, [
        el("h1", {}, [title]),
        el("p", { class: "lede" }, [tt.lede]),
      ]),
      el("div", { class: "list" }, sortedGames().map(function (g, i) { return buildCard(g, i + 1); })),
      S.lastUpdated ? el("footer", { class: "foot" }, [tt.updated + " · " + S.lastUpdated]) : null,
    ].filter(Boolean);
    root.replaceChildren.apply(root, parts);
    document.title = (title || document.title).replace(/\s*\n\s*/g, " ");
  }

  function setLang(l) {
    state.lang = l === "en" ? "en" : "ko";
    save("gw-lang", state.lang);
    document.documentElement.lang = state.lang;
    renderPage();
    if (dialog.open) renderModal();
  }

  /* ---- modal ------------------------------------------------------------ */

  var dialog = document.getElementById("game-dialog");
  var lightbox = document.getElementById("lightbox");

  function currentGame() { return findById(GAMES, state.openId); }

  function openGame(id, tab) {
    var g = findById(GAMES, id);
    if (!g) return;
    var same = dialog.open && state.openId === id;
    state.openId = id;
    state.tab = tab === "howto" ? "howto" : "about";
    if (!same) { state.mood = null; state.error = false; state.sending = false; state.sys = 0; }
    renderModal();
    if (!dialog.open) {
      try { dialog.showModal(); } catch (e) { dialog.setAttribute("open", ""); }
    }
    var sc = dialog.querySelector(".modal-scroll");
    if (sc) sc.scrollTop = 0;
  }

  function renderModal() {
    var g = currentGame();
    if (!g) return;
    var tt = t();

    var closeBtn = el("button", { class: "btn btn-icon modal-close", type: "button", "aria-label": tt.close, html: IC.x });
    closeBtn.addEventListener("click", function () { dialog.close(); });

    var heroSrc = g.hero || g.cover;
    var hero = el("div", { class: "modal-hero-wrap" }, [
      el("div", { class: "modal-hero washed" }, [heroSrc ? el("img", { src: heroSrc, alt: "", decoding: "async" }) : null]),
      closeBtn,
    ]);

    var head = el("div", { class: "modal-head" }, [
      tagList(g, false),
      el("h2", { id: "dlg-title" }, [tx(g.name)]),
      el("div", { class: "passion-row" }, [hearts(g.passion, "md"), el("span", { class: "passion-label" }, [passionLabel(g.passion)])]),
    ]);

    var body = el("div", { class: "modal-body" }, [head, buildTabs(), el("div", { class: "panel-host" }, [buildPanel(g)])]);
    var scroll = el("div", { class: "modal-scroll" }, [hero, body]);
    var bar = el("div", { class: "bar" }, [buildBar(g)]);
    dialog.replaceChildren(scroll, bar);
  }

  function buildTabs() {
    var tt = t();
    function opt(code, label) {
      var input = el("input", { type: "radio", name: "tab", value: code });
      input.checked = state.tab === code;
      input.addEventListener("change", function () { setTab(code); });
      return el("label", { class: "seg-opt" }, [input, label]);
    }
    return el("div", { class: "seg tabs", role: "group" }, [opt("about", tt.tabAbout), opt("howto", tt.tabHowto)]);
  }

  function setTab(tab, fromHash) {
    state.tab = tab === "howto" ? "howto" : "about";
    var g = currentGame();
    if (!g) return;
    var host = dialog.querySelector(".panel-host");
    if (host) host.replaceChildren(buildPanel(g));
    dialog.querySelectorAll('input[name="tab"]').forEach(function (i) { i.checked = i.value === state.tab; });
    var tabs = dialog.querySelector(".tabs");
    if (tabs && !fromHash) tabs.scrollIntoView({ block: "nearest" });
    if (!fromHash) history.replaceState(null, "", "#" + g.id + (state.tab === "howto" ? "/howto" : ""));
  }

  function buildPanel(g) { return state.tab === "howto" ? buildHowto(g) : buildAbout(g); }

  /* ---- About tab -------------------------------------------------------- */

  function buildFacts(g) {
    var facts = (g.facts || []).map(function (f) {
      var text = f && f.k != null ? tx(f.k) + ": " + tx(f.v) : tx(f);
      return text ? el("span", { class: "fact" }, [text]) : null;
    }).filter(Boolean);
    return facts.length ? el("div", { class: "facts" }, facts) : null;
  }

  function buildSystems(g) {
    var tt = t();
    var systems = g.systems || [];
    if (!systems.length) return null;
    if (state.sys >= systems.length) state.sys = 0;

    var chips = el("div", { class: "chips", role: "tablist" }, systems.map(function (s, i) {
      var on = i === state.sys;
      var b = el("button", { class: "chip", type: "button", role: "tab", "aria-selected": on ? "true" : "false", "aria-pressed": on ? "true" : "false" },
        [s.icon ? el("span", { class: "chip-ic", "aria-hidden": "true" }, [s.icon]) : null, tx(s.label)]);
      b.addEventListener("click", function () {
        state.sys = i;
        var host = dialog.querySelector(".sys-host");
        if (host) host.replaceChildren(buildSystemPanel(systems[i]));
        dialog.querySelectorAll(".chip").forEach(function (c, j) {
          c.setAttribute("aria-selected", j === i ? "true" : "false");
          c.setAttribute("aria-pressed", j === i ? "true" : "false");
        });
      });
      return b;
    }));

    return el("section", { class: "systems" }, [
      el("h3", { class: "sec-title" }, [tt.systemsTitle]),
      chips,
      el("div", { class: "sys-host" }, [buildSystemPanel(systems[state.sys])]),
    ]);
  }

  function buildSystemPanel(s) {
    var tt = t();
    var shot = null;
    if (s.shot) {
      shot = el("button", { class: "sys-shot washed", type: "button", "aria-label": tt.enlarge }, [
        el("img", { src: s.shot, alt: tx(s.label), loading: "lazy", decoding: "async" }),
      ]);
      shot.addEventListener("click", function () { openLightbox(s.shot, tx(s.label)); });
    }
    return el("div", { class: "sys-panel", role: "tabpanel" }, [
      shot,
      s.what ? el("p", { class: "sys-what" }, [tx(s.what)]) : null,
      s.together ? el("div", { class: "sys-line" }, [el("span", { class: "sys-k" }, ["👫 " + tt.sysTogether]), el("span", { class: "sys-v" }, [tx(s.together)])]) : null,
      s.goal ? el("div", { class: "sys-goal" }, [el("span", { class: "sys-k" }, ["🎯 " + tt.sysGoal]), el("span", { class: "sys-v" }, [tx(s.goal)])]) : null,
    ]);
  }

  // YouTube "facade": a thumbnail with a play button; the player loads on tap.
  function buildTrailer(g) {
    var tt = t();
    var id = (g.trailer || "").trim();
    if (!id) return null;
    var thumb = el("img", { src: "https://i.ytimg.com/vi/" + id + "/maxresdefault.jpg", alt: "", loading: "lazy", decoding: "async" });
    thumb.addEventListener("error", function () {
      if (thumb.src.indexOf("hqdefault") < 0) thumb.src = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
    });
    var box = el("div", { class: "trailer-box" });
    var btn = el("button", { class: "trailer-btn", type: "button", "aria-label": tt.play + ": " + tx(g.name) }, [
      thumb, el("span", { class: "play", html: IC.play }),
    ]);
    btn.addEventListener("click", function () {
      box.replaceChildren(el("iframe", {
        src: "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0&playsinline=1",
        title: tx(g.name), allow: "autoplay; encrypted-media; picture-in-picture; fullscreen", allowfullscreen: "",
        referrerpolicy: "no-referrer",
      }));
    });
    box.appendChild(btn);
    return el("section", { class: "trailer" }, [el("h3", { class: "sec-title" }, ["🎬 " + tt.trailerTitle]), box]);
  }

  function buildAbout(g) {
    var tt = t();
    var note = g.note ? el("div", { class: "note" }, [
      el("div", { class: "note-ic", html: IC.heart }),
      el("div", {}, [el("div", { class: "note-k" }, [tt.noteLabel]), el("div", { class: "note-v" }, [tx(g.note)])]),
    ]) : null;
    var links = (g.links || []).length ? el("div", { class: "links" }, g.links.map(function (l) {
      return el("a", { class: "btn btn-secondary", href: l.href, target: "_blank", rel: "noopener noreferrer" }, [tx(l.label), el("span", { html: IC.ext })]);
    })) : null;
    var go = el("button", { class: "btn btn-ghost go-howto", type: "button" }, [tt.goHowto + " →"]);
    go.addEventListener("click", function () { setTab("howto"); });
    return el("div", { class: "panel" }, [
      el("p", { class: "intro-text" }, [tx(g.intro)]),
      buildFacts(g),
      buildSystems(g),
      buildTrailer(g),
      note, links, go,
    ]);
  }

  /* ---- How-to tab ------------------------------------------------------- */

  function buildHowto(g) {
    var tt = t();
    var explain = (g.delivery === "gift" || g.pc) && tt.steamWhatTitle ? el("details", { class: "explain" }, [
      el("summary", {}, [tt.steamWhatTitle]),
      el("p", {}, [tt.steamWhatBody]),
    ]) : null;

    var sections = tutorial(g).map(function (sec) {
      return el("div", { class: "section" }, [el("h4", {}, [sec.label])].concat(sec.steps.map(function (st, i) {
        var copyBtn = null;
        if (st.copy) {
          copyBtn = el("button", { class: "btn btn-secondary copy-btn", type: "button", html: IC.copy }, [tt.copyCode]);
          copyBtn.addEventListener("click", function () {
            var done = function () { copyBtn.replaceChildren(el("span", { html: IC.copy }), tt.copied); setTimeout(function () { copyBtn.replaceChildren(el("span", { html: IC.copy }), tt.copyCode); }, 1600); };
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(st.copy).then(done, function () { window.prompt(tt.copyCode, st.copy); });
            else window.prompt(tt.copyCode, st.copy);
          });
        }
        return el("div", { class: "step" }, [
          el("div", { class: "step-n", "aria-hidden": "true" }, [String(i + 1)]),
          el("div", { class: "step-c" }, [el("div", { class: "step-t" }, [st.title]), el("div", { class: "step-b" }, [st.body]), copyBtn]),
        ]);
      })));
    });
    return el("div", { class: "panel howto" }, [
      el("div", { class: "delivery" }, [g.delivery === "gift" ? tt.gift : tt.free]),
      explain,
    ].concat(sections));
  }

  /* ---- lightbox --------------------------------------------------------- */

  function openLightbox(src, alt) {
    if (!lightbox) return;
    lightbox.replaceChildren(el("img", { src: src, alt: alt || "" }));
    try { lightbox.showModal(); } catch (e) { window.open(src, "_blank", "noopener"); }
  }
  if (lightbox) lightbox.addEventListener("click", function () { lightbox.close(); });

  /* ---- request bar ------------------------------------------------------ */

  function doneRow(emoji, title, body, btn) {
    return el("div", { class: "done" }, [
      el("div", { class: "done-ic", "aria-hidden": "true" }, [emoji]),
      el("div", { class: "done-text" }, [el("div", { class: "done-t" }, [title]), el("div", { class: "done-b" }, [body])]),
      btn,
    ]);
  }

  function buildBar(g) {
    var tt = t();

    // Owner-set status: nothing to request any more.
    if (g.status !== "wishlist") {
      var byStatus = {
        gifted: ["🎁", tt.giftedTitle, tt.giftedBody],
        playing: ["🎮", tt.playingTitle, tt.playingBody],
        finished: ["🏁", tt.finishedTitle, tt.finishedBody],
      };
      var d = byStatus[g.status] || ["✓", (tt.status || {})[g.status] || "", ""];
      return doneRow(d[0], d[1], d[2], null);
    }

    // Already requested from this browser.
    var sentMood = findById(MOODS, state.requested[g.id]);
    if (sentMood) {
      var again = el("button", { class: "btn btn-secondary", type: "button" }, [tt.sendAgain]);
      again.addEventListener("click", function () {
        var r = Object.assign({}, state.requested); delete r[g.id];
        state.requested = r; save("gw-requested", r); state.mood = null;
        renderBar(); renderPage();
      });
      return doneRow(sentMood.e, tt.sentTitle, g.delivery === "gift" ? tt.sentGift : tt.sentFree, again);
    }

    // The request form.
    var moods = MOODS.map(function (md) {
      var on = state.mood === md.id;
      var b = el("button", { class: "btn btn-secondary mood" + (on ? " on" : ""), type: "button", "aria-pressed": on ? "true" : "false" },
        [el("span", { class: "e", "aria-hidden": "true" }, [md.e]), tx(md.label)]);
      b.addEventListener("click", function () { state.mood = md.id; state.error = false; renderBar(); });
      return b;
    });
    var sendBtn = el("button", { class: "btn btn-primary send", type: "button", html: IC.send }, [state.sending ? tt.sending : tt.send]);
    sendBtn.disabled = !state.mood || state.sending;
    sendBtn.addEventListener("click", send);

    return el("div", { class: "request" }, [
      el("div", { class: "bar-head" }, [el("div", { class: "bar-title" }, [tt.requestTitle]), el("div", { class: "bar-sub" }, [tt.requestSub])]),
      el("div", { class: "moods" }, moods.concat([sendBtn])),
      state.error ? el("div", { class: "err", role: "alert" }, [tt.error]) : null,
    ]);
  }

  function renderBar() {
    var g = currentGame(), bar = dialog.querySelector(".bar");
    if (g && bar) bar.replaceChildren(buildBar(g));
  }

  function markRequested(g, mood) {
    var r = Object.assign({}, state.requested); r[g.id] = mood.id;
    state.requested = r; save("gw-requested", r);
  }

  function send() {
    var g = currentGame();
    var mood = findById(MOODS, state.mood);
    if (!g || !mood || state.sending) return;

    var nameKo = (g.name && g.name.ko) || tx(g.name);
    var nameEn = (g.name && g.name.en) || "";
    var gameName = nameEn && nameEn !== nameKo ? nameKo + " / " + nameEn : nameKo;
    var moodText = mood.e + " " + (mood.label.ko || "") + (mood.label.en ? " / " + mood.label.en : "");
    var subject = fmt(S.emailSubject || "{emoji} {game}", { emoji: mood.e, game: nameKo });
    var payload = {
      game: gameName,
      mood: moodText,
      page_language: L(),
      sent_at: new Date().toLocaleString("ko-KR"),
      _subject: subject,
    };
    var fid = (S.formspreeId || "").trim();

    // No Formspree form yet: hand it to her mail app with everything filled in.
    if (!fid) {
      var email = Array.isArray(S.ownerEmail) ? S.ownerEmail.join("@") : (S.ownerEmail || "");
      if (!email) { state.error = true; renderBar(); return; }
      var link = location.href.split("#")[0] + "#" + g.id;
      var body = "Game: " + gameName + "\nMood: " + moodText + "\nSent: " + payload.sent_at + "\n" + link;
      window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      markRequested(g, mood);
      renderBar(); renderPage();
      return;
    }

    state.sending = true; state.error = false; renderBar();
    fetch("https://formspree.io/f/" + fid, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      state.sending = false;
      markRequested(g, mood);
      renderBar(); renderPage();
    }).catch(function () {
      state.sending = false; state.error = true;
      renderBar();
    });
  }

  /* ---- #hash routing ---------------------------------------------------- */
  // #<id> opens a game, #<id>/howto opens it on the "how to get it" tab.

  function parseHashStr(h) {
    h = (h || "").replace(/^#/, "");
    if (!h) return null;
    var parts = h.split("/");
    var g = findById(GAMES, decodeURIComponent(parts[0]));
    return g ? { id: g.id, tab: parts[1] === "howto" ? "howto" : "about" } : null;
  }
  function parseHash() { return parseHashStr(location.hash); }

  function syncFromHash(fromNav) {
    var p = parseHash();
    if (p) {
      if (fromNav) state.canGoBack = true;
      if (!dialog.open || state.openId !== p.id) openGame(p.id, p.tab);
      else if (state.tab !== p.tab) setTab(p.tab, true);
    } else if (dialog.open) {
      dialog.close();
    }
  }

  window.addEventListener("hashchange", function (e) {
    var oldHash = "";
    try { oldHash = new URL(e.oldURL).hash; } catch (err) {}
    syncFromHash(!parseHashStr(oldHash));
  });

  // Closed by Esc, the × button or the backdrop: keep the URL in step.
  dialog.addEventListener("close", function () {
    state.openId = null;
    if (parseHash()) {
      if (state.canGoBack) history.back();
      else history.replaceState(null, "", location.pathname + location.search);
    }
    state.canGoBack = false;
  });
  dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });

  /* ---- mount ------------------------------------------------------------ */

  var theme = "";
  try { theme = new URLSearchParams(location.search).get("theme") || ""; } catch (e) {}
  document.documentElement.setAttribute("data-theme", theme || S.theme || "peach");
  document.documentElement.lang = L();
  renderPage();
  syncFromHash(false);
})();
