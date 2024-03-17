import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PcSimulatorComponent } from '../simulators/pc-simulator/pc-simulator.component';
import { Engine, Screen, ScreenType } from '@/app/core/models';
import { MobileSimulatorComponent } from '@/app/components/simulators/mobile-simulator/mobile-simulator.component';

@Component({
  selector: 'app-simulator',
  template: `
    @if (screen.type === ScreenType.PC) {
      <app-pc-simulator>
        <ng-content></ng-content>
      </app-pc-simulator>
    } @else if (screen.type === ScreenType.Mobile) {
      <!--            <app-mobile-simulator>-->
      <!--              <ng-content></ng-content>-->
      <!--            </app-mobile-simulator>-->
    } @else {
      <!--      <app-pc-simulator>-->
      <!--        <ng-content></ng-content>-->
      <!--      </app-pc-simulator>-->
    }
  `,
  styles: [``],
  standalone: true,
  imports: [PcSimulatorComponent, MobileSimulatorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulatorComponent {
  screen: Screen;
  constructor(private designer: Engine) {
    this.screen = this.designer.screen;
  }

  protected readonly ScreenType = ScreenType;
}
