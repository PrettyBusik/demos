export class Word {
    id: number;
    word: string;
    transcription: string;
    pronunciation: string;
    partOfSpeech: string
    translation: string;

    status: OptionsOfStatus = OptionsOfStatus.Waiting;
    level: number | null = null;
    nextTrainingAt: number | null = null;
    lastTrainingAt: number | null = null;


    constructor(id: number, word: string, transcription: string, pronunciation: string, partOfSpeech: string, translation: string) {
        this.id = id;
        this.word = word;
        this.transcription = transcription;
        this.pronunciation = pronunciation;
        this.partOfSpeech = partOfSpeech;
        this.translation = translation;
    }
}

export class Page {
    words: Word[];
    totalPages: number;


    constructor(words: Word[], totalPages: number) {
        this.words = words;
        this.totalPages = totalPages;
    }
}


export class WordsFilter {
    search: string | null;
    partOfSpeech: string | null;


    constructor(search: string | null, partOfSpeech: string | null,
    ) {
        this.search = search;
        this.partOfSpeech = partOfSpeech;
    }


}

export enum OptionsOfStatus {
    Waiting = "waiting",
    InProgress = "inProgress",
    Completed = "completed",
}