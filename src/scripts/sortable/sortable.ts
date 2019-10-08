import Comments from "../MasterModels/Comments";
//import { SortableUI } from "./sortable-ui";

import "../../sass/main.scss";
import "../../sass/sortable.scss";

import * as sortableComponent from "../Handlebars/templates/sortableComponent.hbs";
import * as noDataComponent from "../Handlebars/templates/noDataComponent.hbs";

import { Popup, PopupOptions } from "../Utilities/UI/Popup/popup";

enum SortType {
    Ascending = 1,
    Descending = 2
}

class Sortable {
    private readonly MIN_CHAR_FOR_SEARCH: number = 3;
    private CommentsPromise: Promise<Comments[]>;
    private comments: Comments[] = [];

    constructor() {
        if (JSON.parse(localStorage.getItem("sortedItems")) === null) {
            this.CommentsPromise = this.ajax();
            this.getCommentsAsync();
        } else {
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
        } else {
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
        $("#search").keyup(e => this.searchMethod());
        $("#sortNumeric").click(e => this.sortNumeric($(e.target)));
        //$("#sortAlpha").click(e => this.sortAlpha($(e.target)));

        $("#sortableContainer").on("click", ".fa-trash", e =>
            this.confirmDelete($(e.target))
        );
    }

    private confirmDelete($element: JQuery<HTMLElement>): void {
        const id = $element.data("id");

        const bodyText = "Are you sure you want to delete?";

        const popupOptions = new PopupOptions();
        popupOptions.id = "deleteConfirm";
        popupOptions.title = "Delete";
        popupOptions.bodyText = bodyText;
        popupOptions.primaryBtnText = "Yes";
        popupOptions.secondaryBtnText = "No";
        popupOptions.primaryBtnCallback = () => this.deleteRow(id, popup);
        popupOptions.secondaryBtnCallback = () => popup.hide();

        const popup = new Popup(popupOptions);
        popup.show();
    }

    private deleteRow(id: number, popupRef: Popup): void {
        $(`#comment_${id}`).remove();
        popupRef.hide();
    }

    private sortNumeric($element: JQuery<HTMLElement>) {
        const $currentSortIcon = $element.find(".icon");
        $currentSortIcon.toggleClass(
            "fa-sort-numeric-desc fa-sort-numeric-asc"
        );
        let sortType = $currentSortIcon.hasClass("fa-sort-numeric-desc")
            ? SortType.Descending
            : SortType.Ascending;
        const sortedResult = this.performSort($(".card"), sortType);
        const sortedComments = [...sortedResult];
        this.repaintUI(sortedComments);
    }

    // private sortAlpha($element: JQuery<HTMLElement>) {
    //     const $currentSortIcon = $element.find(".icon");
    //     $currentSortIcon.toggleClass("fa-sort-alpha-desc fa-sort-alpha-asc");
    //     let sortType = $currentSortIcon.hasClass("fa-sort-alpha-desc") ? SortType.Descending : SortType.Ascending;
    //     const sortedResult = this.performSortAlpha($(".card"), sortType);
    //     const sortedComments = [...sortedResult];
    //     this.repaintUI(sortedComments);
    // }

    private repaintUI(sortedComments: any[]) {
        let html: any[] = [];
        $.each(sortedComments, (_, comment) => {
            html.push(comment.outerHTML);
        });
        $("#sortableContainer").html(html.join(""));
    }

    private performSort(
        $elementsToSort: JQuery<HTMLElement>,
        sortType: SortType
    ) {
        //@ts-ignore
        return $elementsToSort.sort((a, b) => {
            if (sortType === SortType.Ascending) {
                return +$(a).attr("sort-order") - +$(b).attr("sort-order");
            } else {
                return +$(b).attr("sort-order") - +$(a).attr("sort-order");
            }
        });
    }

    // private performSortAlpha($elementsToSort: JQuery<HTMLElement>, sortType: SortType) {
    //     //@ts-ignore
    //     return $elementsToSort.sort((a, b) => {
    //         console.log(a);
    //         if (sortType === SortType.Ascending) {
    //             return +$(a).find("h4").text() - +$(b).find("h4").text();
    //         } else {
    //             return +$(b).find("h4").text() - +$(a).find("h4").text();
    //         }
    //     })
    // }

    private searchMethod() {
        let value = (document.getElementById("search") as HTMLInputElement)
            .value;
        if (value.length >= this.MIN_CHAR_FOR_SEARCH) {
            const searchedData = this.getSearchedResult(value);
            this.bindOnUI(searchedData);
        } else if (value.length === 0) {
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
