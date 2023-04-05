import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData: any;
  constructor(public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private dbf:AngularFirestore) {
      this.ngFireAuth.authState.subscribe((user) => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
        } else {
          localStorage.setItem('user', "");
          JSON.parse(localStorage.getItem('user')!);
        }
      });
     }


   public getUserByUsernameandPass(email:string,pass:string){
    let b = this.dbf.collection<User>('/users',ref => ref.where("email","==",email).where("password","==",pass).limit(1));
     return b.valueChanges();
   }


  public getUser(id:string){
    let a=new User();
     let af= this.dbf.doc<User>(`users/${id}`);
     af.snapshotChanges().subscribe(arg =>{ 
      a.id=arg.payload.data()!.id;
      a.email=arg.payload.data()!.email;
      a.password=arg.payload.data()!.password;

    });
    return a;
  }
  public getLoggedUser(){
    return this.ngFireAuth.currentUser;
  }

  public login(email:string,pass:string){
    return this.ngFireAuth.signInWithEmailAndPassword(email, pass);
   
  }
   // Reset Forggot password
   ForgotPassword(passwordResetEmail: string) {
    return this.ngFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  async changePass(pass:string){
    let u:any=await this.ngFireAuth.currentUser;
    u.updatePassword(pass);
  }



  public editUser(id:string, pass:string,email:string){
    this.dbf.doc(`users/${id}`).set({
      password: pass,
      email:email
    },{merge:true});
  }

  public async deleteUser(id:string){
   let a:any= await this.ngFireAuth.currentUser;
   a.delete();
  }

  public async createUser(pass:string,email:string){
    const userAuth = await this.ngFireAuth.createUserWithEmailAndPassword(email, pass);
    var user = {
      password: pass,
      email: userAuth.user!.email,
      id: userAuth.user!.uid
  }
  let u=new User();
  u.email=email;
  u.password=pass;
  u.id=userAuth.user!.uid;

  this.SetUserData(user);
  return u;
  }


// Returns true when user is looged in
get isLoggedIn(): boolean {
  const user = JSON.parse(localStorage.getItem('user')!);
  return user !== null ? true : false;
}
// Sign in with Gmail
// GoogleAuth() {
//   return this.AuthLogin(new auth.GoogleAuthProvider());
// }
// Auth providers
AuthLogin(provider:any) {
  return this.ngFireAuth
    .signInWithPopup(provider)
    .then((result) => {
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      });
      this.SetUserData(result.user);
    })
    .catch((error) => {
      window.alert(error);
    });
}
// Store user in localStorage
SetUserData(user:any) {
  const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
    `users/${user.id}`
  );
  const userData: User = {
    id: user.id,
    email: user.email,
    password: user.password,
  };
  return userRef.set(userData, {
    merge: true,
  });
}
// Sign-out
SignOut() {
  return this.ngFireAuth.signOut().then(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoginRegister');
    localStorage.removeItem('rol_Id');
    this.router.navigate(['login']);
  });
}
}
export class User{
  id:string="";
  password:string="";
  email:string="";
 }