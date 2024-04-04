import { Component, Input } from '@angular/core';
import { TreeNode } from '@/app/core/models';
import { usePrefix } from '@/app/utils';
import { SharedModule } from '@/app/shared/shared.module';
import { IconWidget } from '../icon/icon.widget';
import { ResponsiveService } from '@/app/services/responsive.service';

@Component({
  selector: 'app-delete',
  template: `
    @if (node !== node.root) {
      <button nz-button class="{{ prefix }}" [style]="style" nzType="primary" (click)="remove()">
        <app-icon icon="Remove"></app-icon>
      </button>
    }
  `,
  standalone: true,
  imports: [SharedModule, IconWidget],
  styleUrls: [`./styles.less`]
})
export class DeleteWidget {
  prefix = usePrefix('aux-copy');

  @Input() node: TreeNode;

  @Input() style: { [p: string]: any };

  constructor(private responsiveService: ResponsiveService) {}

  remove() {
    TreeNode.remove([this.node]);
    this.responsiveService.change();
  }
}
