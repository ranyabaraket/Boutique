
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { User } from './../../model/user.model';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {

  user:User;
  errors:string;

  constructor(private router:Router,private authService:AuthService, private flashMessage:FlashMessagesService) { this.user=new User(); }

  ngOnInit(): void {
  }


  login() {
    this.authService.authenticate(this.user).subscribe (
      result => {
        // Handle result

        this.flashMessage.show('Client connected!', { cssClass: 'alert-success' } )
        //console.log(result)
        this.authService.storeUserData(result['token'],result['user'])
        this.router.navigate(['/EspaceClient/profile'])
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





  SignUp() {
    this.authService.SignUp(this.user).subscribe (
      result => {
        // Handle result

        this.flashMessage.show('Client Registred! Please Log', { cssClass: 'alert-success' } )
        setTimeout(()=>{
          this.router.navigate(["/EspaceClient/login"]);
        },1000);
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
