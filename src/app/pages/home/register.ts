import { Component, Injectable, Input, OnChanges, signal, SimpleChanges, ViewContainerRef } from '@angular/core';
import { TreeNode } from '../../core/models';
import { NgIf } from '@angular/common';

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

@Component({
  selector: 'app-card',
  template: `
    <div [style]="currentStyle()">
      <span *ngIf="!hasContent()">拖拽字段进入该区域</span>
      <ng-content></ng-content>
    </div>
  `,
  imports: [NgIf],
  standalone: true
})
export class CardWidget implements OnChanges {
  @Input() node: TreeNode;

  @Input() style: { [p: string]: any };

  currentStyle = signal({
    width: '200px',
    height: '100px',
    background: '#eee',
    border: '1px solid #ddd',
    display: 'flex',
    padding: '10px',
    justifyContent: 'center',
    alignItems: 'center'
  });

  constructor(private viewContainerRef: ViewContainerRef) {}

  hasContent() {
    return !!this.viewContainerRef.length;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.style && changes.style.currentValue) {
      this.currentStyle.set({
        width: '200px',
        height: '100px',
        background: '#eee',
        border: '1px solid #ddd',
        display: 'flex',
        padding: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        ...this.style
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
    this.register('Card', CardWidget);
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
