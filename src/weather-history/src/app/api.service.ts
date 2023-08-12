import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CurrentPrediction} from "./ValueObjectsCurrent";
import {History} from "./ValueObjectsHistory";

@Injectable({
    providedIn: 'root'
})
export class APIService {

    constructor(private http: HttpClient) {
    }

    getCurrentForecast(cityName: string): Observable<CurrentPrediction> {
        let params: HttpParams = new HttpParams().set("place", cityName);

        let currentForecast: Observable<CurrentPrediction> = this.http.get<CurrentPrediction>(
            "/weather-history/get-current.php", {params: params});
        return currentForecast;
    }

    getHistory(cityName: string): Observable<History> {

        let params: HttpParams = new HttpParams().set("place", cityName);

        let history: Observable<History> = this.http.get<History>("/weather-history/get-history.php", {params: params})
        return history;
    }
}
