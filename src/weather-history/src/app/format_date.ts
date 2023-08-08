import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'formatDate',
    standalone: true
})
export class FormatDatePipe implements PipeTransform {
    transform(timestamp: number): string {
        let fullDate = new Date(1000 * timestamp);

        let year = fullDate.getFullYear().toString()
        let month = (fullDate.getMonth() + 1).toString()
        let date = fullDate.getDate().toString()


        return date.padStart(2, "0") + "." + month.padStart(2, "0") ;
    }
}
