import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'facultyList'
})
export class FacultyListPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
