import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SharedModule } from "../shared/shared.module";
import { OrdreEmployerRoutingModule } from "./ordre-employer-routing.module";
import { OrdreEmployerComponent } from "./ordre-employer.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        OrdreEmployerRoutingModule,
        SharedModule
    ],
    declarations: [
        OrdreEmployerComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class  OrdreEmployerModule { }
