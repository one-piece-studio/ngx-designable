import { Operation } from './operation';
import { TreeNode } from '@/app/core/models/tree-node';
import { isArr, isStr } from '@/app/shared/types';
import { SelectNodeEvent } from '@/app/core/events/mutation/SelectNodeEvent';
import { action, define, observable } from '@formily/reactive';
import { UnSelectNodeEvent } from '@/app/core/events';

export interface ISelection {
  selected?: string[];
  operation?: Operation;
}
export class Selection {
  operation: Operation;
  selected: string[] = [];
  indexes: Record<string, boolean> = {};

  constructor(props?: ISelection) {
    if (props.selected) {
      this.selected = props.selected;
    }
    if (props.operation) {
      this.operation = props.operation;
    }
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      selected: observable,
      select: action,
      batchSelect: action,
      add: action,
      remove: action,
      clear: action,
      crossAddTo: action
    });
  }

  trigger(type = SelectNodeEvent) {
    return this.operation.dispatch(
      new type({
        target: this.operation.tree,
        source: this.selectedNodes
      })
    );
  }

  crossAddTo(node: TreeNode) {
    if (node.parent) {
      const selectedNodes = this.selectedNodes;
      if (this.has(node)) {
        this.remove(node);
      } else {
        const minDistanceNode = selectedNodes.reduce((minDistanceNode, item) => {
          return item.distanceTo(node) < minDistanceNode.distanceTo(node) ? item : minDistanceNode;
        }, selectedNodes[0]);
        if (minDistanceNode) {
          const crossNodes = node.crossSiblings(minDistanceNode);
          crossNodes.forEach(node => {
            if (!this.has(node.id)) {
              this.selected.push(node.id);
              this.indexes[node.id] = true;
            }
          });
        }
        if (!this.has(node.id)) {
          this.selected.push(node.id);
          this.indexes[node.id] = true;
        }
      }
    }
  }

  has(...ids: string[] | TreeNode[]) {
    return this.mapIds(ids).some(id => {
      if (isStr(id)) {
        return this.indexes[id];
      } else {
        if (!id?.id) return false;
        return this.has(id?.id);
      }
    });
  }

  select(id: string | TreeNode) {
    if (isStr(id)) {
      if (this.selected.length === 1 && this.selected.includes(id)) {
        this.trigger(SelectNodeEvent);
        return;
      }
      this.selected = [id];
      this.indexes = { [id]: true };
      this.trigger(SelectNodeEvent);
    } else {
      this.select(id?.id);
    }
  }

  add(...ids: string[] | TreeNode[]) {
    this.mapIds(ids).forEach(id => {
      if (isStr(id)) {
        if (!this.selected.includes(id)) {
          this.selected.push(id);
          this.indexes[id] = true;
        }
      } else {
        this.add(id?.id);
      }
    });
    this.trigger();
  }

  remove(...ids: string[] | TreeNode[]) {
    this.mapIds(ids).forEach(id => {
      if (isStr(id)) {
        this.selected = this.selected.filter(item => item !== id);
        delete this.indexes[id];
      } else {
        this.remove(id?.id);
      }
    });
    this.trigger(UnSelectNodeEvent);
  }

  clear() {
    this.selected = [];
    this.indexes = {};
    this.trigger(UnSelectNodeEvent);
  }

  get first() {
    if (this.selected && this.selected.length) return this.selected[0];
    return null;
  }

  get last() {
    if (this.selected && this.selected.length) return this.selected[this.selected.length - 1];
    return null;
  }

  get length() {
    return this.selected.length;
  }

  get selectedNodes() {
    return this.selected.map(id => this.operation.tree.findById(id));
  }

  mapIds(ids: any) {
    return isArr(ids) ? ids.map((node: any) => (isStr(node) ? node : node?.id)) : [];
  }

  batchSelect(ids: string[] | TreeNode[]) {
    this.selected = this.mapIds(ids);
    this.indexes = this.selected.reduce((buf, id) => {
      buf[id] = true;
      return buf;
    }, {});
    this.trigger(SelectNodeEvent);
  }

  batchSafeSelect(ids: string[] | TreeNode[]) {
    if (!ids?.length) return;
    this.batchSelect(ids);
  }
}
