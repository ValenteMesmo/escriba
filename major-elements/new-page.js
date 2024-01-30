(function(){

    class NewPage extends HTMLElement {

        connectedCallback(){

            if(this.shadowRoot){
                return;
            }

            this.attachShadow({ mode: 'open' });

            const frag = document.createDocumentFragment();


            const form = document.createElement('form');
            form.innerHTML=`
                <label> Title </label>
                <input type="text" name="title" autofocus>
            `;
            form.onsubmit = this.submitForm;

            frag.appendChild(form);
            this.shadowRoot.appendChild(frag);
        }

        submitForm(e, form) {
            e.preventDefault();

            const storageService = document.createElement('typer-storage');
            const list = storageService.loadBookList() || {};
        
            const title = e.target['title'].value;

            const newItem = {
                id: title.normalize("NFD").replace(/\p{Diacritic}/gu, "").trim().replace(/\s/g, "-").replace(/[^a-zA-Z0-9-]/g, '').toLowerCase(),
                title: title
            };

            list[newItem.id] = newItem;

            storageService.saveBookList(list);            


            window.location = `${window.location.href}?id=${newItem.id}&edit=1`;

        }

    }

    customElements.define('new-page', NewPage);
})();
