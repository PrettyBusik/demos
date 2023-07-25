import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Prediction} from "./classes";

@Injectable({
    providedIn: 'root'
})
export class APIService {
    constructor(private http: HttpClient) {
    }

    getForecast(cityName: string): Observable<Prediction> {
        let params = new HttpParams().set("city", cityName);
        let response: Observable<Prediction> = this.http.get<Prediction>("http://demos.loc/weather-forecast/get-forecast.php", {params: params})
        return response;
    }
}
