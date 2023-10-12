import {Injectable} from '@angular/core';
import {StorageService} from "./storage.service";

@Injectable({
    providedIn: 'root'
})
export class HistoryService {
    constructor(private storage: StorageService) {
    }

    addDateWithTraining(timestamp: number) {
        let learned: Set<number> | null = this.storage.get<Set<number>>("learned");
        learned?.add(timestamp);
        this.storage.set<Set<number>>("learned", learned!);
    }

    getDatesWithTraining(): Set<number> {
        let learned: Set<number> | null = this.storage.get<Set<number>>("learned")
        return learned != null ? learned : new Set<number>();
    }

    addDatesWithNewWords(timestamp: number) {
        let startLearning: Set<number> | null = this.storage.get<Set<number>>("startLearning");
        startLearning?.add(timestamp);
        this.storage.set<Set<number>>("startLearning", startLearning!)
    }

    getDatesWithNweWords(): Set<number> {
        let startLearning: Set<number> | null  = this.storage.get<Set<number>>("startLearning");
        return startLearning!= null? startLearning: new Set<number>();
    }
}
