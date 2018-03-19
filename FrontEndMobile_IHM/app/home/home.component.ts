import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { UserService } from "../shared/user/user.service";
import { User } from "../shared/user/user";
import { Router , ActivatedRoute, NavigationExtras} from "@angular/router";
import { InfoService } from "../shared/info/info.service";
import { Info } from "../shared/info/info";
import { TabView, SelectedIndexChangedEventData } from "ui/tab-view";

//import { registerElement } from "nativescript-angular/element-registry";
//registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);

@Component({
    selector: "Home",
    moduleId: module.id,
    providers : [UserService, InfoService],
    templateUrl: "./home.component.html",
    styleUrls: ["./home.css"]
})
export class HomeComponent implements OnInit {

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
        this.route.queryParams.subscribe(params =>{
            this.access_token= params["access_token"],
            this.refresh_token = params["refresh_token"],
            this.expires = params["expires"]

    });
    
    /*setInterval(() => {
        this.userService.refreshLogin(this.refresh_token)
        .map(response => 
            {
             response = response.json();
             this.access_token = response.access_token;
             //this.refresh_token = response.refresh_token;
             this.expires = response.expires_in;
             console.log("miaw "+this.expires);
            })
          .do(data => {
         
        
        
        //Config.token = data.access_token
      })
          .subscribe(
            
            (res) =>
           {
          
              
           // this.router.navigate(["/home"],navigationExtras);
            
           },
           
            (error) => this.router.navigate(["/login"])
          );
    }, 1000*this.expires);*/
    

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
       
        //(error) => this.router.navigate(["/login"])
      );
    }
    public constructor(private router:Router,private route:ActivatedRoute,private userService: UserService,private infoService: InfoService)
    {  
        
     
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
    fabTap()
    {
        
    }
}
