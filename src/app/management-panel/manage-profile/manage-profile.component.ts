import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})
export class ManageProfileComponent implements OnInit {
  profileInfo:any
  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
  this.authService.getProfile().subscribe(res=>{
    this.profileInfo=res
    console.log(this.profileInfo)
  })
  }

  update(formData){
    this.authService.updateProfile(formData.value)
  }

}
