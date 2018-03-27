import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { UserService } from "../shared/user/user.service";
import { User } from "../shared/user/user";
import { Router , ActivatedRoute, NavigationExtras} from "@angular/router";
import { InfoService } from "../shared/info/info.service";
import { Info } from "../shared/info/info";
import { TabView, SelectedIndexChangedEventData } from "ui/tab-view";

import { registerElement } from "nativescript-angular/element-registry";
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);

@Component({
    selector: "Profile",
    moduleId: module.id,
    providers : [UserService, InfoService],
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.css"]
})
export class ProfileComponent implements OnInit {

    refresh_token;
    access_token;
    expires;
    user: User;
    info: Info;

    public students = ["Courant", "Epargne", "Devise Euro", "Devise Dollar"];
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
        this.route.queryParams.subscribe(params =>{
            this.access_token= params["access_token"],
            this.refresh_token = params["refresh_token"],
            this.expires = params["expires"]

    });
    this.infoService.demanderInfo(this.info,this.access_token)
    .map(response => 
        {
         response = response.json();
         
         console.log("miaw2 :"+JSON.stringify(response));
        })
      .do(data => {
     
    
    
    //Config.token = data.access_token
  })
      .subscribe(
        
        (res) =>
       {
      
          
       // this.router.navigate(["/home"],navigationExtras);
        
       },
       
      //  (error) => this.router.navigate(["/login"])
      );
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
