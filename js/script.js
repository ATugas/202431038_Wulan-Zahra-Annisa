document.addEventListener('DOMContentLoaded', () => {
  initTopicToggles();
  initModeToggle();
  initNavigationButtons();
  initLazyLoad();
  openAllTopics(); 
});

function initTopicToggles() {
  const cards = Array.from(document.querySelectorAll('.topic-card'));
  cards.forEach(card => {
    const head = card.querySelector('.topic-head');
    head.addEventListener('click', () => toggleCard(card));
    head.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCard(card);
      }
    });
  });
}

function toggleCard(card) {
  const body = card.querySelector('.topic-body');
  const isOpen = body.classList.contains('show');
  const promptText = isOpen ? 'Hide this explanation?' : 'Show this explanation?';
  if (!confirm(promptText)) return;
  if (isOpen) {
    body.classList.remove('show');
    card.classList.remove('active');
    card.querySelector('.topic-head').setAttribute('aria-expanded', 'false');
  } else {
    body.classList.add('show');
    card.classList.add('active');
    card.querySelector('.topic-head').setAttribute('aria-expanded', 'true');
  }
}

let messyMode = false;
function initModeToggle() {
  const btn = document.getElementById('modeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    messyMode = !messyMode;
    document.body.classList.toggle('messy-mode', messyMode);
    btn.textContent = messyMode ? 'Back to Normal Mode' : 'Switch Display Mode';
    btn.setAttribute('aria-pressed', messyMode ? 'true' : 'false');
  });
}

function initNavigationButtons() {
  const galleryBtn = document.getElementById('galleryBtn');
  if (galleryBtn) {
    galleryBtn.addEventListener('click', () => {
      window.location.href = 'library.html';
    });
  }

  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
}

function initLazyLoad() {
  const imgs = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        obs.unobserve(img);
      });
    }, { rootMargin: '60px' });

    imgs.forEach(img => io.observe(img));
  } else {
    imgs.forEach(img => {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    });
  }
}

function openAllTopics() {
  const contents = document.querySelectorAll('.topic-body');
  const cards = document.querySelectorAll('.topic-card');
  contents.forEach((c, i) => {
    c.classList.add('show');
    cards[i].classList.add('active');
    cards[i].querySelector('.topic-head').setAttribute('aria-expanded', 'true');
  });
}
