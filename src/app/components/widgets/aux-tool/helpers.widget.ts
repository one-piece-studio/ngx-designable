import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Engine, TreeNode } from '@/app/core/models';
import { usePrefix } from '@/app/utils';
import { SelectorWidget } from '@/app/components/widgets/aux-tool/selector.widget';
import { Viewport } from '@/app/core/models/viewport';

@Component({
  selector: 'app-helpers-widget',
  template: `
    @if (node && nodeRect) {
      <div class="{{ prefix }} {{ position }}" #container>
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
export class HelpersWidget implements OnChanges {
  prefix = usePrefix('aux-helpers');

  @ViewChild('container') container: ElementRef;

  @Input() node: TreeNode;

  @Input() nodeRect: DOMRect;

  position: string = 'top-right';

  viewport: Viewport;

  promise: Promise<void>;

  resolve: () => void;

  reject: (error) => void;

  constructor(
    private designer: Engine,
    private cdr: ChangeDetectorRef
  ) {
    this.viewport = this.designer.workbench.currentWorkspace.viewport;
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nodeRect && changes.nodeRect.currentValue) {
      this.update();
      this.resolve();
    }
  }

  async update() {
    await this.promise;
    const helpersRect = this.container?.nativeElement?.getBoundingClientRect();
    if (!helpersRect || !this.nodeRect) return;
    this.position =
      this.getYInViewport(this.nodeRect, helpersRect) + '-' + this.getXInViewport(this.nodeRect, helpersRect);
    this.cdr.markForCheck();
  }

  getYInViewport = (nodeRect: DOMRect, helpersRect: DOMRect) => {
    if (nodeRect.top - this.viewport.scrollY > helpersRect.height) {
      return 'top';
    } else if (this.viewport.isScrollTop && nodeRect.height + helpersRect.height > this.viewport.height) {
      return 'inner-top';
    } else if (
      nodeRect.bottom >= this.viewport.scrollY + this.viewport.height &&
      nodeRect.height + helpersRect.height > this.viewport.height
    ) {
      return 'inner-bottom';
    }

    return 'bottom';
  };

  getXInViewport = (nodeRect: DOMRect, helpersRect: DOMRect) => {
    const widthDelta = helpersRect.width - nodeRect.width;
    if (widthDelta >= 0) {
      if (nodeRect.x < widthDelta) {
        return 'left';
      } else if (nodeRect.right + widthDelta > this.viewport.width) {
        return 'right';
      } else {
        return 'center';
      }
    }
    return 'right';
  };
}