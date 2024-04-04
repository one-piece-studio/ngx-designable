import { AfterViewInit, Component, Input } from '@angular/core';
import { TreeNode } from '@/app/core/models';
import { usePrefix } from '@/app/utils';
import { SharedModule } from '@/app/shared/shared.module';
import { IconWidget } from '../icon/icon.widget';
import { ResponsiveService } from '@/app/services/responsive.service';
import { Engine } from '@/app/core/models';
import { AttributeDirective } from '@/app/directive';

@Component({
  selector: 'app-drag-handler',
  template: `
    @if (node !== node.root && node.allowDrag()) {
      <button nz-button class="{{ prefix }}" [style]="style" nzType="primary" [attributes]="attributes">
        <app-icon icon="Move"></app-icon>
      </button>
    }
  `,
  standalone: true,
  imports: [SharedModule, IconWidget, AttributeDirective],
  styleUrls: [`./styles.less`]
})
export class DragHandlerWidget implements AfterViewInit {
  prefix = usePrefix('aux-drag-handler');

  @Input() node: TreeNode;

  @Input() style: { [p: string]: any };

  attributes: { [p: string]: any };

  constructor(
    private responsiveService: ResponsiveService,
    private designer: Engine
  ) {}

  ngAfterViewInit(): void {
    this.attributes = {
      [this.designer.props.nodeDragHandlerAttrName]: 'true'
    };
  }
}
