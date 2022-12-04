
import { AuthService } from './../../services/auth.service';
import { User } from './../../model/user.model';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  user:User;
  errors:string;

  constructor(private router:Router,private authService:AuthService,private flashMessage:FlashMessagesService) { this.user=new User(); }

  ngOnInit(): void {
  }

  login() {
    this.authService.authenticateAdmin(this.user).subscribe (
      result => {
        // Handle result

        this.flashMessage.show('Admin connected!', { cssClass: 'alert-success' } )
        console.log(result)
        this.authService.storeUserData(result['token'],result['user'])
        this.router.navigate(['/EspaceAdmin/profile'])
      },
      error => {
        this.errors = error.message;

        //console.log("l erreeurr : "+error)
        this.flashMessage.show(this.errors, { cssClass: 'alert-danger' } );
      },
      () => {
        // No errors, route to new page
      }
    );
  }

}
