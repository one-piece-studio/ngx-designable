import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { SharedModule } from '@/app/shared/shared.module';
import { IconWidget } from '@/app/components/widgets/icon/icon.widget';
import { Screen, ScreenType } from '@/app/core/models/screen';
import { Cursor, CursorType, History, Workbench } from '@/app/core/models';
import { HookService } from '@/app/services/hook.service';

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

  history: History;

  workbench: Workbench;

  cursor: Cursor;

  constructor(private hookService: HookService) {
    this.screen = this.hookService.useScreen();
    this.history = this.hookService.useHistory();
    this.workbench = this.hookService.useWorkbench();
    this.cursor = this.hookService.useCursor();
  }

  protected readonly ScreenType = ScreenType;

  selectPc() {
    this.screen.setType(ScreenType.PC);
  }

  selectMobile() {
    this.screen.setType(ScreenType.Mobile);
  }

  selectResponsive() {
    this.screen.setType(ScreenType.Responsive);
  }

  changeMobileFlip() {
    this.screen.setFlip(!this.screen.flip);
  }

  protected readonly CursorType = CursorType;
}
