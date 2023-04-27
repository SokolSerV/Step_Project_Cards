export const URL = "https://ajax.test-danit.com/api/v2/cards";
export const desk = document.querySelector(".main__desk");
export const deskFilter = desk.querySelector(".desk__filter");
export const deskText = desk.querySelector(".desk__text");
export const listCards = desk.querySelector(".desk__list-cards");

export const btnLogin = document.querySelector(".header__btn--login");
export const btnCreateVisit = document.querySelector(".header__btn--create");
export const btnUnlogin = document.querySelector(".header__btn--unlogin");
export const closeBtnLogin = document.querySelector(
    ".modal__close.close__login"
);
export const closeBtnVisit = document.querySelector(
    ".modal__close.close__visit"
);
export const btnFilter = document.querySelector(".filter__btn");

export const modalLogin = document.querySelector("#modal-login");
export const formLogin = modalLogin.querySelector("form");

export const modalVisit = document.querySelector("#modal-newVisit");
export const formVisit = modalVisit.querySelector("form");
export const formVisitSpecialist = formVisit.querySelector("#specialist");
export const formVisitInfoWrapper = formVisit.querySelector("#form__info");
export const btnFormVisit = formVisit.querySelector(".form__btn");
