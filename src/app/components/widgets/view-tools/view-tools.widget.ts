import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { SharedModule } from '@/app/shared/shared.module';
import { IconWidget } from '../icon/icon.widget';

@Component({
  selector: 'app-view-tools-widget',
  standalone: true,
  template: `
    <div class="{{ prefix }}" [style]="style">
      <nz-button-group>
        @if (use.includes('DESIGNABLE')) {
          <button nz-button nzSize="small">
            <app-icon icon="Design"></app-icon>
          </button>
        }
        @if (use.includes('JSONTREE')) {
          <button nz-button nzSize="small">
            <app-icon icon="Json"></app-icon>
          </button>
        }
        @if (use.includes('MARKUP')) {
          <button nz-button nzSize="small">
            <app-icon icon="Code"></app-icon>
          </button>
        }
        @if (use.includes('PREVIEW')) {
          <button nz-button nzSize="small">
            <app-icon icon="Play"></app-icon>
          </button>
        }
      </nz-button-group>
    </div>
  `,
  styleUrls: ['../../styles/styles.less'],
  imports: [SharedModule, IconWidget],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ViewToolsWidget {
  prefix = usePrefix('view-tools');

  @Input() style: { [p: string]: any };

  @Input() use = ['DESIGNABLE', 'JSONTREE', 'PREVIEW'];
}
