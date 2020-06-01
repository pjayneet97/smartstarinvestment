import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})
export class ManageProfileComponent implements OnInit {
  profileInfo:any;
  email:string;
  addacform=false
  constructor( private authService: AuthService,public storage:AngularFireStorage ) { }

  ngOnInit(): void {
    this.email = this.authService.getEmail()
    this.authService.getProfile().subscribe(res=>{
      console.log(res)
    this.profileInfo=res
  })
  }

  update(formData){
    this.authService.updateProfile(formData.value)
  }

  changeProfile(event){
    if(event.target.files[0]){
      this.authService.common.showLoader()
      this.storage.upload(this.authService.getUid(),event.target.files[0]).then(res=>{
        this.storage.ref(this.authService.getUid()).getDownloadURL().subscribe(url=>{
          this.authService.updateProfile({imageurl:url}).then(success=>{
            this.authService.common.stopLoader()
          })
        })
      }).catch(err=>{
        this.authService.common.stopLoader()
        this.authService.common.showToast("error","Error Occoured","")
      })
    }
  }

}
