import { Component, Input, OnInit } from '@angular/core';

export interface TableColumn <T> {
  name: string;
  selector: (element:T) => string,
  
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() columns: TableColumn<any>[];
  @Input() data: any[];
  @Input() onClick: (element) => void;
  constructor() { }

  ngOnInit(): void {
  }

}
