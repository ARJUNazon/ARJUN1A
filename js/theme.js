/* ---------------------------------------------------------------
     2. DARK / LIGHT MODE TOGGLE
     --------------------------------------------------------------- */
  const modeToggle = document.getElementById('modeToggle');
  const root = document.documentElement;

  function applyTheme(theme){
    if(theme === 'dark'){
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    try{ localStorage.setItem('azon-theme', theme); }catch(e){}
  }

  let savedTheme = 'light';
  try{
    savedTheme = localStorage.getItem('azon-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }catch(e){}
  applyTheme(savedTheme);

  modeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
  });
