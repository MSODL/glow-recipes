/**
 * Header Component
 * Displays the application title and subtitle
 */
export class Header {
    constructor() {
        this.element = this.render();
    }

    render() {
        const header = document.createElement('header');
        header.innerHTML = `
            <h1>Glow Recipes</h1>
            <p class="subtitle">Nourishing. Gluten-Free. Dairy-Free. Balanced.</p>
        `;
        return header;
    }

    mount(parentElement) {
        parentElement.appendChild(this.element);
    }
}
