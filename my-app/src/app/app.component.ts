import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  template: `
    <ag-grid-angular
    style="width: 100%; height: 100%"
    class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
    >
    </ag-grid-angular>
  `,
  styles: []
})
export class AppComponent {
  public rowData = [
    { "athlete": "Michael Phelps", "age": 23, "country": "United States", "year": 2008, "date": "24/08/2008", "sport": "Swimming", "gold": 8, "silver": 0, "bronze": 0, "total": 8 },
    { "athlete": "Libby Lenton-Trickett", "age": 23, "country": "Australia", "year": 2008, "date": "24/08/2008", "sport": "Swimming", "gold": 2, "silver": 1, "bronze": 1, "total": 4 },
    { "athlete": "Shawn Johnson", "age": 16, "country": "United States", "year": 2008, "date": "24/08/2008", "sport": "Gymnastics", "gold": 1, "silver": 3, "bronze": 0, "total": 4 }
  ];
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
}
