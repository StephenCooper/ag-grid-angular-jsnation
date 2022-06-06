import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface IMyCellParams {
  label?: string;
}

@Component({
  selector: 'app-cell',
  template: `
      {{label}} : {{value}}
  `,
})
export class CellComponent implements ICellRendererAngularComp {
  value!: number;
  label?: string;

  agInit(params: ICellRendererParams & IMyCellParams): void {
    this.value = params.data.age;
    this.label = params.label || 'Default';
  }
  refresh(params: ICellRendererParams & IMyCellParams): boolean {
    return false;
  }
}

@Component({
  selector: 'app-under',
  template: `
       {{label}} {{value}}
  `,
  styles: [`
  :host{color: red}
  `]
})
export class UnderComponent implements ICellRendererAngularComp {
  value!: number;
  label?: string;

  agInit(params: ICellRendererParams & IMyCellParams): void {
    this.value = params.data.age;
    this.label = params.label || 'Default';
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
@Component({
  selector: 'app-over',
  template: `
       {{label}}
  `,
  styles: [`
  :host{color: green}
  `]
})
export class OverComponent implements ICellRendererAngularComp {
  label?: string;

  agInit(params: ICellRendererParams & IMyCellParams): void {
    this.label = params.label || 'Default';
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
