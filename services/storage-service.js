const storageService = (function () {

    function saveJson(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function loadJson(key) {
        const value = localStorage.getItem(key);
        
        if (value)
            return JSON.parse(value)

        return null;
    }

    return {
        saveBookList: (value) => saveJson("escriba-book-list", value),
        loadBookList: () => loadJson("escriba-book-list"),
        saveBookData: (id, value) => saveJson(`escriba-book-data-${id}`, value),
        loadBookData: (id) => loadJson(`escriba-book-data-${id}`)
    };
})();