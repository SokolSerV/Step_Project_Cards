import { deskFilter, listCards } from "./constants.js";

export default class Filter {
    constructor() {
        this.elemsListCards = listCards.querySelectorAll("li");
        this.status = deskFilter.status.value;
        this.priority = deskFilter.priority.value;
        this.content = deskFilter.content.value;
    }

    getFilter() {
        let statusFilter;
        if (this.status !== "") {
            statusFilter = listCards.querySelectorAll(
                `[data-status = ${this.status}]`
            );
        } else {
            statusFilter = this.elemsListCards;
        }

        let priorityFilter = [];
        if (this.priority !== "") {
            for (const node of statusFilter) {
                if (node.matches(`[data-priority = ${this.priority}]`)) {
                    priorityFilter.push(node);
                }
            }
        } else {
            priorityFilter = [...statusFilter];
        }

        let resFilter;
        if (this.content !== "") {
            resFilter = priorityFilter.filter((elem) => {
                if (
                    elem.dataset.title.includes(this.content) ||
                    elem.dataset.description.includes(this.content)
                ) {
                    return elem;
                }
            });
        } else {
            resFilter = priorityFilter;
        }

        this.elemsListCards.forEach((li) => {
            li.classList.add("hidden");
        });

        resFilter.forEach((li) => {
            li.classList.remove("hidden");
        });
    }
}