/* ---------------------------------------------------------------
   7. MENU DATA + RENDERING + VEG / NON-VEG FILTER
--------------------------------------------------------------- */

const foodItems = [

{
img:'images/nonveg/muttoncurry.jpg',
name:'mutton curry',
price:399,
rating:4.7,
diet:'nonveg',
keywords:['mutton','curry','gravy','spicy','nonveg','meal']
},

{
img:'images/nonveg/chickencurry.jpg',
name:'chicken curry',
price:299,
rating:4.5,
diet:'nonveg',
keywords:['chicken','curry','gravy','spicy','nonveg','meal']
},

{
img:'images/nonveg/chickenbiryani.jpg',
name:'chicken biryani',
price:219,
rating:4.6,
diet:'nonveg',
keywords:['chicken','biryani','rice','hyderabadi','spicy','meal','nonveg']
},

{
img:'images/nonveg/fishcurry.jpg',
name:'fish curry',
price:199,
rating:4.4,
diet:'nonveg',
keywords:['fish','curry','seafood','gravy','spicy','meal']
},

{
img:'images/nonveg/chickenburger.jpg',
name:'chicken burger',
price:99,
rating:4.8,
diet:'nonveg',
keywords:['chicken','burger','fast food','snack','nonveg']
},

{
img:'images/nonveg/eggbiryani.jpg',
name:'egg biryani',
price:199,
rating:4.9,
diet:'nonveg',
keywords:['egg','biryani','rice','meal','hyderabadi','nonveg']
},

{
img:'images/nonveg/shawarma.jpg',
name:'shawarma',
price:299,
rating:4.7,
diet:'nonveg',
keywords:['shawarma','chicken','roll','wrap','arabic','snack']
},

{
img:'images/nonveg/nonvegthali.jpg',
name:'non veg thali',
price:399,
rating:4.5,
diet:'nonveg',
keywords:['thali','meal','rice','curry','nonveg','full meal']
},

{
img:'images/nonveg/chickensandwich.jpg',
name:'chicken sandwich',
price:99,
rating:4.8,
diet:'nonveg',
keywords:['chicken','sandwich','bread','snack','fast food']
},

{
img:'images/nonveg/fishfry.jpg',
name:'fish fry',
price:169,
rating:4.6,
diet:'nonveg',
keywords:['fish','fry','fried','seafood','snack']
},

{
img:'images/veg/upma.jpg',
name:'upma',
price:89,
rating:4.7,
diet:'veg',
keywords:['upma','breakfast','tiffin','veg','south indian']
},

{
img:'images/veg/ponganallu.jpg',
name:'ponganallu',
price:129,
rating:4.5,
diet:'veg',
keywords:['ponganallu','gunta ponganalu','breakfast','tiffin','veg']
},

{
img:'images/veg/dosa.jpg',
name:'dosa',
price:99,
rating:4.6,
diet:'veg',
keywords:['dosa','masala dosa','breakfast','tiffin','south indian','veg']
},

{
img:'images/veg/paneersandwich.jpg',
name:'paneer sandwich',
price:99,
rating:4.4,
diet:'veg',
keywords:['paneer','sandwich','bread','veg','snack']
},

{
img:'images/veg/frenchfries.jpg',
name:'french fries',
price:79,
rating:4.8,
diet:'veg',
keywords:['fries','potato','chips','snack','veg']
},

{
img:'images/veg/fruitbowl.jpg',
name:'fruit bowl',
price:169,
rating:4.9,
diet:'veg',
keywords:['fruit','healthy','bowl','fresh','salad','veg']
},

{
img:'images/veg/orangejuice.jpg',
name:'orange juice',
price:69,
rating:4.7,
diet:'veg',
keywords:['orange','juice','drink','fresh juice','healthy']
},

{
img:'images/veg/crispycorn.jpg',
name:'crispy corn',
price:139,
rating:4.5,
diet:'veg',
keywords:['corn','crispy','snack','starter','veg']
},

{
img:'images/veg/sabudanakichidi.jpg',
name:'sabudana kichidi',
price:169,
rating:4.8,
diet:'veg',
keywords:['sabudana','kichidi','khichdi','breakfast','veg']
},

{
img:'images/veg/poha.jpg',
name:'poha',
price:99,
rating:4.6,
diet:'veg',
keywords:['poha','breakfast','tiffin','veg','healthy']
}

];





/* ---------------------------------------------------------------
     7A. SHOPPING CART STATE + DRAWER RENDERING
     --------------------------------------------------------------- */
  const menuGrid = document.getElementById('menuGrid');
  const cartButton = document.getElementById('cartButton');
  const cartBadge = document.getElementById('cartBadge');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartClose = document.getElementById('cartClose');
  const continueShopping = document.getElementById('continueShopping');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartSummary = document.getElementById('cartSummary');
  const summaryTotalItems = document.getElementById('summaryTotalItems');
  const summarySubtotal = document.getElementById('summarySubtotal');
  const summaryDelivery = document.getElementById('summaryDelivery');
  const summaryGst = document.getElementById('summaryGst');
  const summaryGrandTotal = document.getElementById('summaryGrandTotal');
  const DELIVERY_CHARGE = 40;
  let cart = [];

  function updateCartBadge(animate = false){
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartBadge.textContent = count;
    if(animate && count > 0){
      cartBadge.classList.remove('bump');
      void cartBadge.offsetWidth;
      cartBadge.classList.add('bump');
    }
  }

  function openCartDrawer(){
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('show');
    cartDrawer.setAttribute('aria-hidden', 'false');
    cartOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer(){
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('show');
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function addFoodToCart(name, price, img, animateBadge = false){
    const existingItem = cart.find(item => item.name === name);
    if(existingItem){
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, img, quantity: 1 });
    }
    updateCartBadge(animateBadge);
    renderCart();
  }

  function changeQuantity(name, delta){
    const item = cart.find(entry => entry.name === name);
    if(!item) return;

    item.quantity += delta;
    if(item.quantity <= 0){
      cart = cart.filter(entry => entry.name !== name);
    }

    updateCartBadge(false);
    renderCart();
  }

  function removeFoodFromCart(name){
    cart = cart.filter(item => item.name !== name);
    updateCartBadge(false);
    renderCart();
  }

  function renderCart(){
    if(!cart.length){
      cartItemsList.innerHTML = '';
      cartEmptyState.classList.remove('hidden');
      cartSummary.classList.add('hidden');
      updateCartBadge(false);
      return;
    }

    cartEmptyState.classList.add('hidden');
    cartSummary.classList.remove('hidden');

    cartItemsList.innerHTML = cart.map(item => {
      const subtotal = item.quantity * item.price;
      return `
        <article class="cart-item">
          <div class="cart-item-img">
            <img src="${item.img}" alt="${item.name}" onerror="this.onerror=null; this.src='azon.png'; this.alt='AZON Green Zone';">
          </div>
          <div>
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-price">₹${item.price}</div>
            <div class="cart-item-row">
              <div class="qty-controls">
                <button class="qty-btn" data-action="decrease" data-name="${item.name}" type="button">−</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" data-action="increase" data-name="${item.name}" type="button">+</button>
              </div>
              <button class="remove-btn" data-name="${item.name}" type="button">Remove</button>
            </div>
            <div class="cart-subtotal">Subtotal: ₹${subtotal}</div>
          </div>
        </article>
      `;
    }).join('');

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0);
    const gst = subtotal * 0.05;
    const grandTotal = subtotal + DELIVERY_CHARGE + gst;

    summaryTotalItems.textContent = totalItems;
    summarySubtotal.textContent = `₹${subtotal}`;
    summaryDelivery.textContent = `₹${DELIVERY_CHARGE}`;
    summaryGst.textContent = `₹${Math.round(gst)}`;
    summaryGrandTotal.textContent = `₹${Math.round(grandTotal)}`;

    cartItemsList.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const delta = btn.dataset.action === 'increase' ? 1 : -1;
        changeQuantity(btn.dataset.name, delta);
      });
    });

    cartItemsList.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => removeFoodFromCart(btn.dataset.name));
    });
  }

  cartButton.addEventListener('click', openCartDrawer);
  cartClose.addEventListener('click', closeCartDrawer);
  cartOverlay.addEventListener('click', closeCartDrawer);
  continueShopping.addEventListener('click', closeCartDrawer);
  document.addEventListener('click', (event) => {
    const clickedInsideDrawer = cartDrawer.contains(event.target);
    const clickedCartButton = cartButton.contains(event.target);
    if(cartDrawer.classList.contains('open') && !clickedInsideDrawer && !clickedCartButton){
      closeCartDrawer();
    }
  });
  document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape' && cartDrawer.classList.contains('open')) closeCartDrawer();
  });

  function renderMenu(diet){
    menuGrid.innerHTML = '';
    const filtered = foodItems.filter(item => item.diet === diet);
    filtered.forEach((item, i) => {
      const card = document.createElement('div');
      card.className = 'food-card';
      card.dataset.name = item.name;
      card.dataset.price = item.price;
      card.dataset.img = item.img;
      card.style.animationDelay = (i * 0.08) + 's';
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
    observeReveals();
    attachRippleTo(menuGrid.querySelectorAll('.ripple'));
    attachAddToCart();
  }

  function attachAddToCart(){
    menuGrid.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.addEventListener('click', function(){
        const card = this.closest('.food-card');
        const name = card.dataset.name;
        const price = Number(card.dataset.price);
        const img = card.dataset.img;

        addFoodToCart(name, price, img, true);

        this.textContent = 'Added ✓';
        this.classList.add('added');
        setTimeout(() => {
          this.textContent = 'Add to Cart';
          this.classList.remove('added');
        }, 1600);
      });
    });
  }

  // Menu section filter buttons
  const menuFilterBtns = document.querySelectorAll('.menu-filter-btn');
  menuFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      menuFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.dataset.filter);
      syncDietButtons(btn.dataset.filter);
    });
  });

  // Navbar veg / non-veg quick filters (desktop + mobile) also drive the menu
  const dietBtns = document.querySelectorAll('.diet-btn');
  function syncDietButtons(diet){
    dietBtns.forEach(b => {
      const active = b.dataset.diet === diet;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', active);
    });
  }
  dietBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const diet = btn.dataset.diet;
      syncDietButtons(diet);
      menuFilterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === diet));
      renderMenu(diet);
      document.getElementById('menu').scrollIntoView({ behavior:'smooth' });
    });
  });

  syncDietButtons('veg');
  menuFilterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === 'veg'));
  renderMenu('veg'); // initial paint
  renderCart();
