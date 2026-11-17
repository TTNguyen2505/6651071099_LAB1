tailwind.config = {
    theme: {
        extend: {
            colors: {
                alabaster: '#FAF8F5',
                stoneSurface: '#EFECE6',
                stoneBorder: '#E2DDD5',
                obsidian: '#1A1918',
                taupeGray: '#6E6A63',
                terracotta: '#B85233',
                terracottaHover: '#9F4327',
                antiqueBrass: '#B58E4C',
            },
            fontFamily: {
                serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
                sans: ['DM Sans', 'sans-serif'],
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Small interactivity hooks for UI states
    const favoriteButtons = document.querySelectorAll('.action-overlay button');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
});
