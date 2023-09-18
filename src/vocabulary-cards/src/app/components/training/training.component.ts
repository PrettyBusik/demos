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
  currentDirection: TrainingDirection=TrainingDirection.NativeToLearning;
  step: number=1;

  wordsForTodayTraining: Word[] = []

  constructor(private wordsRepository: WordRepositoryService,
              private audioPlayer: AudioPlayerService) {
    this.wordsForTodayTraining = wordsRepository.getListWordsForTodayTraining(DateHelper.getTimeStampForToday());
  }


  private shuffle(words: Word[]) {
    let shuffledWords:Word[]= [...words];
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
