class TyperChar extends HTMLElement {

    static observedAttributes = ["char", "state"];

    constructor() {
        super();
    }

    connectedCallback() {
        if(this.shadowRoot)
            return;

        this.attachShadow({ mode: 'open' });

        const span = document.createElement('span');
        this.shadowRoot.appendChild(span);

        this.attributeChangedCallback('char', null, this.getAttribute('char'));
        this.attributeChangedCallback('state', null, this.getAttribute('state'));

        const style = document.createElement('style');
        style.textContent = `
            span {
                font-weight: 300;
                font-size: 35px;
            }

            .past-warning {
                background-color: rgb(255, 233, 178);
            }

            .past-error {
                background-color: rgb(189, 146, 146);
            }

            .past-success {
                background-color: rgb(221, 221, 221);
            }
        `;

        this.shadowRoot.appendChild(style);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.connectedCallback();

        if (!this.shadowRoot)
            return;

        const element = this.shadowRoot.children[0];

        if (name == 'char')
            element.textContent = newValue;

        if (name == 'state') {
            if (newValue == 'success')
                element.className = 'past-success';
            else if (newValue == 'error')
                element.className = 'past-error';
            else if (newValue == 'warning')
                element.className = 'past-warning';
        }
    }
}

customElements.define('typer-char', TyperChar);
