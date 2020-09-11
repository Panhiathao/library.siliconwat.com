const template = document.createElement("template")
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
    </style>
    <slot></slot>  
`
export class HbLogin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.email = this.querySelector("input[name=email]");
        this.password = this.querySelector("input[name=password]");
        this.submitButton = this.querySelector("button[type=submit]");
        this.forgotButton = this.querySelector("button[type=button]");
        this.p = this.querySelector("p");

<<<<<<< HEAD
        this.logIn = this.logIn.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
=======
        this.auth = window.firebase.auth()
        this.logIn = this.logIn.bind(this)
        this.forgotPassword = this.forgotPassword.bind(this)
>>>>>>> 0890d830b82baf39d3b98abbdbe31837b8faa290
    }

    connectedCallback() {
        const form = this.querySelector("form");
        form.addEventListener("submit", this.logIn);
        this.forgotButton.addEventListener("click", this.forgotPassword);
    }

    logIn(event) {
        event.preventDefault();
        this.dispatchEvent(new Event("submit"));
        this.disable();
        this.p.textContent = "";
        
        this.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
	    .then(() => this.dispatchEvent(new CustomEvent("success", {detail: {type: "login"}})))
        .catch(error => this.p.textContent = error.message)
        .finally(() => this.enable())
    }

    forgotPassword(event) {
        this.dispatchEvent(new Event("click"));
        this.disable();
        this.p.textContent = "";

        this.auth.sendPasswordResetEmail(this.email.value)
        .then(() => this.dispatchEvent(new CustomEvent("success", {detail: {type: "forgot"}})))
        .catch(error => this.p.textContent = error.message)
        .finally(() => this.enable())
    }

    disable() {
        this.email.disabled = true;
        this.password.disabled = true;
        this.submitButton.disabled = true;
        this.forgotButton.disabled = true;
    }

    enable() {
        this.dispatchEvent(new Event("done"))
        this.email.disabled = false;
        this.password.disabled = false;
        this.submitButton.disabled = false;
        this.forgotButton.disabled = false;
    }
}