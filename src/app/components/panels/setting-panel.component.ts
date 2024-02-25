import { ChangeDetectionStrategy, Component } from '@angular/core';
import { usePrefix } from '@/app/utils';

@Component({
  selector: 'app-setting-panel',
  standalone: true,
  imports: [],
  template: `
    <div class="{{ prefix }}">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
      }
    `
  ],
  styleUrls: ['../styles/styles.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingPanelComponent {
  prefix: string = usePrefix('settings-panel');
}
