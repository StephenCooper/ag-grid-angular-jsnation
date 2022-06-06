# JS Nation - AG Grid Angular Workshop

## Grid Properties

### Load Data from an external Source

First, download [row data](https://www.ag-grid.com/example-assets/olympic-winners.json) and save it under assets.

Add `HttpClientModule` to your `AppModule` so that we can use the http client.

```ts
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Now update our row data to be an Observable that loads data from the http client.

```ts
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <ag-grid-angular
    style="width: 100%; height: 100%"
    class="ag-theme-alpine"
      [rowData]="rowData$ | async"
      [columnDefs]="columnDefs"
    >
    </ag-grid-angular>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  public rowData$!: Observable<any[]>;
  public columnDefs: ColDef[] = [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.rowData$ = this.http.get<any[]>('../assets/row-data.json');
  }
}
```

### Add Default Column Properties

We can add features to every column via the `defaultColDef` property. Let's enable sorting and filtering for every column.

```ts
  defaultColDef: ColDef = {
    sortable: true,
    filter: true
  }
```

```html
    <ag-grid-angular
    style="width: 100%; height: 100%"
    class="ag-theme-alpine"
      [rowData]="rowData$ | async"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
    >
    </ag-grid-angular>
```

### Configure Grid Properties

Now lets animate the rows on sorting and add row selection.

```html
    <ag-grid-angular
    style="width: 100%; height: 100%"
    class="ag-theme-alpine"
      [rowData]="rowData$ | async"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [animateRows]="true"
      [rowSelection]="'multiple'"
    >
    </ag-grid-angular>
```

### Add Grid Event Handler

Add an `onCellClicked` event handler to the component output `(cellClicked)`

```html
    <ag-grid-angular
    style="width: 100%; height: 100%"
    class="ag-theme-alpine"
      [rowData]="rowData$ | async"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [animateRows]="true"
      [rowSelection]="'multiple'"
      (cellClicked)="onCellClicked($event)"
    >
    </ag-grid-angular>
```

```ts
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }
```

### Use GridApi to control grid

Get a reference to the GridApi via the `ViewChild` attribute.

```ts
 @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
 ```

 Use the api to add a button that can clear the cell selection.

 ```ts
 clearSelection(): void {
   this.agGrid.api.deselectAll();
 }
 ```

 ```html
<button (click)="clearSelection()">Clear Selection</button>
<ag-grid-angular
 ```