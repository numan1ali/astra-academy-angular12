import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../admin/user-model';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user: User = JSON.parse(this.authService.getUser() || '{}');
    if (!this.authService.isLoggedIn() || user.role !== 'admin') {
      this.router.navigate(['login']);
      return false;
    }

    return this.authService.isLoggedIn();
  }
}
