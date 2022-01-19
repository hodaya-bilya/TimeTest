import { Component, OnInit } from '@angular/core';
import { Login } from './models/login.model';
import { LoginManagmentService } from './sevices/login-managment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Time Test';
  isConnected: Login;

  constructor(public loginManagmentService: LoginManagmentService) { }

  ngOnInit(): void {
    this.loginManagmentService.user$.subscribe(login => {
      this.isConnected = login;
    });
  }
  disconnect() {
    sessionStorage.clear();
    this.loginManagmentService.user$.next(null);
  }
}
