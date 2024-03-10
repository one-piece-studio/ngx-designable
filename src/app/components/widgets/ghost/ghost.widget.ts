import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { usePrefix } from '../../../utils';
import { NodeTitleWidget } from '../node-title/node-title.widget';
import { Engine } from '../../../core/models';
import { Cursor, CursorStatus } from '../../../core/models/cursor';

@Component({
  selector: 'app-ghost',
  standalone: true,
  template: `
    @if (cursor.status === CursorStatus.Dragging) {
      <div class="{{ prefix }}">
        <span style="white-space: nowrap">
          <app-node-title-widget></app-node-title-widget>
        </span>
      </div>
    }
  `,
  imports: [NodeTitleWidget],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GhostWidget {
  prefix = usePrefix('ghost');
  constructor(
    @Optional() public designer: Engine,
    @Optional() public cursor: Cursor
  ) {}

  protected readonly CursorStatus = CursorStatus;
}
