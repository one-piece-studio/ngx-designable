import { ICustomEvent } from '@/app/shared/event';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';

export class CloneNodeEvent extends AbstractMutationNodeEvent implements ICustomEvent {
  type = 'clone:node';
}
