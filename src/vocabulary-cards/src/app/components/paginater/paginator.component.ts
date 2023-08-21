import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-paginater',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
    @Input() currentPage!: number;
    @Input() totalPageNumber!: number;
    visiblePageNumber: number = 10;

    getNumbersPages(): number[] {
        let fromTo = this.countPages();

        console.log(fromTo)
        let allPages: number[] = [];
        for (let i = fromTo[0]; i <= fromTo[1]; i++) {
            allPages.push(i);
        }
        return allPages;
    }

    countPages(): number[] {
        let half = (this.visiblePageNumber - 1) / 2;

        let beginning = this.currentPage - Math.floor(half);
        let finish = this.currentPage + Math.ceil(half);
        let fromTo: number[] = [];


        if (beginning < 1) {
            beginning = 1;
            finish = beginning + this.visiblePageNumber -1;
        }
        if (finish > this.totalPageNumber) {
            finish = this.totalPageNumber;
            beginning = finish - this.visiblePageNumber+1;
            if(beginning<1){
                beginning=1;
            }
        }

        console.log(beginning, finish, this.currentPage, this.visiblePageNumber)
        fromTo.push(beginning, finish)
        return fromTo

    }

}
