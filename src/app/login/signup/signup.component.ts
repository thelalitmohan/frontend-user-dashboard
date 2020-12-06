import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { first } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  RegisterForm: FormGroup;

  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.RegisterForm = this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,10}")
        ]
      ],
      password: ["", Validators.required],
      role: 1
    });
  }

  validate(event: Event) {
    event.preventDefault();
    this.submitted = true;
    if (this.RegisterForm.invalid) {
      return;
    }

    this.userService
      .register(this.RegisterForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(["/login"]);
          this.toastr.success("User created successfully");
        },
        error => {
          this.toastr.error(error.message);
        }
      );
  }
}
