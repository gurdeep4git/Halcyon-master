import Comments from "../MasterModels/Comments";
import { SortableUI } from "./sortable-ui";

import "../../sass/main.scss";
import "../../sass/sortable.scss";

import * as sortableComponent from "../Handlebars/templates/sortableComponent.hbs";

class Sortable {

    private CommentsPromise: Promise<Comments[]>;
    private comments: Comments[] = [];

    constructor() {
        if (JSON.parse(localStorage.getItem("sortedItems")) === null) {
            this.CommentsPromise = this.ajax();
            this.getCommentsAsync();
        }
        else {
            this.comments = JSON.parse(localStorage.getItem("sortedItems"));
            this.bindOnUI(this.comments);
        }

    }

    private async getCommentsAsync() {
        const comments: Comments[] = await this.CommentsPromise;
        this.comments = comments.slice(0, 10);
        
        this.bindOnUI(this.comments);

        const sortableUI = new SortableUI();
        sortableUI.initSortable();

        this.getSortedItems();
    }

    private bindOnUI(reducedComments: Comments[]) {
        $("#sortableContainer").html(sortableComponent(reducedComments));
    }

    // private getSortedItems() {
    //     const sortedItems = JSON.parse(localStorage.getItem("sortedItems"));
    //     console.log(sortedItems);
    // }

    private ajax(): Promise<Comments[]> {
        return $.getJSON("https://jsonplaceholder.typicode.com/comments");
    }
}
new Sortable();
