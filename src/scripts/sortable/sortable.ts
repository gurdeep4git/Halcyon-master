import Comments from "../MasterModels/Comments";
import { SortableUI } from "./sortable-ui";

import "../../sass/main.scss";
import "../../sass/sortable.scss";

import * as sortableComponent from "../Handlebars/templates/sortableComponent.hbs";

class Sortable {
    private CommentsPromise: Promise<Comments[]>;

    constructor() {
        this.CommentsPromise = this.ajax();
        this.getCommentsAsync();
    }

    private async getCommentsAsync() {
        const comments: Comments[] = await this.CommentsPromise;
        const reducedComments = comments.slice(0, 10);

        this.bindOnUI(reducedComments);

        const sortableUI = new SortableUI();
        sortableUI.initSortable();
    }

    private bindOnUI(reducedComments: Comments[]) {
        $("#sortableContainer").html(sortableComponent(reducedComments));
    }

    private ajax(): Promise<Comments[]> {
        return $.getJSON("https://jsonplaceholder.typicode.com/comments");
    }
}
new Sortable();
