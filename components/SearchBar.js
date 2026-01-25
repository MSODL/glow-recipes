/**
 * SearchBar Component
 * Handles search input and triggers search events
 */
export class SearchBar {
    constructor({ placeholder = "Ask AI Chef... (e.g. 'Spicy Lentil Tacos')", onSearch }) {
        this.placeholder = placeholder;
        this.onSearch = onSearch;
        this.element = this.render();
        this.attachEventListeners();
    }

    render() {
        const container = document.createElement('div');
        container.className = 'search-container';
        container.innerHTML = `
            <input 
                type="text" 
                id="ai-search-input" 
                class="search-bar"
                placeholder="${this.placeholder}"
            >
            <span class="search-icon" id="search-btn">✨</span>
        `;
        return container;
    }

    attachEventListeners() {
        const input = this.element.querySelector('#ai-search-input');
        const button = this.element.querySelector('#search-btn');

        // Enter key search
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        // Button click search
        button.addEventListener('click', () => {
            this.handleSearch();
        });
    }

    handleSearch() {
        const input = this.element.querySelector('#ai-search-input');
        const query = input.value.trim();
        if (this.onSearch) {
            this.onSearch(query);
        }
    }

    mount(parentElement) {
        parentElement.appendChild(this.element);
    }
}
