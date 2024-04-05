import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { uid } from '@/app/shared/uid';
import { Engine } from '@/app/core/models';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [],
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WorkspaceComponent implements OnInit {
  constructor(private designer: Engine) {}
  ngOnInit(): void {
    const workspace = {
      id: uid()
    };
    this.designer.workbench.ensureWorkspace(workspace);
  }
}
