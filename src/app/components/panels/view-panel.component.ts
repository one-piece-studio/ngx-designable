import { ChangeDetectionStrategy, Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { WorkspacePanelItemComponent } from '@/app/components/panels/workspace-panel.component';
import { WorkbenchTypes } from '@/app/core/types';
import { Workbench } from '@/app/core/models/workbench';
import { ViewportComponent } from '@/app/components/container/viewport.component';

@Component({
  selector: 'app-view-panel',
  standalone: true,
  imports: [WorkspacePanelItemComponent, ViewportComponent],
  template: `
    @if (workbench.type === 'DESIGNABLE') {
      <app-viewport>
        <ng-content></ng-content>
      </app-viewport>
    } @else {
      <div [style]="defaultStyle()">
        <!--        <ng-content></ng-content>-->
      </div>
    }
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewPanelComponent implements OnChanges {
  @Input() scrollable: boolean = true;

  @Input() type: WorkbenchTypes;

  @Input() dragTipsDirection?: 'left' | 'right';

  workbench: Workbench = { type: 'DESIGNABLE' } as any;

  defaultStyle = signal({
    overflow: 'overlay',
    height: '100%',
    cursor: 'auto',
    userSelect: 'text'
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.scrollable) {
      this.defaultStyle.set({
        overflow: this.scrollable ? 'overlay' : 'hidden',
        height: '100%',
        cursor: 'auto',
        userSelect: 'text'
      });
    }
  }
}
