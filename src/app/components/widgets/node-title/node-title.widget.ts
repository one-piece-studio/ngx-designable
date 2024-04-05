import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TreeNode } from '@/app/core/models';

@Component({
  selector: 'app-node-title-widget',
  standalone: true,
  template: ` {{ currentTitle }} `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class NodeTitleWidget implements OnChanges {
  @Input() node: TreeNode;

  currentTitle: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.node && changes.node.currentValue) {
      const node = this.takeNode(this.node);
      const message = node.getMessage('title');
      this.currentTitle = message ? message : node.componentName;
    }
  }

  private takeNode(node: TreeNode) {
    if (node.componentName === '$$ResourceNode$$') {
      return node.children[0];
    }
    return node;
  }
}
