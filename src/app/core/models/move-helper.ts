import { Operation } from './operation';
import { TreeNode } from './tree-node';
import { Viewport } from './viewport';
import { IPoint, Rect } from '../../shared/coordinate';

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
}
