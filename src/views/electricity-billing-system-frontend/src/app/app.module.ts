import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {AddUserDialogComponent, UserComponent} from './home/user/user.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorInterceptor} from "./_interceptors/error.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./_routing/app-routing.module";
import {MaterialModule} from "./_material/material.module";
import { PaymentMethodComponent } from './home/payment-method/payment-method.component';
import { BillingComponent } from './home/billing/billing.component';
import { PaymentComponent } from './home/payment/payment.component';

@NgModule({
  declarations: [
    AddUserDialogComponent,
    AppComponent,
    HomeComponent,
    UserComponent,
    PaymentMethodComponent,
    BillingComponent,
    PaymentComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
