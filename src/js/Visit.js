import { formVisitInfoWrapper } from "./constants.js";

export default class Visit {
    createInput(
        name,
        placeholder,
        value = "Something ...",
        classes = "form__item",
        type = "text",
        required = true
    ) {
        const input = document.createElement("input");
        input.className = classes;
        input.type = type;
        input.name = name;
        input.placeholder = placeholder;
        input.required = required;
        // input.value = value;

        input.style.width = "100%";

        return input;
    }

    createSelect(
        lableName,
        selectAtrName,
        optionsArr,
        classes = "form__item",
        required = true
    ) {
        const label = document.createElement("label");
        label.textContent = lableName;
        label.style.display = "block";

        const select = document.createElement("select");
        select.name = selectAtrName;
        select.className = classes;
        select.required = required;
        select.style.marginLeft = "10px";

        const optionsArrItems = optionsArr.map((elem) => {
            let option = document.createElement("option");
            option.value = elem;
            option.textContent = elem;

            return option;
        });

        select.append(...optionsArrItems);
        label.append(select);

        return label;
    }

    createBaseInputs() {
        formVisitInfoWrapper.innerHTML = "";

        const inputTitle = this.createInput(
            "title",
            "Purpose of visit",
            "The purpose is not specified"
        );

        const inputDescription = this.createInput(
            "description",
            "Visit description",
            "The description is not specified"
        );

        const inputFullname = this.createInput(
            "fullname",
            "Fullname",
            "Uasya Pupkin"
        );

        const selectPriority = this.createSelect("Priority", "priority", [
            "normal",
            "high",
            "low",
        ]);

        const selectStatus = this.createSelect("Status", "status", [
            "open",
            "done",
        ]);

        const baseInputs = [
            inputTitle,
            inputDescription,
            inputFullname,
            selectPriority,
            selectStatus,
        ];

        return baseInputs;
    }
}
