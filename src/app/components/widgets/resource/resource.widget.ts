import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { IResource, IResourceLike } from '@/app/core/types';
import { TextWidget } from '@/app/components/widgets/text/text.widget';

@Component({
  selector: 'app-resource',
  template: `
    <div class="{{ prefix }}">
      <div class="{{ prefix }}-header">
        <div class="{{ prefix }}-header-expand"> </div>
        <div class="{{ prefix }}-header-content">
          <app-text [title]="title"></app-text>
        </div>
      </div>
      <div class="{{ prefix }}-content-wrapper">
        <div class="{{ prefix }}-content"> </div>
      </div>
    </div>
  `,
  standalone: true,
  styleUrls: ['./resource.widget.less'],
  imports: [TextWidget],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceWidget {
  prefix = usePrefix('resource');

  @Input() title: string | undefined;

  @Input() sources: IResourceLike[];
}
