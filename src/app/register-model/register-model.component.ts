import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModelService } from '../services/model.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-model',
  templateUrl: './register-model.component.html',
  styleUrls: ['./register-model.component.scss']
})
export class RegisterModelComponent implements OnInit {
  availableModels = [];
  constructor(private fb: FormBuilder, private modelService: ModelService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAvailableModels()
  }

  register(modelManifestItem) {
    let notificationRef = this.snackBar.open(`Downloading ${modelManifestItem.displayName} (this may take a while)`);
    this.modelService.registerModel(modelManifestItem).subscribe(mi => {
      this.getAvailableModels()
      notificationRef.dismiss()
    })
  }

  getAvailableModels() {
    this.modelService.getAvailableModels().subscribe(models => this.availableModels = models)
  }

}
