import {Injectable} from '@angular/core';
import {WordRepositoryService} from "./word-repository.service";
import {OptionsOfStatus} from "../word";
import {DateHelper} from "../DateHelper";
import {HistoryService} from "./history.service";

@Injectable({
    providedIn: 'root'
})
export class StatisticService {

    constructor(private wordRepository: WordRepositoryService,
                private history: HistoryService) {
    }

    countWordsByStatus(): Map<OptionsOfStatus, number> {
        let amountWordsWithStatus = new Map();

        amountWordsWithStatus.set(OptionsOfStatus.Waiting, this.wordRepository.wordsByStatus(OptionsOfStatus.Waiting));
        amountWordsWithStatus.set(OptionsOfStatus.InProgress, this.wordRepository.wordsByStatus(OptionsOfStatus.InProgress));
        amountWordsWithStatus.set(OptionsOfStatus.Completed, this.wordRepository.wordsByStatus(OptionsOfStatus.Completed));

        return amountWordsWithStatus;
    }


    countWordsByLevel(): Map<number, number> {
        let amountWordsWithLevel = new Map();

        for (let i = 1; i <= 8; i++) {
            amountWordsWithLevel.set(i, this.wordRepository.wordsByLevel(i));
        }

        return amountWordsWithLevel
    }

    countWordsByNextTrainDate(amountDays: number): Map<number, number> {
        let amountWordsWithNextTrainDate = new Map<number, number>();
        let today = DateHelper.getTimeStampForToday();

        for (let i = 0; i < amountDays; i++) {
            let nextDay = DateHelper.getNextDate(today, i);
            amountWordsWithNextTrainDate.set(nextDay, this.wordRepository.countWordsForNextTrainingDate(nextDay));
        }
        return amountWordsWithNextTrainDate;
    }

    areTrainedWordsForDates(amountDays: number): Map<number, boolean> {
        let areTrainedWordsForDates = new Map<number, boolean>();
        let today = DateHelper.getTimeStampForToday();
        let datesWithTraining: Set<number> | [] = this.history.getDatesWithTraining();

        for (let i = 0; i < amountDays; i++) {
            let nextDay = DateHelper.getNextDate(today, -i);
            if (datesWithTraining.has(nextDay)) {
                areTrainedWordsForDates.set(nextDay, true);
            } else {
                areTrainedWordsForDates.set(nextDay, false);
            }
        }
        return areTrainedWordsForDates;
    }

    areNewWordsBeenStarted(amountDays:number):Map<number,boolean>{
        let areNewWordsBeenStarted= new Map<number, boolean>();

        let today = DateHelper.getTimeStampForToday();
        let datesWithNewWords: Set<number> | [] = this.history.getDatesWithNweWords();

        for (let i = 0; i < amountDays; i++) {
            let nextDay = DateHelper.getNextDate(today, -i);
            if (datesWithNewWords.has(nextDay)) {
                areNewWordsBeenStarted.set(nextDay, true);
            } else {
                areNewWordsBeenStarted.set(nextDay, false);
            }
        }
        return areNewWordsBeenStarted;
    }
}
