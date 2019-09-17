import "../Utilities/JqueryUI/jquery-ui.css";
import "../Utilities/JqueryUI/jquery-ui.js";
import { IdHelper } from "../Utilities/id-helper";

export class SortableUI {
    private readonly $sortableContainer = $("#sortableContainer");
    private updatedItems: number[] = [];

    initSortable() {
        const sortableOptions = {
            handle: ".handle",
            containment: "#sortableContainer",
            revert: false,
            update: (_event: Event, _ui: Object) => this.updateHandler()
        };

        this.$sortableContainer.sortable(sortableOptions);
    }

    private updateHandler() {
        var order = this.$sortableContainer.sortable("toArray", { attribute: "sort-order" });

        this.updatedItems.length = 0;

        for (let index = 0; index < order.length; index++) {
            const id = Number(IdHelper.extractId(order[index]));
            this.updatedItems.push(id);
        }

        localStorage.setItem("sortedItems", JSON.stringify(this.updatedItems));
    }
}
