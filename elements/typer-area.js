(function () {

    class TyperArea extends HTMLElement {

        onComplete = function () { };

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
                if (e.repeat) {
                    return;
                }

                if (['ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'CapsLock'].includes(e.code)) {
                    return;
                }

                const currentChar =
                    this.shadowRoot.querySelector('[state="current"]');

                if (e.key == 'Enter') {
                    if (currentChar.getAttribute('char') == '\n')
                        currentChar.setAttribute('state', 'success');
                    else
                        currentChar.setAttribute('state', 'error');
                }
                else if (e.key == currentChar.getAttribute('char')) {
                    currentChar.setAttribute('state', 'success');
                }
                else {
                    currentChar.setAttribute('state', 'error');
                }
 
                const nextChar = this.shadowRoot.querySelector('[state="0"]');
                if(nextChar){
                    nextChar.setAttribute('state', 'current');
                }
                else {
                    this.onComplete();
                }

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

                if (c == '\n') {
                    fragment.appendChild(document.createElement('br'));
                }
            }

            this.shadowRoot.appendChild(fragment);
            this.shadowRoot.querySelector('[state="0"]').setAttribute('state', 'current');
        }
    }

    customElements.define("typer-area", TyperArea);
})();
