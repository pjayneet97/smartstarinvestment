import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(public db:AngularFirestore) { }

  add(data){
    console.log(data)
    return this.db.collection("plans").add(data)
  }

  update(id,data){
    return this.db.collection("plans").doc(id).set(data)
  }

  delete(id){
    return this.db.collection("plans").doc(id).delete()
  }

  getAll(){
    return this.db.collection("plans").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
