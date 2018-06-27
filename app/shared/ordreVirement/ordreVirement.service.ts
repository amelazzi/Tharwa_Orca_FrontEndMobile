import { Injectable, OnInit } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable()
export class OrdreVirementService implements OnInit {

    constructor() {}

    ngOnInit() {}
}