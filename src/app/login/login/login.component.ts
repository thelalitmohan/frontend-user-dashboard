import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";

import { ToastrService } from "ngx-toastr";
import { first } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  submitted: boolean = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,10}")
        ]
      ],
      password: ["", Validators.required]
    });
  }

  // get form object in the wasy option

  get fo() {
    return this.LoginForm.controls;
  }

  validate(event: Event) {
    event.preventDefault();
    this.submitted = true;
    if (this.LoginForm.invalid) {
      return;
    }
    this.authenticationService
      .login(this.fo.email.value, this.fo.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(["/dashboard"]);
        },
        error => {
          this.toastr.error(error.error.message);
        }
      );
  }
}
