import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  constructor(public auth:AuthService,public common:CommonService) { }

  ngOnInit(): void {
  }


  sendEmail(formdata:NgForm){
    let form= formdata.value
    this.auth.sendForm(form);
    setTimeout(() => {
      this.common.showToast("success","We will reply Soon","")
      formdata.resetForm()
    }, 1500);
  }

}
