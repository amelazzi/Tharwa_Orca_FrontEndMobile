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
import { VirementService } from '../shared/virement/virement.service';
import { Virement } from '../shared/virement/virement';

@Component({
    moduleId: module.id,
    selector: 'Historique',
    templateUrl: './historique.component.html',
    providers : [UserService, InfoService,VirementService],
    styleUrls: ['./historique.css']
})
export class HistoriqueComponent implements OnInit {

    @ViewChild('scrollView') scrollView: ElementRef;

    public virements: Array<Virement>;

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
    private v1: Virement;
    private v2 : Virement;
    private v3 : Virement;
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.v1 =new Virement("14/05/2018","Mohamed Hammi","Amel Azi",4000,"bye bye","validé");
        this.v2 =new Virement("14/05/2018","Mohamed Hammi","Amel Azi",5000,"bye bye","validé");
        this.v3 =new Virement("14/05/2018","Mohamed Hammi","Amel Azi",4000,"bye bye","validé");
        this.virements = new Array<Virement>();
        this.virements.push(this.v1,this.v2,this.v3);
        console.log(this.v1.dateV);
    }
    public constructor(private router:Router,private route:ActivatedRoute,private userService: UserService,private infoService: InfoService,private virementService : VirementService)
    {  
        
     
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }



}
