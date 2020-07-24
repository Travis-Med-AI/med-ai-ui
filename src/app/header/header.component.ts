import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDark = false;
  constructor(private themeService: ThemeService) {
    themeService.isDark.subscribe(isDark => {
      this.isDark = isDark
      console.log(this.isDark)
    }
    )
  }

  ngOnInit(): void {
  }

  toggleDark(isDark: MatSlideToggleChange) {
    this.themeService.setDark(isDark.checked);
  }
}
