import { IconFactory } from './icon.factory';
import { IconType } from './icon.type';
import { ComponentSvg } from './component';
import { OutlineSvg } from '@/app/components/icons/outline';
import { HistorySvg } from '@/app/components/icons/history';

export class IconRegister extends IconFactory {
  constructor() {
    super();
    this.register(IconType.COMPONENT, ComponentSvg);
    this.register(IconType.OUTLINE, OutlineSvg);
    this.register(IconType.HISTORY, HistorySvg);
  }
}
