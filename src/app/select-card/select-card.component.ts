import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-select-card',
  templateUrl: './select-card.component.html',
  styleUrls: ['./select-card.component.scss']
})
export class SelectCardComponent implements OnInit {
  @Output() cardSelected = new EventEmitter<string>();

  public cards$: any;
  public selectedCard: any;

  constructor(private functions: AngularFireFunctions) { }

  async ngOnInit() {
    const stripeGetSources = this.functions.httpsCallable('stripeGetSources');
    this.cards$ = stripeGetSources({});
    const cards =  await stripeGetSources({}).toPromise();
    console.log('this.cards :', cards);
  }

  public onSelectionChange(event: MatSelectionListChange) {
    console.log('e :', event.option.value);
    this.selectedCard = event.option.value;
    this.cardSelected.emit(this.selectedCard);

  }

}
