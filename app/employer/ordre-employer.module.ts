import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SharedModule } from "../shared/shared.module";
import { EmployerRoutingModule } from "./employer-routing.module";
import { EmployerComponent } from "./employer.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EmployerRoutingModule,
        SharedModule
    ],
    declarations: [
        EmployerComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class  EmployerModule { }
