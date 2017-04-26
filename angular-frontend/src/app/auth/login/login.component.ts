import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { ICredentials } from './../credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pageTitle: string = "Login Page";
  credentials: ICredentials;
  email: string;
  password: string;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  authenticate(formValues){
    this.credentials = {
      email: formValues.email,
      password: formValues.password
    }
   this._authService.authenticate(this.credentials);

    }
  };



