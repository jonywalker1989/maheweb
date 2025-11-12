  // Fade in
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const main = document.getElementById("main-content");

  setTimeout(() => {
    splash.classList.add("hidden"); // fade out
    setTimeout(() => {
      splash.style.display = "none";
      main.style.display = "block";
      document.body.classList.add("loaded"); // reactiva scroll
    }, 800); // espera el fade
  }, 1000); // tiempo visible del splash
});


  // Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
let menuOpen = false;

menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    const spans = menuToggle.querySelectorAll('span');

    if (menuOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#contacto') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Animate numbers on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumber = entry.target.querySelector('.stat-number');
            const originalText = statNumber.textContent;
            const hasPercent = originalText.includes('%');
            const hasPlus = originalText.includes('+');
            const number = parseInt(originalText.replace(/\D/g, ''));

            entry.target.classList.add('animated');

            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / 2000, 1);
                const value = Math.floor(progress * number);

                if (hasPercent) {
                    statNumber.textContent = `${value}%`;
                } else if (hasPlus) {
                    statNumber.textContent = `+${value}`;
                } else {
                    statNumber.textContent = value;
                }

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Image lazy loading fallback
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Add parallax effect to hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

//Slider
let slideIndex = 0;
let slides, autoSlide;

function showSlides(n) {
  if (!slides) slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (n !== undefined) slideIndex = n;
  if (slideIndex > slides.length) slideIndex = 1;
  if (slideIndex < 1) slideIndex = slides.length;
  slides[slideIndex - 1].style.display = "block";
}

function plusSlides(n) {
  clearTimeout(autoSlide);
  showSlides(slideIndex += n);
  autoSlide = setTimeout(autoShow, 2000);
}

function autoShow() {
  showSlides();
  autoSlide = setTimeout(autoShow, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  slides = document.getElementsByClassName("slide");
  document.querySelector(".prev").addEventListener("click", () => plusSlides(-1));
  document.querySelector(".next").addEventListener("click", () => plusSlides(1));
  autoShow();
});

// Al cargar la página, siempre llevar scroll al inicio
  window.addEventListener("load", function() {
    // Pequeño retraso para sobreescribir el scroll restaurado
    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 50); // 50ms suele ser suficiente
  });



  
document.querySelectorAll(".asesorateBtn").forEach(btn => {
  btn.addEventListener("click", function() {
    window.open("https://wa.me/543541551971?text=Hola!%20Vengo%20de%20la%20web!", "_blank");
  });
});  