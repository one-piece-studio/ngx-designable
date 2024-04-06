import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { usePrefix } from '../../../utils';
import { Engine } from '../../../core/models';
import { AttributeDirective } from '../../../directive';
import { NgClass } from '@angular/common';

export enum ResizeHandleType {
  Resize = 'RESIZE',
  ResizeWidth = 'RESIZE_WIDTH',
  ResizeHeight = 'RESIZE_HEIGHT'
}

@Component({
  selector: 'app-resize-handler',
  template: `
    <div class="{{ prefix }}" [attributes]="attributes" [ngClass]="currentClass">
      <ng-content></ng-content>
    </div>
  `,
  standalone: true,
  imports: [AttributeDirective, NgClass],
  styleUrls: ['./responsive-simulator.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ResizeHandlerComponent implements OnChanges {
  prefix = usePrefix('resize-handle');

  @Input() type: ResizeHandleType;

  attributes: { [p: string]: any };

  currentClass: { [p: string]: boolean };

  constructor(private designer: Engine) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type && changes.type.currentValue) {
      this.attributes = {
        [this.designer.props.screenResizeHandlerAttrName]: this.type
      };
      this.currentClass = {
        [`${this.prefix}-${this.type}`]: !!this.type
      };
    }
  }
}
