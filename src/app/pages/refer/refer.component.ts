import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.scss']
})
export class ReferComponent implements OnInit {
  email=""
  constructor(public auth:AuthService,public common:CommonService) { }

  ngOnInit(): void {
  }
  sendRefer(){
    this.auth.sendRefer(this.email)
    this.common.showToast("success","Successfully Send Referal Link","")
    this.email=""
  }

}
