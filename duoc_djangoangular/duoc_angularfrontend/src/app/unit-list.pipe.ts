import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitList'
})
export class UnitListPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
