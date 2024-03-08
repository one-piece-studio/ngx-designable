import { TreeNode } from './tree-node';
import { Operation } from './operation';
import { IPoint, IRect, ISize, Rect } from '../../shared/coordinate';
import { SnapLine } from './snapline';
import { AroundSpaceBlock } from './space-block';

export interface ITransformHelperProps {
  operation: Operation;
}

export type TransformHelperType = 'translate' | 'resize' | 'rotate' | 'scale' | 'round';

export type ResizeDirection =
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'center-top'
  | 'center-bottom'
  | 'right-top'
  | 'right-bottom'
  | 'right-center'
  | (string & {});

export interface ITransformHelperDragStartProps {
  type: TransformHelperType;
  direction?: ResizeDirection;
  dragNodes: TreeNode[];
}

export class TransformHelper {
  operation: Operation;

  type: TransformHelperType;

  direction: ResizeDirection;

  dragNodes: TreeNode[] = [];

  rulerSnapLines: SnapLine[] = [];

  aroundSnapLines: SnapLine[] = [];

  aroundSpaceBlocks: AroundSpaceBlock = null;

  viewportRectsStore: Record<string, Rect> = {};

  dragStartTranslateStore: Record<string, IPoint> = {};

  dragStartSizeStore: Record<string, ISize> = {};

  draggingNodesRect: Rect;

  cacheDragNodesReact: Rect;

  dragStartNodesRect: IRect = null;

  snapping = false;

  dragging = false;

  snapped = false;
}
