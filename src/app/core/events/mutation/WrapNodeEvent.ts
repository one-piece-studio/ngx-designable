import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
import { ICustomEvent } from '@/app/shared/event';

export class WrapNodeEvent extends AbstractMutationNodeEvent implements ICustomEvent {
  type = 'wrap:node';
}
