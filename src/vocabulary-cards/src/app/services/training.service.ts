import {Injectable} from '@angular/core';
import {WordRepositoryService} from "./word-repository.service";
import {SettingsRepositoryService} from "./settings-repository.service";
import {OptionsOfStatus, Word} from "../word";
import {DateHelper} from "../DateHelper";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private wordsRepository: WordRepositoryService,
              private settingsRepository: SettingsRepositoryService) {
  }

  getNextWordsForTraining(): Word[] {
    let amountWords: number = this.settingsRepository.get().numberOfNewWords;

    return this.wordsRepository.getNextWaitingWords(amountWords)
  }

  startLearning(words: Word[]) {
    for (let word of words) {
      word.status = OptionsOfStatus.InProgress;
      word.level = 1;
      word.nextTrainingAt = DateHelper.getTimeStampForToday();
      this.wordsRepository.updateWord(word);
    }
  }

}
