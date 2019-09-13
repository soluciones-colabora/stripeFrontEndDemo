/// <reference types="stripe-checkout"/>
import { environment } from 'src/environments/environment';

import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

import { AuthService } from '../services/auth.service';

declare var StripeCheckout: StripeCheckoutStatic;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @Input() amount;
  @Input() description;


  constructor(private auth: AuthService, private functions: AngularFireFunctions) { }


  handler: StripeCheckoutHandler;

  confirmation: any;
  loading = false;

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: environment.stripe.key,
      image: '../../assets/donutLogo.jpg',
      locale: 'auto',
      source: async (source) => {
        this.loading = true;
        const user = await this.auth.getUser();
        const stripeCreateCharge = this.functions.httpsCallable('stripeCreateCharge');
        console.log('source :', source);
        this.confirmation = await stripeCreateCharge({
          source: source.id,
          uid: user.uid,
          amount: this.amount,
        }).toPromise();
        this.loading = false;
      }
    });
  }

  // Open the checkout handler
  async checkout(e) {
    const user = await this.auth.getUser();
    this.handler.open({
      name: 'Donuts to go!',
      description: this.description,
      amount: this.amount,
      email: user.email,
    });
    e.preventDefault();
  }

  // Close on navigate
  @HostListener('window:popstate')
  onPopState() {
    this.handler.close();
  }

}
