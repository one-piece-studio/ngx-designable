import { Component, Input } from '@angular/core';
import { TreeNode } from '@/app/core/models';
import { usePrefix } from '@/app/utils';
import { SharedModule } from '@/app/shared/shared.module';
import { IconWidget } from '../icon/icon.widget';
import { ResponsiveService } from '@/app/services/responsive.service';

@Component({
  selector: 'app-copy',
  template: `
    @if (node !== node.root) {
      <button nz-button class="{{ prefix }}" [style]="style" nzType="primary" (click)="clone()">
        <app-icon icon="Clone"></app-icon>
      </button>
    }
  `,
  standalone: true,
  imports: [SharedModule, IconWidget],
  styleUrls: [`./styles.less`]
})
export class CopyWidget {
  prefix = usePrefix('aux-copy');

  @Input() node: TreeNode;

  @Input() style: { [p: string]: any };

  constructor(private responsiveService: ResponsiveService) {}

  clone() {
    TreeNode.clone([this.node]);
    this.responsiveService.change();
  }
}
