import "../../../../sass/autocompleteComponent.scss";
import * as autocompleteComponentTemplate from "../../../../scripts/Handlebars/templates/UI/AutocompleteComponent/autocompleteComponent.hbs";

export class AutocompleteComponent {
    private $currentAutocompleteComponentWrapper: JQuery<HTMLElement>;
    private $currentAutocompleteComponent: JQuery<HTMLElement>;
    private $currentAutocompleteComponentInput: JQuery<HTMLElement>;
    private $currentAutocompleteComponentList: JQuery<HTMLElement>;

    init(autocompleteComponentConfig: AutocompleteComponentConfig) {
        //set wrapper container as JqueryElement
        this.$currentAutocompleteComponentWrapper = $(
            `#${autocompleteComponentConfig.container}`
        );

        //Bind autocomplete template to wrapper
        this.$currentAutocompleteComponentWrapper.html(
            autocompleteComponentTemplate(autocompleteComponentConfig)
        );

        //Set elements of autocomplete
        this.extractElements(autocompleteComponentConfig);

        this.bindEvents();
    }

    private extractElements(
        autocompleteComponentConfig: AutocompleteComponentConfig
    ) {
        this.$currentAutocompleteComponent = $(
            `#${autocompleteComponentConfig.id}Autocomplete`
        );
        this.$currentAutocompleteComponentInput = this.$currentAutocompleteComponent.find(
            ".autocomplete-input"
        );
        this.$currentAutocompleteComponentList = this.$currentAutocompleteComponent.find(
            ".autocomplete-list-container"
        );
    }

    private bindEvents() {
        this.$currentAutocompleteComponentWrapper.on(
            "keyup",
            this.$currentAutocompleteComponentInput,
            () => this.onSearch()
        );
    }

    private onSearch(): void {
        this.$currentAutocompleteComponentList.show();
    }
}

export class AutocompleteComponentConfig {
    id: string;
    data: Object[];
    container: string;
}
