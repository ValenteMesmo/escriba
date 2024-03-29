(function(){

    let id = 0;
    let section = 0;

    let data = {};

    let shadowRoot = null;

    class TyperPage extends HTMLElement {

        connectedCallback(){

            if(shadowRoot){
                return;
            }

            this.attachShadow({ mode: 'open' });
            shadowRoot = this.shadowRoot;

            const params = new URLSearchParams(window.location.search);
            id = params.get('id');
            section = Number(params.get('section') || '0');


            const frag = document.createDocumentFragment();


            const area = document.createElement('typer-area');
            const storage = document.createElement('typer-storage');
            frag.appendChild(area);
            frag.appendChild(storage);

            area.onComplete = onComplete;

            data = storage.loadBookData(id);

            area.setText(data.sections[section]);

            this.shadowRoot.appendChild(frag);
        }

    }

    function onComplete(wpm, errorCount) {
        const storage = shadowRoot.querySelector('typer-storage');
        let scores = storage.loadScores(id) || {};
        if(!scores[section]){
            scores[section] = {  wpm: 0, errors: 999};
        }

        if(wpm >= scores[section].wpm && errorCount <= scores[section].errors){
            scores[section].wpm = wpm;
            scores[section].errors = errorCount;
            storage.saveScores(id, scores);
        }

        if (data.sections[section + 1]) {
            window.location = `${window.location.pathname}?id=${id}&section=${section + 1}`;
        }
        else {
            window.location = `${window.location.pathname}?id=${id}`;
        }
    } 

    customElements.define('typer-page', TyperPage);
})();
