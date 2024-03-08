import { TransformHelper } from './transform-helper';
import { TreeNode } from './tree-node';
import { ILineSegment, IPoint } from '../../shared/coordinate';
export type ISnapLineType = 'ruler' | 'space-block' | 'normal';

export type ISnapLine = ILineSegment & {
  type?: ISnapLineType;
  distance?: number;
  id?: string;
  refer?: TreeNode;
};
export class SnapLine {
  _id: string;
  type: ISnapLineType;
  distance: number;
  refer: TreeNode;
  start: IPoint;
  end: IPoint;
  helper: TransformHelper;
}
