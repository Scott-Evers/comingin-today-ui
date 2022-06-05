import { Query, collectionGroup, CollectionReference, doc, DocumentReference, 
      where, DocumentData , getDocs, collection} from 'firebase/firestore'
import Document, { db } from './document'
  
export class OrgUser extends Document {
  constructor() {
    super('user')
  }
}
export class OrgUsers extends Array<Location> {}

export class Member extends Document {
  constructor(org?: Organization) {
    let path = ''
    if (org) path = org.ref.path
    super(`${path}/member`)
  }
}
export class Members extends Array<Member> {}

export class Organization extends Document {
  Members : Members
  Locations : Locations
  constructor() {
    super('organization')
    super.Data = {
      created: new Date().toISOString(),
      name: 'new',
      domain: '',
    }
  }

  public static async create_org(user_id: string) : Promise<Organization> {
    // create an empty organization
    let o = new Organization()
    o = await o.save()
    console.log('o.ref.path',o.ref.path)
    let member = new Member(o)
    member.Data = {
      user: doc(db,'user',user_id),
      owner: true
    }
    await member.save()
    let location = new Location(o)
    location.Data = {
      name: 'Headquarters',
      created: new Date().toISOString()
    }
    await location.save()
    o.Locations = [location]
    o.Members = [member]

    return o
  }
  
  public async save() : Promise<Organization> {
 
    return await super.save() as Organization;
  }
  public static async load(ref : DocumentReference) : Promise<Organization>{
    let o : Organization = await super.load(ref) as Organization
    o.Locations = await Locations.load(o.ref)
    return o
  }
}
export class Organizations extends Array<Organization> {
  public static async memberships(user_id: string) : Promise<Organizations> {
    let user = OrgUser.get_ref_by_id('user',user_id)
    let m = new Member()
    let qs = await m.search([where('user', '==', user)])
    let orgs = new Organizations()
    for (let i = 0; i < qs.docs.length; i++) {
      let org = await Organization.load(qs.docs[i].ref.parent.parent)
      //org.Data['owner'] = await qs.docs[i].data().owner
      orgs.push(org as Organization)
    }
    return orgs
  }
}

export class Location extends Document {
  constructor(org: Organization) {
    super(`${org.ref.path}/location`)
  }

  public async save() : Promise<Location> {
    
    return super.save()

  }}
export class Locations extends Array<Location> {
  public static async load(org_ref : DocumentReference) : Promise<Locations> {
    const col : CollectionReference = collection(db,`${org_ref.path}/location`)
    let q : Query<DocumentData> = collectionGroup(db,col.id)
    let docs = await getDocs(q)
    console.log('docs',docs)
    return new Locations()
  }
}
