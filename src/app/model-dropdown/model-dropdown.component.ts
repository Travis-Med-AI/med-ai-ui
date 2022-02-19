import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModelManifestItem, StudyType } from 'med-ai-common';

@Component({
  selector: 'app-model-dropdown',
  templateUrl: './model-dropdown.component.html',
  styleUrls: ['./model-dropdown.component.scss']
})
export class ModelDropdownComponent implements OnInit {
  _models: ModelManifestItem[]
  @Input() set models (value: ModelManifestItem[]) {
    if (!this.studyType) {
      this._models = value;
    } else {
      this._models = value.filter(m => m.input === this.studyType)
    }
  };
  @Input() modelFormControl: FormControl;
  @Input() studyType?: StudyType;

  filterModels = (models: ModelManifestItem[]) => {

  }
  constructor() { }

  ngOnInit(): void {
  }

}
