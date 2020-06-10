import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JobService } from '../job.service';

@Component({
  selector: 'app-start-job',
  templateUrl: './start-job.component.html',
  styleUrls: ['./start-job.component.scss']
})
export class StartJobComponent implements OnInit {
  models$ = this.jobService.getModels()

  jobForm = this.fb.group({
    model: ['', Validators.required],
    endTime: ['', Validators.required]
  })
  constructor(private fb: FormBuilder, private jobService: JobService) { }

  ngOnInit(): void {
  }

  submit() {
    let model = this.jobForm.get('model').value;
    let endTime = this.jobForm.get('endTime').value.getTime();

    this.jobService.startJob({model, endTime}).subscribe(i => alert('started job'))
  }
}
