import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './auth-guard.service';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  imports: [RouterModule.forChild([
      { path: 'signup',  component: SignupComponent },
      { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
      { path: 'login', component: LoginComponent },
    ])],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AuthRoutingModule { }
