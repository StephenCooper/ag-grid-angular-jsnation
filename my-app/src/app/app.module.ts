import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { CellComponent, OverComponent, UnderComponent } from './cell/cell.component';
import { AgeFilterComponent } from './age-filter/age-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    UnderComponent,
    OverComponent,
    AgeFilterComponent,
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