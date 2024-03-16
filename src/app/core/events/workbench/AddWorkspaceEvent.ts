import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent';
import { ICustomEvent } from '../../../shared/event';
export class AddWorkspaceEvent extends AbstractWorkspaceEvent implements ICustomEvent {
  type = 'add:workspace';
}
