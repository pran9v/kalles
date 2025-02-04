// DOM Elements
const productDetailsContent = document.getElementById('productDetailsContent');

// Get product ID from query parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('productId'));

// Find the product by ID
const product = products.trending_products.find(p => p.id === productId);

if (product) {
  const productDetailsHTML = `
    <div class="product-images">
      <div class="main-image">
        <img src="${product.images[0]}" alt="${product.title}">
      </div>
      <div class="thumbnail-grid">
        ${product.images.map((image, index) => `
          <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="updateMainImage(${index})">
            <img src="${image}" alt="${product.title} View ${index + 1}">
          </div>
        `).join('')}
      </div>
    </div>
    <div class="product-details">
      <h2 class="text-2xl font-bold mb-2">${product.title}</h2>
      <div class="price-container" style="justify-content: flex-start">
        <span class="price">$${product.price.toFixed(2)}</span>
        ${product.comparePrice ? `
          <span class="compare-price">$${product.comparePrice.toFixed(2)}</span>
        ` : ''}
      </div>
      
      <p style="margin: 1rem 0; color: #666;">${product.description}</p>
      
      <div class="product-options">

      </div>

      <div class="quantity-selector">
        <span>Quantity:</span>
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="updateQuantity(-1)">−</button>
          <span class="quantity-display">1</span>
          <button class="quantity-btn" onclick="updateQuantity(1)">+</button>
        </div>
      </div>

      <button 
        class="add-to-cart"
        onclick="window.location.href='thankyou.html'"
        ${!product.inStock ? 'disabled' : ''}
        style="${!product.inStock ? 'background-color: #e5e7eb; cursor: not-allowed;' : ''}"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>

      <div class="product-meta">
        <div class="meta-item">
          <span class="meta-label">SKU:</span>
          <span class="meta-value">${product.sku}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Stock Status:</span>
          <span class="meta-value ${product.inStock ? 'in-stock' : 'out-of-stock'}">
            ${product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Vendor:</span>
          <span class="meta-value">${product.vendor}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Material:</span>
          <span class="meta-value">${product.material}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Categories:</span>
          <span class="meta-value">${product.categories.join(', ')}</span>
        </div>
      </div>
    </div>
  `;

  productDetailsContent.innerHTML = productDetailsHTML;
} else {
  productDetailsContent.innerHTML = '<p>Product not found.</p>';
}

function updateMainImage(index) {
  const mainImage = document.querySelector('.main-image img');
  const thumbnails = document.querySelectorAll('.thumbnail');
  
  mainImage.src = product.images[index];
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

function updateQuantity(change) {
  const quantityDisplay = document.querySelector('.quantity-display');
  let currentQuantity = parseInt(quantityDisplay.textContent);
  const newQuantity = currentQuantity + change;
  if (newQuantity >= 1) {
    quantityDisplay.textContent = newQuantity;
  }
}

function addToCart() {
  if (products && product.inStock) {
    // Add to cart logic here
    alert('Product added to cart!');
  }
}