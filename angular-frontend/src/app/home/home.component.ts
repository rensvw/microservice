import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageTitle: string = 'Welcome';
  fullName: string;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.fullName = this._authService.currentUser.fullName;

  }

}
