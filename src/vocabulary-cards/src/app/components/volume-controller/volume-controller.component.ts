import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AudioPlayerService} from "../../services/audio-player.service";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-volume-controller',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './volume-controller.component.html',
    styleUrls: ['./volume-controller.component.css']
})
export class VolumeControllerComponent {
    volume: number = 0;

    constructor(private audioPlayer: AudioPlayerService) {
        this.volume = audioPlayer.getVolume();
    }

    changeVolume() {
        this.audioPlayer.setVolume(this.volume);
    }

    setIcon(): string {
        if (this.volume === 0) {
            return "bi bi-volume-mute-fill "
        }
        if (this.volume >= 0.01 && this.volume <= 0.33) {
            return "bi bi-volume-off-fill "
        }
        if (this.volume >= 0.34 && this.volume <= 0.66) {
            return "bi bi-volume-down-fill "
        }
        if (this.volume >= 0.67 && this.volume <= 1) {
            return "bi bi-volume-up-fill "
        }
        return ""
    }

}
