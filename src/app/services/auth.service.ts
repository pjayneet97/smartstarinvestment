import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth:AngularFireAuth,public db:AngularFirestore,public router:Router,public common:CommonService) {
    this.afAuth.authState.subscribe(res=>{
      if(res){
        localStorage.setItem("uid",res.uid)
      }
      else{
        localStorage.removeItem("uid")
        this.router.navigateByUrl("/auth")
      }
    })
   }

   createAccount(cred:{email:string,password:string},profileInfo){
      this.common.showLoader()
     return this.afAuth.createUserWithEmailAndPassword(cred.email,cred.password).then(res=>{
       localStorage.setItem("uid",res.user.uid)
       return this.db.collection("users").doc(res.user.uid).set(Object.assign({},profileInfo)).then(res=>{
        this.router.navigateByUrl("/dashboard")
        this.common.showToast("success","Successfull","Your Account is Successfully Created")
        return res
       })
     }).catch(err=>{
       // code to generate a notification alert of wrong credentials
       this.common.showToast("error","Error",err)
       return err
     }).finally(()=>{
      this.common.stopLoader()
     })
   }

   signIn(email,password){
     this.common.showLoader()
     console.log(email,password)
     return this.afAuth.signInWithEmailAndPassword(email,password).then(res=>{
      localStorage.setItem("uid",res.user.uid)
      this.common.showToast("success","Successfull","You are LoggedIn successfully")
      this.router.navigateByUrl("/dashboard")
      return res.user.uid
     }).catch(err=>{
      // code to generate a notification alert of wrong credentials
      this.common.showToast("error","Error",err)
      return err
    }).finally(()=>{
      this.common.stopLoader()
    })
   }

   resetPassword(email){
    this.common.showLoader()
    return this.afAuth.sendPasswordResetEmail(email).then(res=>{
      this.router.navigateByUrl("/auth")
      this.common.showToast("success","Reset link Send","Check your email for password reset link")
    }).finally(()=>{
      this.common.stopLoader()
    })
   }

   isAuthenticated(){
    if(localStorage.getItem("uid")){
      return true
    }
    else{
      return false
    }
   }

   logOut(){
      this.common.showLoader()
      localStorage.removeItem("uid")
      this.afAuth.signOut()
      window.location.reload()
   }

   getUid(){
     return localStorage.getItem("uid")
   }


}
