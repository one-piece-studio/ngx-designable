import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { usePrefix } from '../../utils';
import { AuxToolWidget } from '@/app/components/widgets/aux-tool/aux-tool.widget';
import { EmptyWidget } from '@/app/components/widgets/empty/empty.widget';

@Component({
  selector: 'app-viewport',
  standalone: true,
  imports: [SharedModule, AuxToolWidget, EmptyWidget],
  template: `
    <div class="{{ prefix }}">
      <ng-content></ng-content>
      <app-aux-tool-widget></app-aux-tool-widget>
      <app-empty-widget></app-empty-widget>
    </div>
  `,
  styleUrls: ['../styles/styles.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewportComponent {
  prefix = usePrefix('viewport');
}
