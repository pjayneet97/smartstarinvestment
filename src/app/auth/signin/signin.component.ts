import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  email;
  password;
  error;
  isLogedIn = false;

  constructor( private authService: AuthService ) { }

  ngOnInit(): void { }

  signin() {
    if(this.email==""){
      this.error = "This filed is requied.";
      this.isLogedIn=false;
    }
    else{
      this.error = "";
      this.authService.signIn(this.email, this.password);
      this.isLogedIn=true;
    }
  }

}

