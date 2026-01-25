/**
 * FilterBar Component
 * Manages filter buttons and active state
 */
export class FilterBar {
    constructor({ filters, activeFilters = new Set(), onFilterToggle }) {
        this.filters = filters;
        this.activeFilters = activeFilters;
        this.onFilterToggle = onFilterToggle;
        this.element = this.render();
        this.attachEventListeners();
    }

    render() {
        const container = document.createElement('div');
        container.className = 'filter-container';

        this.filters.forEach(filter => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.dataset.filter = filter;
            button.textContent = filter;

            if (this.activeFilters.has(filter)) {
                button.classList.add('active');
            }

            container.appendChild(button);
        });

        return container;
    }

    attachEventListeners() {
        const buttons = this.element.querySelectorAll('.filter-btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                const filter = btn.dataset.filter;

                if (this.onFilterToggle) {
                    this.onFilterToggle(filter);
                }
            });
        });
    }

    mount(parentElement) {
        parentElement.appendChild(this.element);
    }

    update(activeFilters) {
        this.activeFilters = activeFilters;
        const buttons = this.element.querySelectorAll('.filter-btn');

        buttons.forEach(btn => {
            const filter = btn.dataset.filter;
            if (this.activeFilters.has(filter)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}
