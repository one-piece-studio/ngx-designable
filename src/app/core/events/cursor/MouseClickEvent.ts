import { AbstractCursorEvent } from './AbstractCursorEvent';
import { ICustomEvent } from '../../../shared/event';

export class MouseClickEvent extends AbstractCursorEvent implements ICustomEvent {
  type = 'mouse:click';
}

export class MouseDoubleClickEvent extends AbstractCursorEvent implements ICustomEvent {
  type = 'mouse:dblclick';
}
