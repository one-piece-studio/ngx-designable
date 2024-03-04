import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PcSimulatorComponent } from '../simulators/pc-simulator/pc-simulator.component';

@Component({
  selector: 'app-simulator',
  template: `
    <app-pc-simulator>
      <ng-content></ng-content>
    </app-pc-simulator>
  `,
  styles: [``],
  standalone: true,
  imports: [PcSimulatorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulatorComponent {}
