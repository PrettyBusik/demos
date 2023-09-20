import {SettingsRepositoryService} from './settings-repository.service';
import {StorageService} from "./storage.service";
import {Settings} from "../Settings";

describe('SettingsRepositoryService', () => {
    let service: SettingsRepositoryService;

    it('should get specific settings if there isn\'t another setting', () => {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        storage.get.and.returnValue(null);

        let settingsRepository = new SettingsRepositoryService(storage);

        let result = settingsRepository.get();
        expect(result).toEqual(new Settings(10, 5, true, true));
    });

    it('should get the settings from storage', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        let setting = new Settings(5, 5, false, false);
        storage.get.and.returnValue(setting);

        let settingsRepository = new SettingsRepositoryService(storage);
        let result = settingsRepository.get();
        expect(result).toEqual(setting)
    });

    it('should set a setting to storage', function () {
        let storage = jasmine.createSpyObj<StorageService>(["set"]);
        let setting = new Settings(20, 20, true, true);
        let settingsRepository = new SettingsRepositoryService(storage);

        settingsRepository.set(setting);
        expect(storage.set).toHaveBeenCalledWith("settings", setting);
    });
});
