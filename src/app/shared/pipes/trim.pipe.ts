import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim',
})
export class TrimPipe implements PipeTransform {
  transform(content: string, limit: number) {
    if (content.length > limit) {
      return content.substring(0, limit + 1).concat('...');
    } else {
      return content;
    }
  }
}
