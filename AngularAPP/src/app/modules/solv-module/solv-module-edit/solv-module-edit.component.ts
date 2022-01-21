import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { MessageConstant } from 'src/app/constant/message.constant';
import { FormDesign } from 'src/app/model/formDesign';
import { CommonService } from 'src/app/services/common.service';
import { FormDesignService } from 'src/app/services/form-design.service';
import { SolvModuleService } from 'src/app/services/solv-module.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-solv-module-edit',
  templateUrl: './solv-module-edit.component.html',
  styleUrls: ['./solv-module-edit.component.css',
    '../../../../styles/bootstrap.css',
    '../../../../styles/bootstrap-theme.css']
})
export class SolvModuleEditComponent implements OnInit {

  moduleId: number = 0;
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

  formDesignList: FormDesign[] = [];

  @ViewChild(MatMenuTrigger) ddTrigger!: MatMenuTrigger;

  constructor(
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private solvModuleService: SolvModuleService,
    private router: Router,
    private formDesignService: FormDesignService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.moduleId = parseInt(this.activatedRoute.snapshot.paramMap.get("id") || "0");
    this.reloadIcons();
    if (this.moduleId !== 0) {
      this.getModuleDetails();
      this.getFormDesignList();
    }
    else {
      this.moduleFormGroup.controls["icon"].setValue(this.iconList[0]);
    }
  }

  getModuleDetails() {
    this.solvModuleService.getModule(this.moduleId).subscribe(
      (data) => {
        this.moduleFormGroup.patchValue(data);
      });
  }

  getFormDesignList() {
    this.formDesignService.getAll(this.moduleId).pipe(
      map((res: any) => {
        if (res) {
          this.formDesignList = res;
        }
      })
    ).subscribe();
  }

  searchIcon() {
    this.iconList = this.commonService.getMatIconList().filter(icon => icon.indexOf(this.searchIconText) >= 0);
  }

  onSelectIcon(icon: string) {
    this.moduleFormGroup.controls["icon"].setValue(icon);
    this.ddTrigger.closeMenu();
  }

  reloadIcons() {
    this.searchIconText = "";
    this.iconList = this.commonService.getMatIconList();
  }

  cancelClick(event: any) {
    event.stopPropagation();
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
    this.router.navigateByUrl("/module");
  }

  addNewForm() {
    this.router.navigateByUrl("/formdesign/0/" + this.moduleId);
  }

  editFormDesign(id: number) {
    this.router.navigateByUrl("/formdesign/" + id + "/" + this.moduleId);
  }

  deleteFormDesign(id: number) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: MessageConstant.DeleteConfirmation } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formDesignService.deleteFormDesign(id).subscribe(
          (data) => {
            var msg = data ? MessageConstant.Delete.replace('{0}', "Form Design") : MessageConstant.SomethingWentWrong;
            var panelClass = data ? "success" : "error";
            this.commonService.showSnakBar(msg, panelClass);
            this.getFormDesignList();
          }, (error) => {
            console.log(error);
          });
      }
    });
  }
}
