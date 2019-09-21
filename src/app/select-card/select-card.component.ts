import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';

import { CallableFunctionsService } from '../services/callable-functions.service';

@Component({
  selector: 'app-select-card',
  templateUrl: './select-card.component.html',
  styleUrls: ['./select-card.component.scss']
})
export class SelectCardComponent implements OnInit {
  @Output() cardSelected = new EventEmitter<string>();

  public cards$: any;
  public selectedCard: any;
  public confirmation: any;

  constructor(private functions: CallableFunctionsService) { }

  async ngOnInit() {
    this.cards$ = this.functions.stripeGetSources();
  }

  public onSelectionChange(event: MatSelectionListChange) {
    this.selectedCard = event.option.value;
    this.cardSelected.emit(this.selectedCard);

  }

  public async onPayButtonClick() {
    if (!this.selectedCard) {
      alert('Please choose a payment method');
      return;
    }
    this.confirmation = await this.functions.stripeCreateCharge(this.selectedCard, 2000).toPromise();
    console.log('this.confirmation :', this.confirmation);
  }

}
