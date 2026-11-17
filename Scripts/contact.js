tailwind.config = {
    theme: {
        extend: {
            colors: {
                alabaster: '#FAF8F5',
                stoneSurface: '#EFECE6',
                hairline: '#E2DDD5',
                obsidian: '#1A1918',
                taupeText: '#6E6A63',
                terracotta: '#B85233',
                terracottaHover: '#A04529',
                antiqueBrass: '#B58E4C',
            },
            fontFamily: {
                serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
                sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
            }
        }
    }
}

document.addEventListener('submit', event => {
    const form = event.target.closest('[data-form-action]');
    if (!form) return;

    event.preventDefault();
    if (form.dataset.formAction === 'contact') {
        const dialog = document.querySelector('[data-notification-dialog]');
        document.querySelector('[data-notification-title]').textContent = 'Message sent';
        document.querySelector('[data-notification-message]').textContent = 'Thank you for contacting ARTGANI. An art advisor will respond within 2 hours.';
        dialog.showModal();
    } else if (form.dataset.formAction === 'subscribe') {
        alert('Subscribed to ARTGANI collector updates.');
    }
});

document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const dialog = document.querySelector('[data-notification-dialog]');
    if (dialog && dialog.open) dialog.close();
});
