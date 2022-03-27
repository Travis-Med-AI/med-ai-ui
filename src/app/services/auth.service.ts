import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NewUserRequest, SignInRequest } from 'med-ai-common';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${this.settingsService.getServerUrl()}/auth`

  loggedIn = false
  constructor(private http: HttpClient, 
              private settingsService: SettingsService,
              private router: Router) {
    this.isLoggedIn()
  }
    
  login(email:string, password:string ) {
      return this.http.post<SignInRequest>(`${this.baseUrl}/signin`, {email, password})
  }

  signup(email:string, password:string, firstName: string, lastName: string ) {
    let body: NewUserRequest = {
      firstName,
      lastName,
      email,
      password,
      age: -1,
      roles: []
    }
    return this.http.post<SignInRequest>(`${this.baseUrl}/signup`, body)
  }

  setSession(authResult) {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expiration', authResult.expiration);
    this.loggedIn = true
  }  

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    this.loggedIn = false
    this.router.navigate(['login'])
  }

  isLoggedOut() {
    return !this.isLoggedIn();
}

  public isLoggedIn() {
    const token = localStorage.getItem("token");
    const expired = Date.now() > +localStorage.getItem("expiration");
    this.loggedIn = !!token && !expired;
    console.log(this.loggedIn)
    return this.loggedIn
  }
}
