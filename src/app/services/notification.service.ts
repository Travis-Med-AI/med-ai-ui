import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, filter } from 'rxjs/operators';
import { Notifications, NotificationMessage, Sockets } from 'med-ai-common';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import * as _ from 'lodash';
import { debounce, throttle } from 'lodash';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  baseUrl = `${this.settingsService.getServerUrl()}/realtime`;

  constructor(private snackBar: MatSnackBar,
              private socket: Socket,
              private http: HttpClient,
              private settingsService: SettingsService) { }

  showNotification(message: string) {
    this.snackBar.open(message, '', {duration: 2000});
  }

  watchNewNotifications() {
    this.socket.fromEvent<NotificationMessage>(Sockets.notifications).subscribe(data => {
      this.showNotification(data.message)
      console.log(`Notification: ${data}`)
    });
  }

  getNotifications(): Observable<NotificationMessage[]> {
    return this.http.get<NotificationMessage[]>(`${this.baseUrl}/notifications`)
  }

  readNotification(id: number): Observable<NotificationMessage[]> {
    return this.http.post<NotificationMessage[]>(`${this.baseUrl}/notifications/read`,{id})
  }

  readAllNotifications(): Observable<NotificationMessage[]> {
    return this.http.get<NotificationMessage[]>(`${this.baseUrl}/notifications/read-all`)
  }

  getNotificationsSocket(): Observable<NotificationMessage[]> {
    return this.socket.fromEvent<NotificationMessage[]>(Sockets.allNotifications)
  }

  watchNotificationTypes(types: Notifications[]) {
    return this.socket.fromEvent<NotificationMessage>(Sockets.notifications)
              .pipe(filter(n => _.includes(types, n.type)))
  }
}
