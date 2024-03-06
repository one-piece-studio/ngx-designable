import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
import { ICustomEvent } from '@/app/shared/event';

export class AppendNodeEvent extends AbstractMutationNodeEvent implements ICustomEvent {
  type = 'append:node';
}
