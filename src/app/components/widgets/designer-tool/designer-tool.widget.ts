import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { SharedModule } from '@/app/shared/shared.module';
import { IconWidget } from '@/app/components/widgets/icon/icon.widget';
import { Screen, ScreenType } from '@/app/core/models/screen';
import { Engine } from '@/app/core/models';
import { ResponsiveService } from '@/app/services/responsive.service';

@Component({
  selector: 'app-designer-tool-widget',
  standalone: true,
  templateUrl: './designer-tool.widget.html',
  imports: [SharedModule, IconWidget],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DesignerToolWidget {
  prefix = usePrefix('designer-tools');

  @Input() style: { [p: string]: any };

  @Input() use: string[] = ['HISTORY', 'CURSOR', 'SCREEN_TYPE'];

  screen: Screen;

  constructor(
    private designer: Engine,
    private responsiveService: ResponsiveService
  ) {
    this.screen = this.designer.screen;
  }

  protected readonly ScreenType = ScreenType;

  selectPc() {
    this.screen.setType(ScreenType.PC);
    this.responsiveService.change();
  }

  selectMobile() {
    this.screen.setType(ScreenType.Mobile);
    this.responsiveService.change();
  }

  selectResponsive() {
    this.screen.setType(ScreenType.Responsive);
    this.responsiveService.change();
  }
}
