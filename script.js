/* =========================================================
   SITE_CONFIG
   Edit everything here — no need to touch the rest of the code.
   ========================================================= */
const SITE_CONFIG = {
  COLONY_NAME: "Padmavathi Nagar",              // e.g. "Green Valley Colony"
  WHATSAPP_NUMBER: "919603392455",         // country code + number, digits only, no + or spaces
  INSTAGRAM_URL: "https://www.instagram.com/padmavathi_nagar_ganesh_utsav?igsi=ZHA3Z2xmYXN2dHU3&utm_source=qr",
  GANESH_NAME: "Simha Trishul Ganesha",
  EVENT_DATE: "14 September 2026",

  // Pre-filled WhatsApp messages
  CHANDA_MESSAGE:
    "Hello Ganesh Utsav Team, I would like to contribute to the Ganesh Chaturthi celebrations. My name is ______.",
  SUGGESTION_MESSAGE: "Ganesh Chaturthi Suggestion: ",

  // Youth team — add/remove members freely
  TEAM: [
    { name: "Madhan", role: "President", image: "images/Madhan_ganesh.jpeg" },
    { name: "Sai", role: "Coordinator", image: "images/Sai_ganesh.jpeg" },
    { name: "Karthikeya", role: "Treasurer", image: "images/Karthikey_ganesh.jpeg" },
    { name: "Suresh", role: "Decoration", image: "images/Suresh_ganesh.jpeg" },
    { name: "Koushik", role: "Cultural Events", image: "images/Koushik_ganesh.jpeg" },
    { name: "Shiva Shankar", role: "Pooja", image: "images/Shankar_ganesh.jpeg" },
    { name: "Hemanth", role: "Food & Prasadam", image: "images/Hemanth_Ganesh.jpg" },
    { name: "[Member Name]", role: "Logistics", image: "images/member-8.jpg" },
  ],

  // Gallery — add/remove photos freely
  GALLERY: [
    { src: "images/memory-1.jpeg", alt: "Ganesh Chaturthi memory 1" },
    { src: "images/memory-2.jpeg", alt: "Ganesh Chaturthi memory 2" },
    { src: "images/memory-3.jpeg", alt: "Ganesh Chaturthi memory 3" },
    { src: "images/memory-4.jpeg", alt: "Ganesh Chaturthi memory 4" },
    { src: "images/memory-5.jpeg", alt: "Ganesh Chaturthi memory 5" },
    { src: "images/memory-6.jpeg", alt: "Ganesh Chaturthi memory 6" },
  ],

  // Decorative background idols — ambient, blurred photos placed behind
  // section content for texture. Use DIFFERENT idol photos/styles across
  // these five slots so the site doesn't feel like one image repeated.
  // Any slot left without a matching file in images/ just disappears —
  // nothing breaks, no empty box.
  // Suggested variety: idol-bg-1 (traditional), idol-bg-2 (eco-friendly clay),
  // idol-bg-3 (floral-themed), idol-bg-4 (modern minimal), idol-bg-5 (peacock/royal theme).

  // Programme / schedule — edit freely, keep chronological order
  PROGRAMME: [
    { title: "Ganesh Sthapana", time: "7:00 PM", desc: "[Description]" },
    { title: "Mahaprasadam", time: "8:00 PM", desc: "[Description]" },
    { title: "Immersion / Visarjan", time: "25-09-2026", desc: "[Description]" },
  ],
};

/* =========================================================
   HELPERS
   ========================================================= */
function waLink(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function applyConfig() {
  document
    .querySelectorAll('[data-config="colonyName"]')
    .forEach((el) => (el.textContent = SITE_CONFIG.COLONY_NAME));

  const brand = document.getElementById("brand-colony-name");
  if (brand) brand.textContent = SITE_CONFIG.COLONY_NAME;

  const footerName = document.getElementById("footer-colony-name");
  if (footerName) footerName.textContent = SITE_CONFIG.COLONY_NAME;

  const heroDate = document.getElementById("hero-date");
  if (heroDate) heroDate.textContent = SITE_CONFIG.EVENT_DATE;

  const aboutDate = document.getElementById("about-date");
  if (aboutDate) aboutDate.textContent = SITE_CONFIG.EVENT_DATE;

  document.title = `Ganesh Chaturthi 2026 | ${SITE_CONFIG.COLONY_NAME}`;

  const chandaLink = document.getElementById("whatsapp-chanda");
  if (chandaLink) chandaLink.href = waLink(SITE_CONFIG.WHATSAPP_NUMBER, SITE_CONFIG.CHANDA_MESSAGE);

  const suggestionLink = document.getElementById("whatsapp-suggestion");
  if (suggestionLink) suggestionLink.href = waLink(SITE_CONFIG.WHATSAPP_NUMBER, SITE_CONFIG.SUGGESTION_MESSAGE);

  const igContact = document.getElementById("instagram-contact");
  if (igContact) igContact.href = SITE_CONFIG.INSTAGRAM_URL;

  const igSuggestion = document.getElementById("instagram-suggestion");
  if (igSuggestion) igSuggestion.href = SITE_CONFIG.INSTAGRAM_URL;
}

/* =========================================================
   RENDER: TEAM
   ========================================================= */
function renderTeam() {
  const grid = document.getElementById("team-grid");
  if (!grid) return;

  grid.innerHTML = SITE_CONFIG.TEAM.map((member) => `
    <div class="team-card reveal">
      <div class="media-frame team-photo" data-placeholder-label="">
        <img src="${member.image}" alt="${member.name}" loading="lazy"
             onerror="this.closest('.team-photo').classList.add('media-frame--placeholder'); this.closest('.team-photo').innerHTML='&#128591;'" />
      </div>
      <div class="team-body">
        <div class="team-name">${member.name}</div>
        <div class="team-role">${member.role}</div>
      </div>
    </div>
  `).join("");
}

/* =========================================================
   RENDER: GALLERY
   ========================================================= */
function renderGallery() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  gallery.innerHTML = SITE_CONFIG.GALLERY.map((photo, i) => `
    <button class="gallery-item media-frame reveal" type="button"
            data-index="${i}" aria-label="Open photo: ${photo.alt}"
            data-placeholder-label="Photo coming soon">
      <img src="${photo.src}" alt="${photo.alt}" loading="lazy"
           onerror="this.closest('.gallery-item').classList.add('media-frame--placeholder')" />
      <span class="gallery-overlay"><span>${photo.alt}</span></span>
    </button>
  `).join("");

  gallery.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const idx = Number(item.dataset.index);
      const photo = SITE_CONFIG.GALLERY[idx];
      const img = item.querySelector("img");
      // Don't open the lightbox for a broken/placeholder image
      if (item.classList.contains("media-frame--placeholder")) return;
      openLightbox(img.src, photo.alt);
    });
  });
}

/* =========================================================
   RENDER: PROGRAMME / TIMELINE
   ========================================================= */
function renderProgramme() {
  const timeline = document.getElementById("timeline");
  if (!timeline) return;

  timeline.innerHTML = SITE_CONFIG.PROGRAMME.map((item) => `
    <li class="timeline-item reveal">
      <span class="timeline-time">${item.time}</span>
      <div class="timeline-title">${item.title}</div>
      <p class="timeline-desc">${item.desc}</p>
    </li>
  `).join("");
}

/* =========================================================
   DECORATIVE BACKGROUND IDOLS
   Loads each configured image; on success, inserts it (blurred via
   CSS) into its field. On failure, removes the field entirely so
   no empty/broken box is ever left behind.
   ========================================================= */
function renderBackgroundIdols() {
  document.querySelectorAll(".bg-idol-field").forEach((field) => {
    const src = field.dataset.bgIdols;
    if (!src) {
      field.remove();
      return;
    }
    const probe = new Image();
    probe.onload = () => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      field.appendChild(img);
    };
    probe.onerror = () => field.remove();
    probe.src = src;
  });
}

/* =========================================================
   LIGHTBOX
   ========================================================= */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
let lastFocusedEl = null;

function openLightbox(src, alt) {
  lastFocusedEl = document.activeElement;
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = "";
  document.body.style.overflow = "";
  if (lastFocusedEl) lastFocusedEl.focus();
}

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
});

/* =========================================================
   MOBILE MENU
   ========================================================= */
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

document.querySelectorAll('[data-nav]').forEach((link) => {
  link.addEventListener("click", () => closeMobileMenu());
});

/* =========================================================
   ACTIVE NAV HIGHLIGHT ON SCROLL
   ========================================================= */
function setupActiveNav() {
  const sections = document.querySelectorAll("main section[id], .hero[id]");
  const navLinks = document.querySelectorAll('.primary-nav a[data-nav]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* =========================================================
   REVEAL ON SCROLL
   ========================================================= */
function setupReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

function markStaticReveals() {
  document.querySelectorAll(".info-card, .split-block").forEach((el) => el.classList.add("reveal"));
}

function setupScrollProgress(){
  const bar = document.getElementById("scroll-progress");
  if(!bar) return;
  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + "%";
  };
  document.addEventListener("scroll", update, { passive: true });
  update();
}

function setupPetals(){
  const field = document.getElementById("petal-field");
  if(!field || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const symbols = ["🌸","🌼","🪷"];
  const count = window.innerWidth < 600 ? 8 : 16;
  for(let i=0;i<count;i++){
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    petal.style.left = Math.random()*100 + "vw";
    petal.style.setProperty("--drift", (Math.random()*80-40) + "px");
    petal.style.animationDuration = (10 + Math.random()*10) + "s";
    petal.style.animationDelay = (Math.random()*10) + "s";
    field.appendChild(petal);
  }
}

function setupCountdown(){
  const el = document.getElementById("countdown");
  if(!el) return;
  const target = new Date(SITE_CONFIG.EVENT_DATE);
  if(isNaN(target.getTime())){ el.style.display = "none"; return; }
  const daysEl = document.getElementById("cd-days"), hoursEl = document.getElementById("cd-hours"),
        minsEl = document.getElementById("cd-mins"), secsEl = document.getElementById("cd-secs");
  function tick(){
    const diff = target.getTime() - Date.now();
    if(diff <= 0){
      el.innerHTML = '<p class="countdown-done">Ganpati Bappa Morya! 🙏</p>';
      clearInterval(timer); return;
    }
    daysEl.textContent = String(Math.floor(diff/86400000)).padStart(2,"0");
    hoursEl.textContent = String(Math.floor((diff%86400000)/3600000)).padStart(2,"0");
    minsEl.textContent = String(Math.floor((diff%3600000)/60000)).padStart(2,"0");
    secsEl.textContent = String(Math.floor((diff%60000)/1000)).padStart(2,"0");
  }
  tick();
  const timer = setInterval(tick, 1000);
}

function setupBell(){
  const btn = document.getElementById("bell-fab");
  if(!btn) return;
  let audioCtx;
  btn.addEventListener("click", () => {
    btn.classList.remove("ringing"); void btn.offsetWidth; btn.classList.add("ringing");
    try{
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const now = audioCtx.currentTime;
      [660, 990, 1320].forEach((freq, i) => {
        const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
        osc.type = "sine"; osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.18/(i+1), now+0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now+1.4);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start(now); osc.stop(now+1.5);
      });
    }catch(e){}
  });
}

function setupDiyaWall(){
  const form = document.getElementById("diya-form"), grid = document.getElementById("diya-wall-grid"),
        input = document.getElementById("diya-name");
  if(!form || !grid) return;
  const KEY = "ganesh2026_diyas", MAX = 60;
  const load = () => { try{ return JSON.parse(localStorage.getItem(KEY)) || []; }catch(e){ return []; } };
  const save = (list) => { try{ localStorage.setItem(KEY, JSON.stringify(list)); }catch(e){} };
  const render = (list) => { grid.innerHTML = list.map(name =>
    `<div class="diya"><span class="diya-flame" aria-hidden="true">🪔</span><span class="diya-name">${name}</span></div>`
  ).join(""); };
  let diyas = load();
  render(diyas);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = input.value.trim();
    if(!name) return;
    diyas.unshift(name);
    if(diyas.length > MAX) diyas = diyas.slice(0, MAX);
    save(diyas); render(diyas);
     /* ===== Confetti ===== */
  function burstConfetti(){
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const symbols = ["🎉","🌸","✨","🪷","🎊"];
  for(let i=0;i<24;i++){
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    piece.style.left = Math.random()*100 + "vw";
    piece.style.animationDelay = (Math.random()*0.4) + "s";
    piece.style.fontSize = (0.9 + Math.random()*0.8) + "rem";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2800);
  }
}
     input.value = "";
  });
}

/* ===== Confetti ===== */
function burstConfetti(){
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const symbols = ["🎉","🌸","✨","🪷","🎊"];
  for(let i=0;i<24;i++){
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    piece.style.left = Math.random()*100 + "vw";
    piece.style.animationDelay = (Math.random()*0.4) + "s";
    piece.style.fontSize = (0.9 + Math.random()*0.8) + "rem";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2800);
  }
}

/* ===== Modak catch game ===== */
function setupModakGame(){
  const canvas = document.getElementById("modak-canvas");
  if(!canvas) return;
  const ctx = canvas.getContext("2d");
  const scoreEl = document.getElementById("modak-score");
  const timeEl = document.getElementById("modak-time");
  const startBtn = document.getElementById("modak-start");

  let basketX = canvas.width/2, score = 0, timeLeft = 30, running = false;
  let modaks = [], lastSpawn = 0, animId;

  function pointerMove(e){
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    basketX = Math.max(30, Math.min(canvas.width-30, clientX - rect.left));
  }
  canvas.addEventListener("mousemove", pointerMove);
  canvas.addEventListener("touchmove", pointerMove, { passive: true });

  function spawnModak(){
    modaks.push({ x: 20 + Math.random()*(canvas.width-40), y: -20, speed: 2 + Math.random()*2 });
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // basket
    ctx.font = "40px serif";
    ctx.fillText("🧺", basketX-20, canvas.height-20);
    // modaks
    ctx.font = "28px serif";
    modaks.forEach(m => ctx.fillText("🍡", m.x-14, m.y));
  }

  function tick(ts){
    if(!running) return;
    if(!lastSpawn || ts - lastSpawn > 700){ spawnModak(); lastSpawn = ts; }
    modaks.forEach(m => m.y += m.speed);
    modaks = modaks.filter(m => {
      if(m.y > canvas.height-40 && m.y < canvas.height-5 && Math.abs(m.x-basketX) < 34){
        score++; scoreEl.textContent = score; return false;
      }
      return m.y < canvas.height+10;
    });
    draw();
    animId = requestAnimationFrame(tick);
  }

  function endGame(){
    running = false;
    cancelAnimationFrame(animId);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = "22px sans-serif"; ctx.fillStyle = "#24150F"; ctx.textAlign = "center";
    ctx.fillText(`Time's up! You caught ${score} modaks 🍡`, canvas.width/2, canvas.height/2);
    ctx.textAlign = "left";
    startBtn.textContent = "▶ Play Again";
    startBtn.disabled = false;
    if(score >= 10) burstConfetti();
  }

  startBtn.addEventListener("click", () => {
    score = 0; timeLeft = 30; modaks = []; lastSpawn = 0;
    scoreEl.textContent = "0"; timeEl.textContent = "30";
    startBtn.disabled = true; startBtn.textContent = "Playing…";
    running = true;
    animId = requestAnimationFrame(tick);
    const countdown = setInterval(() => {
      timeLeft--; timeEl.textContent = timeLeft;
      if(timeLeft <= 0){ clearInterval(countdown); endGame(); }
    }, 1000);
  });

  draw();
}

/* ===== Ganesh Chaturthi quiz ===== */
function setupQuiz(){
  const box = document.getElementById("quiz-box");
  if(!box) return;

  const QUESTIONS = [
    { q: "What is Lord Ganesha's favourite sweet?", options: ["Modak","Jalebi","Barfi"], answer: 0 },
    { q: "Who is Ganesha's mother?", options: ["Saraswati","Parvati","Lakshmi"], answer: 1 },
    { q: "What is the final immersion of the idol called?", options: ["Aarti","Sthapana","Visarjan"], answer: 2 },
    { q: "Which animal is Ganesha's vahana (vehicle)?", options: ["Mouse","Peacock","Lion"], answer: 0 },
    { q: "What do we shout with joy during the festival?", options: ["Bappa Morya!","Jai Shri Ram!","Hare Krishna!"], answer: 0 },
  ];

  let current = 0, score = 0;

  function renderQuestion(){
    const item = QUESTIONS[current];
    box.innerHTML = `
      <p class="quiz-progress">Question ${current+1} of ${QUESTIONS.length}</p>
      <p class="quiz-question">${item.q}</p>
      <div class="quiz-options">
        ${item.options.map((opt,i) => `<button class="quiz-option" data-i="${i}">${opt}</button>`).join("")}
      </div>
    `;
    box.querySelectorAll(".quiz-option").forEach(btn => {
      btn.addEventListener("click", () => {
        const chosen = Number(btn.dataset.i);
        box.querySelectorAll(".quiz-option").forEach(b => b.disabled = true);
        if(chosen === item.answer){ btn.classList.add("correct"); score++; }
        else{
          btn.classList.add("wrong");
          box.querySelector(`[data-i="${item.answer}"]`).classList.add("correct");
        }
        setTimeout(() => {
          current++;
          if(current < QUESTIONS.length) renderQuestion();
          else renderResult();
        }, 900);
      });
    });
  }

  function renderResult(){
    box.innerHTML = `
      <div class="quiz-result">
        <h3>${score}/${QUESTIONS.length} correct! 🐘</h3>
        <p>${score === QUESTIONS.length ? "Perfect! You truly know Bappa!" : "Ganpati Bappa Morya! Try again to get a perfect score."}</p>
        <button class="btn btn-primary" id="quiz-retry">🔄 Play Again</button>
      </div>
    `;
    if(score >= 3) burstConfetti();
    document.getElementById("quiz-retry").addEventListener("click", () => {
      current = 0; score = 0; renderQuestion();
    });
  }

  renderQuestion();
}

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  renderTeam();
  renderGallery();
  renderProgramme();
  renderBackgroundIdols();
  markStaticReveals();
  setupReveal();
  setupActiveNav();
  setupScrollProgress();
  setupPetals();
  setupCountdown();
  setupBell();
  setupDiyaWall();
  setupModakGame();
  setupQuiz();
});
