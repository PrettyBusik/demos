import {Injectable} from '@angular/core';
import {WordRepositoryService} from "./word-repository.service";
import {OptionsOfStatus} from "../word";

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


  countWordsByLevel():Map<number, number>{
      let amountWordsWithLevel = new Map();

      amountWordsWithLevel.set(1, this.wordRepository.wordsByLevel(1));
      amountWordsWithLevel.set(2, this.wordRepository.wordsByLevel(2));
      amountWordsWithLevel.set(3, this.wordRepository.wordsByLevel(3));
      amountWordsWithLevel.set(4, this.wordRepository.wordsByLevel(4));
      amountWordsWithLevel.set(5, this.wordRepository.wordsByLevel(5));
      amountWordsWithLevel.set(6, this.wordRepository.wordsByLevel(6));
      amountWordsWithLevel.set(7, this.wordRepository.wordsByLevel(7));
      amountWordsWithLevel.set(8, this.wordRepository.wordsByLevel(8));

      console.log(amountWordsWithLevel)
      return amountWordsWithLevel
  }

    // countWordsByNextTrainDate(): Map<number, number>{
    //   let amountWordsWithNextTrainDate= new Map();
    // }
}
