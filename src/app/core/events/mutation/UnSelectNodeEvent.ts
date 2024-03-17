import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
import { ICustomEvent } from '../../../shared/event';

export class UnSelectNodeEvent extends AbstractMutationNodeEvent implements ICustomEvent {
  type = 'unselect:node';
}
