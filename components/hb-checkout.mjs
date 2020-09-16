const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: block;
        }
    </style>
    <slot></slot>
`

export class HbCheckout extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.checkout = this.checkout.bind(this)
    }

    connectedCallback() {
        //const button = this.querySelector("button")
        //button.id = "checkout-button-" + this.getAttribute("stripe-api-id")
        //button.role = "link"
        //button.type = "button"
        const form = this.querySelector("form")
        form.addEventListener("submit", this.checkout)
    }

    checkout(event) {
        event.preventDefault()
        const stripe = Stripe(this.getAttribute("stripe-pk-live"))

        stripe.redirectToCheckout({
            lineItems: [{price: this.getAttribute("stripe-api-id"), quantity: 1}],
            mode: 'payment',
            // Do not rely on the redirect to the successUrl for fulfilling
            // purchases, customers may not always reach the success_url after
            // a successful payment.
            // Instead use one of the strategies described in
            // https://stripe.com/docs/payments/checkout/fulfillment
            successUrl: 'https://siliconwat.com/success',
            cancelUrl: 'https://siliconwat.com/canceled',
          })
          .then(result => { 
            const p = this.querySelector("p")
            if (result.error) p.textContent = result.error.message 
        })
    }
}