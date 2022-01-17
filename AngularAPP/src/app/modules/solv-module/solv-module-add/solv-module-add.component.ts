import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { CommonService } from 'src/app/services/common.service';
import { SolvModuleService } from 'src/app/services/solv-module.service';

@Component({
  selector: 'app-solv-module-add',
  templateUrl: './solv-module-add.component.html',
  styleUrls: ['./solv-module-add.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SolvModuleAddComponent implements OnInit {

  title: string = "Add Module";
  submitBtnText: string = "Add";
  iconList: string[] = [];
  searchIconText: string = "";
  moduleFormGroup = new FormGroup(
    {
      id: new FormControl(0),
      name: new FormControl('', Validators.required),
      icon: new FormControl(''),
      prefix: new FormControl('', [Validators.required, Validators.maxLength(4)]),
      isActive: new FormControl(false)
    }
  );

  @ViewChild(MatMenuTrigger) ddTrigger!: MatMenuTrigger;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SolvModuleAddComponent>,
    private commonService: CommonService,
    private solvModuleService: SolvModuleService) { }

  ngOnInit(): void {
    this.reloadIcons();
    var moduleId = this.data.id;
    if (moduleId !== 0) {
      this.title = "Edit Module";
      this.submitBtnText = "Update";
      this.solvModuleService.getModule(moduleId).subscribe(
        (data) => {
          this.moduleFormGroup.patchValue(data);
        });
    }
    else {
      this.moduleFormGroup.controls["icon"].setValue(this.iconList[0]);
    }
  }

  onSubmit() {
    var formValue = this.moduleFormGroup.value;
    if (formValue.id) {
      this.solvModuleService.editModule(formValue).subscribe(
        (data) => {
          this.goToModuleList(true);
        }, (error) => {
          console.log(error)
        });
    } else {
      this.solvModuleService.addModule(formValue).subscribe(
        (data) => {
          if (data) {
            this.goToModuleList(true);
          }
        }, (error) => {
          console.log(error)
        });
    }
  }

  goToModuleList(res: any) {
    this.dialogRef.close(res);
  }

  searchIcon() {
    this.iconList = this.commonService.getMatIconList().filter(icon => icon.indexOf(this.searchIconText) >= 0);
  }

  cancelClick(event: any) {
    event.stopPropagation();
  }

  onSelectIcon(icon: string) {
    this.moduleFormGroup.controls["icon"].setValue(icon);
    this.ddTrigger.closeMenu();
  }

  reloadIcons() {
    this.searchIconText = "";
    this.iconList = this.commonService.getMatIconList();
  }
}
