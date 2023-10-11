import {StatisticService} from "./statistic.service";
import {StorageService} from "./storage.service";
import {WordRepositoryService} from "./word-repository.service";
import {OptionsOfStatus, Word} from "../word";
import {DateHelper} from "../DateHelper";


describe('StatisticService', () => {
    let service: StatisticService;

    it('countWordsByStatus() - should return map with status and amount words for this status', () => {
        let storage = jasmine.createSpyObj<StorageService>(['get']);
        let wordRepository = new WordRepositoryService(storage);
        let statistic = new StatisticService(wordRepository);

        let word1 = new Word(1, "a", "book", "ppp", "verb", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "verb", "glass", 333333);
        let word3 = new Word(3, "c", "dall", "aaa", "verb", "dall", 333333);
        let word4 = new Word(4, "d", "dall", "ddd", "verb", "dall", 4444);


        word1.status = OptionsOfStatus.Waiting;
        word2.status = OptionsOfStatus.InProgress;
        word3.status = OptionsOfStatus.Completed;
        word4.status = OptionsOfStatus.Completed;

        let allWords = [word1, word2, word3, word4];
        storage.get.and.returnValue(allWords);

        let result = statistic.countWordsByStatus();

        let expectation = new Map([[OptionsOfStatus.Waiting, 1], [OptionsOfStatus.InProgress, 1], [OptionsOfStatus.Completed, 2]]);

        expect(result).toEqual(expectation)
    });

    it('countWordsByLevel() - should  return map with level and amount words for this level', function () {
        let storage = jasmine.createSpyObj<StorageService>(['get']);
        let wordRepository = new WordRepositoryService(storage);
        let statistic = new StatisticService(wordRepository);

        let word1 = new Word(1, "a", "book", "ppp", "verb", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "verb", "glass", 333333);
        let word3 = new Word(3, "c", "dall", "aaa", "verb", "dall", 333333);
        let word4 = new Word(4, "d", "dall", "ddd", "verb", "dall", 4444);


        word1.level = 1;
        word2.level = 1;
        word3.level = 7;
        word4.level = 8;

        let allWords = [word1, word2, word3, word4];
        storage.get.and.returnValue(allWords);

        let result = statistic.countWordsByLevel();

        let expectation = new Map([[1, 2],[2,0],[3,0],[4,0],[5,0],[6,0],[7, 1],[8,1]]);

        expect(result).toEqual(expectation)
    });

    it('countWordsByNextTrainDate() - should  return map with date and amount words for this date', function () {
        let wordRepository =jasmine.createSpyObj<WordRepositoryService>(['countWordsForNextTrainingDate']);
        let statistic = new StatisticService(wordRepository);

        let today= DateHelper.getTimeStampForToday();
        let tomorrow= DateHelper.getNextDate(today,1);
        let dayAfterTomorrow=DateHelper. getNextDate(today,2);


        wordRepository.countWordsForNextTrainingDate.withArgs(today).and.returnValue(1);
        wordRepository.countWordsForNextTrainingDate.withArgs(tomorrow).and.returnValue(2);
        wordRepository.countWordsForNextTrainingDate.withArgs(dayAfterTomorrow).and.returnValue(3);


        let result= statistic.countWordsByNextTrainDate(3);

        let expectation = new Map([[today,1 ],
            [tomorrow,2],
            [dayAfterTomorrow,3]])

        expect(result).toEqual(expectation);
    });
});
