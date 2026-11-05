// semua isi website ada di sini

// warna huruf menu
const MENU_COLORS = ["fill-button-1", "fill-button-2", "fill-button-3"];

// isi menu utama, page = halaman tujuan
const MENU_OPTIONS = [
  {
    name: "PROJECT",
    page: "UTS (2).html",
    rotation: -20,
    zIndex: 1,
    offsetX: -40,
    offsetY: 25,
    fontSize: "5.15rem",
    bannerScaleX: 1.07,
    bannerScaleY: 3.35,
  },
  {
    name: "SKILLS",
    page: "UTS (3).html",
    rotation: -12,
    zIndex: 2,
    offsetX: -65,
    offsetY: 30,
    fontSize: "4.55rem",
    bannerScaleX: 0.96,
    bannerScaleY: 3.05,
  },
  {
    name: "ABOUT",
    page: "UTS (4).html",
    rotation: -4,
    zIndex: 3,
    offsetX: -80,
    offsetY: 35,
    fontSize: "4.85rem",
    bannerScaleX: 1.02,
    bannerScaleY: 3.25,
  },
  {
    name: "CONTACT",
    page: "UTS (5).html",
    rotation: 5,
    zIndex: 4,
    offsetX: -85,
    offsetY: 40,
    fontSize: "4.65rem",
    bannerScaleX: 1.04,
    bannerScaleY: 3.2,
  },
];

// daftar project
const SLINK_DATA = [
  {
    numeral: "I",
    title: "JIP CUP — LOGISTICS COMMITTEE",
    subtitle: "Supported event operations by helping coordinate equipment and logistical needs.",
    url: "#",
  },
  {
    numeral: "II",
    title: "ZOTERO CITATION MANAGEMENT SEMINAR",
    subtitle: "Helped organize an academic seminar introducing Zotero and citation management at Universitas Negeri Jakarta.",
    url: "#",
  },
  {
    numeral: "III",
    title: "INTERNSHIP — SMKN 22",
    subtitle: "Gained practical workplace experience and developed professional skills during an internship at SMK Negeri 22.",
    url: "#",
  },
  {
    numeral: "IV",
    title: "LEADERSHIP HANDOVER CEREMONY",
    subtitle: "Served on the catering committee, helping coordinate food and refreshments for the event.",
    url: "#",
  },
];

// tab skill
const SKILL_TABS = [
  { id: "frontend", code: "01", label: "WEB BASICS" },
  { id: "backend", code: "02", label: "LIBRARY SCIENCE" },
  { id: "ai", code: "03", label: "DIGITAL LIBRARY" },
  { id: "languages", code: "04", label: "INTERESTS" },
];

// isi skill, angka = level (0-100)
const SKILL_GROUPS = [
  {
    id: "frontend",
    title: "BEGINNER WEB DEVELOPMENT",
    skills: [
      ["Visual Studio Code", 35],
      ["HTML Basics", 30],
      ["CSS Basics", 28],
      ["JavaScript Basics", 18],
      ["Organizing Project Files", 35],
    ],
  },
  {
    id: "backend",
    title: "LIBRARY AND INFORMATION SCIENCE",
    skills: [
      ["Information Organization", 45],
      ["Cataloging Concepts", 40],
      ["Information Retrieval", 45],
      ["Library Reference Services", 35],
      ["Library Research", 40],
    ],
  },
  {
    id: "ai",
    title: "DIGITAL INFORMATION INTERESTS",
    skills: [
      ["Digital Libraries", 45],
      ["Institutional Repositories", 40],
      ["Digital Information Access", 42],
      ["Website for Information", 30],
    ],
  },
  {
    id: "languages",
    title: "PERSONAL INTERESTS",
    skills: [
      ["Persona Series", 95],
      ["Video Games", 90],
      ["Game UI and Visual Design", 65],
      ["Learning Web Development", 50],
    ],
  },
];

// bentuk seleksi menu
const SELECTOR_PATH = "M 24.853754, 93.31573 135.14625, 49.684266 114.14751, 97.331142 Z";
const SELECTOR_BG_PATH = "M 12.7428765,95.50088 144.25712,47.499123 116.75625,95.465764 Z";

const $ = (id) => document.getElementById(id);
const params = new URLSearchParams(window.location.search);

// key untuk sessionStorage
const TRANSITION_KEY = "p3r-transition"; // posisi animasi pindah halaman
const MUSIC_TIME_KEY = "p3r-music-time"; // posisi musik
const MUSIC_STARTED_KEY = "p3r-music-started"; // musik sudah diputar

const bgMusic = $("background-music");
const pageCover = $("page-cover");

let sfxEnabled = false; // suara aktif setelah loading
let isBusy = false; // true saat animasi jalan

function playSound(id, volume) {
  const audio = $(id);
  audio.volume = volume;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}
const playNavigationSfx = () => {
  if (sfxEnabled) playSound("sfx-navigation-el", 1);
};
const playCloseSfx = () => playSound("sfx-close-menu-el", 1);

// musik lanjut dari posisi terakhir
function setupMusic(isMenuPage) {
  const resumed = sessionStorage.getItem(MUSIC_STARTED_KEY) === "1";
  if (resumed) bgMusic.currentTime = Number(sessionStorage.getItem(MUSIC_TIME_KEY)) || 0;

  window.addEventListener("pagehide", () => {
    sessionStorage.setItem(MUSIC_TIME_KEY, String(bgMusic.currentTime));
  });

  const playMenuSound = isMenuPage && !resumed;
  const start = () => {
    bgMusic.volume = 0.55;
    bgMusic
      .play()
      .then(() => {
        sessionStorage.setItem(MUSIC_STARTED_KEY, "1");
        document.removeEventListener("pointerdown", start, true);
        document.removeEventListener("keydown", start, true);
        if (playMenuSound) playSound("sfx-menu-utama-el", 1);
      })
      .catch(() => {});
  };
  document.addEventListener("pointerdown", start, true);
  document.addEventListener("keydown", start, true);
  if (resumed) start();
}

function wavy(cx, cy, r, w1, a1, w2, a2, phase, sx, sy) {
  const n = 72;
  if (r <= 0.5) {
    return `polygon(${Array(n)
      .fill(`${cx.toFixed(1)}px ${cy.toFixed(1)}px`)
      .join(", ")})`;
  }
  const pts = [];
  for (let i = 0; i < n; i++) {
    const t = (i * 2 * Math.PI) / n;
    const k = 1 + a1 * Math.sin(w1 * t + phase) + a2 * Math.cos(w2 * t + phase * 1.6);
    pts.push(`${(cx + r * k * Math.cos(t) * sx).toFixed(1)}px ${(cy + r * k * Math.sin(t) * sy).toFixed(1)}px`);
  }
  return `polygon(${pts.join(", ")})`;
}

function coverRadius(o) {
  return Math.ceil(Math.hypot(Math.max(o.x, window.innerWidth - o.x), Math.max(o.y, window.innerHeight - o.y)) * 1.85);
}

function getCenterOf(id) {
  const r = $(id)?.getBoundingClientRect();
  if (r && r.width > 0 && r.height > 0) return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  return { x: window.innerWidth - 120, y: window.innerHeight - 55 };
}

// penutup membesar sampai menutup layar
function growCover(origin, onDone) {
  pageCover.classList.add("show");
  const R = coverRadius(origin);
  const anim = pageCover.animate(
    [
      {
        clipPath: wavy(origin.x, origin.y, 0, 7, 0.085, 14, 0.035, 0, 1.25, 1.05),
      },
      {
        clipPath: wavy(origin.x + 22, origin.y - 12, R * 0.45, 7, 0.09, 14, 0.035, 1.2, 1.25, 1.05),
        offset: 0.38,
      },
      {
        clipPath: wavy(origin.x + 10, origin.y - 5, R * 0.85, 7, 0.075, 14, 0.025, 2.2, 1.2, 1.05),
        offset: 0.7,
      },
      {
        clipPath: wavy(origin.x, origin.y, R, 7, 0.05, 14, 0.015, 3.4, 1.15, 1.02),
      },
    ],
    {
      duration: 520,
      easing: "cubic-bezier(0.2, 1, 0.35, 1)",
      fill: "forwards",
    },
  );
  anim.onfinish = onDone;
}

// penutup menyusut, halaman kelihatan
function shrinkCover(origin) {
  isBusy = true;
  pageCover.classList.add("show");
  const R = coverRadius(origin);
  const anim = pageCover.animate(
    [
      {
        clipPath: wavy(origin.x, origin.y, R, 9, 0.07, 18, 0.025, 0, 1.15, 1.25),
      },
      {
        clipPath: wavy(origin.x - 20, origin.y - 12, R * 0.8, 9, 0.08, 18, 0.03, 1, 1.15, 1.25),
        offset: 0.32,
      },
      {
        clipPath: wavy(origin.x - 28, origin.y - 18, R * 0.42, 9, 0.085, 18, 0.03, 2, 1.15, 1.25),
        offset: 0.65,
      },
      {
        clipPath: wavy(origin.x, origin.y, 0, 9, 0.08, 18, 0.025, 3, 1.15, 1.25),
      },
    ],
    {
      duration: 480,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      fill: "forwards",
    },
  );
  anim.onfinish = () => {
    pageCover.classList.remove("show");
    document.documentElement.classList.remove("is-incoming");
    anim.cancel();
    isBusy = false;
  };
}

// tutup layar lalu pindah halaman
function leaveTo(url, origin, playSoundFn) {
  if (isBusy) return;
  isBusy = true;
  playSoundFn();
  sessionStorage.setItem(TRANSITION_KEY, JSON.stringify(origin));
  growCover(origin, () => {
    window.location.href = url;
  });
}

// ambil posisi transisi dari halaman sebelumnya
function readIncomingOrigin() {
  const raw = sessionStorage.getItem(TRANSITION_KEY);
  sessionStorage.removeItem(TRANSITION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Esc / B / Backspace untuk kembali
function bindBackKeys(onBack) {
  document.addEventListener("keydown", (event) => {
    if (window.innerWidth < 1024 || isBusy) return;
    const key = event.key.toLowerCase();
    if (key === "escape" || key === "b" || key === "backspace") {
      event.preventDefault();
      onBack();
    }
  });
}

function goBackToMenu(buttonId, menuIndex) {
  leaveTo(`index.html?select=${menuIndex}&skip_loading=1`, getCenterOf(buttonId), playCloseSfx);
}

// setup untuk halaman selain menu
function initSubpage({ videoId, backId, menuIndex }) {
  sfxEnabled = true;
  setupMusic(false);

  const origin = readIncomingOrigin();
  if (origin) shrinkCover(origin);
  else document.documentElement.classList.remove("is-incoming");

  const video = $(videoId);
  if (video) video.play().catch(() => {});

  $(backId).addEventListener("click", () => goBackToMenu(backId, menuIndex));
  bindBackKeys(() => goBackToMenu(backId, menuIndex));
}

function init_menu() {
  const optionsList = $("options-list");
  const sideNumber = $("side-number");
  const bgVideoIntro = $("background-video-intro");
  const bgVideoLoop = $("background-video-loop");
  const loadingScreen = $("loading-screen");
  const loadingBar = $("loading-bar");
  const loadingPercent = $("loading-percent");

  let isStarted = false;
  let hasSwitchedToLoop = false;
  let initializing = false;
  let cachedOptionItems = [];

  // buka di item tertentu dari ?select=
  const initialSelect = Number(params.get("select"));
  let selectedIndex = Number.isInteger(initialSelect) && initialSelect >= 0 && initialSelect < MENU_OPTIONS.length ? initialSelect : 0;

  function renderOptions() {
    optionsList.innerHTML = "";
    cachedOptionItems = [];

    MENU_OPTIONS.forEach((opt, index) => {
      const colorClass = MENU_COLORS[(index + 2) % MENU_COLORS.length];
      const scaleX = (opt.name.length * 0.52 + 1.6) * opt.bannerScaleX;
      const transform = `translate(-60, -9) rotate(8, 0, 100) scale(${scaleX}, ${opt.bannerScaleY})`;
      const size = `font-size: ${opt.fontSize};`;

      const item = document.createElement("div");
      item.className = "option-item";
      item.id = `option-item-${index}`;
      item.innerHTML = `
      <button class="option-hitbox" aria-label="${opt.name}"></button>
      <svg width="950" height="200" xmlns="http://www.w3.org/2000/svg" class="option-svg"
        style="transform: translate(${opt.offsetX}px, ${opt.offsetY}px) rotate(${opt.rotation}deg);">
        <defs>
          <mask id="selector-mask-${index}" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="0" width="950" height="200">
            <rect width="100%" height="100%" fill="black" />
            <g transform="${transform}" transform-origin="left center">
              <path fill="white" d="${SELECTOR_PATH}" />
              <path class="pulse-anim" transform-origin="52 100" fill="white" d="${SELECTOR_BG_PATH}" />
            </g>
          </mask>
        </defs>
        <g class="selector-group" transform="${transform}" transform-origin="left center">
          <path class="fill-pink pulse-anim" transform-origin="52 100" d="${SELECTOR_BG_PATH}" />
          <path class="fill-fg" d="${SELECTOR_PATH}" />
        </g>
        <text x="150" y="122" class="option-text ${colorClass}" style="${size}">${opt.name}</text>
        <g class="masked-red-group" mask="url(#selector-mask-${index})">
          <text x="150" y="122" class="option-text fill-red" style="${size}">${opt.name}</text>
        </g>
      </svg>`;

      const hitbox = item.querySelector(".option-hitbox");
      hitbox.addEventListener("mouseenter", () => {
        if (!isBusy && selectedIndex !== index) setIndex(index);
      });
      hitbox.addEventListener("click", (e) => {
        if (isBusy) return;
        setIndex(index);
        openPage(index, e);
      });

      optionsList.appendChild(item);
      cachedOptionItems.push(item);
    });

    highlight(selectedIndex);
  }

  // tandai item terpilih
  function highlight(index) {
    selectedIndex = index;
    sideNumber.textContent = String(index + 1).padStart(2, "0");
    cachedOptionItems.forEach((item, idx) => {
      item.classList.toggle("selected", idx === index);
      item.style.zIndex = idx === index ? 15 : MENU_OPTIONS[idx].zIndex;
    });
  }

  // pilih item (dengan suara)
  function setIndex(index) {
    if (index === selectedIndex) return;
    playNavigationSfx();
    highlight(index);
  }

  // titik asal animasi
  function getOptionCenter(index, e) {
    if (e && typeof e.clientX === "number" && (e.clientX > 0 || e.clientY > 0)) {
      return { x: e.clientX, y: e.clientY };
    }
    const item = $(`option-item-${index}`);
    if (item) {
      for (const el of item.querySelectorAll(".option-text")) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      }
      const r = item.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) return { x: r.left + r.width * 0.45, y: r.top + r.height / 2 };
    }
    return { x: window.innerWidth * 0.56, y: window.innerHeight * 0.48 };
  }

  function openPage(index, event) {
    if (!isStarted || isBusy) return;
    leaveTo(MENU_OPTIONS[index].page, getOptionCenter(index, event), playNavigationSfx);
  }

  function switchToLoopVideo() {
    if (hasSwitchedToLoop) return;
    hasSwitchedToLoop = true;
    bgVideoLoop.preload = "auto";
    bgVideoLoop.play().catch(() => {});
    bgVideoIntro.classList.add("fade-out");
    setTimeout(() => {
      bgVideoIntro.pause();
      bgVideoIntro.style.display = "none";
    }, 300);
  }

  bgVideoIntro.addEventListener("ended", switchToLoopVideo);
  bgVideoIntro.addEventListener("error", switchToLoopVideo);
  bgVideoIntro.addEventListener("timeupdate", () => {
    if (bgVideoIntro.currentTime >= bgVideoIntro.duration * 0.4) bgVideoLoop.preload = "auto";
    if (bgVideoIntro.currentTime >= bgVideoIntro.duration - 0.08) switchToLoopVideo();
  });

  function enterExperience() {
    if (isStarted) return;
    isStarted = true;
    sfxEnabled = true;
    loadingScreen.classList.add("dismissed");
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 450);
    $("menu-column").classList.add("menu-entered");
    $("menu-profile-header").classList.add("menu-entered");
    bgVideoIntro.play().catch(switchToLoopVideo);
  }

  // persen ini cuma animasi, bukan progres download
  async function startLoadingSequence() {
    await Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 120))]);
    let progress = 0;
    const timer = setInterval(() => {
      progress = Math.min(100, progress + 10);
      loadingBar.style.width = progress + "%";
      loadingPercent.textContent = progress + "%";
      loadingScreen.setAttribute("aria-valuenow", progress);
      if (progress === 100) {
        clearInterval(timer);
        enterExperience();
      }
    }, 25);
  }

  document.addEventListener("keydown", (event) => {
    if (window.innerWidth < 1024 || !isStarted || isBusy) return;
    const key = event.key.toLowerCase();
    const down = key === "arrowdown" || key === "s";
    const up = key === "arrowup" || key === "w";
    const confirm = key === "enter" || key === " ";
    const step = down ? 1 : -1;

    if (down || up || confirm || key === "b") event.preventDefault();
    if (down || up) setIndex((selectedIndex + step + MENU_OPTIONS.length) % MENU_OPTIONS.length);
    else if (confirm || key === "b") openPage(selectedIndex);
    else if (key === "escape" || key === "a") playNavigationSfx();
  });

  function initialize() {
    if (window.innerWidth < 1024 || isStarted || initializing) return;
    initializing = true;

    const incoming = readIncomingOrigin();
    if (incoming || params.get("skip_loading") === "1") {
      enterExperience();
      if (incoming) shrinkCover(incoming);
      else document.documentElement.classList.remove("is-incoming");
    } else {
      startLoadingSequence();
    }
  }

  setupMusic(true);
  renderOptions();
  initialize();
  window.addEventListener("resize", initialize);
}

function init_project() {
  const cardsContainer = $("slink-cards-container");
  let selectedCard = 0;

  function renderCards() {
    cardsContainer.innerHTML = "";
    SLINK_DATA.forEach((item, idx) => {
      const card = document.createElement("button");
      card.className = `slink-card${idx === selectedCard ? " active" : ""}`;
      card.id = `slink-card-${idx}`;
      card.setAttribute("role", "tab");
      card.setAttribute("aria-selected", String(idx === selectedCard));
      card.style.setProperty("--card-idx", idx);
      card.innerHTML = `
      <div class="card-unified-row">
        <div class="card-numeral-box"><span class="card-numeral-text">${item.numeral}</span></div>
        <div class="card-main-body">
          <div class="card-title-text">${item.title}</div>
          <div class="card-subtitle-text">${item.subtitle}</div>
          <div class="card-red-accent" aria-hidden="true"></div>
        </div>
      </div>`;

      card.addEventListener("mouseenter", () => {
        if (!isBusy && selectedCard !== idx) selectCard(idx);
      });
      card.addEventListener("click", () => {
        if (isBusy) return;
        if (selectedCard !== idx) selectCard(idx);
        else confirmSelection();
      });
      cardsContainer.appendChild(card);
    });
  }

  function selectCard(index) {
    selectedCard = index;
    document.querySelectorAll(".slink-card").forEach((card, idx) => {
      card.classList.toggle("active", idx === index);
      card.setAttribute("aria-selected", String(idx === index));
    });
    playNavigationSfx();
  }

  function confirmSelection() {
    const url = SLINK_DATA[selectedCard].url;
    playNavigationSfx();
    if (url && url !== "#") setTimeout(() => (window.location.href = url), 200);
  }

  document.addEventListener("keydown", (event) => {
    if (window.innerWidth < 1024 || isBusy) return;
    const key = event.key.toLowerCase();
    const down = key === "arrowdown" || key === "s";
    const up = key === "arrowup" || key === "w";
    const confirm = key === "enter" || key === " " || key === "a";
    const step = down ? 1 : -1;
    const total = SLINK_DATA.length;

    if (down || up || confirm) event.preventDefault();
    if (down || up) selectCard((selectedCard + step + total) % total);
    else if (confirm) confirmSelection();
  });

  initSubpage({
    videoId: "slink-bg-video",
    backId: "slink-back-btn",
    menuIndex: 0,
  });
  renderCards();
  $("slink-confirm-btn").addEventListener("click", confirmSelection);
}

function init_skills() {
  const tabsNav = $("skill-tabs-nav");
  const skillsContainer = $("p3r-skills-container");

  // kategori awal dari ?tab=
  const tabParam = params.get("tab") || params.get("cat");
  let currentSkillTab = SKILL_TABS.some((tab) => tab.id === tabParam) ? tabParam : SKILL_TABS[0].id;

  function renderTabs() {
    tabsNav.innerHTML = "";
    SKILL_TABS.forEach((tab) => {
      const isActive = tab.id === currentSkillTab;
      const btn = document.createElement("button");
      btn.className = `p3r-skill-tab${isActive ? " active" : ""}`;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", String(isActive));
      btn.innerHTML = `<span class="p3r-tab-tag">${tab.code}</span><span class="p3r-tab-label">${tab.label}</span>`;
      btn.addEventListener("click", () => {
        if (currentSkillTab !== tab.id) setSkillTab(tab.id);
      });
      tabsNav.appendChild(btn);
    });
  }

  function renderStats(category) {
    const group = SKILL_GROUPS.find((g) => g.id === category);
    skillsContainer.innerHTML = "";
    if (!group) return;

    const rows = group.skills
      .map(
        ([name, level], idx) => `
    <div class="p3r-stat-row" style="animation-delay: ${idx * 0.06}s;">
      <div class="p3r-stat-name-col"><span class="p3r-stat-name">${name}</span></div>
      <div class="p3r-stat-bar-track">
        <div class="p3r-stat-bar-fill" style="width: ${level}%;"><div class="p3r-stat-bar-tip" aria-hidden="true"></div></div>
      </div>
    </div>`,
      )
      .join("");

    skillsContainer.innerHTML = `
    <div class="p3r-skill-group" id="skill-group-${group.id}">
      <div class="p3r-skill-group-header">
        <h3 class="p3r-group-title">${group.title}</h3>
        <div class="p3r-group-line"></div>
      </div>
      <div class="p3r-skill-rows-list">${rows}</div>
    </div>`;
  }

  function setSkillTab(tabId) {
    currentSkillTab = tabId;
    playNavigationSfx();
    renderTabs();
    renderStats(tabId);
  }

  function shiftSkillTab(step) {
    const n = SKILL_TABS.length;
    const i = SKILL_TABS.findIndex((tab) => tab.id === currentSkillTab);
    setSkillTab(SKILL_TABS[(i + step + n) % n].id);
  }

  initSubpage({
    videoId: "skill-bg-video",
    backId: "skill-back-btn",
    menuIndex: 1,
  });
  renderTabs();
  renderStats(currentSkillTab);

  $("skill-tab-prev-btn").addEventListener("click", () => shiftSkillTab(-1));
  $("skill-tab-next-btn").addEventListener("click", () => shiftSkillTab(1));

  document.addEventListener("keydown", (event) => {
    if (window.innerWidth < 1024 || isBusy) return;
    const key = event.key.toLowerCase();
    if (["q", "e", "arrowleft", "arrowright"].includes(key)) event.preventDefault();
    if (key === "q" || key === "arrowleft") shiftSkillTab(-1);
    if (key === "e" || key === "arrowright") shiftSkillTab(1);
  });
}

function init_about() {
  // halaman ini cuma teks, jadi setup biasa saja
  initSubpage({
    videoId: "about-bg-video",
    backId: "about-back-btn",
    menuIndex: 2,
  });
}

function init_contact() {
  const mailRows = document.querySelectorAll(".p3r-mail-row");
  let selectedRow = 0;

  function selectRow(index) {
    selectedRow = Math.max(0, Math.min(index, mailRows.length - 1));
    mailRows.forEach((row, i) => row.classList.toggle("active", i === selectedRow));
    playNavigationSfx();
  }

  mailRows.forEach((row, index) => row.addEventListener("mouseenter", () => selectRow(index)));

  document.addEventListener("keydown", (event) => {
    if (window.innerWidth < 1024 || isBusy) return;
    const key = event.key.toLowerCase();
    const down = key === "arrowdown" || key === "s";
    const up = key === "arrowup" || key === "w";
    const confirm = key === "enter" || key === " ";
    const step = down ? 1 : -1;

    if (down || up || confirm) event.preventDefault();
    if (down || up) selectRow((selectedRow + step + mailRows.length) % mailRows.length);
    else if (confirm) mailRows[selectedRow].click();
  });

  initSubpage({
    videoId: "contact-bg-video",
    backId: "contact-back-btn",
    menuIndex: 3,
  });
}

switch (document.body.dataset.page) {
  case "menu":
    init_menu();
    break;
  case "project":
    init_project();
    break;
  case "skills":
    init_skills();
    break;
  case "about":
    init_about();
    break;
  case "contact":
    init_contact();
    break;
}
