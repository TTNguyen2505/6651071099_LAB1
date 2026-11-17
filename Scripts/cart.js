(function () {
    const storageKey = 'artgani-cart';
    const product = {
        id: 'sienna-horizon-canvas',
        title: 'Sienna Horizon Canvas',
        price: 140,
        image: 'https://lh3.googleusercontent.com/aida/ALJJyrAHoNcoYqyZFgY_sAdQp3UfuJv7-k5VB3ZXSVtV427WrOAUmWuqS9mGpKRKRQCaAaD9jAAVJPSjGHmPkDygwLrUBKp9wtv6hZe0qaUaHlPorJGO2TBhp4w_J6o86hfH6dIJpqbtoJ7ZkEHm5Re3NZ4uxy7bSNc5lgsS4sAs1MnuGtzA62bf7iNcNEfM4sQfFk7MPPc4Uek5VpBcZeMwFtEsi-thZyUXJjdi8mk_II26',
        description: 'Original Oil on Belgian Linen',
        dimensions: '60 × 90 cm • Natural White Oak Float Frame'
    };

    function getCart() {
        const savedCart = localStorage.getItem(storageKey);
        if (!savedCart) return [];

        try {
            const items = JSON.parse(savedCart);
            if (!Array.isArray(items)) throw new Error('Cart data must be an array.');
            return items
                .filter(item => item && item.id === product.id && Number.isInteger(item.quantity) && item.quantity > 0)
                .map(item => ({ id: product.id, quantity: item.quantity }));
        } catch (error) {
            console.error('Unable to read the saved shopping cart.', error);
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(storageKey, JSON.stringify(cart));
        render();
    }

    function getQuantity(cart) {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }

    function formatPrice(amount) {
        return `$${amount.toFixed(2)}`;
    }

    function updateHeader(cart) {
        const quantity = getQuantity(cart);
        const total = quantity * product.price;
        document.querySelectorAll('[data-cart-count]').forEach(element => {
            element.textContent = quantity;
        });
        document.querySelectorAll('[data-cart-value]').forEach(element => {
            element.textContent = formatPrice(total);
        });
    }

    function setText(selector, text) {
        document.querySelectorAll(selector).forEach(element => {
            element.textContent = text;
        });
    }

    function createCartRow(quantity) {
        const row = document.createElement('tr');
        row.className = 'hover:bg-stone-surface/20 transition-colors';
        row.dataset.cartProduct = product.id;

        const artwork = document.createElement('td');
        artwork.className = 'py-5 px-6';
        artwork.innerHTML = '<div class="flex items-center gap-4"><div class="w-20 h-20 sm:w-24 sm:h-24 bg-stone-surface border border-stone-border p-1.5 rounded-sm flex-shrink-0 shadow-sm"><img class="w-full h-full object-cover" data-artwork-image></div><div><h3 class="font-serif-title text-base sm:text-lg font-semibold text-obsidian"></h3><p class="text-xs text-stone-muted mt-0.5" data-product-description></p><p class="text-[11px] text-stone-muted uppercase tracking-wider mt-1" data-product-dimensions></p></div></div>';
        const image = artwork.querySelector('[data-artwork-image]');
        image.src = product.image;
        image.alt = product.title;
        artwork.querySelector('h3').textContent = product.title;
        artwork.querySelector('[data-product-description]').textContent = product.description;
        artwork.querySelector('[data-product-dimensions]').textContent = product.dimensions;
        row.appendChild(artwork);

        const price = document.createElement('td');
        price.className = 'py-5 px-4 text-center font-serif text-base text-stone-muted';
        price.textContent = formatPrice(product.price);
        row.appendChild(price);

        const quantityCell = document.createElement('td');
        quantityCell.className = 'py-5 px-4 text-center';
        quantityCell.innerHTML = '<div class="inline-flex items-center bg-stone-surface border border-stone-border rounded-sm mx-auto"><button aria-label="Decrease quantity" class="w-8 h-9 flex items-center justify-center text-obsidian hover:text-terracotta transition-colors font-semibold" data-cart-decrease type="button">−</button><input class="w-8 h-9 text-center bg-transparent border-0 focus:ring-0 text-xs font-semibold text-obsidian p-0" readonly type="text"><button aria-label="Increase quantity" class="w-8 h-9 flex items-center justify-center text-obsidian hover:text-terracotta transition-colors font-semibold" data-cart-increase type="button">+</button></div>';
        quantityCell.querySelector('input').value = quantity;
        row.appendChild(quantityCell);

        const lineTotal = document.createElement('td');
        lineTotal.className = 'py-5 px-4 text-center font-serif text-base font-semibold text-terracotta';
        lineTotal.textContent = formatPrice(product.price * quantity);
        row.appendChild(lineTotal);

        const removeCell = document.createElement('td');
        removeCell.className = 'py-5 px-4 text-center';
        removeCell.innerHTML = '<button aria-label="Remove Sienna Horizon Canvas" class="w-8 h-8 inline-flex items-center justify-center rounded-full text-stone-muted hover:text-terracotta hover:bg-stone-surface transition-colors text-lg font-medium" data-cart-remove type="button">×</button>';
        row.appendChild(removeCell);
        return row;
    }

    function renderShoppingCart(cart) {
        const itemsContainer = document.querySelector('[data-cart-items]');
        if (!itemsContainer) return;

        itemsContainer.replaceChildren();
        const quantity = getQuantity(cart);
        if (quantity > 0) {
            itemsContainer.appendChild(createCartRow(quantity));
        } else {
            const emptyRow = document.createElement('tr');
            const emptyCell = document.createElement('td');
            emptyCell.colSpan = 5;
            emptyCell.className = 'py-12 px-6 text-center text-stone-muted';
            emptyCell.textContent = 'Your shopping cart is empty.';
            emptyRow.appendChild(emptyCell);
            itemsContainer.appendChild(emptyRow);
        }
        setText('[data-cart-subtotal]', formatPrice(quantity * product.price));
        setText('[data-cart-total]', formatPrice(quantity * product.price));
    }

    function renderCheckout(cart) {
        const itemsContainer = document.querySelector('[data-checkout-items]');
        if (!itemsContainer) return;

        itemsContainer.replaceChildren();
        const quantity = getQuantity(cart);
        if (quantity > 0) {
            const item = document.createElement('div');
            item.className = 'py-3.5 flex items-center justify-between text-xs';
            const details = document.createElement('div');
            details.className = 'pr-4';
            const title = document.createElement('span');
            title.className = 'font-medium text-art-charcoal block';
            title.textContent = `${product.title} × ${quantity}`;
            const description = document.createElement('span');
            description.className = 'text-[10px] text-art-taupe';
            description.textContent = product.description;
            details.append(title, description);
            const price = document.createElement('span');
            price.className = 'font-bold text-art-charcoal flex-shrink-0';
            price.textContent = formatPrice(product.price * quantity);
            item.append(details, price);
            itemsContainer.appendChild(item);
        } else {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'py-5 text-xs text-art-taupe';
            emptyMessage.textContent = 'Your shopping cart is empty.';
            itemsContainer.appendChild(emptyMessage);
        }
        setText('[data-checkout-subtotal]', formatPrice(quantity * product.price));
        setText('[data-checkout-total]', formatPrice(quantity * product.price));
    }

    function render() {
        const cart = getCart();
        updateHeader(cart);
        renderShoppingCart(cart);
        renderCheckout(cart);

        const productQuantity = document.querySelector('[data-product-quantity]');
        if (productQuantity && !productQuantity.dataset.editing) {
            productQuantity.value = '1';
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        render();

        document.addEventListener('click', event => {
            const button = event.target.closest('button');
            if (!button) return;

            if (button.hasAttribute('data-product-increase') || button.hasAttribute('data-product-decrease')) {
                const input = document.querySelector('[data-product-quantity]');
                if (!input) return;
                const current = Math.max(1, Number.parseInt(input.value, 10) || 1);
                input.value = String(Math.max(1, current + (button.hasAttribute('data-product-increase') ? 1 : -1)));
                return;
            }

            if (button.hasAttribute('data-add-to-cart')) {
                const input = document.querySelector('[data-product-quantity]');
                const quantity = Math.max(1, Number.parseInt(input ? input.value : '1', 10) || 1);
                const cart = getCart();
                const existing = cart.find(item => item.id === product.id);
                if (existing) existing.quantity += quantity;
                else cart.push({ id: product.id, quantity });
                saveCart(cart);
                button.setAttribute('aria-live', 'polite');
                button.dataset.added = 'true';
                return;
            }

            const row = button.closest('[data-cart-product]');
            if (!row) return;
            const cart = getCart();
            const item = cart.find(entry => entry.id === row.dataset.cartProduct);
            if (!item) return;

            if (button.hasAttribute('data-cart-increase')) item.quantity += 1;
            else if (button.hasAttribute('data-cart-decrease')) item.quantity -= 1;
            else if (button.hasAttribute('data-cart-remove')) item.quantity = 0;
            saveCart(cart.filter(entry => entry.quantity > 0));
        });

        document.querySelectorAll('[data-proceed-to-checkout]').forEach(button => {
            button.addEventListener('click', () => {
                window.location.href = 'checkout.html';
            });
        });
    });

    window.addEventListener('storage', event => {
        if (event.key === storageKey) render();
    });
})();
