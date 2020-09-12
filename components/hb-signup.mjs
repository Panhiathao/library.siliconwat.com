const template = document.createElement("template")
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
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.auth = window.firebase.auth()
        this.email = this.querySelector("input[name=email]")
        this.password = this.querySelector("input[name=password]")
        this.button = this.querySelector("button")
        this.p = this.querySelector("p")

        this.signUp = this.signUp.bind(this)
    }

    connectedCallback() {
        const form = this.querySelector("form")
        form.addEventListener("submit", this.signUp)

        this.auth.onAuthStateChanged(user => {
            if(user) { 
              const userDoc = window.firebase.firestore().collection("users").doc(user.uid)
                
              userDoc.get()
              .then(doc => {
                if (doc.exists) {
                  this.dispatchEvent(new CustomEvent("user", {detail: {data: doc.data()}}))
                } else {  
                  userDoc.set({})
                  .then(() => userDoc.get())
                  .then(doc => this.dispatchEvent(new CustomEvent("user", {detail: {data: doc.data()}})))
                  .catch(error => this.p.textContent = error.message)
                }
              })
              .catch(error => this.p.textContent = error.message)
            }
          })
    }

    signUp(event) {
        event.preventDefault()
        this.disable()
        this.p.textContent = ""

        this.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
        .then(credential => credential.user.sendEmailVerification())
	    .then(() => this.dispatchEvent(new Event("success")))
        .catch(error => this.p.textContent = error.message)
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