import {Routes} from '@angular/router';
import {WordFormComponent} from "./components/word-form/word-form.component";
import {ListOfWordsComponent} from "./components/list-of-words/list-of-words.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {WordsForTrainingComponent} from "./components/words-for-traing/words-for-training.component";
import {TrainingComponent} from "./components/training/training.component";

export const routes: Routes = [
    {path: "words/new", component: WordFormComponent},
    {path: "words/:id", component: WordFormComponent},
    {path: "words", component: ListOfWordsComponent},
    {path: "settings", component: SettingsComponent},
    {path: "learn-new", component: WordsForTrainingComponent},
    {path: "training", component: TrainingComponent}
];
