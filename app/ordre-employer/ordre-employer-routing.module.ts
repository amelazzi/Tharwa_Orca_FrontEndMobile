import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { OrdreEmployerComponent } from "./ordre-employer.component";

const routes: Routes = [
    { path: "", component: OrdreEmployerComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class OrdreEmployerRoutingModule { }
