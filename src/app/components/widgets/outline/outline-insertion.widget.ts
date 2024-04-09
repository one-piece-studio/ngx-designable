import { AfterViewInit, Component } from '@angular/core';
import { usePrefix } from '../../../utils';
import { HookService } from '../../../services/hook.service';
import { ClosestPosition, MoveHelper } from '../../../core/models';

@Component({
  selector: 'app-outline-insertion',
  template: `
    @if (moveHelper?.closestNode) {
      <div class="{{ prefix }}" style="{{ createInsertionStyle() }}"></div>
    }
  `,
  standalone: true,
  styleUrls: ['./outline.widget.less']
})
export class OutlineInsertionWidget implements AfterViewInit {
  prefix = usePrefix('outline-tree-insertion');

  moveHelper: MoveHelper;

  createInsertionStyle = () => {
    const closestDirection = this.moveHelper.outlineClosestDirection;
    const closestRect = this.moveHelper.outlineClosestOffsetRect;
    const baseStyle = {
      position: 'absolute',
      transform: 'perspective(1px) translate3d(0,0,0)',
      top: 0,
      left: 0
    } as any;
    if (!closestRect) return baseStyle;
    if (
      closestDirection === ClosestPosition.After ||
      closestDirection === ClosestPosition.InnerAfter ||
      closestDirection === ClosestPosition.Under ||
      closestDirection === ClosestPosition.ForbidAfter ||
      closestDirection === ClosestPosition.ForbidInnerAfter ||
      closestDirection === ClosestPosition.ForbidUnder
    ) {
      baseStyle.width = `${closestRect.width}px`;
      baseStyle.height = '2px';
      baseStyle.transform = `perspective(1px) translate3d(${
        closestRect.x
      }px,${closestRect.y + closestRect.height - 2}px,0)`;
    } else if (
      closestDirection === ClosestPosition.Before ||
      closestDirection === ClosestPosition.InnerBefore ||
      closestDirection === ClosestPosition.Upper ||
      closestDirection === ClosestPosition.ForbidBefore ||
      closestDirection === ClosestPosition.ForbidInnerBefore ||
      closestDirection === ClosestPosition.ForbidUpper
    ) {
      baseStyle.width = `${closestRect.width}px`;
      baseStyle.height = '2px';
      baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`;
    }
    if (closestDirection.includes('FORBID')) {
      baseStyle.backgroundColor = 'red';
    } else {
      baseStyle.backgroundColor = '';
    }
    return baseStyle;
  };

  constructor(private hookService: HookService) {}

  ngAfterViewInit(): void {
    this.moveHelper = this.hookService.useMoveHelper();
  }
}
