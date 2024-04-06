import { AbstractHistoryEvent } from './AbstractHistoryEvent';
import { ICustomEvent } from '../../../shared/event';

export class HistoryRedoEvent extends AbstractHistoryEvent implements ICustomEvent {
  type = 'history:redo';
}
