import { Component } from '@angular/core';
import { DesignerComponent } from '../../components/container/designer.component';
import { WorkbenchComponent } from '@/app/components/container/workbench.component';
import { SharedModule } from '@/app/shared/shared.module';
import { StudioPanelComponent } from '@/app/components/panels/studio-panel.component';
import { CompositePanelComponent } from '@/app/components/panels/composite-panel.component';
import { WorkspacePanelComponent } from '@/app/components/panels/workspace-panel.component';
import { SettingPanelComponent } from '@/app/components/panels/setting-panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedModule,
    DesignerComponent,
    WorkbenchComponent,
    StudioPanelComponent,
    CompositePanelComponent,
    WorkspacePanelComponent,
    SettingPanelComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {}
