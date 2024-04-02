import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { Engine, TreeNode } from '@/app/core/models';
import { Selection } from '@/app/core/models/selection';
import { Cursor } from '@/app/core/models/cursor';
import { MoveHelper } from '@/app/core/models/move-helper';
import { AttributeDirective } from '@/app/directive';
import { HelpersWidget } from '@/app/components/widgets/aux-tool/helpers.widget';

@Component({
  selector: 'app-selection-box-widget',
  template: `
    <div class="{{ prefix }}" [attributes]="attributes" style="{{ createSelectionStyle() }}">
      <div class="{{ innerPrefix }}"></div>
      @if (showHelpers) {
        <app-helpers-widget [node]="node" [nodeRect]="nodeRect"></app-helpers-widget>
      }
    </div>
  `,
  standalone: true,
  styleUrls: [`./styles.less`],
  imports: [AttributeDirective, HelpersWidget],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SelectionBoxWidget implements OnChanges {
  @Input() node: TreeNode;

  @Input() showHelpers: boolean;

  prefix = usePrefix('aux-selection-box');

  innerPrefix = usePrefix('aux-selection-box-inner');

  nodeRect: DOMRect;

  attributes: { [p: string]: any };

  createSelectionStyle = () => {
    const baseStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      boxSizing: 'border-box',
      zIndex: 4
    } as any;
    if (this.nodeRect) {
      baseStyle.transform = `perspective(1px) translate3d(${this.nodeRect.x}px,${this.nodeRect.y}px,0)`;
      baseStyle.height = `${this.nodeRect.height}px`;
      baseStyle.width = `${this.nodeRect.width}px`;
    }
    return baseStyle;
  };
  constructor(
    private designer: Engine,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.node && changes.node.currentValue) {
      setTimeout(() => this.update());
    }
  }

  update() {
    this.nodeRect = this.designer.workbench.currentWorkspace.viewport.getValidNodeOffsetRect(this.node) as any;
    this.attributes = {
      [this.designer.props?.nodeSelectionIdAttrName]: this.node.id
    };
    this.cdr.markForCheck();
  }
}

@Component({
  selector: 'app-selection-widget',
  template: `
    @if (cursor.status === 'NORMAL' || !viewportMoveHelper.touchNode) {
      @for (id of selection.selected; track id) {
        @if (tree.findById(id) && !tree.findById(id).hidden) {
          <app-selection-box-widget
            [node]="tree.findById(id)"
            [showHelpers]="selection.selected.length === 1"
          ></app-selection-box-widget>
        }
      }
    }
  `,
  standalone: true,
  imports: [SelectionBoxWidget],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionWidget {
  selection: Selection;

  cursor: Cursor;

  viewportMoveHelper: MoveHelper;

  tree: TreeNode;

  constructor(private designer: Engine) {
    const operation = this.designer.workbench.currentWorkspace.operation;
    this.selection = operation.selection;
    this.viewportMoveHelper = operation.moveHelper;
    this.tree = operation.tree;
    this.cursor = this.designer.cursor;
  }
}
