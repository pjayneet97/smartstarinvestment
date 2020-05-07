import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService) { 
    
  }

  showToast(type:string,title:string,message:string) {
    if(type=="success"){
      this.toastr.success("message","message")
    }
    if(type=="error"){
      this.toastr.error("message","message")
    }
    if(type=="info"){
      this.toastr.info("message","message")
    }
    if(type=="warning"){
      this.toastr.warning("message","message")
    }
  }
}
