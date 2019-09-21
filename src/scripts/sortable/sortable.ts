import Comments from "../MasterModels/Comments";
//import { SortableUI } from "./sortable-ui";

import "../../sass/main.scss";
import "../../sass/sortable.scss";

import * as sortableComponent from "../Handlebars/templates/sortableComponent.hbs";
import * as noDataComponent from "../Handlebars/templates/noDataComponent.hbs";

class Sortable {

    private readonly MIN_CHAR_FOR_SEARCH: number = 3;
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

        this.bindEvents();
    }

    private async getCommentsAsync() {
        const comments: Comments[] = await this.CommentsPromise;
        this.comments = comments.slice(0, 10);

        localStorage.setItem("sortedItems", JSON.stringify(this.comments));

        this.bindOnUI(this.comments);

        // const sortableUI = new SortableUI();
        // sortableUI.initSortable();

        //this.getSortedItems();
    }

    private bindOnUI(comments: Comments[]) {
        if (comments.length) {
            $("#sortableContainer").html(sortableComponent(comments));
        }
        else {
            $("#sortableContainer").html(noDataComponent());
        }
    }

    // private getSortedItems() {
    //     const sortedItems = JSON.parse(localStorage.getItem("sortedItems"));
    //     console.log(sortedItems);
    // }

    private ajax(): Promise<Comments[]> {
        return $.getJSON("https://jsonplaceholder.typicode.com/comments");
    }

    private bindEvents(): void {
        $("#search").keyup((e) => this.searchMethod());
    }

    private searchMethod() {
        let value = (document.getElementById("search") as HTMLInputElement).value;
        if (value.length >= this.MIN_CHAR_FOR_SEARCH) {
            const searchedData = this.getSearchedResult(value);
            this.bindOnUI(searchedData);
        }
        else if (value.length === 0) {
            this.bindOnUI(this.comments);
        }
    }
    private getSearchedResult(value: string): Comments[] {
        const result = this.comments.filter(comment => {
            return comment.name.includes(value);
        });

        return result;
    }


}
new Sortable();
