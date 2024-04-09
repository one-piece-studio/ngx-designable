import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { TreeNode, Viewport, Workbench } from '@/app/core/models';
import { HookService } from '@/app/services/hook.service';
import { globalThisPolyfill } from '@/app/shared/globalThisPolyfill';
import { OutlineNodeWidget } from './outline-node.widget';
import { OutlineInsertionWidget } from '@/app/components/widgets/outline/outline-insertion.widget';

@Component({
  selector: 'app-outline',
  template: `
    <div class="{{ prefix }}-container">
      <div class="{{ prefix }}-content" #content>
        <app-outline-node [node]="tree"></app-outline-node>
        <div class="{{ prefix }}-aux" style="pointer-events: none">
          <app-outline-insertion></app-outline-insertion>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [OutlineNodeWidget, OutlineInsertionWidget],
  styleUrls: ['./outline.widget.less']
})
export class OutlineWidget implements AfterViewInit, OnDestroy {
  prefix = usePrefix('outline-tree');

  @ViewChild('content') content: ElementRef;

  workbench: Workbench;

  workspaceId: string;

  tree: TreeNode;

  outline: Viewport;

  constructor(private hookService: HookService) {}

  ngAfterViewInit(): void {
    this.workbench = this.hookService.useWorkbench();
    const workspace = this.workbench.activeWorkspace || this.workbench.currentWorkspace;
    this.workspaceId = workspace?.id;
    this.tree = this.hookService.useTree(this.workspaceId);
    this.outline = this.hookService.useOutline(this.workspaceId);
    this.outline.onMount(this.content.nativeElement, globalThisPolyfill);
  }

  ngOnDestroy(): void {
    this.outline.onUnmount();
  }
}
