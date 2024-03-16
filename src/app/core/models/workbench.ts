import { WorkbenchTypes } from '../types';
import { Engine } from './engine';
import { IWorkspaceProps, Workspace } from './workspace';
import { action, define, observable } from '@formily/reactive';
import { AddWorkspaceEvent } from '@/app/core/events/workbench';

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
      type: observable.ref,
      // switchWorkspace: action,
      addWorkspace: action
      // removeWorkspace: action,
      // setActiveWorkspace: action,
      // setWorkbenchType: action
    });
  }

  addWorkspace(props: IWorkspaceProps) {
    const finded = this.findWorkspaceById(props.id);
    if (!finded) {
      this.currentWorkspace = new Workspace(this.engine, props);
      this.workspaces.push(this.currentWorkspace);
      this.engine.dispatch(new AddWorkspaceEvent(this.currentWorkspace));
      return this.currentWorkspace;
    }
    return finded;
  }

  ensureWorkspace(props: IWorkspaceProps = {}) {
    const workspace = this.findWorkspaceById(props.id);
    if (workspace) return workspace;
    this.addWorkspace(props);
    return this.currentWorkspace;
  }

  findWorkspaceById(id: string) {
    return this.workspaces.find(item => item.id === id);
  }

  eachWorkspace<T>(callbackFn: (value: Workspace, index: number) => T) {
    this.workspaces.forEach(callbackFn);
  }
}
