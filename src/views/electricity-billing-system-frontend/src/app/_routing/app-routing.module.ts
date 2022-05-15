import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {UserComponent} from "../home/user/user.component";
import {PaymentMethodComponent} from "../home/payment-method/payment-method.component";
import {BillingComponent} from "../home/billing/billing.component";
import {PaymentComponent} from "../home/payment/payment.component";

const Routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'payment-method',
        component: PaymentMethodComponent
      },
      {
        path: 'billing',
        component: BillingComponent
      },
      {
        path: 'payment',
        component: PaymentComponent
      },
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  imports: [RouterModule.forRoot(Routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
