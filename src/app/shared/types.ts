import { ITreeNode } from '@/app/core/models';
import { ScreenType } from '@/app/core/models/screen';
import { IEventProps } from '@/app/shared/event';

export type IEngineProps<T = Event> = IEventProps<T> & {
  shortcuts?: any[];
  sourceIdAttrName?: string; //拖拽源Id的dom属性名
  nodeIdAttrName?: string; //节点Id的dom属性名
  contentEditableAttrName?: string; //原地编辑属性名
  contentEditableNodeIdAttrName?: string; //原地编辑指定Node Id属性名
  clickStopPropagationAttrName?: string; //点击阻止冒泡属性
  outlineNodeIdAttrName?: string; //大纲树节点ID的dom属性名
  nodeSelectionIdAttrName?: string; //节点工具栏属性名
  nodeDragHandlerAttrName?: string; //节点拖拽手柄属性名
  screenResizeHandlerAttrName?: string;
  nodeResizeHandlerAttrName?: string; //节点尺寸拖拽手柄属性名
  nodeTranslateAttrName?: string; // 节点自由布局的属性名
  defaultComponentTree?: ITreeNode; //默认组件树
  defaultScreenType?: ScreenType;
  rootComponentName?: string;
};

const isType =
  <T>(type: string | string[]) =>
  (obj: unknown): obj is T =>
    obj != null && (Array.isArray(type) ? type : [type]).some(t => getType(obj) === `[object ${t}]`);
export const getType = (obj: any) => Object.prototype.toString.call(obj);
export const isFn = isType<(...args: any[]) => any>(['Function', 'AsyncFunction', 'GeneratorFunction']);
export const isWindow = isType<Window>('Window');
export const isHTMLElement = (obj: any): obj is HTMLElement => {
  return obj?.['nodeName'] || obj?.['tagName'];
};
export const isArr = Array.isArray;
export const isPlainObj = isType<object>('Object');
export const isStr = isType<string>('String');
export const isBool = isType<boolean>('Boolean');
export const isNum = isType<number>('Number');
export const isObj = (val: unknown): val is object => typeof val === 'object';
export const isRegExp = isType<RegExp>('RegExp');
export const isValid = (val: any) => val !== null && val !== undefined;
export const isValidNumber = (val: any): val is number => !isNaN(val) && isNum(val);
