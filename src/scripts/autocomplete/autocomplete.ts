import "../../sass/main.scss";
import {
    AutocompleteComponent,
    AutocompleteComponentConfig
} from "../Utilities/UI/AutocompleteComponent/autocompleteComponent";

class Autocomplete {
    data = [{ id: 1, title: "title 1" }, { id: 2, title: "title 2" }];

    constructor() {
        const autocompleteComponentConfig = new AutocompleteComponentConfig();
        autocompleteComponentConfig.id = "my1";
        autocompleteComponentConfig.data = this.data;
        autocompleteComponentConfig.container = "autocompleteContainer";

        const autocompleteComponent = new AutocompleteComponent();
        autocompleteComponent.init(autocompleteComponentConfig);
    }
}
new Autocomplete();
