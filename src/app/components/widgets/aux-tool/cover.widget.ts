import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HookService } from '@/app/services/hook.service';
import { TreeNode, Viewport, ClosestPosition, MoveHelper, Cursor, CursorStatus } from '@/app/core/models';
import { usePrefix } from '@/app/utils';

@Component({
  selector: 'app-cover-rect',
  template: `
    <div class="{{ prefix }}" [class.dragging]="dragging" [class.dropping]="dropping" style="{{ createCoverStyle() }}">
    </div>
  `,
  standalone: true,
  styleUrls: ['./styles.less']
})
export class CoverRectWidget implements OnChanges {
  prefix = usePrefix('aux-cover-rect');

  @Input() node: TreeNode;

  @Input() dragging: boolean;

  @Input() dropping: boolean;

  rect: DOMRect;

  createCoverStyle = () => {
    const baseStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none'
    } as any;
    if (this.rect) {
      baseStyle.transform = `perspective(1px) translate3d(${this.rect.x}px,${this.rect.y}px,0)`;
      baseStyle.height = `${this.rect.height}px`;
      baseStyle.width = `${this.rect.width}px`;
    }
    return baseStyle;
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private hookService: HookService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.node && changes.node.currentValue) {
      const viewport = this.hookService.useViewport();
      this.rect = viewport.getValidNodeOffsetRect(this.node) as any;
      this.cdr.detectChanges();
    }
  }
}

@Component({
  selector: 'app-cover',
  template: `
    @if (cursor.status === CursorStatus.Dragging) {
      @for (node of viewportMoveHelper.dragNodes; track node) {
        @if (node && viewport.findElementById(node.id)) {
          <app-cover-rect [node]="node" [dragging]="true"></app-cover-rect>
        }
      }
      @if (
        !viewportMoveHelper.closestNode ||
        !viewportMoveHelper.closestNode?.allowAppend(viewportMoveHelper.dragNodes) ||
        viewportMoveHelper.viewportClosestDirection !== ClosestPosition.Inner
      ) {
      } @else {
        <app-cover-rect [node]="viewportMoveHelper.closestNode" [dropping]="true"></app-cover-rect>
      }
    }
  `,
  standalone: true,
  imports: [CoverRectWidget],
  styleUrls: ['./styles.less']
})
export class CoverWidget {
  protected readonly CursorStatus = CursorStatus;
  protected readonly ClosestPosition = ClosestPosition;

  viewportMoveHelper: MoveHelper;

  viewport: Viewport;

  cursor: Cursor;

  constructor(
    private hookService: HookService,
    private cdr: ChangeDetectorRef
  ) {
    this.viewportMoveHelper = this.hookService.useMoveHelper();
    this.viewport = this.hookService.useViewport();
    this.cursor = this.hookService.useCursor();
  }
}
