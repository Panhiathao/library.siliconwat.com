const firebaseConfig = {
  apiKey: "AIzaSyBEq8K__HeZr75Q7tDyNuMX1wnLGMsIIKU",
  authDomain: "siliconwat.firebaseapp.com",
  databaseURL: "https://siliconwat.firebaseio.com",
  projectId: "siliconwat",
  storageBucket: "siliconwat.appspot.com",
  messagingSenderId: "140538393451",
  appId: "1:140538393451:web:b1f8b5190f78e865a4122e"
};

firebase.initializeApp(firebaseConfig);

////

import {TpInput} from "./tags/tp-input.mjs"
customElements.define("tp-input", TpInput, {extends: "input"})

import {SwTooltip} from "./elements/sw-tooltip.mjs"
customElements.define("sw-tooltip", SwTooltip)

import {SwTabs, SwTab, SwPanel} from "./elements/sw-tabs.mjs"
customElements.define("sw-tabs", SwTabs)
customElements.define("sw-tab", SwTab)
customElements.define("sw-panel", SwPanel)

import {TpUl} from "./tags/tp-ul.mjs"
customElements.define("tp-ul", TpUl, {extends: "ul"})

import {SwInfoCard} from "./elements/sw-info-card.mjs"
customElements.define("sw-info-card", SwInfoCard)

import {SwHeroCard} from "./elements/sw-hero-card.mjs"
customElements.define("sw-hero-card", SwHeroCard, )

import {SwSearch} from "./elements/sw-search.mjs"
customElements.define("sw-search", SwSearch)

import {SwProgress} from "./elements/sw-progress.mjs"
customElements.define("sw-progress", SwProgress)

import {HbAvatar} from "./components/hb-avatar.mjs"
customElements.define("hb-avatar", HbAvatar)

import {HbCardPayment} from "./components/hb-card-payment.mjs"
customElements.define("hb-card-payment", HbCardPayment)

import {HbAccount, HbAccountVerify, HbAccountUsername, HbAccountEmail, HbAccountPassword, HbAccountDelete} from "./components/hb-account.mjs"
customElements.define("hb-account", HbAccount)
customElements.define("hb-account-verify", HbAccountVerify)
customElements.define("hb-account-username", HbAccountUsername)
customElements.define("hb-account-email", HbAccountEmail)
customElements.define("hb-account-password", HbAccountPassword)
customElements.define("hb-account-delete", HbAccountDelete)

import {HbLogin} from "./components/hb-login.mjs"
customElements.define("hb-login", HbLogin)

import {HbSignup} from "./components/hb-signup.mjs"
customElements.define("hb-signup", HbSignup)

import {SwCountDown} from "./elements/sw-countdown.mjs"
customElements.define("sw-countdown", SwCountDown)

import {SwTimer} from "./elements/sw-timer.mjs"
customElements.define("sw-timer", SwTimer)

import {HbLogout} from "./components/hb-logout.mjs"
customElements.define("hb-logout", HbLogout)

//////

firebase.auth().onAuthStateChanged(user => {
	if (user) {
		console.log(user.uid, user.email)
	} else {
		console.log("not logged in")
	}
})

///////

const signup = document.querySelector("hb-signup");
signup.addEventListener("submit", () => console.log("spinner on"))
signup.addEventListener("success", () => console.log("signed up"))
signup.addEventListener("done", () => console.log("spinner off"))

const login = document.querySelector("hb-login")
login.addEventListener("success", event => console.log("success:", event.detail.type))

const logout = document.querySelector("hb-logout")
logout.addEventListener("success", () => console.log("logged out"))

const accountverify = document.querySelector("hb-account-verify")
accountverify.addEventListener("success", () => console.log("verify email sent"))
