import{formVisitInfoWrapper}from"./constants.js";import Visit from"./Visit.js";export default class VisitTherapist extends Visit{renderTherapistInputs(){var t=this.createInput("age","Age","18");formVisitInfoWrapper.append(...this.createBaseInputs(),t)}}