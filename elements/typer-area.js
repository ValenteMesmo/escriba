(function () {

    let typingStarted = null;
    let wordCount = 0;

    class TyperArea extends HTMLElement {

        onComplete = function () { };

        connectedCallback() {
            if (this.shadowRoot)
                return;

            this.attachShadow({ mode: "open" });

            const style = document.createElement("style");
            style.textContent = `
                #content {
                    display: flex;
                    flex-wrap: wrap;
                }

                #content hr {
                    width: 100%;
                    visibility: hidden;
                    margin: 0;
                }

                span {
                    font-weight: 300;
                    font-size: 30px;
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

                if (['ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'CapsLock', 'AltLeft', 'Tab'].includes(e.code)) {
                    return;
                }

                if (e.key == 'Dead'){
                    return;
                }

                if(!typingStarted)
                typingStarted = Date.now();

                const currentChar =
                    this.shadowRoot.querySelector('[state="current"]');


                if (currentChar){

                    if (e.key == 'Backspace') {
                        const previousChar = [...this.shadowRoot.querySelectorAll('span[state]:not([state=current],[state=none])')].pop();
                        previousChar.setAttribute('state', 'current');
                        currentChar.setAttribute('state', 'none');
                        previousChar.innerHTML = previousChar.originalContent;
                        return;
                    }

                    if (e.key == currentChar.keyName) {
                        currentChar.setAttribute('state', 'success');
                    }
                    else {
                        currentChar.setAttribute('state', 'error');
                        if(![' ', 'Enter'].includes(e.key)){
                            currentChar.innerHTML = e.key;
                        }
                    }
                }
                    
                const nextChar = this.shadowRoot.querySelector('[state="none"]');
                if(nextChar){
                    nextChar.setAttribute('state', 'current');
                }
                else {
                    const typingEnded = Date.now();
                    const durationInMinutes = (typingEnded - typingStarted) / 1000 / 60;
                    const wpm = wordCount / durationInMinutes;
                    const errorsCount = [...this.shadowRoot.querySelectorAll('span[state=error]')].length;
                    this.onComplete(wpm, errorsCount);
                }
           });
        }

        setText(data) {
            this.connectedCallback();

            const content = this.shadowRoot.getElementById("content");
            content.innerHTML = '';

            const fragment = document.createDocumentFragment();

            let currentWord = document.createElement('span');

            for (const c of data.text) {
                const char = document.createElement('span');

                if ( c == '\n') {
                    char.originalContent = char.innerHTML = '↲';
                    char.keyName = 'Enter';
                }
                else if (c == ' '){
                    char.innerHTML = char.originalContent = '&nbsp;';
                    char.keyName = ' ';
                }
                else{
                    char.originalContent = char.innerHTML = c;
                    char.keyName = c;
                }

                char.setAttribute('state', 'none');
                currentWord.appendChild(char);

                if (['\n', ' '].includes(c)){
                    fragment.appendChild(currentWord);
                    currentWord = document.createElement('div');
                    if (c == '\n') {
                        fragment.appendChild(document.createElement('hr'));
                    }
                }

           }
            fragment.appendChild(currentWord);

            content.appendChild(fragment);
            content.querySelector('[state="none"]').setAttribute('state', 'current');

            wordCount = data.text.match(/[\w\d\’\'-]+/gi)?.length || 0;
        }
    }

    customElements.define("typer-area", TyperArea);
})();
