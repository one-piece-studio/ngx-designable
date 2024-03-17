import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
import { ICustomEvent } from '../../../shared/event';

export class HoverNodeEvent extends AbstractMutationNodeEvent implements ICustomEvent {
  type = 'hover:node';
}
