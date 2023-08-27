/*!
* Start Bootstrap - Landing Page v6.0.6 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAzgZMK7zlCzh_ZfOfpabRm8xBAjlo5Ibk",
  authDomain: "barghev-climbing-app.firebaseapp.com",
  projectId: "barghev-climbing-app",
  storageBucket: "barghev-climbing-app.appspot.com",
  messagingSenderId: "564116702722",
  appId: "1:564116702722:web:eb5132ac650897775e891b"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function validateEmail(email) {
    // https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
    const re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return re.test(email);
}

document.addEventListener("DOMContentLoaded", function () {
    const forms = document.getElementsByClassName("form-subscribe");
    for (const form of forms) {
        form.querySelector("input[name=email]")

        form.onsubmit = function (e) {
            e.preventDefault();

            const emailInput = form.querySelector("input[name=email]");
            const email = emailInput.value;
            if (!validateEmail(email)) {
                form.querySelector("[name=emailAddressMissing]").style.display = "block";
                return;
            }
            else {
                form.querySelector(".invalid-feedback").style.display = "none";
            }

            addDoc(collection(db, "launchEmails"), {
                email: email,
                timestamp: Date.now()
            })
            .then(() => {
                form.querySelector("[name=submitSuccessMessage]").classList.remove("d-none");
                form.querySelector("[name=submitErrorMessage]").classList.add("d-none");
                emailInput.value = ""; // Clear the input field
            })
            .catch(error => {
                form.querySelector("[name=submitErrorMessage]").classList.remove("d-none");
                form.querySelector("[name=submitSuccessMessage]").classList.add("d-none");
                console.error("Error adding email to Firestore:", error);
            });
        }
    }
});
