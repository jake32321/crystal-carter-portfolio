document.getElementById('yr').textContent = new Date().getFullYear();

// Fade sections in as they scroll into view
const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 }) : null;
document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

// Social post lightbox
const lightbox = document.querySelector('.lightbox');
if (lightbox && typeof lightbox.showModal === 'function') {
  const big = lightbox.querySelector('img');
  document.querySelectorAll('.post button').forEach(btn => {
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      big.src = img.src;
      big.alt = img.alt;
      lightbox.showModal();
    });
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
}
