import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders:any=[]
  constructor(public paymentService:PaymentService,public commonService:CommonService) { }

  ngOnInit(): void {
    this.commonService.showLoader()
    this.paymentService.getAllOrders().subscribe(res=>{
      this.commonService.stopLoader()
      this.orders=res
      console.log(res)
    })
  }

}
