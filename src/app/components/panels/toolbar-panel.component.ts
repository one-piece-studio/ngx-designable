import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { WorkspacePanelItemComponent } from './workspace-panel.component';

@Component({
  selector: 'app-toolbar-panel',
  standalone: true,
  imports: [WorkspacePanelItemComponent],
  template: `
    <app-workspace-panel-item [style]="currentStyle()">
      <ng-content></ng-content>
    </app-workspace-panel-item>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ToolbarPanelComponent implements OnChanges {
  @Input() style: { [p: string]: any };

  @Input() flexible: boolean;

  currentStyle = signal({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px',
    padding: '0 4px'
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.style && changes.style.currentValue) {
      this.updateStyle();
    }
  }

  updateStyle() {
    this.currentStyle.set({
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '4px',
      padding: '0 4px',
      ...this.style
    });
  }
}
