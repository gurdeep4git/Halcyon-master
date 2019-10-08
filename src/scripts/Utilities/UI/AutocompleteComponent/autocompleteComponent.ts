import "../../../../sass/autocompleteComponent.scss";
import * as autocompleteComponentTemplate from "../../../../scripts/Handlebars/templates/UI/AutocompleteComponent/autocompleteComponent.hbs";

export class AutocompleteComponent {
    private $currentAutocompleteComponentInput: JQuery<HTMLElement>;
    private $currentAutocompleteComponentList: JQuery<HTMLElement>;

    private data: Object[];

    private config: AutocompleteComponentConfig = {
        id: null,
        data: null
    };

    init(autocompleteComponentConfig: AutocompleteComponentConfig) {
        //set current input as JqueryElement
        this.$currentAutocompleteComponentInput = $(
            `#${autocompleteComponentConfig.id}`
        );

        this.config.id = autocompleteComponentConfig.id;
        this.config.data = autocompleteComponentConfig.data;

        this.bindEvents();
    }

    private bindEvents() {
        this.$currentAutocompleteComponentInput.on("keyup", () =>
            this.onSearch()
        );
    }

    private onSearch(): void {
        let value = this.$currentAutocompleteComponentInput.val();

        const filterData = this.config.data.filter(e => {
            //@ts-ignore
            return e.title.includes(value);
        });

        console.log(filterData);

        const obj = {
            id: this.config.id,
            data: filterData
        };

        this.$currentAutocompleteComponentInput.after(
            autocompleteComponentTemplate(obj)
        );

        this.$currentAutocompleteComponentList = this.$currentAutocompleteComponentInput.next(
            ".autocomplete-list-container"
        );

        this.$currentAutocompleteComponentList.show();
    }
}

export class AutocompleteComponentConfig {
    id: string;
    data: Object[];
}
