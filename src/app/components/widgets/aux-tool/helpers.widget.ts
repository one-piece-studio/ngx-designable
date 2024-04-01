import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TreeNode } from '@/app/core/models';
import { usePrefix } from '@/app/utils';
import { SelectorWidget } from '@/app/components/widgets/aux-tool/selector.widget';

@Component({
  selector: 'app-helpers-widget',
  template: `
    @if (node && nodeRect) {
      <div class="{{ prefix }}">
        <div class="{{ prefix }}-content">
          <app-selector-widget [node]="node"></app-selector-widget>
        </div>
      </div>
    }
  `,
  standalone: true,
  styleUrls: ['./styles.less'],
  imports: [SelectorWidget],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpersWidget {
  prefix = usePrefix('aux-helpers');

  @Input() node: TreeNode;

  @Input() nodeRect: DOMRect;

  position: string = 'top-right';
}
