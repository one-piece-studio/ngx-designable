import { ChangeDetectionStrategy, Component } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { ComponentSvg } from '@/app/components/icons/component';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [ComponentSvg],
  template: ` <div class="{{ prefix }}"><app-component-svg></app-component-svg></div> `,
  styleUrls: ['./icon.widget.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconWidget {
  prefix = usePrefix('icon');
}
