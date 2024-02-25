import { IconFactory } from './icon.factory';
import { IconType } from './icon.type';
import { ComponentSvg } from './component';
import { OutlineSvg } from '@/app/components/icons/outline';
import { HistorySvg } from '@/app/components/icons/history';
import { ExpandSvg } from '@/app/components/icons/expand';
import { CardSourceSvg, InputSourceSvg, TextAreaSourceSvg } from '@/app/components/icons/sources';
import { PinFilledSvg, PinOutlinedSvg } from '@/app/components/icons/pin';
import { CloseSvg } from '@/app/components/icons/close';

export class IconRegister extends IconFactory {
  constructor() {
    super();
    this.register(IconType.Component, ComponentSvg);
    this.register(IconType.Outline, OutlineSvg);
    this.register(IconType.History, HistorySvg);
    this.register(IconType.Expand, ExpandSvg);
    this.register(IconType.InputSource, InputSourceSvg);
    this.register(IconType.TextAreaSource, TextAreaSourceSvg);
    this.register(IconType.CardSource, CardSourceSvg);
    this.register(IconType.PushPinOutlined, PinOutlinedSvg);
    this.register(IconType.PushPinFilled, PinFilledSvg);
    this.register(IconType.Close, CloseSvg);
  }
}
