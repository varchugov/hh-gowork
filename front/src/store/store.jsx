import { makeObservable, observable, action } from "mobx";

class Store {
    linkClicksCount = 0;

    constructor() {
        makeObservable(this, {
            linkClicksCount: observable,
            updateLinkClicksCount: action
        });
    }

    updateLinkClicksCount = () => {
        this.linkClicksCount++;
    }
}

export default new Store();
