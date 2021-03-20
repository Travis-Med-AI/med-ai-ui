import { Component } from '@angular/core';
import { ThemeService, THEMES, THEMES_VALUES } from './services/theme.service';
import { NotificationService } from './services/notification.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isMobile = false;
  theme: string = THEMES_VALUES[THEMES.LIGHT];
  constructor(public themeService: ThemeService,
    public notificationService: NotificationService,
    private deviceService: DeviceDetectorService) {
    this.themeService.theme.subscribe(theme => this.theme = THEMES_VALUES[theme]);
    this.notificationService.watchNewNotifications();
    this.isMobile = this.deviceService.isMobile();
  }
  title = 'med-ai-ui';
}
