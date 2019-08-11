import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loading = true;
  userList: Array<object>;
  constructor(private userService: UserService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  ngOnInit() {
    this.spinner.show();
    this.userService.getAll().pipe(first())
      .subscribe(
        data => {
          console.log('Shiva: LoginComponent -> onSubmit -> data', data);
          this.userList= data;
          this.spinner.hide();
        },
        error => {
          this.toastr.error('Error', error);
          this.spinner.hide();
        });
  }

}
