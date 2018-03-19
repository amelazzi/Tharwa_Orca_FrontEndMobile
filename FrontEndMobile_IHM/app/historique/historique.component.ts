import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { SetupItemViewArgs } from "nativescript-angular/directives";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { UserService } from "../shared/user/user.service";
import { User } from "../shared/user/user";
import { Router , ActivatedRoute, NavigationExtras} from "@angular/router";
import { InfoService } from "../shared/info/info.service";
import { Info } from "../shared/info/info";
import { TabView, SelectedIndexChangedEventData } from "ui/tab-view";

@Component({
    moduleId: module.id,
    selector: 'Historique',
    templateUrl: './historique.component.html',
    providers : [UserService, InfoService],
    styleUrls: ['./historique.css']
})
export class HistoriqueComponent implements OnInit {

    @ViewChild('scrollView') scrollView: ElementRef;

    public students = ["Amel AZZI", "Yasmine BOUDJELI", "Lotfi IKHADALEM", "Nawal KERKAR", "Meriem MEGUELATI"];

    private isLoading = false;
    refresh_token;
    access_token;
    expires;
    user: User;
    info: Info;
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    public cpt = 0;
    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();

    
    }
    public constructor(private router:Router,private route:ActivatedRoute,private userService: UserService,private infoService: InfoService)
    {  
        
     
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }



}
