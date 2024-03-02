import { usePrefix } from '../utils';
import { Component, signal } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-settings-form',
  standalone: true,
  template: `
    <div class="{{ prefix }}-wrapper">
      @if (!isEmpty()) {}
      <div class="{{ prefix }}-content">
        @if (!isEmpty()) {
        } @else {
          <div class="{{ prefix }}-empty">
            <nz-empty></nz-empty>
          </div>
        }
      </div>
    </div>
  `,
  styleUrls: ['./styles.less'],
  imports: [SharedModule]
})
export class SettingsFormComponent {
  prefix = usePrefix('settings-form');

  isEmpty = signal(true);
}
