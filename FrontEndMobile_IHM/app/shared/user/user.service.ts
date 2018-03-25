
import { Injectable, OnInit } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpHeaders, HttpClientModule,HttpClient } from '@angular/common/http';


import { User } from "./user";
import { Config } from "../config";

@Injectable()
export class UserService implements OnInit {
ngOnInit()
{

}
constructor(private http: Http) {}
authentifier(user :User,code:string)
{
  var headers = new Headers();

  headers.append("Content-Type", "application/x-www-form-urlencoded");
  //headers.append("Authorization","Basic Y2xpZW50bW9iaWxlOm9yY2FAMjAxOA==");    

  const body = "userId=" + user.email + "&Pwd=" + user.password + "&code=" + code;

  return this.http.post('https://auththarwa.cleverapps.io/oauth/code',body, {headers: headers})
  .catch(this.handleErrors);
}
sendCode(username :string ,code: string)
{
  console.log("user is "+ username +"code is "+ code);
  var headers = new Headers();

  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Authorization","Basic Y2xpZW50bW9iaWxlOm9yY2FAMjAxOA==");

  const body = "grant_type=password&username=" + username + "&password=" + code

  return this.http.post('https://auththarwa.cleverapps.io/oauth/login',body, {headers: headers})
  .catch(this.handleErrors);
}
refreshLogin(refresh_token){
  var headers = new Headers();

  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Authorization","Basic Y2xpZW50bW9iaWxlOm9yY2FAMjAxOA=="); 

  const body = "grant_type=refresh_token&refresh_token=" + refresh_token

  return this.http.post('https://auththarwa.cleverapps.io/oauth/refresh',body, {headers: headers})
  .catch(this.handleErrors);
}

  register (user: User){
    var headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("token","1g1CMMMZydA4YT3GWHTiC9d5PjdxsD7Z8nL6jNdpBzOJYSOj6LC0ZWUslHxeuDXmPh6MPRDiSUxY2L9ZBay4JirDlTxwVZcGbmdwAftaKK6B5DbDZMCbLRATjCDTwxcRb1bXVzqLSCeWdpym0eJ61bgxNpI3FkFQZPVEwa7hOFCklxNgXoFR7F6X5GHSkA0bupdCo5hzji8khXIz4ly8fyC3mq3FgcOu8Ogfhw9nGxt1r72V2PGy4EI3Tt0SiQr");
    
    const body = "avatar=" + user.picture + "&userId=" + user.email + "&UserName=Test&Pwd=" + user.password + "&Tel=" + user.phone + "&type=0&Nom=" + user.firstname + "&Prenom" + user.lastname
    + "Adresse=" + user.address + "Fonction=" + user.job;
  
    return this.http.post('http://192.168.0.123:8080/users/ClientInscription',body, {headers: headers})
    .catch(this.handleErrors);
  }
  login(user: User) {
    return this.http.post(
      Config.apiUrl,
      JSON.stringify({
        grant_type: "password",
        username: user.email,
        password: user.password
      }),
      { headers: this.getCommonHeaders() }
    )
    .map(response => response.json())
    .do(data => {
      
      Config.token = data._kmd.authtoken
    })
    .catch(this.handleErrors);
    
    //localStorage.setItem('blur','true');
  }

  getCommonHeaders() {
    let headers = new Headers();
   headers.append("Content-Type", "application/x-www-form-urlencoded");
   headers.append("Authorization","Basic c0xPUEthRXNDc0JoTmRzVGdRTExJVDlZeVpVU1FveVJ1bW5VcmI0NFAzdURsaWNZdHY1MVkxazlCdHpVNGVIVzpjMHhQVUV0aFJYTkRjMEpvVG1SelZHZFJURXhKVkRsWmVWcFZVMUZ2ZVZKMWJXNVZjbUkwTkZBemRVUnNhV05aZEhZMU1Wa3hhemxDZEhwVk5HVklWenB3VHpaSE5raHBkRkYzVldWSE9FNXZhMjl2VkZwVFNWaElSV1ZpZEhoUFRtbGxibE5FU2xkcFoxazJlbUo1YW0xeU1VOVNUSEo1Y210dWJHMVhVM1pZ");    
    return headers;
  }

  handleErrors(error: Response) {
  
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}