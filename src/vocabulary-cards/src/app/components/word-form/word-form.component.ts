import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {WordRepositoryService} from "../../services/word-repository.service";
import {Word} from "../../word";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-word-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './word-form.component.html',
    styleUrls: ['./word-form.component.css']
})
export class WordFormComponent {
    createWordForm!: FormGroup;
    currentWord: Word | null = null;

    constructor(private wordsRepository: WordRepositoryService,
                private activateRouted: ActivatedRoute) {
        activateRouted.params.subscribe(params => {
            console.log(params)
            if (params["id"] != null) {
                this.currentWord = this.wordsRepository.getWordByID(Number(params["id"]));
                console.log(this.currentWord)
            }
            this.initForm();
        })
        this.showPage()
    }


    initForm() {
        if (this.currentWord === null) {
            this.createWordForm = new FormGroup<any>({
                "wordForm": new FormControl<any>("", Validators.required),
                "transcriptionForm": new FormControl<any>("", Validators.required),
                "pronunciationForm": new FormControl<any>("", Validators.required),
                "partOfSpeechForm": new FormControl<any>("", Validators.required),
                "translationForm": new FormControl<any>("", Validators.required)
            })
        } else {
            this.createWordForm = new FormGroup<any>({
                "wordForm": new FormControl<any>(this.currentWord.word, Validators.required),
                "transcriptionForm": new FormControl<any>(this.currentWord.transcription, Validators.required),
                "pronunciationForm": new FormControl<any>(this.currentWord.pronunciation, Validators.required),
                "partOfSpeechForm": new FormControl<any>(this.currentWord.partOfSpeech, Validators.required),
                "translationForm": new FormControl<any>(this.currentWord.translation, Validators.required)
            })
        }

    }

    onsubmit() {
        let newWord = new Word(
            this.currentWord !== null ? this.currentWord.id : this.wordsRepository.getNextId(),
            this.createWordForm.get('wordForm')!.value,
            this.createWordForm.get('transcriptionForm')!.value,
            this.createWordForm.get('pronunciationForm')!.value,
            this.createWordForm.get('partOfSpeechForm')!.value,
            this.createWordForm.get('translationForm')!.value
        )

        if (this.currentWord === null) {
            this.wordsRepository.addWord(newWord);
            console.log(this.wordsRepository.getAllWords())
        } else {
            this.wordsRepository.updateWord(newWord);
        }
        this.createWordForm.reset()
    }

    showPage() {
        console.log(this.wordsRepository.getPage(1, 3))
    }

}
