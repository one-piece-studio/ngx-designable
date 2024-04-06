import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { usePrefix } from '@/app/utils';
import { HookService } from '@/app/services/hook.service';
import { CursorDragType, Engine, Screen } from '@/app/core/models';
import {
  ResizeHandlerComponent,
  ResizeHandleType
} from '@/app/components/simulators/responsive-simulator/resize-handler.component';
import { IconWidget } from '@/app/components/widgets/icon/icon.widget';
import { DragMoveEvent, DragStartEvent, DragStopEvent } from '@/app/core/events';
import { calcSpeedFactor, createUniformSpeedAnimation } from '@/app/shared/animation';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-responsive-simulator',
  template: `
    <div class="{{ prefix }} {{ className }}" style="{{ currentStyle() }}">
      <div
        #container
        [style]="{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', overflow: 'overlay' }"
      >
        <div #content [style]="contentStyle">
          <ng-content></ng-content>
          <app-resize-handler [type]="ResizeHandleType.Resize">
            <app-icon icon="DragMove" [style]="{ pointerEvents: 'none' }"></app-icon>
          </app-resize-handler>
          <app-resize-handler [type]="ResizeHandleType.ResizeHeight">
            <app-icon icon="Menu" [style]="{ pointerEvents: 'none' }"></app-icon>
          </app-resize-handler>
          <app-resize-handler [type]="ResizeHandleType.ResizeWidth">
            <app-icon icon="Menu" [style]="{ pointerEvents: 'none' }"></app-icon>
          </app-resize-handler>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [ResizeHandlerComponent, IconWidget],
  styleUrls: ['./responsive-simulator.component.less']
})
export class ResponsiveSimulator implements OnChanges, AfterViewInit {
  @Input() className: string;

  @Input() style: Partial<CSSStyleDeclaration>;

  @ViewChild('container') container: ElementRef;

  @ViewChild('content') content: ElementRef;

  prefix = usePrefix('responsive-simulator');

  currentStyle = signal({
    height: '100%',
    width: '100%',
    minHeight: '100px',
    position: 'relative'
  });

  screen: Screen;

  engine: Engine;

  contentStyle: { [p: string]: any };

  protected readonly ResizeHandleType = ResizeHandleType;

  constructor(
    private hookService: HookService,
    private cdr: ChangeDetectorRef
  ) {
    this.screen = this.hookService.useScreen();
    this.engine = this.hookService.useDesigner();

    this.contentStyle = {
      width: `${this.screen.width == '100%' ? this.screen.width : this.screen.width + 'px'}`,
      height: `${this.screen.height == '100%' ? this.screen.height : this.screen.height + 'px'}`,
      paddingRight: '15px',
      paddingBottom: '15px',
      position: 'relative',
      boxSizing: 'border-box',
      overflow: 'hidden'
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.style && changes.style.currentValue) {
      this.currentStyle.set({
        height: '100%',
        width: '100%',
        minHeight: '100px',
        position: 'relative',
        ...this.style
      });
    }
  }

  ngAfterViewInit(): void {
    useResizeEffect(this.container.nativeElement, this.content.nativeElement, this.engine);

    fromEvent(window, 'mousemove').subscribe(() => {
      this.contentStyle = {
        width: `${this.screen.width == '100%' ? this.screen.width : this.screen.width + 'px'}`,
        height: `${this.screen.height == '100%' ? this.screen.height : this.screen.height + 'px'}`,
        paddingRight: '15px',
        paddingBottom: '15px',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden'
      };
    });
  }
}

export const useResizeEffect = (container: HTMLDivElement, content: HTMLDivElement, engine: Engine) => {
  let status: ResizeHandleType = null;
  let startX = 0;
  let startY = 0;
  let startWidth = 0;
  let startHeight = 0;
  let animationX = null;
  let animationY = null;

  const getStyle = (status: ResizeHandleType) => {
    if (status === ResizeHandleType.Resize) return 'nwse-resize';
    if (status === ResizeHandleType.ResizeHeight) return 'ns-resize';
    if (status === ResizeHandleType.ResizeWidth) return 'ew-resize';
    return 'nwse-resize';
  };

  const updateSize = (deltaX: number, deltaY: number) => {
    const containerRect = container?.getBoundingClientRect();
    if (status === ResizeHandleType.Resize) {
      engine.screen.setSize(startWidth + deltaX, startHeight + deltaY);
      container.scrollBy(containerRect.width + deltaX, containerRect.height + deltaY);
    } else if (status === ResizeHandleType.ResizeHeight) {
      engine.screen.setSize(startWidth, startHeight + deltaY);
      container.scrollBy(container.scrollLeft, containerRect.height + deltaY);
    } else if (status === ResizeHandleType.ResizeWidth) {
      engine.screen.setSize(startWidth + deltaX, startHeight);
      container.scrollBy(containerRect.width + deltaX, container.scrollTop);
    }
  };

  engine.subscribeTo(DragStartEvent, e => {
    if (!engine.workbench.currentWorkspace?.viewport) return;
    const target = e.data.target as HTMLElement;
    if (target?.closest(`*[${engine.props.screenResizeHandlerAttrName}]`)) {
      const rect = content?.getBoundingClientRect();
      if (!rect) return;
      status = target.getAttribute(engine.props.screenResizeHandlerAttrName) as ResizeHandleType;
      engine.cursor.setStyle(getStyle(status));
      startX = e.data.topClientX;
      startY = e.data.topClientY;
      startWidth = rect.width;
      startHeight = rect.height;
      engine.cursor.setDragType(CursorDragType.Resize);
    }
  });
  engine.subscribeTo(DragMoveEvent, e => {
    if (!engine.workbench.currentWorkspace?.viewport) return;
    if (!status) return;
    const deltaX = e.data.topClientX - startX;
    const deltaY = e.data.topClientY - startY;
    const containerRect = container?.getBoundingClientRect();
    const distanceX = Math.floor(containerRect.right - e.data.topClientX);
    const distanceY = Math.floor(containerRect.bottom - e.data.topClientY);
    const factorX = calcSpeedFactor(distanceX, 10);
    const factorY = calcSpeedFactor(distanceY, 10);
    updateSize(deltaX, deltaY);
    if (distanceX <= 10) {
      if (!animationX) {
        animationX = createUniformSpeedAnimation(1000 * factorX, delta => {
          updateSize(deltaX + delta, deltaY);
        });
      }
    } else {
      if (animationX) {
        animationX = animationX();
      }
    }

    if (distanceY <= 10) {
      if (!animationY) {
        animationY = createUniformSpeedAnimation(300 * factorY, delta => {
          updateSize(deltaX, deltaY + delta);
        });
      }
    } else {
      if (animationY) {
        animationY = animationY();
      }
    }
  });
  engine.subscribeTo(DragStopEvent, () => {
    if (!status) return;
    status = null;
    engine.cursor.setStyle('');
    engine.cursor.setDragType(CursorDragType.Move);
    if (animationX) {
      animationX = animationX();
    }
    if (animationY) {
      animationY = animationY();
    }
  });
};
