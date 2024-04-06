import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { TreeNode } from '@/app/core/models';
import { NgTemplateOutlet } from '@angular/common';
import { WidgetFactory } from '@/app/pages/home/register';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { ResponsiveService } from '@/app/services/responsive.service';

@Component({
  selector: 'app-tree-node-widget',
  standalone: true,
  template: `
    @if (node && !node.hidden) {
      @if (component) {
        <ng-container #container> </ng-container>
      } @else {
        @if (node?.children?.length) {
          @for (child of node.children; track child.id) {
            <app-tree-node-widget [node]="child"></app-tree-node-widget>
          }
        }
      }
    }
    <template #renderChildren>
      @if (node?.children && node?.children.length > 0) {
        @for (child of node.children; track child.id) {
          <app-tree-node-widget #treeNodeWidget [node]="child"></app-tree-node-widget>
        }
      }
    </template>
  `,
  styles: [``],
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TreeNodeWidget implements OnChanges, AfterViewInit, OnDestroy {
  @Input() node: TreeNode;

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  @ViewChild('renderChildren') children: ElementRef<any>;

  component: string;

  destroy$ = new Subject<void>();

  constructor(
    private factory: WidgetFactory,
    private cdr: ChangeDetectorRef,
    private responsiveService: ResponsiveService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.responsiveService.subscribe(() => this.cdr.detectChanges());

    fromEvent(window, 'mouseup')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.cdr.detectChanges());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.node && changes.node.currentValue) {
      const name = this.node.componentName;
      this.component = this.factory.get(name);
      setTimeout(() => {
        const options = {} as any;
        if (this.children?.nativeElement) {
          options['projectableNodes'] = [[this.children.nativeElement.content]];
        }
        const ref = this.factory.createComponent(this.container, name, options);
        if (ref) {
          ref.setInput('node', this.node);
        }
      });
    }
  }
}
