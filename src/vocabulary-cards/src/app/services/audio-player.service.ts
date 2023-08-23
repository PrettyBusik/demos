import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AudioPlayerService {

    audioPlayer = new Audio();

    play(link: string) {
        this.audioPlayer.src = link;
        this.getVolume();
        this.audioPlayer.play();

        console.log(this.audioPlayer.volume)
    }

    setVolume(value: number) {
        window.localStorage.setItem('volume', value.toString());
    }

    getVolume(): number {
        let volume = window.localStorage.getItem('volume');
        if (volume === null) {
            return 0.7
        }
        return Number(volume)
    }

}
