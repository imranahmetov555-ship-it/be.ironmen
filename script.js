const products = [
  {
    id: 1,
    category: 'товар',
    title: 'Креатиновые мармеладки Iron X1 8000 mg',
    description: 'Вкусные жевательные мармеладки с креатином для быстрого восстановления после тренировки.',
    price: '8 490 ₽',
    image: 'https://img5.lalafo.com/i/posters/original/c8/6d/0c/kreatin-marmelady-8000-mg-vkusno-id-74611902-862779290.jpeg',
    fullDescription: 'Жевательный креатин Iron X1 в форме мармеладок — удобная добавка для поддержки силы и выносливости на тренировках.',
    specs: ['Доза: 8000 mg креатина на порцию', 'Форма: жевательные мармеладки', 'Упаковка: 30 порций', 'Состав: креатин моногидрат, ароматизаторы']
  },
  {
    id: 2,
    category: 'товар',
    title: 'Креатин Pro Grip',
    description: 'Порошковый креатин для роста силы, выносливости и быстрого восстановления.',
    price: '3 190 ₽',
    image: 'https://100pudov.kg/wp-content/uploads/2022/12/gss-l-creatine.webp',
    fullDescription: 'Классический креатин Pro Grip легко растворяется и помогает увеличить силу, объем и восстановление после интенсивных тренировок.',
    specs: ['Форма: порошок', 'Вес: 300 г', 'Состав: креатин моногидрат 100%', 'Рекомендация: 3–5 г в день']
  }
];

const productGrid = document.getElementById('productGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card animate-on-scroll';
  card.dataset.category = product.category;
  card.innerHTML = `
    <div class="product-media" style="background-image: url('${product.image}')"></div>
    <div class="product-info">
      <p class="product-category">${product.category}</p>
      <h3 class="product-title">${product.title}</h3>
      <p class="product-description">${product.description}</p>
      <ul class="product-specs">
        ${product.specs.slice(0, 3).map((spec) => `<li>${spec}</li>`).join('')}
      </ul>
      <div class="product-bottom">
        <span class="price">${product.price}</span>
        <button class="add-btn" type="button">Купить</button>
      </div>
      <button class="details-btn" data-product-id="${product.id}" type="button">Подробнее</button>
    </div>
  `;
  return card;
}

function renderProducts(filter = 'all') {
  productGrid.innerHTML = '';
  const filtered = products.filter((item) => filter === 'all' || item.category === filter);
  filtered.forEach((product) => productGrid.appendChild(createProductCard(product)));
  attachDetailsButtons();
  observeScrollAnimations();
}

function attachDetailsButtons() {
  const detailsButtons = document.querySelectorAll('.details-btn');
  detailsButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt(e.target.dataset.productId);
      const product = products.find((p) => p.id === productId);
      if (product) openModal(product);
    });
  });
}

function openModal(product) {
  const modal = document.getElementById('productModal');
  const modalContent = document.querySelector('.modal-content');
  
  modalContent.innerHTML = `
    <button class="modal-close" aria-label="Закрыть">✕</button>
    <div class="modal-body">
      <div class="modal-image-wrapper">
        <img src="${product.image}" alt="${product.title}" class="modal-image" />
      </div>
      <div class="modal-details">
        <h2 class="modal-title">${product.title}</h2>
        <p class="modal-price">${product.price}</p>
        <p class="modal-full-desc">${product.fullDescription}</p>
        <div class="modal-specs">
          <h3>Характеристики:</h3>
          <ul>
            ${product.specs.map((spec) => `<li>${spec}</li>`).join('')}
          </ul>
        </div>
        <button class="btn btn-primary" type="button">Добавить в корзину</button>
      </div>
    </div>
  `;
  
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  
  const closeBtn = modalContent.querySelector('.modal-close');
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

function closeModal() {
  const modal = document.getElementById('productModal');
  modal.classList.remove('open');
  document.body.style.overflow = 'auto';
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    renderProducts(button.dataset.filter);
  });
});

mobileToggle.addEventListener('click', () => {
  if (navMenu.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

function openMenu() {
  navMenu.classList.add('open');
  mobileToggle.classList.add('active');
}

function closeMenu() {
  navMenu.classList.add('closing');
  mobileToggle.classList.remove('active');

  setTimeout(() => {
    navMenu.classList.remove('open', 'closing');
  }, 350);
}

const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) {
    closeMenu();
  }
});

function observeScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((element) => observer.observe(element));
}

renderProducts();
observeScrollAnimations();
