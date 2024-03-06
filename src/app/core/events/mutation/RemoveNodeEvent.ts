import { ICustomEvent } from '@/app/shared/event';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';

export class RemoveNodeEvent extends AbstractMutationNodeEvent implements ICustomEvent {
  type = 'remove:node';
}
