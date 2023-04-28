import Requests from"./Requests.js";import Card from"./Card.js";import VisitCardiologist from"./visitCardiologist.js";import VisitDentist from"./visitDentist.js";import VisitTherapist from"./visitTherapist.js";import{btnLogin,btnCreateVisit,btnUnlogin,modalLogin,formLogin,setToken,modalVisit,formVisitSpecialist,formVisitInfoWrapper,btnFormVisit,listCards}from"./constants.js";const card=new Card;export default class Modal{openModalLogin(){modalLogin.classList.add("active")}handlerFormLogin(){var t=formLogin.email.value,e=formLogin.password.value;Requests.getToken(t,e).then(t=>{localStorage.setItem("token",""+t),setToken(t),this.closeModal(),btnLogin.classList.add("hidden"),btnCreateVisit.classList.remove("hidden"),btnUnlogin.classList.remove("hidden"),Requests.get().then(t=>{t&&card.renderAll(t)})}).catch(t=>alert(t))}closeModal(){modalLogin.classList.remove("active"),modalVisit.classList.remove("active"),formVisitInfoWrapper.innerHTML="",formVisitSpecialist.value="default",btnFormVisit.classList.add("hidden")}openModalNewVisit(){modalVisit.classList.add("active"),formVisitSpecialist.disabled=!1,formVisitSpecialist.addEventListener("change",t=>{this.selectSwitch(t.target.value),btnFormVisit.innerText="Create"})}selectSwitch(t){switch(t){case"cardiologist":(new VisitCardiologist).renderCardiologistInputs();break;case"dentist":(new VisitDentist).renderDentistInputs();break;case"therapist":(new VisitTherapist).renderTherapistInputs()}btnFormVisit.classList.remove("hidden")}openModalUpdateVisit(t){modalVisit.classList.add("active");var e=t.getAttribute("data-specialist"),i=(formVisitSpecialist.value=e,formVisitSpecialist.disabled=!0,this.selectSwitch(e),btnFormVisit.innerText="Edit",t.querySelectorAll("p"));for(const s of formVisitInfoWrapper.querySelectorAll("[name]"))for(const o of i)o.classList.contains(s.name)&&(s.value=o.innerText.split(" - ")[1])}handlerFormVisit(t){var e={specialist:formVisitSpecialist.value};for(const o of formVisitInfoWrapper.querySelectorAll("[name]")){var{name:i,value:s}=o;e[i]=s}"Create"===btnFormVisit.innerText?(console.log("post"),this.requestPost(e)):(console.log("put"),this.requestPut(e,t))}requestPost(t){Requests.post(t).then(t=>{this.closeModal(),card.renderSingle(t)}).catch(t=>alert(t))}requestPut(t,e){Requests.put(t,e).then(t=>{this.closeModal(),listCards.querySelector(`[data-id="${e}"]`).remove(),card.renderSingle(t)}).catch(t=>alert(t))}}