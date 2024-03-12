import { Engine } from '@/app/core/models/engine';
import { Viewport } from '@/app/core/models/viewport';
import { Operation } from '@/app/core/models/operation';
import { History } from '@/app/core/models/history';
import { ICustomEvent } from '@/app/shared/event';
import { IEngineContext } from '@/app/core/types';

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

  getEventContext(): IEngineContext {
    return {
      workbench: this.engine.workbench,
      workspace: this,
      engine: this.engine,
      viewport: this.viewport
    };
  }

  dispatch(event: ICustomEvent) {
    return this.engine.dispatch(event, this.getEventContext());
  }
}
