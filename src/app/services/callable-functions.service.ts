import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class CallableFunctionsService {

  constructor(private functions: AngularFireFunctions) { }


  public stripeCreateCharge = (source: string, amount: number) => this.functions.httpsCallable('stripeCreateCharge')({source, amount});

  public stripeGetSources = () => this.functions.httpsCallable('stripeGetSources')({});

}
