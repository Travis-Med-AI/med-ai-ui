import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  localStorageKey = 'darkTheme';

  constructor() { }
  _isDark:boolean = JSON.parse(localStorage.getItem(this.localStorageKey))

  isDark = new BehaviorSubject(this._isDark)
  setDark = (isDark) => {
    this._isDark = isDark;
    localStorage.setItem(this.localStorageKey, this._isDark.toString())
    this.isDark.next(this._isDark)
  }
}
