import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RangeInputComponent} from "../rangeinput/range-input.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SettingsRepositoryService} from "../../services/settings-repository.service";
import {Settings} from "../../Settings";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RangeInputComponent, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
formGroup:FormGroup= new FormGroup<any>({
  "pageSize": new FormControl(""),
  "autoPronunciation":new FormControl(""),
  "numberOfNewWords":new FormControl(""),
  "useHotKeys":new FormControl(""),
})

  constructor(private settingsRepository:SettingsRepositoryService) {
      let settingsFromStorage = settingsRepository.get();
      this.formGroup.get("pageSize")!.setValue(settingsFromStorage.wordsList);
      this.formGroup.get("autoPronunciation")!.setValue(settingsFromStorage.trainingAutoPronunciation);
      this.formGroup.get("numberOfNewWords")!.setValue(settingsFromStorage.numberOfNewWords);
      this.formGroup.get("useHotKeys")!.setValue(settingsFromStorage.trainingUseHotKeys);
  }


  save(){
  this.settingsRepository.set(new Settings(
      this.formGroup.get('pageSize')!.value,
      this.formGroup.get('numberOfNewWords')!.value,
      this.formGroup.get('autoPronunciation')!.value,
      this.formGroup.get('useHotKeys')!.value,
  ));
  }
}
