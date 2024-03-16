import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { NodeTitleWidget } from '../node-title/node-title.widget';
import { Engine, TreeNode } from '@/app/core/models';
import { Cursor, CursorStatus } from '@/app/core/models/cursor';
import { autorun } from '@formily/reactive';

@Component({
  selector: 'app-ghost',
  standalone: true,
  template: `
    @if (cursor.status === CursorStatus.Dragging) {
      <div class="{{ prefix }}" #containerRef>
        <span style="white-space: nowrap">
          <app-node-title-widget [node]="firstNode"></app-node-title-widget>
          {{ movingNodes?.length > 1 ? '...' : '' }}
        </span>
      </div>
    }
  `,
  imports: [NodeTitleWidget],
  styleUrls: ['./ghost.widget.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GhostWidget implements OnInit {
  @ViewChild('containerRef') containerRef: ElementRef;

  prefix = usePrefix('ghost');

  protected readonly CursorStatus = CursorStatus;

  cursor: Cursor;

  movingNodes: TreeNode[];

  firstNode: TreeNode;

  constructor(
    public designer: Engine,
    private cdr: ChangeDetectorRef
  ) {
    this.cursor = this.designer.cursor;
  }

  ngOnInit(): void {
    window.addEventListener('mousedown', () => {
      setTimeout(() => {
        this.movingNodes = this.designer.findMovingNodes();
        console.log(this.movingNodes);
        this.firstNode = this.movingNodes[0];
        console.log(this.firstNode);
      }, 200);
    });
    autorun(() => {
      // console.log('cursor status>>>', this.cursor.status);
      this.cdr.markForCheck();
      const transform = `perspective(1px) translate3d(${
        this.cursor.position?.topClientX - 18
      }px,${this.cursor.position?.topClientY - 12}px,0) scale(0.8)`;
      if (!this.containerRef) return;
      // console.log('autorun', this.containerRef);
      this.containerRef.nativeElement.style.transform = transform;
    });
  }
}
