import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, ɵHttpInterceptingHandler, HTTP_INTERCEPTORS, HttpHandler, HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AuthGuard } from './guards/auth-guard.service';
import { AlertComponent } from './_directives/alert.component';

import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxSpinnerModule } from "ngx-spinner";

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { environment } from '../environments/environment';


const config: SocketIoConfig = { url: environment.apiUrl, options: {} };



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent,
    CommentListComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),


  ],
  providers: [
    AlertService,
    AuthGuard,
    HttpClient,
    AuthenticationService, AlertService, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
