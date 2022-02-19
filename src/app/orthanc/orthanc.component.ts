import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-orthanc',
  templateUrl: './orthanc.component.html',
  styleUrls: ['./orthanc.component.scss']
})
export class OrthancComponent implements OnInit {
  orthancUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.settingsService.getOrthancUrl())

  constructor(private settingsService: SettingsService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

}
