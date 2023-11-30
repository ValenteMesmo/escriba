class TyperArea extends HTMLElement {

    constructor(){
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });

        const style = document.createElement("style");
        const content = document.createElement("div");     

        content.setAttribute("id", "content");

        style.textContent = `
            #content {
                background-color: red;
            }
        `;

        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(content);

        document.addEventListener("keydown", e => {
            if(e.repeat)
                return;

            const content = this.shadowRoot.getElementById('content');


            //if(e.key == )

            console.log(e);
        });
    }

    setText(value) {
        const content = this.shadowRoot.getElementById('content');

        content.innerHTML = '';

        const fragment = document.createDocumentFragment();

        content.appendChild(fragment);
    }
}

customElements.define("typer-area", TyperArea);
