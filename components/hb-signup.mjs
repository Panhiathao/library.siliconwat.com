const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
    </style>
    <slot></slot>  
`
export class HbSignup extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.email = this.querySelector("input[name=email]");
        this.password = this.querySelector("input[name=password]");
        this.button = this.querySelector("button");

        this.signUp = this.signUp.bind(this);
    }

    connectedCallback() {
        const form = this.querySelector("form");
        form.addEventListener("submit", this.signUp);
    }

    signUp(event) {
        event.preventDefault();
        this.disable();
        const p = this.querySelector("p");
        p.textContent = ""

        window.firebase.auth().createUserWithEmailAndPassword(this.email.value, this.password.value)
        .then(credential => credential.user.sendEmailVerification())
	    .then(() => this.dispatchEvent(new Event("success")))
        .catch(error => p.textContent = error.message)
        .finally(() => this.enable())
    }

    disable() {
        this.dispatchEvent(new Event("submit"));
        this.email.disabled = true;
        this.password.disabled = true;
        this.button.disabled = true;
    }

    enable() {
        this.dispatchEvent(new Event("done"));
        this.email.disabled = false;
        this.password.disabled = false;
        this.button.disabled = false;
    }
}