export class Location {
    name: string;
    region: string;
    lat: number;
    lon: number;

    constructor(name: string, region: string, lat: number, lon: number) {
        this.name = name;
        this.region = region;
        this.lat = lat;
        this.lon = lon;
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
    hour: Hour[];

    constructor(date_epoch: number, hour: Hour[]) {
        this.date_epoch = date_epoch;
        this.hour = hour;
    }

}

export class Hour {
    time_epoch: number;
    temp_c: number;
    wind_kph: number;
    pressure_mb: number;
    condition: Condition;

    constructor(time_epoch: number, temp_c: number, wind_kph: number, pressure_mb: number, condition: Condition) {
        this.time_epoch = time_epoch;
        this.temp_c = temp_c;
        this.wind_kph = wind_kph;
        this.pressure_mb = pressure_mb;
        this.condition = condition;
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

export class Prediction {
    location: Location;
    forecast: Forecast;

    constructor(location: Location, forecast: Forecast) {
        this.location = location;
        this.forecast = forecast;
    }
}

