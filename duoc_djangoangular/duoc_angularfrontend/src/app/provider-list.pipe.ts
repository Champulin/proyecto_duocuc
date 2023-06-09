import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'providerList'
})
export class ProviderListPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
