class BookPage extends HTMLElement {

    connectedCallback(){

        if(this.shadowRoot){
            return;
        }

        this.attachShadow({ mode: 'open' });

        const id = new URLSearchParams(window.location.search).get('id');

        if (!id){
            window.location = `${window.location.href}`;
        }

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
            link.href = `${window.location.href}?id=${id}&edit=1`;
            link.textContent = 'edit';
            frag.appendChild(link);
        }

        const data = document
            .createElement('typer-storage')
            .loadBookData(id) || { sections : [] };

        const h1 = document.createElement('h1');
        h1.textContent = data.title;
        frag.appendChild(h1);

        data.sections.forEach((g,i)=>{
            const card = document.createElement('div');
            card.classList.add('card');
            const score = !!g.score ? `(${Math.floor(g.score.wpm)} wpm | errors ${g.score.errors})` : '';
            card.innerHTML = `
                <div class='container'>
                <h4>Section ${i} ${score}</h4>
                </div>`;
            card.onclick = function(){
                window.location =  `${window.location.href}?id=${id}&section=${i}`;
            };

            frag.appendChild(card);
        });

        this.shadowRoot.appendChild(frag);
    }
}

customElements.define('book-page', BookPage);
