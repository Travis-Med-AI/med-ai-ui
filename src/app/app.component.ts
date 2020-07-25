import { Component } from '@angular/core';
import { ThemeService, THEMES, THEMES_VALUES } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  theme: string = THEMES_VALUES[THEMES.LIGHT];
  constructor(public themeService: ThemeService) {
    this.themeService.theme.subscribe(theme => this.theme = THEMES_VALUES[theme])
  }
  title = 'med-ai-ui';
}
