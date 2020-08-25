import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar, private socket: Socket) { }

  showNotification(message: string) {
    this.snackBar.open(message, '', {duration: 2000});
  }

  watchNotifications() {
    this.socket.fromEvent<any>('notification').subscribe(data => {
      this.showNotification(data)
      console.log(`Notification: ${data}`)
    });
  }
}
