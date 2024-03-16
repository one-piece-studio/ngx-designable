import { Operation } from './operation';
import { TreeNode } from '@/app/core/models/tree-node';
import { isArr, isStr } from '@/app/shared/types';
import { SelectNodeEvent } from '@/app/core/events/mutation/SelectNodeEvent';

export interface ISelection {
  selected?: string[];
  operation?: Operation;
}
export class Selection {
  operation: Operation;
  selected: string[] = [];
  indexes: Record<string, boolean> = {};

  trigger(type = SelectNodeEvent) {
    return this.operation.dispatch(
      new type({
        target: this.operation.tree,
        source: this.selectedNodes
      })
    );
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
