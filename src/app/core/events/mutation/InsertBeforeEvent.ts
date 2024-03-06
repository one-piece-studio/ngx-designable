import { ICustomEvent } from '@/app/shared/event';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';

export class InsertBeforeEvent extends AbstractMutationNodeEvent implements ICustomEvent {
  type = 'insert:before';
}
