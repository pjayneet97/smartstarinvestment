import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  email;
  password;
  error;
  isCreated = false;

  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
  }

  signup() {
    if(this.email==""){
      this.error = "This filed is requied.";
      this.isCreated=false;
    }
    else{
      this.error = "";
      this.authService.signIn(this.email, this.password);
      this.isCreated=true;
    }
  }

}
