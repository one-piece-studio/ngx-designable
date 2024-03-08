import { Engine } from '@/app/core/models/engine';
import { Viewport } from '@/app/core/models/viewport';
import { Operation } from '@/app/core/models/operation';
import { History } from '@/app/core/models/history';

export interface IWorkspace {
  id?: string;
  title?: string;
  description?: string;
  // operation: IOperation
}

export interface IWorkspaceProps {
  id?: string;
  title?: string;
  description?: string;
  contentWindow?: Window;
  viewportElement?: HTMLElement;
}

/**
 * 工作区模型
 */
export class Workspace {
  id: string;

  title: string;

  description: string;

  engine: Engine;

  viewport: Viewport;

  outline: Viewport;

  operation: Operation;

  history: History;

  props: IWorkspaceProps;
}
