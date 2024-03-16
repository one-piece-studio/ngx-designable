import { Engine } from '@/app/core/models/engine';
import { Viewport } from '@/app/core/models/viewport';
import { Operation } from '@/app/core/models/operation';
import { History } from '@/app/core/models/history';
import { EventContainer, ICustomEvent } from '@/app/shared/event';
import { IEngineContext } from '@/app/core/types';
import { uid } from '@/app/shared/uid';

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

  constructor(engine: Engine, props: IWorkspaceProps) {
    this.engine = engine;
    this.props = props;
    this.id = props.id || uid();
    this.title = props.title;
    this.description = props.description;
    this.viewport = new Viewport({
      engine: this.engine,
      workspace: this,
      viewportElement: props.viewportElement,
      contentWindow: props.contentWindow,
      nodeIdAttrName: this.engine.props.nodeIdAttrName,
      moveSensitive: true,
      moveInsertionType: 'all'
    });
    this.outline = new Viewport({
      engine: this.engine,
      workspace: this,
      viewportElement: props.viewportElement,
      contentWindow: props.contentWindow,
      nodeIdAttrName: this.engine.props.outlineNodeIdAttrName,
      moveSensitive: false,
      moveInsertionType: 'block'
    });
    this.operation = new Operation(this);
  }

  attachEvents(container: EventContainer, contentWindow: Window) {
    this.engine.attachEvents(container, contentWindow, this.getEventContext());
  }

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