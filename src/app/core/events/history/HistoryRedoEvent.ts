import { AbstractHistoryEvent } from './AbstractHistoryEvent';
import { ICustomEvent } from '../../../shared/event';

export class HistoryUndoEvent extends AbstractHistoryEvent implements ICustomEvent {
  type = 'history:undo';
}
