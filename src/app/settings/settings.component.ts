import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModelService } from '../services/model.service';
import { ThemeService, THEMES_VALUES, THEMES } from '../services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  currentTheme: THEMES;
  themes: string[] = Object.values(THEMES);
  themeControl = new FormControl('')

  images$ = this.modelService.getImages()
  classifiers$ = this.modelService.getClassifiers()

  modalities = ['CT', 'CR'];
  classifierForm = this.fb.group({
    image: ['', Validators.required],
    modality: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private modelService: ModelService, private themeService: ThemeService) {
    this.setupTheme()
   }

  ngOnInit(): void {
  }

  setupTheme() {
    this.themeService.theme.subscribe(theme => {
      this.currentTheme = theme
    })
    this.themeControl.valueChanges.subscribe(value => this.themeService.setTheme(value))
  }

  submitClassifier () {
    let image = this.classifierForm.get('image').value
    let modality = this.classifierForm.get('modality').value
    this.modelService.setClassifier(image, modality).subscribe(r => alert(`Set ${image} as classifier`))
  }
}
