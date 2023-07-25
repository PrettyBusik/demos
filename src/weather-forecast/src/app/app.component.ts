import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForecastComponent} from "./forecast/forecast.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ForecastComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-forecast';
}
