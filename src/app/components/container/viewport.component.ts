import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { usePrefix } from '../../utils';
import { AuxToolWidget } from '@/app/components/widgets/aux-tool/aux-tool.widget';
import { EmptyWidget } from '@/app/components/widgets/empty/empty.widget';
import { globalThisPolyfill } from '@/app/shared/globalThisPolyfill';
import { Viewport } from '@/app/core/models/viewport';
import { HookService } from '@/app/services/hook.service';

@Component({
  selector: 'app-viewport',
  standalone: true,
  imports: [SharedModule, AuxToolWidget, EmptyWidget],
  template: `
    <div class="{{ prefix }}" #containerRef>
      <ng-content></ng-content>
      <app-aux-tool-widget></app-aux-tool-widget>
      <app-empty-widget></app-empty-widget>
    </div>
  `,
  styleUrls: ['../styles/styles.less'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ViewportComponent implements AfterViewInit, OnDestroy {
  prefix = usePrefix('viewport');

  @ViewChild('containerRef') container: ElementRef;

  viewport: Viewport;

  constructor(private hookService: HookService) {}

  ngAfterViewInit(): void {
    this.viewport = this.hookService.useViewport();
    this.viewport.onMount(this.container.nativeElement, globalThisPolyfill);
  }

  ngOnDestroy(): void {
    this.viewport.onUnmount();
  }
}
