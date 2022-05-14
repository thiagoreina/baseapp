import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthCheckService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate() {

    return this.auth.isAuthenticated().then(data => {
      if (data) {
        this.router.navigate(['home']);
        return false
      } else {
        return true;

      }
    })
  }

}