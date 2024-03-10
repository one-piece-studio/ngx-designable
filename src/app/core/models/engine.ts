import { Workbench } from '@/app/core/models/workbench';
import { IEngineProps } from '@/app/shared/types';
import { Cursor } from '@/app/core/models/cursor';
import { Screen } from '@/app/core/models/screen';
import { uid } from '@/app/shared/uid';
import { TreeNode } from '@/app/core/models/tree-node';

export class Engine {
  id: string;

  props: IEngineProps<Engine>;

  cursor: Cursor;

  workbench: Workbench;

  // keyboard: Keyboard

  screen: Screen;

  constructor() {
    this.init();
    this.id = uid();
  }

  init() {
    this.workbench = new Workbench(this);
    this.screen = new Screen(this);
    this.cursor = new Cursor(this);
    // this.keyboard = new Keyboard(this)
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
}
