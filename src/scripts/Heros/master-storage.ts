import { Hero } from "./hero";

/*
setItem(): Add key and value to LocalStorage

getItem(): Retrieve a value by the key from LocalStorage

removeItem(): Remove an item by key from LocalStorage

clear(): Clear all LocalStorage

key(): Passed a number to retrieve nth key of a LocalStorage
*/
export class MasterStorage{

    public storageKey:string = "storageKey";
    /**
     * set
     */
    public set(key:string ,heros:Hero[]):void {
        localStorage.setItem(key,JSON.stringify(heros));
    }

    
}