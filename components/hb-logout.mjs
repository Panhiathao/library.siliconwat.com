const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: flex;
        }
    </style>
    <slot></slot>
`

export class HbLogout extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.logout = this.logout.bind(this)
    }
    connectedCallback() {
        const button = this.querySelector("button")
        button.addEventListener("click", this.logout)
    }

    logout(event) {
        window.firebase.auth().signOut()
	    .then(() => this.dispatchEvent(new Event("success")))
	    .catch(error => console.error(error.message))
    }
    
    disable() {
        this.dispatchEvent(new Event("click"))
        this.button.disabled = true
    }

    enable() {
        this.dispatchEvent(new Event("done"))
        this.button.disabled = false
    }
}
}

