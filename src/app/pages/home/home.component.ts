import { Component, OnInit } from '@angular/core';
import { DesignerComponent } from '../../components/container/designer.component';
import { WorkbenchComponent } from '@/app/components/container/workbench.component';
import { SharedModule } from '@/app/shared/shared.module';
import { StudioPanelComponent } from '@/app/components/panels/studio-panel.component';
import {
  CompositePanelComponent,
  CompositePanelItemComponent
} from '@/app/components/panels/composite-panel.component';
import { WorkspacePanelComponent } from '@/app/components/panels/workspace-panel.component';
import { SettingPanelComponent } from '@/app/components/panels/setting-panel.component';
import { ResourceWidget } from '@/app/components/widgets/resource/resource.widget';
import { GlobalRegistry } from '@/app/core/registry';
import { createResource } from '@/app/core/externals';
import { IResourceLike } from '@/app/core/types';

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
    SettingPanelComponent,
    CompositePanelItemComponent,
    ResourceWidget
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit {
  resourceList: IResourceLike[] = [];
  constructor() {}

  ngOnInit(): void {
    this.registerLocales();
    this.createResources();
  }

  registerLocales() {
    GlobalRegistry.registerDesignerLocales({
      'zh-CN': {
        sources: {
          Inputs: '输入控件',
          Displays: '展示控件',
          Feedbacks: '反馈控件'
        }
      },
      'en-US': {
        sources: {
          Inputs: 'Inputs',
          Displays: 'Displays',
          Feedbacks: 'Feedbacks'
        }
      },
      'ko-KR': {
        sources: {
          Inputs: '입력',
          Displays: '디스플레이',
          Feedbacks: '피드백'
        }
      }
    });
  }

  createResources() {
    const Input = createResource({
      title: {
        'zh-CN': '输入框',
        'en-US': 'Input',
        'ko-KR': '입력 상자'
      },
      icon: 'InputSource',
      elements: [
        {
          componentName: 'Field',
          props: {
            title: '输入框',
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'Input'
          }
        }
      ]
    });

    const Card = createResource({
      title: {
        'zh-CN': '卡片',
        'en-US': 'Card',
        'ko-KR': '카드 상자'
      },
      icon: 'CardSource',
      elements: [
        {
          componentName: 'Card',
          props: {
            title: '卡片'
          }
        }
      ]
    });
    this.resourceList = [Input, Card];
  }
}
