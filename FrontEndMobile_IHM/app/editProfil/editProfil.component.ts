import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { RouterExtensions } from 'nativescript-angular/router'

@Component({
    moduleId: module.id,
    selector: 'ns-editProfil',
    templateUrl: './editProfil.component.html',
    styleUrls: ['./editProfil.css']
})
export class EditProfilComponent implements OnInit {

    private isLoading = false;

    constructor(
        private router: RouterExtensions,
    ) { }

    ngOnInit() { }

}
