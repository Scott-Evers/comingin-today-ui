import type { FirebaseApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator, collection, setDoc, doc, 
  addDoc, DocumentData, getDoc, DocumentSnapshot, DocumentReference, getDocs,
  query, QueryConstraint, QuerySnapshot, CollectionReference, collectionGroup,
  Query } from 'firebase/firestore'
import type { Organization } from './fb_types'
import * as FBUtil from './fb_util'

const app : FirebaseApp = FBUtil.get_app()
export const db = getFirestore(app)
connectFirestoreEmulator(db,'localhost',8088)
  
class Document extends DocumentSnapshot {

  public Data : DocumentData
  public Collection : CollectionReference | Query<DocumentData>
  constructor(collection_name : string) {
    super()
    let acn : Array<string> = collection_name.split('/')
    if (acn.length % 2 == 0) {
      this.Collection = collectionGroup(db,acn[acn.length - 1])
    }
    else {
      this.Collection = collection(db,collection_name)
    }
  }
  public static async load(ref? : DocumentReference, id? : string) : Promise<Organization> {
    if (!(ref || id)) throw new Error('Document reference or id required')
    if (!ref) ref = doc(db,'users',id)
    let ou : Document = await getDoc(ref) as Document
    if (!ou.exists) throw new Error('document not found in collection')
    ou.Data = ou.data()
    return ou as Organization
  }
  public static get_ref_by_id(col: string, id: string) : DocumentReference {
    return doc(db,col,id)
  }
  public async save() : Promise<Document> {
    if (super.data()) {
      setDoc(this.ref ? this.ref : doc(db,'users', this.id), this.Data)
    } else {
      let r = await addDoc(this.Collection as CollectionReference,this.Data)
      return await Document.load(r)
    }
  }
  public async search(where: QueryConstraint | Array<QueryConstraint>) 
    : Promise<QuerySnapshot> {
      let qc : Array<QueryConstraint>
      qc = (typeof where == typeof QueryConstraint) ? [where as QueryConstraint] : where as Array<QueryConstraint>
      //console.log('qc', qc)
      //console.log('this.Collection',this.Collection)
      let docs = await getDocs(query(this.Collection, ...qc))
      //console.log('docs',docs)
      return docs
  };
}

export default Document