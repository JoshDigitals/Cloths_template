document.addEventListener('DOMContentLoaded', function() {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // Mock product data (in a real app, this would come from an API)
  const products = {
    '1': {
      title: 'Classic Denim Jacket',
      price: 89.99,
      oldPrice: null,
      description: 'A timeless denim jacket that never goes out of style. Made from premium quality denim with a comfortable fit.',
      colors: ['blue', 'black', 'grey'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      images: [
        'https://images.pexels.com/photos/2853909/pexels-photo-2853909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/2853908/pexels-photo-2853908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/2853907/pexels-photo-2853907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      details: {
        material: '100% Cotton Denim',
        care: 'Machine wash cold',
        fit: 'Regular fit',
        closure: 'Button front',
        pockets: '4 pockets'
      }
    },
    // Add more products here
  };

  const product = products[productId];

  if (!product) {
    // Handle invalid product ID
    window.location.href = '/404.html';
    return;
  }

  // Populate product details
  document.getElementById('product-title').textContent = product.title;
  document.getElementById('product-price').textContent = `$${product.price}`;
  if (product.oldPrice) {
    document.getElementById('product-old-price').textContent = `$${product.oldPrice}`;
  }
  document.getElementById('product-description').textContent = product.description;

  // Set main image
  const mainImage = document.getElementById('product-main-image');
  mainImage.src = product.images[0];
  mainImage.alt = product.title;

  // Populate thumbnail images
  const thumbnailContainer = document.querySelector('.thumbnail-images');
  product.images.forEach((image, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = image;
    thumbnail.alt = `${product.title} - View ${index + 1}`;
    thumbnail.className = index === 0 ? 'active' : '';
    thumbnail.addEventListener('click', () => {
      document.querySelectorAll('.thumbnail-images img').forEach(img => img.classList.remove('active'));
      thumbnail.classList.add('active');
      mainImage.src = image;
    });
    thumbnailContainer.appendChild(thumbnail);
  });

  // Populate color options
  const colorOptions = document.getElementById('color-options');
  product.colors.forEach(color => {
    const colorBtn = document.createElement('button');
    colorBtn.className = 'color-option';
    colorBtn.setAttribute('data-color', color);
    colorBtn.style.backgroundColor = color;
    colorOptions.appendChild(colorBtn);
  });

  // Populate size options
  const sizeOptions = document.getElementById('size-options');
  product.sizes.forEach(size => {
    const sizeBtn = document.createElement('button');
    sizeBtn.className = 'size-option';
    sizeBtn.textContent = size;
    sizeOptions.appendChild(sizeBtn);
  });

  // Handle color selection
  colorOptions.addEventListener('click', (e) => {
    if (e.target.classList.contains('color-option')) {
      document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
    }
  });

  // Handle size selection
  sizeOptions.addEventListener('click', (e) => {
    if (e.target.classList.contains('size-option')) {
      document.querySelectorAll('.size-option').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
    }
  });

  // Handle quantity controls
  const quantityInput = document.getElementById('quantity');
  document.querySelector('.quantity-decrease').addEventListener('click', () => {
    if (quantityInput.value > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
    }
  });

  document.querySelector('.quantity-increase').addEventListener('click', () => {
    if (quantityInput.value < 10) {
      quantityInput.value = parseInt(quantityInput.value) + 1;
    }
  });

  // Handle image zoom
  const zoomBtn = document.querySelector('.zoom-btn');
  const zoomModal = document.querySelector('.zoom-modal');
  const zoomedImage = document.getElementById('zoomed-image');
  const closeZoom = document.querySelector('.close-zoom');

  zoomBtn.addEventListener('click', () => {
    zoomModal.classList.add('active');
    zoomedImage.src = mainImage.src;
    document.body.style.overflow = 'hidden';
  });

  closeZoom.addEventListener('click', () => {
    zoomModal.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Handle tab switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Populate tab contents
  document.getElementById('description').innerHTML = `
    <div class="tab-inner">
      <p>${product.description}</p>
    </div>
  `;

  let detailsHTML = '<div class="tab-inner"><table class="details-table">';
  for (const [key, value] of Object.entries(product.details)) {
    detailsHTML += `
      <tr>
        <th>${key.charAt(0).toUpperCase() + key.slice(1)}</th>
        <td>${value}</td>
      </tr>
    `;
  }
  detailsHTML += '</table></div>';
  document.getElementById('details').innerHTML = detailsHTML;

  // Mock reviews data
  const reviews = [
    {
      name: 'John D.',
      rating: 5,
      date: '2025-01-15',
      comment: 'Great quality and perfect fit!'
    },
    {
      name: 'Sarah M.',
      rating: 4,
      date: '2025-01-10',
      comment: 'Nice jacket, but runs a bit large.'
    }
  ];

  let reviewsHTML = '<div class="tab-inner">';
  reviews.forEach(review => {
    reviewsHTML += `
      <div class="review">
        <div class="review-header">
          <div class="review-rating">
            ${Array(5).fill('').map((_, i) => 
              `<i class="fas fa-star${i < review.rating ? '' : '-o'}"></i>`
            ).join('')}
          </div>
          <div class="review-meta">
            <span class="review-author">${review.name}</span>
            <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
          </div>
        </div>
        <p class="review-comment">${review.comment}</p>
      </div>
    `;
  });
  reviewsHTML += '</div>';
  document.getElementById('reviews').innerHTML = reviewsHTML;
});