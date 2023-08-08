import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {APIService} from "../api.service";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {CurrentPrediction} from "../ValueObjectsCurrent";
import {History} from "../ValueObjectsHistory";
import {FormatDatePipe} from "../format_date";
import {FormatTimePipe} from "../format_time";

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormatDatePipe, FormatTimePipe],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {
  formCityName: FormControl = new FormControl<string>("", [Validators.required])

  prediction: CurrentPrediction | null = null;
  history: History | null = null;

  isErrorInCurrent: boolean = false;
  isErrorInHistory: boolean = false;

  inProgressCurrent: boolean = false;
  inProgressHistory: boolean = false;

  selectedDay: number | null = null;

  constructor(public service: APIService) {
  }

  forecastForNow() {
    if (this.formCityName.value === "") {
      return;
    }

    this.inProgressCurrent = true;

    this.service.getCurrentForecast(this.formCityName.value).subscribe({
      next: (value: CurrentPrediction) => {
        this.prediction = value;
        this.isErrorInCurrent = false;
        this.inProgressCurrent = false;
      },
      error: () => {
        this.prediction = null;
        this.isErrorInCurrent = true;
        this.inProgressCurrent = false;
      }
    })
  }

  historyForecast() {
    if (this.formCityName.value === "") {
      return;
    }

    this.inProgressHistory = true;

    this.service.getHistory(this.formCityName.value).subscribe({
      next: (value: History) => {
        this.history = value;
        this.isErrorInHistory = false;
        this.inProgressHistory = false;
      },
      error: () => {
        this.history = null;
        this.isErrorInHistory = true;
        this.inProgressHistory = false;
      }
    });
  }

  getAllResults() {
    this.forecastForNow();
    this.historyForecast();
  }

  selectDay(i: number) {
    this.selectedDay = i;
  }

  convertWind(value: number): number {
    return Math.round(value * (1000 / 3600));
  }

  convertPressure(value: number): number {
    return Math.round(value * 0.75)
  }

  showDirectionOfWind(wind_degree: number): string {
    if (wind_degree > 338 || wind_degree <= 23) {
      return ""
    }
    if (wind_degree > 23 && wind_degree <= 68) {
      return "bi bi-arrow-up"
    }
    if (wind_degree > 68 && wind_degree <= 113) {
      return "bi bi-arrow-right";
    }
    if (wind_degree > 113 && wind_degree <= 158) {
      return "bi bi-arrow-down-right";
    }
    if (wind_degree > 158 && wind_degree <= 203) {
      return "bi bi-arrow-down";
    }
    if (wind_degree > 203 && wind_degree <= 248) {
      return "bi bi-arrow-down-left";
    }
    if (wind_degree > 248 && wind_degree <= 293) {
      return "bi bi-arrow-left";
    }
    if (wind_degree > 293 && wind_degree <= 338) {
      return "bi bi-arrow-up-left";
    }
    return ""
  }

}
