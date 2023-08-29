import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {WordRepositoryService} from "../../services/word-repository.service";
import {Page, Word, WordsFilter} from "../../word";
import {PaginatorComponent} from "../paginater/paginator.component";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {SettingsRepositoryService} from "../../services/settings-repository.service";
import {WordsTableComponent} from "../words-table/words-table.component";

@Component({
    selector: 'app-list-of-words',
    standalone: true,
    imports: [CommonModule, RouterLink, PaginatorComponent, ReactiveFormsModule, WordsTableComponent],
    templateUrl: './list-of-words.component.html',
    styleUrls: ['./list-of-words.component.css']
})
export class ListOfWordsComponent {
    queryParamNumberOfPage: Subscription;
    page: number = 1;
    pageSize!: number;

    listWords!: Page;

    searchForm: FormControl = new FormControl<any>("", Validators.required);
    wordForSearching: Word | null = null;

    constructor(private router: ActivatedRoute,
                private rout: Router,
                private wordRepository: WordRepositoryService,
                private settingsRepository: SettingsRepositoryService) {
        this.queryParamNumberOfPage = router.queryParams.subscribe(
            queryParam => {
                if (queryParam["page"] === undefined) {
                    this.page = 1;
                } else {
                    this.page = Number(queryParam["page"]);
                }

                this.pageSize = settingsRepository.get().wordsList;

                this.listWords = this.wordRepository.getPage(
                    this.page,
                    this.pageSize,
                    new WordsFilter(queryParam['search'] === undefined ? null : queryParam['search'], null))  // edit
            })
    }

    search() {
        if (this.searchForm.value != "") {
            this.wordForSearching = this.searchForm.value;

            this.searchForm.reset();

            let newURL = this.rout.navigate(
                ['words'],
                {queryParams: {search: this.wordForSearching}}
            )
        }
    }

}
