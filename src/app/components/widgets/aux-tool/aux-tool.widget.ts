import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { Engine } from '@/app/core/models';
import { SelectionWidget } from './selection.widget';
import { HookService } from '@/app/services/hook.service';
import { DashBoxWidget } from '@/app/components/widgets/aux-tool/dash-box.widget';
import { CoverWidget } from '@/app/components/widgets/aux-tool/cover.widget';

@Component({
  selector: 'app-aux-tool-widget',
  template: `
    <div #ref class="{{ prefix }}">
      <app-selection-widget></app-selection-widget>
      <app-dash-box></app-dash-box>
      <app-cover></app-cover>
    </div>
  `,
  styleUrls: ['./styles.less'],
  standalone: true,
  imports: [SelectionWidget, DashBoxWidget, CoverWidget],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuxToolWidget implements AfterViewInit {
  prefix = usePrefix('auxtool');

  @ViewChild('ref') ref: ElementRef;

  constructor(
    private engine: Engine,
    private hookService: HookService
  ) {}

  ngAfterViewInit(): void {
    const element = this.ref.nativeElement;
    const viewport = this.hookService.useViewport();
    this.engine.subscribeWith('viewport:scroll', () => {
      if (viewport.isIframe && element) {
        element.style.transform = `perspective(1px) translate3d(${-viewport.scrollX}px,${-viewport.scrollY}px,0)`;
      }
    });
  }
}
