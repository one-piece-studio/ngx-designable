import { Rect } from '../../shared/coordinate';
import { TransformHelper } from './transform-helper';
import { TreeNode } from './tree-node';
export type ISpaceBlockType = 'top' | 'right' | 'bottom' | 'left' | (string & {});

export interface ISpaceBlock {
  id?: string;
  refer?: TreeNode;
  rect?: Rect;
  distance?: number;
  type?: ISpaceBlockType;
}

export type AroundSpaceBlock = Record<ISpaceBlockType, SpaceBlock>;
export class SpaceBlock {
  _id: string;
  distance: number;
  refer: TreeNode;
  helper: TransformHelper;
  rect: Rect;
  type: ISpaceBlockType;
}
