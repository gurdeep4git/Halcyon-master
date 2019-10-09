import "../../../../sass/autocompleteComponent.scss";
import * as autocompleteComponentTemplate from "../../../../scripts/Handlebars/templates/UI/AutocompleteComponent/autocompleteComponent.hbs";

export class AutocompleteComponent {
    private $currentAutocompleteComponentWrapper: JQuery<HTMLElement>;
    private $currentAutocompleteComponentInput: JQuery<HTMLElement>;
    private $currentAutocompleteComponentList: JQuery<HTMLElement>;

    private config: AutocompleteComponentConfig = {
        id: null,
        data: null,
        propToSearch: null
    };

    init(autocompleteComponentConfig: AutocompleteComponentConfig) {
        this.config.id = autocompleteComponentConfig.id;
        this.config.data = autocompleteComponentConfig.data;
        this.config.propToSearch = autocompleteComponentConfig.propToSearch;

        //set current input as JqueryElement
        this.$currentAutocompleteComponentInput = $(
            `#${autocompleteComponentConfig.id}`
        );

        this.$currentAutocompleteComponentWrapper = this.$currentAutocompleteComponentInput.parent(
            "div"
        );

        const listContainer = `<div class="autocomplete-list-container" id=${this.config.id}AutocompleteList></div>`;
        this.$currentAutocompleteComponentInput.after(listContainer);

        this.$currentAutocompleteComponentList = this.$currentAutocompleteComponentInput.next(
            ".autocomplete-list-container"
        );

        this.bindEvents();
    }

    private bindEvents() {
        this.$currentAutocompleteComponentInput.on("keyup focus", () =>
            this.onSearch()
        );

        $(document).on("click", e => {
            if (
                $(e.target).closest(this.$currentAutocompleteComponentWrapper)
                    .length != 0
            ) {
                return false;
            }
            this.$currentAutocompleteComponentList.hide();
        });

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
            return e[`${this.config.propToSearch}`].includes(value);
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
    propToSearch: string;
}
