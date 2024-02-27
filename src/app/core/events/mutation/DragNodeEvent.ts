import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
import { ICustomEvent } from '@/app/shared/event';

export class DragNodeEvent extends AbstractMutationNodeEvent implements ICustomEvent {
  type = 'drag:node';
}
