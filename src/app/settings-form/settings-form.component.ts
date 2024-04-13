import { usePrefix } from '../utils';
import { AfterViewInit, Component, signal } from '@angular/core';
import { HookService } from '@/app/services/hook.service';
import { Operation, TreeNode, Workbench } from '@/app/core/models';
import { SFUISchema } from '@delon/form';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-settings-form',
  standalone: false,
  template: `
    <div class="{{ prefix }}-wrapper">
      @if (!isEmpty()) {
        <app-node-path [workspaceId]="currentWorkspaceId"></app-node-path>
      }
      <div class="{{ prefix }}-content">
        @if (!isEmpty()) {
          <sf [schema]="schema" [button]="null"></sf>
        } @else {
          <div class="{{ prefix }}-empty">
            <nz-empty></nz-empty>
          </div>
        }
      </div>
    </div>
  `,
  styleUrls: ['./styles.less']
})
export class SettingsFormComponent implements AfterViewInit {
  prefix = usePrefix('settings-form');

  isEmpty = signal(true);

  workbench: Workbench;

  currentWorkspaceId: string;

  operation: Operation;

  node: TreeNode;

  selected: string[];

  schema: SFUISchema;

  constructor(private hookService: HookService) {}

  ngAfterViewInit(): void {
    this.pageInit();

    fromEvent(window, 'mouseup').subscribe(() => this.pageInit());
  }

  pageInit() {
    this.workbench = this.hookService.useWorkbench();
    const currentWorkspace = this.workbench.activeWorkspace || this.workbench.currentWorkspace;
    const id = currentWorkspace?.id;
    this.currentWorkspaceId = id;
    this.operation = this.hookService.useOperation(id);
    this.node = this.hookService.useSelectedNode(id);
    this.selected = this.hookService.useSelected(id);
    this.schema = this.node?.designerProps?.propsSchema;
    console.log('schema>>>', this.schema);

    this.isEmpty.set(!(this.node && this.node.designerProps.propsSchema && this.selected.length === 1));
  }
}
