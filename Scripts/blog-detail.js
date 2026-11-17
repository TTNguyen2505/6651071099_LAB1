tailwind.config = {
    theme: {
        extend: {
            colors: {
                alabaster: '#FAF8F5',
                stoneBg: '#EFECE6',
                stoneBorder: '#E2DDD5',
                obsidian: '#1A1918',
                taupeGray: '#6E6A63',
                terracotta: '#B85233',
                terracottaHover: '#9e4227',
            },
            fontFamily: {
                serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
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
        alert('Thank you for contacting ARTGANI. An art advisor will respond within 2 hours.');
    } else if (form.dataset.formAction === 'subscribe') {
        alert('Subscribed to ARTGANI collector updates.');
    }
});
