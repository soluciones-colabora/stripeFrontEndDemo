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

  constructor(private functions: CallableFunctionsService) { }

  async ngOnInit() {
    this.cards$ = this.functions.stripeGetSources();
    const cards =  await this.functions.stripeGetSources().toPromise();
    console.log('this.cards :', cards);
  }

  public onSelectionChange(event: MatSelectionListChange) {
    console.log('e :', event.option.value);
    this.selectedCard = event.option.value;
    this.cardSelected.emit(this.selectedCard);

  }

}
