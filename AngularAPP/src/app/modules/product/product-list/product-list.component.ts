import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { CommonDialogComponent } from '../../common/common-dialog/common-dialog.component';
import { CategoryService } from 'src/app/services/category.service';
import { TableConfig } from 'src/app/model/tableConfig';
import { TableColumn } from 'src/app/model/tableColumn';
import { TableComponent } from '../../shared/table/table.component';
import { MessageConstant } from 'src/app/constant/message.constant';
import { CommonService } from 'src/app/services/common.service';
import { ProductClass } from 'src/app/model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  public tableColumns: TableColumn[] = [
    {
      name: "Name", field: "name", type: "string"
    },
    {
      name: "Date", field: "date", type: "date"
    },
    {
      name: "Category", field: "categoryName", type: "string"
    },
    {
      name: "Stock", field: "stock", type: "string"
    },
    {
      name: "Weight", field: "weight", type: "string"
    },
    {
      name: "Price", field: "price", type: "string"
    }
  ];

  public buttons: any[] = [
    {
      name: "Edit",
      icon: "edit",
      color: "primary",
      callBackFunction: (element: any) => { this.editProduct(element.id); }
    },
    {
      name: "Delete",
      icon: "delete",
      color: "warn",
      callBackFunction: (element: any) => { this.deleteProduct(element.id); }
    }
  ];

  public displayedColumns = ['name', 'date', 'categoryName', 'stock', 'weight', 'price'];

  //categoryList: CategoryClass[] = [];

  public tableConfig = new TableConfig();

  @ViewChild(TableComponent) tableComponent !: TableComponent;

  searchText: string = "";

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private dialog: MatDialog,
    private commonService: CommonService
  ) {
    this.tableConfig = {
      buttons: this.buttons,
      columns: this.tableColumns,
      dataTableService: this.productService,
      defaultSort: {
        field: "name",
        direction: "asc"
      },
      displayedColumns: this.displayedColumns,
      expandButton: {
        name: "Expand",
        collapseIcon: "keyboard_arrow_down",
        expandIcon: "keyboard_arrow_right",
        color: "",
        callBackFunction: (element: any) => { return this.getProductDetails(element); }
      }
    };
    //this.loadCategoryList();
  }

  // loadCategoryList() {
  //   var catMetaData = new DataTableSort();
  //   catMetaData.pageSize = 0;
  //   this.categoryService.getAll(catMetaData).pipe(
  //     map((data: DataTable) => this.categoryList = data.items)
  //   ).subscribe();
  // }

  // onCategoryChange(categoryId: number) {
  //   console.log(categoryId);
  // }

  addProduct() {
    this.router.navigateByUrl("product/productdetail/0");
  }

  editProduct(id: number) {
    this.router.navigateByUrl("product/productdetail/" + id);
  }

  deleteProduct(id: number) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: MessageConstant.DeleteConfirmation } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProductDetail(id).subscribe(
          (data) => {
            this.tableComponent.refresh();
            this.showCommonPopup(data ? MessageConstant.Delete.replace("{0}", "Product") : MessageConstant.SomethingWentWrong);
          }, (error) => {
            console.log(error);
          });
      }
    });
  }

  showCommonPopup(msg: string) {
    let okDialogRef = this.dialog.open(CommonDialogComponent, { data: { message: msg } });
    okDialogRef.afterClosed().subscribe(result => {
    });
  }

  clearSearch() {
    this.searchText = "";
    this.applySearch();
  }

  applySearch() {
    this.tableComponent.onSearch(this.searchText);
  }

  getProductDetails(element: any) {
    return this.productService.getProductDetail(element.id, true)
      .toPromise()
      .then((response: ProductClass | undefined) => {
        if (response) {
          return "<div class='flex-layout'>" +
            "<div class='flex-70' ><p>" +
            "<span class='tab'><b>Name : </b><span>" + response?.name + "</span></span>" +
            "<span class='tab'><b>Stock : </b><span>" + response?.stock + "</span></span>" +
            "<span class='tab'><b>Price : </b><span>" + response?.price + "</span></span></p>" +
            "<p><b>Mfg. Date : </b><span>" + this.commonService.getFormatedDate(response?.date) + "</span></p>" +
            "<p><b>Category : </b><span>" + response?.categoryName + "</span></p>" +
            "<p><b>Description : </b><span>" + response?.description + "</span></p>" +
            "</div><div class='flex-10'></div><div class='flex-20'>" +
            "<img style='margin-bottom: 10px;' width='200' height='200' src='" + response?.image + "' />" +
            "</div></div>";
        }
        else {
          return "<p style='margin-top: 0'>No data found.</p>";
        }
      });
  }
}
