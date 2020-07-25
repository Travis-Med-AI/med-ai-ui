import { Component, OnInit, Input } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

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
  collapsed = true;
  sidenavItems: sideNavItem[] = [
    {icon: 'insert_drive_file', routerLink: 'new-job', displayValue: 'Studies'},
    {icon: 'mediation', routerLink: 'register-model', displayValue: 'Register Model'},
    {icon: 'model_training', routerLink: 'jobs', displayValue: 'Jobs'},
    {icon: 'leaderboard', routerLink: 'evals', displayValue: 'Evals'},
    {icon: 'memory', routerLink: 'monitor', displayValue: 'Monitor'},
    {icon: 'settings', routerLink: 'settings', displayValue: 'Settings'},
  ]
  isDark = false;
  constructor(private themeService: ThemeService) {
  }

  ngOnInit(): void {
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed
  }
}
