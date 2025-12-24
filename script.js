// script.js
document.addEventListener('DOMContentLoaded', function() {
  // ========== NAVIGATION ==========
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.innerHTML = navMenu.classList.contains('active') 
          ? '<i class="fas fa-times"></i>' 
          : '<i class="fas fa-bars"></i>';
  });
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      });
  });
  
  // Update active nav link on scroll
  window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (scrollY >= (sectionTop - 200)) {
              current = section.getAttribute('id');
          }
      });
      
      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
              link.classList.add('active');
          }
      });
  });
  
  // ========== HERO SLIDER ==========
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlide = 0;
  let slideInterval;
  
  // Initialize slider
  function initSlider() {
      updateSlider();
      startAutoSlide();
  }
  
  // Update slider display
  function updateSlider() {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
  }
  
  // Next slide
  function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
  }
  
  // Previous slide
  function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
  }
  
  // Auto slide
  function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 5000);
  }
  
  // Stop auto slide on interaction
  function stopAutoSlide() {
      clearInterval(slideInterval);
  }
  
  // Event listeners for slider
  prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
  });
  
  nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
  });
  
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          currentSlide = index;
          updateSlider();
          stopAutoSlide();
          startAutoSlide();
      });
  });
  
  // ========== DRINKS CATALOG ==========
  const drinksGrid = document.getElementById('drinksGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const drinks = [
    
      {
          id: 1,
          name: "Margarita",
          category: "cocktail",
          price: 12.99,
          image: "images/Margarita Cocktail.png",
          description: "100% agave tequila, orange liqueur, and fresh lime juice."
      },

      {
          id: 2,
          name: "Sake Nigori",
          category: "asiatiques",
          price: 9.00,
          image: "images/Sake Nigori asiatiques.png",
          description: "Saké japonais non filtré, à l'aspect laiteux et au goût naturellement doux et fruité."
      },

      {
          id: 3,
          name: "Irish Coffee",
          category: "chaudes spécialités",
          price: 12.00,
          image: "images/Irish Coffee chaudes spécialités.png",
          description: "Café, whisky irlandais, crème."
      },

      {
          id: 4,
          name: "Raib with red berries and vanilla ",
          category: "non-alcoholic",
          price: 6.50,
          image: "images/Raib with red berries and vanilla Non-Alcoholic.png",
          description: "Lait fermenté marocain onctueux, parfumé à la vanille et agrémenté d'un coulis de fruits rouges."
      },

      {
          id: 5,
          name: "Piña Colada ",
          category: "cocktail",
          price: 14.50,
          image: "images/Piña Colada Cocktail.png",
          description: "L'évasion tropicale ultime. Rhum, crème de coco et jus d'ananas frais, mixés pour une texture crémeuse et onctueuse."
      },

      {
          id: 6,
          name: "Thai Iced Tea ",
          category: "asiatiques",
          price: 7.50,
          image: "images/Thai Iced Tea asiatiques.png",
          description: "Thé noir, lait concentré,Sucré, crémeux."
      },

      {
          id: 7,
          name: "Thé Matcha Latte chaudes.png",
          category: "chaudes spécialités",
          price: 9.50,
          image: "images/Thé Matcha Latte chaudes.png",
          description: " Matcha vert vif battu à la main et adouci avec du lait d'amande."
      },

      {
          id: 8,
          name: "Thé à la Menthe",
          category: "non-alcoholic",
          price: 5.99,
          image: "images/Thé à la Menthe Non-Alcoholic.png",
          description: "La boisson nationale, symbole d'accueil. Préparée et servie avec cérémonie"
      },

      {
          id: 9,
          name: "pineapple Mojito ",
          category: "cocktail",
          price: 13.25,
          image: "images/pineapple Mojito cocktail.png",
          description: "Rhum, menthe, citron vert et ananas frais pour un équilibre rafraîchissant et fruité."
      },

      {
        id: 10,
        name: "Yakult Shots",
        category: "asiatiques",
        price: 4.50,
        image: "images/Yakult Shots asiatiques.png",
        description: "Goût doux et acidulé. Parfait pour la digestion."
    },

    {
        id: 11,
        name: "Soju",
        category: "asiatiques",
        price: 12.25,
        image: "images/Soju asiatiques.png",
        description: "goût doux et acidulé. Parfait pour la digestion."
    },

    {
        id: 12,
        name: "Vin Chaud chaudes.png",
        category: "chaudes spécialités",
        price: 9.25,
        image: "images/Vin Chaud chaudes.png",
        description: "Spiritueux national coréen, distillé à partir de riz. Lisse, léger et légèrement sucré, se boit pur ou en cocktail."
    }

  ];
  
  // Render drinks
  function renderDrinks(filter = 'all') {
      drinksGrid.innerHTML = '';
      const filteredDrinks = filter === 'all' 
          ? drinks 
          : drinks.filter(drink => drink.category === filter);
      
      filteredDrinks.forEach((drink, index) => {
          const drinkCard = document.createElement('div');
          drinkCard.className = 'drink-card';
          drinkCard.dataset.category = drink.category;
          
          // Add animation delay
          drinkCard.style.animationDelay = `${index * 0.1}s`;
          
          drinkCard.innerHTML = `
              <img src="${drink.image}" alt="${drink.name}" class="drink-img">
              <div class="drink-info">
                  <span class="drink-category">${drink.category.toUpperCase()}</span>
                  <h3 class="drink-name">${drink.name}</h3>
                  <p class="drink-description">${drink.description}</p>
                  <div class="drink-footer">
                      <span class="drink-price">$${drink.price.toFixed(2)}</span>
                      <button class="add-to-cart" data-id="${drink.id}">
                          <i class="fas fa-plus"></i>
                      </button>
                  </div>
              </div>
          `;
          
          drinksGrid.appendChild(drinkCard);
          
          // Add to cart functionality
          const addToCartBtn = drinkCard.querySelector('.add-to-cart');
          addToCartBtn.addEventListener('click', () => addToCart(drink));
          
          // Add animation on scroll
          setTimeout(() => {
              drinkCard.classList.add('visible');
          }, 100);
      });
  }
  
  // Filter drinks
  filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
          // Update active filter button
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          // Filter drinks
          const filter = btn.dataset.filter;
          renderDrinks(filter);
      });
  });
  
  // ========== SHOPPING CART ==========
  const cartModal = document.getElementById('cartModal');
  const cartToggle = document.getElementById('cartToggle');
  const closeCart = document.getElementById('closeCart');
  const cartBody = document.getElementById('cartBody');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  const emptyCart = document.getElementById('emptyCart');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const orderModal = document.getElementById('orderModal');
  const closeOrderModal = document.getElementById('closeOrderModal');
  const orderId = document.getElementById('orderId');
  
  let cart = JSON.parse(localStorage.getItem('drinksCart')) || [];
  
  // Toggle cart modal
  cartToggle.addEventListener('click', (e) => {
      e.preventDefault();
      cartModal.classList.add('active');
      updateCartDisplay();
  });
  
  closeCart.addEventListener('click', () => {
      cartModal.classList.remove('active');
  });
  
  // Close cart when clicking outside
  window.addEventListener('click', (e) => {
      if (e.target === cartModal) {
          cartModal.classList.remove('active');
      }
  });
  
  // Add to cart function
  function addToCart(drink) {
      // Check if item already in cart
      const existingItem = cart.find(item => item.id === drink.id);
      
      if (existingItem) {
          existingItem.quantity += 1;
      } else {
          cart.push({
              ...drink,
              quantity: 1
          });
      }
      
      // Update cart
      updateCart();
      
      // Show feedback animation
      const addBtn = document.querySelector(`.add-to-cart[data-id="${drink.id}"]`);
      addBtn.innerHTML = '<i class="fas fa-check"></i>';
      addBtn.style.backgroundColor = '#28a745';
      
      setTimeout(() => {
          addBtn.innerHTML = '<i class="fas fa-plus"></i>';
          addBtn.style.backgroundColor = '';
      }, 1000);
  }
  
  // Update cart
  function updateCart() {
      // Save to localStorage
      localStorage.setItem('drinksCart', JSON.stringify(cart));
      
      // Update cart count
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalItems;
      
      // Update cart display if modal is open
      if (cartModal.classList.contains('active')) {
          updateCartDisplay();
      }
  }
  
  // Update cart display
  function updateCartDisplay() {
      if (cart.length === 0) {
          cartBody.innerHTML = emptyCart.outerHTML;
          cartTotal.textContent = '$0.00';
          return;
      }
      
      let cartHTML = '';
      let total = 0;
      
      cart.forEach(item => {
          const itemTotal = item.price * item.quantity;
          total += itemTotal;
          
          cartHTML += `
              <div class="cart-item" data-id="${item.id}">
                  <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                  <div class="cart-item-info">
                      <h4 class="cart-item-name">${item.name}</h4>
                      <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                      <div class="cart-item-controls">
                          <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                          <span class="quantity">${item.quantity}</span>
                          <button class="quantity-btn increase" data-id="${item.id}">+</button>
                          <button class="remove-item" data-id="${item.id}">
                              <i class="fas fa-trash"></i>
                          </button>
                      </div>
                  </div>
              </div>
          `;
      });
      
      cartBody.innerHTML = cartHTML;
      cartTotal.textContent = `$${total.toFixed(2)}`;
      
      // Add event listeners to cart controls
      document.querySelectorAll('.decrease').forEach(btn => {
          btn.addEventListener('click', () => updateQuantity(btn.dataset.id, -1));
      });
      
      document.querySelectorAll('.increase').forEach(btn => {
          btn.addEventListener('click', () => updateQuantity(btn.dataset.id, 1));
      });
      
      document.querySelectorAll('.remove-item').forEach(btn => {
          btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
      });
  }
  
  // Update item quantity
  function updateQuantity(id, change) {
      const item = cart.find(item => item.id === parseInt(id));
      if (item) {
          item.quantity += change;
          
          if (item.quantity < 1) {
              cart = cart.filter(item => item.id !== parseInt(id));
          }
          
          updateCart();
      }
  }
  
  // Remove item from cart
  function removeFromCart(id) {
      cart = cart.filter(item => item.id !== parseInt(id));
      updateCart();
  }
  
  // Checkout
  checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
          alert('Your cart is empty!');
          return;
      }
      
      // Generate order ID
      const newOrderId = 'ELX-' + Date.now().toString().slice(-8);
      orderId.textContent = newOrderId;
      
      // Show order confirmation
      orderModal.classList.add('active');
      
      // Clear cart
      cart = [];
      updateCart();
      
      // Close cart modal
      cartModal.classList.remove('active');
  });
  
  // Close order modal
  closeOrderModal.addEventListener('click', () => {
      orderModal.classList.remove('active');
  });
  
  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contactForm');
  
  contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // In a real application, you would send this data to a server
      console.log('Contact form submitted:', data);
      
      // Show success message
      alert('Thank you for your message! We will get back to you soon.');
      
      // Reset form
      contactForm.reset();
  });
  
  // ========== SCROLL ANIMATIONS ==========
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animated');
          }
      });
  }, observerOptions);
  
  // Observe elements for scroll animations
  document.querySelectorAll('.drink-card, .stat, .info-card').forEach(el => {
      observer.observe(el);
  });
  
  // ========== SCROLL TO TOP ==========
  const scrollTopBtn = document.getElementById('scrollTop');
  
  window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
          scrollTopBtn.classList.add('visible');
      } else {
          scrollTopBtn.classList.remove('visible');
      }
  });
  
  scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
  
  // ========== INITIALIZE ==========
  initSlider();
  renderDrinks();
  updateCart();
  
  // Initialize scroll animations for already visible elements
  setTimeout(() => {
      document.querySelectorAll('.drink-card').forEach(card => {
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) {
              card.classList.add('visible');
          }
      });
  }, 500);
});