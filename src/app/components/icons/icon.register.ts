import { IconFactory } from './icon.factory';
import { IconType } from './icon.type';
import { ComponentSvg } from './component';
import { OutlineSvg } from '@/app/components/icons/outline';
import { HistorySvg } from '@/app/components/icons/history';
import { ExpandSvg } from '@/app/components/icons/expand';
import { CardSourceSvg, InputSourceSvg, TextAreaSourceSvg } from '@/app/components/icons/sources';
import { PinFilledSvg, PinOutlinedSvg } from '@/app/components/icons/pin';
import { CloseSvg } from '@/app/components/icons/close';
import { UndoSvg } from '@/app/components/icons/undo';
import { RedoSvg } from '@/app/components/icons/redo';
import { MoveSvg } from '@/app/components/icons/move';
import { SelectionSvg } from '@/app/components/icons/selection';
import { PcSvg } from '@/app/components/icons/pc';
import { MobileSvg } from '@/app/components/icons/mobile';
import { ResponsiveSvg } from '@/app/components/icons/responsive';

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
    this.register(IconType.Undo, UndoSvg);
    this.register(IconType.Redo, RedoSvg);
    this.register(IconType.Move, MoveSvg);
    this.register(IconType.Selection, SelectionSvg);
    this.register(IconType.Pc, PcSvg);
    this.register(IconType.Mobile, MobileSvg);
    this.register(IconType.Responsive, ResponsiveSvg);
  }
}
