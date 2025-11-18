// Consolidated, safer script.js

// Splash + scroll-to-top on load
window.addEventListener('load', () => {
  const splash = document.getElementById('splash');
  const main = document.getElementById('main-content');

  if (splash) {
    // mantener splash 2000ms, luego fade-out de 600ms y eliminar
    splash.style.opacity = '1';
    setTimeout(() => {
      requestAnimationFrame(() => {
        splash.style.transition = 'opacity 600ms ease';
        splash.style.opacity = '0';
      });
      setTimeout(() => {
        if (splash.parentNode) splash.parentNode.removeChild(splash);
      }, 700); // eliminación tras el fade (600ms) + buffer
    }, 1500); // <-- duración visible: 2000ms
  }

  if (main) main.style.display = 'block';

  // ensure page at top (small delay to override restore)
  setTimeout(() => window.scrollTo(0, 0), 50);
});

// DOM-ready initialisation
document.addEventListener('DOMContentLoaded', () => {
  // Menu toggle (guardado null-safe)
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    let menuOpen = false;
    menuToggle.addEventListener('click', () => {
      menuOpen = !menuOpen;
      const spans = menuToggle.querySelectorAll('span');
      if (spans.length >= 3) {
        if (menuOpen) {
          spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    });
  }

  // Smooth scrolling for in-page anchors (skip bare "#" only)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (href && href !== '#') {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  });

  // Intersection observer animations (sections)
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Stats number animation
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        const statNumber = entry.target.querySelector('.stat-number');
        if (!statNumber) return;
        const originalText = statNumber.textContent || '';
        const hasPercent = originalText.includes('%');
        const hasPlus = originalText.includes('+');
        const number = parseInt(originalText.replace(/\D/g, ''), 10) || 0;
        entry.target.classList.add('animated');

        let startTimestamp = null;
        const duration = 2000;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const value = Math.floor(progress * number);
          if (hasPercent) statNumber.textContent = `${value}%`;
          else if (hasPlus) statNumber.textContent = `+${value}`;
          else statNumber.textContent = value;
          if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-item').forEach((stat) => statsObserver.observe(stat));

  // Image lazy loading fallback (guard dataset.src)
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      if (img.dataset && img.dataset.src && !img.src) img.src = img.dataset.src;
    });
  } else {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }

  // Parallax hero image (simple, safe)
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage && scrolled < window.innerHeight) {
      heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    } else if (heroImage) {
      heroImage.style.transform = '';
    }
  });

  // Consolidated slider (0-based indexing)
  const slides = Array.from(document.getElementsByClassName('slide'));
  let slideIndex = 0;
  let autoSlideTimer = null;
  const SLIDE_INTERVAL = 3000;

  function showSlide(index) {
    if (!slides.length) return;
    slideIndex = ((index % slides.length) + slides.length) % slides.length;
    slides.forEach((s, i) => {
      s.style.display = i === slideIndex ? 'block' : 'none';
    });
  }

  function nextSlide(delta = 1) {
    showSlide(slideIndex + delta);
    resetAutoSlide();
  }

  function startAutoSlide() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(() => showSlide(slideIndex + 1), SLIDE_INTERVAL);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  if (slides.length) {
    showSlide(0);
    startAutoSlide();
  }

  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  if (prevBtn) prevBtn.addEventListener('click', () => nextSlide(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => nextSlide(1));

  // Ensure .prev/.next also respond to keyboard (Enter/Space)
  [prevBtn, nextBtn].forEach((btn) => {
    if (!btn) return;
    btn.setAttribute('type', 'button');
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Asesorate buttons -> open WhatsApp
  document.querySelectorAll('.asesorateBtn').forEach((btn) => {
    btn.addEventListener('click', () => {
      window.open('https://wa.me/543541551971?text=Hola!%20Vengo%20de%20la%20web!', '_blank', 'noopener');
    });
  });
});