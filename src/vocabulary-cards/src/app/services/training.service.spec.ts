import {TrainingService} from "./training.service";
import {SettingsRepositoryService} from "./settings-repository.service";
import {WordRepositoryService} from "./word-repository.service";
import {HistoryService} from "./history.service";
import {Settings} from "../Settings";
import {OptionsOfStatus, Word} from "../word";
import {DateHelper} from "../DateHelper";

describe("TrainingService", () => {
    it('getNextWordsForTraining- should get next words for training', function () {
        let settingsRepository = jasmine.createSpyObj<SettingsRepositoryService>(["get"]);
        let wordsRepository = jasmine.createSpyObj<WordRepositoryService>(["getNextWaitingWords"]);
        let history = {} as HistoryService;


        let trainingService = new TrainingService(wordsRepository, settingsRepository, history);

        let setting = new Settings(0, 2, true, true);
        settingsRepository.get.and.returnValue(setting);

        let word1 = new Word(1, "a", "book", "ppp", "verb", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "verb", "glass", 333333);
        let word3 = new Word(3, "c", "dall", "aaa", "verb", "dall", 333333);
        let allWords = [word1, word2, word3];

        wordsRepository.getNextWaitingWords.and.returnValue(allWords);

        let result = trainingService.getNextWordsForTraining();

        expect(wordsRepository.getNextWaitingWords).toHaveBeenCalledWith(setting.numberOfNewWords);
        expect(result).toEqual(allWords);
    });

    it('startLearning() - should run training and update word', function () {
        let settingsRepository = {} as SettingsRepositoryService;
        let wordsRepository = jasmine.createSpyObj<WordRepositoryService>(["updateWord"]);
        let history = jasmine.createSpyObj<HistoryService>(['addDatesWithNewWords']);

        let trainingService = new TrainingService(wordsRepository, settingsRepository, history);

        let word1 = new Word(1, "a", "book", "ppp", "verb", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "verb", "glass", 333333);
        let allWords = [word1, word2,];

        trainingService.startLearning(allWords);

        for (let word of allWords) {
            expect(word.status).toEqual(OptionsOfStatus.InProgress);
            expect(word.level).toEqual(1);
            expect(word.nextTrainingAt).toBe(DateHelper.getTimeStampForToday());

            expect(wordsRepository.updateWord).toHaveBeenCalledWith(word);
            expect(history.addDatesWithNewWords).toHaveBeenCalledWith(DateHelper.getTimeStampForToday());
        }
    });

    it(' failWord() - should work properly', function () {
        let settingsRepository = {} as SettingsRepositoryService;
        let wordsRepository = jasmine.createSpyObj<WordRepositoryService>(["updateWord"]);
        let history = jasmine.createSpyObj<HistoryService>(['addDateWithTraining']);

        let trainingService = new TrainingService(wordsRepository, settingsRepository, history);

        let word1 = new Word(1, "a", "book", "ppp", "verb", "book", 123123);
        trainingService.failWord(word1);

        expect(word1.level).toEqual(1);
        expect(word1.nextTrainingAt).toBe(DateHelper.getTimeStampForToday());
        expect(word1.lastTrainingAt).toBe(DateHelper.getTimeStampForToday());

        expect(wordsRepository.updateWord).toHaveBeenCalledWith(word1);
        expect(history.addDateWithTraining).toHaveBeenCalledWith(DateHelper.getTimeStampForToday());
    });

    it('successfulWord() - should work properly', function () {
        let settingsRepository = {} as SettingsRepositoryService;
        let wordsRepository = jasmine.createSpyObj<WordRepositoryService>(["updateWord"]);
        let history = jasmine.createSpyObj<HistoryService>(['addDateWithTraining']);

        let trainingService = new TrainingService(wordsRepository, settingsRepository, history);

        let word1 = new Word(1, "a", "book", "ppp", "verb", "book", 123123);
        word1.level = 8;

        trainingService.successfulWord(word1);
        expect(word1.nextTrainingAt).toBeNull();
        expect(word1.level).toBeNull();
        expect(word1.status).toEqual(OptionsOfStatus.Completed);
        expect(word1.lastTrainingAt).toEqual(DateHelper.getTimeStampForToday());

        expect(wordsRepository.updateWord).toHaveBeenCalledWith(word1);
        expect(history.addDateWithTraining).toHaveBeenCalledWith(DateHelper.getTimeStampForToday());
    });

    it('successfulWord() - should work properly if word is learned', function () {
        let settingsRepository = {} as SettingsRepositoryService;
        let wordsRepository = jasmine.createSpyObj<WordRepositoryService>(["updateWord"]);
        let history = jasmine.createSpyObj<HistoryService>(['addDateWithTraining']);

        let trainingService = new TrainingService(wordsRepository, settingsRepository, history);

        let word1 = new Word(1, "a", "book", "ppp", "verb", "book", 123123);
        word1.level = 5;
        trainingService.successfulWord(word1);

        expect(word1.nextTrainingAt).toBeGreaterThan(DateHelper.getTimeStampForToday());
        expect(word1.lastTrainingAt).toBe(DateHelper.getTimeStampForToday());
        expect(word1.level).toEqual(6);

        expect(wordsRepository.updateWord).toHaveBeenCalledWith(word1);
        expect(history.addDateWithTraining).toHaveBeenCalledWith(DateHelper.getTimeStampForToday());
    });
});