import {SettingsRepositoryService} from './settings-repository.service';
import {StorageService} from "./storage.service";
import {Settings} from "../Settings";

describe('SettingsRepositoryService', () => {
    let service: SettingsRepositoryService;

    it('should set settings', () => {
        let storage = jasmine.createSpyObj<StorageService>(["set"]);
        let settingsRepository = new SettingsRepositoryService(storage);

        let setting = new Settings(10, 5, true, true)

        settingsRepository.set(setting);

        expect(storage.set).toHaveBeenCalledWith("settings", JSON.stringify(setting));
    });

    it('should get certain settings if storage doesn\'t have any settings', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        let settingsRepository = new SettingsRepositoryService(storage);

        storage.get.and.returnValue(null);

        let setting = new Settings(10, 5, true, true)
        expect(settingsRepository.get()).toEqual(setting);
    });

    it('should get settings', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        let settingsRepository = new SettingsRepositoryService(storage);

        let setting = new Settings(10, 10, false, false)
        storage.get.and.returnValue(JSON.stringify(setting));

        let result: Settings = settingsRepository.get();
        expect(Object.assign({}, result)).toEqual(Object.assign({}, setting))
    });
});
