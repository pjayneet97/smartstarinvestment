import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid=null
  constructor(public afAuth:AngularFireAuth,public db:AngularFirestore,public router:Router,public common:CommonService,public https:HttpClient) {
    this.afAuth.authState.subscribe(res=>{
      if(res){
        this.uid=res.uid
        localStorage.setItem("uid",res.uid)
        localStorage.setItem("email",res.email)
        //this.router.navigateByUrl("/dashboard")
      }
      else{
        localStorage.removeItem("uid")
        localStorage.removeItem("email")
      }
    })
   }

   createAccount(cred:{email:string,password:string},profileInfo){
      this.common.showLoader()
     return this.afAuth.createUserWithEmailAndPassword(cred.email,cred.password).then(res=>{
      this.uid=res.user.uid
       localStorage.setItem("uid",res.user.uid)
       localStorage.setItem("email",res.user.email)
       return this.db.collection("users").doc(res.user.uid).set(Object.assign({}, profileInfo)).then(res=>{
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
      this.uid=res.user.uid
      localStorage.setItem("uid",res.user.uid)
      localStorage.setItem("email",res.user.email)
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
     this.uid=null
     this.router.navigateByUrl("/auth")
      this.common.showLoader()
      localStorage.removeItem("uid")
      localStorage.removeItem("email")
      this.afAuth.signOut().then(res=>{
        this.common.stopLoader()
      })
   }

   getUid(){
     return localStorage.getItem("uid")
   }
   getEmail(){
    return localStorage.getItem("email")
   }

   getProfile(){
     return this.db.collection("users").doc(this.getUid()).valueChanges()
   }
   updateProfile(profileInfo:any){
     return this.db.collection("users").doc(this.getUid()).update(profileInfo).then(res=>{
       this.common.showToast("success","Update Successful","Profile Details Updated Successfully")
       return res
     }).catch(err=>{
      this.common.showToast("error","Error Occoured","Unable to perform this operation")
      return err
     })
   }

   sendVerify(){
     this.afAuth.currentUser.then(res=>{
       res.sendEmailVerification()
     })
   }

   sendForm(contact){
    let body =  `<p><em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; --- Here are details from website ---</em></p>
    <ul>
    <li><em> <b> Name : <\b> </em></li>` + contact.firstname +' '+ contact.lastname +
    `<li><em> <b> Email : <\b> </em></li>` + contact.email +
    `<li><em> <b> Number : <\b> </em></li>` + contact.number +
    `<li><em> <b> Message : <\b> </em></li>` + contact.message +
    `</ul><p>&nbsp; &nbsp; &nbsp;</p>`;// html can be written here
    let  postVars = {
      from : contact.email,
      subject : "Website Contact Form Filled",
      html : body,
      dest : 'smartstarinvestment@gmail.com'
      //number : contact.number,
    };
    this.https.post('https://us-central1-smartstarinvestments.cloudfunctions.net/sendMail', postVars).subscribe(res=>{
      console.log(res)
      }
    )

  }

  sendRefer(email){
    let body = `Please signup to Smart Star Investment using the refer link https://smartstarinvestment.web.app and start getting maximum returns on your investments`
    let  postVars = {
      from : "website.smartstarinvestment@gmail.com",
      subject : "You are referred Smart Star Investment",
      html : body,
      dest : email
      //number : contact.number,
    };
    this.https.post('https://us-central1-smartstarinvestments.cloudfunctions.net/sendMail', postVars).subscribe(res=>{
      console.log(res)
      }
    )

  }


}
