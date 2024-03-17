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
import { createBehavior, createResource } from '@/app/core/externals';
import { IResourceLike } from '@/app/core/types';
import { ToolbarPanelComponent } from '@/app/components/panels/toolbar-panel.component';
import { DesignerToolWidget } from '@/app/components/widgets/designer-tool/designer-tool.widget';
import { IconFactory, IconFactoryProvider } from '@/app/components/icons/icon.factory';
import { IconRegister } from '@/app/components/icons/icon.register';
import { ViewToolsWidget } from '@/app/components/widgets/view-tools/view-tools.widget';
import { ViewPanelComponent } from '@/app/components/panels/view-panel.component';
import { ViewportPanelComponent } from '@/app/components/panels/viewport-panel.component';
import { SettingsFormComponent } from '@/app/settings-form/settings-form.component';
import { ComponentTreeWidget } from '@/app/components/widgets/component-tree/component-tree.widget';

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
    ResourceWidget,
    ToolbarPanelComponent,
    DesignerToolWidget,
    ViewToolsWidget,
    ViewPanelComponent,
    ViewportPanelComponent,
    SettingsFormComponent,
    ComponentTreeWidget
  ],
  providers: [{ provide: IconFactory, useClass: IconRegister }, IconFactoryProvider],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit {
  resourceList: IResourceLike[] = [];
  constructor() {}

  ngOnInit(): void {
    this.registerBehavior();
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

  registerBehavior() {
    const RootBehavior = createBehavior({
      name: 'Root',
      selector: 'Root',
      designerProps: {
        droppable: true
      },
      designerLocales: {
        'zh-CN': {
          title: '根组件'
        },
        'en-US': {
          title: 'Root'
        },
        'ko-KR': {
          title: '루트'
        }
      }
    });

    const InputBehavior = createBehavior({
      name: 'Input',
      selector: node => node.componentName === 'Field' && node.props['x-component'] === 'Input',
      designerProps: {
        propsSchema: {
          type: 'object',
          $namespace: 'Field',
          properties: {
            'field-properties': {
              type: 'void',
              'x-component': 'CollapseItem',
              title: '字段属性',
              properties: {
                title: {
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-component': 'Input'
                },

                hidden: {
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-component': 'Switch'
                },
                default: {
                  'x-decorator': 'FormItem',
                  'x-component': 'ValueInput'
                },
                test: {
                  type: 'void',
                  title: '测试',
                  'x-decorator': 'FormItem',
                  'x-component': 'DrawerSetter',
                  'x-component-props': {
                    text: '打开抽屉'
                  },
                  properties: {
                    test: {
                      type: 'string',
                      title: '测试输入',
                      'x-decorator': 'FormItem',
                      'x-component': 'Input'
                    }
                  }
                }
              }
            },

            'component-styles': {
              type: 'void',
              title: '样式',
              'x-component': 'CollapseItem',
              properties: {
                'style.width': {
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-component': 'SizeInput'
                },
                'style.height': {
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-component': 'SizeInput'
                },
                'style.display': {
                  'x-component': 'DisplayStyleSetter'
                },
                'style.background': {
                  'x-component': 'BackgroundStyleSetter'
                },
                'style.boxShadow': {
                  'x-component': 'BoxShadowStyleSetter'
                },
                'style.font': {
                  'x-component': 'FontStyleSetter'
                },
                'style.margin': {
                  'x-component': 'BoxStyleSetter'
                },
                'style.padding': {
                  'x-component': 'BoxStyleSetter'
                },
                'style.borderRadius': {
                  'x-component': 'BorderRadiusStyleSetter'
                },
                'style.border': {
                  'x-component': 'BorderStyleSetter'
                }
              }
            }
          }
        }
      },
      designerLocales: {
        'zh-CN': {
          title: '输入框',
          settings: {
            title: '标题',
            hidden: '是否隐藏',
            default: '默认值',
            style: {
              width: '宽度',
              height: '高度',
              display: '展示',
              background: '背景',
              boxShadow: '阴影',
              font: '字体',
              margin: '外边距',
              padding: '内边距',
              borderRadius: '圆角',
              border: '边框'
            }
          }
        },
        'en-US': {
          title: 'Input',
          settings: {
            title: 'Title',
            hidden: 'Hidden',
            default: 'Default Value',
            style: {
              width: 'Width',
              height: 'Height',
              display: 'Display',
              background: 'Background',
              boxShadow: 'Box Shadow',
              font: 'Font',
              margin: 'Margin',
              padding: 'Padding',
              borderRadius: 'Border Radius',
              border: 'Border'
            }
          }
        },
        'ko-KR': {
          title: '입력',
          settings: {
            title: '텍스트',
            hidden: '숨김 여부',
            default: '기본 설정 값',
            style: {
              width: '너비',
              height: '높이',
              display: '디스플레이',
              background: '배경',
              boxShadow: '그림자 박스',
              font: '폰트',
              margin: '마진',
              padding: '패딩',
              borderRadius: '테두리 굴곡',
              border: '테두리'
            }
          }
        }
      }
    });

    const CardBehavior = createBehavior({
      name: 'Card',
      selector: 'Card',
      designerProps: {
        droppable: true,
        resizable: {
          width(node, element) {
            const width = Number(node.props?.style?.width ?? element.getBoundingClientRect().width);
            return {
              plus: () => {
                node.props = node.props || {};
                node.props.style = node.props.style || {};
                node.props.style.width = width + 10;
              },
              minus: () => {
                node.props = node.props || {};
                node.props.style = node.props.style || {};
                node.props.style.width = width - 10;
              }
            };
          },
          height(node, element) {
            const height = Number(node.props?.style?.height ?? element.getBoundingClientRect().height);
            return {
              plus: () => {
                node.props = node.props || {};
                node.props.style = node.props.style || {};
                node.props.style.height = height + 10;
              },
              minus: () => {
                node.props = node.props || {};
                node.props.style = node.props.style || {};
                node.props.style.height = height - 10;
              }
            };
          }
        },
        translatable: {
          x(node, element, diffX) {
            const left = parseInt(node.props?.style?.left ?? element?.style.left) || 0;
            const rect = element.getBoundingClientRect();
            return {
              translate: () => {
                node.props = node.props || {};
                node.props.style = node.props.style || {};
                node.props.style.position = 'absolute';
                node.props.style.width = rect.width;
                node.props.style.height = rect.height;
                node.props.style.left = left + parseInt(String(diffX)) + 'px';
              }
            };
          },
          y(node, element, diffY) {
            const top = parseInt(node.props?.style?.top ?? element?.style.top) || 0;
            const rect = element.getBoundingClientRect();
            return {
              translate: () => {
                node.props = node.props || {};
                node.props.style = node.props.style || {};
                node.props.style.position = 'absolute';
                node.props.style.width = rect.width;
                node.props.style.height = rect.height;
                node.props.style.top = top + parseInt(String(diffY)) + 'px';
              }
            };
          }
        }
      },
      designerLocales: {
        'zh-CN': {
          title: '卡片'
        },
        'en-US': {
          title: 'Card'
        },
        'ko-KR': {
          title: '카드'
        }
      }
    });

    GlobalRegistry.setDesignerBehaviors([RootBehavior, InputBehavior, CardBehavior]);
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
