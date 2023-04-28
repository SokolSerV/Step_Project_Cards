import Requests from "./Requests.js";
import Card from "./Card.js";
import VisitCardiologist from "./visitCardiologist.js";
import VisitDentist from "./visitDentist.js";
import VisitTherapist from "./visitTherapist.js";

import {
    btnLogin,
    btnCreateVisit,
    btnUnlogin,
    modalLogin,
    formLogin,
    setToken,
    modalVisit,
    formVisitSpecialist,
    formVisitInfoWrapper,
    btnFormVisit,
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

        modalVisit.classList.remove("active");
        formVisitInfoWrapper.innerHTML = "";
        formVisitSpecialist.value = "default";
        btnFormVisit.classList.add("hidden");
    }

    openModalNewVisit() {
        modalVisit.classList.add("active");

        formVisitSpecialist.addEventListener("change", (event) => {
            this.selectSwitch(event.target.value);
        });
    }

    selectSwitch(value) {
        switch (value) {
            case "cardiologist":
                new VisitCardiologist().renderCardiologistInputs();
                break;
            case "dentist":
                new VisitDentist().renderDentistInputs();
                break;
            case "therapist":
                new VisitTherapist().renderTherapistInputs();
                break;
        }
        btnFormVisit.classList.remove("hidden");
    }

    handlerFormVisit(targetCardId) {
        const specialist = formVisitSpecialist.value;
        const objectBody = { specialist };

        const formVisitElems = formVisitInfoWrapper.querySelectorAll("[name]");
        for (const elem of formVisitElems) {
            const { name, value } = elem;
            objectBody[name] = value;
        }

        this.requestPost(objectBody);
    }

    requestPost(objectPost) {
        Requests.post(objectPost)
            .then((dataPost) => {
                this.closeModal();

                card.renderSingle(dataPost);
            })
            .catch((error) => alert(error));
    }
}
