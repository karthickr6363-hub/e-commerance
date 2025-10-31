// Update Quantity
function updateQuantity(itemId, change) {
    const item = document.querySelector(`.cart-item[data-id="${itemId}"]`);
    const qtyInput = item.querySelector('.qty-input');
    let quantity = parseInt(qtyInput.value) + change;
    
    if (quantity < 1) return;
    
    qtyInput.value = quantity;
    
    // Update subtotal
    const price = parseFloat(item.querySelector('.subtotal-price').getAttribute('data-price'));
    const subtotal = (price * quantity).toFixed(2);
    item.querySelector('.subtotal-price').textContent = '$' + subtotal;
    
    // Update totals
    updateTotals();
}

// Remove Item
function removeItem(itemId) {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
        const item = document.querySelector(`.cart-item[data-id="${itemId}"]`);
        item.style.transform = 'translateX(-100%)';
        item.style.opacity = '0';
        
        setTimeout(() => {
            item.remove();
            updateTotals();
        }, 300);
    }
}

// Update Totals
function updateTotals() {
    const items = document.querySelectorAll('.cart-item');
    let subtotal = 0;
    
    items.forEach(item => {
        const price = parseFloat(item.querySelector('.subtotal-price').textContent.replace('$', ''));
        subtotal += price;
    });
    
    // Calculate tax (8%)
    const tax = subtotal * 0.08;
    
    // Update display
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('tax').textContent = '$' + tax.toFixed(2);
    document.getElementById('total').textContent = '$' + (subtotal + tax).toFixed(2);
    
    // Update cart summary in header
    document.getElementById('cartTotal').textContent = '$' + (subtotal + tax).toFixed(2);
    
    // Update item count
    document.getElementById('itemCount').textContent = items.length;
}

// Checkout Button
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.querySelector('.btn-checkout');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('Redirecting to checkout page...');
            // In a real application, this would navigate to the checkout page
        });
    }
});

// Initialize totals on page load
document.addEventListener('DOMContentLoaded', updateTotals);




