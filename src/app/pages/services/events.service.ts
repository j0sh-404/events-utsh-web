import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {RegisterEventsModel} from '../app-event/models/RegisterEventsModel';
import {firestore} from "firebase";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private reference='events';
  constructor(private firestore: AngularFirestore) { }

  addEvento(modelEvents: RegisterEventsModel){
    return this.firestore.collection(this.reference).add(modelEvents);
  }

  getAllEvents() {
    return firestore().collection(this.reference).get();
  }

}
