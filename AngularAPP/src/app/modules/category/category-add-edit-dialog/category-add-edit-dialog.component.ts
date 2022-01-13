import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add-edit-dialog',
  templateUrl: './category-add-edit-dialog.component.html',
  styleUrls: ['./category-add-edit-dialog.component.css']
})
export class CategoryAddEditDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryAddEditDialogComponent>) {
  }

  categoryFormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.maxLength(300))
  });

  title: string = "Add Category";
  categoryId: number = 0;
  submitBtnText: string = "Add";

  ngOnInit(): void {
    this.categoryId = this.data.id;
    if (this.categoryId !== 0) {
      this.title = "Edit Category";
      this.submitBtnText = "Update";
      this.categoryService.getCategory(this.categoryId).subscribe(
        (data) => {
          this.categoryFormGroup.patchValue(data);
        }, (error) => {
          console.log(error)
        });
    }
  }

  onSubmit() {
    var formValue = this.categoryFormGroup.value;
    if (formValue.id) {
      this.categoryService.editCategory(formValue).subscribe(
        (data) => {
          this.goToCategoryList(true);
        }, (error) => {
          console.log(error)
        });
    } else {
      this.categoryService.addCategory(formValue).subscribe(
        (data) => {
          if (data) {
            this.goToCategoryList(true);
          }
        }, (error) => {
          console.log(error)
        });
    }
  }

  goToCategoryList(response: any) {
    this.dialogRef.close(response);
  }

}
