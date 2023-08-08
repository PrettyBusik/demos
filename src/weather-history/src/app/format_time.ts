import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'formatTime',
    standalone: true
})
export class FormatTimePipe implements PipeTransform {

    transform(timestamp: number): string {
        let fullDate = new Date(1000 * timestamp);

        let hours = fullDate.getHours().toString()
        return hours.padStart(2, "0") + ":" + "00"
    }

}
