import { Component, OnInit, ViewChild, Input, AfterViewInit, NgZone } from "@angular/core";
import { Location } from "@angular/common";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";
import { User } from "../shared/user/user";
import { UserService } from "../shared/user/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Page } from "ui/page";
import { RegisterComponent } from "../register/register.component";
import { isIOS } from "platform";
import { session, Session } from "nativescript-background-http";
import * as camera from "nativescript-camera";
import { first } from 'lodash';
import { Subject } from "rxjs/Subject";
import { isAndroid } from "tns-core-modules/platform";
import * as fs from "file-system";
import * as imageSource from "image-source";
import * as dialogs from "ui/dialogs";

@Component
    ({
        moduleId: module.id,
        selector: "ns-page2",
        providers: [UserService],
        templateUrl: "page2.component.html",
        styleUrls: ["./page2.css"]
    })
export class Page2Component implements OnInit {

    ///////////////////////
    private UploadSession: Session;
    //////////////////////
    user: User;
    usedId: number = 0;
    picture: any;

    file: string;
    url: string;
    counter: number;
    session: any;
    public type: string;
    path: any;
    image: any;
    saved: any;
    ngOnInit() {

        this.page.actionBarHidden = true;
        this.picture = "res://login_logo";
        this.user = new User(0);
        this.route.queryParams.subscribe(params => {
            this.user.firstname = params["firstname"],
                this.user.lastname = params["lastname"],
                this.user.email = params["email"],
                this.user.password = params["password"]
        });
        this.user.address = "7oumma";
        this.user.phone = "045786";
        this.user.job = "khedam";

    }

    public constructor(private location: Location, private router: Router, private userService: UserService
        , private page: Page, private route: ActivatedRoute) {
        this.UploadSession = session('file-upload');
    }

    public goBack() {
        this.location.back();
    }
    public NumCompte;
    public confirmer() {
        dialogs.action({
            title: "Confirmation",
            message: "Veuillez Choisir l'option pour recevoir un code pour confirmer votre authentification ",
            cancelButtonText: "ANNULER",
            actions: ["Particulier", "Employeur"]
        }).then(result => {
            if (result == "Particulier") {
                this.type = "0";
                this.register();
            } else if (result == "Employeur") {
                this.type = "1";
                this.register();
            }
        });
    }
    public register() {
        if (this.user.firstname && this.user.lastname && this.user.email && this.user.password &&
            this.user.job && this.user.phone && this.user.address) {

            if (isAndroid) {
                this.uploadMultipartImagePicker(this.image)
                    .subscribe({
                        next: (e) => {
                            console.log(`Upload: ${(e.currentBytes / e.totalBytes) * 100}`)
                        },
                        error: (e) => {
                            console.log(JSON.stringify(e));
                        },
                        complete: () => {
                            console.log("complete");
                            alert("Upload done !");
                            this.goSuivant();
                        }
                    });
            }
            else {
                if (this.saved) {
                    this.uploadMultipartImagePicker({ fileUri: this.path })
                        .subscribe({
                            next: (e) => {
                                console.log(`Upload: ${(e.currentBytes / e.totalBytes) * 100}`)
                            },
                            error: (e) => {
                                console.log(JSON.stringify(e));
                            },
                            complete: () => {
                                console.log("complete");
                                alert("upload done");
                                this.goSuivant();
                            }
                        });
                }
            }
        }
        else {
            alert("Veuillez Remplir tous les champs !");
        }

    }

    public goSuivant() {
        this.router.navigate(["/login"]);
    }


    private validateEmail(email: any) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    cameraOpen() {
        camera.requestPermissions();
        camera
            .takePicture({
                saveToGallery: true,
                cameraFacing: 'front'
            })
            .then(imageAsset => {
                let image: any;
                if (isAndroid) {
                    image = <any>{
                        fileUri: imageAsset.android
                    };
                    this.image = image;
                    this.picture = imageAsset;

                }
                else {

                    let source = new imageSource.ImageSource();
                    source.fromAsset(imageAsset)
                        .then(imageSource => {
                            let folder = fs.knownFolders.documents();
                            let path = fs.path.join(folder.path, "Temp" + Date.now() + ".jpg");
                            this.path = path;
                            let saved = imageSource.saveToFile(path, "jpg");
                            this.saved = saved;
                            console.log(saved);
                        });
                }
            })
            .catch(function (err) {
                console.log("Error -> " + err.message);
            });
    }

 private uploadMultipartImagePicker(image: any): Subject<any> {

        let fileUri = image.fileUri;
        let filename = fileUri.substring(fileUri.lastIndexOf('/') + 1);
        let mimetype = filename.substring(filename.lastIndexOf('.') + 1);
        let uploadType;
        let request;
        uploadType = "image";
        request = {
            url: "http://192.168.43.221:4000/users/ClientInscription",
            method: "POST",
            headers: {
                "Content-Type": "application/form-data",
            }
        };



        // let params = [{ "name":"upload", "filename": fileUri, "mimeType": "image/png" }];
        let params = [
            { name: "userId", value: this.user.email },
            { name: "Nom", value: this.user.lastname },
            { name: "Prenom", value: this.user.firstname },
            { name: "UserName", value: "MohamedTest22" },
            { name: "Pwd", value: "orca@2018" },
            { name: "Tel", value: this.user.phone },
            { name: "type", value: this.type },
            { name: "Adresse", value: this.user.address },
            { name: "Fonction", value: this.user.job },
            { name: "avatar", filename: fileUri, mimeType: `${uploadType}/${mimetype}` }];
        console.log(JSON.stringify(params));
        let subject = new Subject<any>();
        let task = this.UploadSession.multipartUpload(params, request);
        task.on('progress', (e: any) => subject.next(e));

        task.on('error', (e) => subject.error(e));

        task.on('complete', (e) => subject.complete());

        return subject;
    }

}