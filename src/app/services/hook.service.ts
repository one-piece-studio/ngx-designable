import { Injectable } from '@angular/core';
import { Engine } from '../core/models';

@Injectable({
  providedIn: 'root'
})
export class HookService {
  constructor(private designer: Engine) {}

  useDesigner() {
    return this.designer;
  }

  useCursor() {
    return this.designer.cursor;
  }

  useWorkbench() {
    return this.designer.workbench;
  }

  useScreen() {
    return this.designer.screen;
  }

  useWorkspace(workspaceId?: string) {
    if (workspaceId) {
      return this.designer.workbench.findWorkspaceById(workspaceId);
    } else {
      return this.designer.workbench.currentWorkspace;
    }
  }

  useOperation(workspaceId?: string) {
    const workspace = this.useWorkspace(workspaceId);
    return workspace?.operation;
  }

  useSelection(workspaceId?: string) {
    const operation = this.useOperation(workspaceId);
    return operation?.selection;
  }

  useTree(workspaceId?: string) {
    const operation = this.useOperation(workspaceId);
    return operation?.tree;
  }

  useTransformHelper(workspaceId?: string) {
    const operation = this.useOperation(workspaceId);
    return operation?.transformHelper;
  }

  useMoveHelper(workspaceId?: string) {
    const operation = this.useOperation(workspaceId);
    return operation?.moveHelper;
  }

  useViewport(workspaceId?: string) {
    const workspace = this.useWorkspace(workspaceId);
    return workspace?.viewport;
  }

  useOutline(workspaceId?: string) {
    const workspace = this.useWorkspace(workspaceId);
    return workspace?.outline;
  }

  useHover(workspaceId?: string) {
    const operation = this.useOperation(workspaceId);
    return operation?.hover;
  }
}
