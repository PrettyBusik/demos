import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "roundUp",
    standalone: true
})

export class RoundUpPipe implements PipeTransform {
    transform(value: number): number {
        return Math.round(value);
    }
}