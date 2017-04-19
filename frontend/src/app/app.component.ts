import { Component } from '@angular/core';
import { CookieService } from 'ng2-cookies';

@Component({
  selector: 'app-root',
  providers: [ CookieService ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  cookies: Object;
  keys: Array<string>;
  cName: string;
  cValue: string;
  rName: string;
  checkName: string;

  constructor( public cookieService: CookieService ) {
    this.update();
    console.log(this.cookies);
  }
  update() {
    this.cookies = this.cookieService.getAll();
    this.keys = Object.keys(this.cookies);
  }
  addCookie(cName: string, cValue: string) {
    console.log('Adding: ', cName, cValue);
    this.cookieService.set(cName, cValue);
    this.update();
  }
  removeCookie(rName: string) {
    console.log('Removing: ', rName);
    this.cookieService.delete(rName);
    this.update();
  }
  removeAll() {
    console.log('Removing all cookies');
    this.cookieService.deleteAll();
    this.update();
  }
  checkCookie() {
    console.log('Checking: ', this.checkName);
    console.log(this.cookieService.check(this.checkName));
    window.alert('Check cookie ' + this.checkName + ' returned ' + this.cookieService.check(this.checkName));
  }
}
