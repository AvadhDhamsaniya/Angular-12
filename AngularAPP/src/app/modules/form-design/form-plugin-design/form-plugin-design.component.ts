import { Component, Input, OnInit } from '@angular/core';
import { Element } from 'src/app/model/element';

@Component({
  selector: 'app-form-plugin-design',
  templateUrl: './form-plugin-design.component.html',
  styleUrls: ['./form-plugin-design.component.css']
})
export class FormPluginDesignComponent implements OnInit {

  plugin!: Element;

  @Input() set data(data: any) {
    this.plugin = data;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
