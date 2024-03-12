import { EventDriver } from '../../shared/event';
import { Engine } from '../models';

export class DragDropDriver extends EventDriver<Engine> {
  mouseDownTimer = null;

  startEvent: MouseEvent;
}
