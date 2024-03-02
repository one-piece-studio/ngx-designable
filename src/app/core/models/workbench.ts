import { WorkbenchTypes } from '../types';
import { Engine } from './engine';
import { Workspace } from './workspace';

export class Workbench {
  workspaces: Workspace[];

  currentWorkspace: Workspace;

  activeWorkspace: Workspace;

  engine: Engine;

  type: WorkbenchTypes = 'DESIGNABLE';
}
