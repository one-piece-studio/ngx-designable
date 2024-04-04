import { Component } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { HookService } from '@/app/services/hook.service';
import { ClosestPosition, MoveHelper } from '@/app/core/models';

@Component({
  selector: 'app-insertion',
  template: `<div class="{{ prefix }}" style="{{ createInsertionStyle() }}"></div>`,
  standalone: true,
  styleUrls: ['./styles.less']
})
export class InsertionWidget {
  prefix = usePrefix('aux-insertion');

  moveHelper: MoveHelper;

  createInsertionStyle = () => {
    const closestDirection = this.moveHelper.viewportClosestDirection;
    const closestRect = this.moveHelper.viewportClosestOffsetRect;
    const isInlineLayout = this.moveHelper.closestNode?.moveLayout === 'horizontal';
    const baseStyle = {
      position: 'absolute',
      transform: 'perspective(1px) translate3d(0,0,0)',
      top: 0,
      left: 0
    } as any;
    if (!closestRect) return baseStyle;
    if (closestDirection === ClosestPosition.Before || closestDirection === ClosestPosition.ForbidBefore) {
      baseStyle.width = '2px';
      baseStyle.height = `${closestRect.height}px`;
      baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`;
    } else if (closestDirection === ClosestPosition.After || closestDirection === ClosestPosition.ForbidAfter) {
      baseStyle.width = '2px';
      baseStyle.height = `${closestRect.height}px`;
      baseStyle.transform = `perspective(1px) translate3d(${
        closestRect.x + closestRect.width - 2
      }px,${closestRect.y}px,0)`;
    } else if (
      closestDirection === ClosestPosition.InnerAfter ||
      closestDirection === ClosestPosition.Under ||
      closestDirection === ClosestPosition.ForbidInnerAfter ||
      closestDirection === ClosestPosition.ForbidUnder
    ) {
      if (isInlineLayout) {
        baseStyle.width = '2px';
        baseStyle.height = `${closestRect.height}px`;
        baseStyle.transform = `perspective(1px) translate3d(${
          closestRect.x + closestRect.width - 2
        }px,${closestRect.y}px,0)`;
      } else {
        baseStyle.width = `${closestRect.width}px`;
        baseStyle.height = '2px';
        baseStyle.transform = `perspective(1px) translate3d(${
          closestRect.x
        }px,${closestRect.y + closestRect.height - 2}px,0)`;
      }
    } else if (
      closestDirection === ClosestPosition.InnerBefore ||
      closestDirection === ClosestPosition.Upper ||
      closestDirection === ClosestPosition.ForbidInnerBefore ||
      closestDirection === ClosestPosition.ForbidUpper
    ) {
      if (isInlineLayout) {
        baseStyle.width = '2px';
        baseStyle.height = `${closestRect.height}px`;
        baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`;
      } else {
        baseStyle.width = `${closestRect.width}px`;
        baseStyle.height = '2px';
        baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`;
      }
    }
    if (closestDirection.includes('FORBID')) {
      baseStyle.backgroundColor = 'red';
    }
    return baseStyle;
  };

  constructor(private hookService: HookService) {
    this.moveHelper = this.hookService.useMoveHelper();
  }
}
