import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../services/common.service';

@Pipe({
  name: 'dataPropertyGetter'
})
export class DataPropertyGetterPipe implements PipeTransform {

  constructor(private commonService: CommonService) {

  }

  transform(object: any, field: string, type: string): unknown {
    if (type === 'date') {
      return this.commonService.getFormatedDate(object[field]);
    }
    return object[field];
  }
}
