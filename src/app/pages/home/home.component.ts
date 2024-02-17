import { Component } from '@angular/core';
import { DesignerComponent } from '../../components/container/designer.component';
import { WorkbenchComponent } from '@/app/components/container/workbench.component';
import { SharedModule } from '@/app/shared/shared.module';
import { StudioPanelComponent } from '@/app/components/panels/studio-panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, DesignerComponent, WorkbenchComponent, StudioPanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {}
