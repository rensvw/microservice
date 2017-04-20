import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { IUser } from './../user';
import { AuthService } from './../auth.service';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup;
  pageTitle: string = 'Create new account';
  showError: boolean = false;
  showSpinner: boolean = false;


  constructor(private _router: Router, private _authService: AuthService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this._formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      email: ['', Validators.required],
      fullName: ['', Validators.required],
      countryCode: ['', Validators.required],
      mobilePhoneNumber: ['', Validators.required]
    });

  }

   createUser(formValues) {
     if (this.userForm.valid) {
       this.toggleSpinner();
       this._authService.createUser(formValues).subscribe(
         userExists => {
           !userExists.email ? this.showError = true : this._router.navigate(['users']);
         },
         err => console.log(err),
         () => this.toggleSpinner()
       );
     }
   }

   toggleSpinner(){
    return this.showSpinner = !this.showSpinner;
   }

   goBack(): void {
        this._router.navigate(['login']);
    }


}
