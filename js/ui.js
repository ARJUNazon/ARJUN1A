/* ---------------------------------------------------------------
     6. SCROLL REVEAL ANIMATIONS
     --------------------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  function observeReveals(){
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => revealObserver.observe(el));
  }
  observeReveals();

/* ---------------------------------------------------------------
     10. BACK TO TOP
     --------------------------------------------------------------- */
  backToTop = document.getElementById('backToTop');
  if(backToTop){
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top:0, behavior:'smooth' });
    });
  }


  /* ---------------------------------------------------------------
     11. RIPPLE BUTTON EFFECT
     --------------------------------------------------------------- */
  function attachRippleTo(elements){
    elements.forEach(el => {
      el.addEventListener('click', function(e){
        const circle = document.createElement('span');
        circle.classList.add('ripple-circle');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        circle.style.width = circle.style.height = size + 'px';
        circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
        circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
        this.appendChild(circle);
        setTimeout(() => circle.remove(), 650);
      });
    });
  }
  attachRippleTo(document.querySelectorAll('.ripple'));


