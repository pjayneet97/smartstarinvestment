import { Component, OnInit } from '@angular/core';
import { PlansService } from 'src/app/services/plans.service';
import { PaymentService } from 'src/app/services/payment.service';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-investment-plans',
  templateUrl: './investment-plans.component.html',
  styleUrls: ['./investment-plans.component.scss']
})
export class InvestmentPlansComponent implements OnInit {
  plans:any=[]
  WindowRef: any;
  amount=null;
  selectedPlan=null
  processingPayment: boolean;
  constructor(public planService:PlansService,private paymentService: PaymentService,public commonService:CommonService,public router:Router,private modalService: NgbModal) { }

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
    this.modalService.dismissAll()
    this.processingPayment = true;
    this.initiatePaymentModal($event);
  }


  initiatePaymentModal(event) {
          var rzp1 = new this.WindowRef.Razorpay(this.preparePaymentDetails())
          this.processingPayment = false;
          rzp1.open(); 
          event.preventDefault();
   }


   preparePaymentDetails(){
    return  {
      "key": "rzp_test_qXocOi92VpABBZ", // Enter the Key ID generated from the Dashboard
      "amount": this.amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Smart Star Investment",
      "description": "Investments for you",
      "image": "https://example.com/your_logo",
      //"order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
          this.handle_response(response.razorpay_payment_id);
      }.bind(this),
      "ondismiss": function(){
        alert("close")
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#FF9F05"
      }
     };
   }

   handle_response(_response){
     alert("Payment successful! go to order history section for details")
     this.paymentService.paidSuccessfully(_response,this.selectedPlan,this.amount).then(res=>{
      this.commonService.showToast("success","order make successfully","Check Order History")
      location.href="/dashboard/order-history"
     })
   }

   open(content,plan) {
/*      this.amount=null
     this.selectedPlan=plan
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result)
    }, (reason) => {
     console.log(reason)
    }); */
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
