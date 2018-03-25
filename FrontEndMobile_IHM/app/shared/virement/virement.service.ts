
import { Injectable, OnInit } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpHeaders, HttpClientModule,HttpClient } from '@angular/common/http';


import { Virement } from "./virement";


@Injectable()
export class VirementService implements OnInit {
    v1 : Virement;
    v2 : Virement;
    v3 : Virement;
    
ngOnInit()
{
    this.v1 =new Virement("14/05/2018","Mohamed Hammi","Amel Azi",4000,"bye bye","validé");
    this.v2 =new Virement("14/05/2018","Mohamed Hammi","Amel Azi",5000,"bye bye","validé");
    this.v3 =new Virement("14/05/2018","Mohamed Hammi","Amel Azi",4000,"bye bye","validé");
    this.Virements = new Array<Virement>();
    this.Virements.push(this.v1,this.v2,this.v3);

}
public Virements : Array<Virement>;
constructor(private http: Http) {


}

}