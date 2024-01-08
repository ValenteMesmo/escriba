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

        saveBookData(id, value) {
            return saveJson(`escriba-book-data-${id}`, value);
        }

        loadBookData(id) {
            return loadJson(`escriba-book-data-${id}`);
        }
    }

    customElements.define('typer-storage', TyperStorage);
})();
