import "../../../../sass/autocompleteComponent.scss";
import * as autocompleteComponentTemplate from "../../../../scripts/Handlebars/templates/UI/AutocompleteComponent/autocompleteComponent.hbs";

export class AutocompleteComponent {
    private $currentAutocompleteComponentInput: JQuery<HTMLElement>;
    private $currentAutocompleteComponentList: JQuery<HTMLElement>;

    private config: AutocompleteComponentConfig = {
        id: null,
        data: null
    };

    init(autocompleteComponentConfig: AutocompleteComponentConfig) {
        this.config.id = autocompleteComponentConfig.id;
        this.config.data = autocompleteComponentConfig.data;

        //set current input as JqueryElement
        this.$currentAutocompleteComponentInput = $(
            `#${autocompleteComponentConfig.id}`
        );

        const listContainer = `<div class="autocomplete-list-container" id=${this.config.id}AutocompleteList></div>`;
        this.$currentAutocompleteComponentInput.after(listContainer);

        this.$currentAutocompleteComponentList = this.$currentAutocompleteComponentInput.next(
            ".autocomplete-list-container"
        );

        this.bindEvents();
    }

    private bindEvents() {
        this.$currentAutocompleteComponentInput.on("keyup", () =>
            this.onSearch()
        );

        // this.$currentAutocompleteComponentInput.on("blur", () =>
        //     this.$currentAutocompleteComponentList.hide()
        // );

        this.$currentAutocompleteComponentList.on(
            "click",
            ".autocomplete-items",
            e => this.onItemSelection($(e.target))
        );
    }

    private onItemSelection($element: JQuery<HTMLElement>): void {
        this.$currentAutocompleteComponentInput.val($element.text());
        this.$currentAutocompleteComponentList.hide();
    }

    private onSearch(): void {
        let value = this.$currentAutocompleteComponentInput.val();

        const filterData = this.config.data.filter(e => {
            //@ts-ignore
            return e.title.includes(value);
        });

        this.$currentAutocompleteComponentList.html(
            autocompleteComponentTemplate(filterData)
        );

        this.$currentAutocompleteComponentList.show();
    }
}

export class AutocompleteComponentConfig {
    id: string;
    data: Object[];
}
