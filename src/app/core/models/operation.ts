import { ITreeNode, TreeNode } from './tree-node';
import { Engine } from './engine';
import { Workspace } from './workspace';
import { Selection } from './selection';
import { Hover } from './hover';
import { TransformHelper } from './transform-helper';
import { MoveHelper } from './move-helper';
import { ICustomEvent } from '@/app/shared/event';
import { isFn } from '@/app/shared/types';
import { cancelIdle, requestIdle } from '@/app/shared/request-idle';

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

  constructor(workspace: Workspace) {
    this.engine = workspace.engine;
    this.workspace = workspace;
    this.tree = new TreeNode({
      componentName: this.engine.props.rootComponentName,
      ...this.engine.props.defaultComponentTree,
      operation: this
    });

    this.moveHelper = new MoveHelper({
      operation: this
    });
  }

  snapshot(type?: string) {
    cancelIdle(this.requests.snapshot);
    if (!this.workspace || !this.workspace.history || this.workspace.history.locking) return;
    this.requests.snapshot = requestIdle(() => {
      this.workspace.history.push(type);
    });
  }

  dispatch(event: ICustomEvent, callback?: () => void) {
    if (this.workspace.dispatch(event) === false) return;
    if (isFn(callback)) return callback();
  }
}
