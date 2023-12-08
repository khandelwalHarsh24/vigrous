// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' }, 
  { path: 'register',component: RegisterComponent},
   {path: 'login' , component: LoginComponent},
   { path: 'forgot-password', component: ForgotPasswordComponent },
   {path: 'reset-password/:token',component:ResetPasswordComponent},
   {path: 'home/:id',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
