import { Component, OnInit } from '@angular/core';
import { OrdreVirement } from '../shared/ordreVirement/ordreVirement';
import { Router, NavigationExtras } from "@angular/router";
import * as dialogs from "ui/dialogs";

@Component({
  moduleId: module.id,
  selector: 'app-ordre-virement',
  templateUrl: './ordre-virement.component.html',
  styleUrls: ['./ordre-virement.component.css'],
  providers : [OrdreVirement]
})
export class OrdreVirementComponent implements OnInit {

  ordreVirementArray: Array<OrdreVirement> = new Array<OrdreVirement>();
  ordreVirement1: OrdreVirement;
  ordreVirement2: OrdreVirement;
  ordreVirement: OrdreVirement;

  create: boolean = false;

  constructor(private router: Router) {
    this.ordreVirement = new OrdreVirement();
    this.ordreVirement1 = new OrdreVirement();
    this.ordreVirement1.id = "20182406";
    this.ordreVirement1.titre = "ordre virement 1";
    this.ordreVirement1.nbrEmployer = 18;

    this.ordreVirement2 = new OrdreVirement();
    this.ordreVirement2.id = "20182506";
    this.ordreVirement2.titre = "ordre virement 2";
    this.ordreVirement2.nbrEmployer = 6;
    this.ordreVirementArray = [this.ordreVirement1, this.ordreVirement2];
  }

  ngOnInit() { }

  addOrdreVirement() {
    dialogs.prompt({
        title : "Ajouter Ordre Virement",
        message: "Veuillez saisir le nombre d'employer",
        okButtonText: "CONFIRMER",
        cancelButtonText: "ANNULER",
        inputType: dialogs.inputType.text
    }).then((res) => {
        if (res.text != "") {
          if (this.isNumber(res.text)) {
            this.ordreVirement.nbrEmployer = Number(res.text);
            this.ordreVirement.titre = "ordre virement" + res.text;
            this.create = true;
            this.addEmployers();
          } else {
            alert("Veuillez saisir un nombre");
          }
        } else {
          alert("Veuillez remplir le champs");
        }
        console.log("Dialog result: " + res.result + ", text: " + res.text);
      });
  }

  isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }

  addEmployers() {
    let navigationExtras: NavigationExtras;
    navigationExtras = {
        queryParams: {
            "'titre'": this.ordreVirement.titre,
            "'nbrEmployer'": this.ordreVirement.nbrEmployer,
            "'create'": this.create
        }
    };
    this.router.navigate(["/ordreEmployer"], navigationExtras);
  }

}
