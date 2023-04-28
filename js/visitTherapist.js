import { formVisitInfoWrapper } from "./constants.js";
import Visit from "./Visit.js";

export default class VisitTherapist extends Visit {
    renderTherapistInputs() {
        const inputAge = this.createInput("age", "Age", "18");

        formVisitInfoWrapper.append(...this.createBaseInputs(), inputAge);
    }
}
