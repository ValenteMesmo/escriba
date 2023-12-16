class TyperBookSection extends HTMLElement {

    static observedAttributes = ["id", "chapter", "section"];

    connectedCallback() {
        if (this.shadowRoot)
            return;

        this.attachShadow({ mode : "open" });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.connectedCallback();

        console.log(name);

        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = '';

        const div = document.createElement('div');
        
        div.setAttribute('id', 'uepa')
        this.shadowRoot.appendChild(div);
    }
}

customElements.define('typer-book-section', TyperBookSection);
