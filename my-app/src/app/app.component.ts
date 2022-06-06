import { HttpClient } from '@angular/common/http';
import { OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClassParams } from 'ag-grid-community';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
  <button (click)="clearSelection()">Clear Selection</button>
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
    {
      field: 'gold',
      cellClass: (params: CellClassParams) => params.data.gold > 0 ? 'medal-gold' : null
    },
    {
      field: 'silver',
      cellClassRules: {
        'medal-silver': (params: CellClassParams) => params.data.silver > 0
      }
    },
    {
      field: 'bronze',
      cellClassRules: {
        'medal-bronze': 'x > 0'
      }
    },
    { field: 'total' }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true
  }

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.rowData$ = this.http.get<any[]>('../assets/row-data.json');
  }

  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
