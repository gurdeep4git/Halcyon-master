import "../Utilities/JqueryUI/jquery-ui.css";
import "../Utilities/JqueryUI/jquery-ui.js";
import { IdHelper } from "../Utilities/id-helper";

export class SortableUI {
    private readonly $sorttableContainer = $("#sortableContainer");
    private updatedItems: number[] = [];

    initSortable() {
        const sortableOptions = {
            handle: ".handle",
            containment: "#sortableContainer",
            revert: true,
            update: (_event: Event, _ui: Object) => this.updateHandler()
        };

        this.$sorttableContainer.sortable(sortableOptions);
    }

    private updateHandler() {
        var order = this.$sorttableContainer.sortable("toArray");

        this.updatedItems.length = 0;

        for (let index = 0; index < order.length; index++) {
            const id = Number(IdHelper.extractId(order[index]));
            this.updatedItems.push(id);
        }

        console.log(this.updatedItems);
    }
}
