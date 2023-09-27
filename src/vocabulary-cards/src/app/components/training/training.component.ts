import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WordRepositoryService} from "../../services/word-repository.service";
import {DateHelper} from "../../DateHelper";
import {TrainingDirection, Word} from "../../word";
import {AudioPlayerService} from "../../services/audio-player.service";

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent {
  currentWord!: Word;
  currentDirection: TrainingDirection = TrainingDirection.NativeToLearning;
  isChangedDirection:boolean=false;
  step: number = 1;

  wordsForTodayTraining: Word[] = []
  allWords: Word[] = [];

  failedWords: Word[] = [];
  successedWords: number = 0;

  constructor(private wordsRepository: WordRepositoryService,
              private audioPlayer: AudioPlayerService) {
    this.wordsForTodayTraining = wordsRepository.getListWordsForTodayTraining(DateHelper.getTimeStampForToday());
    this.allWords = this.shuffle(this.wordsForTodayTraining)
    this.showNextWord();
  }

  show() {
    this.step = 2
  }

  showNextWord() {
    if (this.allWords.length === 0) {
      if (this.failedWords.length != 0) {
        this.allWords = this.shuffle(this.failedWords);
        this.failedWords = [];
      } else if (this.currentDirection === TrainingDirection.NativeToLearning) {
        this.allWords = this.shuffle(this.wordsForTodayTraining);
        this.currentDirection= TrainingDirection.LearningToNative;
        this.successedWords=0;
      } else {
        return
      }
    }

    this.currentWord = this.allWords.pop()!;
    this.step = 1;
  }

  successedWord() {
    this.successedWords++;
    this.showNextWord();
  }

  failedWord() {
    this.failedWords.push(this.currentWord);
    this.showNextWord();
  }

  private shuffle(words: Word[]) {
    let shuffledWords: Word[] = [...words];
    for (let i = shuffledWords.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
    }
    return shuffledWords
  }

  audio(link: string) {
    this.audioPlayer.play(link)
  }

  protected readonly TrainingDirection = TrainingDirection;
}
