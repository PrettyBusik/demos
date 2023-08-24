import {Injectable} from '@angular/core';
import {Settings} from "../Settings";

@Injectable({
  providedIn: 'root'
})
export class SettingsRepositoryService {
  get(): Settings {
    let settings = window.localStorage.getItem("settings");
    if (settings === null) {
      return new Settings();
    }
    return JSON.parse(settings)
  }

  set(setting: Settings) {
    window.localStorage.setItem("settings", JSON.stringify(setting))
  }
}
