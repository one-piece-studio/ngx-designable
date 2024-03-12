import { AbstractCursorEvent } from './AbstractCursorEvent';
import { ICustomEvent } from '../../../shared/event';

export class DragStartEvent extends AbstractCursorEvent implements ICustomEvent {
  type = 'drag:start';
}
