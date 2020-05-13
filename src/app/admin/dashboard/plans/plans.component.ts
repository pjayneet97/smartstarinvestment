import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { PlansService } from 'src/app/services/plans.service';
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  allPlans=[]
  selectedPlan:{title:string,description:string,interest:number,minimum:number,id?:string}={title:"",description:"",interest:0,minimum:0}
  closeResult = '';

  constructor(private modalService: NgbModal,public planService:PlansService) {}

  ngOnInit(): void {
    this.getAllPlans()
  }

  open(content,data?:{title:string,description:string,interest:number,minimum:number,id?:string}) {
    if(data){
      console.log(data)
      this.selectedPlan=data
    }
    else{
      this.selectedPlan={title:"",description:"",interest:0,minimum:0}
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if(result=='save'){
        if(data){
          
          let id = this.selectedPlan.id
          delete this.selectedPlan.id
          let data=this.selectedPlan
          this.update(id,data)
        }
        else{
          this.add(this.selectedPlan)
        }
      }
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log("closed")
    });
  }

  update(id,data){
    this.planService.update(id,data).then(res=>{
      this.selectedPlan={title:"",description:"",interest:0,minimum:0}
    })
  } 

  add(data){
    this.planService.add(data).then(res=>{
      this.selectedPlan={title:"",description:"",interest:0,minimum:0}
    })
  } 

  getAllPlans(){
    this.planService.getAll().subscribe(res=>{
      this.allPlans=res
    })
  }

  delete(id){
    this.planService.delete(id)
  }



}
