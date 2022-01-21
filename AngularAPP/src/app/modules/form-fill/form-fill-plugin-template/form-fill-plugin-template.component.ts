import { Component, Input, OnInit } from '@angular/core';
import { Element } from 'src/app/model/element';

@Component({
  selector: 'app-form-fill-plugin-template',
  templateUrl: './form-fill-plugin-template.component.html',
  styleUrls: ['./form-fill-plugin-template.component.css']
})
export class FormFillPluginTemplateComponent implements OnInit {

  plugin!: Element;

  @Input() set data(data: any) {
    this.plugin = data;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
