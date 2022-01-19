import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { HttpService } from '../sevices/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private roter: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.httpService.login(this.loginForm.value)
      .pipe(finalize(() => {
        this.isSubmitted = false;
      }))
      .subscribe(res => {
        if (res.error) {
          this._snackBar.open(res.error, 'סגור', { duration: 5000 });
          return;
        }
        else if (res.data) {
          sessionStorage.setItem('user', JSON.stringify(this.loginForm.value));
          this.roter.navigate(['/exam-table']);
        }
      });
  }
}
