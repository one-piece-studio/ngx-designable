import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RegistryService } from '@/app/services/registry.service';

@Component({
  selector: 'app-text',
  template: `<span>{{ currentText }}</span>`,
  standalone: true
})
export class TextWidget implements OnChanges {
  @Input() title: string;

  currentText: string;

  constructor(private registry: RegistryService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.title && changes.title.currentValue) {
      this.fixLocaleText(this.title);
    }
  }

  fixLocaleText(text: string) {
    const message = this.registry.getDesignerMessage(text);
    this.currentText = message;
  }
}
