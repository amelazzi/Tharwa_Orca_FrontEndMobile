import { Component, OnInit , ViewChild, AfterViewInit , Output, EventEmitter } from "@angular/core";
import { Location } from "@angular/common";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";
import { User } from "../shared/user/user";
import { UserService } from "../shared/user/user.service";
import { Router , NavigationExtras } from "@angular/router";
import {Page} from "ui/page";
import { Page2Component } from "../rpage2/page2.component";



@Component  
({
    moduleId: module.id,
    selector: "ns-register",
     providers : [UserService],
    templateUrl: "./register.component.html",
    styleUrls:["./register.css"]
})
export class RegisterComponent implements OnInit{
   public user: User;
   public 
  ngOnInit() {
    this.page.actionBarHidden = true;
    this.user = new User(0);
    this.user.firstname = "Mohamed";
    this.user.lastname = "Hammi";
    this.user.email = "em_hammi@test.dz";
    this.user.password = "orca@2018";
  }
  public static us : User;
    public constructor(private location: Location,private router: Router, private userService: UserService,private page: Page) {
     this.user = new User(1);
    }
    public getUser()
    {
        return this.user;
    }
 
    public setUser(user: User)
    {
        this.user = user;
    }
  public register() {
        if(this.user.firstname && this.user.lastname && this.user.email && this.user.password &&
        this.user.job && this.user.phone && this.user.address) 
        {
        this.userService.register(this.user).subscribe(
           () => {
              alert("Your account was successfully created.");
              this.location.back();
            },
          error => alert("Unfortunately we were unable to create your account.")
          );
        }
        else    
        {
            alert("lazem All.");
        }
      }

    public goBack() {
        this.location.back();
    }
    public  goSuivant()
    {
       
        let navigationExtras : NavigationExtras = {
            queryParams: {
                "firstname":this.user.firstname,
                "lastname":this.user.lastname,
                "email": this.user.email,
                "password": this.user.password
            }
        }
        this.router.navigate(["/page2"],navigationExtras);
        
    }
  
   /* public takePic()
    {
        var camera = require("nativescript-camera");
        var imageModule = require("ui/image");
        camera.takePicture().then(function (imageAsset) {
        console.log("Result is an image asset instance");
        var image = new imageModule.Image();
        image.src = imageAsset;
        this.user.picture = image;
    }).catch(function (err) {
        console.log("Error -> " + err.message);
    });
    
    }
*/
private validateEmail(email: any) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

}