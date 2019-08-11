import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment as config } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  login(payload: object) {
    return this.http.post<any>(`${config.apiUrl}/users/authenticate`, payload)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }
  isAuthenticated(): boolean {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser')
  }
}
