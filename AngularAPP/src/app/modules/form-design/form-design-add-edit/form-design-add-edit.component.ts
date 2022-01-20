import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import BasicElements from '../../../../assets/basic-element.json';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { Guid } from 'guid-typescript';
import { FormControl, FormGroup } from '@angular/forms';
import { FormDesignService } from 'src/app/services/form-design.service';
import { map } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-form-design-add-edit',
  templateUrl: './form-design-add-edit.component.html',
  styleUrls: ['./form-design-add-edit.component.css',
    '../../../../styles/bootstrap.css',
    '../../../../styles/bootstrap-theme.css',
    '../../../../../node_modules/jsoneditor/dist/jsoneditor.min.css']
})
export class FormDesignAddEditComponent implements OnInit {

  elements: any[] = BasicElements;
  jsonEditorOptions = new JsonEditorOptions();
  designData: any[] = [];

  selectedField: any = null;

  @ViewChild(JsonEditorComponent) editor!: JsonEditorComponent;

  propertyIndex: number = 0;
  formName: string = "";
  moduleId: number = 0;
  formDesignId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formDesignService: FormDesignService,
    private commonServices: CommonService
  ) {
    this.jsonEditorOptions.mode = 'code';
    this.jsonEditorOptions.statusBar = false;
    this.jsonEditorOptions.mainMenuBar = false;
    this.jsonEditorOptions.onChange = () => console.log(this.editor.get());
  }

  propertyFormGroup = new FormGroup(
    {
      label: new FormControl(""),
      reportingLabel: new FormControl("")
    }
  );

  ngOnInit(): void {
    this.moduleId = parseInt(this.activatedRoute.snapshot.paramMap.get("moduleId") || "0");
    this.formDesignId = parseInt(this.activatedRoute.snapshot.paramMap.get("id") || "0");
  }

  drop(event: any) {
    var element = this.elements.find(el => {
      return el.type == event.item.data.type;
    });
    if (element != undefined) {
      var elementRef = { ...element };
      var guid = Guid.create();
      elementRef.elementUniqId = guid['value'];
      this.designData.push(elementRef);
    }
  }

  toggleDesignerEditor(event: any) {
    // 0 - Designer Tab, 1 - Editor Tab
    if (event.index == 0) {
      this.designData = JSON.parse(JSON.stringify(this.editor.get()));
    } else {
      this.editor.set(JSON.parse(JSON.stringify(this.designData)));
    }
  }

  onSelectField(plugin: any) {
    this.selectedField = plugin;
    this.propertyFormGroup.patchValue(plugin);
    this.propertyIndex = 1;
  }

  onChangeFieldProperties() {
    var propertyValues = this.propertyFormGroup.value;
    var element = this.designData.find(el => {
      return el.elementUniqId == this.selectedField.elementUniqId;
    });
    element.label = propertyValues.label;
    element.reportingLabel = propertyValues.reportingLabel;
    this.editor.set(JSON.parse(JSON.stringify(this.designData)));
  }

  saveFormDesign(isDraft: boolean) {
    var model = {
      id: 0,
      isDraft: false,
      formName: this.formName,
      moduleId: this.moduleId,
      designData: JSON.stringify(this.designData)
    };
    this.formDesignService.addFormDesign(model).pipe(
      map((res: any) => {
        if (res) {
          var snackBarRef = this.commonServices.showSnakBar("Form successfully created.", "success");
          snackBarRef.afterDismissed().subscribe(() => {
            this.goToModuleDetail();
          });
        }
      })
    ).subscribe();
  }

  goToModuleDetail() {
    this.router.navigateByUrl("module/edit/" + this.moduleId);
  }
}
