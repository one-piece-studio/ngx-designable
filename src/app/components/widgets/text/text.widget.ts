import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GlobalRegistry } from '@/app/core/registry';
import { IDesignerMiniLocales } from '@/app/core/types';

@Component({
  selector: 'app-text',
  template: `<span>{{ currentText }}</span>`,
  standalone: true
})
export class TextWidget implements OnChanges {
  @Input() title: string | IDesignerMiniLocales;

  currentText: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.title && changes.title.currentValue) {
      this.fixLocaleText(this.title);
    }
  }

  fixLocaleText(text: string | IDesignerMiniLocales) {
    if (typeof text === 'string') {
      this.currentText = GlobalRegistry.getDesignerMessage(text);
    } else {
      const takeLocale = (message: string | IDesignerMiniLocales) => {
        if (typeof message == 'string') return message;
        if (typeof message == 'object') {
          const lang = GlobalRegistry.getDesignerLanguage();
          for (const key in message) {
            if (key.toLocaleLowerCase() === lang) return message[key];
          }
          return '';
        }
        return message;
      };
      this.currentText = takeLocale(text);
    }
  }
}
