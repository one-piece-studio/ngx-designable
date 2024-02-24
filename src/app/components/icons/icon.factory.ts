import { IconType } from './icon.type';
import { Injectable, ViewContainerRef } from '@angular/core';

export class IconFactory {
  private _icons = {};

  register<T>(type: IconType, widget: T) {
    this._icons[type] = widget;
  }

  get icons() {
    return this._icons;
  }

  has(type: string) {
    return !!this._icons[type];
  }

  getIcon(type: string) {
    if (this.has(type)) {
      return this._icons[type];
    }
    return null;
  }
}

@Injectable()
export class IconFactoryProvider {
  constructor(private factory: IconFactory) {}

  createSvg(type: string, container: ViewContainerRef) {
    if (!this.factory.has(type)) {
      throw new Error(`Icon ${type} not found`);
    }

    const comp = this.factory.getIcon(type);
    return container?.createComponent(comp);
  }

  find(type: string) {
    return this.factory.getIcon(type);
  }
}
