export const loadState = () => {
    try {
        const state = localStorage.getItem('state');
        if (state === null) {
            return undefined;
        }
        return JSON.parse(state);
    } catch (err) {
        return undefined;
    }
};

export const saveState = state => {
    try {
        const serialized = JSON.stringify(state);
        localStorage.setItem('state', serialized);
    } catch (err) {
        //ignore
    }
};
