import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SharedModule } from "../shared/shared.module";
import { OrdreVirementRoutingModule } from "./ordre-virement-routing.module";
import { OrdreVirementComponent } from "./ordre-virement.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        OrdreVirementRoutingModule,
        SharedModule
    ],
    declarations: [
        OrdreVirementComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class  OrdreVirementModule { }
