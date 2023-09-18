import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    localStorage = window.localStorage;

    get(nameProperty: string): string | null {
        return this.localStorage.getItem(nameProperty);
    }


    set(nameProperty: string, value: string) {
        this.localStorage.setItem(nameProperty, value);
    }
}
