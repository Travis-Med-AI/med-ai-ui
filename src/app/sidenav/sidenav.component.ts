import { Component, OnInit, Input } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { NotificationService } from '../services/notification.service';
import { NotificationMessage } from 'med-ai-common';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';

interface sideNavItem {
  icon: string;
  routerLink: string;
  displayValue: string
}

@Component({
  selector: 'app-sidehav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  notifications: NotificationMessage[] = []
  sidenavItems: sideNavItem[] = [
    {icon: 'insert_drive_file', routerLink: 'new-job', displayValue: 'Studies'},
    // {icon: 'model_training', routerLink: 'evaluate-study', displayValue: 'Evaluate'},
    {icon: 'add_to_queue', routerLink: 'jobs', displayValue: 'Models'},
    {icon: 'leaderboard', routerLink: 'evals', displayValue: 'Evals'},
    {icon: 'memory', routerLink: 'monitor', displayValue: 'Monitor'},
    {icon: 'backpack', routerLink: 'research', displayValue: 'Research'},
    {icon: 'image', routerLink: 'orthanc', displayValue: 'Orthanc'},
    {icon: 'settings', routerLink: 'settings', displayValue: 'Settings'},
  ]
  isDark = false;
  constructor(private notifService: NotificationService, private dialog: MatDialog) {
  }

  notifications$ = this.notifService.getNotifications();

  ngOnInit(): void {
    this.setupNotifications();
  }

  setupNotifications() {
    this.notifService.getNotifications().subscribe(n => this.notifications = n);
    this.notifService.getNotificationsSocket().subscribe(n => this.notifications = n)
  }

  openNotificationDialog() {
    if(this.notifications.length < 1) return;

    const dialogRef = this.dialog.open(NotificationDialogComponent, {
      data: this.notifications
    });
  }
}
