import { Component , OnInit ,ViewChild, Input,AfterViewInit, NgZone} from "@angular/core";
import { Location } from "@angular/common";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";
import { User } from "../shared/user/user";
import { UserService } from "../shared/user/user.service";
import { Router , ActivatedRoute } from "@angular/router";
import { Page } from "ui/page";
import { RegisterComponent } from "../register/register.component";
import * as Camera from "nativescript-camera";
import * as bghttp from "nativescript-background-http";
import { isIOS } from "platform";
import { session, Session } from "nativescript-background-http";
import * as camera from "nativescript-camera";
import { first } from 'lodash';
import {Subject} from "rxjs/Subject";
import {isAndroid} from "tns-core-modules/platform";
import * as fs from "file-system";
import * as imageSource from "image-source";

@Component
({
    moduleId: module.id,
    selector: "ns-page2",
    providers : [UserService],
    templateUrl: "page2.component.html",
    styleUrls: ["./page2.css"]
})
export class Page2Component implements OnInit{
    public images: Array<string>;
    private UploadSession: Session;
     user: User ;
     usedId: number= 0;
     picture: any;
  
    file: string;
    url: string;
    counter: number;
    session: any;
    public type : string;
    path:string;
ngOnInit(){   
 
    this.page.actionBarHidden = true; 
    this.picture = "https://placehold.it/100x100";
    this.user = new User(0);
    this.route.queryParams.subscribe(params =>{
    this.user.firstname = params["firstname"], 
    this.user.lastname = params["lastname"], 
    this.user.email = params["email"],
    this.user.password = params["password"]
        });

}

    public constructor(private location: Location,private router: Router, private userService: UserService
        ,private page: Page, private route:ActivatedRoute) {
            this.UploadSession = session('image-upload');
    }  

    public goBack() {
        this.location.back();
    }

   
    public register() 
    {
        this.router.navigate(["/home"]);

    }
    
    public goSuivant()
    {
        this.router.navigate(["/page2"]);
    }
    
    
    private validateEmail(email: any) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    cameraOpen(){
        camera.requestPermissions();
        camera
            .takePicture({
                saveToGallery: true,
                cameraFacing: 'front'
            })
            .then(imageAsset => {
                let image : any;
                if(isAndroid){
                    image = <any>{
                        fileUri: imageAsset.android
                    };

                    this.uploadMultipartImagePicker(image)
                        .subscribe({
                            next: (e) => {
                                console.log(`Upload: ${(e.currentBytes / e.totalBytes) * 100}`)
                            },
                            error: (e) => {
                                console.log(JSON.stringify(e));
                            },
                            complete: () => {
                                console.log("complete");
                            }
                        });
                }
                else {

                    let source = new imageSource.ImageSource();
                    source.fromAsset(imageAsset)
                        .then(imageSource => {
                            let folder = fs.knownFolders.documents();
                            let path = fs.path.join(folder.path, "Temp"+Date.now()+".jpg");
                            let saved = imageSource.saveToFile(path, "png");
                            console.log(saved);
                            if(saved){
                                this.uploadMultipartImagePicker({fileUri: path})
                                    .subscribe({
                                        next: (e) => {
                                            console.log(`Upload: ${(e.currentBytes / e.totalBytes) * 100}`)
                                        },
                                        error: (e) => {
                                            console.log(JSON.stringify(e));
                                        },
                                        complete: () => {
                                            console.log("complete");
                                        }
                                    });
                            }
                        });
                }
            })
            .catch(function (err) {
                console.log("Error -> " + err.message);
            });
    }



 private uploadMultipartImagePicker(image: any): Subject<any> 
 {
     alert("Trying To upload");
        let fileUri = image.fileUri;
        let filename = fileUri.substring(fileUri.lastIndexOf('/')+1);
        let mimetype = filename.substring(filename.lastIndexOf('.')+1);
        let uploadType;
        let request;
        uploadType = "image";
            request = {
                url: "http://192.168.43.113:4000/users/ClientInscription",
                method: 'POST',
                headers: {
                    "Content-Type": "application/octet-stream",
                    "File-Name": filename
                },
                description: `Uploading ${filename}`
        };
        
        let params = [            
        {name: "userId", value:this.user.email},
        {name: "Nom", value: this.user.lastname},
        {name:"Prenom",value:this.user.firstname},
        {name:"UserName",value:"Test11898"},
        {name:"Pwd",value:"orca@2018"},
        {name:"Tel",value:"0668985879"},
        {name:"type",value:"0"},
        {name:"Adresse",value:"Alger"},
        {name:"Fonction",value:"Worker"},
        {name: filename, filename: fileUri, mimeType: `${uploadType}/${mimetype}` }];
        console.log(JSON.stringify(params));

        let subject = new Subject<any>();
        let task = this.UploadSession.multipartUpload(params, request);
        task.on('progress', (e: any) => subject.next(e));

        task.on('error', (e) => subject.error(e));

        task.on('complete', (e) => subject.complete());

        return subject;
    }
}