import { ICustomEvent } from '@/app/shared/event';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';

export class InsertChildrenEvent extends AbstractMutationNodeEvent implements ICustomEvent {
  type = 'insert:children';
}
