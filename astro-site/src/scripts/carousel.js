// src/scripts/carousel.js
// Image carousel functionality with lightbox support

export function initCarousel(carouselId, options = {}) {
  const { autoplay = false, interval = 5000 } = options;

  const carousel = document.querySelector(`[data-carousel-id="${carouselId}"]`);
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const indicators = carousel.querySelectorAll('.indicator');
  const carouselImages = carousel.querySelectorAll('.carousel-image');

  // Lightbox elements
  const lightbox = document.getElementById(`lightbox-${carouselId}`);
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-image');
  const lightboxCounter = lightbox.querySelector('.lightbox-counter');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const lightboxPrev = lightbox.querySelector('.lightbox-prev');
  const lightboxNext = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  let autoplayTimer = null;
  let isLightboxOpen = false;

  function showSlide(index) {
    // Remove active class from current slide and indicator
    slides[currentIndex].classList.remove('active');
    if (indicators[currentIndex]) {
      indicators[currentIndex].classList.remove('active');
    }

    // Update index
    currentIndex = index;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    if (currentIndex >= slides.length) currentIndex = 0;

    // Add active class to new slide and indicator
    slides[currentIndex].classList.add('active');
    if (indicators[currentIndex]) {
      indicators[currentIndex].classList.add('active');
    }

    // Update lightbox if it's open
    if (isLightboxOpen) {
      updateLightboxImage();
    }

    // Reset autoplay timer
    if (autoplay) {
      clearInterval(autoplayTimer);
      startAutoplay();
    }
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoplay() {
    if (autoplay && slides.length > 1) {
      autoplayTimer = setInterval(nextSlide, interval);
    }
  }

  // Lightbox functions
  function openLightbox() {
    isLightboxOpen = true;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    isLightboxOpen = false;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxImage() {
    const currentImg = slides[currentIndex].querySelector('img');
    lightboxImg.src = currentImg.src;
    lightboxImg.alt = currentImg.alt;
    lightboxCounter.textContent = `${currentIndex + 1} / ${slides.length}`;
  }

  // Carousel event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
    });
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => showSlide(index));
  });

  // Click on carousel image to open lightbox
  carouselImages.forEach((img) => {
    img.addEventListener('click', openLightbox);
  });

  // Lightbox event listeners
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', prevSlide);
  lightboxNext.addEventListener('click', nextSlide);

  // Close lightbox on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  const handleKeydown = (e) => {
    if (isLightboxOpen) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    } else if (carousel.matches(':focus-within')) {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    }
  };

  document.addEventListener('keydown', handleKeydown);

  // Touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
    }
  }

  // Start autoplay if enabled
  startAutoplay();

  // Return cleanup function
  return () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
    }
    document.removeEventListener('keydown', handleKeydown);
  };
}
