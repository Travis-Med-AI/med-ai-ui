import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form:FormGroup;

  constructor(private fb:FormBuilder, 
               private authService: AuthService, 
               private router: Router) {

      this.form = this.fb.group({
          firstName: ['',Validators.required],
          lastName: ['',Validators.required],
          email: ['',Validators.required],
          password: ['',Validators.required]
      });
  }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['login'])
  }

  signup() {
      const val = this.form.value;

      if (val.email && val.password) {
          this.authService.signup(val.email, val.password, val.firstName, val.lastName)
              .subscribe(
                  (t) => {
                    this.router.navigateByUrl('/login');
                  }
              );
      }
  }
}
