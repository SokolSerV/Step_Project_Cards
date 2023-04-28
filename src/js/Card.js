import { deskText, listCards } from "./constants.js";

export default class Card {
    renderAll(cards) {
        if (cards.length !== 0) {
            deskText.classList.add("hidden");

            const items = cards.map((card) => {
                const cardDataEls = this.#destructVisit(card);
                return this.#createItem(card, cardDataEls);
            });

            listCards.append(...items);
        }
    }

    renderSingle(card) {
        const cardDataEls = this.#destructVisit(card);
        listCards.prepend(this.#createItem(card, cardDataEls));
    }

    #destructVisit(card) {
        const cardData = Object.entries(card);

        const cardDataEls = cardData.map(([name, value]) => {
            const p = document.createElement("p");
            p.style.margin = "5px";

            const pName = (name[0].toUpperCase() + name.slice(1))
                .split("_")
                .join(" ");

            p.className = name;
            p.textContent = `${pName} - ${value}`;

            if (name !== "fullname" && name !== "specialist") {
                p.classList.add("hidden");
            }

            return p;
        });
        return cardDataEls;
    }

    #createItem(card, cardDataEls) {
        const li = document.createElement("li");
        li.style.cssText =
            "border: 2px solid #0d7ea0; border-radius: 10px; margin: 10px; padding: 10px;";

        li.dataset.id = card.id;
        li.dataset.specialist = card.specialist;
        li.dataset.status = card.status;
        li.dataset.priority = card.priority;
        li.dataset.title = card.title;
        li.dataset.description = card.description;

        if (li.dataset.specialist === "cardiologist") {
            li.style.backgroundColor = "rgba(255, 182, 193, 0.8)";
        } else if (li.dataset.specialist === "dentist") {
            li.style.backgroundColor = "rgba(135, 206, 250, 0.8)";
        } else if (li.dataset.specialist === "therapist") {
            li.style.backgroundColor = "rgba(255, 255, 224, 0.8)";
        }

        const btnShowMore = document.createElement("button");
        btnShowMore.textContent = "Show more";
        btnShowMore.classList.add("btnSwowMore");
        btnShowMore.style.marginRight = "5px";

        const btnShowLess = document.createElement("button");
        btnShowLess.textContent = "Show less";
        btnShowLess.classList.add("btnShowLess", "hidden");
        btnShowLess.style.marginRight = "5px";

        const btnEdit = document.createElement("button");
        btnEdit.textContent = "Edit visit";
        btnEdit.classList.add("btnEdit");
        btnEdit.style.marginRight = "5px";

        const btnDel = document.createElement("button");
        btnDel.textContent = "Delete visit";
        btnDel.classList.add("btnDel");

        li.append(...cardDataEls, btnShowMore, btnShowLess, btnEdit, btnDel);

        return li;
    }
}