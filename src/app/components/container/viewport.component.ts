import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { usePrefix } from '../../utils';

@Component({
  selector: 'app-viewport',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div class="{{ prefix }}">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['../styles/styles.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewportComponent {
  prefix = usePrefix('viewport');
}
