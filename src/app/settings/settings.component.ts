import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JobService } from '../job.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  images$ = this.jobService.getImages()
  classifier$ = this.jobService.getClassifier()

  classifierForm = this.fb.group({
    image: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private jobService: JobService) { }

  ngOnInit(): void {
  }

  submitClassifier () {
    let image = this.classifierForm.get('image').value
    this.jobService.setClassifier(image).subscribe(r => alert(`Set ${image} as classifier`))
  }
}
