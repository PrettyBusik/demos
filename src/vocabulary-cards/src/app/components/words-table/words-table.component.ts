import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Word} from "../../word";
import {WordRepositoryService} from "../../services/word-repository.service";
import {AudioPlayerService} from "../../services/audio-player.service";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-words-table',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './words-table.component.html',
    styleUrls: ['./words-table.component.css']
})
export class WordsTableComponent {
    @Input() words!: Word[];
    @Input() showEditLink: Boolean = true;

    constructor(wordsRepository: WordRepositoryService,
                private audioPlayer: AudioPlayerService,) {
    }


    audio(link: string) {
        this.audioPlayer.play(link)
    }

    showLevel(word: Word): string {
        return "text-warning bi bi-" + word.level + "-circle"
    }

}
