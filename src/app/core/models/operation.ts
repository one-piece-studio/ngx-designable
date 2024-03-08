import { ITreeNode, TreeNode } from './tree-node';
import { Engine } from './engine';
import { Workspace } from './workspace';
import { Selection } from './selection';
import { Hover } from './hover';
import { TransformHelper } from './transform-helper';
import { MoveHelper } from './move-helper';

export interface IOperation {
  tree?: ITreeNode;
  selected?: string[];
}

export class Operation {
  workspace: Workspace;

  engine: Engine;

  tree: TreeNode;

  selection: Selection;

  hover: Hover;

  transformHelper: TransformHelper;

  moveHelper: MoveHelper;

  requests = {
    snapshot: null
  };
}
