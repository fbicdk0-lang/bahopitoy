const particleLayer = document.querySelector('.particle-layer');
const cursor = document.querySelector('.cursor');
const loadingScreen = document.querySelector('.loading-screen');
const navLinks = document.querySelectorAll('.nav-links a');
const revealItems = document.querySelectorAll('.reveal');

function createParticles() {
  if (!particleLayer) return;
  for (let i = 0; i < 45; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${5 + Math.random() * 6}s`;
    particle.style.animationDelay = `${Math.random() * 4}s`;
    particleLayer.appendChild(particle);
  }
}

function hideLoading() {
  if (!loadingScreen) return;
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 1800);
}

function initCursor() {
  if (window.innerWidth <= 900 || !cursor) return;
  document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll('a, button, .member-card, .gallery-item, .event-card, input, textarea').forEach((element) => {
    element.addEventListener('mouseenter', () => cursor.classList.add('active'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => observer.observe(item));
}

function animateCounters() {
  const counters = document.querySelectorAll('[data-target]');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.target);
      const suffix = element.dataset.suffix || '';
      const prefix = element.dataset.prefix || '';
      const duration = 1200;
      let start = null;

      function step(time) {
        if (!start) start = time;
        const progress = Math.min((time - start) / duration, 1);
        const value = Math.floor(progress * target);
        element.textContent = `${prefix}${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
      observer.unobserve(element);
    });
  }, { threshold: 0.6 });

  counters.forEach((counter) => counterObserver.observe(counter));
}

const members = [
  { name: 'Kishou', role: 'Clan Master', rank: 'Legendary', weapon: 'M13', status: 'Online', desc: 'Strategist and leader of the pack.', master: true, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
  { name: 'SlyFox', role: 'Sniper', rank: 'Ace', weapon: 'DL Q33', status: 'Online', desc: 'Precision over panic.', master: false, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' },
  { name: 'Raze', role: 'Aggressor', rank: 'Veteran', weapon: 'AK117', status: 'Offline', desc: 'Always first to charge in.', master: false, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' },
  { name: 'NOVA', role: 'Support', rank: 'Elite', weapon: 'M4', status: 'Online', desc: 'The calm in every squad fight.', master: false, img: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80' },
  { name: 'Mako', role: 'Rusher', rank: 'Diamond', weapon: 'Kilo 141', status: 'Online', desc: 'Fast hands, faster rotations.', master: false, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
  { name: 'Vex', role: 'Tracker', rank: 'Master', weapon: 'Type 25', status: 'Offline', desc: 'Maps, routes, and pressure points.', master: false, img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80' },
  { name: 'Ghost', role: 'Controller', rank: 'Legendary', weapon: 'M16A4', status: 'Online', desc: 'Steady, sharp, and deadly.', master: false, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' },
  { name: 'Echo', role: 'Flanker', rank: 'Elite', weapon: 'FR 5.56', status: 'Online', desc: 'Turns chaos into momentum.', master: false, img: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80' },
  { name: 'Haze', role: 'Tactician', rank: 'Diamond', weapon: 'PP19 Bizon', status: 'Offline', desc: 'Reads the field like a playbook.', master: false, img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' },
  { name: 'Kryx', role: 'Finisher', rank: 'Master', weapon: 'PKP', status: 'Online', desc: 'Clutch instincts and clean aim.', master: false, img: 'https://images.unsplash.com/photo-1549068106-b024baf5062d?auto=format&fit=crop&w=300&q=80' },
  { name: 'Tron', role: 'IGL', rank: 'Legendary', weapon: 'CR-56 AMAX', status: 'Online', desc: 'Calls the shot and owns the map.', master: false, img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' },
  { name: 'Dart', role: 'Entry', rank: 'Veteran', weapon: 'G36C', status: 'Offline', desc: 'Opens the lane and never looks back.', master: false, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' }
];

function renderMembers(filter = '') {
  const membersGrid = document.getElementById('membersGrid');
  if (!membersGrid) return;
  const search = filter.toLowerCase();
  const filtered = members.filter((member) => {
    const matchesSearch = `${member.name} ${member.role} ${member.weapon}`.toLowerCase().includes(search);
    const currentRole = document.getElementById('roleFilter')?.value || 'all';
    const matchesRole = currentRole === 'all' || member.role.toLowerCase() === currentRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const master = filtered.find((m) => m.master);
  const others = filtered.filter((m) => !m.master);
  const cards = [];

  if (master) {
    cards.push(`
      <article class="member-card clan-master reveal">
        <div class="member-top">
          <img class="avatar" src="${master.img}" alt="${master.name}">
          <span class="badge">👑 Clan Master</span>
        </div>
        <h3>${master.name}</h3>
        <p class="section-subtitle">${master.role} • ${master.rank}</p>
        <p><strong>Weapon:</strong> ${master.weapon}</p>
        <div class="status"><span class="status-dot ${master.status === 'Online' ? '' : 'offline'}"></span>${master.status}</div>
        <p class="section-subtitle">${master.desc}</p>
      </article>
    `);
  }

  others.forEach((member) => {
    cards.push(`
      <article class="member-card reveal">
        <div class="member-top">
          <img class="avatar" src="${member.img}" alt="${member.name}">
          <span class="badge">${member.rank}</span>
        </div>
        <h3>${member.name}</h3>
        <p class="section-subtitle">${member.role}</p>
        <p><strong>Weapon:</strong> ${member.weapon}</p>
        <div class="status"><span class="status-dot ${member.status === 'Online' ? '' : 'offline'}"></span>${member.status}</div>
        <p class="section-subtitle">${member.desc}</p>
      </article>
    `);
  });

  membersGrid.innerHTML = cards.join('');
}

function initMembers() {
  const searchInput = document.getElementById('memberSearch');
  const roleFilter = document.getElementById('roleFilter');
  if (searchInput) {
    searchInput.addEventListener('input', (event) => renderMembers(event.target.value));
  }
  if (roleFilter) {
    roleFilter.addEventListener('change', () => renderMembers(searchInput?.value || ''));
  }
  renderMembers();
}

function initGallery() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      lightboxImg.src = item.dataset.image;
      lightbox.classList.add('active');
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', () => lightbox.classList.remove('active'));
  }
}

function initCountdowns() {
  document.querySelectorAll('.countdown').forEach((countdown) => {
    const target = countdown.dataset.date;
    const update = () => {
      const diff = new Date(target) - new Date();
      if (diff <= 0) {
        countdown.innerHTML = '<span>Live</span>';
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      countdown.innerHTML = `<span>${days}D</span><span>${hours}H</span><span>${mins}M</span><span>${secs}S</span>`;
    };
    update();
    setInterval(update, 1000);
  });
}

function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let valid = true;
  inputs.forEach((input) => {
    if (!input.value.trim()) {
      valid = false;
      input.style.borderColor = 'rgba(255,44,63,0.7)';
    } else {
      input.style.borderColor = 'rgba(255,255,255,0.1)';
    }
  });
  return valid;
}

function initForms() {
  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validateForm(form)) {
        alert('Please fill out the required fields before submitting.');
        return;
      }
      alert('Form submitted successfully. Baho Pitoy will review your request soon.');
      form.reset();
    });
  });
}

function initNav() {
  const sections = document.querySelectorAll('main section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
}

createParticles();
hideLoading();
initCursor();
initReveal();
animateCounters();
initMembers();
initGallery();
initCountdowns();
initForms();
initNav();

window.addEventListener('mousemove', (event) => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const rect = hero.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  hero.style.setProperty('--move-x', `${x * 12}px`);
  hero.style.setProperty('--move-y', `${y * 10}px`);
});

// Register service worker for offline caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch((err) => {
      // console.warn('SW registration failed', err);
    });
  });
}

// Theme toggle (persists to localStorage)
(function themeToggleInit() {
  const btn = document.getElementById('themeToggle');
  const current = localStorage.getItem('bp-theme') || 'dark';
  if (current === 'light') document.body.classList.add('light-mode');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('bp-theme', isLight ? 'light' : 'dark');
    btn.textContent = isLight ? 'Dark' : 'Light';
  });
  btn.textContent = document.body.classList.contains('light-mode') ? 'Dark' : 'Light';
})();

// Newsletter handling (local-only storage)
(function newsletterInit() {
  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('newsletterEmail');
  const msg = document.getElementById('newsletterMsg');
  if (!form || !emailInput) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!re.test(email)) {
      msg.textContent = 'Please enter a valid email address.';
      return;
    }
    // store in localStorage for now (replace with API call later)
    const list = JSON.parse(localStorage.getItem('bp-newsletter') || '[]');
    if (!list.includes(email)) list.push(email);
    localStorage.setItem('bp-newsletter', JSON.stringify(list));
    msg.textContent = 'Subscribed — we will contact you soon.';
    form.reset();
  });
})();
