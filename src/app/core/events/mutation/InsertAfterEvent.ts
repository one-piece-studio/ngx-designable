import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
import { ICustomEvent } from '@/app/shared/event';

export class InsertAfterEvent extends AbstractMutationNodeEvent implements ICustomEvent {
  type = 'insert:after';
}
