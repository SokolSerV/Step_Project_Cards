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
    btnFormVisit,
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
        console.log("ok2");
        modal.closeModal();
    }
});

formVisit.addEventListener("submit", (event) => {
    event.preventDefault();
    modal.handlerFormVisit();
});

listCards.addEventListener("click", (event) => {
    const targetCard = event.target.closest("li");
    const targetCardId = targetCard.dataset.id;

    if (event.target.matches(".btnSwowMore")) {
        targetCard.querySelectorAll(".hidden").forEach((elem) => {
            elem.classList.remove("hidden");
        });

        event.target.classList.add("hidden");
    }

    if (event.target.matches(".btnShowLess")) {
        targetCard.querySelectorAll("p").forEach((elem) => {
            if (
                !elem.classList.contains("fullname") &&
                !elem.classList.contains("specialist")
            ) {
                elem.classList.add("hidden");
            }
        });

        event.target.classList.add("hidden");
        targetCard.querySelector(".btnSwowMore").classList.remove("hidden");
    }

    if (event.target.matches(".btnEdit")) {
        modal.openModalUpdateVisit(targetCard);

        btnFormVisit.addEventListener("click", submitEditCard);
        function submitEditCard(event) {
            event.preventDefault();
            modal.handlerFormVisit(targetCardId);

            btnFormVisit.removeEventListener("click", submitEditCard);
        }
    }

    if (event.target.matches(".btnDel")) {
        const cardId = targetCard.dataset.id;

        Requests.delete(cardId)
            .then((dataDel) => {
                console.log(dataDel + " - The card has been deleted");

                targetCard.remove();

                if (listCards.innerHTML === "") {
                    deskText.classList.remove("hidden");
                }
            })
            .catch((error) => alert(error));
    }
});
