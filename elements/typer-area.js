class TyperArea extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        if (this.shadowRoot)
            return;

        this.attachShadow({ mode: "open" });

        const style = document.createElement("style");
        style.textContent = `
            #content {
                background-color: red;
            }
        `;
        this.shadowRoot.appendChild(style);

        document.addEventListener("keydown", e => {
            if (e.repeat)
                return;

            if (['ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'CapsLock'].includes(e.code)) {
                return;
            }

            const currentChar = this.shadowRoot.querySelectorAll('[state="0"]')[0];

            if (!currentChar)
                return;//completed

            if (e.key == 'Enter') {
                if(     currentChar.getAttribute('char') == '\n')
                {
                    
                currentChar.setAttribute('state', 'success');
                }
                else{
                    
                currentChar.setAttribute('state', 'error');
                }
            }
            else if (e.key == currentChar.getAttribute('char')) {
                currentChar.setAttribute('state', 'success');
            }
            else
                currentChar.setAttribute('state', 'error');
        });
    }

    setText(value) {
        this.connectedCallback();

        this.shadowRoot.innerHTML = '';

        const fragment = document.createDocumentFragment();

        for (const c of value) {
            const char = document.createElement('typer-char');
            char.setAttribute('char', c);
            char.setAttribute('state', '0');
            fragment.appendChild(char);

            if(c == '\n')
            fragment.appendChild(document.createElement('br'));
        }

        this.shadowRoot.appendChild(fragment);
    }
}

customElements.define("typer-area", TyperArea);
