import { Injectable, OnInit } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { Employer } from "../employer/employer";

@Injectable()
export class EmployerService implements OnInit {

    constructor(private http: Http) {}

    ngOnInit() {}

    createOrdreVirement(accessToken: string, employerArray: Array<Employer>, titre: string) {
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("token", accessToken);
        const body = "data=" + JSON.stringify(employerArray) + "&titre=" + titre;
        return this.http.post("http://192.168.137.1:8088/ordreVirement/creation", body, {headers: headers});
    }
}