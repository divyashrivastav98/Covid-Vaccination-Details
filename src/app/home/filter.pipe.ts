import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string) {
    let filteredArray = [];
    if (value.length == 0 || filterString == '') {
      return value;
    }

    for (const v of value) {
      if (v['name'].includes(filterString) || v['vaccine'].includes(filterString) || v['fee_type'].includes(filterString)) {
        filteredArray.push(v);
      }
    }
    return filteredArray;

  }

}
