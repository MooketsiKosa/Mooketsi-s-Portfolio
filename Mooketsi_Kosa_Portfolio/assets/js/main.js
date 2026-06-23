// ── AOS Init ────────────────────────────────────
AOS.init({ duration: 650, easing: 'ease-out-quad', once: true, offset: 50 });

// ── Navbar scroll ───────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  document.getElementById('scroll-top').classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

// ── Active nav link ─────────────────────────────
const sections    = document.querySelectorAll('section[id]');
const navAs       = document.querySelectorAll('.nav-links a');
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
    spans[1].style.opacity   = '0';
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
    feedback.className   = 'form-feedback error';
    return;
  }
  const body = `Hi Mooketsi,%0A%0AName: ${encodeURIComponent(name)} (${encodeURIComponent(email)})%0A%0A${encodeURIComponent(message)}`;
  window.open(`mailto:Kosamooketsi@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`, '_blank');
  feedback.textContent = 'Your mail app should now be open — just hit send!';
  feedback.className   = 'form-feedback';
}

// ── CV Links ────────────────────────────────────
const CV_LINKS = {
  software: 'https://drive.google.com/file/d/1x5PDthVA5Hfl-UgCDUpUrqAJwcQIZ-W1/view?usp=drive_link',
  data:     'https://drive.google.com/file/d/1D5TLQ81I6MUi-KRBFvJWt7YSMgXWN_-W/view?usp=drive_link'
};
function initCvLinks() {
  ['sw-cv-link-header','sw-cv-link-card'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = CV_LINKS.software;
  });
  ['de-cv-link-header','de-cv-link-card'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = CV_LINKS.data;
  });
}
initCvLinks();

// ── CV Dropdown toggle ───────────────────────────
function toggleCvDropdown(id) {
  const dropdown = document.getElementById(id);
  const isOpen   = dropdown.classList.contains('open');
  document.querySelectorAll('.cv-dropdown.open').forEach(d => d.classList.remove('open'));
  if (!isOpen) dropdown.classList.add('open');
}
document.addEventListener('click', (e) => {
  if (!e.target.closest('.cv-dropdown')) {
    document.querySelectorAll('.cv-dropdown.open').forEach(d => d.classList.remove('open'));
  }
});

// ══════════════════════════════════════════════════
//  THREE.JS HERO — replaces particle canvas
// ══════════════════════════════════════════════════
(function initThreeHero() {
  const canvas = document.getElementById('threejs-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);

  // ── Ambient + point lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const pointLight1 = new THREE.PointLight(0x2563eb, 2, 20);
  pointLight1.position.set(3, 3, 3);
  scene.add(pointLight1);
  const pointLight2 = new THREE.PointLight(0x6366f1, 1.5, 20);
  pointLight2.position.set(-3, -2, 2);
  scene.add(pointLight2);

  // ── Central rotating icosahedron (centrepiece)
  const icoGeo = new THREE.IcosahedronGeometry(1.1, 1);
  const icoMat = new THREE.MeshPhongMaterial({
    color: 0x2563eb,
    emissive: 0x1e3a8a,
    shininess: 120,
    wireframe: false,
    transparent: true,
    opacity: 0.85,
  });
  const ico = new THREE.Mesh(icoGeo, icoMat);
  ico.position.set(2.8, 0.2, -1);
  scene.add(ico);

  // ── Wireframe shell around it
  const wireMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.18 });
  const wire    = new THREE.Mesh(new THREE.IcosahedronGeometry(1.3, 1), wireMat);
  wire.position.copy(ico.position);
  scene.add(wire);

  // ── Orbiting smaller spheres
  const orbitGroup = new THREE.Group();
  orbitGroup.position.copy(ico.position);
  scene.add(orbitGroup);
  const orbitColors = [0x6366f1, 0x0ea5e9, 0x2563eb, 0xa855f7];
  const orbiters    = [];
  orbitColors.forEach((col, i) => {
    const angle  = (i / orbitColors.length) * Math.PI * 2;
    const radius = 1.85 + (i % 2) * 0.3;
    const sm     = new THREE.Mesh(
      new THREE.SphereGeometry(0.07 + i * 0.015, 8, 8),
      new THREE.MeshPhongMaterial({ color: col, emissive: col, emissiveIntensity: 0.5 })
    );
    sm.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, 0);
    orbitGroup.add(sm);
    orbiters.push({ mesh: sm, radius, speed: 0.4 + i * 0.12, offset: angle });
  });

  // ── Floating particles field
  const partCount   = 180;
  const partPositions = new Float32Array(partCount * 3);
  for (let i = 0; i < partCount * 3; i++) {
    partPositions[i] = (Math.random() - 0.5) * 14;
  }
  const partGeo = new THREE.BufferGeometry();
  partGeo.setAttribute('position', new THREE.BufferAttribute(partPositions, 3));
  const partMat = new THREE.PointsMaterial({ color: 0x3b82f6, size: 0.045, transparent: true, opacity: 0.55 });
  const points  = new THREE.Points(partGeo, partMat);
  scene.add(points);

  // ── Connection lines between nearby particles (sparse)
  const lineMat  = new THREE.LineBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.06 });
  const lineGeo  = new THREE.BufferGeometry();
  const lineVerts = [];
  for (let i = 0; i < partCount; i++) {
    for (let j = i + 1; j < partCount; j++) {
      const ax = partPositions[i*3], ay = partPositions[i*3+1], az = partPositions[i*3+2];
      const bx = partPositions[j*3], by = partPositions[j*3+1], bz = partPositions[j*3+2];
      const d  = Math.sqrt((ax-bx)**2 + (ay-by)**2 + (az-bz)**2);
      if (d < 1.8) { lineVerts.push(ax,ay,az,bx,by,bz); }
    }
  }
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3));
  scene.add(new THREE.LineSegments(lineGeo, lineMat));

  // ── Mouse parallax
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // ── Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ── Scroll-based fade — hide Three.js canvas below hero
  window.addEventListener('scroll', () => {
    const heroH  = document.getElementById('hero').offsetHeight;
    const scrollY = window.scrollY;
    const opacity = Math.max(0, 1 - scrollY / (heroH * 0.7));
    canvas.style.opacity = opacity;
  }, { passive: true });

  // ── Animation loop
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Rotate icosahedron
    ico.rotation.x = t * 0.22;
    ico.rotation.y = t * 0.35;
    wire.rotation.x = -t * 0.18;
    wire.rotation.y =  t * 0.28;

    // Orbit the small spheres
    orbiters.forEach((o, i) => {
      const a = o.offset + t * o.speed;
      o.mesh.position.set(
        Math.cos(a) * o.radius,
        Math.sin(a) * o.radius * 0.6,
        Math.sin(a * 0.7) * 0.4
      );
    });

    // Orbit group gentle rock
    orbitGroup.rotation.z = Math.sin(t * 0.3) * 0.15;

    // Slow particle drift
    points.rotation.y = t * 0.02;
    points.rotation.x = t * 0.01;

    // Camera parallax
    camera.position.x += (mouseX * 0.4 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);

    // Pulse point light
    pointLight1.intensity = 2 + Math.sin(t * 1.5) * 0.6;

    renderer.render(scene, camera);
  }
  animate();
})();

// ══════════════════════════════════════════════════
//  3D TILT on project cards (mouse tracking)
// ══════════════════════════════════════════════════
(function initCardTilt() {
  const TILT_MAX = 12; // degrees

  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const rotX   = -dy * TILT_MAX;
      const rotY   =  dx * TILT_MAX;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    });
  });
})();

// ══════════════════════════════════════════════════
//  SCROLL-DRIVEN 3D DEPTH transitions
// ══════════════════════════════════════════════════
(function initScrollDepth() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const depthSections = document.querySelectorAll('.section-3d');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transform  = 'perspective(1200px) rotateX(0deg) translateZ(0px)';
        entry.target.style.opacity    = '1';
        entry.target.style.transition = 'transform 0.7s cubic-bezier(0.23,1,0.32,1), opacity 0.6s ease';
      } else {
        entry.target.style.transform  = 'perspective(1200px) rotateX(4deg) translateZ(-40px)';
        entry.target.style.opacity    = '0.6';
        entry.target.style.transition = 'transform 0.5s ease, opacity 0.4s ease';
      }
    });
  }, { threshold: 0.12 });

  depthSections.forEach(s => {
    s.style.transform  = 'perspective(1200px) rotateX(4deg) translateZ(-40px)';
    s.style.opacity    = '0.6';
    observer.observe(s);
  });
})();