/* ---------------------------------------------------------------
   SEARCH BAR — filters the menu by dish name or keyword
   (e.g. typing "biryani" shows chicken biryani + egg biryani,
    typing "curry" shows chicken curry, mutton curry, fish curry)
   --------------------------------------------------------------- */

// 1. Grab the two elements from your navbar search widget.
//    These match .searchInput / .searchButton already in index.html —
//    no HTML changes needed, this file just finds what's already there.
const searchInput  = document.querySelector('.searchInput');
const searchButton = document.querySelector('.searchButton');

// 2. This builds the food cards for a given LIST of items.
//    It's basically the same card markup renderMenu() in menu.js uses,
//    just taking a ready-made array instead of filtering by diet —
//    that's what lets it display search results instead of veg/nonveg.
function renderSearchResults(items){
  // Empty out whatever is currently shown in the menu grid.
  menuGrid.innerHTML = '';

  // If nothing matched the search, show a friendly message instead
  // of leaving a confusing blank grid.
  if(items.length === 0){
    menuGrid.innerHTML = `
      <p class="search-no-results">
        No dishes found. Try "biryani", "curry", "juice", or "snack".
      </p>`;
    return; // stop here, nothing else to render
  }

  // Otherwise, build one .food-card per matching item.
  items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.dataset.name = item.name;   // stored so "Add to Cart" can read it
    card.dataset.price = item.price;
    card.dataset.img = item.img;
    card.style.animationDelay = (i * 0.08) + 's'; // staggered fade-in

    card.innerHTML = `
      <div class="food-card-img">
        <img src="${item.img}" alt="${item.name}" loading="lazy"
             onerror="this.onerror=null; this.src='azon.png'; this.alt='AZON Green Zone';">
        <span class="food-badge ${item.diet}"></span>
      </div>
      <div class="food-card-body">
        <div class="food-card-top">
          <h3>${item.name}</h3>
          <span class="food-rating">★ ${item.rating}</span>
        </div>
        <span class="food-price">₹${item.price}</span>
        <button class="add-cart-btn ripple">Add to Cart</button>
      </div>
    `;
    menuGrid.appendChild(card);
  });

  // Re-run the same "fade in on scroll", ripple-click, and
  // "Add to Cart" button wiring that the normal menu uses.
  // These three functions already exist in ui.js / menu.js —
  // we're just calling them again on the new cards.
  observeReveals();
  attachRippleTo(menuGrid.querySelectorAll('.ripple'));
  attachAddToCart();
}

// 3. The actual matching logic: given whatever text the user typed,
//    return every dish whose name OR keywords array contains it.
function searchFood(query){
  // Normalize the typed text: lowercase + trim spaces, so
  // "  Biryani " still matches "biryani".
  const q = query.trim().toLowerCase();

  // If the search box is empty, don't show a "no results" screen —
  // just go back to whichever diet filter (Veg/Non-Veg) was active,
  // exactly like clicking that filter button would.
  if(q === ''){
    const activeBtn = document.querySelector('.menu-filter-btn.active');
    const activeDiet = activeBtn ? activeBtn.dataset.filter : 'veg';
    renderMenu(activeDiet);
    return;
  }

  // foodItems is the big array of dishes defined in menu.js.
  // .filter() keeps only the items where the condition is true.
  const results = foodItems.filter(item => {
    const nameMatch = item.name.toLowerCase().includes(q);

    // item.keywords is an array like ['chicken','curry','spicy'].
    // .some() checks if ANY keyword contains the typed text.
    // The "?." (optional chaining) just prevents an error if an
    // item ever has no keywords array at all.
    const keywordMatch = item.keywords?.some(k => k.toLowerCase().includes(q));

    return nameMatch || keywordMatch;
  });

  renderSearchResults(results);

  // Scroll down to the menu section so the user actually sees
  // the results they just searched for.
  document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

// 4. LIVE search — runs every time the user types a character.
searchInput.addEventListener('input', () => {
  searchFood(searchInput.value);
});

// 5. Also trigger a search on pressing Enter inside the box...
searchInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    e.preventDefault(); // stops the page from trying to "submit" anything
    searchFood(searchInput.value);
  }
});

// 6. ...and on clicking the round search button itself.
searchButton.addEventListener('click', (e) => {
  e.preventDefault(); // the button has href="#" leftover from the template — stop it jumping the page
  searchFood(searchInput.value);
});
