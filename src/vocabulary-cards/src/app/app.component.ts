import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {WordFormComponent} from "./components/word-form/word-form.component";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, WordFormComponent, ReactiveFormsModule, RouterLink],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})


export class AppComponent {
    title = 'vocabulary-cards';


}
