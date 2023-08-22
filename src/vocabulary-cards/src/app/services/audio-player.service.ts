import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AudioPlayerService {

    audioPlayer = new Audio();

    play(link: string) {
        this.audioPlayer.src = link;
        this.audioPlayer.play();
    }

    constructor() {
    }


}
