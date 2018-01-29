import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("AuthGard "+!this.authService.isAuthenticated());

   return this.checkLogin()
  }

  checkLogin(): boolean {
    if (this.authService.isAuthenticated()) { return true; }
    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
