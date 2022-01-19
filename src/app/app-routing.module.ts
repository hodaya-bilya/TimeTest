import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ExamTableComponent } from './exam-table/exam-table.component';
import { LoginComponent } from './login/login.component';
import { LoginManagmentService } from './sevices/login-managment.service';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'exam-table', component: ExamTableComponent, canActivate: [LoginManagmentService] },
  { path: '', redirectTo: 'Login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
