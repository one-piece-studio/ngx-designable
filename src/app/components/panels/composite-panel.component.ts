import { ChangeDetectionStrategy, Component } from '@angular/core';
import { usePrefix } from '@/app/utils';

@Component({
  selector: 'app-composite-panel',
  standalone: true,
  imports: [],
  template: `
    <div class="{{ prefix }}">
      <div class="{{ prefix }}-tabs"> </div>
      <div class="{{ prefix }}-tabs-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
      }
    `
  ],
  styleUrls: ['./styles.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompositePanelComponent {
  prefix = usePrefix('composite-panel');
}
