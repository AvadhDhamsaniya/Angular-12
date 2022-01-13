import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryClass } from 'src/app/model/category';
import { DataTable } from 'src/app/model/dataTable';
import { map } from 'rxjs';
import { DataTableSort } from 'src/app/model/dataTableSort';
import { CommonService } from 'src/app/services/common.service';
import { MessageConstant } from 'src/app/constant/message.constant';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent {

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonServices: CommonService
  ) {
    this.initializeProductDetails();
  }

  productFormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    date: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    imageSource: new FormControl(''),
    stock: new FormControl('', [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]),
    weight: new FormControl('', [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]),
    price: new FormControl('', [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]),
    tcCheck: new FormControl('', Validators.required)
  });

  title: string = "Add Product";
  productId: number = 0;
  categoryList: CategoryClass[] = [];
  submitBtnText: string = "Add";
  files: File[] = [];
  hasFileUpdated: boolean = false;

  initializeProductDetails() {
    this.productId = parseInt(this.activatedRoute.snapshot.paramMap.get("id") || "0");
    if (this.productId !== 0) {
      this.title = "Edit Product"
      this.submitBtnText = "Update";
      this.productService.getProductDetail(this.productId).subscribe(
        (data) => {
          if (data.image) {
            var by = this.convertDataURIToBinary(data.image);
            this.files[0] = new File([by], "test.png", {
              type: "image/png"
            });
          }

          this.productFormGroup.patchValue(data);
        }, (error) => {
          console.log(error)
        });
    }

    var catMetaData = new DataTableSort();
    catMetaData.pageSize = 0;
    this.categoryService.getAll(catMetaData).pipe(
      map((data: DataTable) => this.categoryList = data.items)
    ).subscribe();
  }

  convertDataURIToBinary(dataURI: string) {
    var BASE64_MARKER = ';base64,';
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  onSubmit() {
    var formValue = this.productFormGroup.value;
    formValue.date = new Date(formValue.date).toLocaleString();

    var formData = new FormData();
    if (this.files.length > 0 && this.hasFileUpdated) {
      formData.append("ProductImage", this.files[0]);
    }
    formData.append("ProductDetails", JSON.stringify(formValue));

    if (formValue.id) {
      this.productService.editProductDetail(formData).subscribe(
        (data) => {
          this.commonServices.showSnakBar(MessageConstant.Update.replace("{0}", "Product"), "success");
          this.goToProductList();
        }, (error) => {
          this.commonServices.showSnakBar(MessageConstant.SomethingWentWrong, "error");
        });
    } else {
      this.productService.addProductDetail(formData).subscribe(
        (data) => {
          if (data) {
            this.commonServices.showSnakBar(MessageConstant.Add.replace("{0}", "Product"), "success");
            this.goToProductList();
          }
        }, (error) => {
          this.commonServices.showSnakBar(MessageConstant.SomethingWentWrong, "error");
        });
    }
  }

  goToProductList() {
    this.router.navigateByUrl("/product");
  }

  onSelect(event: any) {
    this.hasFileUpdated = true;
    this.files[0] = event.addedFiles[0];
  }
  onRemove(event: any) {
    this.hasFileUpdated = true;
    this.productFormGroup.controls["imageSource"].setValue("");
    this.files.pop();
  }
}
