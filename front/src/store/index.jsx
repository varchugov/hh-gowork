import { makeObservable, observable, action } from 'mobx';

class Store {
    signUpStep = 0;

    constructor() {
        makeObservable(this, {
            signUpStep: observable,
            incrementSignUpStep: action,
            decrementSignUpStep: action,
        });
    }

    decrementSignUpStep = () => {
        this.signUpStep -= 1;
    };

    incrementSignUpStep = () => {
        this.signUpStep += 1;
    };
}

export default new Store();
