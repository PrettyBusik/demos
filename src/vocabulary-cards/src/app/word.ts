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
    createdAt!: number


    constructor(id: number, word: string, transcription: string, pronunciation: string, partOfSpeech: string, translation: string, creationDate: number) {
        this.id = id;
        this.word = word;
        this.transcription = transcription;
        this.pronunciation = pronunciation;
        this.partOfSpeech = partOfSpeech;
        this.translation = translation;
        this.createdAt = creationDate;
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
    level: number | null;
    nextTrainingAt: number | null;
    status: OptionsOfStatus | null;

    constructor(search: string | null = null,
                partOfSpeech: string | null = null,
                level: number | null = null,
                nextTrainingAt: number | null = null,
                status: OptionsOfStatus | null = null
    ) {
        this.search = search;
        this.partOfSpeech = partOfSpeech;
        this.level = level;
        this.nextTrainingAt = nextTrainingAt;
        this.status = status;
    }
}

export enum OptionsOfStatus {
    Waiting = "Waiting",
    InProgress = "In progress",
    Completed = "Completed",
}

export enum TrainingDirection {
    NativeToLearning = "Russ-Eng",
    LearningToNative = "Eng-Russ"
}