// bakery.js
// Add interactive features for the modern pastel bakery site

document.addEventListener('DOMContentLoaded', function() {
  // Example: Soft fade-in for main content
  const main = document.querySelector('main');
  if (main) {
    main.style.opacity = 0;
    main.style.transition = 'opacity 1.2s cubic-bezier(0.77,0,0.175,1)';
    setTimeout(() => { main.style.opacity = 1; }, 100);
  }

  // Example: Navigation highlight for current page
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    if (window.location.pathname.endsWith(link.getAttribute('href'))) {
      link.style.background = 'var(--mint)';
      link.style.color = 'var(--caramel)';
      link.style.fontWeight = '600';
    }
  });

  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinksMobile = document.querySelector('.nav-links');
  if (hamburger && navLinksMobile) {
    hamburger.addEventListener('click', function() {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
      navLinksMobile.classList.toggle('open');
    });
    // Close menu on link click (mobile UX)
    navLinksMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksMobile.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Fade-in for hero text and button
  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
  });
  setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach(el => {
      el.style.opacity = '';
      el.style.transform = '';
    });
  }, 100);

  // Navigation highlight for current page
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (window.location.pathname.endsWith(link.getAttribute('href'))) {
      link.style.background = 'var(--mint)';
      link.style.color = 'var(--caramel)';
      link.style.fontWeight = '600';
    }
  });

  // --- Order Section & Cart Functionality ---
  function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    cartList.innerHTML = '';
    let total = 0;
    Object.entries(cart).forEach(([product, {qty, price, img}]) => {
      if (qty > 0) {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${img}" alt="" style="width:32px;height:32px;border-radius:8px;margin-right:8px;vertical-align:middle;"> <span>${product}</span> <span style="margin:0 8px;">x${qty}</span> <span style="color:var(--caramel);font-weight:600;">$${qty*price}</span>`;
        cartList.appendChild(li);
        total += qty * price;
      }
    });
    cartTotal.textContent = total;
  }

  function setQty(product, qty) {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (!cart[product]) return;
    cart[product].qty = Math.max(0, qty);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }

  // Order section logic
  const orderCards = document.querySelectorAll('.order-card');
  let cart = JSON.parse(localStorage.getItem('cart') || '{}');
  orderCards.forEach(card => {
    const product = card.getAttribute('data-product');
    const price = Number(card.getAttribute('data-price'));
    const img = card.querySelector('img').src;
    if (!cart[product]) cart[product] = {qty:0, price, img};
    const minus = card.querySelector('.qty-btn.minus');
    const plus = card.querySelector('.qty-btn.plus');
    const qtySpan = card.querySelector('.qty');
    minus.addEventListener('click', () => {
      cart[product].qty = Math.max(0, cart[product].qty - 1);
      qtySpan.textContent = cart[product].qty;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartDisplay();
    });
    plus.addEventListener('click', () => {
      cart[product].qty += 1;
      qtySpan.textContent = cart[product].qty;
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartDisplay();
    });
    qtySpan.textContent = cart[product].qty;
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();

  // Cart panel open/close
  const openCartBtn = document.querySelector('.open-cart-btn');
  const cartPanel = document.getElementById('cartPanel');
  const closeCartBtn = document.querySelector('.close-cart');
  openCartBtn.addEventListener('click', () => {
    cartPanel.classList.add('open');
  });
  closeCartBtn.addEventListener('click', () => {
    cartPanel.classList.remove('open');
  });
});
