/* ---------------------------------------------------------------
     5. HERO IMAGE SLIDER
     --------------------------------------------------------------- */
  const heroSlider = document.getElementById('heroSlider');
  const heroSlides = heroSlider ? Array.from(heroSlider.querySelectorAll('.hero-slide')) : [];
  const heroDots = heroSlider ? Array.from(heroSlider.querySelectorAll('.hero-slider-dot')) : [];
  const heroPrev = document.getElementById('heroPrev');
  const heroNext = document.getElementById('heroNext');
  let heroCurrentIndex = 0;
  let heroAutoPlay = null;

  function showHeroSlide(index){
    if(!heroSlider || !heroSlides.length) return;
    heroCurrentIndex = (index + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === heroCurrentIndex);
    });

    heroDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === heroCurrentIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  function startHeroAutoPlay(){
    if(!heroSlider || !heroSlides.length) return;
    clearInterval(heroAutoPlay);
    heroAutoPlay = setInterval(() => {
      showHeroSlide(heroCurrentIndex + 1);
    }, 5000);
  }

  if(heroSlider && heroSlides.length){
    heroDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showHeroSlide(Number(dot.dataset.slide));
        startHeroAutoPlay();
      });
    });

    if(heroPrev){
      heroPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showHeroSlide(heroCurrentIndex - 1);
        startHeroAutoPlay();
      });
    }

    if(heroNext){
      heroNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showHeroSlide(heroCurrentIndex + 1);
        startHeroAutoPlay();
      });
    }

    heroSlider.addEventListener('click', () => {
      showHeroSlide(heroCurrentIndex + 1);
      startHeroAutoPlay();
    });

    heroSlider.addEventListener('mouseenter', () => clearInterval(heroAutoPlay));
    heroSlider.addEventListener('mouseleave', startHeroAutoPlay);

    showHeroSlide(0);
    startHeroAutoPlay();
  }
