import {Injectable} from '@angular/core';
import {OptionsOfStatus, Page, Word, WordsFilter} from "../word";
import {DateHelper} from "../DateHelper";


@Injectable({
    providedIn: 'root'
})
export class WordRepositoryService {

    private getAllWords(): Word[] {
        let allWords = window.localStorage.getItem("words");
        if (allWords === null) {
            return []
        }

        let allWordsArray: Word[] = JSON.parse(allWords);
        allWordsArray = allWordsArray.sort((a: Word, b: Word): number => {
            if (a.word.toLowerCase() < b.word.toLowerCase()) {
                return -1;
            }
            if (a.word.toLowerCase() > b.word.toLowerCase()) {
                return 1;
            }
            return 0;
        });
        return allWordsArray;

    }

    addWord(word: Word) {
        let allWords = this.getAllWords();

        allWords.push(word);

        window.localStorage.setItem("words", JSON.stringify(allWords))

    }

    updateWord(word: Word) {
        let allWords = this.getAllWords();
        for (let i = 0; i < allWords.length; i++) {
            if (word.id === allWords[i].id) {
                allWords.splice(i, 1, word)
            }
        }
        window.localStorage.setItem("words", JSON.stringify(allWords))
    }


    getNextId(): number {
        let lastId = window.localStorage.getItem("lastId");
        if (lastId === null) {
            window.localStorage.setItem("lastId", "1")
            return 1
        }
        let numberID = Number(lastId);
        numberID++;
        window.localStorage.setItem("lastId", numberID.toString());
        return numberID;
    }

    getWordByID(id: number): Word | null {
        let allWords = this.getAllWords();
        for (let word of allWords) {
            if (word.id === id) {
                return word
            }
        }
        return null;
    }

    getPage(numberPage: number, size: number, filters: WordsFilter): Page {
        let allWords: Word[] = this.getAllWords();
        let filteredWords = this.filter(allWords, filters);
        return this.paginate(filteredWords, numberPage, size);

    }

    remove(word: Word) {
        let allWords = this.getAllWords();
        for (let i = 0; i < allWords.length; i++) {
            if (allWords[i].id === word.id) {
                allWords.splice(i, 1)
            }
        }
        window.localStorage.setItem("words", JSON.stringify(allWords));
    }

    getNextWaitingWords(amount: number): Word[] {
        let allWords = this.getAllWords();
        let wordsForTraining: Word[] = [];

        let index = amount;

        for (let word of allWords) {
            if (word.status == OptionsOfStatus.Waiting && index > 0) {
                wordsForTraining.push(word);
                index--;
                if (index === 0) {
                    return wordsForTraining;
                }
            }
        }
        return wordsForTraining;
    }

    getListWordsForTodayTraining(todayTimestamp: number): Word[] {
        let allWords = this.getAllWords();
        let wordsForTodayTraining: Word[] = [];

        for (let word of allWords) {
            if (word.status === OptionsOfStatus.InProgress &&
                word.nextTrainingAt != null &&
                DateHelper.isDateLessOrEqual(word.nextTrainingAt, todayTimestamp)) {
                wordsForTodayTraining.push(word)
            }
        }
        return wordsForTodayTraining;
    }

    private paginate(allWords: Word[], numberPage: number, size: number): Page {
        let wordsForShowing: Word[] = []
        let totalAmountPages: number = Math.ceil(allWords.length / size);

        let finish: number = (numberPage * size) - 1;
        let beginning: number = (finish - size) + 1;


        if (finish > allWords.length - 1) {
            finish = allWords.length - 1;
        }

        for (let i = beginning; i <= finish; i++) {
            wordsForShowing.push(allWords[i]);
        }

        return new Page(wordsForShowing, totalAmountPages);
    }

    private filter(allWords: Word[], filters: WordsFilter): Word[] {
        return allWords.filter((word: Word) => {
            if (filters.partOfSpeech != null && word.partOfSpeech.toUpperCase() != filters.partOfSpeech.toUpperCase()) {
                return false
            }

            if (filters.search != null && !word.word.includes(filters.search)) {
                return false
            }

            if ((filters.level != null && word.level != filters.level)) {
                return false;
            }

            if (filters.nextTrainingAt != null && word.nextTrainingAt != filters.nextTrainingAt) {
                return false;
            }

            if (filters.status != null && word.status != filters.status) {
                return false;
            }

            return true;
        })
    }
}

