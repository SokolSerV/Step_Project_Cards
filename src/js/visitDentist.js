import { formVisitInfoWrapper } from "./constants.js";
import Visit from "./Visit.js";

export default class VisitDentist extends Visit {
    renderDentistInputs() {
        const inputLastVisitDate = this.createInput(
            "date_last_visit",
            "Date last visit",
            "01-01-2000"
        );

        formVisitInfoWrapper.append(
            ...this.createBaseInputs(),
            inputLastVisitDate
        );
    }
}
