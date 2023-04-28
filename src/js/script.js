import {
    deskText,
    listCards,
    btnLogin,
    btnCreateVisit,
    btnUnlogin,
    closeBtnLogin,
    btnFilter,
    setToken,
    closeBtnVisit,
    formLogin,
    formVisit,
    modalVisit,
} from "./constants.js";

import Modal from "./Modal.js";
import Requests from "./Requests.js";
import Card from "./Card.js";
import Filter from "./Filter.js";

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

btnFilter.addEventListener("click", () => {
    new Filter().getFilter();
});

btnCreateVisit.addEventListener("click", () => {
    modal.openModalNewVisit();
});

modalVisit.addEventListener("click", (event) => {
    if (
        event.target === closeBtnVisit ||
        !event.target.closest(".modal__content")
    ) {
        modal.closeModal();
    }
});

formVisit.addEventListener("submit", (event) => {
    event.preventDefault();
    modal.handlerFormVisit();
});
