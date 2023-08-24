import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {WordRepositoryService} from "../../services/word-repository.service";
import {Word} from "../../word";
import {ActivatedRoute, Router} from "@angular/router";
import {RangeInputComponent} from "../rangeinput/range-input.component";

@Component({
    selector: 'app-word-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RangeInputComponent],
    templateUrl: './word-form.component.html',
    styleUrls: ['./word-form.component.css']
})
export class WordFormComponent {
    createWordForm!: FormGroup;
    currentWord: Word | null = null;
    isRemove: boolean = true;

    constructor(private wordsRepository: WordRepositoryService,
                private activateRouted: ActivatedRoute,
                private router: Router) {
        activateRouted.params.subscribe(params => {
            if (params["id"] != null) {
                this.currentWord = this.wordsRepository.getWordByID(Number(params["id"]));
            } else {
                this.currentWord = null;
            }
            this.initForm();
        })
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
            this.router.navigate(["words"]);
        } else {
            this.wordsRepository.updateWord(newWord);
        }
        this.createWordForm.reset()
    }

    remove() {
        let answer = confirm("Are you sure?");
        if (answer) {
            this.wordsRepository.remove(this.currentWord!);
            this.router.navigate(["words"]);
        }
    }

    myformControl: FormControl = new FormControl<any>(3)

}
