(function () {
    function saveJson(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function loadJson(key) {
        const value = localStorage.getItem(key);

        if (value)
            return JSON.parse(value)

        return null;
    }

    class TyperStorage extends HTMLElement {

        saveBookList(value) {
            return saveJson("escriba-book-list", value);
        }

        loadBookList() {
            return loadJson("escriba-book-list");
        }

        saveScores(id, value) {
            return saveJson(`escriba-book-scores-${id}`, value);
        }

        saveBookData(id, value) {
            return saveJson(`escriba-book-data-${id}`, value);
        }

        loadBookData(id) {
            return loadJson(`escriba-book-data-${id}`);
        }

        loadScores(id) {
            return loadJson(`escriba-book-scores-${id}`);
        }
    }

    customElements.define('typer-storage', TyperStorage);
})();
