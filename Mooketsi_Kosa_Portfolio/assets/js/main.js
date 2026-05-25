// ── AOS Init ────────────────────────────────────
AOS.init({ duration: 650, easing: 'ease-out-quad', once: true, offset: 50 });

// ── Navbar scroll ───────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  document.getElementById('scroll-top').classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

// ── Active nav link ─────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => sectionObserver.observe(s));

// ── Mobile hamburger ────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}));

// ── Typed role ──────────────────────────────────
const roles = ['Data Engineer', 'Software Developer', 'Backend Developer', 'Final-Year CS Student'];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed-role');
function typeRole() {
  const current = roles[roleIndex];
  if (deleting) {
    typedEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeRole, 400); return; }
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) { deleting = true; setTimeout(typeRole, 1800); return; }
  }
  setTimeout(typeRole, deleting ? 48 : 85);
}
typeRole();

// ── Animated counters ───────────────────────────
function animateCount(el, target) {
  let count = 0;
  const step = Math.max(1, Math.ceil(target / 40));
  const iv = setInterval(() => {
    count = Math.min(count + step, target);
    el.innerHTML = count + '<span>+</span>';
    if (count >= target) clearInterval(iv);
  }, 38);
}
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCount(e.target, parseInt(e.target.dataset.count));
      countObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

// ── Skill bars ──────────────────────────────────
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width + '%';
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-bar-fill').forEach(b => barObs.observe(b));

// ── Project filter ──────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const cats = card.dataset.category || '';
      card.classList.toggle('hidden', filter !== 'all' && !cats.includes(filter));
    });
  });
});

// ── Contact form ────────────────────────────────
function sendEmail() {
  const name     = document.getElementById('name').value.trim();
  const email    = document.getElementById('email').value.trim();
  const subject  = document.getElementById('subject').value.trim();
  const message  = document.getElementById('message').value.trim();
  const feedback = document.getElementById('form-feedback');
  if (!name || !email || !subject || !message) {
    feedback.textContent = 'Please fill in all fields before sending.';
    feedback.className = 'form-feedback error';
    return;
  }
  const body = `Hi Mooketsi,%0A%0AName: ${encodeURIComponent(name)} (${encodeURIComponent(email)})%0A%0A${encodeURIComponent(message)}`;
  window.location.href = `mailto:Kosamooketsi@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  feedback.textContent = 'Opening your email client…';
  feedback.className = 'form-feedback';
}

// ── CV Links — update these two URLs with your actual links ─
const CV_LINKS = {
  software: 'assets\Cvs\Mooketsi_s_Resume_Software Engineering.pdf',  // e.g. https://drive.google.com/file/d/XXXX/view
  data:     'assets\Cvs\Mooketsi_s_Resume_Data Engineering.pdf'     // e.g. https://drive.google.com/file/d/YYYY/view
};

// Inject links into all CV buttons
function initCvLinks() {
  ['sw-cv-link-header','sw-cv-link-card'].forEach(id => {
    const el = document.getElementById(id);
    if (el && CV_LINKS.software !== 'YOUR_SOFTWARE_DEVELOPER_CV_LINK_HERE') el.href = CV_LINKS.software;
  });
  ['de-cv-link-header','de-cv-link-card'].forEach(id => {
    const el = document.getElementById(id);
    if (el && CV_LINKS.data !== 'YOUR_DATA_ENGINEERING_CV_LINK_HERE') el.href = CV_LINKS.data;
  });
}
initCvLinks();

// ── CV Dropdown toggle ───────────────────────────
function toggleCvDropdown(id) {
  const dropdown = document.getElementById(id);
  const isOpen = dropdown.classList.contains('open');
  // close all dropdowns first
  document.querySelectorAll('.cv-dropdown.open').forEach(d => d.classList.remove('open'));
  if (!isOpen) dropdown.classList.add('open');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.cv-dropdown')) {
    document.querySelectorAll('.cv-dropdown.open').forEach(d => d.classList.remove('open'));
  }
});

// ── Particle Canvas ─────────────────────────────
(function() {
  const canvas  = document.getElementById('particles-canvas');
  const ctx     = canvas.getContext('2d');
  let W, H, particles;

  const NUM = 55;
  const COLORS = ['rgba(37,99,235,', 'rgba(99,102,241,', 'rgba(14,165,233,'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.reset = function() {
      this.x    = Math.random() * W;
      this.y    = Math.random() * H;
      this.r    = Math.random() * 2.2 + 0.6;
      this.vx   = (Math.random() - 0.5) * 0.35;
      this.vy   = (Math.random() - 0.5) * 0.35;
      this.col  = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha= Math.random() * 0.4 + 0.15;
    };
    this.reset();
    this.y = Math.random() * H; // spread initial Y
  }

  function init() {
    resize();
    particles = Array.from({ length: NUM }, () => new Particle());
  }

  function drawLine(a, b, dist, maxDist) {
    const op = (1 - dist / maxDist) * 0.15;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = `rgba(37,99,235,${op})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    const MAX_DIST = 160;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col + p.alpha + ')';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) drawLine(p, q, d, MAX_DIST);
      }
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize);
  init();
  frame();
})();