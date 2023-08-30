import {Injectable} from '@angular/core';
import {WordRepositoryService} from "./word-repository.service";
import {SettingsRepositoryService} from "./settings-repository.service";
import {OptionsOfStatus, Word} from "../word";
import {DateHelper} from "../DateHelper";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  levelAmountDays= new Map([
      [1,1],
      [2,2],
      [3,4],
      [4,9],
      [5,16],
      [6,35],
      [7,64]
  ])

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

  failWord(word:Word){
    word.level=1;
    word.nextTrainingAt = DateHelper.getTimeStampForToday();
    word.lastTrainingAt = DateHelper.getTimeStampForToday();
    this.wordsRepository.updateWord(word)
  }

  successfulWord(word:Word){
    if (word.level===8){
      word.nextTrainingAt=null;
      word.level=null;
      word.status = OptionsOfStatus.Completed;
      word.lastTrainingAt = DateHelper.getTimeStampForToday();

      this.wordsRepository.updateWord(word);
      return
    }

    word.nextTrainingAt = DateHelper.getNextDate(DateHelper.getTimeStampForToday(), this.levelAmountDays.get(word.level!)!);
    word.lastTrainingAt = DateHelper.getTimeStampForToday();
    word.level!++;
    this.wordsRepository.updateWord(word)
  }

}
