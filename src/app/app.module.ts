import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { InvestmentPlansComponent } from './management-panel/investment-plans/investment-plans.component';
import { OrderHistoryComponent } from './management-panel/order-history/order-history.component';
import { TransactionHistoryComponent } from './management-panel/transaction-history/transaction-history.component';
import { ManageProfileComponent } from './management-panel/manage-profile/manage-profile.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { ManageInvestmentComponent } from './admin/home/manage-investment/manage-investment.component';
import { AddComponent } from './admin/home/manage-investment/add/add.component';
import { EditComponent } from './admin/home/manage-investment/edit/edit.component';
import { AllComponent } from './admin/home/manage-investment/all/all.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PlansComponent } from './admin/dashboard/plans/plans.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { ReferComponent } from './pages/refer/refer.component';
import { ChartsModule } from 'ng2-charts';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import {HttpClientModule} from '@angular/common/http'

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
    HeaderComponent,
    FooterComponent,
    InvestmentPlansComponent,
    OrderHistoryComponent,
    TransactionHistoryComponent,
    ManageProfileComponent,
    AdminComponent,
    LoginComponent,
    ManageInvestmentComponent,
    AddComponent,
    EditComponent,
    AllComponent,
    DashboardComponent,
    PlansComponent,
    ContactusComponent,
    ReferComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxBootstrapSliderModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    FormsModule,
    ChartsModule,
    NgxUiLoaderModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
