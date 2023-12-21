(function () {

    class TyperArea extends HTMLElement {

        onComplete = function () { };

        connectedCallback() {
            if (this.shadowRoot)
                return;

            this.attachShadow({ mode: "open" });

            const style = document.createElement("style");
            style.textContent = `
                span {
                    font-weight: 300;
                    font-size: 35px;
                }

                span[state="warning"] {
                    background-color: rgb(255, 233, 178);
                }

                span[state="error"] {
                    background-color: rgb(189, 146, 146);
                }

                span[state="success"] {
                    background-color: rgb(221, 221, 221);
                }

                span[state="current"] {
                    border-bottom: 3px solid #0a6bf9;
                    background: rgba(255,255,255,.21);
                }
            `;

            const content = document.createElement('div');
            content.setAttribute("id", "content")
            this.shadowRoot.appendChild(content);

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
                    if (currentChar.textContent == '↲')
                        currentChar.setAttribute('state', 'success');
                    else
                        currentChar.setAttribute('state', 'error');
                }
                else if (e.key == currentChar.textContent) {
                    currentChar.setAttribute('state', 'success');
                }
                else {
                    currentChar.setAttribute('state', 'error');
                }
 
                const nextChar = this.shadowRoot.querySelector('[state="none"]');
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

            const content = this.shadowRoot.getElementById("content");
            content.innerHTML = '';

            const fragment = document.createDocumentFragment();

            for (const c of value) {
                const char = document.createElement('span');
                char.textContent =  c == '\n' ? '↲' : c;
                char.setAttribute('state', 'none');
                fragment.appendChild(char);

                if (c == '\n') {
                    fragment.appendChild(document.createElement('br'));
                }
            }

            content.appendChild(fragment);
            content.querySelector('[state="none"]').setAttribute('state', 'current');
        }
    }

    customElements.define("typer-area", TyperArea);
})();
