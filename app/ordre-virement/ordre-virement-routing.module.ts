import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { OrdreVirementComponent } from "./ordre-virement.component";

const routes: Routes = [
    { path: "", component: OrdreVirementComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class OrdreVirementRoutingModule { }
