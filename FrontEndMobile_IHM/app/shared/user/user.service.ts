
import { Injectable, OnInit } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import {Observable} from 'rxjs/Observable';
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import * as FileSystem from "file-system";
import * as BackgroundHttp from "nativescript-background-http";
import * as MD5 from "blueimp-md5";

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

  return this.http.post('https://192.168.101.50:4000/oauth/code',body, {headers: headers})
  .catch(this.handleErrors);
}
sendCode(username :string ,code: string)
{
  console.log("user is "+ username +"code is "+ code);
  var headers = new Headers();

  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Authorization","Basic Y2xpZW50bW9iaWxlOm9yY2FAMjAxOA==");

  const body = "grant_type=password&username=" + username + "&password=" + code

  return this.http.post('https://192.168.101.50:4000/oauth/login',body, {headers: headers})
  .catch(this.handleErrors);
}
refreshLogin(refresh_token){
  var headers = new Headers();

  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Authorization","Basic Y2xpZW50bW9iaWxlOm9yY2FAMjAxOA=="); 

  const body = "grant_type=refresh_token&refresh_token=" + refresh_token

  return this.http.post('https://192.168.101.50:4000/oauth/refresh',body, {headers: headers})
  .catch(this.handleErrors);
}

  register (user: User){
    var headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    //headers.append("token","1g1CMMMZydA4YT3GWHTiC9d5PjdxsD7Z8nL6jNdpBzOJYSOj6LC0ZWUslHxeuDXmPh6MPRDiSUxY2L9ZBay4JirDlTxwVZcGbmdwAftaKK6B5DbDZMCbLRATjCDTwxcRb1bXVzqLSCeWdpym0eJ61bgxNpI3FkFQZPVEwa7hOFCklxNgXoFR7F6X5GHSkA0bupdCo5hzji8khXIz4ly8fyC3mq3FgcOu8Ogfhw9nGxt1r72V2PGy4EI3Tt0SiQr");
    
    const body = "avatar=" + user.picture + "&userId=" + user.email + "&UserName=Test&Pwd=" + user.password + "&Tel=" + user.phone + "&type=0&Nom=" + user.firstname + "&Prenom" + user.lastname
    + "Adresse=" + user.address + "Fonction=" + user.job;
  
    return this.http.post('http://192.168.101.50:4000/users/ClientInscription',body, {headers: headers})
    .catch(this.handleErrors);
  }

  public upload(destination: string, filevar: string, filepath: string) {
    return new Observable((observer: any) => {

        let session = BackgroundHttp.session("file-upload");
        let request = {
            url: destination,
            method: "POST"
        };
        let params = [{ "name": filevar, "filename": filepath, "mimeType": "image/png" }];
        let task = session.multipartUpload(params, request);
        task.on("complete", (event) => {
            let file = FileSystem.File.fromPath(filepath);
            file.remove().then(result => {
                observer.next("Uploaded `" + filepath + "`");
                observer.complete();
            }, error => {
                observer.error("Could not delete `" + filepath + "`");
            });
        });
        task.on("error", event => {
            console.log(event);
            observer.error("Could not upload `" + filepath + "`. " + event.eventName);
        });
    });
}
public list(): Observable<any> {
  return this.http.get("http://192.168.101.50:4000/list")
      .map(result => result.json())
      .map(result => result.filter(s => s.name.substr(s.name.length - 4) == ".png"))
      .map(result => result.map(s => s.name));
}

public remove(index: number,images:Array<String>) {
  this.http.delete("http:/192.168.101.50:4000/delete?filename=" + images[index])
      .map(result => result.json())
      .subscribe(result => {
        images.splice(index, 1);
      });
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