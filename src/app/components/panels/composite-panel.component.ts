import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { IconWidget } from '@/app/components/widgets/icon/icon.widget';
import { SharedModule } from '@/app/shared/shared.module';

@Component({
  selector: 'app-composite-panel-item',
  standalone: true,
  imports: [],
  template: ` <div class="{{ prefix }}"> </div> `,
  styleUrls: ['./styles.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompositePanelItemComponent {
  @Input() title: string | undefined;

  @Input() icon: string | undefined;

  prefix = usePrefix('composite-panel');
}

@Component({
  selector: 'app-composite-panel',
  standalone: true,
  imports: [IconWidget, SharedModule],
  template: `
    <div class="{{ prefix }}">
      <div class="{{ prefix }}-tabs">
        <ng-container *ngFor="let item of panelItemList">
          <app-icon></app-icon>
        </ng-container>
      </div>
      <div class="{{ prefix }}-tabs-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
      }
    `
  ],
  styleUrls: ['./styles.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompositePanelComponent implements AfterViewInit {
  prefix = usePrefix('composite-panel');

  @ContentChildren(CompositePanelItemComponent) panelItemList: QueryList<CompositePanelItemComponent> | undefined;

  ngAfterViewInit(): void {
    console.log('panelItemList>>>', this.panelItemList);
  }
}
