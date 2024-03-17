import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WorkspacePanelItemComponent } from './workspace-panel.component';
import { SimulatorComponent } from '@/app/components/container/simulator.component';

@Component({
  selector: 'app-viewport-panel',
  standalone: true,
  imports: [WorkspacePanelItemComponent, SimulatorComponent],
  template: `
    <app-workspace-panel-item [style]="style" [flexible]="flexible">
      <app-simulator>
        <ng-content></ng-content>
      </app-simulator>
    </app-workspace-panel-item>
  `,
  styles: [
    `
      :host {
        flex: 1;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewportPanelComponent {
  @Input() style: { [p: string]: any } = { height: '100%' };

  @Input() flexible: boolean = true;
}
