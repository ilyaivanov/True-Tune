it('index module should find dependencies and render itself', function () {
    document.getElementById = () => document.createElement('div');
    require('./index');
});
