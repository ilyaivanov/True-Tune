class Storage {

    static store(namespace, data) {
        if (data) {
            return localStorage.setItem(namespace, JSON.stringify(data));
        }

        var store = localStorage.getItem(namespace);
        return (store && JSON.parse(store)) || [];
    }
}

export default Storage;