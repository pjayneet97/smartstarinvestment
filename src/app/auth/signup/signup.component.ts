import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

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

  signup(formData:NgForm) {
    let cred={email:formData.value.email,password:formData.value.password}
    let profileInfo={firstName:formData.value.firstName,lastName:formData.value.lastName,gender:formData.value.gender,mobile:formData.value.mobile}
    this.authService.createAccount(cred,profileInfo)
  }

}
