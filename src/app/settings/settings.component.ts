import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  images$ = this.modelService.getImages()
  classifiers$ = this.modelService.getClassifiers()

  modalities = ['CT', 'CR'];
  classifierForm = this.fb.group({
    image: ['', Validators.required],
    modality: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private modelService: ModelService) { }

  ngOnInit(): void {
  }

  submitClassifier () {
    let image = this.classifierForm.get('image').value
    let modality = this.classifierForm.get('modality').value
    this.modelService.setClassifier(image, modality).subscribe(r => alert(`Set ${image} as classifier`))
  }
}
