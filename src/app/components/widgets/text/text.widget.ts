import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RegistryService } from '@/app/services/registry.service';
import { IDesignerMiniLocales } from '@/app/core/types';

@Component({
  selector: 'app-text',
  template: `<span>{{ currentText }}</span>`,
  standalone: true
})
export class TextWidget implements OnChanges {
  @Input() title: string | IDesignerMiniLocales;

  currentText: string;

  constructor(private registry: RegistryService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.title && changes.title.currentValue) {
      this.fixLocaleText(this.title);
    }
  }

  fixLocaleText(text: string | IDesignerMiniLocales) {
    if (typeof text === 'string') {
      this.currentText = this.registry.getDesignerMessage(text);
    } else {
      const takeLocale = (message: string | IDesignerMiniLocales) => {
        if (typeof message == 'string') return message;
        if (typeof message == 'object') {
          const lang = this.registry.getDesignerLanguage();
          for (let key in message) {
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
