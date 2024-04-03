import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { PcSimulatorComponent } from '../simulators/pc-simulator/pc-simulator.component';
import { Engine, Screen, ScreenType } from '@/app/core/models';
import { MobileSimulatorComponent } from '@/app/components/simulators/mobile-simulator/mobile-simulator.component';
import { NgTemplateOutlet } from '@angular/common';
import { ResponsiveService } from '@/app/services/responsive.service';

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
      <app-pc-simulator>
        <ng-container *ngTemplateOutlet="template"></ng-container>
      </app-pc-simulator>
    }
  `,
  styles: [``],
  standalone: true,
  imports: [PcSimulatorComponent, MobileSimulatorComponent, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimulatorComponent implements AfterViewInit {
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  screen: Screen;
  constructor(
    private designer: Engine,
    private responsiveService: ResponsiveService,
    private cdr: ChangeDetectorRef
  ) {
    this.screen = this.designer.screen;
  }

  ngAfterViewInit(): void {
    this.responsiveService.subscribe(() => this.cdr.detectChanges());
  }

  protected readonly ScreenType = ScreenType;
}
