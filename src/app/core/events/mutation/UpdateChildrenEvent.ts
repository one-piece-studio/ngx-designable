import { ICustomEvent } from '@/app/shared/event';
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';

export class UpdateChildrenEvent extends AbstractMutationNodeEvent implements ICustomEvent {
  type = 'update:children';
}
