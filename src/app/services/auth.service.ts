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
     return this.afAuth.createUserWithEmailAndPassword(cred.email,cred.password).then(res=>{
       localStorage.setItem("uid",res.user.uid)
       return this.db.collection("users").doc(res.user.uid).set(Object.assign({},profileInfo)).then(res=>{
        this.router.navigateByUrl("/dashboard")
        return res
       })
     }).catch(err=>{
       // code to generate a notification alert of wrong credentials
       alert(err)
       return err
     })
   }

   signIn(email,password){
     return this.afAuth.signInWithEmailAndPassword(email,password).then(res=>{
      localStorage.setItem("uid",res.user.uid)
      this.router.navigateByUrl("/dashboard")
      return res.user.uid
     }).catch(err=>{
      // code to generate a notification alert of wrong credentials
      alert(err)
      return err
    })
   }

   resetPassword(email){
    return this.afAuth.sendPasswordResetEmail(email)
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
      localStorage.removeItem("uid")
      this.afAuth.signOut()
      window.location.reload()
   }


}
