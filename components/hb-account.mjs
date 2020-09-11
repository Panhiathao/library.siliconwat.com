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
    }

    enable() {
        this.dispatchEvent(new Event("done"))
        this.newEmail.disabled = false;
        this.newpassword.disabled = false;
        this.button.disabled = false;
    }
}

export class HbAccountPassword extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true))
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
    }

    enable() {
        this.dispatchEvent(new Event("done"))
        this.newEmail.disabled = false;
        this.newpassword.disabled = false;
        this.button.disabled = false;
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