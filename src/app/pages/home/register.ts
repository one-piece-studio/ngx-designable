import { Component, Injectable, Input, OnChanges, signal, SimpleChanges, ViewContainerRef } from '@angular/core';
import { TreeNode } from '../../core/models';

@Component({
  selector: 'app-field',
  template: `
    <span [style]="currentStyle()">
      <span data-content-editable="title">{{ node.props.title }}</span>
      <ng-content></ng-content>
    </span>
  `,
  standalone: true
})
export class FieldWidget implements OnChanges {
  @Input() node: TreeNode;

  @Input() style: { [p: string]: any };

  currentStyle = signal({
    background: '#eee',
    display: 'inline-block',
    padding: '10px 20px',
    border: '1px solid #ddd'
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.style && changes.style.currentValue) {
      this.currentStyle.set({
        background: '#eee',
        display: 'inline-block',
        ...this.style,
        padding: '10px 20px',
        border: '1px solid #ddd'
      });
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class WidgetFactory {
  private _container = new Map<string, any>();

  constructor() {
    this.register('Field', FieldWidget);
  }

  register(name: string, component: any) {
    this._container.set(name, component);
  }

  get(name: string) {
    return this._container.get(name);
  }

  createComponent(container: ViewContainerRef, name: string) {
    const component = this._container.get(name);
    if (component) {
      return container.createComponent(component);
    }
    return null;
  }
}
