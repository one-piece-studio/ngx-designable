import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef } from '@angular/core';
import { PcSimulatorComponent } from '../simulators/pc-simulator/pc-simulator.component';
import { Engine, Screen, ScreenType } from '@/app/core/models';
import { MobileSimulatorComponent } from '@/app/components/simulators/mobile-simulator/mobile-simulator.component';
import { NgTemplateOutlet } from '@angular/common';
import { ResponsiveSimulator } from '@/app/components/simulators/responsive-simulator/responsive-simulator.component';

@Component({
  selector: 'app-simulator',
  template: `
    @if (screen.type === ScreenType.PC) {
      <app-pc-simulator>
        <ng-container *ngTemplateOutlet="template"></ng-container>
      </app-pc-simulator>
    } @else if (screen.type === ScreenType.Mobile) {
      <app-mobile-simulator>
        <ng-container *ngTemplateOutlet="template"></ng-container>
      </app-mobile-simulator>
    } @else {
      <app-responsive-simulator>
        <ng-container *ngTemplateOutlet="template"></ng-container>
      </app-responsive-simulator>
    }
  `,
  styles: [``],
  standalone: true,
  imports: [PcSimulatorComponent, MobileSimulatorComponent, NgTemplateOutlet, ResponsiveSimulator],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SimulatorComponent {
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  screen: Screen;
  constructor(private designer: Engine) {
    this.screen = this.designer.screen;
  }

  protected readonly ScreenType = ScreenType;
}
