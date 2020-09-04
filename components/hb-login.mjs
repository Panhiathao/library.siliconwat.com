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

        this.signUp = this.signUp.bind(this)
    }

    connectedCallback() {
        const form = this.querySelector("form")
        form.addEventListener("submit", this.signUp)
    }

    signUp(event) {
        const data = new FormData(event.target)
        console.log(data)
    }
}