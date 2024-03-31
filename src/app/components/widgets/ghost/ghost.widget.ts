import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { usePrefix } from '@/app/utils';
import { NodeTitleWidget } from '../node-title/node-title.widget';
import { Engine, TreeNode } from '@/app/core/models';
import { Cursor, CursorStatus } from '@/app/core/models/cursor';
import { autorun } from '@formily/reactive';
import { fromEvent, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ghost',
  standalone: true,
  template: `
    @if (firstNode && cursor.status === CursorStatus.Dragging) {
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
export class GhostWidget implements AfterViewInit, OnDestroy {
  @ViewChild('containerRef') containerRef: ElementRef;

  destroy$ = new Subject<void>();

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

  ngAfterViewInit(): void {
    fromEvent(window, 'mousemove')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.movingNodes = this.designer.findMovingNodes();
        this.firstNode = this.movingNodes[0];
      });

    autorun(() => {
      this.cdr.detectChanges();
      const transform = `perspective(1px) translate3d(${
        this.cursor.position?.topClientX - 18
      }px,${this.cursor.position?.topClientY - 12}px,0) scale(0.8)`;
      if (!this.containerRef) return;
      if (!this.firstNode) return;
      this.containerRef.nativeElement.style.transform = transform;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
