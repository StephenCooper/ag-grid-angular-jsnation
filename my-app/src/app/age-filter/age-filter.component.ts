import { Component } from '@angular/core';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IDoesFilterPassParams, AgPromise, IFilterParams } from 'ag-grid-community';

@Component({
  selector: 'app-age-filter',
  template: `
  <div>
<label>
    <input type="radio" name="age" checked (click)="onFilterChanged(undefined)" />
    All
</label>
<label>
    <input type="radio" name="age" (click)="onFilterChanged(false)" />
    Under
</label>
<label>
    <input type="radio" name="age" (click)="onFilterChanged(true)" />
    Over
</label>
</div>
  `,
  styles: [`
    div { padding: 10px; height: 30px }
    label { font-size: large }
  `]
})
export class AgeFilterComponent implements IFilterAngularComp {

  isOverLimit: boolean | undefined;
  params!: IFilterParams;

  agInit(params: IFilterParams): void {
    this.params = params;
  }
  isFilterActive(): boolean {
    return this.isOverLimit === true || this.isOverLimit === false;
  }
  doesFilterPass(params: IDoesFilterPassParams): boolean {
    if (this.isOverLimit) {
      return params.data.age >= 25;
    } else if (this.isOverLimit === false) {
      return params.data.age < 25;
    }

    return true;
  }
  getModel() {
    return { isOverLimit: this.isOverLimit }
  }
  setModel(model: any): void | AgPromise<void> {
    this.isOverLimit = !!model.isOverLimit;
  }
  onFilterChanged(value: boolean | undefined) {
    this.isOverLimit = value;
    // Inform AG Grid the filter has changed
    this.params.filterChangedCallback()
  }

  // Readonly display for floating filter if present
  getModelAsString() {
    if (this.isOverLimit) {
      return 'Over 25'
    }
    if (this.isOverLimit === false) {
      return 'Under 25'
    }
    return ''
  }
}
