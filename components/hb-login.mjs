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
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.email = this.querySelector("input[name=email]")
        this.password = this.querySelector("input[name=password]")
        this.submitButton = this.querySelector("button[type=submit]")
        this.forgotButton = this.querySelector("button[type=button]")
        this.p = this.querySelector("p")

        this.logIn = this.logIn.bind(this)
        this.forgotPassword = this.forgotPassword.bind(this)
    }

    connectedCallback() {
        const form = this.querySelector("form")
        form.addEventListener("submit", this.logIn)
        this.forgotButton.addEventListener("click", this.forgotPassword)
    }

    logIn(event) {
        event.preventDefault()
        this.dispatchEvent(new Event("submit"))
        this.disable()
        this.p.textContent = ""
        
        window.firebase.auth().signInWithEmailAndPassword(this.email.value, this.password.value)
	    .then(() => this.dispatchEvent(new Event("login success")))
        .catch(error => this.p.textContent = error.message)
        .finally(() => this.enable())
    }

    forgotPassword(event) {
        this.dispatchEvent(new Event("click"))
        this.disable()
        this.p.textContent = ""

        window.firebase.auth().sendPasswordResetEmail(this.email.value)
        .then(() => this.dispatchEvent(new Event("forgot password success")))
        .catch(error => this.p.textContent = error.message)
        .finally(() => this.enable())
    }

    disable() {
        
    }

    enable() {
        this.dispatchEvent(new Event("done"))
    }
}