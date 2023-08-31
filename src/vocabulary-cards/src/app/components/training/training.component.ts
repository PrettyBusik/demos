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
  currentWord: Word;
  currentDirection: TrainingDirection;
  step: number;

  wordsForTodayTraining: Word[] = []

  constructor(private wordsRepository: WordRepositoryService,
              private audioPlayer: AudioPlayerService) {
    this.wordsForTodayTraining = wordsRepository.getListWordsForTodayTraining(DateHelper.getTimeStampForToday());
    console.log(this.wordsForTodayTraining)
    this.currentWord = this.wordsForTodayTraining[0];
    this.currentDirection = TrainingDirection.NativeToLearning;
    this.step = 2
  }


  private shuffle(words: Word[]) {
    for (let i = words.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    return words
  }

  audio(link: string) {
    this.audioPlayer.play(link)
  }

  protected readonly TrainingDirection = TrainingDirection;
}
