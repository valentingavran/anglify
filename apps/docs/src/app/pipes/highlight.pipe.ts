import { Pipe, PipeTransform } from '@angular/core';
import prism from 'prismjs';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  public transform(string: string, language: string) {
    return HighlightPipe.highlight(string, language);
  }

  public static highlight(string: string, language: string) {
    return prism.highlight(string, prism.languages[language], language);
  }
}
