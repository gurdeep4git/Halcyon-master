import "bootstrap-multiselect/dist/css/bootstrap-multiselect.css";
import "../sass/main.scss";
import "../sass/multiselect.scss";

import 'bootstrap/js/dist/Dropdown';
import "bootstrap-multiselect";

export class multiselectClas {    
    private _array : any[]; 
    constructor(){                
        this._array = [];
        this.getData();
        this.bindEvents();
    }

    private getData(){
        let Url = "https://jsonplaceholder.typicode.com/users";
        $.getJSON(Url, (data:any)=> this.bindList(data));
    }

    private bindList(data:any){
        //@ts-ignore
        data.forEach((element) => {           
            let obj = {
                label:element.name,
                value:element.id
            };
            this._array.push(obj);
        });
        
        //@ts-ignore
        $('#dropdownList').multiselect('dataprovider', this._array);

        //@ts-ignore
        $('#dropdownList').multiselect("rebuild");
    }
    
    private bindEvents(){
        //@ts-ignore
        $('#dropdownList').multiselect(this.getMultiselectOptions());
    }

    private getMultiselectOptions(){

        let filterHTML = `<li class="multiselect-item filter">
                            <div class="search-block p-2 d-inline-block">
                                <i class="fa fa-search"></i>
                            </div>
                            <div class="input-block p-2 d-inline-block">
                                <input type="text" class="form-control multiselect-search">
                            </div>
                        </li>`;

        let filterClearBtnHTML = `<span class="input-group-btn">
                                    <div class="delete-block p-2 d-inline-block">
                                    <i class="fa fa-times multiselect-clear-filter"></i>
                                </div><span>`;

        /*let liHTML = `<li>
                    <div class="checkbox-custom">
                        <input type="checkbox" id="" value="">
                        <label for=""></label>
                    </div>
                    </li>`;*/                                
        return{
            dataprovider:this._array,
            templates: {
                filter: filterHTML,
                filterClearBtn: filterClearBtnHTML
            },
            enableFiltering: true,
            filterPlaceholder: 'Search for something...',
            filterBehavior: 'text',
            includeSelectAllOption: true,
            numberDisplayed: 1,
            enableCaseInsensitiveFiltering: true,
            buttonWidth: '100%',
            
        }
    }
}
new multiselectClas();
