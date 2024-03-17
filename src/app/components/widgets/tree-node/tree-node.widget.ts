import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { TreeNode } from '@/app/core/models';
import { NgTemplateOutlet } from '@angular/common';
import { WidgetFactory } from '@/app/pages/home/register';

@Component({
  selector: 'app-tree-node-widget',
  standalone: true,
  template: `
    @if (node && !node.hidden) {
      @if (component) {
        <div #container>
          <ng-container *ngTemplateOutlet="renderChildren; context: { $implicit: node }"></ng-container>
        </div>
      } @else {
        <ng-container *ngTemplateOutlet="renderChildren; context: { $implicit: node }"></ng-container>
      }
    }
    <ng-template #renderChildren let-node>
      @if (node.children && node.children.length > 0) {
        @for (child of node.children; track child.id) {
          <app-tree-node-widget [node]="child"></app-tree-node-widget>
        }
      }
    </ng-template>
  `,
  styles: [``],
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeNodeWidget implements OnChanges, AfterViewInit {
  @Input() node: TreeNode;

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  component: string;

  constructor(
    private factory: WidgetFactory,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    setInterval(() => {
      this.cdr.markForCheck();
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.node && changes.node.currentValue) {
      const name = this.node.componentName;
      this.component = this.factory.get(name);
      setTimeout(() => {
        const ref = this.factory.createComponent(this.container, name);
        if (ref) {
          ref.setInput('node', this.node);
        }
      });
    }
  }
}
