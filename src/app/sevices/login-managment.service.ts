import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginManagmentService implements CanActivate {
  user$ = new BehaviorSubject<Login>(null);
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let user: Login = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      this.user$.next(user);
      return true;
    }
    else {
      this.user$.next(null);
      this._snackBar.open('יש לבצע התחברות מחדש', 'סגור', { duration: 5000 });
      this.router.navigate(['/Login'])
      return false;
    }
  }
}
