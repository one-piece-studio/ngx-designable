import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-composite-panel',
  standalone: true,
  imports: [],
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompositePanelComponent {}
