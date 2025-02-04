if (typeof products === 'undefined' || !products.trending_products) {
  console.error("Error: 'products' is not defined.");
} else {
  // DOM Elements
  const productsGrid = document.getElementById('productsGrid');
  const quickViewModal = document.getElementById('quickViewModal');
  const thankYouPage = document.getElementById('thankYouPage');

  let currentProduct = null;
  let currentQuantity = 1;

  // Initialize products
  function initializeProducts() {
    productsGrid.innerHTML = products.trending_products.map(product => `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-image-container">
          <img class="product-image" src="${product.images[0]}" alt="${product.title}">
          <div class="quick-view-button">
            <button onclick="navigateToProductDetails('${product.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              クイックビュー
            </button>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <div class="price-container">
            <span class="price">$${product.price.toFixed(2)}</span>
            ${product.comparePrice ? `<span class="compare-price">$${product.comparePrice.toFixed(2)}</span>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    // Add hover image swap
    document.querySelectorAll('.product-card').forEach(card => {
      const productId = parseInt(card.dataset.productId);
      const product = products.trending_products.find(p => p.id === productId);
      const image = card.querySelector('.product-image');

      if (product && product.images.length > 1) {
        card.addEventListener('mouseenter', () => image.src = product.images[1]);
        card.addEventListener('mouseleave', () => image.src = product.images[0]);
      }
    });
  }

  function navigateToProductDetails(productId) {
    window.location.href = `product-details.html?productId=${productId}`;
  }

  // Initialize the page
  initializeProducts();

  // Close modal when clicking outside
  if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) closeQuickView();
    });
  }
}