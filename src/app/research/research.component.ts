import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StudyViewModel } from 'med-ai-common';
import { ModelService } from '../services/model.service';
import { StudyService } from '../services/study.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss']
})
export class ResearchComponent implements OnInit {
  adding = false;
  constructor() { }

  ngOnInit(): void {
  }

  addNew() {
    this.adding = true;
  }

}
