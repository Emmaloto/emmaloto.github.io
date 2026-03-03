// Simple animations for interactivity
// Fade in sections on scroll, button hover bounce, and image zoom

document.addEventListener('DOMContentLoaded', function() {
  // Fade in effect for sections
  const fadeEls = document.querySelectorAll('.w3-container, .w3-card, .buttons');
  const fadeInOnScroll = () => {
    fadeEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add('fade-in');
      }
    });
  };
  window.addEventListener('scroll', fadeInOnScroll);
  fadeInOnScroll();

  // Button bounce on hover
  const btns = document.querySelectorAll('.btn');
  btns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.classList.add('bounce');
    });
    btn.addEventListener('animationend', () => {
      btn.classList.remove('bounce');
    });
  });

  // Image zoom on hover
  const img = document.querySelector('.w3-display-container img');
  if (img) {
    img.addEventListener('mouseenter', () => {
      img.classList.add('zoom');
    });
    img.addEventListener('mouseleave', () => {
      img.classList.remove('zoom');
    });
  }
});
