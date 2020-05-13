import { Component, OnInit } from '@angular/core';
import { PlansService } from 'src/app/services/plans.service';
import { PaymentService } from 'src/app/services/payment.service';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-investment-plans',
  templateUrl: './investment-plans.component.html',
  styleUrls: ['./investment-plans.component.scss']
})
export class InvestmentPlansComponent implements OnInit {
  plans:any=[]
  WindowRef: any;
  processingPayment: boolean;
  constructor(public planService:PlansService,private paymentService: PaymentService,public commonService:CommonService) { }

  ngOnInit(): void {
    this.WindowRef = this.paymentService.WindowRef;
    this.getPlans()
  }

  getPlans(){
    this.planService.getAll().subscribe(res=>{
      console.log(res)
      this.plans=res
    })
  }

  proceedToPay($event) {
    this.commonService.showLoader()
    this.processingPayment = true;
    this.initiatePaymentModal($event);
  }


  initiatePaymentModal(event) {
          var rzp1 = new this.WindowRef.Razorpay(this.preparePaymentDetails());
          this.processingPayment = false;
          rzp1.open(); 
          event.preventDefault();
   }


   preparePaymentDetails(){
    return  {
      "key": "rzp_test_qXocOi92VpABBZ", // Enter the Key ID generated from the Dashboard
      "amount": "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Smart Star Investment",
      "description": "Investments for you",
      "image": "https://example.com/your_logo",
      //"order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
          this.handle_response(response.razorpay_payment_id);
      }.bind(this),
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#FF9F05"
      }
     };
   }

   handle_response(_response){
    this.commonService.showToast("success","order make successfully","Check Order History")
     this.paymentService.paidSuccessfully(_response,this.plans[0]).then(res=>{
       this.commonService.stopLoader()
       this.commonService.showToast("success","order make successfully","Check Order History")
     })
   }

}
