import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, NavigationExtras } from "@angular/router";
import { Employer } from '../shared/Employer/Employer';
import * as dialogs from "ui/dialogs";
import { OrdreVirement } from '../shared/ordreVirement/ordreVirement';

@Component({
  moduleId: module.id,
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css'],
  providers : [Employer, OrdreVirement]
})
export class EmployerComponent implements OnInit {

  employerArray: Array<Employer> = new Array<Employer>();
  employer: Employer;
  idItem: number = 0;
  size: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.employerArray = [];
    this.employer = new Employer();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.idItem = params["'id'"];
      this.size = params["'size'"];
      let i = 0;
      while (i < this.size) {
        this.employerArray[i] = params["'employers'"][i];
        console.log("frooooom here" + params["'employers'"][i].nom);

        i++;
      }
      console.log("frooooom here" + this.idItem);
    });
   }

  goSuivant() {
    dialogs.confirm("voullez-vous vraiment ajouter cet employer?").then((result) => {
      if (result) {
        console.log("Dialog result: " + result);
        if ((this.employer.nom) && (this.employer.prenom) && (this.employer.numCompte) && (this.employer.montant)) {
          if (this.isNumber(this.employer.montant)) {
            let navigationExtras: NavigationExtras;
            navigationExtras = {
                queryParams: {
                  "'nom'": this.employer.nom,
                  "'prenom'": this.employer.prenom,
                  "'numCompte'": this.employer.numCompte,
                  "'montant'": this.employer.montant,
                  "'employers'": this.employerArray,
                  "'idItem'": this.idItem,
                  "'size'": this.size
                }
            };
            this.router.navigate(["/ordreEmployer"], navigationExtras);
          } else {
            alert("Veuillez saisir un NOMBRE pour le MONTANT");
          }
        } else {
          alert ("Veuillez remplir tous les champs");
        }
      }
    });
  }

  isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }

}
