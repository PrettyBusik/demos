export class Settings {
    wordsList: number = 10;
    numberOfNewWords: number = 5;
    trainingAutoPronunciation: boolean = true;
    trainingUseHotKeys: boolean = true;

    constructor(wordsList: number,
                numberOfNewWords: number,
                trainingAutoPronunciation: boolean,
                trainingUseHotKeys: boolean,
    ) {
        this.wordsList = wordsList;
        this.numberOfNewWords = numberOfNewWords;
        this.trainingAutoPronunciation = trainingAutoPronunciation;
        this.trainingUseHotKeys = trainingUseHotKeys;
    }
}