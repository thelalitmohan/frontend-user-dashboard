import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { User } from "src/app/models/user";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  currentUser: any = {};

  email: string = "";

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => {
      if (user != null) {
        this.currentUser = user;
        this.email = user.email;
      }
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}
