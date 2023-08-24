import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractControl, FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-rangeinput',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './range-input.component.html',
    styleUrls: ['./range-input.component.css']
})
export class RangeInputComponent {
    @Input() min!: number;
    @Input() max!: number;
    @Input() step: number = 1;
    @Input() controler!: AbstractControl;

    getController(): FormControl {
        return this.controler as FormControl
    }

    increaseValue() {
        this.controler.setValue(this.controler.value + 1);
    }

    decreaseValue() {
        this.controler.setValue(this.controler.value - 1);
    }
}
