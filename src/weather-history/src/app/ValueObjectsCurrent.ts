export class Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;

    constructor(name: string, region: string, country: string, lat: number, lon: number) {
        this.name = name;
        this.region = region;
        this.country = country;
        this.lat = lat;
        this.lon = lon;
    }
}

export class Current {
    temp_c: number;
    wind_kph: number;
    pressure_mb: number;
    gust_kph: number;
    condition: Condition;

    constructor(temp_c: number, wind_kph: number, pressure_mb: number, gust_kph: number, condition: Condition) {
        this.temp_c = temp_c;
        this.wind_kph = wind_kph;
        this.pressure_mb = pressure_mb;
        this.gust_kph = gust_kph;
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

export class CurrentPrediction {
    location: Location;
    current: Current;

    constructor(location: Location, current: Current) {
        this.location = location;
        this.current = current;
    }
}