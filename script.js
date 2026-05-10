// Simple interactivity for Hiruko Yuki Store

const cartState = {
    items: [],
};

const users = JSON.parse(localStorage.getItem('users')) || {};

let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function saveCurrentUser() {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

function handleGoogleLogin(response) {
    const credential = response.credential;
    // Decode JWT to get user info
    const payload = JSON.parse(atob(credential.split('.')[1]));
    currentUser = {
        username: payload.name,
        email: payload.email,
        googleId: payload.sub,
        picture: payload.picture
    };
    saveCurrentUser();
    showNotification(`Welcome, ${payload.name}!`);
    closeLogin();
}

const cartOverlay = document.querySelector('.cart-overlay');
const cartDrawer = document.querySelector('.cart-drawer');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalEl = document.querySelector('.cart-total');
const cartCountEl = document.querySelector('.cart-count');
const cartCloseBtn = document.querySelector('.cart-close');
const checkoutBtn = document.querySelector('.checkout-btn');
const paymentOptions = document.querySelectorAll('input[name="payment-method"]');
const paymentNote = document.querySelector('.payment-note');
let selectedPaymentMethod = null;

function updateCartCount() {
    const totalItems = cartState.items.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
    cartCountEl.style.display = totalItems > 0 ? 'inline-flex' : 'none';
}

function formatCurrency(value) {
    return `RM${value.toFixed(2)}`;
}

function calculateFees(subtotal) {
    const stripeFee = 1 + (subtotal * 0.03); // RM1 + 3% - ONLY for Stripe
    return {
        subtotal: subtotal,
        stripeFee: stripeFee,
        total: subtotal + stripeFee
    };
}

function renderCartItems() {
    cartItemsContainer.innerHTML = '';

    if (cartState.items.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'cart-empty';
        emptyMessage.textContent = 'Your cart is empty.';
        cartItemsContainer.appendChild(emptyMessage);
        cartTotalEl.innerHTML = `<div class="summary-row"><span class="summary-label">Total:</span><span class="summary-value">RM0.00</span></div>`;
        return;
    }

    // Render cart items
    cartState.items.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-meta">
                    <span>${formatCurrency(item.price)}</span>
                    <button type="button" class="remove-item" data-product="${item.name}">Remove</button>
                </div>
            </div>
            <div class="cart-item-qty">
                <button type="button" class="quantity-control" data-action="decrease" data-product="${item.name}">−</button>
                <input type="number" class="quantity-input" data-product="${item.name}" value="${item.quantity}" min="1" max="999" step="1">
                <button type="button" class="quantity-control" data-action="increase" data-product="${item.name}">+</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    // Calculate and display breakdown - only show fees for Stripe
    const subtotal = cartState.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const isStripe = selectedPaymentMethod === 'stripe';
    
    let breakdownHTML = ``;
    
    if (isStripe) {
        const fees = calculateFees(subtotal);
        breakdownHTML = `
            <div class="summary-row">
                <span class="summary-label">Subtotal</span>
                <span class="summary-value">${formatCurrency(fees.subtotal)}</span>
            </div>
            <div class="summary-row summary-fee show">
                <span class="summary-label">Stripe Fee (RM1 + 3%)</span>
                <span class="summary-value">${formatCurrency(fees.stripeFee)}</span>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-row summary-total">
                <span class="summary-label">Total</span>
                <span class="summary-value">${formatCurrency(fees.total)}</span>
            </div>
        `;
    } else {
        breakdownHTML = `
            <div class="summary-row summary-total">
                <span class="summary-label">Total</span>
                <span class="summary-value">${formatCurrency(subtotal)}</span>
            </div>
        `;
    }

    cartTotalEl.innerHTML = breakdownHTML;
}

function addItemToCart(name, price, quantity = 1) {
    const existingItem = cartState.items.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity;
        if (existingItem.quantity > 999) {
            existingItem.quantity = 999;
        }
    } else {
        cartState.items.push({ name, price: Number(price), quantity: quantity });
    }
    updateCartCount();
    renderCartItems();
    showNotification(`${name} added to cart 🛒`);
}

function removeCartItem(name) {
    cartState.items = cartState.items.filter(item => item.name !== name);
    updateCartCount();
    renderCartItems();
}

function changeQuantity(name, delta) {
    const item = cartState.items.find(item => item.name === name);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity > 999) {
        item.quantity = 999;
    }
    if (item.quantity <= 0) {
        removeCartItem(name);
        return;
    }

    updateCartCount();
    renderCartItems();
}

function openCart() {
    cartOverlay.classList.add('visible');
    cartDrawer.classList.add('visible');
    cartOverlay.classList.remove('hidden');
    cartDrawer.classList.remove('hidden');
}

function closeCart() {
    cartOverlay.classList.remove('visible');
    cartDrawer.classList.remove('visible');
    setTimeout(() => {
        cartOverlay.classList.add('hidden');
        cartDrawer.classList.add('hidden');
    }, 300);
}

function initCart() {
    document.querySelectorAll('.btn.btn-outline:not(.quick-add-btn), .product-line:not(.quick-add-btn)').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.dataset.name;
            const price = this.dataset.price;
            if (!name || !price) return;
            addItemToCart(name, Number(price));
        });
    });

    document.querySelector('.cart-icon')?.addEventListener('click', function(e) {
        e.preventDefault();
        openCart();
    });

    cartOverlay.addEventListener('click', closeCart);
    cartCloseBtn.addEventListener('click', closeCart);

    cartItemsContainer.addEventListener('click', function(event) {
        const button = event.target.closest('button');
        if (!button) return;

        const productName = button.dataset.product;
        if (button.classList.contains('remove-item')) {
            removeCartItem(productName);
        }

        if (button.classList.contains('quantity-control')) {
            const delta = button.dataset.action === 'increase' ? 1 : -1;
            changeQuantity(productName, delta);
        }
    });

    cartItemsContainer.addEventListener('change', function(event) {
        if (event.target.classList.contains('quantity-input')) {
            const productName = event.target.dataset.product;
            let newQuantity = parseInt(event.target.value) || 0;

            if (newQuantity < 1) {
                newQuantity = 1;
                event.target.value = 1;
            }

            if (newQuantity > 999) {
                newQuantity = 999;
                event.target.value = 999;
            }

            const item = cartState.items.find(item => item.name === productName);
            if (item) {
                item.quantity = newQuantity;
                updateCartCount();
                renderCartItems();
            }
        }
    });

    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            selectedPaymentMethod = this.value;
            updatePaymentNote();
            renderCartItems(); // Update cart display when payment method changes
        });
    });

    checkoutBtn.addEventListener('click', async function() {
        if (cartState.items.length === 0) {
            showNotification('Your cart is empty. Add items first.');
            return;
        }

        if (!selectedPaymentMethod) {
            showNotification('Please choose a payment method before checkout.');
            return;
        }

        if (selectedPaymentMethod === 'stripe') {
            try {
                const response = await fetch("/api/pay", {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ items: cartState.items })
                });

                const data = await response.json();

                if (data.url) {
                  // Calculate and save total amount for success page
                  const subtotal = cartState.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                  const fees = calculateFees(subtotal);
                  localStorage.setItem('lastCartTotal', formatCurrency(fees.total));
                  localStorage.setItem('lastSessionId', 'SID-' + Math.random().toString(36).substr(2, 9).toUpperCase());
                  
                  showNotification('Redirecting to Stripe...');
                  window.location.href = data.url;
                } else {
                  showNotification("Stripe payment error: " + (data.error || "Unknown error"));
                }
            } catch (error) {
                showNotification("Stripe payment error: " + error.message);
            }
            return;
        }

        if (selectedPaymentMethod === 'touchngo') {
            showNotification('Redirecting to Touch \'n Go eWallet...');
            window.location.href = 'https://payment.tngdigital.com.my/sc/bDLn9A4r5u';
            return;
        }

        if (selectedPaymentMethod === 'manual') {
            showNotification('Opening WhatsApp to connect with our team...');
            setTimeout(() => {
                window.open('https://wa.me/qr/FGUOQG5YGAGUO1', '_blank');
            }, 300);
            return;
        }
    });

    updateCartCount();
    renderCartItems();
}

function updatePaymentNote() {
    if (!paymentNote) return;

    if (selectedPaymentMethod === 'stripe') {
        paymentNote.textContent = 'Stripe is ready. After checkout, you will be redirected to a secure Stripe payment page.';
        return;
    }

    if (selectedPaymentMethod === 'touchngo') {
        paymentNote.textContent = 'Touch \'n Go eWallet selected. Click checkout to proceed to payment.';
        return;
    }

    if (selectedPaymentMethod === 'manual') {
        paymentNote.textContent = 'Manual payment selected. Click checkout to connect with our team on WhatsApp (+60112-0500840).';
        return;
    }

    paymentNote.textContent = 'Select a payment method before checkout.';
}

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            showNotification('Thanks for subscribing! 💙');
            this.reset();
        }
    });
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #0077be, #00a8cc);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 119, 190, 0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Smooth scroll for nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#cart') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

initCart();

// Quick Add Modal functionality
const quickAddModal = document.querySelector('.quick-add-modal');
const quickAddOverlay = document.querySelector('.quick-add-overlay');
const quickAddClose = document.querySelector('.quick-add-close');
const quickAddCancel = document.querySelector('.quick-add-cancel');
const quickAddQtyInput = document.getElementById('quickAddQty');
const quickAddQtyDecrease = document.querySelector('.qty-decrease');
const quickAddQtyIncrease = document.querySelector('.qty-increase');
const quickAddToCartBtn = document.getElementById('quickAddToCart');
const quickAddProductName = document.getElementById('quickAddProductName');
const quickAddPrice = document.getElementById('quickAddPrice');
const quickAddTotal = document.getElementById('quickAddTotal');

// Topup Modal functionality
const topupModal = document.querySelector('.topup-modal');
const topupOverlay = document.querySelector('.topup-overlay');
const topupClose = document.querySelector('.topup-close');
const topupBack = document.querySelector('.topup-back');
const topupAmountSection = document.getElementById('topupAmountSection');
const topupProviders = document.querySelectorAll('.provider-card');
const topupAmounts = document.querySelectorAll('.amount-btn');
const topupQtyInput = document.getElementById('topupQty');
const topupQtyDecrease = document.querySelector('.qty-decrease-topup');
const topupQtyIncrease = document.querySelector('.qty-increase-topup');
const topupAddToCartBtn = document.getElementById('topupAddToCart');
const customAmountInput = document.getElementById('customAmount');
const selectedProvider = document.getElementById('selectedProvider');
const selectedAmount = document.getElementById('selectedAmount');
const selectedQty = document.getElementById('selectedQty');
const topupTotal = document.getElementById('topupTotal');

let currentQuickAddProduct = {
    name: '',
    price: 0
};

let currentTopupSelection = {
    provider: '',
    amount: 0,
    quantity: 1
};

// Bundle Print Modal functionality
const bundlePrintModal = document.querySelector('.bundle-print-modal');
const bundlePrintOverlay = document.querySelector('.bundle-print-overlay');
const bundlePrintClose = document.querySelector('.bundle-print-close');
const bundlePrintCancel = document.querySelector('.bundle-print-cancel');
const bundlePrintQtyInput = document.getElementById('bundlePrintQty');
const bundlePrintQtyDecrease = document.querySelector('.qty-decrease-bundle');
const bundlePrintQtyIncrease = document.querySelector('.qty-increase-bundle');
const bundlePrintAddToCartBtn = document.getElementById('bundlePrintAddToCart');

let bundlePrintQuantity = 1;

function openQuickAddModal(name, price) {
    currentQuickAddProduct.name = name;
    currentQuickAddProduct.price = price;
    
    quickAddProductName.textContent = name;
    quickAddPrice.textContent = formatCurrency(price);
    quickAddQtyInput.value = 1;
    updateQuickAddTotal();
    
    quickAddModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeQuickAddModal() {
    quickAddModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function updateQuickAddTotal() {
    const qty = parseInt(quickAddQtyInput.value) || 1;
    const total = currentQuickAddProduct.price * qty;
    quickAddTotal.textContent = formatCurrency(total);
}

// Topup Modal Functions
function openTopupModal() {
    currentTopupSelection = {
        provider: '',
        amount: 0,
        quantity: 1
    };
    
    topupProviders.forEach(btn => btn.classList.remove('active'));
    topupAmounts.forEach(btn => btn.classList.remove('active'));
    customAmountInput.value = '';
    topupQtyInput.value = 1;
    topupAmountSection.classList.add('hidden');
    selectedProvider.textContent = '-';
    selectedAmount.textContent = '-';
    selectedQty.textContent = '1';
    topupTotal.textContent = 'RM0.00';
    
    topupModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeTopupModal() {
    topupModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function updateTopupSummary() {
    selectedProvider.textContent = currentTopupSelection.provider || '-';
    selectedAmount.textContent = currentTopupSelection.amount ? formatCurrency(currentTopupSelection.amount) : '-';
    selectedQty.textContent = currentTopupSelection.quantity;
    
    if (currentTopupSelection.provider && currentTopupSelection.amount) {
        const total = currentTopupSelection.amount * currentTopupSelection.quantity;
        topupTotal.textContent = formatCurrency(total);
    } else {
        topupTotal.textContent = 'RM0.00';
    }
}

// Provider selection
topupProviders.forEach(btn => {
    btn.addEventListener('click', function() {
        topupProviders.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentTopupSelection.provider = this.dataset.provider;
        topupAmountSection.classList.remove('hidden');
        updateTopupSummary();
    });
});

// Amount selection (preset)
topupAmounts.forEach(btn => {
    btn.addEventListener('click', function() {
        topupAmounts.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        customAmountInput.value = '';
        currentTopupSelection.amount = parseFloat(this.dataset.amount);
        updateTopupSummary();
    });
});

// Custom amount input
customAmountInput.addEventListener('change', function() {
    const amount = parseFloat(this.value) || 0;
    if (amount > 0) {
        topupAmounts.forEach(b => b.classList.remove('active'));
        currentTopupSelection.amount = amount;
        updateTopupSummary();
    }
});

// Topup quantity controls
topupQtyDecrease.addEventListener('click', function() {
    let qty = parseInt(topupQtyInput.value) || 1;
    if (qty > 1) {
        topupQtyInput.value = qty - 1;
        currentTopupSelection.quantity = qty - 1;
        updateTopupSummary();
    }
});

topupQtyIncrease.addEventListener('click', function() {
    let qty = parseInt(topupQtyInput.value) || 1;
    if (qty < 999) {
        topupQtyInput.value = qty + 1;
        currentTopupSelection.quantity = qty + 1;
        updateTopupSummary();
    }
});

topupQtyInput.addEventListener('change', function() {
    let qty = parseInt(this.value) || 1;
    if (qty < 1) qty = 1;
    if (qty > 999) qty = 999;
    this.value = qty;
    currentTopupSelection.quantity = qty;
    updateTopupSummary();
});

// Topup add to cart
topupAddToCartBtn.addEventListener('click', function() {
    if (!currentTopupSelection.provider) {
        showNotification('Please select a provider');
        return;
    }
    if (!currentTopupSelection.amount) {
        showNotification('Please select an amount');
        return;
    }
    
    const itemName = `Topup ${currentTopupSelection.provider} - RM${currentTopupSelection.amount.toFixed(0)}`;
    addItemToCart(itemName, currentTopupSelection.amount, currentTopupSelection.quantity);
    closeTopupModal();
});

// Topup modal controls
topupClose.addEventListener('click', closeTopupModal);
topupBack.addEventListener('click', function() {
    topupAmountSection.classList.add('hidden');
    topupProviders.forEach(btn => btn.classList.remove('active'));
    topupAmounts.forEach(btn => btn.classList.remove('active'));
    customAmountInput.value = '';
    currentTopupSelection.provider = '';
    currentTopupSelection.amount = 0;
    updateTopupSummary();
});
topupOverlay.addEventListener('click', closeTopupModal);

// Bundle Print Modal Functions
function openBundlePrintModal() {
    bundlePrintQuantity = 1;
    bundlePrintQtyInput.value = 1;
    bundlePrintModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeBundlePrintModal() {
    bundlePrintModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Bundle Print modal controls
bundlePrintClose.addEventListener('click', closeBundlePrintModal);
bundlePrintCancel.addEventListener('click', closeBundlePrintModal);
bundlePrintOverlay.addEventListener('click', closeBundlePrintModal);

bundlePrintQtyDecrease.addEventListener('click', function() {
    let qty = parseInt(bundlePrintQtyInput.value) || 1;
    if (qty > 1) {
        bundlePrintQtyInput.value = qty - 1;
        bundlePrintQuantity = qty - 1;
    }
});

bundlePrintQtyIncrease.addEventListener('click', function() {
    let qty = parseInt(bundlePrintQtyInput.value) || 1;
    if (qty < 999) {
        bundlePrintQtyInput.value = qty + 1;
        bundlePrintQuantity = qty + 1;
    }
});

bundlePrintQtyInput.addEventListener('change', function() {
    let qty = parseInt(this.value) || 1;
    if (qty < 1) qty = 1;
    if (qty > 999) qty = 999;
    this.value = qty;
    bundlePrintQuantity = qty;
});

bundlePrintAddToCartBtn.addEventListener('click', function() {
    const qty = parseInt(bundlePrintQtyInput.value) || 1;
    addItemToCart('Bundle Print', 10, qty);
    showNotification('Bundle Print added to cart 🛒');
    closeBundlePrintModal();
});

// Quick add buttons
document.querySelectorAll('.quick-add-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const name = this.dataset.name;
        const price = parseFloat(this.dataset.price);
        
        if (name === 'Topup Semua Server') {
            openTopupModal();
        } else if (name === 'Bundle Print') {
            openBundlePrintModal();
        } else {
            openQuickAddModal(name, price);
        }
    });
});

// Quick add modal controls
quickAddClose.addEventListener('click', closeQuickAddModal);
quickAddCancel.addEventListener('click', closeQuickAddModal);
quickAddOverlay.addEventListener('click', closeQuickAddModal);

quickAddQtyDecrease.addEventListener('click', function() {
    let qty = parseInt(quickAddQtyInput.value) || 1;
    if (qty > 1) {
        quickAddQtyInput.value = qty - 1;
        updateQuickAddTotal();
    }
});

quickAddQtyIncrease.addEventListener('click', function() {
    let qty = parseInt(quickAddQtyInput.value) || 1;
    if (qty < 999) {
        quickAddQtyInput.value = qty + 1;
        updateQuickAddTotal();
    }
});

quickAddQtyInput.addEventListener('change', function() {
    let qty = parseInt(this.value) || 1;
    if (qty < 1) qty = 1;
    if (qty > 999) qty = 999;
    this.value = qty;
    updateQuickAddTotal();
});

quickAddToCartBtn.addEventListener('click', function() {
    const qty = parseInt(quickAddQtyInput.value) || 1;
    addItemToCart(currentQuickAddProduct.name, currentQuickAddProduct.price, qty);
    closeQuickAddModal();
});

// Login functionality
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.querySelector('.login-modal');
const loginClose = document.querySelector('.login-close');
const loginOverlay = document.querySelector('.login-overlay');
const loginForm = document.querySelector('.login-form');
const loginMessage = document.querySelector('.login-message');
const registerLink = document.getElementById('registerLink');

// Register functionality
const registerModal = document.querySelector('.register-modal');
const registerClose = document.querySelector('.register-close');
const registerOverlay = document.querySelector('.register-overlay');
const registerForm = document.querySelector('.register-form');
const registerMessage = document.querySelector('.register-message');
const loginLink = document.getElementById('loginLink');

function openLogin() {
    loginModal.classList.remove('hidden');
}

function closeLogin() {
    loginModal.classList.add('hidden');
    loginForm.reset();
    loginMessage.textContent = '';
}

function openRegister() {
    registerModal.classList.remove('hidden');
    closeLogin();
}

function closeRegister() {
    registerModal.classList.add('hidden');
    registerForm.reset();
    registerMessage.textContent = '';
}

function openLoginFromRegister() {
    loginModal.classList.remove('hidden');
    closeRegister();
}

loginBtn.addEventListener('click', openLogin);
loginClose.addEventListener('click', closeLogin);
loginOverlay.addEventListener('click', closeLogin);
registerLink.addEventListener('click', openRegister);

registerClose.addEventListener('click', closeRegister);
registerOverlay.addEventListener('click', closeRegister);
loginLink.addEventListener('click', openLoginFromRegister);

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const identifier = document.getElementById('login-identifier').value;
    const password = document.getElementById('login-password').value;

    const user = users[identifier];
    if (user && user.password === password) {
        currentUser = { username: identifier, email: user.email, phone: user.phone };
        saveCurrentUser();
        showNotification(`Welcome back, ${identifier}!`);
        closeLogin();
    } else {
        loginMessage.textContent = 'Invalid credentials. Try again.';
        loginMessage.style.color = '#d32f2f';
    }
});

registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;

    if (users[username]) {
        registerMessage.textContent = 'Username already exists.';
        registerMessage.style.color = '#d32f2f';
        return;
    }

    users[username] = { password, email, phone };
    saveUsers();
    registerMessage.textContent = 'Registration successful! You can now login.';
    registerMessage.style.color = '#4caf50';
    setTimeout(() => openLoginFromRegister(), 2000);
});

const payButton = document.getElementById("pay-button");

if (payButton) {
  payButton.addEventListener("click", async () => {
    const response = await fetch("/api/pay", {
      method: "POST",
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Payment error: " + data.error);
    }
  });
}