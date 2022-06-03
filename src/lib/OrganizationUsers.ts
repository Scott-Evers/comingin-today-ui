import * as fb_helper from './fb_helper'
import type { FirebaseApp } from 'firebase/app'
import type { User } from 'firebase/auth'
import { Organization, Organizations } from './Organizations'
import { getDocs, getFirestore, connectFirestoreEmulator, collection, query, 
  where, setDoc, doc, addDoc, WithFieldValue, DocumentData, QueryDocumentSnapshot,
  SnapshotOptions, getDoc,DocumentSnapshot,FieldValue, DocumentReference} from 'firebase/firestore'
  
  

const app : FirebaseApp = fb_helper.get_app()
const db = getFirestore(app)
connectFirestoreEmulator(db,'localhost',8088)
const usrRef = collection(db,'users')
  
export class OrganizationUser {

  ID: string
  ManagedOrgs: Organizations
  MemberOrgs: Organizations
  private CurrentUser : User

  constructor(user?: User) {
    this.CurrentUser = user
    this.ManagedOrgs = new Organizations()
    this.MemberOrgs = new Organizations()
  }

  public static get_current = async (user: User) : Promise<OrganizationUser> => {
    let ou = new OrganizationUser(user)
    console.log('getting current user with id',user.uid)
    let u = await getDoc(doc(db,'users',user.uid))
    console.log('got user doc snapshot',u)
    ou.ID = u.id
    let data = u.data()
    console.debug('with data',data)
    for (let i = 0; i < data.ownership.length; i++) {
      try {
        let o = await Organization.from_doc_ref(user,data.ownership[i])
        ou.ManagedOrgs.push(o)
      } catch (e) {
        console.error('Error trying to fetch owned org from reference',data.ownership[i],e)
      }
    }
    for (let i = 0; i < data.membership.length; i++) {
      try {
        let o = await Organization.from_doc_ref(user,data.membership[i])
        ou.MemberOrgs.push(o)
      } catch (e) {
        console.error('Error trying to fetch member org from reference',data.membership[i],e)
      }
    }
    return ou
  }

  public static get_raw = async (uid: string) : Promise<DocumentSnapshot> => {
    return await getDoc(doc(db,'users',uid))
  }
}
