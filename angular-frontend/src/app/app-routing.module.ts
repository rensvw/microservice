import { NgModule } from "@angular/core";
import { RouterModule, CanActivate } from "@angular/router";
import { AuthGuard } from "./auth/auth-guard.service";

import { HomeComponent } from "./home/home.component";


@NgModule({
  imports: [RouterModule.forRoot([
      { path: "home", canActivate: [AuthGuard], component: HomeComponent },
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "**", redirectTo: "home", pathMatch: "full" }
    ], { useHash: true}) ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
