document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('[data-purpose="primary-artworks-grid"]');
    if (!grid) return;

    const categoryByTitle = {
        'Sienna Horizon Canvas': 'oil-paintings',
        'Silent Arch Minimalist': 'minimalist-art',
        'Autumn Nocturne Oil': 'oil-paintings',
        'Alpine Mist & Pine Study': 'landscape-paintings',
        'Terracotta Ochre Study': 'abstract-art',
        'Ethereal Shoreline Diptych': 'landscape-paintings',
        'Venetian Canal Reflections': 'landscape-paintings',
        'Geometric Balance No. 4': 'abstract-art',
        'Solitude Geometrica': 'minimalist-art',
        'Architectural Pure Linen': 'minimalist-art',
        'Highland Mist Landscape': 'landscape-paintings',
        'Renaissance Portico Study': 'oil-paintings'
    };

    const cards = [...grid.querySelectorAll('.art-card')].map((card, index) => {
        const title = card.querySelector('h3')?.textContent.trim() || '';
        const priceLabel = [...card.querySelectorAll('span')]
            .find(span => /^\$[\d,]+(?:\.\d{2})?$/.test(span.textContent.trim()) && !span.classList.contains('line-through'));
        const price = priceLabel ? Number(priceLabel.textContent.replace(/[$,]/g, '')) : NaN;

        if (!categoryByTitle[title] || !Number.isFinite(price)) {
            console.error(`Unable to filter artwork card "${title}". Check its title, category, and price.`);
        }

        return {
            element: card,
            title,
            category: categoryByTitle[title] || '',
            price,
            index
        };
    });

    const categoryCounts = new Map();
    cards.forEach(card => {
        categoryCounts.set(card.category, (categoryCounts.get(card.category) || 0) + 1);
    });
    document.querySelectorAll('[data-category-count]').forEach(element => {
        const category = element.dataset.categoryCount;
        element.textContent = category === 'all' ? cards.length : (categoryCounts.get(category) || 0);
    });

    const minimumInput = document.querySelector('[data-price-min]');
    const maximumInput = document.querySelector('[data-price-max]');
    const sortSelect = document.querySelector('[data-sort-artworks]');
    const countLabel = document.querySelector('[data-artwork-count]');
    const emptyMessage = document.querySelector('[data-empty-results]');
    let activeCategory = 'all';

    function readPrice(input, fallback) {
        const value = input.value.trim();
        if (!value) return fallback;
        const number = Number(value);
        return Number.isFinite(number) ? Math.min(1200, Math.max(0, number)) : fallback;
    }

    function applyFilters() {
        const minimum = readPrice(minimumInput, 0);
        const maximum = readPrice(maximumInput, 1200);
        minimumInput.value = minimum;
        maximumInput.value = maximum;

        const sort = sortSelect.value;
        const sortedCards = [...cards].sort((a, b) => {
            if (sort === 'price-low') return a.price - b.price || a.index - b.index;
            if (sort === 'price-high') return b.price - a.price || a.index - b.index;
            if (sort === 'name') return a.title.localeCompare(b.title) || a.index - b.index;
            return a.index - b.index;
        });

        let visibleCount = 0;
        sortedCards.forEach(card => {
            const visible = (activeCategory === 'all' || card.category === activeCategory)
                && card.price >= minimum
                && card.price <= maximum;
            card.element.style.display = visible ? '' : 'none';
            if (visible) visibleCount += 1;
            grid.appendChild(card.element);
        });

        countLabel.textContent = visibleCount;
        emptyMessage.classList.toggle('hidden', visibleCount > 0);
    }

    document.querySelectorAll('[data-category-filter]').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            activeCategory = link.dataset.categoryFilter;
            document.querySelectorAll('[data-category-filter]').forEach(categoryLink => {
                const isActive = categoryLink === link;
                categoryLink.classList.toggle('text-terracotta', isActive);
                categoryLink.classList.toggle('font-semibold', isActive);
                categoryLink.classList.toggle('hover:text-obsidian', !isActive);
            });
            applyFilters();
        });
    });

    [minimumInput, maximumInput].forEach(input => {
        input.addEventListener('input', () => {
            if (Number(minimumInput.value) > Number(maximumInput.value)) {
                if (input === minimumInput) maximumInput.value = minimumInput.value;
                else minimumInput.value = maximumInput.value;
            }
            applyFilters();
        });
    });

    sortSelect.addEventListener('change', applyFilters);
    document.querySelector('[data-reset-filters]').addEventListener('click', () => {
        activeCategory = 'all';
        minimumInput.value = '0';
        maximumInput.value = '1200';
        sortSelect.value = 'default';
        document.querySelector('[data-category-filter="all"]').click();
    });

    applyFilters();
});
