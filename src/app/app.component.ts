import { Component } from '@angular/core';
import { ThemeService, THEMES, THEMES_VALUES } from './services/theme.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  theme: string = THEMES_VALUES[THEMES.LIGHT];
  constructor(public themeService: ThemeService, public notificationService: NotificationService) {
    this.themeService.theme.subscribe(theme => this.theme = THEMES_VALUES[theme]);
    this.notificationService.watchNotifications();
  }
  title = 'med-ai-ui';
}
