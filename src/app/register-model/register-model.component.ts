import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-register-model',
  templateUrl: './register-model.component.html',
  styleUrls: ['./register-model.component.scss']
})
export class RegisterModelComponent implements OnInit {
  images$ = this.modelService.getImages()

  inputs = ["Abd_Xray", "Frontal_CXR", "Lateral_CXR", "MSK_Xray", "DICOM", "CT"]

  outputs = [
    'Class_Probabilities',
    'Mask',
    'Study_Type'
  ]

  inputTypes = ['DICOM', 'PNG']
  modalities = ['CT', 'CR']

  modelForm = this.fb.group({
    image: ['', Validators.required],
    input: ['', Validators.required],
    inputType: ['', Validators.required],
    output: ['', Validators.required],
    modality: ['', Validators.required],
    imageOutput: [false, Validators.required],
  })


  constructor(private fb: FormBuilder, private modelService: ModelService) { }

  ngOnInit(): void {
  }

  submit() {
    this.modelService.registerModel(this.modelForm.get('image').value,
                                  this.modelForm.get('input').value,
                                  this.modelForm.get('output').value,
                                  this.modelForm.get('imageOutput').value,
                                  this.modelForm.get('modality').value).subscribe(r => alert('registerd model'))
  }

}
