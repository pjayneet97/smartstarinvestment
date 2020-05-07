import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ManagementPanelComponent } from './management-panel/management-panel.component';
import { PagesComponent } from './pages/pages.component';
import { RiskCalculatorComponent } from './pages/risk-calculator/risk-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    AuthComponent,
    SignupComponent,
    ForgetPasswordComponent,
    HomeComponent,
    AboutusComponent,
    ManagementPanelComponent,
    PagesComponent,
    RiskCalculatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
