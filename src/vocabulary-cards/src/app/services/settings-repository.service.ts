import {Injectable} from '@angular/core';
import {Settings} from "../Settings";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsRepositoryService {

  constructor(private storage: StorageService) {
  }

  get(): Settings {
    let settings = this.storage.get<Settings>("settings");
    if (settings === null) {
      return new Settings(10, 5, true, true);
    }
    return settings
  }

  set(setting: Settings) {
    this.storage.set<Settings>("settings", setting);
  }
}
