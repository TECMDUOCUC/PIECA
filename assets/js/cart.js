const CART_KEY = "pieca_cart";
const RECEIPT_KEY = "pieca_receipt";

function getCart() {
    const raw = localStorage.getItem(CART_KEY);
    try { return raw ? JSON.parse(raw) : []; } catch { return []; }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
//GEMINI 3.8 FLASH
async function renderCart() {
    const container = document.getElementById('cart-container');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cart = getCart();

    if (cart.length === 0) {
        container.innerHTML = '<p style="color: white; text-align: center;">El carrito está vacío.</p>';
        if (checkoutBtn) checkoutBtn.style.display = 'none';
        return;
    }

    try {
        const response = await fetch("./assets/data.json");
        const items = await response.json();
        
        container.innerHTML = '';
        let total = 0;

        for (let i = 0; i < cart.length; i++) {
            const cartItem = cart[i];
            const numericId = Number(cartItem.id);
            const product = items[numericId];
            if (!product) continue;

            const itemTotal = product.price * cartItem.quantity;
            total += itemTotal;

            const div = document.createElement('div');
            div.style = "display: flex; justify-content: space-between; align-items: center; color: white; padding: 10px; border-bottom: 1px solid #333;";
            div.innerHTML = `
                <span>${product.name} (x${cartItem.quantity})</span>
                <span>$${itemTotal.toLocaleString('es-CL')} CLP</span>
                <div>
                    <button class="cart-btn" data-action="add" data-id="${numericId}">+</button>
                    <button class="cart-btn" data-action="sub" data-id="${numericId}">-</button>
                    <button class="cart-btn" data-action="delete" data-id="${numericId}" style="color: red;">Eliminar</button>
                </div>
            `;
            container.appendChild(div);
        }

        const totalDiv = document.createElement('div');
        totalDiv.style = "text-align: right; color: white; font-size: 1.2rem; margin-top: 15px;";
        totalDiv.innerHTML = `<strong>Total: $${total.toLocaleString('es-CL')} CLP</strong>`;
        container.appendChild(totalDiv);
        
        if (checkoutBtn) checkoutBtn.style.display = 'block';
    } catch (error) {
        console.error("Error loading cart items:", error);
    }
}

function modifyQuantity(id, amount) {
    const targetId = Number(id);
    const cart = getCart();
    const item = cart.find(entry => Number(entry.id) === targetId);

    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            removeItem(targetId);
        } else {
            saveCart(cart);
            renderCart();
        }
        if (typeof renderNavigation === "function") {
            renderNavigation();
        }
    }
}

function removeItem(id) {
    const targetId = Number(id);
    let cart = getCart();
    cart = cart.filter(entry => Number(entry.id) !== targetId);
    saveCart(cart);
    renderCart();
}

function processCheckout() {
    const cart = getCart();
    if (cart.length === 0) return;
    
    const receipt = {
        date: new Date().toISOString(),
        items: cart,
        status: "Procesando - Preparando Envío"
    };
    
    localStorage.setItem(RECEIPT_KEY, JSON.stringify(receipt));
    localStorage.removeItem(CART_KEY);
    window.location.href = 'receipt.html';
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    const container = document.getElementById('cart-container');
    if (container) {
        container.addEventListener('click', (e) => {
            const btn = e.target.closest('.cart-btn');
            if (!btn) return;

            const action = btn.dataset.action;
            const id = Number(btn.dataset.id);

            if (action === 'add') modifyQuantity(id, 1);
            if (action === 'sub') modifyQuantity(id, -1);
            if (action === 'delete') removeItem(id);
        });
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', processCheckout);
    }
});