/**
 * RecipeCard Component
 * Renders a single recipe card with all details
 */
export class RecipeCard {
    constructor(recipe) {
        this.recipe = recipe;
        this.element = this.render();
    }

    render() {
        const card = document.createElement('div');
        card.className = 'recipe-card';

        const ingredientsHtml = this.recipe.Ingredients
            .map(ing => `<li>${ing}</li>`)
            .join('');

        const instructionsHtml = this.recipe.Instructions
            .map(inst => `<li>${inst}</li>`)
            .join('');

        const tagsHtml = this.recipe.Tags
            ? this.recipe.Tags
                .filter(t => t !== 'Hidden')
                .map(tag => `<span class="tag glycemic" style="border-color: var(--secondary-accent); color: var(--secondary-accent);">${tag}</span>`)
                .join('')
            : '';

        card.innerHTML = `
            <div class="card-header">
                <div class="tags">
                    <span class="tag glycemic">GI: ${this.recipe['Glycemic Impact']}</span>
                    <span class="tag time">Prep: ${this.recipe['Prep Time']}</span>
                    ${tagsHtml}
                </div>
                <h2 class="recipe-title">${this.recipe.Title}</h2>
            </div>
            <div class="macros">
                <div class="macro-item"><span class="macro-val">${this.recipe.Calories}</span><span class="macro-label">Cals</span></div>
                <div class="macro-item net-carbs"><span class="macro-val">${this.recipe['Net Carbs']}g</span><span class="macro-label">Carbs</span></div>
                <div class="macro-item"><span class="macro-val">${this.recipe.Protein}g</span><span class="macro-label">Prot</span></div>
                <div class="macro-item"><span class="macro-val">${this.recipe.Fat}g</span><span class="macro-label">Fat</span></div>
            </div>
            <div class="details">
                <h3 class="section-title">Ingredients</h3>
                <ul class="ingredients-list">${ingredientsHtml}</ul>
                <h3 class="section-title">Instructions</h3>
                <ol class="instructions-list">${instructionsHtml}</ol>
            </div>
            <div class="substitutions"><strong>Swap Tip:</strong> ${this.recipe.Substitutions}</div>
        `;

        return card;
    }

    mount(parentElement) {
        parentElement.appendChild(this.element);
    }
}
