import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WorkspacePanelItemComponent } from './workspace-panel.component';

@Component({
  selector: 'app-viewport-panel',
  standalone: true,
  imports: [WorkspacePanelItemComponent],
  template: `
    <app-workspace-panel-item [style]="style" [flexible]="flexible">
      <ng-content></ng-content>
    </app-workspace-panel-item>
  `,
  styles: [
    `
      :host {
        flex: 1;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewportPanelComponent {
  @Input() style: { [p: string]: any } = { height: '100%' };

  @Input() flexible: boolean = true;
}
