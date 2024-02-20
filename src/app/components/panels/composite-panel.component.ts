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
import { TextWidget } from '@/app/components/widgets/text/text.widget';

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
  imports: [IconWidget, SharedModule, TextWidget],
  template: `
    <div class="{{ prefix }}">
      <div class="{{ prefix }}-tabs">
        <ng-container *ngFor="let icon of iconItemList; let i = index">
          <div class="{{ prefix }}-tabs-pane" [class.active]="activeKey === i" (click)="changeActiveTab(i)">
            <app-icon [icon]="icon"></app-icon>
          </div>
        </ng-container>
      </div>
      <div class="{{ prefix }}-tabs-content">
        <div class="{{ prefix }}-tabs-header">
          <div class="{{ prefix }}-tabs-header-title">
            <app-text [title]="activeTitle"></app-text>
          </div>
          <div class="{{ prefix }}-tabs-header-actions"> </div>
        </div>
        <div class="{{ prefix }}-tabs-body">
          <ng-content></ng-content>
        </div>
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

  titleItemList: string[] = [];

  activeKey: number = 0;

  activeTitle: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const list = this.panelItemList?.toArray();
    if (list) {
      this.iconItemList = list.map(v => v.icon as IconType);
      this.titleItemList = list.map(v => v.title);
      this.activeTitle = this.titleItemList[this.activeKey];
    }
    this.cdr.markForCheck();
  }

  changeActiveTab(key: number) {
    this.activeKey = key;
    this.activeTitle = this.titleItemList[this.activeKey];
  }
}
