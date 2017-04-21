import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';

function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({tokenName: 'token',
        tokenGetter: (() => sessionStorage.getItem('token')),
        globalHeaders: [{'Content-Type':'application/json'}],
        noJwtError: true
    }), http, options);
}

@NgModule({
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  imports: [AuthRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule],
    exports: [],
    declarations: [LoginComponent, ProfileComponent, SignupComponent]
})

export class AuthModule {
  
}