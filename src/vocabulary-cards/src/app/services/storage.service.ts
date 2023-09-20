import {Injectable} from '@angular/core';
import {Word} from "../word";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    localStorage = window.localStorage;

    get<T>(nameProperty: string): T| null {
        let result = this.localStorage.getItem(nameProperty);
        if (result===null){
            return null;
        }
         return JSON.parse(result) as T
    }


    set<T>(nameProperty: string, value: T) {
        this.localStorage.setItem(nameProperty,JSON.stringify(value));
    }
}
