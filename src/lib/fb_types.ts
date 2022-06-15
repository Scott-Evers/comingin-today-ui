import type { FirebaseApp } from 'firebase/app'
import { getFirestore, DocumentReference, getDoc, doc, connectFirestoreEmulator,
         DocumentSnapshot, DocumentData, addDoc, collection, SnapshotOptions, 
         setDoc, deleteDoc, Query, getDocs, QuerySnapshot, query, where,
         collectionGroup,
         orderBy,
         updateDoc, } from 'firebase/firestore'
import * as FBUtil from './fb_util'


const app : FirebaseApp = FBUtil.get_app()
export const db = getFirestore(app)
connectFirestoreEmulator(db,'localhost',8088)

enum FIELD_TYPES {
  DIRECT, DATA, REF
}
const converter = (t, mapping) => {
  return {
    toFirestore(o : typeof t): DocumentData {
      let r = {}
      Object.keys(mapping).forEach(key => {
        //if (o[key]) {
          switch (mapping[key].type) {
            case FIELD_TYPES.DATA:
              r[mapping[key].key] = o[key]
              break;
            case FIELD_TYPES.REF:
              console.log('o key',o[key])
              r[mapping[key].key] = o[key]
              break;
          }
        //}
      })
      return r
    },
    fromFirestore(
      snapshot: DocumentSnapshot,
      options: SnapshotOptions
    ): typeof t {
      let r = new t()
      let data = snapshot.data()
      Object.keys(mapping).forEach(key => {
        switch (mapping[key].type) {
          case FIELD_TYPES.DATA:
            r[key] = data[mapping[key].key]
            break;
          case FIELD_TYPES.DIRECT:
            r[key] = snapshot[mapping[key].key]
            break;
          case FIELD_TYPES.REF:
            //console.log('ref?',mapping[key].cls)
            r[key] = getDoc(data[mapping[key].key].withConverter(mapping[key].cls.CONVERTER))
        }
      })
      return r
    }
  }
}





export class Org {

  public static readonly COLLECTION_NAME : string = 'organization'
  private static FIELD_MAPPING = {
    ID: { type: FIELD_TYPES.DIRECT, key: 'id'},
    Name: { type: FIELD_TYPES.DATA, key: 'name'},
    DomainSuffix: { type: FIELD_TYPES.DATA, key: 'domain'},
    Ref: { type: FIELD_TYPES.DIRECT, key: 'ref'},
  }
  public static CONVERTER = converter(Org,this.FIELD_MAPPING)

  Name : string = ''
  DomainSuffix : string = ''
  Locations : Locations = []
  Members : Members = []
  ID : string = ''
  Ref : DocumentReference

  constructor() {}
  public async init(dr? : DocumentReference, id?: string, cb?: CallableFunction, 
    shallow: boolean = false) : Promise<Org> {
    if (dr || id) {
      if (id && !dr) dr = doc(db,Org.COLLECTION_NAME,id)
      //console.log(dr)
      let o : DocumentSnapshot<Org> = (await getDoc(dr.withConverter(Org.CONVERTER))).data()
      let fields = ['ID','DomainSuffix','Name','Ref']
      fields.forEach(element => {
        this[element] = o[element]
      })
      
    } else  {
      // new 
      let nr = await addDoc(collection(db, 
        Org.COLLECTION_NAME).withConverter(Org.CONVERTER),this)
      console.log('nr (new)',nr)
      let o : DocumentSnapshot<Org> = (await getDoc(nr.withConverter(Org.CONVERTER))).data()
      console.log('new',o)
      let fields = ['ID','DomainSuffix','Name','Ref']
      fields.forEach(element => {
        this[element] = o[element]
      })
    }
    //load locations
    this.Locations = await Locations.load_for_org(this)
    //load locations
    this.Members = await Members.load_for_org(this)

    return this
  }
  public async save() {
    await setDoc(this.Ref.withConverter(Org.CONVERTER),this)

  }
  public async delete() {
    console.log(this.Ref)
      await deleteDoc(this.Ref)
  } 
}
export class Orgs extends Array<Org> {
  public async search(q? : Query) : Promise<void> {
    let qs : QuerySnapshot = await getDocs(collection(db,Org.COLLECTION_NAME))

    console.log('qs',qs.docs)
    for (let d in qs.docs) {
      let org = new Org()
      org.init(qs.docs[d].ref.withConverter(Org.CONVERTER))
      this.push(org)
    }
    console.log(this)
  }
  public async get_by_member(id: string) : Promise<Orgs> {
    let docs = await getDocs(query(collectionGroup(db, Member.COLLECTION_NAME)
      .withConverter(Member.CONVERTER), where('user', '==', 
        doc(db,User.COLLECTION_NAME,id))))
    for (let i = 0; i < docs.docs.length; i++) {
      let org = new Org()
      await org.init(docs.docs[i].ref.parent.parent)
      //console.log(org)
      this.push(org)
    }
    return this
  }
}
export class Location {

  public static readonly COLLECTION_NAME : string = 'location'
  private static FIELD_MAPPING = {
    ID: { type: FIELD_TYPES.DIRECT, key: 'id'},
    Name: { type: FIELD_TYPES.DATA, key: 'name'},
    Active: { type: FIELD_TYPES.DATA, key: 'active'},
    Ref: { type: FIELD_TYPES.DIRECT, key: 'ref'},
  }
  public static CONVERTER = converter(Location,Location.FIELD_MAPPING)

  Name : string = ''
  ID : string = ''
  Active : boolean = true
  Ref : DocumentReference

  constructor(doc? : DocumentSnapshot) {
    if (doc) {
      return doc.data() as Location
    }
  }
  public async init(dr? : DocumentReference, org_id?: string, cb?: CallableFunction)
          : Promise<Location> {
    if (!(dr || org_id)) {
      throw Error('you must specify a document reference or a org ID')
    }
    if (dr) {

      let loc : DocumentSnapshot<Location> = (await getDoc(dr.withConverter(Location.CONVERTER))).data()
      let fields = Object.keys(Location.FIELD_MAPPING)
      fields.forEach(element => {
        this[element] = loc[element]
      })
      return this
    }

      // new for an org
      let nr = await addDoc(collection(db, 
        Org.COLLECTION_NAME,org_id,Location.COLLECTION_NAME)
            .withConverter(Location.CONVERTER),this)
      console.log('nr (new)',nr)
      let loc : DocumentSnapshot<Location> = (await getDoc(nr.withConverter(Location.CONVERTER)))
            .data()
      console.log('new',loc)
      let fields = Object.keys(Location.FIELD_MAPPING)
      fields.forEach(element => {
        this[element] = loc[element]
      })
    }
    public async save() {
      await setDoc(this.Ref.withConverter(Location.CONVERTER),this)
  
    }
    public async delete() {
      await updateDoc(this.Ref, { active : false})
    }
    public async reactivate() {
      await updateDoc(this.Ref, { active : true})
    }
    
  }

export class Locations extends Array<Location> {
  public static load_for_org = async (org: Org) : Promise<Locations> => {
    let r = new Locations()
    const col = collection(db,org.Ref.path,Location.COLLECTION_NAME)
              .withConverter(Location.CONVERTER)
    let qr : QuerySnapshot = await getDocs(col)
    qr.docs.forEach(result => r.push(new Location(result)))
    return r
  }
}

export class User {
  public static readonly COLLECTION_NAME : string = 'user'
  private static FIELD_MAPPING = {
    ID: { type: FIELD_TYPES.DIRECT, key: 'id'},
    Nickname: { type: FIELD_TYPES.DATA, key: 'nickname'},
    Ref: { type: FIELD_TYPES.DIRECT, key: 'ref'},
  }
  public static CONVERTER = converter(Org,this.FIELD_MAPPING)

  ID: string = ''
  Nickname: string = ''
  Ref: DocumentReference
}

export class Member {
  public static readonly COLLECTION_NAME : string = 'member'
  private static FIELD_MAPPING = {
    ID: { type: FIELD_TYPES.DIRECT, key: 'id'},
    User: { type: FIELD_TYPES.REF, key: 'user', cls: User},
    IsOwner: { type: FIELD_TYPES.DATA, key: 'owner'},
    Ref: { type: FIELD_TYPES.DIRECT, key: 'ref'},
  }
  public static CONVERTER = converter(Member,this.FIELD_MAPPING)

  User : User
  ID : string = ''
  IsOwner : boolean
  Ref : DocumentReference

  constructor(doc? : DocumentSnapshot) {
    if (doc) {
      return doc.data() as Member
    }
  }
  public async init(dr? : DocumentReference, org_id?: string, cb?: CallableFunction)
        : Promise<Member> {
    console.debug('Member.init')
    if (!(dr || org_id)) {
      throw Error('you must specify a document reference or a org ID')
    }
    if (dr) {

      let loc : DocumentSnapshot<Member> = (await getDoc(dr.withConverter(Member.CONVERTER))).data()
      console.log('loc pre mapping',loc)
      let fields = Object.keys(Member.FIELD_MAPPING)
      fields.forEach(element => {
        this[element] = loc[element]
      })
      return this
    }

    // new for an org
    let nr = await addDoc(collection(db, 
      Org.COLLECTION_NAME,org_id,Member.COLLECTION_NAME)
          .withConverter(Member.CONVERTER),this)
    console.log('nr (new)',nr)
    let loc : DocumentSnapshot<Member> = (await getDoc(nr.withConverter(Member.CONVERTER)))
          .data()
    console.log('new',loc)
    let fields = Object.keys(Member.FIELD_MAPPING)
    fields.forEach(element => {
      this[element] = loc[element]
    })
    }
    public async promote() {
      await updateDoc(this.Ref.withConverter(Member.CONVERTER),{owner:true})
    }
    public async demote() {
      await updateDoc(this.Ref.withConverter(Member.CONVERTER),{owner:false})
    }
    public async revoke() {
      console.log(this.Ref)
        await deleteDoc(this.Ref)
    }

}
export class Members extends Array<Member> {
  public static load_for_org = async (org: Org) : Promise<Members> => {
    let r = new Members()
    const col = collection(db,org.Ref.path,Member.COLLECTION_NAME)
              .withConverter(Member.CONVERTER)
    let qr : QuerySnapshot = await getDocs(col)
    await qr.docs.forEach(async result => {
      await result.data().User
      r.push(new Member(result))
    })
    return r
  }

}

