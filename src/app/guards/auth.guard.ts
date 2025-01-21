import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';



@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private userService = inject(UserService);
  private router = inject(Router);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userService.isAuthenticated()) {
      return true;
    } else {
      console.log('not authenticated');

      this.router.navigate(['/login']);
      return false;
    }
  }
}
