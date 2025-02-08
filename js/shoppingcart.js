const API_URL = 'https://products-database-7e889-default-rtdb.asia-southeast1.firebasedatabase.app/.json';

// Cart state management
let cartItems = [];
let currentProduct = null;

// Fetch product data from Firebase
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
}

// Update cart total
function updateCartTotal() {
    const subtotalElement = document.querySelector('.sidebar .price');
    const quantitySelector = document.querySelector('.quantity-selector');
    const quantity = parseInt(quantitySelector.value);
    
    if (currentProduct) {
        const total = (currentProduct.price * quantity).toFixed(2);
        subtotalElement.textContent = `US $${total}`;
    }
}

// Handle quantity change
function handleQuantityChange(event) {
    updateCartTotal();
    // Update cart state
    if (currentProduct) {
        currentProduct.quantity = parseInt(event.target.value);
    }
}

// Handle remove item
function handleRemoveItem() {
    const productCard = document.querySelector('.product-card');
    if (productCard) {
        productCard.remove();
        currentProduct = null;
        cartItems = [];
        
        // Update sidebar
        const subtotalElement = document.querySelector('.sidebar .price');
        subtotalElement.textContent = 'US $0.00';
    }
}

// Handle save for later
function handleSaveForLater() {
    // This would typically interact with a user's account
    alert('Please sign in to save items for later');
}

// Handle checkout
function handleCheckout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty');
        return;
    }
    
    // This would typically redirect to a checkout page
    alert('Proceeding to checkout...');
}

// Initialize related products
async function initializeRelatedProducts() {
    const products = await fetchProducts();
    if (!products) return;

    const relatedGrid = document.querySelector('.related-grid');
    if (!relatedGrid) return;

    // Clear existing related items
    relatedGrid.innerHTML = '';

    // Add products from the API
    products.forEach(product => {
        const relatedItem = document.createElement('div');
        relatedItem.className = 'related-item';
        relatedItem.innerHTML = `
            <img src="${product.image || 'placeholder-image.jpg'}" alt="${product.name}">
            <a href="#"><p>${product.name}</p></a>
            <a href="#"><p>${product.condition || 'New'}</p></a>
            <div class="price">$${product.price?.toFixed(2) || '0.00'}</div>
            <a href="#"><h3>${product.shipping === 0 ? 'Free Shipping' : '+ Shipping'}</h3></a>
            <a href="#"><p>Seller with ${product.sellerRating || '100%'} positive feedback</p></a>
        `;
        relatedGrid.appendChild(relatedItem);
    });
}

// Initialize the page
function initializePage() {
    // Set up event listeners
    const quantitySelector = document.querySelector('.quantity-selector');
    if (quantitySelector) {
        quantitySelector.addEventListener('change', handleQuantityChange);
    }

    const removeLink = document.querySelector('.save a:last-child');
    if (removeLink) {
        removeLink.addEventListener('click', (e) => {
            e.preventDefault();
            handleRemoveItem();
        });
    }

    const saveLink = document.querySelector('.save a:first-child');
    if (saveLink) {
        saveLink.addEventListener('click', (e) => {
            e.preventDefault();
            handleSaveForLater();
        });
    }

    const checkoutButton = document.querySelector('.checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', handleCheckout);
    }

    // Set initial product data
    currentProduct = {
        price: 398.68,
        quantity: 1
    };
    cartItems = [currentProduct];

    // Initialize related products
    initializeRelatedProducts();
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);