/*import { Component } from "@angular/core";
import "rxjs/Rx";
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent { }*/
import { Component } from "@angular/core";

@Component({
  selector: "main",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {}
