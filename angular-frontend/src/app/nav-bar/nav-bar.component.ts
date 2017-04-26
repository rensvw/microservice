import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './../auth/auth.service';


@Component({
  moduleId: module.id,
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  pageTitle: string = 'SecurityPoC';

  constructor(public _authService: AuthService) { }

  ngOnInit() {

  
  }

}
