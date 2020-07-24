import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isDark = false;
  constructor(public themeService: ThemeService) {
    this.themeService.isDark.subscribe(dark => this.isDark = dark)
  }
  title = 'med-ai-ui';
}
