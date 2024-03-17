import { Operation } from './operation';
import { TreeNode } from './tree-node';
import { action, define, observable } from '@formily/reactive';
import { HoverNodeEvent } from '@/app/core/events';

export interface IHoverProps {
  operation: Operation;
}

export class Hover {
  node: TreeNode = null;
  operation: Operation;

  constructor(props?: IHoverProps) {
    this.operation = props?.operation;
    this.makeObservable();
  }

  setHover(node?: TreeNode) {
    if (node) {
      this.node = node;
    } else {
      this.node = null;
    }
    this.trigger();
  }

  clear() {
    this.node = null;
  }

  trigger() {
    if (this.operation) {
      return this.operation.dispatch(
        new HoverNodeEvent({
          target: this.operation.tree,
          source: this.node
        })
      );
    }
  }

  makeObservable() {
    define(this, {
      node: observable.ref,
      setHover: action,
      clear: action
    });
  }
}
