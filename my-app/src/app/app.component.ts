import { HttpClient } from '@angular/common/http';
import { OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClassParams, ICellRendererParams } from 'ag-grid-community';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AgeFilterComponent } from './age-filter/age-filter.component';
import { CellComponent, OverComponent, UnderComponent } from './cell/cell.component';

import 'ag-grid-enterprise';

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
      [rowGroupPanelShow]="'always'"
      [enableCharts]="true"
      [enableRangeSelection]="true"
      (cellClicked)="onCellClicked($event)"
    >
    </ag-grid-angular>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  public rowData$!: Observable<any[]>;

  public columnDefs: ColDef[] = [

    { field: 'athlete', filter: 'agTextColumnFilter', enableRowGroup: true, },
    {
      field: 'age',
      filter: AgeFilterComponent,
      cellRendererSelector: (params: ICellRendererParams) => {
        if (params.data) {
          if (params.data?.age >= 25) {
          return {
            component: OverComponent,
            params: {
              label: 'Over 25'
            }
          }
        } else {
          return {
            component: UnderComponent,
            params: {
              label: 'Under 25: '
            }
          }
        }
      }
        return undefined;
      }
    },
    {
      field: 'country',
      enableRowGroup: true,
    },
    {
      field: 'year',
      enableRowGroup: true
    },
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
    { field: 'sport', enableRowGroup: true, },
    {
      field: 'gold',
      filter: 'agNumberColumnFilter',
      cellClass: (params: CellClassParams) => params.data?.gold > 0 ? 'medal-gold' : null,
      enableValue: true,
      aggFunc: 'sum'
    },
    {
      field: 'silver',
      filter: 'agNumberColumnFilter',
      cellClassRules: {
        'medal-silver': (params: CellClassParams) => params.data?.silver > 0
      },
      enableValue: true,
      aggFunc: 'sum'
    },
    {
      field: 'bronze',
      filter: 'agNumberColumnFilter',
      cellClassRules: {
        'medal-bronze': 'x > 0'
      },
      enableValue: true,
      aggFunc: 'sum'
    },
    {
      field: 'total',
      filter: 'agNumberColumnFilter',
      enableValue: true,
      aggFunc: 'sum'
    }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
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
