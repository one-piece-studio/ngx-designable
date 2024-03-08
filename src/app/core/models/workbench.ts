import { WorkbenchTypes } from '../types';
import { Engine } from './engine';
import { Workspace } from './workspace';
import { action, define, observable } from '@formily/reactive';

export class Workbench {
  workspaces: Workspace[];

  currentWorkspace: Workspace;

  activeWorkspace: Workspace;

  engine: Engine;

  type: WorkbenchTypes = 'DESIGNABLE';

  constructor(engine: Engine) {
    this.engine = engine;
    this.workspaces = [];
    this.currentWorkspace = null;
    this.activeWorkspace = null;
  }

  makeObservable() {
    define(this, {
      currentWorkspace: observable.ref,
      workspaces: observable.shallow,
      activeWorkspace: observable.ref,
      type: observable.ref
      // switchWorkspace: action,
      // addWorkspace: action,
      // removeWorkspace: action,
      // setActiveWorkspace: action,
      // setWorkbenchType: action
    });
  }
}
