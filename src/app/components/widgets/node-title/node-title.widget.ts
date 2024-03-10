import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TreeNode } from '../../../core/models';

@Component({
  selector: 'app-node-title-widget',
  standalone: true,
  template: ` {{ node.getMessage('title') || node.componentName }} `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeTitleWidget implements OnChanges {
  @Input() node: TreeNode;

  currentNode: TreeNode;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.node && changes.node.currentValue) {
      this.currentNode = this.takeNode(this.node);
    }
  }

  private takeNode(node: TreeNode) {
    if (node.componentName === '$$ResourceNode$$') {
      return node.children[0];
    }
    return node;
  }
}
