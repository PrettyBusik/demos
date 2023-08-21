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
        let half: number = (this.visiblePageNumber - 1) / 2;
        let fromTo: number[] = [];

        if (this.totalPageNumber <= this.visiblePageNumber) {
            fromTo.push(1, this.totalPageNumber)
            return fromTo;
        }

        if (this.currentPage < half) {
            fromTo.push(1, this.visiblePageNumber);
            return fromTo;
        }

        if (this.currentPage > this.totalPageNumber - half) {
            fromTo.push(this.totalPageNumber + 1 - this.visiblePageNumber, this.totalPageNumber)
            return fromTo;
        }

        let beginning = this.currentPage - Math.floor(half);
        let finish = this.currentPage + Math.ceil(half);

        fromTo.push(beginning, finish)
        return fromTo;
    }

}
