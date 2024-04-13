import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { HookService } from '@/app/services/hook.service';
import { Selection, TreeNode } from '@/app/core/models';
import { Hover } from '@/app/core/models/hover';
import { SharedModule } from '@/app/shared/shared.module';
import { IconWidget } from '@/app/components/widgets/icon/icon.widget';
import { NodeTitleWidget } from '@/app/components/widgets/node-title/node-title.widget';

@Component({
  selector: 'app-node-path',
  template: `
    @if (selected) {
      <nz-breadcrumb class="{{ prefix }}">
        @for (node of nodes; track node; let key = $index) {
          <nz-breadcrumb-item>
            @if (key === 0) {
              <app-icon icon="Position" [style]="{ marginRight: '3px' }"></app-icon>
            }
            <a href="">
              <app-node-title-widget [node]="node"></app-node-title-widget>
            </a>
          </nz-breadcrumb-item>
          <br />
        }
      </nz-breadcrumb>
    }
  `,
  standalone: true,
  imports: [SharedModule, IconWidget, NodeTitleWidget],
  styleUrls: ['./node-path.widget.less']
})
export class NodePathWidget implements OnChanges {
  prefix = usePrefix('node-path');

  @Input() workspaceId: string;

  @Input() maxItems: number;

  selection: Selection;

  selected: TreeNode;

  hover: Hover;

  nodes: TreeNode[] = [];

  constructor(private hookService: HookService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.workspaceId && changes.workspaceId.currentValue) {
      this.selected = this.hookService.useSelectedNode(this.workspaceId);
      this.selection = this.hookService.useSelection(this.workspaceId);
      this.hover = this.hookService.useHover(this.workspaceId);
      const maxItems = this.maxItems ?? 3;
      this.nodes = this.selected
        .getParents()
        .slice(0, maxItems - 1)
        .reverse()
        .concat(this.selected);
    }
  }
}
