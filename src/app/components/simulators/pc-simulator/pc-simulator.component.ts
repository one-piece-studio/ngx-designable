import { ChangeDetectionStrategy, Component } from '@angular/core';
import { usePrefix } from '../../../utils';

@Component({
  selector: 'app-pc-simulator',
  template: `
    <div class="{{ prefix }}">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./pc-simulator.component.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default
})
export class PcSimulatorComponent {
  prefix = usePrefix('pc-simulator');
}
