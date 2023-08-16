import {Routes} from '@angular/router';
import {WordFormComponent} from "./components/word-form/word-form.component";

export const routes: Routes = [
    {path: "words/new", component: WordFormComponent},
    {path: "words/:id", component: WordFormComponent}
];
