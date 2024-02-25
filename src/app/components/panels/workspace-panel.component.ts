import { ChangeDetectionStrategy, Component } from '@angular/core';
import { usePrefix } from '@/app/utils';

@Component({
  selector: 'app-workspace-panel',
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
        flex-grow: 1;
      }
    `
  ],
  styleUrls: ['../styles/styles.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspacePanelComponent {
  prefix = usePrefix('workspace-panel');
}
