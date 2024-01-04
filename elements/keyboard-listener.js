class KeyboardListener extends HTMLElement {

    onInput = function(){};

    connectedCallback(){

        const ignoredKeys = ['ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'CapsLock'];

        document.addEventListener("keydown", e => {

            if(e.repeat){
                return;
            }

            if(ignoredKeys.includes(e.code)){
                return;
            }

            if(e.key == 'Enter'){
                this.onInput('↲');
                return;
            }

            this.onInput(e.key);
        });
    }
}
