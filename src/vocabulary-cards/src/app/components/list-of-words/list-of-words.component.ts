import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {WordRepositoryService} from "../../services/word-repository.service";
import {Page, WordsFilter} from "../../word";

@Component({
    selector: 'app-list-of-words',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './list-of-words.component.html',
    styleUrls: ['./list-of-words.component.css']
})
export class ListOfWordsComponent {
    queryParamNumberOfPage: Subscription;
    page: number = 1;
    pageSize: number = 10;

    listWords!: Page;

    constructor(private rout: ActivatedRoute,
                private wordRepository: WordRepositoryService) {
        this.queryParamNumberOfPage = rout.queryParams.subscribe(queryParam => {
            if (queryParam["page"] === undefined) {
                this.page = 1;
            } else {
                this.page = Number(queryParam["page"]);
            }
            console.log(queryParam)

            this.listWords = this.wordRepository.getPage(
                this.page,
                this.pageSize,
                new WordsFilter(null, null))
        })
    }


}
