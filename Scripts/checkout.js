tailwind.config = {
    theme: {
        extend: {
            colors: {
                'art-alabaster': '#FAF8F5',
                'art-stone': '#EFECE6',
                'art-stone-subtle': '#E8E4DC',
                'art-border': '#E2DDD5',
                'art-charcoal': '#1A1918',
                'art-taupe': '#6E6A63',
                'art-terracotta': '#B85233',
                'art-terracotta-dark': '#9E4429',
                'art-brass': '#B58E4C',
            },
            fontFamily: {
                serif: ['"Cormorant Garamond"', 'serif'],
                sans: ['"DM Sans"', 'sans-serif'],
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
