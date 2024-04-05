import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.Default
})
export class WorkspacePanelComponent {
  prefix = usePrefix('workspace-panel');
}

@Component({
  selector: 'app-workspace-panel-item',
  standalone: true,
  imports: [],
  template: `
    <div class="{{ prefix }}" style="{{ currentStyle() }}">
      <ng-content></ng-content>
    </div>
  `,
  styles: [``],
  styleUrls: ['../styles/styles.less'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WorkspacePanelItemComponent implements OnChanges {
  prefix = usePrefix('workspace-panel-item');

  @Input() style: { [p: string]: any };

  @Input() flexible: boolean;

  currentStyle = signal({});

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.style && changes.style.currentValue) {
      this.updateStyle();
    }

    if (changes.flexible && changes.flexible.currentValue) {
      this.updateStyle();
    }
  }

  updateStyle() {
    this.currentStyle.set({
      ...this.style,
      flexGrow: this.flexible ? 1 : 0,
      flexShrink: this.flexible ? 1 : 0
    });
  }
}
