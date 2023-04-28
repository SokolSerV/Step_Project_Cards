import Requests from "./Requests.js";
import Card from "./Card.js";

import {
    btnLogin,
    btnCreateVisit,
    btnUnlogin,
    modalLogin,
    formLogin,
    setToken,
} from "./constants.js";

const card = new Card();

export default class Modal {
    openModalLogin() {
        modalLogin.classList.add("active");
    }

    handlerFormLogin() {
        const email = formLogin.email.value;
        const password = formLogin.password.value;

        Requests.getToken(email, password)
            .then((dataToken) => {
                localStorage.setItem("token", `${dataToken}`);

                setToken(dataToken);

                this.closeModal();

                btnLogin.classList.add("hidden");
                btnCreateVisit.classList.remove("hidden");
                btnUnlogin.classList.remove("hidden");

                Requests.get().then((dataGet) => {
                    if (dataGet) {
                        card.renderAll(dataGet);
                    }
                });
            })
            .catch((error) => alert(error));
    }

    closeModal() {
        modalLogin.classList.remove("active");
    }
}
