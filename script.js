// Simple interactivity for Hiruko Yuki Store

const cartState = {
    items: [],
};

// Product ID Format: HY(CategoryCode)-(PriceCode)-(ServiceCode)-(RandomOrderNumber)
const productIds = {
    // HY1 = Premium Apps
    'Netflix Premium': 'HY1-014-001-5872',        // RM14, Service 001 (Netflix)
    'Disney+ Hotstar': 'HY1-014-002-3409',        // RM14, Service 002 (Disney+)
    'Spotify Premium': 'HY1-014-003-2104',        // RM14, Service 003 (Spotify)
    'YouTube Premium': 'HY1-017-004-5518',        // RM17, Service 004 (YouTube Premium)
    'YouTube Music': 'HY1-014-005-6823',          // RM14, Service 005 (YouTube Music)
    'Telegram Premium': 'HY1-003-006-9058',       // RM3, Service 006 (Telegram Premium)
    'ChatGPT Plus': 'HY1-025-007-4331',           // RM25, Service 007 (ChatGPT Plus)
    'Canva Pro': 'HY1-010-008-7720',              // RM10, Service 008 (Canva Pro)
    'CapCut Pro': 'HY1-010-009-4821',             // RM10, Service 009 (CapCut Pro)
    'Alight Motion Premium': 'HY1-010-010-1947',  // RM10, Service 010 (Alight Motion)
    
    // HY2 = Topup Services (Service codes: 001=Maxis, 002=Celcom, 003=Digi, 004=XOX, 005=Umobile, 006=Hotlink)
    'Maxis': 'HY2-050-001-0000',    // Price TBD, Service 001 (Maxis) - random number generated per transaction
    'Celcom': 'HY2-050-002-0000',   // Price TBD, Service 002 (Celcom)
    'Digi': 'HY2-050-003-0000',     // Price TBD, Service 003 (Digi)
    'XOX': 'HY2-050-004-0000',      // Price TBD, Service 004 (XOX)
    'Umobile': 'HY2-050-005-0000',  // Price TBD, Service 005 (Umobile)
    'Hotlink': 'HY2-050-006-0000',  // Price TBD, Service 006 (Hotlink)
    'Topup Semua Server': 'HY2-050-001-0000',  // Generic topup (default to Maxis)
    
    // HY3 = Preset Editing
    'Preset Editing': 'HY3-001-001-5518',  // RM1, Service 001
    
    // HY4 = Bundle Printing
    'Bundle Print': 'HY4-010-001-2104'     // RM10, Service 001
};

// Generate random 4-digit order number
function generateRandomOrderNumber() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

// Generate product ID with dynamic order number and optional price override
function getProductId(name, priceCode = null) {
    const baseId = productIds[name];
    
    if (!baseId) {
        if (name.startsWith('Topup')) {
            return generateTopupProductId(name, priceCode);
        }
        return 'HYX-0000-000-' + generateRandomOrderNumber();
    }

    // Replace the last segment (order number) with a new random number
    if (baseId.includes('-')) {
        const parts = baseId.split('-');
        if (parts.length === 4) {
            // Replace the last order number with a new random one
            parts[3] = generateRandomOrderNumber();
            return parts.join('-');
        }
    }

    return baseId;
}

// Generate topup product IDs with dynamic pricing
function generateTopupProductId(provider, priceCode = null) {
    const serviceMap = {
        'Maxis': '001',
        'Celcom': '002',
        'Digi': '003',
        'XOX': '004',
        'Umobile': '005',
        'Hotlink': '006',
        'Topup Semua Server': '001'
    };

    const serviceCode = serviceMap[provider] || '001';
    const price = priceCode || '050'; // Default to RM50 if not specified
    const orderNumber = generateRandomOrderNumber();

    return `HY2-${price}-${serviceCode}-${orderNumber}`;
}

// Product ID Reference Guide for Telegram Logs & Order Tracking
// Format: HY(CategoryCode)-(PriceCode)-(ServiceCode)-(RandomOrderNumber)
const productIdReference = {
    categories: {
        'HY1': 'Premium Apps',
        'HY2': 'Topup Services',
        'HY3': 'Preset Editing',
        'HY4': 'Bundle Printing'
    },
    premiumAppServices: {
        '001': 'Netflix Premium (RM14)',
        '002': 'Disney+ Hotstar (RM14)',
        '003': 'Spotify Premium (RM14)',
        '004': 'YouTube Premium (RM17)',
        '005': 'YouTube Music (RM14)',
        '006': 'Telegram Premium (RM3)',
        '007': 'ChatGPT Plus (RM25)',
        '008': 'Canva Pro (RM10)',
        '009': 'CapCut Pro (RM10)',
        '010': 'Alight Motion Premium (RM10)'
    },
    topupServices: {
        '001': 'Maxis',
        '002': 'Celcom',
        '003': 'Digi',
        '004': 'XOX',
        '005': 'Umobile',
        '006': 'Hotlink'
    },
    presetEditingServices: {
        '001': 'Preset Editing (RM1)'
    },
    bundlePrintingServices: {
        '001': 'Bundle Printing (RM10)'
    }
};

let users = JSON.parse(localStorage.getItem('users')) || {};

// Initialize demo accounts for testing
if (Object.keys(users).length === 0) {
    users = {
        'Hirukoyukiadmin.01': {
            email: 'hirukoyuki.01@gmail.com',
            phone: '601120500840',
            password: 'PETIRKINGNO.1',
            role: 'admin'
        },
        'user': {
            email: 'user@hiruko.com',
            phone: '60112345678',
            password: 'user123',
            role: 'user'
        }
    };
    localStorage.setItem('users', JSON.stringify(users));
}

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
    updateLoginState();
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

function addItemToCart(name, price, quantity = 1, productId = null) {
    productId = productId || getProductId(name);
    const existingItem = cartState.items.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity;
        if (existingItem.quantity > 999) {
            existingItem.quantity = 999;
        }
        if (!existingItem.productId) {
            existingItem.productId = productId;
        }
    } else {
        cartState.items.push({ name, price: Number(price), quantity: quantity, productId });
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
            showNotification('Stripe payment is currently unavailable. Sila pilih kaedah manual.');
            return;
        }

        if (selectedPaymentMethod === 'touchngo') {
            showNotification('Touch \"n Go payment is currently unavailable. Sila pilih kaedah manual.');
            return;
        }

        if (selectedPaymentMethod === 'manual') {
            const messageLines = ['Hii Yukiee! 👋', 'Saya nak buat order:', ''];
            const totalAmount = cartState.items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
            cartState.items.forEach((item, index) => {
                const productId = item.productId || getProductId(item.name);
                messageLines.push(`${index + 1}. ${item.name}`);
                messageLines.push(`Price: RM${item.price}`);
                messageLines.push(`Quantity: ${item.quantity}`);
                messageLines.push(`Product ID: ${productId}`);
                messageLines.push('');
            });
            messageLines.push('Payment: Manual Payment');
            messageLines.push(`Total Amount: RM${totalAmount.toFixed(2).replace(/\.00$/, '')}`);
            messageLines.push('');
            messageLines.push('Terima kasih 😊');
            const message = messageLines.join('\n');
            const encoded = encodeURIComponent(message);
            showNotification('Opening WhatsApp to connect with our team...');
            setTimeout(() => {
                window.open(`https://wa.me/601120500840?text=${encoded}`, '_blank');
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
        paymentNote.textContent = '⚠️ Stripe is currently unavailable. Sila pilih kaedah manual.';
        return;
    }

    if (selectedPaymentMethod === 'touchngo') {
        paymentNote.textContent = '⚠️ Touch \"n Go is currently unavailable. Sila pilih kaedah manual.';
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

// Premium Apps Modal functionality
const premiumAppsModal = document.querySelector('.premium-apps-modal');
const premiumAppsOverlay = document.querySelector('.premium-apps-overlay');
const premiumAppsClose = document.querySelector('.premium-apps-close');
const premiumAppsCancel = document.querySelector('.premium-apps-cancel');

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

// Premium Apps Modal Functions
function openPremiumAppsModal() {
    premiumAppsModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closePremiumAppsModal() {
    premiumAppsModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
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
    const priceCode = String(Math.round(currentTopupSelection.amount)).padStart(3, '0');
    const productId = generateTopupProductId(currentTopupSelection.provider, priceCode);
    addItemToCart(itemName, currentTopupSelection.amount, currentTopupSelection.quantity, productId);
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
const bundleprintModal = document.querySelector('.bundleprint-modal');
const bundleprintOverlay = document.querySelector('.bundleprint-overlay');
const bundleprintClose = document.querySelectorAll('.bundleprint-close, .bundleprint-close-btn');
const bundleprintAddToCartBtn = document.getElementById('bundleprintAddToCart');

let currentBundleprintSelection = {
    name: 'Bundle Print',
    price: 10,
    quantity: 1
};

function openBundleprintModal() {
    currentBundleprintSelection = {
        name: 'Bundle Print',
        price: 10,
        quantity: 1
    };
    
    bundleprintModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeBundleprintModal() {
    bundleprintModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Bundle Print add to cart
bundleprintAddToCartBtn.addEventListener('click', function() {
    addItemToCart(currentBundleprintSelection.name, currentBundleprintSelection.price, 1);
    showNotification('Bundle Print added to cart. Please send your files via WhatsApp: +60112-050-0840');
    closeBundleprintModal();
});

// Bundle Print modal controls
bundleprintClose.forEach(btn => {
    btn.addEventListener('click', closeBundleprintModal);
});
bundleprintOverlay.addEventListener('click', closeBundleprintModal);

// Preset Editing Modal Functions
const preseteditingModal = document.querySelector('.presetediting-modal');
const preseteditingOverlay = document.querySelector('.presetediting-overlay');
const preseteditingClose = document.querySelectorAll('.presetediting-close, .presetediting-close-btn');
const preseteditingAddToCartBtn = document.getElementById('preseteditingAddToCart');

let currentPreseteditingSelection = {
    name: 'Preset Editing',
    price: 1,
    quantity: 1
};

function openPreseteditingModal() {
    currentPreseteditingSelection = {
        name: 'Preset Editing',
        price: 1,
        quantity: 1
    };
    
    preseteditingModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closePreseteditingModal() {
    preseteditingModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Preset Editing add to cart
preseteditingAddToCartBtn.addEventListener('click', function() {
    addItemToCart(currentPreseteditingSelection.name, currentPreseteditingSelection.price, 1);
    showNotification('Preset Editing added to cart. Please send your files via WhatsApp: +60112-050-0840');
    closePreseteditingModal();
});

// Preset Editing modal controls
preseteditingClose.forEach(btn => {
    btn.addEventListener('click', closePreseteditingModal);
});
preseteditingOverlay.addEventListener('click', closePreseteditingModal);

// Quick add buttons
document.querySelectorAll('.quick-add-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const name = this.dataset.name;
        const price = parseFloat(this.dataset.price);

        if (name === 'Topup Semua Server') {
            openTopupModal();
            return;
        }

        if (name === 'Bundle Print') {
            openBundleprintModal();
            return;
        }

        if (name === 'Preset Editing') {
            openPreseteditingModal();
            return;
        }

        if (name === 'Premium Apps') {
            openPremiumAppsModal();
            return;
        }

        addItemToCart(name, price, 1);
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

// Premium apps modal controls
premiumAppsClose.addEventListener('click', closePremiumAppsModal);
premiumAppsCancel.addEventListener('click', closePremiumAppsModal);
premiumAppsOverlay.addEventListener('click', closePremiumAppsModal);

// Premium apps add buttons
document.querySelectorAll('.app-add-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const appName = this.dataset.app;
        const price = parseFloat(this.dataset.price);
        addItemToCart(appName, price, 1);
        showNotification(`${appName} added to cart!`);
    });
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

function logout() {
    currentUser = null;
    saveCurrentUser();
    updateLoginState();
    showNotification('Logged out successfully.');
}

function updateLoginState() {
    if (currentUser) {
        loginBtn.textContent = `Logout (${currentUser.username || currentUser.email || 'User'})`;
        loginBtn.classList.remove('btn-outline');
        loginBtn.classList.add('btn-primary');
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.classList.remove('btn-primary');
        loginBtn.classList.add('btn-outline');
    }
}

function openLogin() {
    if (currentUser) {
        logout();
        return;
    }
    loginModal.classList.remove('hidden');
}

loginBtn.addEventListener('click', openLogin);
loginClose.addEventListener('click', closeLogin);
loginOverlay.addEventListener('click', closeLogin);
registerLink.addEventListener('click', openRegister);

registerClose.addEventListener('click', closeRegister);
registerOverlay.addEventListener('click', closeRegister);
loginLink.addEventListener('click', openLoginFromRegister);

updateLoginState();

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const identifier = document.getElementById('login-identifier').value;
    const password = document.getElementById('login-password').value;

    const user = users[identifier];
    if (user && user.password === password) {
        currentUser = { username: identifier, email: user.email, phone: user.phone };
        saveCurrentUser();
        updateLoginState();
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

// Telegram Bot Logging System
let sessionData = {
    entryTime: new Date().toISOString(),
    activityCount: 0,
    lastActivityTime: Date.now(),
    idleTimeout: 3600000, // 1 hour
    idleTimer: null,
    sessionActive: true,
    visitorId: null
};

// Visitor tracking
let onlineVisitors = 0;
let dailyVisitors = 0;
let totalVisitors = 0;

function getVisitorId() {
    let visitorId = localStorage.getItem('hiruko_visitor_id');
    if (!visitorId) {
        visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('hiruko_visitor_id', visitorId);
        
        // Increment total visitors
        totalVisitors = parseInt(localStorage.getItem('hiruko_total_visitors') || '0') + 1;
        localStorage.setItem('hiruko_total_visitors', totalVisitors);
        
        // Check if new daily visitor
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem('hiruko_last_visit');
        if (lastVisit !== today) {
            dailyVisitors = parseInt(localStorage.getItem('hiruko_daily_visitors') || '0') + 1;
            localStorage.setItem('hiruko_daily_visitors', dailyVisitors);
            localStorage.setItem('hiruko_last_visit', today);
        }
    }
    return visitorId;
}

function updateOnlineVisitors() {
    onlineVisitors = parseInt(localStorage.getItem('hiruko_online_visitors') || '0');
    onlineVisitors = Math.max(0, onlineVisitors); // Ensure not negative
}

function sendVisitorOnlineStatus() {
    updateOnlineVisitors();
    const deviceInfo = getDeviceInfo();
    const time = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).replace(',', '');
    
    const visitorData = {
        type: 'visitor_online',
        onlineVisitors: onlineVisitors,
        dailyVisitors: dailyVisitors,
        weeklyVisitors: parseInt(localStorage.getItem('hiruko_weekly_visitors') || '0'),
        monthlyVisitors: parseInt(localStorage.getItem('hiruko_monthly_visitors') || '0'),
        totalVisitors: totalVisitors,
        pageURL: window.location.href,
        ...deviceInfo,
        timestamp: time
    };
    
    fetch('/api/telegram-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('✓ Visitor online status sent');
        })
        .catch(err => {
            console.error('✗ Visitor status failed:', err.message);
        });
}

function getDeviceInfo() {

    const ua = navigator.userAgent;
    let deviceType = 'Desktop';
    if (/Mobi|Android/i.test(ua)) deviceType = 'Mobile';
    else if (/Tablet|iPad/i.test(ua)) deviceType = 'Tablet';

    let browser = 'Unknown';
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Edge')) browser = 'Edge';

    let os = 'Unknown';
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

    return {
        deviceType,
        browser,
        os,
        screenSize: `${screen.width}x${screen.height}`,
        language: navigator.language || 'Unknown'
    };
}

function resetIdleTimer() {
    if (sessionData.idleTimer) clearTimeout(sessionData.idleTimer);
    sessionData.lastActivityTime = Date.now();
    
    sessionData.idleTimer = setTimeout(() => {
        if (sessionData.sessionActive) {
            logSessionEnd('Idle timeout (1 hour)');
        }
    }, sessionData.idleTimeout);
}

function logSessionEnd(reason = 'User left') {
    if (!sessionData.sessionActive) return;
    
    sessionData.sessionActive = false;
    const entryTime = new Date(sessionData.entryTime);
    const exitTime = new Date();
    const durationMs = exitTime - entryTime;
    const durationMin = Math.floor(durationMs / 60000);
    const durationSec = Math.floor((durationMs % 60000) / 1000);
    
    const deviceInfo = getDeviceInfo();
    const sessionLog = {
        entryTime: sessionData.entryTime,
        exitTime: exitTime.toISOString(),
        duration: `${durationMin}m ${durationSec}s`,
        reason: reason,
        totalClicks: sessionData.activityCount,
        pageURL: window.location.href,
        ...deviceInfo
    };
    
    fetch('/api/telegram-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...sessionLog,
            type: 'session_end'
        }),
        keepalive: true
    })
        .then(response => response.json())
        .then(data => {
            console.log('✓ Session log sent:', reason);
        })
        .catch(err => {
            console.error('✗ Session log failed:', err.message);
        });
}

function sendLogToTelegram(buttonText, element = null, interactionType = 'Click') {
    sessionData.activityCount++;
    resetIdleTimer();

    const deviceInfo = getDeviceInfo();
    const now = new Date();
    const timestamp = now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).replace(',', '');

    let elementInfo = {};
    if (element) {
        elementInfo = {
            elementTag: element.tagName || 'Unknown',
            elementId: element.id || 'Unknown',
            elementClass: element.className || 'Unknown',
            inputValue: element.value || 'N/A',
            selectedOption: element.type === 'radio' || element.type === 'checkbox' ? (element.checked ? 'Selected' : 'Unselected') : 'N/A'
        };
    }

    const logData = {
        interactionType: interactionType,
        buttonText: buttonText || 'Unknown',
        pageURL: window.location.href,
        referrer: document.referrer || 'Direct',
        timestamp: timestamp,
        ...deviceInfo,
        ...elementInfo
    };

    fetch('/api/telegram-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData)
    })
        .then(response => {
            if (!response.ok) {
                console.error(`Log response error: ${response.status}`);
                return response.text().then(text => {
                    console.error('Response:', text);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data && data.success) {
                console.log('✓ Log sent to Telegram:', buttonText);
            } else if (data && data.error) {
                console.error('Log error:', data.error);
            }
        })
        .catch(err => {
            console.error('✗ Log send failed:', err.message);
        });
}

function sendBotStatus() {
    fetch('/api/telegram-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'status' })
    })
        .then(response => response.json())
        .then(data => {
            console.log('✓ Bot status sent to Telegram');
        })
        .catch(err => {
            console.error('✗ Bot status failed:', err.message);
        });
}

// Attach logging to all buttons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize visitor tracking
    sessionData.visitorId = getVisitorId();
    updateOnlineVisitors();
    
    // Send bot status on page load
    sendBotStatus();
    
    // Send visitor online status after a short delay
    setTimeout(() => {
        sendVisitorOnlineStatus();
    }, 2000);
    
    // Initialize session tracking
    resetIdleTimer();
    
    // Log all button and input clicks
    document.querySelectorAll('button, .btn, input[type="submit"], input[type="button"], a[href*="wa.me"], input[type="radio"], input[type="checkbox"]').forEach(el => {
        el.addEventListener('click', function(e) {
            let buttonText = this.textContent.trim() || this.getAttribute('data-button-title') || this.value || this.name || 'Unknown';
            
            // Better text extraction for complex elements
            if (!buttonText || buttonText === 'Unknown') {
                buttonText = this.getAttribute('aria-label') || this.getAttribute('title') || this.id || this.className || 'Unknown';
            }
            
            // Special handling for radio buttons (product selection)
            if (this.type === 'radio') {
                const label = document.querySelector(`label[for="${this.id}"]`);
                if (label) {
                    buttonText = `Selected: ${label.textContent.trim()}`;
                } else {
                    buttonText = `Radio: ${this.value || this.name}`;
                }
            }
            
            sendLogToTelegram(buttonText, this, 'Click');
        });
    });
    
    // Log form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const formData = new FormData(this);
            let formInfo = `Form Submitted: ${this.id || this.className || 'Unknown Form'}`;
            
            // Add form data summary (without sensitive info)
            const entries = Array.from(formData.entries());
            if (entries.length > 0) {
                const summary = entries.map(([key, value]) => {
                    // Mask sensitive data
                    if (key.toLowerCase().includes('email') || key.toLowerCase().includes('phone')) {
                        return `${key}: [PROTECTED]`;
                    }
                    return `${key}: ${value}`;
                }).join(', ');
                formInfo += ` (${summary})`;
            }
            
            sendLogToTelegram(formInfo);
        });
    });
    
    // Log modal interactions
    const modalObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && (node.classList?.contains('modal') || node.id?.includes('modal') || node.className?.includes('modal'))) {
                    console.log('Modal opened detected:', node.className);
                    sendLogToTelegram(`Modal Opened: ${node.id || node.className || 'Unknown Modal'}`);
                }
            });
            mutation.removedNodes.forEach((node) => {
                if (node.nodeType === 1 && (node.classList?.contains('modal') || node.id?.includes('modal') || node.className?.includes('modal'))) {
                    console.log('Modal closed detected:', node.className);
                    sendLogToTelegram(`Modal Closed: ${node.id || node.className || 'Unknown Modal'}`);
                }
            });
        });
    });
    
    modalObserver.observe(document.body, { childList: true, subtree: true });
    
    // Track page changes and scroll
    document.addEventListener('scroll', () => {
        resetIdleTimer();
    });
    
    window.addEventListener('focus', () => {
        resetIdleTimer();
    });
});

// Log session end when user leaves
window.addEventListener('beforeunload', () => {
    logSessionEnd('User left website');
});