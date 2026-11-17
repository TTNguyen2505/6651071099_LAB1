tailwind.config = {
    theme: {
        extend: {
            colors: {
                alabaster: '#FAF8F5',
                stoneSurface: '#EFECE6',
                hairline: '#E2DDD5',
                obsidian: '#1A1918',
                taupeMuted: '#6E6A63',
                terracotta: '#B85233',
                terracottaHover: '#A04327',
                antiqueBrass: '#B58E4C',
                sageSand: '#E3E6DF',
                clayCream: '#EFE2D5'
            },
            fontFamily: {
                serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
                display: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
                sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
// Initialize Lucide Icons
lucide.createIcons();

// Mobile Navigation Drawer Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('hidden');
    });
}

// Featured Artworks Category Filter Tab functionality
const filterTabs = document.querySelectorAll('.filter-tab');
const artCards = document.querySelectorAll('.art-card');

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Reset active style on tabs
        filterTabs.forEach(t => {
            t.classList.remove('active', 'font-bold', 'text-terracotta');
            t.classList.add('font-medium', 'text-taupeMuted');
            const underline = t.querySelector('span');
            if (underline) underline.remove();
        });

        // Set active on clicked tab
        tab.classList.add('active', 'font-bold', 'text-terracotta');
        tab.classList.remove('font-medium', 'text-taupeMuted');
        const line = document.createElement('span');
        line.className = 'absolute bottom-0 left-0 w-full h-[2px] bg-terracotta';
        tab.appendChild(line);

        const category = tab.getAttribute('data-category');
        artCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-cat') === category) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Mock Carousel Arrows subtle feedback
const catPrev = document.getElementById('catPrev');
const catNext = document.getElementById('catNext');
[catPrev, catNext].forEach(btn => {
    if (btn) {
        btn.addEventListener('click', () => {
            btn.classList.add('bg-stoneSurface');
            setTimeout(() => btn.classList.remove('bg-stoneSurface'), 200);
        });
    }
});
});

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
