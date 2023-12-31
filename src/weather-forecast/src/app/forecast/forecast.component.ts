import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {APIService} from "../api.service";
import {Prediction} from "../classes";
import {FormatDatePipe} from "../format-date.pipe";
import {FormatTimePipe} from "../format-time.pipe";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

declare let ymaps: any

@Component({
    selector: 'app-forecast',
    standalone: true,
    imports: [CommonModule, FormatDatePipe, FormatTimePipe, ReactiveFormsModule],
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
    protected readonly Math = Math;

    formCity: FormControl = new FormControl<string>("", [Validators.required]);

    prediction: Prediction | null = null;
    isError: boolean = false;
    inProgress = false;
    selectedDay: number = 0;
    map: any = null;

    constructor(private apiService: APIService) {
    }

    forecastFor() {
        this.inProgress = true;
        let forecast = this.apiService.getForecast(this.formCity.value).subscribe({
            next: (value: Prediction) => {
                this.prediction = value;
                this.isError = false
                this.inProgress = false;
                this.renderMap();
            },
            error: () => {
                this.prediction = null;
                this.isError = true
                this.inProgress = false;
            },
        })
    }

    change(index: number) {
        this.selectedDay = index;
    }

    convertWind(value: number): number {
        return Math.round(value * (1000 / 3600));
    }

    convertPressure(value: number): number {
        return Math.round(value * 0.75)
    }

    renderMap() {
        ymaps.ready(() => {
            if (this.map !== null) {
                this.map.destroy();
            }
            this.map = new ymaps.Map('map', {
                center: [this.prediction!.location.lat, this.prediction!.location.lon],
                zoom: 10,
                controls: []
            });
        });
    }

}
