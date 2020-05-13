import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private db:AngularFirestore,public auth:AuthService) { }
  get WindowRef() {
    return window;
  }

  paidSuccessfully(orderid,plan,amount){
    let uid = this.auth.getUid();
    let timestamp=firebase.firestore.Timestamp.now();
    let newOrder={orderid,plan,timestamp,uid,amount}
    return this.db.collection("orders").add(newOrder)
  }
  getAllOrders(){
    return this.db.collection("orders",ref=>ref.where("uid","==",this.auth.getUid()).orderBy("timestamp","desc")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  
}
