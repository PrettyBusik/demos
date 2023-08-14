import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {WordRepositoryService} from "../../services/word-repository.service";
import {Word} from "../../word";

@Component({
    selector: 'app-word-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './word-form.component.html',
    styleUrls: ['./word-form.component.css']
})
export class WordFormComponent {

    constructor(private wordsRepository: WordRepositoryService) {
    }

    createWordForm: FormGroup = new FormGroup<any>({
        "wordForm": new FormControl<any>("", Validators.required),
        "transcriptionForm": new FormControl<any>("", Validators.required),
        "pronunciationForm": new FormControl<any>("", Validators.required),
        "partOfSpeechForm": new FormControl<any>("", Validators.required),
        "translationForm": new FormControl<any>("", Validators.required)
    });

    onsubmit() {
        let newWord = new Word(
            this.wordsRepository.getNextId(),
            this.createWordForm.get('wordForm')!.value,
            this.createWordForm.get('transcriptionForm')!.value,
            this.createWordForm.get('pronunciationForm')!.value,
            this.createWordForm.get('partOfSpeechForm')!.value,
            this.createWordForm.get('translationForm')!.value)

        this.wordsRepository.addWord(newWord);
        console.log(this.wordsRepository.getAllWords())
    }

}
