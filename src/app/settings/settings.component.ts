import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModelService } from '../services/model.service';
import { ThemeService } from '../services/theme.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  isDark = false;

  images$ = this.modelService.getImages()
  classifiers$ = this.modelService.getClassifiers()

  modalities = ['CT', 'CR'];
  classifierForm = this.fb.group({
    image: ['', Validators.required],
    modality: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private modelService: ModelService, private themeService: ThemeService) {
    themeService.isDark.subscribe(isDark => {
      this.isDark = isDark
    })
   }

  ngOnInit(): void {
  }

  submitClassifier () {
    let image = this.classifierForm.get('image').value
    let modality = this.classifierForm.get('modality').value
    this.modelService.setClassifier(image, modality).subscribe(r => alert(`Set ${image} as classifier`))
  }

  toggleDark(isDark: MatSlideToggleChange) {
    this.themeService.setDark(isDark.checked);
  }
}
