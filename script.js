document.getElementById('yr').textContent = new Date().getFullYear();

// Fade sections in as they scroll into view
const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 }) : null;
document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

// Lightbox for work samples; campaign decks get prev/next navigation
const lightbox = document.querySelector('.lightbox');
if (lightbox && typeof lightbox.showModal === 'function') {
  const big = lightbox.querySelector('img');
  const nav = lightbox.querySelector('.lightbox-nav');
  const count = lightbox.querySelector('.lightbox-count');
  let deck = null;
  let slide = 1;

  const showSlide = (n) => {
    slide = (n - 1 + deck.count) % deck.count + 1;
    big.src = deck.prefix + String(slide).padStart(2, '0') + '.webp';
    big.alt = `${deck.name}, slide ${slide} of ${deck.count}`;
    count.textContent = `${slide} / ${deck.count}`;
  };

  document.querySelectorAll('.post button').forEach(btn => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      deck = null;
      nav.hidden = true;
      lightbox.classList.remove('is-deck');
      big.src = img.src;
      big.alt = img.alt;
      lightbox.showModal();
    });
  });

  document.querySelectorAll('[data-deck]').forEach(el => {
    const d = { prefix: el.dataset.deck, count: Number(el.dataset.count), name: el.dataset.name };
    el.querySelectorAll('[data-slide]').forEach(btn => {
      btn.addEventListener('click', () => {
        deck = d;
        nav.hidden = false;
        lightbox.classList.add('is-deck');
        showSlide(Number(btn.dataset.slide));
        lightbox.showModal();
      });
    });
  });

  lightbox.querySelector('.lightbox-prev')?.addEventListener('click', () => deck && showSlide(slide - 1));
  lightbox.querySelector('.lightbox-next')?.addEventListener('click', () => deck && showSlide(slide + 1));
  lightbox.addEventListener('keydown', e => {
    if (!deck) return;
    if (e.key === 'ArrowLeft') showSlide(slide - 1);
    if (e.key === 'ArrowRight') showSlide(slide + 1);
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
}
