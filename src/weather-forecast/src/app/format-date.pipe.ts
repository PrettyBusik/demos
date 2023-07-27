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


        const today = new Date();
        if (today.getDate() === fullDate.getDate() &&
            today.getFullYear() === fullDate.getFullYear() &&
            today.getMonth() === fullDate.getMonth()) {
            return "Today"
        }

        const tomorrow = new Date()
        tomorrow.setDate(today.getDate() + 1);
        if (tomorrow.getDate() === fullDate.getDate() &&
            tomorrow.getFullYear() === fullDate.getFullYear() &&
            tomorrow.getMonth() === fullDate.getMonth()) {
            return "Tomorrow"
        }

        return date.padStart(2, "0") + "." + month.padStart(2, "0") + "." + year;
    }
}
