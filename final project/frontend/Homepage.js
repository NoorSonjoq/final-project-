document.addEventListener('DOMContentLoaded', function () {
  const fadeElements = document.querySelectorAll('.fade-element');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(element => {
    observer.observe(element);
  });
});

// لتفعيل زر العودة للأعلى
window.onscroll = function () {
  document.getElementById("scrollTopBtn").style.display =
    window.pageYOffset > 100 ? "block" : "none";
};

document.getElementById("scrollTopBtn").onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function shopNow() {
  window.location.href = "products.html";
}
