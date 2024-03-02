import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { IconWidget } from '@/app/components/widgets/icon/icon.widget';
import { TextWidget } from '@/app/components/widgets/text/text.widget';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-setting-panel',
  standalone: true,
  imports: [IconWidget, TextWidget, NgIf],
  template: `
    @if (!visible()) {
      <div class="{{ prefix }}-opener" (click)="display()">
        <app-icon icon="Setting" size="20" classname="{{ prefix }}-opener"></app-icon>
      </div>
    } @else {
      <div class="{{ prefix }} " [class.pinning]="pinning()">
        <div class="{{ prefix }}-header">
          <div class="{{ prefix }}-header-title">
            <app-text [title]="title"></app-text>
          </div>
          <div class="{{ prefix }}-header-actions">
            <div class="{{ prefix }}-header-extra"> </div>
            <div *ngIf="!pinning()" (click)="pinningChange()">
              <app-icon
                icon="PushPinOutlined"
                classname="{{ prefix }}-header-pin"
                [style]="{ cursor: 'pointer' }"
              ></app-icon>
            </div>
            <div *ngIf="pinning()" (click)="pinningChange()">
              <app-icon
                icon="PushPinFilled"
                classname="{{ prefix }}-pin-filled"
                [style]="{ cursor: 'pointer' }"
              ></app-icon>
            </div>
            <app-icon
              icon="Close"
              classname="{{ prefix }}-header-close"
              [style]="{ cursor: 'pointer' }"
              (click)="close()"
            ></app-icon>
          </div>
        </div>
        <div class="{{ prefix }}-body">
          <ng-container *ngIf="innerVisible()">
            <ng-content></ng-content>
          </ng-container>
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: flex;
      }
    `
  ],
  styleUrls: ['../styles/styles.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingPanelComponent {
  prefix: string = usePrefix('settings-panel');

  @Input() title: string;

  visible = signal<boolean>(true);

  innerVisible = signal<boolean>(true);

  pinning = signal<boolean>(false);

  pinningChange() {
    this.pinning.update(v => !v);
  }

  close() {
    this.visible.set(false);
    this.innerVisible.set(false);
  }

  display() {
    this.visible.set(true);
    this.innerVisible.set(true);
  }
}
