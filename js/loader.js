
  /* ---------------------------------------------------------------
     1. LOADING SCREEN
     --------------------------------------------------------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 400);
  });
  // Safety net in case 'load' already fired
  setTimeout(() => loader && loader.classList.add('hidden'), 2500);

