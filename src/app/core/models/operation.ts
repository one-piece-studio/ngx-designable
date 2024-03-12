import { ITreeNode, TreeNode } from './tree-node';
import { Engine } from './engine';
import { Workspace } from './workspace';
import { Selection } from './selection';
import { Hover } from './hover';
import { TransformHelper } from './transform-helper';
import { MoveHelper } from './move-helper';
import { ICustomEvent } from '@/app/shared/event';
import { isFn } from '@/app/shared/types';

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

  dispatch(event: ICustomEvent, callback?: () => void) {
    if (this.workspace.dispatch(event) === false) return;
    if (isFn(callback)) return callback();
  }
}
