import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { IconWidget } from '../icon/icon.widget';
import { Engine, TreeNode } from '@/app/core/models';

@Component({
  selector: 'app-empty-widget',
  template: `
    @if (!tree?.children?.length) {
      <div class="{{ prefix }}">
        <div [style]="{ display: 'flex', flexDirection: 'column' }">
          <div class="animations">
            <app-icon
              size="240"
              [icon]="dragTipsDirection === 'left' ? 'DragLeftSourceAnimation' : 'DragRightSourceAnimation'"
            ></app-icon>
            <app-icon size="240" icon="BatchDragAnimation"></app-icon>
          </div>
          <div class="hotkeys-list">
            <div>
              Selection <app-icon icon="Command"></app-icon> + Click / {{ ' ' }} <app-icon icon="Shift"></app-icon> +
              Click / <app-icon icon="Command"></app-icon> + A
            </div>
            <div> Copy <app-icon icon="Command"></app-icon> + C / Paste <app-icon icon="Command"></app-icon> + V </div>
            <div> Delete <app-icon icon="Delete"></app-icon> </div>
          </div>
        </div>
      </div>
    }
  `,
  styleUrls: ['./empty.widget.less'],
  standalone: true,
  imports: [IconWidget],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyWidget implements AfterViewInit {
  prefix = usePrefix('empty');

  @Input() dragTipsDirection: string = 'left';

  tree: TreeNode;
  constructor(
    private designer: Engine,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.tree = this.useTree();

    setInterval(() => {
      this.cdr.markForCheck();
    }, 1000);
  }

  useTree() {
    return this.designer.workbench.currentWorkspace.operation.tree;
  }
}
