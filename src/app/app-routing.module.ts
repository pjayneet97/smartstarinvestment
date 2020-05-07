import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { RiskCalculatorComponent } from './pages/risk-calculator/risk-calculator.component';
import { ManagementPanelComponent } from './management-panel/management-panel.component';


const routes: Routes = [
  {path:"",component:PagesComponent,children:[
    {path:"",component:HomeComponent},
    {path:"aboutus",component:AboutusComponent},
    {path:"risk-calculator",component:RiskCalculatorComponent},
  ]},
  {path:"auth",component:AuthComponent,children:[
    {path:"",component:SigninComponent},
    {path:"signup",component:SignupComponent},
    {path:"forget-password",component:ForgetPasswordComponent}
  ]},
  {path:"dashboard",component:ManagementPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
