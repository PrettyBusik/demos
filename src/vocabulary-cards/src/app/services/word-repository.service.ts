import {Injectable} from '@angular/core';
import {Page, Word, WordsFilter} from "../word";

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
        //
        // console.log(allWordsArray)
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
            if (filters.partOfSpeech != null && word.partOfSpeech != filters.partOfSpeech) {
                return false
            }

            if (filters.search != null && !word.word.includes(filters.search)) {
                return false
            }
            return true;
        })
    }
}

