import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.css']
})
export class CategoryAddEditComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  categoryFormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required)
  });

  title: string = "Add Category";
  categoryId: number = 0;
  submitBtnText: string = "Add";

  ngOnInit(): void {
    this.categoryId = parseInt(this.activatedRoute.snapshot.paramMap.get("id") || "0");
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
          this.goToCategoryList();
        }, (error) => {
          console.log(error)
        });
    } else {
      this.categoryService.addCategory(formValue).subscribe(
        (data) => {
          if (data) {
            this.goToCategoryList();
          }
        }, (error) => {
          console.log(error)
        });
    }
  }

  goToCategoryList() {
    this.router.navigate(['/category']);
  }


}
