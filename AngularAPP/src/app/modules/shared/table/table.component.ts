import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, Input } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { DataTable } from 'src/app/model/dataTable';
import { DataTableSort } from 'src/app/model/dataTableSort';
import { TableColumn } from 'src/app/model/tableColumn';
import { TableConfig } from 'src/app/model/tableConfig';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', margin: "0" })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TableComponent implements AfterViewInit {

  public dataTableService !: any;
  public displayedColumns: string[] = [];
  public tableDataSource = new MatTableDataSource<any>([]);

  totalRecords: number = 0;
  dataTableSort = new DataTableSort();
  sortDirection: SortDirection = '';

  public tableColumns: TableColumn[] = [];

  public buttons: any[] = [];

  public expandButton: any;

  expandedHtml: string = "";

  @Input() set tableConfig(data: TableConfig) {
    this.expandButton = data.expandButton;
    this.setUpExpandButton();
    this.displayedColumns.push(...data.displayedColumns);
    this.dataTableService = data.dataTableService;
    this.dataTableSort.sortBy = data.defaultSort.field;
    this.sortDirection = this.dataTableSort.sortDirection = data.defaultSort.direction;
    this.tableColumns.push(...data.columns);
    this.buttons = data.buttons;
    this.setUpActionButtons();
  }

  setUpExpandButton() {
    if (this.expandButton) {
      this.displayedColumns.push("expand");
      this.tableColumns.push({
        name: "Expand", field: "expand", type: "expand"
      });
    }
  }

  setUpActionButtons() {
    if (this.buttons && this.buttons.length > 0) {
      this.tableColumns.push({
        name: "Action", field: "action", type: "action"
      });
      this.displayedColumns.push("action");
    }
  }
  //@ViewChild(MatPaginator) paginator !: MatPaginator;

  refresh() {
    this.dataTableService.getAll(this.dataTableSort).pipe(
      map((res: DataTable) => {

        if (this.expandButton) {
          res.items.map(function (item) {
            item.isExpanded = false;
          });
        }

        this.tableDataSource.data = res.items;
        this.totalRecords = res.totalRecords;
        this.dataTableSort.pageSize = res.pageSize;

        // this.paginator.length = res.totalRecords;
        // this.tableDataSource.paginator = this.paginator;
      })
    ).subscribe();
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.refresh();
  }

  onRowAction(element: any, button: any) {
    if (button.callBackFunction) {
      button.callBackFunction(element);
    }
  }

  onPageChange(pageMetaData: any) {
    this.dataTableSort.pageNo = pageMetaData.pageIndex;
    this.dataTableSort.pageSize = pageMetaData.pageSize;

    // this.paginator.pageIndex = pageMetaData.pageIndex;
    // this.paginator.pageSize = pageMetaData.pageSize;
    this.refresh();
  }

  onSort(sortData: any) {
    this.dataTableSort.sortBy = sortData.active;
    this.dataTableSort.sortDirection = sortData.direction;
    this.refresh();
  }

  onSearch(searchText: string) {
    this.dataTableSort.pageNo = 0;
    this.dataTableSort.searchText = searchText;
    this.refresh();
  }

  // Toggel Rows
  expandRow(element: any, button: any) {
    if (!element.isExpand) {
      if (!element.expandedHtml) {
        button.callBackFunction(element)
          .then((res: any) => {
            element.expandedHtml = res;
            this.toggleTableRows(element);
          });
      } else {
        this.toggleTableRows(element);
      }
    }
  }

  toggleTableRows(element: any) {
    this.tableDataSource.data.forEach((row: any) => {
      if (row == element) {
        row.isExpanded = !row.isExpanded;
      } else {
        row.isExpanded = false;
      }
    });
  }
}
