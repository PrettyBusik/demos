import {Routes} from '@angular/router';
import {WordFormComponent} from "./components/word-form/word-form.component";
import {ListOfWordsComponent} from "./components/list-of-words/list-of-words.component";
import {SettingsComponent} from "./components/settings/settings.component";

export const routes: Routes = [
    {path: "words/new", component: WordFormComponent},
    {path: "words/:id", component: WordFormComponent},
    {path: "words", component: ListOfWordsComponent},
    {path: "settings", component: SettingsComponent},
];
