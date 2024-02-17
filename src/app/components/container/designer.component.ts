import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SharedModule } from '@/app/shared/shared.module';
import { APP_PREFIX } from '@/app/constant/constant';

@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [SharedModule],
  template: `
    <p>designer works!</p>
    <div [ngClass]="classNameList">
      <ng-content></ng-content>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignerComponent implements OnInit, OnChanges {
  @Input() prefixClass = APP_PREFIX;

  @Input() theme: 'light' | 'dark' = 'light';

  classNameList: string[] = [];

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

  private createClass() {
    this.classNameList = [this.prefixClass + 'app', this.prefixClass + this.theme];
  }
}
