import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { SharedModule } from '@/app/shared/shared.module';
import { APP_PREFIX } from '@/app/constant/constant';
import { Engine } from '@/app/core/models';
import { GhostWidget } from '@/app/components/widgets/ghost/ghost.widget';

@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [SharedModule, GhostWidget],
  template: `
    <div [ngClass]="classNameList">
      <ng-content></ng-content>
      <app-ghost></app-ghost>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DesignerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() prefixClass = APP_PREFIX;

  @Input() theme: 'light' | 'dark' = 'light';

  classNameList: string[] = [];

  constructor(private engine: Engine) {
    this.engine.mount();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.prefixClass && changes.prefixClass.currentValue) {
      this.createClass();
    }
    if (changes.theme && changes.theme.currentValue) {
      this.createClass();
    }
  }

  ngOnInit(): void {
    this.createClass();
  }

  ngOnDestroy(): void {
    this.engine.unmount();
  }

  private createClass() {
    this.classNameList = [this.prefixClass + 'app', this.prefixClass + this.theme];
  }
}
