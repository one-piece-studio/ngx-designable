import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-text',
  template: `<span>{{ currentText }}</span>`,
  standalone: true
})
export class TextWidget implements OnChanges {
  @Input() title: string;

  currentText: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.title && changes.title.currentValue) {
      this.fixLocaleText(this.title);
    }
  }

  fixLocaleText(text: string) {
    this.currentText = text;
  }
}
