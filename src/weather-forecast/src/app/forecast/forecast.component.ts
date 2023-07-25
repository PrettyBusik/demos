import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {APIService} from "../api.service";
import {Prediction} from "../classes";

@Component({
    selector: 'app-forecast',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
    constructor(private apiService: APIService) {
    }

    ngOnInit(): void {
        let location = this.apiService.getForecast("london").subscribe((value: Prediction) => console.log(value));
    }

}
