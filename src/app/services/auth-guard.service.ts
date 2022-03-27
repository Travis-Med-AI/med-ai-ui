import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    const loggedIn=this.auth.isLoggedIn()
    console.log(`the user is logged ${loggedIn? 'in': 'out'}` )
    if (!loggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}