import "../../sass/main.scss";
import {
    AutocompleteComponent,
    AutocompleteComponentConfig
} from "../Utilities/UI/AutocompleteComponent/autocompleteComponent";

class Autocomplete {
    data = [
        { id: 1, title: "france" },
        { id: 2, title: "london" },
        { id: 3, title: "paris" },
        { id: 4, title: "usa" },
        { id: 5, title: "canada" },
        { id: 6, title: "india" }
    ];

    constructor() {
        $(".autocomplete-input").each((_i, input) => {
            const id = $(input).attr("id");
            const autocompleteComponentConfig = new AutocompleteComponentConfig();
            autocompleteComponentConfig.id = id;
            autocompleteComponentConfig.data = this.data;
            autocompleteComponentConfig.propToSearch = "title";

            const autocompleteComponent = new AutocompleteComponent();
            autocompleteComponent.init(autocompleteComponentConfig);
        });
    }
}
new Autocomplete();
