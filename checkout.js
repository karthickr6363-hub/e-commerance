// Sample order items from cart
const orderItems = [
    {
        id: 1,
        name: 'Wireless Headphones',
        image: 'https://images.pexels.com/photos/164929/pexels-photo-164929.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: 79.99,
        quantity: 1
    },
    {
        id: 2,
        name: 'Smart Watch',
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: 199.99,
        quantity: 1
    },
    {
        id: 3,
        name: 'Running Shoes',
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: 89.99,
        quantity: 2
    }
];

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    loadOrderItems();
    initializeShippingToggle();
    initializePaymentToggle();
    initializeCardInputs();
    initializeFormValidation();
});

// Load order items into summary
function loadOrderItems() {
    const itemsContainer = document.getElementById('orderItems');
    itemsContainer.innerHTML = '';
    
    orderItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'summary-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="summary-item-image">
            <div class="summary-item-details">
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="summary-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        `;
        itemsContainer.appendChild(itemElement);
    });
    
    updateTotals();
}

// Update order totals
function updateTotals() {
    let subtotal = 0;
    orderItems.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('tax').textContent = '$' + tax.toFixed(2);
    document.getElementById('grandTotal').textContent = '$' + total.toFixed(2);
}

// Toggle shipping fields based on checkbox
function initializeShippingToggle() {
    const sameAsBilling = document.getElementById('sameAsBilling');
    const shippingFields = document.getElementById('shippingFields');
    
    sameAsBilling.addEventListener('change', function() {
        shippingFields.style.display = this.checked ? 'none' : 'block';
    });
}

// Toggle card details based on payment method
function initializePaymentToggle() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById('cardDetails');
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
}

// Format card input fields
function initializeCardInputs() {
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCVC = document.getElementById('cardCVC');
    
    // Format card number
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue.substring(0, 19);
        });
    }
    
    // Format expiry date
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // Format CVC
    if (cardCVC) {
        cardCVC.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
        });
    }
}

// Initialize form validation
function initializeFormValidation() {
    const form = document.querySelector('.checkout-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Validation handled by HTML5 required attributes
        });
    }
}

// Place order
function placeOrder() {
    // Get form data
    const billingInfo = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        zip: document.getElementById('zip').value,
        country: document.getElementById('country').value
    };
    
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    const cardInfo = {};
    if (paymentMethod === 'card') {
        cardInfo.cardNumber = document.getElementById('cardNumber').value;
        cardInfo.cardExpiry = document.getElementById('cardExpiry').value;
        cardInfo.cardCVC = document.getElementById('cardCVC').value;
        cardInfo.cardName = document.getElementById('cardName').value;
    }
    
    // Basic validation
    if (!billingInfo.firstName || !billingInfo.lastName || !billingInfo.email || 
        !billingInfo.phone || !billingInfo.address || !billingInfo.city || 
        !billingInfo.zip || !billingInfo.country) {
        alert('Please fill in all required billing information fields.');
        return;
    }
    
    if (paymentMethod === 'card') {
        if (!cardInfo.cardNumber || !cardInfo.cardExpiry || !cardInfo.cardCVC || !cardInfo.cardName) {
            alert('Please fill in all card details.');
            return;
        }
    }
    
    // Show loading
    const orderBtn = document.querySelector('.place-order-btn');
    const originalText = orderBtn.innerHTML;
    orderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    orderBtn.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
        // In a real application, this would send data to a server
        alert('Order placed successfully! Your order number is: #ORD' + Date.now());
        
        // Reset button
        orderBtn.innerHTML = originalText;
        orderBtn.disabled = false;
        
        // Redirect to success page or home
        window.location.href = 'index.html';
    }, 2000);
}

// Add to order summary from localStorage (if coming from cart)
window.addEventListener('storage', function(e) {
    if (e.key === 'cartItems') {
        loadOrderItems();
    }
});

// Load from localStorage on page load
if (localStorage.getItem('cartItems')) {
    try {
        const savedItems = JSON.parse(localStorage.getItem('cartItems'));
        if (Array.isArray(savedItems) && savedItems.length > 0) {
            Object.assign(orderItems, savedItems);
            loadOrderItems();
        }
    } catch (error) {
        console.error('Error loading cart items:', error);
    }
}

