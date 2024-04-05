import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SharedModule } from '@/app/shared/shared.module';
import { usePrefix } from '@/app/utils';

@Component({
  selector: 'app-studio-panel',
  standalone: true,
  imports: [SharedModule],
  template: `
    <div [ngClass]="classNameList">
      <div class="{{ prefix }}-header">
        <div class="{{ prefix }}-header-logo">
          <ng-content select="[logo]"></ng-content>
        </div>
        <div class="{{ prefix }}-header-actions">
          <ng-content select="[action]"></ng-content>
        </div>
      </div>
      <div class="{{ prefix }}">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [``],
  styleUrls: ['../styles/styles.less'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class StudioPanelComponent implements OnInit {
  prefix = usePrefix('main-panel');
  classNameList: string[] = [];

  ngOnInit(): void {
    this.classNameList = ['root', this.prefix + '-container'];
  }
}
