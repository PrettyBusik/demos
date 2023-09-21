import {StorageService} from "./storage.service";
import {OptionsOfStatus, Page, Word, WordsFilter} from "../word";
import {WordRepositoryService} from "./word-repository.service";


describe("WordRepository", () => {
    it("add() - should add a word to storage", () => {
        let storage = jasmine.createSpyObj<StorageService>(["get", "set"]);
        let wordRepository = new WordRepositoryService(storage);

        let words: Word[] = [];
        storage.get.and.returnValue(words);

        let newWord: Word = new Word(4, "coco", "coco", "fff", "verb", "coc", 777777);
        let expectedResult: Word[] = [newWord]
        wordRepository.addWord(newWord);

        expect(storage.set).toHaveBeenCalledWith("words", expectedResult)
    })

    it('updateWord() - should update a word', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get", "set"]);
        let wordRepository = new WordRepositoryService(storage);

        const existingWord = new Word(1, "book", "book", "ppp", "noun", "book", 123123);
        let existingWords: Word[] = [existingWord];
        storage.get.and.returnValue(existingWords);

        let updatedWord: Word = new Word(1, "glass", "glass", "ooo", "noun", "glass", 333333);
        const expectedWords = [updatedWord];

        wordRepository.updateWord(updatedWord);

        expect(storage.set).toHaveBeenCalledWith("words", expectedWords);
    });

    it('getNextId() - should  get 1 if there isn\'t last Id in storage', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get", "set"]);
        let wordRepository = new WordRepositoryService(storage);

        storage.get.and.returnValue(null);
        let nextId = wordRepository.getNextId();

        expect(storage.set).toHaveBeenCalledWith("lastId", 1);
        expect(nextId).toBe(1);
    });

    it('getNextId() - should  get next id from storage', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get", "set"]);
        let wordRepository = new WordRepositoryService(storage);

        storage.get.and.returnValue(1);
        let nextId = wordRepository.getNextId();

        expect(storage.set).toHaveBeenCalledWith("lastId", 2);
        expect(nextId).toBe(2);
    });

    it('getWordByID() - should get word by Id', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        let wordRepository = new WordRepositoryService(storage);

        let firstWord = new Word(1, "book", "book", "ppp", "noun", "book", 123123)
        let secondWord = new Word(2, "glass", "glass", "ooo", "noun", "glass", 333333)
        let allWords: Word[] = [firstWord, secondWord];

        storage.get.and.returnValue(allWords);

        let word = wordRepository.getWordByID(1);
        expect(word).toBe(firstWord)
    });

    it('getWordByID() - should get null if the word doesn\'t exist', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        let wordRepository = new WordRepositoryService(storage);

        storage.get.and.returnValue(null);

        let word = wordRepository.getWordByID(1);
        expect(word).toBe(null)
    });

    it(' getPage() - should get the Page', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        let wordRepository = new WordRepositoryService(storage);

        let word1 = new Word(1, "a", "book", "ppp", "noun", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "noun", "glass", 333333);
        let word3 = new Word(3, "c", "dall", "aaa", "noun", "dall", 333333);
        let word4 = new Word(4, "d", "fail", "bbb", "noun", "fail", 333333);
        let word5 = new Word(5, "e", "right", "zzz", "noun", "right", 333333);

        let allWords: Word[] = [word1, word2, word3, word4, word5];

        storage.get.and.returnValue(allWords);
        let result = wordRepository.getPage(2, 2, new WordsFilter());

        let expectedResult: Page = new Page([word3, word4], 3);

        expect(result).toEqual(expectedResult);
    });

    it('getPage() - should get the Page with proper amount words ', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        let wordRepository = new WordRepositoryService(storage);

        let word1 = new Word(1, "a", "book", "ppp", "noun", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "noun", "glass", 333333);
        let word3 = new Word(3, "c", "dall", "aaa", "noun", "dall", 333333);
        let word4 = new Word(4, "d", "fail", "bbb", "noun", "fail", 333333);
        let word5 = new Word(5, "e", "right", "zzz", "noun", "right", 333333);

        let allWords: Word[] = [word1, word2, word3, word4, word5];

        storage.get.and.returnValue(allWords);

        let result = wordRepository.getPage(1, 6, new WordsFilter());
        let expectedResult: Page = new Page([word1, word2, word3, word4, word5], 1);

        expect(result).toEqual(expectedResult);
    });

    it('getPage() - should get en empty array if the number page is bigger than can be ', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        let wordRepository = new WordRepositoryService(storage);

        let word1 = new Word(1, "a", "book", "ppp", "noun", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "noun", "glass", 333333);
        let word3 = new Word(3, "c", "dall", "aaa", "noun", "dall", 333333);
        let word4 = new Word(4, "d", "fail", "bbb", "noun", "fail", 333333);
        let word5 = new Word(5, "e", "right", "zzz", "noun", "right", 333333);

        let allWords: Word[] = [word1, word2, word3, word4, word5];

        storage.get.and.returnValue(allWords);

        let result = wordRepository.getPage(2, 6, new WordsFilter());
        let expectedResult: Page = new Page([], 1)

        expect(result).toEqual(expectedResult);
    });

    it('getPage() - should get the Page according to filters - search ', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        let wordRepository = new WordRepositoryService(storage);

        let word1 = new Word(1, "a", "book", "ppp", "noun", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "noun", "glass", 333333);
        let word3 = new Word(3, "c", "dall", "aaa", "noun", "dall", 333333);
        let word4 = new Word(4, "d", "fail", "bbb", "noun", "fail", 333333);
        let word5 = new Word(5, "e", "right", "zzz", "noun", "right", 333333);

        let allWords: Word[] = [word1, word2, word3, word4, word5];

        storage.get.and.returnValue(allWords);

        let result = wordRepository.getPage(1, 6, new WordsFilter("a"));
        let expectedResult: Page = new Page([word1], 1)

        expect(result).toEqual(expectedResult);
    });

    it('getPage() - should get the Page according to filters - partOfSpeech ', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        let wordRepository = new WordRepositoryService(storage);

        let word1 = new Word(1, "a", "book", "ppp", "verb", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "verb", "glass", 333333);
        let word3 = new Word(3, "c", "dall", "aaa", "verb", "dall", 333333);
        let word4 = new Word(4, "d", "fail", "bbb", "noun", "fail", 333333);
        let word5 = new Word(5, "e", "right", "zzz", "noun", "right", 333333);

        let allWords: Word[] = [word1, word2, word3, word4, word5];

        storage.get.and.returnValue(allWords);

        let result = wordRepository.getPage(1, 10, new WordsFilter(null, "verb"));
        let expectedResult: Page = new Page([word1, word2, word3], 1)

        expect(result).toEqual(expectedResult);
    });

    it('getPage() - should get the Page according to filters - level ', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        let wordRepository = new WordRepositoryService(storage);

        let word1 = new Word(1, "a", "book", "ppp", "verb", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "verb", "glass", 333333);
        let word3 = new Word(3, "c", "dall", "aaa", "verb", "dall", 333333);
        let word4 = new Word(4, "d", "fail", "bbb", "noun", "fail", 333333);
        let word5 = new Word(5, "e", "right", "zzz", "noun", "right", 333333);

        word1.level = 1;
        word2.level = 1;
        word3.level = 2;

        let allWords: Word[] = [word1, word2, word3, word4, word5];

        storage.get.and.returnValue(allWords);

        let result = wordRepository.getPage(1, 3, new WordsFilter(null, null, 2));
        let expectedResult: Page = new Page([word3], 1)

        expect(result).toEqual(expectedResult);
    });

    it('getPage() - should get the Page according to filters - next Training  At ', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        let wordRepository = new WordRepositoryService(storage);

        let word1 = new Word(1, "a", "book", "ppp", "verb", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "verb", "glass", 333333);
        let word3 = new Word(3, "c", "dall", "aaa", "verb", "dall", 333333);
        let word4 = new Word(4, "d", "fail", "bbb", "noun", "fail", 333333);
        let word5 = new Word(5, "e", "right", "zzz", "noun", "right", 333333);

        word1.nextTrainingAt = 1;
        word2.nextTrainingAt = 1;
        word3.nextTrainingAt = 2;

        let allWords: Word[] = [word1, word2, word3, word4, word5];

        storage.get.and.returnValue(allWords);

        let result = wordRepository.getPage(1, 3, new WordsFilter(null, null, null, 2));
        let expectedResult: Page = new Page([word3], 1)

        expect(result).toEqual(expectedResult);
    });

    it('getPage() - should get the Page according to filters - status ', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        let wordRepository = new WordRepositoryService(storage);

        let word1 = new Word(1, "a", "book", "ppp", "verb", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "verb", "glass", 333333);
        let word3 = new Word(3, "c", "dall", "aaa", "verb", "dall", 333333);
        let word4 = new Word(4, "d", "fail", "bbb", "noun", "fail", 333333);
        let word5 = new Word(5, "e", "right", "zzz", "noun", "right", 333333);

        word1.status = OptionsOfStatus.Waiting;
        word2.status = OptionsOfStatus.Waiting;
        word3.status = OptionsOfStatus.InProgress;

        let allWords: Word[] = [word1, word2, word3, word4, word5];

        storage.get.and.returnValue(allWords);

        let result = wordRepository.getPage(1, 3, new WordsFilter(null, null, null, null, OptionsOfStatus.InProgress));
        let expectedResult: Page = new Page([word3], 1)

        expect(result).toEqual(expectedResult);
    });

    it('remove() - should remove a word from storage ', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get", "set"]);
        let wordRepository = new WordRepositoryService(storage);

        let word1 = new Word(1, "a", "book", "ppp", "verb", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "verb", "glass", 333333);
        let allWords: Word[] = [word1, word2];
        storage.get.and.returnValue(allWords);

        let expectedValue = [word2];

        wordRepository.remove(word1);
        expect(storage.set).toHaveBeenCalledWith("words", expectedValue);
    });

    it('remove() - should not remove a word if there isn\'t such word in the storage ', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get", "set"]);
        let wordRepository = new WordRepositoryService(storage);

        let word1 = new Word(1, "a", "book", "ppp", "verb", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "verb", "glass", 333333);
        let allWords: Word[] = [word1, word2];
        storage.get.and.returnValue(allWords);

        let wordForRemoving = new Word(5, "cc", "book", "ppp", "verb", "book", 123123)
        wordRepository.remove(wordForRemoving);

        expect(storage.set).toHaveBeenCalledWith("words", allWords);
    });

    it('getNextWaitingWords() - should get words for training with status waiting ', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        let wordRepository = new WordRepositoryService(storage);

        let word1 = new Word(1, "a", "book", "ppp", "verb", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "verb", "glass", 333333);
        let word3 = new Word(3, "c", "dall", "aaa", "verb", "dall", 333333);

        word1.status = OptionsOfStatus.Waiting;
        word2.status = OptionsOfStatus.InProgress;
        word3.status = OptionsOfStatus.Completed;

        let allWords = [word1, word2, word3];

        storage.get.and.returnValue(allWords);

        let expectedResult = [word1];

        let result = wordRepository.getNextWaitingWords(3);
        expect(result).toEqual(expectedResult);
    });

    it('getListWordsForTodayTraining() - should get words for today training', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        let wordRepository = new WordRepositoryService(storage);

        let word1 = new Word(1, "a", "book", "ppp", "verb", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "verb", "glass", 333333);
        let word3 = new Word(3, "c", "dall", "aaa", "verb", "dall", 333333);

        word1.status = OptionsOfStatus.InProgress;
        word2.status = OptionsOfStatus.InProgress;
        word3.status = OptionsOfStatus.Completed;

        word1.nextTrainingAt = 300;
        word2.nextTrainingAt = 200;
        word3.nextTrainingAt = 200;

        let allWords = [word1, word2, word3];
        storage.get.and.returnValue(allWords);

        let expectedResult = [word2];

        let result = wordRepository.getListWordsForTodayTraining(250);
        expect(result).toEqual(expectedResult);
    });

    it('WordsByStatus()- should return amount of words with specific status ', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        let wordRepository = new WordRepositoryService(storage);

        let word1 = new Word(1, "a", "book", "ppp", "verb", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "verb", "glass", 333333);
        let word3 = new Word(3, "c", "dall", "aaa", "verb", "dall", 333333);

        word1.status = OptionsOfStatus.Waiting;
        word2.status = OptionsOfStatus.InProgress;
        word3.status = OptionsOfStatus.Completed;


        let allWords = [word1, word2, word3];
        storage.get.and.returnValue(allWords);

        let result = wordRepository.wordsByStatus(OptionsOfStatus.Completed);

        expect(result).toBe(1);
    });

    it(' wordsByLevel() -should return amount of words with specific level', function () {
        let storage = jasmine.createSpyObj<StorageService>(["get"]);
        let wordRepository = new WordRepositoryService(storage);

        let word1 = new Word(1, "a", "book", "ppp", "verb", "book", 123123);
        let word2 = new Word(2, "b", "glass", "ooo", "verb", "glass", 333333);
        let word3 = new Word(3, "c", "dall", "aaa", "verb", "dall", 333333);

        word1.level = 1;
        word2.level = 2;
        word3.level = 3;

        let allWords = [word1, word2, word3];
        storage.get.and.returnValue(allWords);

        let result = wordRepository.wordsByLevel(2);

        expect(result).toBe(1);
    });
})