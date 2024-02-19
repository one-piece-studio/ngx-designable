import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  QueryList
} from '@angular/core';
import { usePrefix } from '@/app/utils';
import { IconWidget } from '@/app/components/widgets/icon/icon.widget';
import { SharedModule } from '@/app/shared/shared.module';
import { IconType } from '@/app/components/icons/icon.type';
import { IconFactory, IconFactoryProvider } from '@/app/components/icons/icon.factory';
import { IconRegister } from '@/app/components/icons/icon.register';

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
        <ng-container *ngFor="let icon of iconItemList">
          <app-icon [icon]="icon"></app-icon>
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
  providers: [{ provide: IconFactory, useClass: IconRegister }, IconFactoryProvider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompositePanelComponent implements AfterViewInit {
  prefix = usePrefix('composite-panel');

  @ContentChildren(CompositePanelItemComponent) panelItemList: QueryList<CompositePanelItemComponent> | undefined;

  iconItemList: IconType[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.iconItemList = this.panelItemList?.toArray().map(v => v.icon as IconType);
    this.cdr.markForCheck();
  }
}
