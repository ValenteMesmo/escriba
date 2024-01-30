(function(){

    let id = 0;
    let shadowRoot = null;
    class EditPage extends HTMLElement {

        connectedCallback(){

            if(shadowRoot){
                return;
            }

            this.attachShadow({ mode: 'open' });
            shadowRoot = this.shadowRoot;

            id = new URLSearchParams(window.location.search).get('id');

            if (!id){
                window.location = window.location.pathname;
            }



            const frag = document.createDocumentFragment();



            const form = document.createElement('form');
                form.onsubmit = this.submitForm;
            form.innerHTML=`
<form >
<label>Book title</label>
<br>
<input type="text">
<br>
<br>
<label>Book content</label>
<br>
<textarea name="content" autofocus></textarea>
<br>
<br>
<button>save</button>
</form>
`;
            frag.appendChild(form);


            const storage = document.createElement('typer-storage');
            frag.appendChild(storage);
            const title = (storage.loadBookList() || {})[id]?.title;

            if (title) {
                form[0].value = title;
            }

            const data = storage.loadBookData(id) || {sections:[]};

            let content = '';

            data.sections.forEach(g => {
                content += `##${g.title}\n`;
                content += `${g.text}\n`;
            });

            form[1].value = content;

            this.shadowRoot.appendChild(frag);
        }

        submitForm(e) {
            e.preventDefault();
            const form = e.target;

            //const ideal_word_count_per_section = 30 * 3;

            const storage = shadowRoot.querySelector('typer-storage');

            const list = (storage.loadBookList() || {});
            if (!list[id])
            list[id] = {};
            list[id].title = form[0].value;
            storage.saveBookList(list);

            const lines = form[1].value.replace(/ {1,}/g, ' ').replace(/\n{1,}/g, '\n').split('\n');

            var data = { sections: [] };
            var section = { text: '' };

            lines.forEach(f => {
                //criar linhas com 1 #?
                if (f.startsWith("##")) {
                    const sectionName = f.split("##")[1];
                    if(!section.title){
                        section.title = sectionName;
                    }else{
                        data.sections.push(section);
                        section = { title: sectionName, text: ''};
                    }
                }
                else{
                    section.text += `${f}\n`;
                }
            });

            if(section.text != ''){
                data.sections.push(section);
            }
            storage.saveBookData(id, data);

            window.location = window.location.pathname;
        }

    }

    customElements.define('edit-page', EditPage);
})();
