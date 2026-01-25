/**
 * Main App Logic
 * Manages state and orchestrates all components
 */
import { Header } from './components/Header.js';
import { SearchBar } from './components/SearchBar.js';
import { FilterBar } from './components/FilterBar.js';
import { RecipeGrid } from './components/RecipeGrid.js';
import { embeddedRecipes } from './data/recipes.js';

class GlowRecipesApp {
    constructor() {
        // State
        this.allRecipes = [...embeddedRecipes];
        this.activeFilters = new Set();
        this.searchTerm = '';
        this.isLoading = false;

        // Filter options
        this.availableFilters = ['Vegan', 'Dairy-Free', 'Gluten-Free', 'Type 2 Friendly'];

        // Initialize components
        this.initComponents();
        this.render();
    }

    initComponents() {
        // Header
        this.header = new Header();

        // SearchBar
        this.searchBar = new SearchBar({
            placeholder: "Ask AI Chef... (e.g. 'Spicy Lentil Tacos')",
            onSearch: (query) => this.handleSearch(query)
        });

        // FilterBar
        this.filterBar = new FilterBar({
            filters: this.availableFilters,
            activeFilters: this.activeFilters,
            onFilterToggle: (filter) => this.handleFilterToggle(filter)
        });

        // RecipeGrid
        this.recipeGrid = new RecipeGrid({
            recipes: this.getFilteredRecipes(),
            isLoading: this.isLoading,
            activeFilters: this.activeFilters,
            onGenerateMore: (context) => this.generateNewRecipe(context)
        });
    }

    render() {
        const body = document.body;

        // Mount header
        this.header.mount(body);

        // Mount controls section
        const controlsSection = document.createElement('div');
        controlsSection.className = 'controls-section';

        const mainContainer = document.createElement('main');
        mainContainer.className = 'container';

        this.searchBar.mount(controlsSection);
        this.filterBar.mount(controlsSection);

        mainContainer.appendChild(controlsSection);
        this.recipeGrid.mount(mainContainer);

        body.appendChild(mainContainer);
    }

    handleFilterToggle(filter) {
        if (this.activeFilters.has(filter)) {
            this.activeFilters.delete(filter);
        } else {
            this.activeFilters.add(filter);
        }
        this.updateRecipes();
    }

    handleSearch(query) {
        if (!query) {
            this.searchTerm = '';
            this.updateRecipes();
            return;
        }

        // Show loading
        this.isLoading = true;
        this.recipeGrid.update({ isLoading: true });

        // Simulate AI processing
        const delay = Math.floor(Math.random() * 1000) + 1000;

        setTimeout(() => {
            this.searchTerm = query.toLowerCase();
            const results = this.getFilteredRecipes();

            if (results.length === 0) {
                // Generate new recipe if no match found
                this.generateNewRecipe(query);
            } else {
                this.isLoading = false;
                this.updateRecipes();
            }
        }, delay);
    }

    getFilteredRecipes() {
        return this.allRecipes.filter(recipe => {
            // 1. Tag Filters
            if (this.activeFilters.size > 0) {
                const hasAllFilters = Array.from(this.activeFilters).every(
                    filter => recipe.Tags && recipe.Tags.includes(filter)
                );
                if (!hasAllFilters) return false;
            }

            // 2. Search Logic (Smart Keyword Matching)
            if (this.searchTerm) {
                const terms = this.searchTerm
                    .split(/\s+(?:or|and|,)\s+|\s+/)
                    .filter(t => t.length > 2);

                if (terms.length === 0) return false;

                const matchesSearch = terms.some(term =>
                    recipe.Title.toLowerCase().includes(term) ||
                    (recipe.Ingredients && recipe.Ingredients.some(i => i.toLowerCase().includes(term))) ||
                    (recipe.Tags && recipe.Tags.some(t => t.toLowerCase().includes(term)))
                );
                return matchesSearch;
            } else {
                // Hide recipes tagged as "Hidden" unless they're AI-generated
                return !(recipe.Tags && recipe.Tags.includes('Hidden') && !recipe.Tags.includes('AI-Generated'));
            }
        });
    }

    generateNewRecipe(query) {
        const proteins = ["Chicken", "Tofu", "Salmon", "Lentils", "Turkey", "Beef", "Shrimp"];
        const veg = ["Spinach", "Kale", "Broccoli", "Cauliflower", "Sweet Potato", "Zucchini", "Asparagus"];
        const styles = ["Roast", "Stir-Fry", "Power Bowl", "Salad", "Curry", "Skillet", "Soup"];

        const p = proteins[Math.floor(Math.random() * proteins.length)];
        const v = veg[Math.floor(Math.random() * veg.length)];
        const s = styles[Math.floor(Math.random() * styles.length)];

        // Create a title that feels responsive to the query
        const cleanQuery = query.replace(/[^\w\s]/gi, '');
        const firstWord = cleanQuery.split(' ')[0];
        const title = `AI Generated: ${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${s}`;

        const newRecipe = {
            "Title": title,
            "Calories": 350 + Math.floor(Math.random() * 200),
            "Net Carbs": 10 + Math.floor(Math.random() * 25),
            "Protein": 20 + Math.floor(Math.random() * 20),
            "Fat": 12 + Math.floor(Math.random() * 15),
            "Fiber": 5 + Math.floor(Math.random() * 8),
            "Prep Time": "10 mins",
            "Cook Time": "25 mins",
            "Ingredients": [
                `1 portion ${p}`,
                `1 cup ${v}`,
                "1 tbsp Avocado Oil",
                "Custom Spice Blend",
                "Fresh Herbs for garnish"
            ],
            "Instructions": [
                `Start by prepping the ${p} and chopping the ${v}.`,
                `Heat oil in a pan over medium heat.`,
                `Cook ${p} thoroughly.`,
                `Add ${v} and sauté until tender.`,
                `Serve hot and enjoy!`
            ],
            "Substitutions": `Swap ${p} for Edamame for a plant-based twist.`,
            "Glycemic Impact": "Low",
            "Tags": ["AI-Generated", "Type 2 Friendly", "Gluten-Free"]
        };

        // Allow the new recipe to match the current filters
        if (this.activeFilters.size > 0) {
            this.activeFilters.forEach(f => {
                if (!newRecipe.Tags.includes(f)) newRecipe.Tags.push(f);
            });
        }

        // Add to global list
        this.allRecipes.unshift(newRecipe);

        // Clear search term and update
        this.searchTerm = '';
        this.isLoading = false;
        this.updateRecipes();

        // Scroll to top to see new recipe
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateRecipes() {
        const filteredRecipes = this.getFilteredRecipes();
        this.recipeGrid.update({
            recipes: filteredRecipes,
            isLoading: this.isLoading,
            activeFilters: this.activeFilters
        });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new GlowRecipesApp();
});
