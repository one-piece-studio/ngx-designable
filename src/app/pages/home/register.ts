import {
  Component,
  ContentChildren,
  ElementRef,
  EnvironmentInjector,
  Injectable,
  Injector,
  Input,
  NgModuleRef,
  OnChanges,
  QueryList,
  signal,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { Engine, TreeNode } from '../../core/models';
import { NgIf } from '@angular/common';
import { AttributeDirective } from '@/app/directive';
import { TreeNodeWidget } from '@/app/components/widgets/tree-node/tree-node.widget';

@Component({
  selector: 'app-field',
  template: `
    <span [style]="currentStyle()" [attributes]="attributes">
      <span data-content-editable="title">{{ node.props.title }}</span>
      <ng-content></ng-content>
    </span>
  `,
  imports: [AttributeDirective],
  standalone: true
})
export class FieldWidget implements OnChanges {
  @Input() node: TreeNode;

  @Input() style: { [p: string]: any };

  attributes: { [p: string]: any };

  currentStyle = signal({
    background: '#eee',
    display: 'inline-block',
    padding: '10px 20px',
    border: '1px solid #ddd'
  });

  constructor(private designer: Engine) {}

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
    if (changes.node) {
      this.attributes = {
        [this.designer?.props?.nodeIdAttrName]: this.node.id
      };
    }
  }
}

@Component({
  selector: 'app-card',
  template: `
    <div [style]="currentStyle()" [attributes]="attributes">
      <span *ngIf="!hasContent()">拖拽字段进入该区域</span>
      <ng-content></ng-content>
    </div>
  `,
  imports: [NgIf, AttributeDirective],
  standalone: true
})
export class CardWidget implements OnChanges {
  @Input() node: TreeNode;

  @Input() style: { [p: string]: any };

  @ContentChildren(TreeNodeWidget, { descendants: true }) content: QueryList<TreeNodeWidget>;

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

  attributes: { [p: string]: any };

  constructor(
    private viewContainerRef: ViewContainerRef,
    private designer: Engine,
    private elementRef: ElementRef
  ) {}

  hasContent() {
    const element = this.elementRef.nativeElement.querySelector('app-tree-node-widget');
    return !!element;
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
    if (changes.node) {
      this.attributes = {
        [this.designer?.props?.nodeIdAttrName]: this.node.id
      };
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

  createComponent(
    container: ViewContainerRef,
    name: string,
    options?: {
      index?: number;
      injector?: Injector;
      ngModuleRef?: NgModuleRef<unknown>;
      environmentInjector?: EnvironmentInjector | NgModuleRef<unknown>;
      projectableNodes?: Node[][];
    }
  ) {
    const component = this._container.get(name);
    if (component) {
      return container.createComponent(component, options);
    }
    return null;
  }
}
