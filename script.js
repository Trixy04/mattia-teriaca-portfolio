/* ======================================================
   MATTIA TERIACA — PORTFOLIO 2025 (Ristrutturato)
   ====================================================== */

/* ======= Navbar attiva durante lo scroll ======= */
const sections = ['about','exp','projects','skills','education','contact'];
const nav = document.getElementById('nav');
const links = document.querySelectorAll('.nav__links a');

function onScroll() {
  const y = window.scrollY + (nav.offsetHeight || 60) + 40;
  let current = null;
  sections.forEach(id => {
    const s = document.getElementById(id);
    if (s && s.offsetTop <= y) current = id;
  });
  links.forEach(a =>
    a.classList.toggle('active', a.getAttribute('href') === '#' + current)
  );
}
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ======= Navbar mobile toggle ======= */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // Chiudi il menu dopo il click su un link
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('show'))
  );
}

/* ======= Reveal animazioni ======= */
const io = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('is-visible');
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ======= Typewriter effetto fluido ======= */
const roles = [
  'Software & IT Specialist',
  'Healthcare IT · Automazione',
  'Sicurezza · Networking',
  'Problem Solver'
];
const el = document.getElementById('typewrite');
let idx = 0, ch = 0, back = false, pause = 0, last = 0;

function tick(ts) {
  if (!last || ts - last > (back ? 45 : 60)) {
    const word = roles[idx];
    if (!back) {
      ch++;
      el.textContent = word.slice(0, ch);
      if (ch === word.length) {
        back = true;
        pause = 25;
      }
    } else {
      if (pause > 0) pause--;
      else {
        ch--;
        el.textContent = word.slice(0, ch);
        if (ch === 0) {
          back = false;
          idx = (idx + 1) % roles.length;
        }
      }
    }
    last = ts;
  }
  requestAnimationFrame(tick);
}
if (el) requestAnimationFrame(tick);

/* ======= Anno automatico nel footer ======= */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
