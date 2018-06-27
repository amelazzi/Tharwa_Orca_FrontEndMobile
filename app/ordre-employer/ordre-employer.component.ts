import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, NavigationExtras } from "@angular/router";
import { EventData } from "data/observable";
import { Employer } from '../shared/Employer/Employer';
import { OrdreVirement } from '../shared/ordreVirement/ordreVirement';
import { EmployerService } from '../shared/employer/employer.service';
import { error } from 'util';

@Component({
  moduleId: module.id,
  selector: 'app-ordre-employer',
  templateUrl: './ordre-employer.component.html',
  styleUrls: ['./ordre-employer.component.css'],
  providers : [Employer, OrdreVirement, EmployerService]
})
export class OrdreEmployerComponent implements OnInit {

  employerArray: Array<Employer> = new Array<Employer>();
  employer: Employer;
  ordreVirement: OrdreVirement;
  getId: number = 0;

  create: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private employerService: EmployerService) {
    this.ordreVirement = new OrdreVirement();
    this.employerArray = [];
  }

  ngOnInit() {
      this.route.queryParams.subscribe((params) => {
        this.ordreVirement.nbrEmployer = params["'nbrEmployer'"];
        // this.employerArray = params ["'employers'"];
        this.create = params["'create'"];
      });
      if (this.create) {
        let i = 0;
        while (i < this.ordreVirement.nbrEmployer) {
          this.employer = new Employer();
          this.employer.nom = "Employer" + i;
          this.employer.numCompte = i;
          this.employer.montant = "0.00";
          this.employerArray.push(this.employer);
          i++;
        }
      } else {
        console.log("welcome home");
        this.route.queryParams.subscribe((params) => {
          this.employerArray = params ["'employers'"];
          let i = 0;
          while (i < this.employerArray.length) {
            this.employer = new Employer();
            this.employer.nom = "Employer" + i;
            this.employer.numCompte = i;
            this.employer.montant = "0.00";
            this.employerArray[i] = this.employer;
            i++;
          }
          this.getId = params ["'idItem'"];
          this.employer = new Employer();
          this.employer.nom = params["'nom'"];
          this.employer.prenom = params["'prenom'"];
          this.employer.numCompte = params["'numCompte'"];
          this.employer.montant = params["'montant'"];
          this.employerArray[this.getId] = this.employer;
          console.log("Id afteeer going back" + this.getId);
        });
      }
  }

  next(args: EventData) {
    this.getId = args.object.get("id");
    console.log("here is the id" + this.getId);
    let navigationExtras: NavigationExtras;
    navigationExtras = {
        queryParams: {
            "'id'": this.getId,
            "'size'": this.ordreVirement.nbrEmployer,
            "'employers'": this.employerArray
        }
    };
    this.router.navigate(["/employer"], navigationExtras);
  }

  valider() {
    this.employerService.createOrdreVirement("Vk5sdkIaq5fAnhepbrXOndqFtRscTXrVQWPUKX5bjAKsZAI4UJSpEKItNEoBJdsgECrVCHTCOohIozlsuugwnD3wKnRtYOtnZBJ14NGwZH4Ya6TnOpfSWbo5Bxvh4ybjI1385jHklEDfsqoSwLstQv792W7E6ENA3klObi4QrMExjbEPOJUbmUX5j6uwT36MM87zNIjXqOW6c3GKaXGANvQ9HOCaX2eNaDQtySq5iJv5dvUJgnQodrN7GYXVpxq", this.employerArray, this.ordreVirement.titre)
    .subscribe(
      (response) => {
        response = response.json();
        console.log("NUM ordre de virement " + response["num"]);
      },
      (error) =>{}
    );
    console.log("hello you have clicked in valider button");
  }

}
