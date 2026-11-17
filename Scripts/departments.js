const departmentCategories = [
    'Oil Paintings',
    'Abstract Art',
    'Landscape Paintings',
    'Canvas Prints',
    'Minimalist Art',
    'Watercolor',
    'Portrait Art',
    'Framed Sets',
    'Modern Wall Art',
    'Traditional Lacquer'
];

document.addEventListener('DOMContentLoaded', () => {
    const toggles = [...document.querySelectorAll('[data-department-toggle]')];

    toggles.forEach((toggle, index) => {
        let menu = document.getElementById(toggle.dataset.departmentMenu);
        if (!menu) {
            menu = document.createElement('div');
            menu.id = `departmentMenu${index + 1}`;
            menu.className = 'hidden absolute left-0 top-full z-50 w-full min-w-56 rounded-sm border border-gray-200 bg-white py-2 shadow-xl';

            departmentCategories.forEach(category => {
                const link = document.createElement('a');
                link.className = 'block px-4 py-2 text-sm text-gray-800 transition-colors hover:bg-gray-100 hover:text-terracotta';
                link.href = 'shop.html';
                link.textContent = category;
                menu.appendChild(link);
            });

            toggle.parentElement.classList.add('relative');
            toggle.insertAdjacentElement('afterend', menu);
        }

        toggle.setAttribute('aria-controls', menu.id);
        const expanded = !menu.classList.contains('hidden');
        toggle.setAttribute('aria-expanded', String(expanded));

        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggles.forEach(otherToggle => {
                if (otherToggle === toggle) return;
                const otherMenu = document.getElementById(otherToggle.getAttribute('aria-controls'));
                otherMenu?.classList.add('hidden');
                otherToggle.setAttribute('aria-expanded', 'false');
            });

            menu.classList.toggle('hidden', isExpanded);
            toggle.setAttribute('aria-expanded', String(!isExpanded));
            const chevron = toggle.querySelector('#deptChevron');
            if (chevron) chevron.classList.toggle('rotate-180', !isExpanded);
        });
    });

    document.addEventListener('click', event => {
        toggles.forEach(toggle => {
            const menu = document.getElementById(toggle.getAttribute('aria-controls'));
            if (!toggle.contains(event.target) && !menu.contains(event.target)) {
                menu.classList.add('hidden');
                toggle.setAttribute('aria-expanded', 'false');
                const chevron = toggle.querySelector('#deptChevron');
                if (chevron) chevron.classList.remove('rotate-180');
            }
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        toggles.forEach(toggle => {
            const menu = document.getElementById(toggle.getAttribute('aria-controls'));
            if (!menu.classList.contains('hidden')) {
                menu.classList.add('hidden');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.querySelector('#deptChevron')?.classList.remove('rotate-180');
                toggle.focus();
            }
        });
    });
});
