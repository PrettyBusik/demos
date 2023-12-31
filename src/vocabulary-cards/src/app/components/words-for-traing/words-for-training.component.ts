import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrainingService} from "../../services/training.service";
import {Word} from "../../word";
import {WordsTableComponent} from "../words-table/words-table.component";
import {WordRepositoryService} from "../../services/word-repository.service";
import {Router} from "@angular/router";

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
              private wordsRepository: WordRepositoryService,
              private router: Router) {
    this.wordsForTraining = trainingService.getNextWordsForTraining();
  }

  startTraining() {
    this.trainingService.startLearning(this.wordsForTraining);
    this.router.navigate(["training"]);
  }


}
