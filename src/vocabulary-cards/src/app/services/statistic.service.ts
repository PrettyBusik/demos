import {Injectable} from '@angular/core';
import {WordRepositoryService} from "./word-repository.service";
import {OptionsOfStatus} from "../word";
import {DateHelper} from "../DateHelper";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor( private wordRepository: WordRepositoryService,) { }

  countWordsByStatus():Map<OptionsOfStatus, number>{
      let amountWordsWithStatus = new Map();

      amountWordsWithStatus.set(OptionsOfStatus.Waiting, this.wordRepository.wordsByStatus(OptionsOfStatus.Waiting));
      amountWordsWithStatus.set(OptionsOfStatus.InProgress, this.wordRepository.wordsByStatus(OptionsOfStatus.InProgress));
      amountWordsWithStatus.set(OptionsOfStatus.Completed, this.wordRepository.wordsByStatus(OptionsOfStatus.Completed));

      console.log(amountWordsWithStatus)
      return amountWordsWithStatus;
  }


    countWordsByLevel(): Map<number, number> {
        let amountWordsWithLevel = new Map();

        for (let i = 1; i <= 8; i++) {
            amountWordsWithLevel.set(i, this.wordRepository.wordsByLevel(i));
        }

        console.log(amountWordsWithLevel)
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
}
