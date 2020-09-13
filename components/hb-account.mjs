const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
    </style>
    <slot></slot>
`

export class HbAccount extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }

}

export class HbAccountVerify extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.user = null
        this.button = this.querySelector("button")
        this.sendEmailVerification = this.sendEmailVerification.bind(this)
    }

    connectedCallback() {
        const form = this.querySelector("form")
        form.addEventListener("submit", this.sendEmailVerification)

        window.firebase.auth().onAuthStateChanged(user => {
            this.user = user
            const label = this.querySelector("label")
            label.textContent = user.email
        })
    }

    sendEmailVerification(event) {
        event.preventDefault()
        this.disable()

        this.user.sendEmailVerification()
        .then(() => this.dispatchEvent(new Event("success")))
        .catch(error => console.error(error.message))
        .finally(() => this.enable())
    }

    disable() {
        this.button.disabled = true;
    }

    enable() {
        this.dispatchEvent(new Event("done"))
        this.button.disabled = false;
    }
}

function reauth(currentUser, password) {
    const credential = window.firebase.auth.EmailAuthProvider.credential(currentUser.email, password)
    return currentUser.reauthenticateWithCredential(credential)
}

export class HbAccountUsername extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.input = this.querySelector("input");
        this.button = this.querySelector("button")
        this.newUsername = this.newUsername.bind(this.newUsername)
    }
    connectedCallback() {
        const form = this.querySelector("form")
        form.addEventListener("submit", this.newUsername)
    }

    newUsername() {
        event.preventDefault();
    }

    disable() {
        this.input.disabled = true;
        this.button.disabled = true; 
    }

    enable() {
        this.dispatchEvent(new Event("done"))
        this.input.disabled = false;
        this.button.disabled = false;
    }
}

export class HbAccountEmail extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true))
<<<<<<< HEAD
        this.newEmail = document.querySelector("input[name=newpassword]")
        this.newpassword = document.querySelector("input[name=password]")
        this.button = document.querySelector("button")
    }
    
    connectedCallback() {
        const form = this.querySelector("form")
        form.addEventListener("submit")
    }

    disable() {
        this.newEmail.disabled = true;
        this.newpassword.disabled = true;
        this.button.disabled = true;
=======

        this.newEmail = this.querySelector("input[name=newemail]")
        this.password = this.querySelector("input[name=password]")
        this.button = this.querySelector("button")

        this.updateEmail = this.updateEmail.bind(this)
    }

    connectedCallback() {
        const form = this.querySelector("form")
        form.addEventListener("submit", this.updateEmail)
    }

    updateEmail(event) {
        event.preventDefault()
        this.disable()
        
        const currentUser = window.firebase.auth().currentUser
        const p = this.querySelector("p")
        p.textContent = ""

        reauth(currentUser, this.password.value)
            .then(() => currentUser.updateEmail(this.newEmail.value))
            .then(() => this.dispatchEvent(new Event("success")))
            .catch(error => p.textContent = error.message)
            .finally(() => this.enable())
    }

    disable() {
        this.dispatchEvent(new Event("submit"))
        this.newEmail.disabled = true
        this.password.disabled = true
        this.button.disabled = true
>>>>>>> 33734d3d7071d46796a908a5e9cf58e2732d4fc7
    }

    enable() {
        this.dispatchEvent(new Event("done"))
<<<<<<< HEAD
        this.newEmail.disabled = false;
        this.newpassword.disabled = false;
        this.button.disabled = false;
=======
        this.newEmail.disabled = false
        this.password.disabled = false
        this.button.disabled = false
>>>>>>> 33734d3d7071d46796a908a5e9cf58e2732d4fc7
    }
}

export class HbAccountPassword extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true))
<<<<<<< HEAD
        this.newEmail = document.querySelector("input[name=newpassword]")
        this.newpassword = document.querySelector("input[name=password]")
        this.button = document.querySelector("button")
=======

        this.newPassword = this.querySelector("input[name=newpassword]")
        this.password = this.querySelector("input[name=password]")
        this.button = this.querySelector("button")

        this.updatePassword = this.updatePassword.bind(this)
>>>>>>> 33734d3d7071d46796a908a5e9cf58e2732d4fc7
    }

    connectedCallback() {
        const form = this.querySelector("form")
<<<<<<< HEAD
        form.addEventListener("submit")
    }


    disable() {
        this.newEmail.disabled = true;
        this.newpassword.disabled = true;
        this.button.disabled = true;
=======
        form.addEventListener("submit", this.updatePassword)
    }

    updatePassword(event) {
        event.preventDefault()
        this.disable()

        const currentUser = window.firebase.auth().currentUser
        const p = this.querySelector("p")
        p.textContent = ""

        reauth(currentUser, this.password.value)
            .then(() => currentUser.updatePassword(this.newPassword.value))
            .then(() => this.dispatchEvent(new Event("success")))
            .catch(error => p.textContent = error.message)
            .finally(() => this.enable())
    }

    disable() {
        this.dispatchEvent(new Event("submit"))
        this.newPassword.disabled = true
        this.password.disabled = true
        this.button.disabled = true
>>>>>>> 33734d3d7071d46796a908a5e9cf58e2732d4fc7
    }

    enable() {
        this.dispatchEvent(new Event("done"))
<<<<<<< HEAD
        this.newEmail.disabled = false;
        this.newpassword.disabled = false;
        this.button.disabled = false;
=======
        this.newPassword.disabled = false
        this.password.disabled = false
        this.button.disabled = false
>>>>>>> 33734d3d7071d46796a908a5e9cf58e2732d4fc7
    }
}

export class HbAccountDelete extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.input = document.querySelector("input");
        this.button = document.querySelector("button");
    }

    connectedCallback() {
        const form = this.querySelector("form")
        form.addEventListener("submit")
    }


    disable() {
       this.input.disabled = true;
       this.button.disabled = true; 
    }

    enable() {
        this.dispatchEvent(new Event("done"))
        this.input.disabled = false;
        this.button.disabled = false; 
    }
}