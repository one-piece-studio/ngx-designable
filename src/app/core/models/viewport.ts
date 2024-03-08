import { Workspace } from './workspace';
import { Engine } from './engine';

export interface IViewportProps {
  engine: Engine;
  workspace: Workspace;
  viewportElement: HTMLElement;
  contentWindow: Window;
  nodeIdAttrName: string;
  moveSensitive?: boolean;
  moveInsertionType?: IViewportMoveInsertionType;
}

export interface IViewportData {
  scrollX?: number;
  scrollY?: number;
  width?: number;
  height?: number;
}

export type IViewportMoveInsertionType = 'all' | 'inline' | 'block';

export class Viewport {
  workspace: Workspace;

  engine: Engine;

  contentWindow: Window;

  viewportElement: HTMLElement;

  dragStartSnapshot: IViewportData;

  scrollX = 0;

  scrollY = 0;

  width = 0;

  height = 0;

  mounted = false;

  attachRequest: number;

  nodeIdAttrName: string;

  moveSensitive: boolean;

  moveInsertionType: IViewportMoveInsertionType;

  nodeElementsStore: Record<string, HTMLElement[]> = {};
}
