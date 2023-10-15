import {Injectable} from '@angular/core';
import {StorageService} from "./storage.service";

@Injectable({
    providedIn: 'root'
})
export class HistoryService {
    constructor(private storage: StorageService) {
    }

    addDateWithTraining(timestamp: number) {
        let learned: Set<number> = this.getDatesWithTraining();
        learned.add(timestamp);
        this.storage.set<number[]>("learned", Array.from(learned));
    }

    getDatesWithTraining(): Set<number> {
        let learned: number[] | null = this.storage.get<number[]>("learned")
        console.log("learned=" + learned);
        return new Set(learned === null ? [] : learned);
    }

    addDatesWithNewWords(timestamp: number) {
        let startLearning: Set<number> = this.getDatesWithNweWords();
        startLearning.add(timestamp);
        this.storage.set<number[]>("startLearning", Array.from(startLearning))
    }

    getDatesWithNweWords(): Set<number> {
        let startLearning: number[] | null = this.storage.get<number[]>("startLearning");
        return new Set(startLearning === null ? [] : startLearning);
    }

}
