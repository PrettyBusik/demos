export class Word {
    id: number;
    word: string;
    transcription: string;
    pronunciation: string;
    partOfSpeech: string
    translation: string;


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