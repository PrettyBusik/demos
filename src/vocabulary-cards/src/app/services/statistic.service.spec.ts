import {StatisticService} from "./statistic.service";
import {WordRepositoryService} from "./word-repository.service";
import {OptionsOfStatus} from "../word";
import {DateHelper} from "../DateHelper";
import {HistoryService} from "./history.service";


describe('StatisticService', () => {
    let service: StatisticService;

    it('countWordsByStatus() - should return map with status and amount words for this status', () => {
        let wordRepository = jasmine.createSpyObj<WordRepositoryService>(['wordsByStatus']);
        let history = {} as HistoryService;
        let statistic = new StatisticService(wordRepository, history);


        wordRepository.wordsByStatus.withArgs(OptionsOfStatus.Waiting).and.returnValue(1);
        wordRepository.wordsByStatus.withArgs(OptionsOfStatus.InProgress).and.returnValue(2);
        wordRepository.wordsByStatus.withArgs(OptionsOfStatus.Completed).and.returnValue(3);

        let result = statistic.countWordsByStatus();

        let expectation = new Map([[OptionsOfStatus.Waiting, 1], [OptionsOfStatus.InProgress, 2], [OptionsOfStatus.Completed, 3]]);

        expect(result).toEqual(expectation)
    });

    it('countWordsByLevel() - should  return map with level and amount words for this level', function () {
        let wordRepository = jasmine.createSpyObj<WordRepositoryService>(["wordsByLevel"]);
        let history = {} as HistoryService;
        let statistic = new StatisticService(wordRepository, history);

        for (let i = 1; i <= 8; i++) {
            wordRepository.wordsByLevel.withArgs(i).and.returnValue(i);
        }

        let result = statistic.countWordsByLevel();

        let expectation = new Map([[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8]]);

        expect(result).toEqual(expectation)
    });

    it('countWordsByNextTrainDate() - should  return map with date and amount words for this date', function () {
        let wordRepository = jasmine.createSpyObj<WordRepositoryService>(['countWordsForNextTrainingDate']);
        let history = {} as HistoryService;
        let statistic = new StatisticService(wordRepository, history);

        let today = DateHelper.getTimeStampForToday();
        let tomorrow = DateHelper.getNextDate(today, 1);
        let dayAfterTomorrow = DateHelper.getNextDate(today, 2);


        wordRepository.countWordsForNextTrainingDate.withArgs(today).and.returnValue(1);
        wordRepository.countWordsForNextTrainingDate.withArgs(tomorrow).and.returnValue(2);
        wordRepository.countWordsForNextTrainingDate.withArgs(dayAfterTomorrow).and.returnValue(3);


        let result = statistic.countWordsByNextTrainDate(3);

        let expectation = new Map([
            [today, 1],
            [tomorrow, 2],
            [dayAfterTomorrow, 3]
        ])

        expect(result).toEqual(expectation);
    });

    it(' countWordsByNextTrainDate() - should  return map with  next date and amount of words for that training', function () {
        let wordRepository = jasmine.createSpyObj<WordRepositoryService>(['countWordsForNextTrainingDate']);
        let history = {} as HistoryService;
        let statistic = new StatisticService(wordRepository, history);

        let today = DateHelper.getTimeStampForToday();
        let tomorrow = DateHelper.getNextDate(today, 1);
        let dayAfterTomorrow = DateHelper.getNextDate(today, 2);

        wordRepository.countWordsForNextTrainingDate.withArgs(today).and.returnValue(1);
        wordRepository.countWordsForNextTrainingDate.withArgs(tomorrow).and.returnValue(2);
        wordRepository.countWordsForNextTrainingDate.withArgs(dayAfterTomorrow).and.returnValue(3);

        let result = statistic.countWordsByNextTrainDate(3);

        let expectation = new Map([
            [today, 1],
            [tomorrow, 2],
            [dayAfterTomorrow, 3]
        ])

        expect(result).toEqual(expectation);
    });

    it('areTrainedWordsForDates() - should return Map with previous days and response (true/ false) were words been trained', function () {
        let wordRepository = {} as WordRepositoryService;
        let history = jasmine.createSpyObj<HistoryService>(['getDatesWithTraining']);
        let statistic = new StatisticService(wordRepository, history);

        let today = DateHelper.getTimeStampForToday();
        let yesterday = DateHelper.getNextDate(today, -1);
        let dayBeforeYesterday = DateHelper.getNextDate(today, -2);

        let datesWithTraining = new Set<number>();
        datesWithTraining.add(today);
        datesWithTraining.add(yesterday);

        history.getDatesWithTraining.and.returnValue(datesWithTraining);

        let result = statistic.areTrainedWordsForDates(3);

        let expectations = new Map([[today, true], [yesterday, true], [dayBeforeYesterday, false]]);

        expect(result).toEqual(expectations);
    });

    it('areTrainedWordsForDates() - should return Map with previous days and response (false) if the storage does not have any dates', function () {
        let wordRepository = {} as WordRepositoryService;
        let history = jasmine.createSpyObj<HistoryService>(['getDatesWithTraining']);
        let statistic = new StatisticService(wordRepository, history);

        let today = DateHelper.getTimeStampForToday();
        let yesterday = DateHelper.getNextDate(today, -1);
        let dayBeforeYesterday = DateHelper.getNextDate(today, -2);

        let datesWithTraining = new Set<number>([]);

        history.getDatesWithTraining.and.returnValue(datesWithTraining);

        let result = statistic.areTrainedWordsForDates(3);

        let expectations = new Map([[today, false], [yesterday, false], [dayBeforeYesterday, false]]);

        expect(result).toEqual(expectations);
    });


    it('areNewWordsBeenStarted() - should return Map with previous days and response (true/ false) were new words been started', function () {
        let wordRepository = {} as WordRepositoryService;
        let history = jasmine.createSpyObj<HistoryService>(['getDatesWithNweWords']);
        let statistic = new StatisticService(wordRepository, history);

        let today = DateHelper.getTimeStampForToday();
        let yesterday = DateHelper.getNextDate(today, -1);
        let dayBeforeYesterday = DateHelper.getNextDate(today, -2);

        let datesWithNewWords = new Set<number>();
        datesWithNewWords.add(today);
        datesWithNewWords.add(yesterday);

        history.getDatesWithNweWords.and.returnValue(datesWithNewWords);

        let result = statistic.areNewWordsBeenStarted(3);

        let expectations = new Map([[today, true], [yesterday, true], [dayBeforeYesterday, false]]);

        expect(result).toEqual(expectations);
    });

    it('areNewWordsBeenStarted() - should return Map with previous days and response (false) if the storage does not have any dates', function () {
        let wordRepository = {} as WordRepositoryService;
        let history = jasmine.createSpyObj<HistoryService>(['getDatesWithNweWords']);
        let statistic = new StatisticService(wordRepository, history);

        let today = DateHelper.getTimeStampForToday();
        let yesterday = DateHelper.getNextDate(today, -1);
        let dayBeforeYesterday = DateHelper.getNextDate(today, -2);

        let datesWithNewWords = new Set<number>([]);

        history.getDatesWithNweWords.and.returnValue(datesWithNewWords);

        let result = statistic.areNewWordsBeenStarted(3);

        let expectations = new Map([[today, false], [yesterday, false], [dayBeforeYesterday, false]]);

        expect(result).toEqual(expectations);
    });

});
