import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
import { ICustomEvent } from '../../../shared/event';

export class DropNodeEvent extends AbstractMutationNodeEvent implements ICustomEvent {
  type = 'drop:node';
}
