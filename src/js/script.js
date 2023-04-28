import {
    deskText,
    listCards,
    btnLogin,
    btnCreateVisit,
    btnUnlogin,
    closeBtnLogin,
    setToken,
    formLogin,
} from "./constants.js";

import Modal from "./Modal.js";
import Requests from "./Requests.js";
import Card from "./Card.js";

const modal = new Modal();
const card = new Card();

if (localStorage.getItem("token")) {
    btnLogin.classList.add("hidden");
    btnCreateVisit.classList.remove("hidden");
    btnUnlogin.classList.remove("hidden");

    setToken(localStorage.getItem("token"));

    Requests.get()
        .then((dataGet) => {
            if (dataGet) {
                card.renderAll(dataGet);
            }
        })
        .catch((error) => alert(error));
}

btnLogin.addEventListener("click", () => {
    modal.openModalLogin();
});

formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    modal.handlerFormLogin();
});

closeBtnLogin.addEventListener("click", () => {
    modal.closeModal();
});

btnUnlogin.addEventListener("click", () => {
    localStorage.setItem("token", "");
    setToken(undefined);

    btnLogin.classList.remove("hidden");
    btnCreateVisit.classList.add("hidden");
    btnUnlogin.classList.add("hidden");

    listCards.innerHTML = "";

    deskText.classList.remove("hidden");
});
