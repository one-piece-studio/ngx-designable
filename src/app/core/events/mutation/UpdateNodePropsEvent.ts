import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent';
import { ICustomEvent } from '@/app/shared/event';

export class UpdateNodePropsEvent extends AbstractMutationNodeEvent implements ICustomEvent {
  type = 'update:node:props';
}
