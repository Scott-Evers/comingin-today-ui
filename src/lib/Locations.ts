import * as fb_helper from './fb_helper'
import type { FirebaseApp } from 'firebase/app'
import type { User } from 'firebase/auth'
import type { User as UserType } from 'firebase/auth'
import { getDocs, getFirestore, connectFirestoreEmulator, collection, query, 
  where, setDoc, doc, addDoc, WithFieldValue, DocumentData, QueryDocumentSnapshot,
  SnapshotOptions, DocumentReference, getDoc, DocumentSnapshot, FieldValue,
  updateDoc} from 'firebase/firestore'
import type { Organization } from './Organizations'

const app : FirebaseApp = fb_helper.get_app()
const db = getFirestore(app)
connectFirestoreEmulator(db,'localhost',8088)

export class Location {

  ID: string
  Name: string
  private CurrentUser : User

  constructor(user: User) {
    this.CurrentUser = user
  }

  // Public methods
  save = async (org: Organization) : Promise<void> => {
    console.debug('saving location',this.Name, 'to org', org.ID)
    if (this.ID) {    // update existing

    } else {    // create new
      // create location document
      let dr : DocumentReference = await addDoc(collection(db,'location'),{
        organization: doc(db,'organization',org.ID),
        name: this.Name
      })
      this.ID = dr.id
      
      // add reference to organization
      let org_doc : DocumentSnapshot = (await getDoc(doc(db,'organization',org.ID)))
      let data : DocumentData = org_doc.data()
      data.locations ? data.locations.push(dr) : data.locations = [dr]
      updateDoc(org_doc.ref,{ locations: data.locations})
    }
  }
}