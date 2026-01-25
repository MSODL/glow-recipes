/**
 * RecipeGrid Component
 * Container for recipe cards, handles loading and empty states
 */
import { RecipeCard } from './RecipeCard.js';

export class RecipeGrid {
    constructor({ recipes = [], isLoading = false, onGenerateMore, activeFilters }) {
        this.recipes = recipes;
        this.isLoading = isLoading;
        this.onGenerateMore = onGenerateMore;
        this.activeFilters = activeFilters || new Set();
        this.element = this.createContainer();
        this.loadingElement = this.createLoadingOverlay();
        this.render();
    }

    createContainer() {
        const container = document.createElement('div');
        container.id = 'recipe-container';
        container.className = 'recipe-grid';
        return container;
    }

    createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'loading-state';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Consulting the AI Chef...</p>
        `;
        overlay.style.display = 'none';
        return overlay;
    }

    render() {
        this.element.innerHTML = '';

        if (this.isLoading) {
            this.showLoading();
            return;
        }

        this.hideLoading();

        if (this.recipes.length === 0) {
            this.renderEmptyState();
            return;
        }

        // Render recipe cards
        this.recipes.forEach(recipe => {
            const card = new RecipeCard(recipe);
            card.mount(this.element);
        });

        // Add "generate more" button if filters are active
        if (this.activeFilters.size > 0) {
            this.renderActionCard();
        }
    }

    renderEmptyState() {
        const filterContext = Array.from(this.activeFilters).join(', ');
        this.element.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">
                <h3>No recipes found</h3>
                <p>Try being less specific or check your spelling.</p>
                ${this.activeFilters.size > 0 && this.onGenerateMore ? `
                <div class="action-card">
                    <p style="margin-bottom: 1rem;">Want to create a recipe that matches these filters?</p>
                    <button class="find-more-btn" id="generate-empty-btn">
                        Ask AI for ${filterContext} Recipes
                    </button>
                </div>` : ''}
            </div>
        `;

        if (this.activeFilters.size > 0 && this.onGenerateMore) {
            const btn = this.element.querySelector('#generate-empty-btn');
            btn?.addEventListener('click', () => {
                this.onGenerateMore(filterContext);
            });
        }
    }

    renderActionCard() {
        const filterContext = Array.from(this.activeFilters).join(', ');
        const actionCard = document.createElement('div');
        actionCard.className = 'action-card';
        actionCard.innerHTML = `
            <p style="color: var(--text-muted); margin-bottom: 1rem;">Looking for something else?</p>
            <button class="find-more-btn">
                ✨ Generate more ${filterContext} recipes
            </button>
        `;

        const button = actionCard.querySelector('button');
        button.addEventListener('click', () => {
            if (this.onGenerateMore) {
                this.onGenerateMore(filterContext);
            }
        });

        this.element.appendChild(actionCard);
    }

    showLoading() {
        this.element.style.display = 'none';
        this.loadingElement.style.display = 'block';
    }

    hideLoading() {
        this.element.style.display = 'grid';
        this.loadingElement.style.display = 'none';
    }

    update({ recipes, isLoading, activeFilters }) {
        this.recipes = recipes;
        this.isLoading = isLoading !== undefined ? isLoading : this.isLoading;
        this.activeFilters = activeFilters || this.activeFilters;
        this.render();
    }

    mount(parentElement) {
        parentElement.appendChild(this.loadingElement);
        parentElement.appendChild(this.element);
    }
}
