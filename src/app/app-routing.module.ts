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
import { AuthGuardService } from './services/auth-guard.service';
import { InvestmentPlansComponent } from './management-panel/investment-plans/investment-plans.component';
import { OrderHistoryComponent } from './management-panel/order-history/order-history.component';
import { TransactionHistoryComponent } from './management-panel/transaction-history/transaction-history.component';
import { ManageProfileComponent } from './management-panel/manage-profile/manage-profile.component';


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
  {path:"dashboard",component:ManagementPanelComponent,canActivate:[AuthGuardService],children:[
    {path:"investmant-plans",component:InvestmentPlansComponent},
    {path:"order-history",component:OrderHistoryComponent},
    {path:"transaction-history",component:TransactionHistoryComponent},
    {path:"manage-profile",component:ManageProfileComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
