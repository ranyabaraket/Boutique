import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { User } from './../../model/user.model';

import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user:User;
  errors:string;
  notlogged:boolean;
  isadmin:boolean;
  constructor(private router:Router,private authService:AuthService, private flashMessage:FlashMessagesService) {this.user=new User();

  //console.log(this.authService.notLoggedIn())
  this.notlogged=this.authService.notLoggedIn();

  }

  ngOnInit(): void {
this.isadmin=this.authService.isAdmin()
this.user=this.authService.connectedUser()
console.log("nav user"+this.user['username'])
  }
  logout(){
    this.authService.logout();
    this.flashMessage.show('You logged out!', { cssClass: 'alert-success' } )
    this.router.navigate(['/'])
      }


      ad(){this.authService.isAdmin()}
}
