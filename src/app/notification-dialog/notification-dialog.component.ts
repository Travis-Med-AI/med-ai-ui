import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationMessage, Notifications } from 'med-ai-common';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {
  notifications = this.data;

  constructor(public dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotificationMessage[],
    private notifService: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  readNotification(id: number) {
    this.notifService.readNotification(id).subscribe(n => {
      this.notifications = n
      if (n.length < 1) {
        this.dialogRef.close()
      }
    })
  }

  readAllNotifications() {
    this.notifService.readAllNotifications().subscribe(n => this.dialogRef.close())
  }

  view(notification: NotificationMessage) {
    this.readNotification(notification.id);
    switch(notification.type) {
      case Notifications.newResult: {
        this.router.navigate(['evals'])
        break;
      }
      case Notifications.evalFailed: {
        this.router.navigate(['evals'])
        break;
      }
      case Notifications.modelReady: {
        this.router.navigate(['jobs'])
        break;
      }
      case Notifications.studyReady: {
        this.router.navigate(['new-job'])
        break;
      }
    }
    this.dialogRef.close();

  }

}
