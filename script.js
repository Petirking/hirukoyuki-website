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

function renderCartItems() {
    cartItemsContainer.innerHTML = '';

    if (cartState.items.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'cart-empty';
        emptyMessage.textContent = 'Your cart is empty.';
        cartItemsContainer.appendChild(emptyMessage);
        cartTotalEl.textContent = formatCurrency(0);
        return;
    }

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

    const totalValue = cartState.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalEl.textContent = formatCurrency(totalValue);
}

function addItemToCart(name, price) {
    const existingItem = cartState.items.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
        if (existingItem.quantity > 999) {
            existingItem.quantity = 999;
        }
    } else {
        cartState.items.push({ name, price: Number(price), quantity: 1 });
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
    document.querySelectorAll('.btn.btn-outline, .product-line').forEach(button => {
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