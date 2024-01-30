class HomePage extends HTMLElement {

    connectedCallback(){

        if(this.shadowRoot){
            return;
        }

        this.attachShadow({ mode: 'open' });

        const frag = document.createDocumentFragment();

        const style = document.createElement('style');
        style.textContent = `
            .card {
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                transition: 0.3s;
                width: 40%;
                cursor: pointer;
            }

            .card:hover {
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
            }

            .container {
                  padding: 2px 16px;
            }`;
        frag.appendChild(style);

        {
            const link = document.createElement("a");
            link.href = `${window.location.href}?new=1`;
            link.textContent = 'new';
            frag.appendChild(link);
        }

        const list = document
            .createElement('typer-storage')
            .loadBookList() || [];

        Object.values(list).forEach(f => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `<div class='container'><h4>${f.title}</h4></div>`;
            card.onclick = function(){
                window.location =  `${window.location.href}?id=${f.id}`;
            };

            frag.appendChild(card);
        });

        this.shadowRoot.appendChild(frag);
    }
}

customElements.define('home-page', HomePage);
