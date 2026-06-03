/* =============================================================================
 *  render.js  —  builds the page from window.SITE_CONFIG
 * =============================================================================
 *  You normally don't need to edit this file. To change content, edit
 *  config.js. To change colors / spacing / layout, edit the <style> block in
 *  index.html. This file just wires the data into the markup.
 * ========================================================================== */
(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};

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
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  // Underline every occurrence of the author's own name in a byline.
  function highlightMe(authorsHtml) {
    if (!cfg.me) return authorsHtml;
    var safe = cfg.me.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return authorsHtml.replace(new RegExp(safe, "g"), "<u>" + cfg.me + "</u>");
  }

  // Render an email as "user[at]domain" while keeping the mailto link working.
  function emailObfuscated(addr) {
    var at = addr.indexOf("@");
    if (at < 0) return document.createTextNode(addr);
    return el("span", { html: addr.slice(0, at) + '<span style="opacity:.5">[at]</span>' + addr.slice(at + 1) });
  }

  /* ---- icons ------------------------------------------------------------ */

  var SUN = '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="3"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.5 3.5l1.4 1.4M11.1 11.1l1.4 1.4M3.5 12.5l1.4-1.4M11.1 4.9l1.4-1.4"/></svg>';
  var MOON = '<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M12.5 10.2A5 5 0 0 1 5.8 3.5 5 5 0 1 0 12.5 10.2z"/></svg>';

  /* ---- theme ------------------------------------------------------------ */

  function applyAccent(theme) {
    var accent = theme === "dark" ? cfg.accentDark : cfg.accentLight;
    if (accent) document.documentElement.style.setProperty("--accent", accent);
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    applyAccent(theme);
    try { localStorage.setItem("theme", theme); } catch (e) {}
    var btn = document.getElementById("theme-toggle");
    if (btn) btn.innerHTML = theme === "dark" ? SUN : MOON;
  }

  function initialTheme() {
    try {
      var saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {}
    return cfg.defaultTheme === "dark" ? "dark" : "light";
  }

  /* ---- sections --------------------------------------------------------- */

  function sectionHeader(title, id) {
    return el("section", { class: "block", id: id }, [el("h2", { html: title })]);
  }

  function buildTopbar(theme) {
    var nav = el("nav", { class: "site-nav" }, [
      el("a", { href: "#about", html: "About" }),
      el("a", { href: "#news", html: "News" }),
      el("a", { href: "#publications", html: "Publications" }),
      el("a", { href: "#experience", html: "Experience" }),
      el("a", { href: "#contact", html: "Contact" }),
    ]);

    var toggle = el("button", {
      class: "theme-toggle", id: "theme-toggle",
      "aria-label": "Toggle light / dark theme", title: "Toggle theme",
      html: theme === "dark" ? SUN : MOON,
    });
    toggle.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(next);
    });

    return el("div", { class: "topbar" }, [
      el("div", { class: "wordmark" }, [
        el("span", { class: "dot" }),
        el("span", { html: (cfg.me || "") + (cfg.affiliation ? " · " + cfg.affiliation : "") }),
      ]),
      el("div", { class: "topbar-right" }, [nav, toggle]),
    ]);
  }

  function buildAside() {
    var children = [];

    if (cfg.photo) {
      children.push(el("img", { class: "site-portrait", src: cfg.photo, alt: cfg.photoAlt || cfg.me || "" }));
    }

    var addr = el("div", { class: "aside-address" }, (cfg.address || []).map(function (line) {
      return el("div", { html: line });
    }));
    if (cfg.email) {
      addr.appendChild(el("div", { class: "email" }, [emailObfuscated(cfg.email)]));
    }
    children.push(addr);

    var links = (cfg.links || []).slice();
    if (cfg.email) links.push({ label: "Email", href: "mailto:" + cfg.email });
    var linkWrap = el("div", { class: "aside-links" }, links
      .filter(function (l) { return l && l.href && l.href !== "#"; })
      .map(function (l) {
        return el("a", { href: l.href, html: "→ " + l.label });
      }));
    children.push(linkWrap);

    return el("aside", { class: "site-aside" }, children);
  }

  function buildHeader() {
    var header = el("header", { class: "block", id: "about", style: "border:0;margin-top:0;padding-top:0" }, [
      el("h1", { class: "name", html: (cfg.firstName || "") + ' <span class="last">' + (cfg.lastName || "") + "</span>" }),
      el("div", { class: "role" }, [el("span", { class: "tick" }), el("span", { html: cfg.role || "" })]),
      el("div", { class: "bio" }, (cfg.bio || []).map(function (p) { return el("p", { html: p }); })),
    ]);
    return header;
  }

  function buildNews() {
    var sec = sectionHeader("News", "news");
    (cfg.news || []).forEach(function (n) {
      sec.appendChild(el("div", { class: "news-row" }, [
        el("div", { class: "date", html: n.date }),
        el("div", { class: "text", html: n.text }),
      ]));
    });
    return sec;
  }

  function buildPublications() {
    var sec = sectionHeader("Selected Publications", "publications");
    (cfg.publications || []).forEach(function (group) {
      var pubs = el("div", { class: "pubs" }, (group.items || []).map(function (p) {
        var links = el("div", { class: "links" }, (p.links || []).map(function (pair) {
          return el("a", { href: pair[1], html: pair[0] });
        }));
        return el("div", { class: "pub" }, [
          el("div", { class: "venue", html: p.venue }),
          el("div", { class: "title", html: p.title }),
          el("div", { class: "authors", html: highlightMe(p.authors) }),
          el("div", { class: "where", html: p.where }),
          links,
        ]);
      }));
      sec.appendChild(el("div", { class: "year-block" }, [
        el("div", { class: "year", html: group.year }),
        pubs,
      ]));
    });
    return sec;
  }

  function buildExperience() {
    var sec = sectionHeader("Experience", "experience");
    (cfg.experience || []).forEach(function (e) {
      var roleLine = el("div", { class: "role-line", html: e.role + ' · <span class="where">' + e.where + "</span>" });
      var right = [roleLine];
      if (e.note) right.push(el("div", { class: "note", html: e.note }));
      sec.appendChild(el("div", { class: "exp-row" }, [
        el("div", { class: "when", html: e.when }),
        el("div", {}, right),
      ]));
    });
    return sec;
  }

  function buildContact() {
    var sec = sectionHeader("Contact", "contact");
    sec.appendChild(el("div", { class: "contact-text", html: cfg.contactText || "" }));
    if (cfg.email) {
      var link = el("a", { href: "mailto:" + cfg.email, style: "color:inherit;text-decoration:none" }, [emailObfuscated(cfg.email)]);
      sec.appendChild(el("div", { class: "contact-email" }, [link]));
    }
    return sec;
  }

  function buildFooter() {
    var year = new Date().getFullYear();
    return el("footer", { class: "site-footer" }, [
      el("span", { html: "© " + year + " " + (cfg.me || "") }),
      cfg.lastUpdated ? el("span", { class: "updated", html: "Last updated · " + cfg.lastUpdated }) : null,
    ]);
  }

  /* ---- mount ------------------------------------------------------------ */

  function render() {
    var theme = initialTheme();
    document.documentElement.setAttribute("data-theme", theme);
    applyAccent(theme);

    var root = document.getElementById("root");
    if (!cfg.showPhoto) root.parentElement.classList.add("no-photo");

    var main = el("main", {}, [
      buildHeader(),
      buildNews(),
      buildPublications(),
      buildExperience(),
      buildContact(),
      buildFooter(),
    ]);

    var grid = el("div", { class: "site-main-grid" }, [
      cfg.showPhoto ? buildAside() : null,
      main,
    ]);

    root.appendChild(buildTopbar(theme));
    root.appendChild(grid);

    // Open external links in a new tab; leave in-page anchors (#…) and
    // mailto: links alone so they behave normally.
    root.querySelectorAll("a[href]").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (href.charAt(0) === "#" || href.indexOf("mailto:") === 0) return;
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });
  }

  render();
})();
