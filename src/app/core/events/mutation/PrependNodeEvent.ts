import { ICustomEvent } from '@/app/shared/event';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';

export class PrependNodeEvent extends AbstractMutationNodeEvent implements ICustomEvent {
  type = 'prepend:node';
}
