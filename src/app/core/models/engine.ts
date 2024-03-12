import { Workbench } from '@/app/core/models/workbench';
import { IEngineProps } from '@/app/shared/types';
import { Cursor } from '@/app/core/models/cursor';
import { Screen, ScreenType } from '@/app/core/models/screen';
import { uid } from '@/app/shared/uid';
import { TreeNode } from '@/app/core/models/tree-node';
import { Event } from '@/app/shared/event';

/**
 * 设计器引擎
 */
export class Engine extends Event {
  id: string;

  props: IEngineProps<Engine>;

  cursor: Cursor;

  workbench: Workbench;

  // keyboard: Keyboard

  screen: Screen;

  constructor(props: IEngineProps<Engine>) {
    super(props);
    this.props = {
      ...Engine.defaultProps,
      ...props
    };
    this.init();
    this.id = uid();
  }

  init() {
    this.workbench = new Workbench(this);
    this.screen = new Screen(this);
    this.cursor = new Cursor(this);
    // this.keyboard = new Keyboard(this)
  }

  findNodeById(id: string) {
    return TreeNode.findById(id);
  }

  findMovingNodes(): TreeNode[] {
    const results = [];
    this.workbench.eachWorkspace(workspace => {
      workspace.operation.moveHelper.dragNodes?.forEach(node => {
        if (!results.includes(node)) {
          results.push(node);
        }
      });
    });
    return results;
  }

  static defaultProps: IEngineProps<Engine> = {
    shortcuts: [],
    effects: [],
    drivers: [],
    rootComponentName: 'Root',
    sourceIdAttrName: 'data-designer-source-id',
    nodeIdAttrName: 'data-designer-node-id',
    contentEditableAttrName: 'data-content-editable',
    contentEditableNodeIdAttrName: 'data-content-editable-node-id',
    clickStopPropagationAttrName: 'data-click-stop-propagation',
    nodeSelectionIdAttrName: 'data-designer-node-helpers-id',
    nodeDragHandlerAttrName: 'data-designer-node-drag-handler',
    screenResizeHandlerAttrName: 'data-designer-screen-resize-handler',
    nodeResizeHandlerAttrName: 'data-designer-node-resize-handler',
    outlineNodeIdAttrName: 'data-designer-outline-node-id',
    nodeTranslateAttrName: 'data-designer-node-translate-handler',
    defaultScreenType: ScreenType.PC
  };
}
