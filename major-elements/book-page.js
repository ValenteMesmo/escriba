class BookPage extends HTMLElement {

    connectedCallback(){

        if(this.shadowRoot){
            return;
        }

        this.attachShadow({ mode: 'open' });

        const id = new URLSearchParams(window.location.search).get('id');

        if (!id){
            window.location = `/`;
        }

        const frag = document.createDocumentFragment();

        {
            const link = document.createElement("a");
            link.href = `/?id=${id}&edit=1`;
            link.textContent = 'edit';
            frag.appendChild(link);
        }

        const data = document
            .createElement('typer-storage')
            .loadBookData(id);

        const h1 = document.createElement('h1');
        h1.textContent = data.title;
        frag.appendChild(h1);

        data.sections.forEach((g,i)=>{
            const card = document.createElement('a');
            card.href = `/?id=${id}&section=${i}`;
            card.textContent = `Section ${i}`;
            if(g.score){
                card.textContent+= ` ${g.score.wpm} | ${g.score.errors}`;
            }
            frag.appendChild(card);
        });

        this.shadowRoot.appendChild(frag);
    }
}

customElements.define('book-page', BookPage);
