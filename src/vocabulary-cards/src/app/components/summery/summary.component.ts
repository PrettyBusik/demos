import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatisticService} from "../../services/statistic.service";
import {RouterLink} from "@angular/router";
import {DateHelper} from "../../DateHelper";
import {OptionsOfStatus} from "../../word";

@Component({
    selector: 'app-summery',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
    amountWordsWithLevel: Map<number, number>;
    amountWordsWithStatus: Map<OptionsOfStatus, number>;
    closestTraining: Map<number, number>;
    haveWordsBeenPractised: Map<number, boolean>;
    haveNewWordsBeenPractised: Map<number, boolean>;


    constructor(private statistic: StatisticService) {
        this.amountWordsWithLevel = statistic.countWordsByLevel();

        this.amountWordsWithStatus = statistic.countWordsByStatus();

        this.closestTraining = statistic.countWordsByNextTrainDate(5);

        this.haveWordsBeenPractised = statistic.areTrainedWordsForDates(7);

        this.haveNewWordsBeenPractised = statistic.areNewWordsBeenStarted(7);
    }

    getDatesWithPractice(): number[] {
        return Array
            .from(this.haveWordsBeenPractised.keys())
            .sort()
            .reverse();
    }

    getDatesWithNewPracticedWords(): number[] {
        return Array
            .from(this.haveNewWordsBeenPractised.keys())
            .sort()
            .reverse();
    }


    protected readonly DateHelper = DateHelper;
}
