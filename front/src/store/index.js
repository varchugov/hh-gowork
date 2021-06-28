import { makeObservable, observable, action } from 'mobx';

class Store {
    sharedNav = false;
    menuContent = [];
    menuIsLoading = false;
    menuIsLoaded = false;
    signUpStep = 0;

    constructor() {
        makeObservable(this, {
            sharedNav: observable,
            sharedNavOpen: action,
            sharedNavClose: action,
            menuContent: observable,
            menuSetContent: action,
            menuIsLoading: observable,
            menuSetIsLoading: action,
            menuIsLoaded: observable,
            menuSetIsLoaded: action,
            signUpStep: observable,
            incrementSignUpStep: action,
            decrementSignUpStep: action,
            setSignUpStepNumber: action,
        });
    }

    sharedNavOpen = () => {
        this.sharedNav = true;
    };

    sharedNavClose = () => {
        this.sharedNav = false;
    };

    menuSetContent = (data) => {
        this.menuContent = data;
    };

    menuSetIsLoading = (state) => {
        this.menuIsLoading = state;
    };

    menuSetIsLoaded = (isLoaded) => {
        this.menuIsLoaded = isLoaded;
    };

    decrementSignUpStep = () => {
        this.signUpStep -= 1;
    };

    incrementSignUpStep = () => {
        this.signUpStep += 1;
    };

    setSignUpStepNumber = (stepNumber) => {
        this.signUpStep = stepNumber;
    };
}

export default new Store();
