import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app"
import { Auth, Dependencies, browserLocalPersistence, initializeAuth, 
  UserCredential, signInWithEmailAndPassword, User } from 'firebase/auth'


export const get_app = (): FirebaseApp => {
  const options: FirebaseOptions = {
    apiKey: 'AIzaSyCiDxZsVg3GR6qY2ZF9KDEvUop5nhOqeaU',
    authDomain: 'comingin-today.firebaseapp.com',
    databaseURL: 'https://comingin-today-default-rtdb.firebaseio.com',
    projectId: 'comingin-today',
    storageBucket: 'comingin-today.appspot.com',
    messagingSenderId: '699269388122',
    appId: '1:699269388122:web:f05364f90172814ab58563'
  }
  const app = initializeApp(options,'comingin')
  //console.log('FIREBASE_APP', app)
  return app
}

export const get_auth = (): Auth => {
  let deps : Dependencies = {
    persistence: browserLocalPersistence
  }

  let auth = initializeAuth(get_app(),deps)
  //console.log('FIREBASE_AUTH',auth)
  return auth
}
export const authenticate_user_passwd = async (auth: Auth, email: string, password: string): Promise<User> => {
  try {
    
    //localStorage.setItem('user',JSON.stringify(user))
    
    let uc: UserCredential = await signInWithEmailAndPassword(auth, email, password)
    return uc.user
  } catch (err) {
    console.error(err)
    return null
  }
}