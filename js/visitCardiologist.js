import { formVisitInfoWrapper } from "./constants.js";
import Visit from "./Visit.js";

export default class VisitCardiologist extends Visit {
    renderCardiologistInputs() {
        const inputPressure = this.createInput(
            "pressure",
            "Ordinary pressure",
            "120/80"
        );

        const inputBodyMassIndex = this.createInput(
            "bmi",
            "Body mass index",
            "22"
        );

        const inputCardioDiseases = this.createInput(
            "diseases",
            "Cardiosystem diseases",
            "There are no diseases"
        );

        const inputAge = this.createInput("age", "Age", "18");

        formVisitInfoWrapper.append(
            ...this.createBaseInputs(),
            inputPressure,
            inputBodyMassIndex,
            inputCardioDiseases,
            inputAge
        );
    }
}
