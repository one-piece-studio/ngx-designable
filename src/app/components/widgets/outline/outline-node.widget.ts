import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { usePrefix } from '@/app/utils';
import { ClosestPosition, Cursor, CursorStatus, Engine, MoveHelper, Selection, TreeNode } from '@/app/core/models';
import { HookService } from '@/app/services/hook.service';
import { IconWidget } from '../icon/icon.widget';
import { NodeTitleWidget } from '@/app/components/widgets/node-title/node-title.widget';
import { NgTemplateOutlet } from '@angular/common';
import { autorun } from '@formily/reactive';
import { DragMoveEvent } from '@/app/core/events';

@Component({
  selector: 'app-outline-node',
  template: `
    <div class="{{ prefix }} expanded" [attr.data-designer-outline-node-id]="node?.id" #container>
      <div class="{{ prefix }}-header">
        <div class="{{ prefix }}-header-head" [style]="headStyle"></div>
        <div class="{{ prefix }}-header-content">
          <div class="{{ prefix }}-header-base">
            @if (node?.children?.length > 0 || node === node?.root) {
              <div class="{{ prefix }}-expand">
                <app-icon icon="Expand" [size]="10"></app-icon>
              </div>
            }
            <div class="{{ prefix }}-icon">
              <ng-container *ngTemplateOutlet="renderIcon; context: { $implicit: node }"></ng-container>
            </div>
            <div class="{{ prefix }}-title">
              <span><app-node-title-widget [node]="node"></app-node-title-widget></span>
            </div>
          </div>
          <div class="{{ prefix }}-header-actions" data-click-stop-propagation>
            @if (node !== node?.root) {
              <app-icon
                classname="{{ prefix }}-hidden-icon"
                [icon]="node?.hidden ? 'EyeClose' : 'Eye'"
                size="14"
                (click)="node.hidden = !node.hidden"
              ></app-icon>
            }
          </div>
        </div>
      </div>
      <div class="{{ prefix }}-children">
        @if (Array.isArray(node?.children) && node?.children.length) {
          @for (child of node?.children; track child) {
            <app-outline-node [node]="child"></app-outline-node>
          }
        }
      </div>
    </div>

    <ng-template #renderIcon let-node>
      @if (node?.designerProps?.icon) {
        <app-icon [icon]="node.designerProps.icon" [size]="12"></app-icon>
      } @else if (node === node?.root) {
        <app-icon icon="Page" size="12"></app-icon>
      } @else if (node?.designerProps.droppable) {
        <app-icon icon="Container" size="12"></app-icon>
      } @else {
        <app-icon icon="Component" size="12"></app-icon>
      }
    </ng-template>
  `,
  standalone: true,
  imports: [IconWidget, NodeTitleWidget, NgTemplateOutlet],
  styleUrls: ['./outline.widget.less'],
  encapsulation: ViewEncapsulation.None
})
export class OutlineNodeWidget implements OnChanges, AfterViewInit {
  prefix = usePrefix('outline-tree-node');

  @ViewChild('container') container: ElementRef;

  @Input() node: TreeNode;

  engine: Engine;

  cursor: Cursor;

  selection: Selection;

  moveHelper: MoveHelper;

  headStyle: Partial<CSSStyleDeclaration>;

  protected readonly Array = Array;

  constructor(private hookService: HookService) {
    this.engine = this.hookService.useDesigner();
    this.cursor = this.hookService.useCursor();
    this.selection = this.hookService.useSelection();
    this.moveHelper = this.hookService.useMoveHelper();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.node && changes.node.currentValue) {
      this.headStyle = { left: `${-this.node.depth * 16}px`, width: `${this.node.depth * 16}px` };
    }
  }

  ngAfterViewInit(): void {
    autorun(() => {
      const selectedIds = this.selection?.selected || [];
      const id = this.node.id;
      const element = this.container.nativeElement;
      if (!element) return;
      if (selectedIds.includes(id)) {
        if (!element.classList.contains('selected')) {
          element.classList.add('selected');
        }
      } else {
        if (element.classList.contains('selected')) {
          element.classList.remove('selected');
        }
      }
      if (this.cursor.status === CursorStatus.Dragging && this.moveHelper?.dragNodes?.length) {
        if (element.classList.contains('selected')) {
          element.classList.remove('selected');
        }
      }
    });

    this.engine.subscribeTo(DragMoveEvent, () => {
      const closestNodeId = this.moveHelper?.closestNode?.id;
      const closestDirection = this.moveHelper?.outlineClosestDirection;
      const id = this.node.id;
      const element = this.container.nativeElement;
      let timerId;
      if (!element) return;
      if (closestNodeId === id && closestDirection === ClosestPosition.Inner) {
        if (!element.classList.contains('droppable')) {
          element.classList.add('droppable');
        }
        if (!element.classList.contains('expanded')) {
          if (timerId) {
            clearTimeout(timerId);
          }
          timerId = setTimeout(() => {
            element.classList.add('expanded');
          }, 600);
        }
      } else {
        if (timerId) {
          clearTimeout(timerId);
        }
        if (element.classList.contains('droppable')) {
          element.classList.remove('droppable');
        }
      }
    });
  }
}
