export function findArtists(term) {
    return new Promise(function (resolve) {
        setTimeout(() => resolve([
            {name: "Foo " + term},
            {name: "Bar " + term}
        ]), 1000);
    });
}