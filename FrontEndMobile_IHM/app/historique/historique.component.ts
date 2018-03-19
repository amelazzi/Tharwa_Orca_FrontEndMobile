import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { SetupItemViewArgs } from "nativescript-angular/directives";

@Component({
    moduleId: module.id,
    selector: 'ns-historique',
    templateUrl: './historique.component.html',
    styleUrls: ['./historique.css']
})
export class HistoriqueComponent implements OnInit {

    @ViewChild('scrollView') scrollView: ElementRef;

    public students = ["Amel AZZI", "Yasmine BOUDJELI", "Lotfi IKHADALEM", "Nawal KERKAR", "Meriem MEGUELATI"];

    private isLoading = false;

    constructor(
        private router: RouterExtensions,
    ) { }

    ngOnInit() { }

}
