import { makeObservable, observable, action } from 'mobx';

class Store {
    sharedNav = false;
    signUpStep = 0;

    constructor() {
        makeObservable(this, {
            sharedNav: observable,
            sharedNavOpen: action,
            sharedNavClose: action,
            signUpStep: observable,
            incrementSignUpStep: action,
            decrementSignUpStep: action,
        });
    }

    sharedNavOpen = () => {
        this.sharedNav = true;
    };

    sharedNavClose = () => {
        this.sharedNav = false;
    };

    decrementSignUpStep = () => {
        this.signUpStep -= 1;
    };

    incrementSignUpStep = () => {
        this.signUpStep += 1;
    };
}

export default new Store();
