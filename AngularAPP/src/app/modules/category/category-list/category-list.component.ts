import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryClass } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { TableConfig } from 'src/app/model/tableConfig';
import { TableColumn } from 'src/app/model/tableColumn';
import { CategoryAddEditDialogComponent } from '../category-add-edit-dialog/category-add-edit-dialog.component';
import { TableComponent } from '../../shared/table/table.component';
import { CommonService } from 'src/app/services/common.service';
import { MessageConstant } from 'src/app/constant/message.constant';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  public tableColumns: TableColumn[] = [
    {
      name: "Category Name", field: "name", type: "string"
    },
    {
      name: "Description", field: "description", type: "string"
    }
  ]

  public buttons: any[] = [
    {
      name: "Edit",
      icon: "edit",
      color: "primary",
      callBackFunction: (element: any) => { this.editCategory(element.id); }
    },
    {
      name: "Delete",
      icon: "delete",
      color: "warn",
      callBackFunction: (element: any) => { this.deleteCategory(element.id); }
    }
  ];

  public displayedColumns = ['name', 'description'];
  public tableConfig = new TableConfig();
  public categoryList = new MatTableDataSource<CategoryClass>();

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private commonServices: CommonService
  ) {
    this.tableConfig.displayedColumns = this.displayedColumns;
    this.tableConfig.dataTableService = this.categoryService;
    this.tableConfig.defaultSort.field = "name";
    this.tableConfig.defaultSort.direction = "asc"
    this.tableConfig.columns = this.tableColumns;
    this.tableConfig.buttons = this.buttons;
  }

  @ViewChild(TableComponent) tableComponent !: TableComponent;

  addCategory() {
    this.openAddEditDialog(0);
  }

  editCategory(id: number) {
    this.openAddEditDialog(id);
  }

  openAddEditDialog(id: any) {
    let dialogRef = this.dialog.open(CategoryAddEditDialogComponent, {
      data: { id },
      width: '500px',
      height: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var msg = id == 0 ? MessageConstant.Add.replace('{0}', "Category") : MessageConstant.Update.replace('{0}', "Category");
        this.commonServices.showSnakBar(msg, "success");
        this.tableComponent.refresh();
      }
    });
  }

  deleteCategory(id: number) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: MessageConstant.DeleteConfirmation } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.deleteCategory(id).subscribe(
          (data) => {
            var msg = data ? MessageConstant.Delete.replace('{0}', "Category") : MessageConstant.SomethingWentWrong;
            var panelClass = data ? "success" : "error";
            this.commonServices.showSnakBar(msg, panelClass);
            this.tableComponent.refresh();
          }, (error) => {
            console.log(error);
          });
      }
    });
  }
}
