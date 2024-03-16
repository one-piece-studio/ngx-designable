import { IEngineContext } from '../../types';
import { Workspace } from '../../models/workspace';

export class AbstractWorkspaceEvent {
  data: Workspace;
  context: IEngineContext;
  constructor(data: Workspace) {
    this.data = data;
  }
}
