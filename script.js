document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('recipe-container');
    const searchInput = document.getElementById('ai-search-input');
    const searchBtn = document.getElementById('search-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const loadingState = document.getElementById('loading-state');

    window.allRecipes = [];
    window.activeFilters = new Set();
    window.searchTerm = "";

    // --- Embedded Data (No Server Required) ---
    const embeddedRecipes = [
        {
            "Title": "Lemon Herb Grilled Salmon with Quinoa and Asparagus",
            "Calories": 450,
            "Net Carbs": 28,
            "Protein": 42,
            "Fat": 18,
            "Fiber": 6,
            "Prep Time": "15 mins",
            "Cook Time": "20 mins",
            "Ingredients": [
                "2 (6oz) wild-caught salmon fillets",
                "1 cup cooked quinoa",
                "1 bunch asparagus, woody ends trimmed",
                "2 tbsp olive oil",
                "1 lemon, sliced and juiced",
                "2 cloves garlic, minced",
                "1 tsp dried oregano",
                "Salt and black pepper to taste"
            ],
            "Instructions": [
                "Preheat grill or grill pan to medium-high heat.",
                "In a small bowl, whisk together olive oil, lemon juice, minced garlic, oregano, salt, and pepper.",
                "Brush the salmon fillets and asparagus with the marinade.",
                "Grill salmon for 4-5 minutes per side until cooked through and flaky.",
                "Grill asparagus for 3-4 minutes until tender-crisp with char marks.",
                "Serve salmon over a bed of warm quinoa with grilled asparagus and lemon slices."
            ],
            "Substitutions": "Use cauliflower rice instead of quinoa to lower carbs further.",
            "Glycemic Impact": "Low",
            "Tags": ["Dairy-Free", "Gluten-Free", "Type 2 Friendly", "High-Protein"]
        },
        {
            "Title": "Turkey and Sweet Potato Skillet",
            "Calories": 380,
            "Net Carbs": 22,
            "Protein": 35,
            "Fat": 15,
            "Fiber": 8,
            "Prep Time": "10 mins",
            "Cook Time": "25 mins",
            "Ingredients": [
                "1 lb lean ground turkey",
                "2 medium sweet potatoes, cubed (keep skin on for fiber)",
                "1 bell pepper, chopped",
                "1 onion, chopped",
                "2 cups kale, chopped",
                "1 tbsp avocado oil",
                "1 tsp paprika",
                "1/2 tsp cumin",
                "Salt and pepper to taste"
            ],
            "Instructions": [
                "Heat avocado oil in a large skillet over medium heat.",
                "Add onion and sweet potatoes. Cook for 8-10 minutes until potatoes soften, stirring occasionally.",
                "Add ground turkey and spices. Cook until turkey is browned and cooked through, breaking it apart with a spoon.",
                "Stir in bell pepper and cook for another 3 minutes.",
                "Add kale and a splash of water. Cover and steam for 2 minutes until kale is wilted.",
                "Season with salt and pepper before serving."
            ],
            "Substitutions": "Use butternut squash instead of sweet potatoes for a different flavor profile.",
            "Glycemic Impact": "Low to Moderate",
            "Tags": ["Dairy-Free", "Gluten-Free"]
        },
        {
            "Title": "Zucchini Noodle Stir-Fry with Tofu",
            "Calories": 320,
            "Net Carbs": 12,
            "Protein": 25,
            "Fat": 18,
            "Fiber": 5,
            "Prep Time": "20 mins",
            "Cook Time": "15 mins",
            "Ingredients": [
                "1 block extra-firm tofu, pressed and cubed",
                "3 medium zucchini, spiralized",
                "1 cup broccoli florets",
                "1 red bell pepper, sliced",
                "2 tbsp sesame oil",
                "2 tbsp coconut aminos (soy sauce alternative)",
                "1 tbsp fresh ginger, grated",
                "1 tbsp sesame seeds",
                "Green onions for garnish"
            ],
            "Instructions": [
                "Heat 1 tbsp sesame oil in a wok or large pan over high heat.",
                "Add tofu cubes and fry until golden brown on all sides. Remove and set aside.",
                "Add remaining oil, broccoli, and peppers. Stir-fry for 3-4 minutes.",
                "Add zucchini noodles, ginger, and coconut aminos. Toss for 1-2 minutes until zucchini is just tender (do not overcook).",
                "Return tofu to the pan and toss to combine.",
                "Garnish with sesame seeds and green onions."
            ],
            "Substitutions": "Chicken breast or shrimp can replace tofu.",
            "Glycemic Impact": "Very Low",
            "Tags": ["Vegan", "Dairy-Free", "Gluten-Free", "Type 2 Friendly", "Low-Carb"]
        },
        {
            "Title": "Spicy Lentil Tacos",
            "Calories": 340,
            "Net Carbs": 30,
            "Protein": 18,
            "Fat": 12,
            "Fiber": 14,
            "Prep Time": "15 mins",
            "Cook Time": "20 mins",
            "Ingredients": [
                "1 cup dried brown lentils, rinsed",
                "2.5 cups vegetable broth",
                "1 tbsp olive oil",
                "1/2 onion, diced",
                "2 tbsp homemade taco seasoning (chili powder, cumin, paprika)",
                "Corn tortillas for serving"
            ],
            "Instructions": [
                "Sauté onion in oil until soft.",
                "Add lentils, broth, and taco seasoning. Bring to a boil, then simmer covered for 20-25 minutes until lentils are tender.",
                "Mash slightly to create a texture similar to ground meat.",
                "Serve in warm corn tortillas with avocado."
            ],
            "Substitutions": "Serve over lettuce for a taco salad.",
            "Glycemic Impact": "Medium",
            "Tags": ["Vegan", "Dairy-Free", "Gluten-Free", "Type 2 Friendly", "Hidden"]
        },
        {
            "Title": "Creamy Coconut Chicken Curry",
            "Calories": 480,
            "Net Carbs": 12,
            "Protein": 35,
            "Fat": 32,
            "Fiber": 4,
            "Prep Time": "10 mins",
            "Cook Time": "30 mins",
            "Ingredients": [
                "1 lb chicken thighs, chopped",
                "1 can full-fat coconut milk",
                "1 tbsp curry powder",
                "1 cup cauliflower florets",
                "1/2 cup green beans",
                "1 tbsp coconut oil"
            ],
            "Instructions": [
                "Brown chicken in coconut oil in a pot.",
                "Add curry powder and stir until fragrant.",
                "Pour in coconut milk and add vegetables. Simmer for 20 minutes.",
                "Season with salt and splash of lime juice."
            ],
            "Substitutions": "Tofu or chickpeas for a vegan version.",
            "Glycemic Impact": "Low",
            "Tags": ["Dairy-Free", "Gluten-Free", "Type 2 Friendly", "Hidden"]
        },
        {
            "Title": "Berry Chia Seed Pudding",
            "Calories": 220,
            "Net Carbs": 8,
            "Protein": 8,
            "Fat": 16,
            "Fiber": 11,
            "Prep Time": "5 mins",
            "Cook Time": "0 mins",
            "Ingredients": [
                "3 tbsp chia seeds",
                "1 cup unsweetened almond milk",
                "1/2 tsp vanilla extract",
                "1/2 cup fresh berries (strawberries, blueberries)",
                "Swerve or stevia to taste"
            ],
            "Instructions": [
                "Mix chia seeds, almond milk, and vanilla in a jar.",
                "Let sit for 5 minutes, stir again to prevent clumps.",
                "Refrigerate for at least 2 hours or overnight.",
                "Top with fresh berries before serving."
            ],
            "Substitutions": "Use coconut milk for a creamier texture.",
            "Glycemic Impact": "Very Low",
            "Tags": ["Vegan", "Dairy-Free", "Gluten-Free", "Type 2 Friendly", "Hidden", "Breakfast"]
        },
        {
            "Title": "Almond Flour Pancakes",
            "Calories": 280,
            "Net Carbs": 6,
            "Protein": 12,
            "Fat": 22,
            "Fiber": 4,
            "Prep Time": "10 mins",
            "Cook Time": "10 mins",
            "Ingredients": [
                "1 cup almond flour",
                "2 eggs",
                "1/4 cup almond milk",
                "1 tbsp oil",
                "1 tsp baking powder",
                "Sugar-free syrup for serving"
            ],
            "Instructions": [
                "Whisk all ingredients in a bowl until smooth.",
                "Heat a non-stick skillet over medium heat.",
                "Pour batter to form small pancakes.",
                "Cook for 2-3 minutes per side until golden."
            ],
            "Substitutions": "Add blueberries to the batter.",
            "Glycemic Impact": "Low",
            "Tags": ["Dairy-Free", "Gluten-Free", "Type 2 Friendly", "Hidden", "Breakfast"]
        },
        {
            "Title": "Roasted Spicy Chickpeas",
            "Calories": 180,
            "Net Carbs": 18,
            "Protein": 10,
            "Fat": 6,
            "Fiber": 8,
            "Prep Time": "5 mins",
            "Cook Time": "30 mins",
            "Ingredients": [
                "1 can chickpeas, drained and patted dry",
                "1 tbsp olive oil",
                "1 tsp cumin",
                "1 tsp chili powder",
                "Salt to taste"
            ],
            "Instructions": [
                "Preheat oven to 400°F (200°C).",
                "Toss chickpeas with oil and spices.",
                "Spread on a baking sheet.",
                "Roast for 25-30 minutes until crispy."
            ],
            "Substitutions": "Use nutritional yeast for a cheesy flavor.",
            "Glycemic Impact": "Medium",
            "Tags": ["Vegan", "Dairy-Free", "Gluten-Free", "Type 2 Friendly", "Hidden", "Snack"]
        }
    ];

    window.allRecipes = embeddedRecipes;
    // renderRecipes(); // Initial Render - Moved to bottom to avoid hoisting issues

    // --- Event Listeners ---

    // 1. Filter Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const filter = btn.dataset.filter;

            if (window.activeFilters.has(filter)) {
                window.activeFilters.delete(filter);
            } else {
                window.activeFilters.add(filter);
            }
            renderRecipes();
        });
    });

    // 2. Search Logic (Improved with Smart Keyword Matching & Fallback)
    window.handleSearch = function () {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            window.searchTerm = "";
            window.renderRecipes();
            return;
        }

        container.style.display = 'none';
        loadingState.style.display = 'block';

        // Dynamic loading time (1s to 2s) for realism
        const delay = Math.floor(Math.random() * 1000) + 1000;

        setTimeout(() => {
            loadingState.style.display = 'none';
            container.style.display = 'grid';
            window.searchTerm = query;

            // Check if we found anything with the new search term
            const results = getFilteredRecipes();

            if (results.length === 0) {
                // FALLBACK: Generate a new recipe if none found
                generateNewRecipe(query);
            } else {
                window.renderRecipes();
            }
        }, delay);
    }

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') window.handleSearch();
    });

    searchBtn.addEventListener('click', window.handleSearch);

    // --- Dynamic Recipe Generator (Mock AI) ---
    function generateNewRecipe(query) {
        // If query is empty, ignore
        if (!query) return;

        // Reset search/filter display to show loading
        container.style.display = 'none';
        loadingState.style.display = 'block';

        setTimeout(() => {
            loadingState.style.display = 'none';
            container.style.display = 'grid';

            const proteins = ["Chicken", "Tofu", "Salmon", "Lentils", "Turkey", "Beef", "Shrimp"];
            const veg = ["Spinach", "Kale", "Broccoli", "Cauliflower", "Sweet Potato", "Zucchini", "Asparagus"];
            const styles = ["Roast", "Stir-Fry", "Power Bowl", "Salad", "Curry", "Skillet", "Soup"];

            const p = proteins[Math.floor(Math.random() * proteins.length)];
            const v = veg[Math.floor(Math.random() * veg.length)];
            const s = styles[Math.floor(Math.random() * styles.length)];

            // Create a title that feels responsive to the query
            // Parse query gently
            const cleanQuery = query.replace(/[^\w\s]/gi, '');
            const title = `AI Generated: ${cleanQuery.split(' ')[0].charAt(0).toUpperCase() + cleanQuery.split(' ')[0].slice(1)} ${s}`;

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

            // Allow the new recipe to match the current filters if possible (mocking it)
            if (window.activeFilters.size > 0) {
                window.activeFilters.forEach(f => {
                    if (!newRecipe.Tags.includes(f)) newRecipe.Tags.push(f);
                });
            }

            // Add to global list
            window.allRecipes.unshift(newRecipe);

            // Clear search term if we generated from a button click to ensure it shows
            // But if it was a search, keep it? 
            // Better UX: Show everything
            window.searchTerm = "";
            window.renderRecipes();

            // Scroll to top to see new recipe
            window.scrollTo({ top: 0, behavior: 'smooth' });

        }, 1500);
    }

    // Expose for inline usage
    window.generateNewRecipe = generateNewRecipe;

    // Helper to filter recipes without rendering (used for checking count)
    function getFilteredRecipes() {
        return window.allRecipes.filter(recipe => {
            // 1. Tag Filters
            if (window.activeFilters.size > 0) {
                const hasAllFilters = Array.from(window.activeFilters).every(filter => recipe.Tags && recipe.Tags.includes(filter));
                if (!hasAllFilters) return false;
            }

            // 2. Search Logic (Smart Keyword Matching)
            if (window.searchTerm) {
                const terms = window.searchTerm.split(/\s+(?:or|and|,)\s+|\s+/).filter(t => t.length > 2);

                if (terms.length === 0) return false;

                const matchesSearch = terms.some(term =>
                    recipe.Title.toLowerCase().includes(term) ||
                    (recipe.Ingredients && recipe.Ingredients.some(i => i.toLowerCase().includes(term))) ||
                    (recipe.Tags && recipe.Tags.some(t => t.toLowerCase().includes(term)))
                );
                return matchesSearch;
            } else {
                return !(recipe.Tags && recipe.Tags.includes('Hidden') && !recipe.Tags.includes('AI-Generated'));
            }
        });
    }

    window.renderRecipes = function () {
        container.innerHTML = '';
        const filteredRecipes = getFilteredRecipes();

        if (filteredRecipes.length === 0) {
            container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">
                <h3>No recipes found</h3>
                <p>Try being less specific or check your spelling.</p>
                ${window.activeFilters.size > 0 ? `
                <div class="action-card">
                    <p style="margin-bottom: 1rem;">Want to create a recipe that matches these filters?</p>
                    <button class="find-more-btn" onclick="window.generateNewRecipe('${Array.from(window.activeFilters).join(' ')}')">
                        Ask AI for ${Array.from(window.activeFilters).join(', ')} Recipes
                    </button>
                </div>` : ''}
            </div>`;
            return;
        }

        filteredRecipes.forEach((recipe, index) => {
            const card = document.createElement('div');
            card.className = 'recipe-card';

            const ingredientsHtml = recipe.Ingredients.map(ing => `<li>${ing}</li>`).join('');
            const instructionsHtml = recipe.Instructions.map(inst => `<li>${inst}</li>`).join('');
            const tagsHtml = recipe.Tags ? recipe.Tags.filter(t => t !== 'Hidden').map(tag => `<span class="tag glycemic" style="border-color: var(--secondary-accent); color: var(--secondary-accent);">${tag}</span>`).join('') : '';

            card.innerHTML = `
                <div class="card-header">
                    <div class="tags">
                        <span class="tag glycemic">GI: ${recipe['Glycemic Impact']}</span>
                        <span class="tag time">Prep: ${recipe['Prep Time']}</span>
                        ${tagsHtml}
                    </div>
                    <h2 class="recipe-title">${recipe.Title}</h2>
                </div>
                <div class="macros">
                    <div class="macro-item"><span class="macro-val">${recipe.Calories}</span><span class="macro-label">Cals</span></div>
                    <div class="macro-item net-carbs"><span class="macro-val">${recipe['Net Carbs']}g</span><span class="macro-label">Carbs</span></div>
                    <div class="macro-item"><span class="macro-val">${recipe.Protein}g</span><span class="macro-label">Prot</span></div>
                    <div class="macro-item"><span class="macro-val">${recipe.Fat}g</span><span class="macro-label">Fat</span></div>
                </div>
                <div class="details">
                    <h3 class="section-title">Ingredients</h3>
                    <ul class="ingredients-list">${ingredientsHtml}</ul>
                    <h3 class="section-title">Instructions</h3>
                    <ol class="instructions-list">${instructionsHtml}</ol>
                </div>
                <div class="substitutions"><strong>Swap Tip:</strong> ${recipe.Substitutions}</div>
            `;
            container.appendChild(card);
        });

        // Smart Trigger: If filters are active, show "Find More" button at the bottom
        if (window.activeFilters.size > 0) {
            const filterContext = Array.from(window.activeFilters).join(', ');
            const actionCard = document.createElement('div');
            actionCard.className = 'action-card';
            actionCard.innerHTML = `
                <p style="color: var(--text-muted); margin-bottom: 1rem;">Looking for something else?</p>
                <button class="find-more-btn">
                     ✨ Generate more ${filterContext} recipes
                </button>
            `;
            actionCard.querySelector('button').addEventListener('click', () => {
                window.generateNewRecipe(filterContext);
            });
            container.appendChild(actionCard);
        }
    }
    // Initial Render (Called after definition)
    renderRecipes();
});
