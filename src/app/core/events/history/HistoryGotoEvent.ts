import { AbstractHistoryEvent } from './AbstractHistoryEvent';
import { ICustomEvent } from '../../../shared/event';

export class HistoryGotoEvent extends AbstractHistoryEvent implements ICustomEvent {
  type = 'history:goto';
}
