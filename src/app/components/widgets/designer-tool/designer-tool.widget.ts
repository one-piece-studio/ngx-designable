import { Component, Input } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { SharedModule } from '@/app/shared/shared.module';
import { IconWidget } from '@/app/components/widgets/icon/icon.widget';
import { ScreenType } from '@/app/core/models/screen';

@Component({
  selector: 'app-designer-tool-widget',
  standalone: true,
  templateUrl: './designer-tool.widget.html',
  imports: [SharedModule, IconWidget]
})
export class DesignerToolWidget {
  prefix = usePrefix('designer-tools');

  @Input() style: { [p: string]: any };

  @Input() use: string[] = ['HISTORY', 'CURSOR', 'SCREEN_TYPE'];

  screen = { type: ScreenType.PC };
  protected readonly ScreenType = ScreenType;
}
