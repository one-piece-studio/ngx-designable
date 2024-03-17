import { ChangeDetectionStrategy, Component } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { MobileBodyComponent } from './mobile-body.component';

@Component({
  selector: 'app-mobile-simulator',
  template: `
    <div class="{{ prefix }}">
      <div class="{{ prefix }}-content">
        <app-mobile-body>
          <ng-content></ng-content>
        </app-mobile-body>
      </div>
    </div>
  `,
  standalone: true,
  styleUrls: ['./mobile-simulator.component.less'],
  imports: [MobileBodyComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileSimulatorComponent {
  prefix = usePrefix('mobile-simulator');
}
