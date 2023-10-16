import {Component, HostListener, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WordRepositoryService} from "../../services/word-repository.service";
import {DateHelper} from "../../DateHelper";
import {TrainingDirection, Word} from "../../word";
import {AudioPlayerService} from "../../services/audio-player.service";
import {Settings} from "../../Settings";
import {SettingsRepositoryService} from "../../services/settings-repository.service";
import {RouterLink} from "@angular/router";
import {TrainingService} from "../../services/training.service";

@Component({
    selector: 'app-training',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
    currentWord!: Word;
    currentDirection: TrainingDirection = TrainingDirection.NativeToLearning;
    step: number = 1;

    wordsForTodayTraining: Word[] = []
    allWords: Word[] = [];

    failedWords: Word[] = [];
    successedWords: number = 0;
    settings!: Settings;

    constructor(private wordsRepository: WordRepositoryService,
                private audioPlayer: AudioPlayerService,
                private settingsRepository: SettingsRepositoryService,
                private trainingService: TrainingService) {
    }

    ngOnInit() {
        this.wordsForTodayTraining = this.wordsRepository.getListWordsForTodayTraining(DateHelper.getTimeStampForToday());


        this.allWords = this.shuffle(this.wordsForTodayTraining);
        this.settings = this.settingsRepository.get();
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
      this.trainingService.successfulWord(this.currentWord);
      this.showNextWord();
  }

  failedWord() {
      this.failedWords.push(this.currentWord);
      this.trainingService.failWord(this.currentWord);
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

  @HostListener("window:keydown.control.ArrowLeft", ["$event"])
  controlLeft(event:KeyboardEvent){
    if (this.settings.trainingUseHotKeys){
      this.successedWord();
    }
  }

  @HostListener("window:keydown.control.ArrowRight", ["$event"])
  controlRight(event:KeyboardEvent){
    if (this.settings.trainingUseHotKeys){
      this.failedWord();
    }
  }

  @HostListener("window:keydown.enter", ["$event"])
  enter(event:KeyboardEvent){
    if (this.settings.trainingUseHotKeys){
      this.show();
    }
  }

  @HostListener("window:keydown.ArrowUp", ["$event"])
  up(event:KeyboardEvent){
    if (this.settings.trainingUseHotKeys){
      this.audio(this.currentWord.pronunciation);
    }
  }

  protected readonly TrainingDirection = TrainingDirection;
}
