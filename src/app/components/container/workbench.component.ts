import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { WorkspaceComponent } from './workspace.component';

@Component({
  selector: 'app-workbench',
  standalone: true,
  imports: [SharedModule, WorkspaceComponent],
  template: `
    <div>
      <app-workspace>
        <ng-content></ng-content>
      </app-workspace>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WorkbenchComponent {}
