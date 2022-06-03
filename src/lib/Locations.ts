import * as fb_helper from './fb_helper'
import type { FirebaseApp } from 'firebase/app'
import type { User } from 'firebase/auth'
import type { User as UserType } from 'firebase/auth'
import { getDocs, getFirestore, connectFirestoreEmulator, collection, query, 
  where, setDoc, doc, addDoc, WithFieldValue, DocumentData, QueryDocumentSnapshot,
  SnapshotOptions, 
  getDoc,
  DocumentSnapshot,
  FieldValue} from 'firebase/firestore'

const app : FirebaseApp = fb_helper.get_app()
const db = getFirestore(app)
connectFirestoreEmulator(db,'localhost',8088)

export class Location {

  Name: string
  private CurrentUser : User

  constructor(user: User) {
    this.CurrentUser = user
  }

  // Public methods
  save = () => {

  }
}