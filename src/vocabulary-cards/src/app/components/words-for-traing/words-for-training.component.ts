import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingService} from "../../services/training.service";
import {Word} from "../../word";
import {WordsTableComponent} from "../words-table/words-table.component";
import {WordRepositoryService} from "../../services/word-repository.service";
import {DateHelper} from "../../DateHelper";

@Component({
  selector: 'app-words-for-traing',
  standalone: true,
  imports: [CommonModule, WordsTableComponent],
  templateUrl: './words-for-training.component.html',
  styleUrls: ['./words-for-training.component.css']
})
export class WordsForTrainingComponent {
  wordsForTraining: Word[];

  constructor(private trainingService: TrainingService,
              private wordsRepository: WordRepositoryService) {
    this.wordsForTraining = trainingService.getNextWordsForTraining();
    DateHelper.getNextDate(1693220929, 1)
    this.wordsRepository.getListWordsForTodayTraining(1693321626902000)
  }

  startTraining() {
    this.trainingService.startLearning(this.wordsForTraining);
  }

  learn() {

  }


}
