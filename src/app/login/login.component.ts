import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  status: boolean;
  submitted = false;
  loginData = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.status = false;
    this.loginData = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authenticationService.logout();
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginData.controls; }
  onSubmit(formData: any) {
    this.submitted = true;
    this.spinner.show();

    // stop here if form is invalid
    if (this.loginData.invalid) {
      return;
    }
    console.log('Shiva: LoginComponent -> onSubmit -> formData', this.loginData.value);
    this.authenticationService.login(this.loginData.value).pipe(first())
      .subscribe(
        data => {
          console.log('Shiva: LoginComponent -> onSubmit -> data', data);
          this.toastr.success('Success', 'Login success');
          this.spinner.hide();
          this.router.navigate(['/home'])

        },
        error => {
          this.alertService.error(error);
          this.spinner.hide();
        });
    //     (res => {
    //   console.log('Shiva: LoginComponent -> onSubmit -> res', res);
    //   this.router.navigate(['/home'])
    // });
  }

}
