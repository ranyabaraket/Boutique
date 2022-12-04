import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router){}
  canActivate(){
    if(!this.authService.notLoggedIn() && !this.authService.isAdmin()){
      return true
    }
    else{
      this.router.navigate(['/EspaceClient/login'])
      return false
    }

  }

}
