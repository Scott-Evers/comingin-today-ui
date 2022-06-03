import * as fb_helper from './fb_helper'
import type { FirebaseApp } from 'firebase/app'
import type { User } from 'firebase/auth'
import type { User as UserType } from 'firebase/auth'
import { OrganizationUser } from './OrganizationUsers'
import { Location } from './Locations'
import { getDocs, getFirestore, connectFirestoreEmulator, collection, query, 
  where, setDoc, doc, addDoc, WithFieldValue, DocumentData, QueryDocumentSnapshot,
  SnapshotOptions, 
  getDoc,
  DocumentSnapshot,
  FieldValue,
  DocumentReference,
  updateDoc,
  deleteDoc} from 'firebase/firestore'
  
  
export const orgConverter = {
  toFirestore(org: WithFieldValue<Organization>): DocumentData {
    return {name: org.Name};
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
    ): Organization {
      const data = snapshot.data(options)!;
      let o = new Organization(null)
      o.ID = snapshot.id
      o.Name = data.name
      return o
    }
}

const app : FirebaseApp = fb_helper.get_app()
const db = getFirestore(app)
connectFirestoreEmulator(db,'localhost',8088)
const orgRef = collection(db,'organization').withConverter(orgConverter)

export class Organization {

  ID: string
  Name: string
  Owners: Array<string> = []
  Members: Array<string> = []
  Locations: Array<Location>
  DomainSuffix: string
  private CurrentUser : User

  constructor(user: User, org_doc? : DocumentSnapshot) {
    this.CurrentUser = user
    if (org_doc) {
      this.ID = org_doc.id
      let data = org_doc.data()
      this.Name = data.name
    }
  }

  // Public methods
  
  save = async (ou: OrganizationUser) => {
    if (!this.Owners) this.Owners = []
    if (!this.Members) this.Members = []
    if (!this.Locations) this.Locations = []
    if (this.Locations == undefined) this.Locations = []
    if (this.Owners.length == 0) this.Owners.push(ou.ID) // force ownership
    if (!this.ID) { // new Org.  Force user to be member, add default location
      let loc = new Location(null)
      loc.Name = 'Headquarters'
      this.Locations.push(loc)
      this.Members.push(ou.ID)
    }
    console.warn(this.Owners)
    if ( this.Owners.filter(owner => owner == ou.ID).length == 0) 
      this.Owners.push(ou.ID)
    if ( this.Members.filter(member => member == ou.ID).length == 0) 
      this.Members.push(ou.ID)
    
    //save organization doc
    let org_doc : DocumentReference
    if (this.ID) {
      org_doc = doc(db,'organization',this.ID)
      await setDoc(org_doc.withConverter(orgConverter), this)
    } else {
      org_doc = await addDoc(orgRef.withConverter(orgConverter), this)
      this.ID = org_doc.id
    }
    
    //save locations
    this.Locations.forEach(loc => loc.save(this))
    
    //save ownership to user doc(s)
    let user_snap : DocumentSnapshot
    let user_data : DocumentData
    for (let i = 0; i < this.Owners.length; i ++) {
      let owner_id = this.Owners[i]

      // get the document from firestore
      user_snap = await OrganizationUser.get_raw(owner_id)
      user_data = await user_snap.data()

      //update the ownership if this is a new addition
      let existing = user_data.ownership.filter(owned_group => owned_group.id == this.ID)
      console.debug('owner exists?',existing,user_data.ownership)
      if (existing.length == 0) {
        user_data.ownership.push(org_doc)
        updateDoc(user_snap.ref,{ ownership:user_data.ownership })
      }
    }
    // todo remove owners that have been removed

    //save membership to user doc(s)
    for (let i = 0; i < this.Members.length; i ++) {
      let member_id = this.Members[i]

      // get the document from firestore
      user_snap = await OrganizationUser.get_raw(member_id)
      user_data = await user_snap.data()

      // update document if this is a new addition
      if (user_data.membership.filter(member_of => member_of.id == this.ID).length == 0) {
        user_data.membership.push(org_doc)
        updateDoc(user_snap.ref,{ membership:user_data.membership })
      }
    }
    //todo remove members that have been removed
    
    
    // save location doc(s)
    this.Locations.forEach(loc => loc.save(this))
  }

  delete = async () => {
    deleteDoc(doc(db,'organization',this.ID))
  }
  
  static async from_doc_id (user: User, id: string): Promise<Organization>  {
    return this.doc_to_org(user,await this.get_doc(null,`organization/${id}`))
  }
  static async from_doc_ref(user: User, dr: DocumentReference): Promise<Organization> {
    console.debug('getting document for ref',dr)
    return this.doc_to_org(user,await this.get_doc(dr,null))
  }
  static async from_doc_path(user: User, path: string): Promise<Organization> {
    console.debug('getting document for path',path)
    return this.doc_to_org(user,await this.get_doc(null,path))
  }
  private static doc_to_org(user: User, d: DocumentSnapshot) : Organization {
      let o : Organization = new Organization(user)
      const data = d.data()
      o.ID = d.id
      o.Locations = data.locations
      o.Name = data.name
      return o
  }
  private static async get_doc(dr? : DocumentReference, path?: string) 
    : Promise<DocumentSnapshot> {
      console.log( dr)
      if (dr)
        return await getDoc(dr)
      else
        return await getDoc(doc(db,path))
  }
}

export class Organizations extends Array<Organization> {

  private CurrentUser : User

  constructor(user?: User, orgs? : Array<Organization>) {

    if (!orgs) orgs = []
     super(...orgs)
    this.CurrentUser = user
  }

  // Public methods

}

