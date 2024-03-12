import { Operation } from './operation';
import { TreeNode } from './tree-node';
import { Viewport } from './viewport';
import { IPoint, Rect } from '../../shared/coordinate';
import { CursorDragType } from '@/app/core/models/cursor';
import { DragNodeEvent } from '@/app/core/events';

export enum ClosestPosition {
  Before = 'BEFORE',
  ForbidBefore = 'FORBID_BEFORE',
  After = 'After',
  ForbidAfter = 'FORBID_AFTER',
  Upper = 'UPPER',
  ForbidUpper = 'FORBID_UPPER',
  Under = 'UNDER',
  ForbidUnder = 'FORBID_UNDER',
  Inner = 'INNER',
  ForbidInner = 'FORBID_INNER',
  InnerAfter = 'INNER_AFTER',
  ForbidInnerAfter = 'FORBID_INNER_AFTER',
  InnerBefore = 'INNER_BEFORE',
  ForbidInnerBefore = 'FORBID_INNER_BEFORE',
  Forbid = 'FORBID'
}

export interface IMoveHelperProps {
  operation: Operation;
}

export interface IMoveHelperDragStartProps {
  dragNodes: TreeNode[];
}

export interface IMoveHelperDragDropProps {
  dropNode: TreeNode;
}
export interface IMoveHelperDragMoveProps {
  touchNode: TreeNode;
  point: IPoint;
}

export class MoveHelper {
  operation: Operation;

  rootNode: TreeNode;

  dragNodes: TreeNode[] = [];

  touchNode: TreeNode = null;

  closestNode: TreeNode = null;

  activeViewport: Viewport = null;

  viewportClosestRect: Rect = null;

  outlineClosestRect: Rect = null;

  viewportClosestOffsetRect: Rect = null;

  outlineClosestOffsetRect: Rect = null;

  viewportClosestDirection: ClosestPosition = null;

  outlineClosestDirection: ClosestPosition = null;

  dragging = false;

  constructor(props: IMoveHelperProps) {
    this.operation = props.operation;
    this.rootNode = this.operation.tree;
  }

  get cursor() {
    return this.operation.engine.cursor;
  }

  get viewport() {
    return this.operation.workspace.viewport;
  }

  get outline() {
    return this.operation.workspace.outline;
  }

  get hasDragNodes() {
    return this.dragNodes.length > 0;
  }

  get closestDirection() {
    if (this.activeViewport === this.outline) {
      return this.outlineClosestDirection;
    }
    return this.viewportClosestDirection;
  }

  dragStart(props: IMoveHelperDragStartProps) {
    const nodes = TreeNode.filterDraggable(props?.dragNodes);
    if (nodes.length) {
      this.dragNodes = nodes;
      this.trigger(
        new DragNodeEvent({
          target: this.operation.tree,
          source: this.dragNodes
        })
      );
      this.viewport.cacheElements();
      this.cursor.setDragType(CursorDragType.Move);
      this.dragging = true;
    }
  }

  trigger(event: any) {
    if (this.operation) {
      return this.operation.dispatch(event);
    }
  }
}
