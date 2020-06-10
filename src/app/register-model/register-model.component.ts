import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JobService } from '../job.service';

@Component({
  selector: 'app-register-model',
  templateUrl: './register-model.component.html',
  styleUrls: ['./register-model.component.scss']
})
export class RegisterModelComponent implements OnInit {
  images$ = this.jobService.getImages()

  inputs = [
    'dicom',
    'png'
  ]

  outputs = [
    'Class_Probabilities',
    'Mask'
  ]

  modelForm = this.fb.group({
    image: ['', Validators.required],
    input: ['', Validators.required],
    output: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private jobService: JobService) { }

  ngOnInit(): void {
  }

  submit() {
    this.jobService.registerModel(this.modelForm.get('image').value,
                                  this.modelForm.get('input').value,
                                  this.modelForm.get('output').value).subscribe(r => alert('registerd model'))
  }

}
