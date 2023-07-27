import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {APIService} from "../api.service";
import {Prediction} from "../classes";
import {FormatDatePipe} from "../format-date.pipe";

@Component({
    selector: 'app-forecast',
    standalone: true,
    imports: [CommonModule, FormatDatePipe],
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
    date = new Date();
    constructor(private apiService: APIService) {
    }

    ngOnInit(): void {
        let location = this.apiService.getForecast("london").subscribe((value: Prediction) => console.log(value));
    }


}
