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
  classifier$ = this.modelService.getClassifier()

  classifierForm = this.fb.group({
    image: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private modelService: ModelService) { }

  ngOnInit(): void {
  }

  submitClassifier () {
    let image = this.classifierForm.get('image').value
    this.modelService.setClassifier(image).subscribe(r => alert(`Set ${image} as classifier`))
  }
}
