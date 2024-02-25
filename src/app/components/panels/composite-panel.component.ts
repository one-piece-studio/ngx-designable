import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  QueryList,
  signal
} from '@angular/core';
import { usePrefix } from '@/app/utils';
import { IconWidget } from '@/app/components/widgets/icon/icon.widget';
import { SharedModule } from '@/app/shared/shared.module';
import { IconType } from '@/app/components/icons/icon.type';
import { IconFactory, IconFactoryProvider } from '@/app/components/icons/icon.factory';
import { IconRegister } from '@/app/components/icons/icon.register';
import { TextWidget } from '@/app/components/widgets/text/text.widget';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-composite-panel-item',
  standalone: true,
  imports: [NgIf],
  template: `
    <ng-container *ngIf="visible()">
      <ng-content></ng-content>
    </ng-container>
  `,
  styleUrls: ['../styles/styles.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompositePanelItemComponent {
  @Input() title: string | undefined;

  @Input() icon: string | undefined;

  visible = signal<boolean>(false);

  changeVisible(visible: boolean) {
    this.visible.set(visible);
  }
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
      <div class="{{ prefix }}-tabs-content" [class.pinning]="pinning()" *ngIf="visible()">
        <div class="{{ prefix }}-tabs-header">
          <div class="{{ prefix }}-tabs-header-title">
            <app-text [title]="activeTitle"></app-text>
          </div>
          <div class="{{ prefix }}-tabs-header-actions">
            <div class="{{ prefix }}-tabs-header-extra"> </div>
            <div *ngIf="!pinning()" (click)="pinningChange()">
              <app-icon
                icon="PushPinOutlined"
                classname="{{ prefix }}-tabs-header-pin"
                [style]="{ cursor: 'pointer' }"
              ></app-icon>
            </div>
            <div *ngIf="pinning()" (click)="pinningChange()">
              <app-icon
                icon="PushPinFilled"
                classname="{{ prefix }}-tabs-header-pin-filled"
                [style]="{ cursor: 'pointer' }"
              ></app-icon>
            </div>
            <app-icon
              icon="Close"
              classname="{{ prefix }}-tabs-header-close"
              [style]="{ cursor: 'pointer' }"
              (click)="close()"
            ></app-icon>
          </div>
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
  styleUrls: ['../styles/styles.less'],
  providers: [{ provide: IconFactory, useClass: IconRegister }, IconFactoryProvider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompositePanelComponent implements AfterViewInit {
  prefix = usePrefix('composite-panel');

  @ContentChildren(CompositePanelItemComponent) panelItemList: QueryList<CompositePanelItemComponent> | undefined;

  iconItemList: IconType[] = [];

  activeKey: number = -1;

  activeTitle: string;

  visible = signal<boolean>(true);

  pinning = signal<boolean>(false);

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.changeActiveTab(0);
    this.cdr.markForCheck();
  }

  changeActiveTab(key: number) {
    if (this.activeKey == key) {
      this.visible.update(v => !v);
    } else {
      this.visible.set(true);
    }
    this.activeKey = key;
    const list = this.panelItemList?.toArray();
    if (Array.isArray(list) && list.length) {
      this.iconItemList = list.map(v => v.icon as IconType);
      const titleItemList = list.map(v => v.title);
      this.activeTitle = titleItemList[this.activeKey];
      list.forEach((v, i) => v.changeVisible(i === this.activeKey));
    }
  }

  pinningChange() {
    this.pinning.update(v => !v);
  }

  close() {
    this.visible.set(false);
  }
}
