import { Workspace } from './workspace';
import { Engine } from './engine';
import { globalThisPolyfill } from '@/app/shared/globalThisPolyfill';
import { calcBoundingRect, IPoint, isPointInRect, Rect } from '@/app/shared/coordinate';
import { TreeNode } from '@/app/core/models/tree-node';
import { calcElementLayout } from '@/app/shared/element';
import { action, define, observable } from '@formily/reactive';
import { isHTMLElement } from '@/app/shared/types';
import { cancelIdle, requestIdle } from '@/app/shared/request-idle';

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

  constructor(props: IViewportProps) {
    this.workspace = props.workspace;
    this.engine = props.engine;
    this.moveSensitive = props.moveSensitive ?? false;
    this.moveInsertionType = props.moveInsertionType ?? 'all';
    this.viewportElement = props.viewportElement;
    this.contentWindow = props.contentWindow;
    this.nodeIdAttrName = props.nodeIdAttrName;
    this.digestViewport();
    this.makeObservable();
    this.attachEvents();
  }

  attachEvents() {
    const engine = this.engine;
    cancelIdle(this.attachRequest);
    this.attachRequest = requestIdle(() => {
      if (!engine) return;
      if (this.isIframe) {
        this.workspace.attachEvents(this.contentWindow, this.contentWindow);
      } else if (isHTMLElement(this.viewportElement)) {
        this.workspace.attachEvents(this.viewportElement, this.contentWindow);
      }
    });
  }

  makeObservable() {
    define(this, {
      scrollX: observable.ref,
      scrollY: observable.ref,
      width: observable.ref,
      height: observable.ref,
      digestViewport: action,
      viewportElement: observable.ref,
      contentWindow: observable.ref
    });
  }

  digestViewport() {
    Object.assign(this, this.getCurrentData());
  }

  getCurrentData() {
    const data: IViewportData = {};
    if (this.isIframe) {
      data.scrollX = this.contentWindow?.scrollX || 0;
      data.scrollY = this.contentWindow?.scrollY || 0;
      data.width = this.contentWindow?.innerWidth || 0;
      data.height = this.contentWindow?.innerHeight || 0;
    } else if (this.viewportElement) {
      data.scrollX = this.viewportElement?.scrollLeft || 0;
      data.scrollY = this.viewportElement?.scrollTop || 0;
      data.width = this.viewportElement?.clientWidth || 0;
      data.height = this.viewportElement?.clientHeight || 0;
    }
    return data;
  }

  cacheElements() {
    this.nodeElementsStore = {};
    this.viewportRoot?.querySelectorAll(`*[${this.nodeIdAttrName}]`).forEach((element: HTMLElement) => {
      const id = element.getAttribute(this.nodeIdAttrName);
      this.nodeElementsStore[id] = this.nodeElementsStore[id] || [];
      this.nodeElementsStore[id].push(element);
    });
  }

  get viewportRoot() {
    return this.isIframe ? this.contentWindow?.document?.body : this.viewportElement;
  }

  get isMaster() {
    return this.contentWindow === globalThisPolyfill;
  }

  get isIframe() {
    return !!this.contentWindow?.frameElement && !this.isMaster;
  }

  get rect() {
    const viewportElement = this.viewportElement;
    if (viewportElement) return viewportElement.getBoundingClientRect();
    return null;
  }

  get innerRect() {
    const rect = this.rect;
    return new Rect(0, 0, rect?.width, rect?.height);
  }

  get offsetX() {
    const rect = this.rect;
    if (!rect) return 0;
    return rect.x;
  }

  get offsetY() {
    const rect = this.rect;
    if (!rect) return 0;
    return rect.y;
  }

  get scale() {
    if (!this.viewportElement) return 1;
    const clientRect = this.viewportElement.getBoundingClientRect();
    const offsetWidth = this.viewportElement.offsetWidth;
    if (!clientRect.width || !offsetWidth) return 1;
    return Math.round(clientRect.width / offsetWidth);
  }

  clearCache() {
    this.nodeElementsStore = {};
  }

  isPointInViewport(point: IPoint, sensitive?: boolean) {
    if (!this.rect) return false;
    if (!this.containsElement(document.elementFromPoint(point.x, point.y))) {
      return false;
    }
    return isPointInRect(point, this.rect, sensitive);
  }

  containsElement(element: HTMLElement | Element | EventTarget) {
    const root: Element | HTMLDocument = this.viewportElement;
    if (root === element) return true;
    return root?.contains(element as any);
  }

  getValidNodeRect(node: TreeNode): Rect {
    if (!node) return null;
    const rect = this.getElementRectById(node.id);
    if (node && node === node.root && node.isInOperation) {
      if (!rect) return this.rect;
      return calcBoundingRect([this.rect, rect]);
    }

    if (rect) {
      return rect;
    } else {
      return this.getChildrenRect(node);
    }
  }

  getValidNodeOffsetRect(node: TreeNode): Rect {
    if (!node) return null;
    const rect = this.getElementOffsetRectById(node.id);
    if (node && node === node.root && node.isInOperation) {
      if (!rect) return this.innerRect;
      return calcBoundingRect([this.innerRect, rect]);
    }
    if (rect) {
      return rect;
    } else {
      return this.getChildrenOffsetRect(node);
    }
  }

  getChildrenOffsetRect(node: TreeNode): Rect {
    if (!node?.children?.length) return null;

    return calcBoundingRect(
      node.children.reduce((buf, child) => {
        const rect = this.getValidNodeOffsetRect(child);
        if (rect) {
          return buf.concat(rect);
        }
        return buf;
      }, [])
    );
  }

  //相对于视口
  getElementOffsetRectById(id: string) {
    const elements = this.findElementsById(id);
    if (!elements.length) return null;
    const elementRect = calcBoundingRect(elements.map(element => this.getElementRect(element)));
    if (elementRect) {
      if (this.isIframe) {
        return new Rect(
          elementRect.x + this.contentWindow.scrollX,
          elementRect.y + this.contentWindow.scrollY,
          elementRect.width,
          elementRect.height
        );
      } else {
        return new Rect(
          (elementRect.x - this.offsetX + this.viewportElement.scrollLeft) / this.scale,
          (elementRect.y - this.offsetY + this.viewportElement.scrollTop) / this.scale,
          elementRect.width,
          elementRect.height
        );
      }
    }
    return null;
  }

  getChildrenRect(node: TreeNode): Rect {
    if (!node?.children?.length) return null;
    return calcBoundingRect(
      node.children.reduce((buf, child) => {
        const rect = this.getValidNodeRect(child);
        if (rect) {
          return buf.concat(rect);
        }
        return buf;
      }, [])
    );
  }

  getElementRectById(id: string) {
    const elements = this.findElementsById(id);
    const rect = calcBoundingRect(elements.map(element => this.getElementRect(element)));
    if (rect) {
      if (this.isIframe) {
        return new Rect(rect.x + this.offsetX, rect.y + this.offsetY, rect.width, rect.height);
      } else {
        return new Rect(rect.x, rect.y, rect.width, rect.height);
      }
    }
    return null;
  }

  findElementById(id: string): HTMLElement {
    if (!id) return null;
    if (this.nodeElementsStore[id]) return this.nodeElementsStore[id][0];
    return this.viewportRoot?.querySelector(`*[${this.nodeIdAttrName}='${id}']`) as HTMLElement;
  }

  findElementsById(id: string): HTMLElement[] {
    if (!id) return [];
    if (this.nodeElementsStore[id]) return this.nodeElementsStore[id];
    return Array.from(this.viewportRoot?.querySelectorAll(`*[${this.nodeIdAttrName}='${id}']`) ?? []);
  }

  //相对于页面
  getElementRect(element: HTMLElement | Element) {
    const rect = element.getBoundingClientRect();
    const offsetWidth = element['offsetWidth'] ? element['offsetWidth'] : rect.width;
    const offsetHeight = element['offsetHeight'] ? element['offsetHeight'] : rect.height;
    return new Rect(
      rect.x,
      rect.y,
      this.scale !== 1 ? offsetWidth : rect.width,
      this.scale !== 1 ? offsetHeight : rect.height
    );
  }

  getValidNodeLayout(node: TreeNode) {
    if (!node) return 'vertical';
    if (node.parent?.designerProps?.inlineChildrenLayout) return 'horizontal';
    return calcElementLayout(this.findElementById(node.id));
  }
}
