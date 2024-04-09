import { AbstractHistoryEvent } from './AbstractHistoryEvent';
import { ICustomEvent } from '@/app/shared/event';

export class HistoryGotoEvent extends AbstractHistoryEvent implements ICustomEvent {
  type = 'history:goto';
}
