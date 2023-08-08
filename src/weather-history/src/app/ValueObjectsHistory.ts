export class History {
    forecast: Forecast;

    constructor(forecast: Forecast) {
        this.forecast = forecast;
    }
}

export class Forecast {
    forecastday: ForecastDay[];

    constructor(forecastDay: ForecastDay[]) {
        this.forecastday = forecastDay;
    }
}

export class ForecastDay {
    date_epoch: number;
    day: Day;
    hour: Hours[];


    constructor(date_epoch: number, day: Day, hour: Hours[]) {
        this.date_epoch = date_epoch;
        this.day = day;
        this.hour = hour;
    }

}

export class Day {
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    condition: Condition;


    constructor(avgtemp_c: number, maxwind_kph: number, totalprecip_mm: number, condition: Condition) {
        this.avgtemp_c = avgtemp_c;
        this.maxwind_kph = maxwind_kph;
        this.totalprecip_mm = totalprecip_mm;
        this.condition = condition;
    }
}

export class Hours {
    time_epoch: number;
    condition: Condition;
    temp_c: number;
    wind_kph: number;
    wind_degree: number;
    pressure_mb: number;
    precip_mm: number;


    constructor(time_epoch: number, condition: Condition, temp_c: number, wind_kph: number, wind_degree: number, pressure_mb: number, precip_mm: number) {
        this.time_epoch = time_epoch;
        this.condition = condition;
        this.temp_c = temp_c;
        this.wind_kph = wind_kph;
        this.wind_degree = wind_degree;
        this.pressure_mb = pressure_mb;
        this.precip_mm = precip_mm;
    }
}

export class Condition {
    text: string;
    icon: string;


    constructor(text: string, icon: string) {
        this.text = text;
        this.icon = icon;
    }
}

