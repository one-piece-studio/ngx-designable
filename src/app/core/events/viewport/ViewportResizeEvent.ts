import { AbstractViewportEvent } from './AbstractViewportEvent';
import { ICustomEvent } from '../../../shared/event';

export class ViewportResizeEvent extends AbstractViewportEvent implements ICustomEvent {
  type = 'viewport:resize';
}
