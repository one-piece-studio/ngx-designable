import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { Engine } from '@/app/core/models';
import { SelectionWidget } from './selection.widget';

@Component({
  selector: 'app-aux-tool-widget',
  template: `
    <div #ref class="{{ prefix }}">
      <app-selection-widget></app-selection-widget>
    </div>
  `,
  styleUrls: ['./styles.less'],
  standalone: true,
  imports: [SelectionWidget],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuxToolWidget implements AfterViewInit {
  prefix = usePrefix('auxtool');

  @ViewChild('ref') ref: ElementRef;

  constructor(private engine: Engine) {}

  ngAfterViewInit(): void {
    const element = this.ref.nativeElement;
    const viewport = this.engine.workbench.currentWorkspace.viewport;

    this.engine.subscribeWith('viewport:scroll', () => {
      if (viewport.isIframe && element) {
        element.style.transform = `perspective(1px) translate3d(${-viewport.scrollX}px,${-viewport.scrollY}px,0)`;
      }
    });
  }
}
