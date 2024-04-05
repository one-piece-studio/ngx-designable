import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '@/app/core/models';
import { usePrefix } from '@/app/utils';
import { SharedModule } from '@/app/shared/shared.module';
import { NodeTitleWidget } from '@/app/components/widgets/node-title/node-title.widget';
import { IconWidget } from '@/app/components/widgets/icon/icon.widget';

@Component({
  selector: 'app-selector-widget',
  template: `
    <div class="{{ prefix }}">
      <button nz-button nzType="primary" class="{{ prefix }}-title">
        <ng-container *ngTemplateOutlet="renderIcon; context: { $implicit: node }"></ng-container>
        <span>
          <app-node-title-widget [node]="node"></app-node-title-widget>
        </span>
      </button>
    </div>

    <ng-template #renderIcon let-node>
      @if (node.designerProps.icon) {
        <app-icon [icon]="node.designerProps.icon"></app-icon>
      }
      @if (node === node.root) {
        <app-icon icon="Page"></app-icon>
      } @else if (node.designerProps?.droppable) {
        <app-icon icon="Container"></app-icon>
      } @else {
        <app-icon icon="Component"></app-icon>
      }
    </ng-template>
  `,
  standalone: true,
  styleUrls: ['./styles.less'],
  imports: [SharedModule, NodeTitleWidget, IconWidget],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})
export class SelectorWidget {
  prefix = usePrefix('aux-selector');

  parentPrefix = usePrefix('aux-helpers');

  @Input() node: TreeNode;

  displayName = 'Selector';
}
