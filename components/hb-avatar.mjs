const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
    </style>
    <slot></slot>
`
export class HbAvatar extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.img = this.querySelector("img")
        this.input = this.querySelector("input")
        this.button = this.querySelector("button")
        this.p = this.querySelector("p")

        this.updateAvatar = this.updateAvatar.bind(this)
        this.deleteAvatar = this.deleteAvatar.bind(this)

        this.users = window.firebase.firestore().collection("users")
        this.firestorage = window.firebase.storage()
    }

    connectedCallback() {
        this.input.addEventListener("change", this.updateAvatar)
        this.button.addEventListener("click", this.deleteAvatar)

        window.firebase.auth().onAuthStateChanged(user => {
            if(user) {                 
              this.users.doc(user.uid).get()
              .then(doc => {
                const userData = doc.data()
                const span = this.querySelector("span")
                span.textContent = userData.username ? userData.username : "No username"
                this.img.src = userData.avatarURL ? userData.avatarURL : ""
              })
              .catch(error => console.error(error.message))
          }
        })
    }

    updateAvatar(event) {
        this.disable()
        this.dispatchEvent(new Event("change"))
        this.p.textContent = ""

        const file = event.target.files[0]
        const currentUser = window.firebase.auth().currentUser
        const storage = this.firestorage.ref(currentUser.uid + "/avatar")
        const task = storage.put(file)
    
        task.on(window.firebase.storage.TaskEvent.STATE_CHANGED, 
            snapshot => {}, 
            error => this.p.textContent = error.message,
            () => task.snapshot.ref.getDownloadURL()
            .then(url => {
                this.dispatchEvent(new CustomEvent("success", {detail: {type: "update", url}}))
                return this.img.src = url
            })
            .then(url => this.users.doc(currentUser.uid).update({avatarURL: url}))
            .catch(error => this.p.textContent = error.message)
            .finally(() => this.enable())
       )
    }

    deleteAvatar(event) {
        this.disable()
        this.dispatchEvent(new Event("click"))
        this.p.textContent = ""
        const currentUser = window.firebase.auth().currentUser

        this.firestorage.ref(currentUser.uid + "/avatar").delete()
        .then(() => this.img.src = "") // todo: default avatar image
        .then(() => this.dispatchEvent(new CustomEvent("success", {detail: {type: "delete"}})))
        .catch(error => this.p.textContent = error.message)
        .finally(() => this.enable())
    }

    disable() {
        this.input.disabled = true
        this.button.disabled = true
    }

    enable() {
        this.dispatchEvent(new Event("done"))
        this.input.disabled = false
        this.button.disabled = false
    }
}