import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum THEMES {
  LIGHT = 'Light',
  DARK = 'Dark',
  DARK_BLUE= 'Dark Blue'
}

export const THEMES_VALUES = {
  [THEMES.LIGHT]: '',
  [THEMES.DARK]: 'dark-theme',
  [THEMES.DARK_BLUE]: 'dark-blue-theme'
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  localStorageKey = 'theme';

  constructor() { }
  _theme: THEMES = localStorage.getItem(this.localStorageKey) as THEMES

  theme = new BehaviorSubject(this._theme)
  setTheme = (theme: THEMES) => {
    this._theme = theme;
    localStorage.setItem(this.localStorageKey, this._theme.toString())
    this.theme.next(this._theme)
  }
}
