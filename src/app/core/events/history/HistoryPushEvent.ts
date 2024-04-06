import { AbstractHistoryEvent } from './AbstractHistoryEvent';
import { ICustomEvent } from '../../../shared/event';

export class HistoryPushEvent extends AbstractHistoryEvent implements ICustomEvent {
  type = 'history:push';
}
