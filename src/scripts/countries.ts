import * as template from "./Handlebars/templates/countries.hbs";
import * as countryCodesDropdown from "./Handlebars/templates/currencyCodesDropdown.hbs";
import * as callingCodesDropdown from "./Handlebars/templates/callingCodesDropdown.hbs";

import "../sass/main.scss";
import "../sass/countries.scss";

import "bootstrap/js/dist/modal";

//import {HelperFunctions} from "./Handlebars/helpers/getLanguageName";

class Countries {
    private countries: {}[];
    private currencyCodes: string[];
    private callingCodes: string[];

    constructor() {
        //  debugger;
        // Handlebars.registerHelper('getLanguageName', function()
        // {
        //     console.log("worked for me!!");
        // });

        // Handlebars.registerHelper('commaSeprated',function(array:string[])
        // {
        //         return array.join(", ");
        // })
        this.countries = [];
        this.currencyCodes = [];
        this.callingCodes = [];

        this.init();
        this.bindEvents();
    }
    private init() {
        this.getCountriesData();
    }

    private bindEvents() {
        $("#ddlCurrenciesCodes").on("change", e =>
            this.currencyCodeTrigger($(e.target))
        );
        $("#ddlCallingCodes").on("change", e =>
            this.callingCodeTrigger($(e.target))
        );
        $("#reserFilter").click(() => this.resetFilter());
    }

    private resetFilter() {
        this.init();
    }
    private getCountriesData() {
        $.ajax({
            url: "https://restcountries.eu/rest/v2/all",
            dataType: "json",
            type: "GET",
            async: true,
            xhr: () => {
                var xhr = new XMLHttpRequest();

                //Download Progress
                xhr.addEventListener(
                    "progress",
                    evt => {
                        if (evt.lengthComputable) {
                            var percentComplete =
                                (evt.loaded / evt.total) * 100;
                            $("div.progress > div.progress-bar").css({
                                width: percentComplete + "%"
                            });
                        }
                    },
                    false
                );
                return xhr;
            },
            success: result => {
                this.countries = result;
                this.currencyCodes = this.getCurrencyCode(this.countries);
                this.bindCurrencyCodeDropdownOnUI(this.currencyCodes);

                this.callingCodes = this.getCallingCode(this.countries);
                this.bindCallingCodeDropdownOnUI(this.callingCodes);

                this.bindOnUI(this.countries);
            }
        });

        // $.getJSON("https://restcountries.eu/rest/v2/all")
        // .done((result)=>{
        //     this.countries = result;
        //     this.currencyCodes = this.getCurrencyCode(this.countries);
        //     this.bindCurrencyCodeDropdownOnUI(this.currencyCodes);

        //     this.callingCodes = this.getCallingCode(this.countries);
        //     this.bindCallingCodeDropdownOnUI(this.callingCodes);

        //     this.bindOnUI(this.countries);
        // })
        // .fail((error)=>{console.log(error)});
    }

    private bindOnUI(countries: {}[]): void {
        $("#countriesRow").empty();
        $("#countriesRow").append(template(countries));
    }

    private getCurrencyCode(countries: {}[]) {
        let currencies = [];
        let currCodes: string[] = [];
        //@ts-ignore
        currencies = countries.map(country => country.currencies);
        currencies.forEach(currency => {
            for (let i = 0; i <= currency.length - 1; i++) {
                currCodes.push(currency[i].code);
            }
        });
        return currCodes;
    }
    private bindCurrencyCodeDropdownOnUI(currCodes: string[]) {
        $("#ddlCurrenciesCodes").append(countryCodesDropdown(currCodes));
    }

    private bindCallingCodeDropdownOnUI(callCodes: string[]) {
        $("#ddlCallingCodes").append(callingCodesDropdown(callCodes));
    }

    private getCallingCode(countries: {}[]) {
        let callingCodes = [];
        let callCodes: string[] = [];
        //@ts-ignore
        callingCodes = countries.map(country => country.callingCodes);
        callingCodes.forEach(call => {
            for (let i = 0; i <= call.length - 1; i++) {
                callCodes.push(call[i]);
            }
        });
        return callCodes;
    }

    private currencyCodeTrigger(e: JQuery<HTMLElement>) {
        let filterBy = 0;
        let selCurrencyCode = e.val().toString();
        this.getFilteredData(selCurrencyCode, filterBy);
    }

    private callingCodeTrigger(e: JQuery<HTMLElement>) {
        let filterBy = 1;
        let selCallingCode = e.val().toString();
        this.getFilteredData(selCallingCode, filterBy);
    }

    private getFilteredData(code: string, type: number) {
        let Url;
        if (type === Type.CurrencyCode) {
            Url = "https://restcountries.eu/rest/v2/currency/";
        }
        if (type === Type.CallingCode) {
            Url = "https://restcountries.eu/rest/v2/callingcode/";
        }
        $.getJSON(Url + code)
            .done(result => {
                $("#filterModal").modal("hide");
                this.bindOnUI(result);
            })
            .fail(error => {
                console.log(error);
            });
    }
}
new Countries();

enum Type {
    CurrencyCode = 0,
    CallingCode
}
