import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  pageTitle: string = "Profile Page";

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    let fullName = new FormControl(this._authService.currentUser.fullName, Validators.required);
    this.profileForm = new FormGroup({
      fullName: fullName,
    })
  }

  goBack(){
    this._router.navigate(['home']);
  }

  saveProfile(formValues){
    if(this.profileForm.valid){
    this._authService.updateCurrentUser(formValues.fullName);
    this._router.navigate(['home']);
    }

  }


}
