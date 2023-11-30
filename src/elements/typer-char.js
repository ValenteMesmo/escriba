class TyperChar extends HTMLElement {

    contructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({mode:'open'});
    }

    get char() {
        const content = this.shadowRoot.getElementById('content');

        //content.
    }

    set char(value) {
        const content = this.shadowRoot.getElementById('content');
    }
}

customElements.define('typer-char', TyperChar);
