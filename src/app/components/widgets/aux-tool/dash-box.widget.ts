import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { Hover } from '@/app/core/models/hover';
import { HookService } from '@/app/services/hook.service';
import { Selection } from '@/app/core/models/selection';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-dash-box',
  template: `
    @if (hover.node && !hover.node.hidden && !selection.selected.includes(hover.node.id)) {
      <div class="{{ prefix }}" style="{{ createTipsStyle() }}">
        <span class="{{ prefix }}-title" [style]="style">
          {{ hover?.node.getMessage('title') }}
        </span>
      </div>
    }
  `,
  standalone: true,
  styleUrls: ['./styles.less']
})
export class DashBoxWidget implements AfterViewInit {
  prefix = usePrefix('aux-dashed-box');

  hover: Hover;

  selection: Selection;

  rect: DOMRect;

  style = {
    position: 'absolute',
    bottom: '100%',
    left: 0,
    fontSize: 12,
    userSelect: 'none',
    fontWeight: 'lighter',
    whiteSpace: 'nowrap'
  };

  createTipsStyle = () => {
    const baseStyle = {
      top: 0,
      left: 0,
      pointerEvents: 'none',
      boxSizing: 'border-box',
      visibility: 'hidden',
      zIndex: 2
    } as any;
    if (this.rect) {
      baseStyle.transform = `perspective(1px) translate3d(${this.rect.x}px,${this.rect.y}px,0)`;
      baseStyle.height = `${this.rect.height}px`;
      baseStyle.width = `${this.rect.width}px`;
      baseStyle.visibility = 'visible';
    }
    return baseStyle;
  };

  constructor(
    private hookService: HookService,
    private cdr: ChangeDetectorRef
  ) {
    this.hover = this.hookService.useHover();
    this.selection = this.hookService.useSelection();
  }

  ngAfterViewInit(): void {
    fromEvent(window, 'mousemove').subscribe(() => this.update());
  }

  update() {
    this.rect = this.hookService.useViewport().getValidNodeOffsetRect(this.hover.node) as any;
    this.cdr.markForCheck();
  }
}
