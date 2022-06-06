# JS Nation - AG Grid Angular Workshop

## Filtering

The community version of AG Grid comes with the following built in filters.
 - Text Filter (Default) `agTextColumnFilter`
 - Number Filter `agNumberColumnFilter`
 - Date Filter `agDateColumnFilter`

 Add these to the relevant columns providing a custom comparator for the Date filter to correctly filter on our string representation of the date.

  ```ts
{ field: 'athlete', filter: 'agTextColumnFilter' },
...
{
    field: 'gold',
    filter: 'agNumberColumnFilter'
},
...
{
    field: 'date',
    filter: 'agDateColumnFilter',
    filterParams: {
    comparator: (dateFromFilter: Date, cellValue: string) => {
        const dateAsString = cellValue;
        if (dateAsString == null) return -1
        const dateParts = dateAsString.split('/');
        const cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
        );

        if (dateFromFilter.getTime() === cellDate.getTime()) {
        return 0
        }

        if (cellDate < dateFromFilter) {
        return -1
        }

        if (cellDate > dateFromFilter) {
        return 1
        }
        return undefined;
    }
    }
},
```

### Enabling Floating Filters

Floating filters can be configured to appear in the header and support quicker filtering without needing to open up the filter menu.

Can enable for all columns via the `defaultColDef`:
```ts
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true
  }
```

## Custom Filter Component

Let's add a custom filter that enables a toggle for those over / under 25. First create a new component.

```bash
ng g c age-filter --inline-style --inline-template
```

Then implement the `IFilterAngularComp` interface.

```ts
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

```

Then pass this to the age column for it to be used.

```ts
    {
      field: 'age',
      filter: AgeFilterComponent,
    }
```

As an extension now make the value of 25 configurable via `filterParams`.
