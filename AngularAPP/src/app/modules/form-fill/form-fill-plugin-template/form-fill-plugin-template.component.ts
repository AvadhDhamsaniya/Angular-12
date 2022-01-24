import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Element } from 'src/app/model/element';

@Component({
  selector: 'app-form-fill-plugin-template',
  templateUrl: './form-fill-plugin-template.component.html',
  styleUrls: ['./form-fill-plugin-template.component.css']
})
export class FormFillPluginTemplateComponent {

  @Input() designData!: Element[];
  @Input() fillFormGroup!: FormGroup;

  constructor() { }
}
