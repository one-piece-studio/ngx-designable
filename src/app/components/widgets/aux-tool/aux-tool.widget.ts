import { ChangeDetectionStrategy, Component } from '@angular/core';
import { usePrefix } from '@/app/utils';

@Component({
  selector: 'app-aux-tool-widget',
  template: ` <div class="{{ prefix }}"></div> `,
  styleUrls: ['./styles.less'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuxToolWidget {
  prefix = usePrefix('auxtool');
}
