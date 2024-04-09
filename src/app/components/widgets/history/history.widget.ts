import { AfterViewInit, Component } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { HistoryItem, Workbench, Workspace } from '@/app/core/models';
import { DatePipe, NgIf } from '@angular/common';
import { HookService } from '@/app/services/hook.service';
import { TextWidget } from '../text/text.widget';

@Component({
  selector: 'app-history',
  template: `
    <div *ngIf="currentWorkspace" class="{{ prefix }}">
      @for (shot of currentWorkspace.history.list(); track shot; let i = $index) {
        <div class="{{ prefix }}-item" [class.active]="currentWorkspace.history.current === i" (click)="historyJump(i)">
          <span class="{{ prefix }}-item-title">
            <app-text [title]="getToken(shot)"></app-text>
          </span>
          <span class="{{ prefix }}-item-timestamp">
            {{ shot.timestamp | date: 'yyyy/MM/dd HH:mm:ss' }}
          </span>
        </div>
      }
    </div>
  `,
  standalone: true,
  imports: [NgIf, TextWidget, DatePipe],
  styleUrls: ['./history.widget.less']
})
export class HistoryWidget implements AfterViewInit {
  prefix = usePrefix('history');

  workbench: Workbench;

  currentWorkspace: Workspace;

  constructor(private hookService: HookService) {}

  ngAfterViewInit(): void {
    this.workbench = this.hookService.useWorkbench();
    this.currentWorkspace = this.workbench.activeWorkspace || this.workbench.currentWorkspace;
  }

  getToken(historyItem: HistoryItem<Workspace>) {
    const type = historyItem.type || 'default_state';

    const token = type.replace(/:/g, '_');
    return `operations.${token}`;
  }

  historyJump(index: number) {
    this.currentWorkspace.history.goTo(index);
  }
}
