import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { map } from 'rxjs';
import { MessageConstant } from 'src/app/constant/message.constant';
import { ModuleClass } from 'src/app/model/module';
import { CommonService } from 'src/app/services/common.service';
import { SolvModuleService } from 'src/app/services/solv-module.service';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { SolvModuleAddEditComponent } from '../solv-module-add-edit/solv-module-add-edit.component';

@Component({
  selector: 'app-solv-module',
  templateUrl: './solv-module-list.component.html',
  styleUrls: ['./solv-module-list.component.css',
    '../../../../styles/bootstrap.css',
    '../../../../styles/bootstrap-theme.css']
})
export class SolvModuleComponent implements OnInit {

  searchText: string = "";
  moduleList: ModuleClass[] = [];
  constructor(
    private dialog: MatDialog,
    private commonServices: CommonService,
    private moduleService: SolvModuleService
  ) { }

  ngOnInit(): void {
    this.loadModuleList();
  }

  clearSearch() {
    this.searchText = "";
  }

  deleteModule(id: any) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: MessageConstant.DeleteConfirmation } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.moduleService.deleteModule(id).subscribe(
          (data) => {
            var msg = data ? MessageConstant.Delete.replace('{0}', "Module") : MessageConstant.SomethingWentWrong;
            var panelClass = data ? "success" : "error";
            this.commonServices.showSnakBar(msg, panelClass);
            this.loadModuleList();
          }, (error) => {
            console.log(error);
          });
      }
    });
  }

  addModule() {
    this.openAddEditDialog(0);
  }

  editModule(id: any) {
    this.openAddEditDialog(id);
  }

  openAddEditDialog(id: any) {
    let dialogRef = this.dialog.open(SolvModuleAddEditComponent, {
      data: { id },
      width: '800px',
      height: '380px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var msg = id == 0 ? MessageConstant.Add.replace('{0}', "Module") : MessageConstant.Update.replace('{0}', "Module");
        this.commonServices.showSnakBar(msg, "success");
        this.loadModuleList();
      }
    });
  }

  loadModuleList() {
    this.moduleService.getAll().pipe(
      map((res: any) => {
        if (res) {
          this.moduleList = res;
        }
      })
    ).subscribe();
  }

  toggleModuleActiveness(id: any, event: MatSlideToggleChange) {
    this.moduleService.toggleModuleActiveness(id, event.checked).pipe(
      map((res: any) => {
        if (res) {
          var msg = event.checked ? "Module sucessfully activated." : "Module sucessfully deactivated.";
          this.commonServices.showSnakBar(msg, "success");
        }
      })
    ).subscribe();
  }
}
