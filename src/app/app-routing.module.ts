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
import { AdminComponent } from './admin/admin.component';
import { ManageInvestmentComponent } from './admin/home/manage-investment/manage-investment.component';
import { AllComponent } from './admin/home/manage-investment/all/all.component';
import { AddComponent } from './admin/home/manage-investment/add/add.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PlansComponent } from './admin/dashboard/plans/plans.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { ReferComponent } from './pages/refer/refer.component';


const routes: Routes = [
  {path:"",component:PagesComponent,children:[
    {path:"",component:HomeComponent},
    {path:"aboutus",component:AboutusComponent},
    {path:"contactus",component:ContactusComponent},
    {path:"refer",component:ReferComponent},
    {path:"invest",component:RiskCalculatorComponent},
  ]},
  {path:"auth",component:AuthComponent,children:[
    {path:"",component:SigninComponent},
    {path:"signup",component:SignupComponent},
    {path:"forget-password",component:ForgetPasswordComponent}
  ]},
  {path:"dashboard",component:ManagementPanelComponent,canActivate:[AuthGuardService],children:[
    {path:"",component:InvestmentPlansComponent},
    {path:"investmant-plans",component:InvestmentPlansComponent},
    {path:"order-history",component:OrderHistoryComponent},
    {path:"transaction-history",component:TransactionHistoryComponent},
    {path:"manage-profile",component:ManageProfileComponent}
  ]},
  {path:"admin",component:AdminComponent,children:[
    {path:"dashboard",component:DashboardComponent,children:[
      {path:"plans",component:PlansComponent}
    ]}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
