/* =============================================================================
 *  SITE CONFIG  —  edit this file to update your personal page
 * =============================================================================
 *  This is the ONLY file you normally need to touch. Everything on the page is
 *  generated from the object below. No build step: just edit, save, and push.
 *
 *  Formatting tips for text fields:
 *    • Plain text is fine. You may also use a few inline HTML tags:
 *        <em>italic</em>   <strong>bold</strong>   <a href="...">link</a>
 *    • Wrap a phrase in  <span class="topic">…</span>  to give it the subtle
 *      accent-colored underline used for research topics in the bio.
 *    • In publication authors, your own name (the `me` value below) is
 *      automatically underlined — just type it normally.
 * ========================================================================== */

window.SITE_CONFIG = {
  /* ---- Identity ---------------------------------------------------------- */
  // Your name is shown as "<first> <last>", with the last name in accent italic.
  firstName: "Zhihao",
  lastName: "Wu",
  me: "Zhihao Wu",                       // used to auto-underline you in author lists
  role: "PhD Student in Natural Language Processing",
  affiliation: "King's College London", // shown in the small top-left wordmark
  lastUpdated: "June 2026",             // shown in the footer

  /* ---- Theme ------------------------------------------------------------- */
  // Default theme on first visit ("light" or "dark"). Visitor's choice is
  // remembered in their browser afterwards.
  defaultTheme: "light",
  // Accent color per theme. Light options: #8a5a2b sienna, #8a2a2a oxblood,
  // #1f3a6b ink, #3a6b3e forest, #3a3a3a graphite.
  // Dark options: #c9a86a gold, #d68a6a coral, #8aa8d8 sky, #9ab99a sage.
  accentLight: "#8a5a2b",
  accentDark: "#c9a86a",

  /* ---- Portrait & sidebar ------------------------------------------------ */
  showPhoto: true,
  photo: "assets/img/prof_pic_my.jpg",
  photoAlt: "Zhihao Wu",

  // Postal / affiliation lines under the portrait.
  address: [
    "Dept. of Informatics",
    "King's College London",
    "Strand, London WC2R 2LS",
  ],
  // Email shown in the sidebar and Contact section. The "[at]" is rendered
  // automatically so scrapers see a broken address; the link still works.
  email: "zhihao.2.wu@kcl.ac.uk",

  // Sidebar links. Set href to "#" (or remove the entry) for anything you
  // don't have yet. The Email link is added automatically from `email` above.
  links: [
    { label: "CV",             href: "#" },
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=pekr_OoAAAAJ" },
    { label: "GitHub",         href: "https://github.com/Kunhao18" },
    { label: "LinkedIn",       href: "https://www.linkedin.com/in/zhihao-austin-wu" },
    { label: "Blog",           href: "http://blog.kunhao.site" },
  ],

  /* ---- Bio / About ------------------------------------------------------- */
  // Each string is one paragraph. Use <span class="topic">…</span> for the
  // accent underline, and <em>…</em> for institution names.
  bio: [
    `I'm a PhD student in the NLP group at <em>King's College London</em>, supervised by
     Prof. Yulan He. My work focuses on building
     <span class="topic">LLM-based systems that assist education</span> — with an eye toward
     <span class="topic">interactivity</span>, <span class="topic">interpretability</span>, and
     <span class="topic">faithful reasoning</span>.`,

    `Previously, I received my <em>MSc</em> in Speech and Language Processing from the
     University of Edinburgh, and my <em>BSc</em> in Computer Science and Intelligence
     Science from the Beijing University of Posts and Telecommunications. My broader
     interests sit at the intersection of <span class="topic">human–computer interaction</span>
     and <span class="topic">cognition-inspired AI</span>.`,
  ],

  /* ---- News -------------------------------------------------------------- */
  // Most recent first. `date` is shown in mono on the left; `text` may use HTML.
  news: [
    { date: "May 2026", text: `<strong>WASH</strong> accepted by <em>ICML 2026</em> 🎉 <a href="https://arxiv.org/abs/2605.30501">[paper]</a>` },
    { date: "Oct 2025", text: `Started my PhD at <em>King's College London</em>, supervised by Prof. Yulan He.` },
    { date: "Jan 2025", text: `<strong>SPA-Bench</strong> accepted as a Spotlight by <em>ICLR 2025</em> 🎉 <a href="https://arxiv.org/abs/2410.15164">[paper]</a>` },
    { date: "Jan 2025", text: `<strong>DistRL</strong> accepted by <em>ICLR 2025</em> 🎉 <a href="https://arxiv.org/abs/2410.14803">[paper]</a>` },
    { date: "Oct 2024", text: `Joined <em>Huawei Noah's Ark Lab</em> as a research engineer, working on LLM-based GUI agentic systems.` },
  ],

  /* ---- Publications ------------------------------------------------------ */
  // Grouped by year (most recent first). In `authors`, your name is underlined
  // automatically; use <em>et al.</em> as needed. `links` is a list of
  // [label, url] pairs.
  publications: [
    {
      year: "2026",
      items: [
        {
          venue: "ICML 2026",
          title: "Linear Ensembles Wash Away Watermarks: On the Fragility of Distributional Perturbations in LLMs",
          authors: "Zhihao Wu*, Gracia Gong*, Qinglin Zhu, Yudong Chen, Runcong Zhao",
          where: "The International Conference on Machine Learning",
          links: [["paper", "https://arxiv.org/abs/2605.30501"], ["page", "https://kunhao.site/WASH/"]],
        },
      ],
    },
    {
      year: "2025",
      items: [
        {
          venue: "ICLR 2025",
          title: "DistRL: An Asynchronous Distributed Reinforcement Learning Framework for On-Device Control Agent",
          authors: "Taiyi Wang*, Zhihao Wu*, Jianheng Liu, Jianye Hao, Jun Wang, Kun Shao",
          where: "The International Conference on Learning Representations",
          links: [["paper", "https://arxiv.org/abs/2410.14803"]],
        },
        {
          venue: "ICLR 2025 · Spotlight",
          title: "SPA-Bench: A Comprehensive Benchmark for SmartPhone Agent Evaluation",
          authors: "Jingxuan Chen*, Derek Yuen*, Bin Xie, Yuhao Yang, Gongwei Chen, Zhihao Wu, <em>et al.</em>",
          where: "The International Conference on Learning Representations",
          links: [["paper", "https://arxiv.org/abs/2410.15164"]],
        },
      ],
    },
    {
      year: "2023",
      items: [
        {
          venue: "arXiv",
          title: "Pangu-Agent: A Fine-Tunable Generalist Agent with Structured Reasoning",
          authors: "Filippos Christianos, Georgios Papoudakis, Matthieu Zimmer, Thomas Coste, Zhihao Wu, <em>et al.</em>",
          where: "arXiv:2312.14878",
          links: [["paper", "https://arxiv.org/abs/2312.14878"]],
        },
      ],
    }
  ],

  /* ---- Experience -------------------------------------------------------- */
  // `note` is optional.
  experience: [
    { when: "2025 — now",  role: "PhD Student, Computer Science",                   where: "King's College London",                      note: "Advised by Prof. Yulan He." },
    { when: "2024 — 2025", role: "Research Engineer",                               where: "Huawei Noah's Ark Lab",                      note: "LLM-based agentic systems on GUI." },
    { when: "2023 — 2024", role: "MSc, Speech and Language Processing",             where: "University of Edinburgh",                    note: "Dissertation on cognition-inspired narrative structure extraction with LLMs." },
    { when: "2019 — 2023", role: "BSc, Computer Science and Intelligence Science",  where: "Beijing Univ. of Posts and Telecommunications" },
  ],

  /* ---- Contact ----------------------------------------------------------- */
  contactText:
    `Please feel free to reach out — I'm happy to chat about LLMs in education,
     cognitive-science-adjacent evaluations, and collaborations with anyone working on
     interactive or interpretable systems.`,
};
