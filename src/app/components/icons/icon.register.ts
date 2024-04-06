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
import { DesignSvg } from '@/app/components/icons/design';
import { JsonSvg } from '@/app/components/icons/json';
import { CodeSvg } from '@/app/components/icons/code';
import { PlaySvg } from '@/app/components/icons/play';
import { SettingSvg } from '@/app/components/icons/setting';
import {
  BatchDragAnimationSvg,
  DragLeftSourceAnimationSvg,
  DragRightSourceAnimationSvg
} from '@/app/components/icons/animations';
import { CommandSvg } from '@/app/components/icons/command';
import { ShiftSvg } from '@/app/components/icons/shift';
import { DeleteSvg } from '@/app/components/icons/delete';
import { PageSvg } from '@/app/components/icons/page';
import { CloneSvg } from '@/app/components/icons/clone';
import { ContainerSvg } from '@/app/components/icons/container';
import { RemoveSvg } from '@/app/components/icons/remove';
import { FlipSvg } from '@/app/components/icons/flip';

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
    this.register(IconType.Design, DesignSvg);
    this.register(IconType.Json, JsonSvg);
    this.register(IconType.Code, CodeSvg);
    this.register(IconType.Play, PlaySvg);
    this.register(IconType.Setting, SettingSvg);
    this.register(IconType.DragLeftSourceAnimation, DragLeftSourceAnimationSvg);
    this.register(IconType.DragRightSourceAnimation, DragRightSourceAnimationSvg);
    this.register(IconType.BatchDragAnimation, BatchDragAnimationSvg);
    this.register(IconType.Command, CommandSvg);
    this.register(IconType.Shift, ShiftSvg);
    this.register(IconType.Delete, DeleteSvg);
    this.register(IconType.Page, PageSvg);
    this.register(IconType.Clone, CloneSvg);
    this.register(IconType.Container, ContainerSvg);
    this.register(IconType.Remove, RemoveSvg);
    this.register(IconType.Flip, FlipSvg);
  }
}
