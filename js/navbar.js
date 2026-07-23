/* ---------------------------------------------------------------
     3. STICKY NAVBAR + SCROLL PROGRESS + ACTIVE LINK
     --------------------------------------------------------------- */
  const scrollProgress = document.getElementById('scrollProgress');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  let backToTop = null;

  function onScroll(){
    // Progress bar
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';

    // Active link highlight
    let currentId = sections[0] ? sections[0].id : '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if(scrollTop >= top) currentId = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });

    // Back to top visibility
    if(backToTop){ backToTop.classList.toggle('show', scrollTop > 500); }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
/* ---------------------------------------------------------------
     4. HAMBURGER / MOBILE MENU
     --------------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
