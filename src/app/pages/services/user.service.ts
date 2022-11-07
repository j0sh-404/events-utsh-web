import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {UserEventsModel} from "../app-event/models/UserEventsModel";
import {firestore} from "firebase";
import {query} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  reference='events';

  constructor(private firestore: AngularFirestore) {

  }

  addUser(user: UserEventsModel, idEvent){
    return this.firestore.collection(this.reference).doc(idEvent).collection('users').add(user);
  }

  getUserByIdEvent(id) {
    return this.firestore.collection('users',ref=>ref.where('idEvento','==', id));
  }

  getEvent(idEvent){
    return firestore().collection(this.reference).doc(idEvent).collection('users').get()
  }
  /*getEvent(idEvent){
    return  this.firestore.collection(this.reference).doc(idEvent).collection('users',ref=>ref.where('status','==','No asistido'))
  }*/
}
