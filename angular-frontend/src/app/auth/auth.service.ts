import { Injectable } from '@angular/core';
import { IUser } from './../users/user';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ICredentials } from './credentials';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class AuthService {

    currentUser: any;
    private _authenticateUrl = '/api/login';
    private _signupUrl = '/api/signup';
    public token: string;

    constructor(private _http: Http, private _router: Router) { }

    authenticate(credentials){
        const headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        const options       = new RequestOptions({ headers: headers }); // Create a request option

        return this._http.post(this._authenticateUrl, credentials)
            .map(res => res.json())
            .subscribe(
        data => {
            localStorage.setItem('token', data.token);
            this.currentUser = data.respond.user; },
        error => console.log(error),
        () => { console.log('Welcome', this.currentUser.fullName + '!');
         this._router.navigate(['home']);
        }
      );
    }

    createUser(user): Observable < IUser > {
  return this._http.post(this._signupUrl, user) // ...using post request
    .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
    .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if
}

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }

    logout(){
        localStorage.removeItem('token');
        this.currentUser = null;
        return tokenNotExpired();
    }

    updateCurrentUser(firstName:string,lastName:string){
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
    }
}
