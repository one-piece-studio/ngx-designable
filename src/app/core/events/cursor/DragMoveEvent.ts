import { AbstractCursorEvent } from './AbstractCursorEvent';
import { ICustomEvent } from '../../../shared/event';

export class DragMoveEvent extends AbstractCursorEvent implements ICustomEvent {
  type = 'drag:move';
}
