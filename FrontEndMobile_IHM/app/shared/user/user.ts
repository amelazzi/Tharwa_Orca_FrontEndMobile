import { BehaviorSubject } from "rxjs/BehaviorSubject";

export class User {
    id : number;
    email: string;
    passwordConfirm : string;
    password: string;
    firstname: string;
    lastname: string;
    address: string;
    phone;
    job: string;
    picture : any;
   public constructor(userid : number)
   {
     this.id = userid;
   }

  }